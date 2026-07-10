package cl.rednorte.ms_urgencias.service;

import ca.uhn.fhir.rest.api.MethodOutcome;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import org.hl7.fhir.r4.model.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.*;

@Service
public class UrgenciaService {

    // Escala de triage Manchester/ESI usada en la red: C1 (crítico) a C5 (no urgente).
    private static final Set<String> CATEGORIAS_TRIAGE_VALIDAS = Set.of("C1", "C2", "C3", "C4", "C5");

    private final IGenericClient fhirClient;

    public UrgenciaService(IGenericClient fhirClient) {
        this.fhirClient = fhirClient;
    }

    public String registrarIngreso(String rut, String motivo) {
        Encounter encuentro = new Encounter();
        encuentro.setStatus(Encounter.EncounterStatus.ARRIVED);
        
        // Identificador del Paciente (RUT)
        encuentro.setSubject(new Reference("Patient?identifier=" + rut));
        
        // Motivo de consulta
        CodeableConcept motivoCode = new CodeableConcept().setText(motivo);
        encuentro.addReasonCode(motivoCode);

        MethodOutcome outcome = fhirClient.create().resource(encuentro).execute();
        return outcome.getId().getIdPart();
    }

public void procesarTriage(String id, Map<String, Object> datosTriage) {
        // Validar la categorización ANTES de leer/mutar el encuentro: sin
        // esto, un valor nulo o mal escrito dejaba el encuentro marcado como
        // TRIAGED con una prioridad nula/"Categoría null" — un paciente
        // crítico podía quedar sin prioridad real mientras el sistema
        // reportaba el triage como completado.
        Object categorizacionRaw = datosTriage.get("categorizacion");
        String categorizacion = categorizacionRaw != null ? categorizacionRaw.toString().trim().toUpperCase() : null;
        if (categorizacion == null || !CATEGORIAS_TRIAGE_VALIDAS.contains(categorizacion)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Categorización de triage inválida: debe ser una de " + CATEGORIAS_TRIAGE_VALIDAS);
        }

        // 1. Leer el encuentro actual
        Encounter encuentro = fhirClient.read().resource(Encounter.class).withId(id).execute();
        encuentro.setStatus(Encounter.EncounterStatus.TRIAGED);

        // 2. Asignar Categorización (C1 - C5)
        CodeableConcept prioridad = new CodeableConcept();
        prioridad.addCoding()
            .setSystem("http://terminology.hl7.org/CodeSystem/v3-ObservationValue")
            .setCode(categorizacion)
            .setDisplay("Categoría " + categorizacion);
        encuentro.setPriority(prioridad);

        // 3. Crear la Observación (Signos Vitales)
        Observation presion = new Observation();
        presion.setStatus(Observation.ObservationStatus.FINAL); // El estándar exige un estado
        presion.setSubject(encuentro.getSubject());
        presion.setCode(new CodeableConcept().setText("Presión Arterial"));
        presion.setValue(new StringType((String) datosTriage.get("presion")));

        Bundle transactionBundle = new Bundle();
        transactionBundle.setType(Bundle.BundleType.TRANSACTION);

        // Añadir la actualización del Encuentro al "paquete" (PUT)
        transactionBundle.addEntry()
            .setResource(encuentro)
            .getRequest()
            .setUrl("Encounter/" + encuentro.getIdElement().getIdPart())
            .setMethod(Bundle.HTTPVerb.PUT);

        // Añadir la creación de la Observación al "paquete" (POST)
        transactionBundle.addEntry()
            .setResource(presion)
            .getRequest()
            .setUrl("Observation")
            .setMethod(Bundle.HTTPVerb.POST);

        // Enviar todo el paquete al servidor en un solo viaje
        fhirClient.transaction().withBundle(transactionBundle).execute();
    }

    public int calcularTiempoEspera(String rut) {
        // 1. Buscar encuentros activos en triage
        Bundle bundle = fhirClient.search().forResource(Encounter.class)
                .where(Encounter.STATUS.exactly().code("triaged"))
                .returnBundle(Bundle.class).execute();

        // 2. Lógica Algorítmica: Contar pacientes en la cola e inferir tiempo medio
        int pacientesEnEspera = (bundle != null && bundle.getEntry() != null) ? bundle.getEntry().size() : 0;
        return 15 + (pacientesEnEspera * 10);
    }

public void cancelarAtencion(String idEncuentro, String rutConfirmacion) {
        Encounter encuentro = fhirClient.read().resource(Encounter.class).withId(idEncuentro).execute();
        
        encuentro.setStatus(Encounter.EncounterStatus.CANCELLED);
        
        Extension motivoCancelacion = new Extension();
        motivoCancelacion.setUrl("http://rednorte.cl/fhir/StructureDefinition/motivo-cancelacion");
        motivoCancelacion.setValue(new StringType("Abandono voluntario confirmado por RUT: " + rutConfirmacion));       
        encuentro.addExtension(motivoCancelacion);

        fhirClient.update().resource(encuentro).execute();
    }

    public Map<String, Object> obtenerFichaClinica(String idEncuentro) {
        Encounter encuentro = fhirClient.read().resource(Encounter.class).withId(idEncuentro).execute();
        
        // Aquí consumirías de forma transparente el microservicio de pacientes o buscarías observaciones cruzadas
        Map<String, Object> ficha = new HashMap<>();
        ficha.put("idEncuentro", idEncuentro);
        ficha.put("motivo", encuentro.getReasonCodeFirstRep().getText());
        ficha.put("estadoActual", encuentro.getStatus().toCode());
        return ficha;
    }

    public void finalizarAtencion(String id, String diagnostico) {
        Encounter encuentro = fhirClient.read().resource(Encounter.class).withId(id).execute();
        encuentro.setStatus(Encounter.EncounterStatus.FINISHED);

        // Agregar Diagnóstico de Salida
        Encounter.DiagnosisComponent diagnosisComponent = new Encounter.DiagnosisComponent();
        diagnosisComponent.setCondition(new Reference().setDisplay(diagnostico));
        encuentro.addDiagnosis(diagnosisComponent);

        fhirClient.update().resource(encuentro).execute();
    }
}