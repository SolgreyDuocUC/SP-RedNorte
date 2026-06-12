package cl.rednorte.ms_centros.service;

import ca.uhn.fhir.rest.api.MethodOutcome;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import org.hl7.fhir.r4.model.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CentroService {

    private final IGenericClient fhirClient;

    public CentroService(IGenericClient fhirClient) {
        this.fhirClient = fhirClient;
    }

    // ==========================================
    // ORGANIZACIONES
    // ==========================================

    public String crearOrganizacion(String id, String name) {
        Organization org = new Organization();
        if (id != null && !id.trim().isEmpty()) {
            org.setId(id);
        }
        org.setName(name);

        MethodOutcome outcome;
        if (org.getId() != null) {
            // Si el cliente envía ID, hacemos un PUT para conservar ese ID
            outcome = fhirClient.update().resource(org).execute();
        } else {
            // Si no, dejamos que el servidor FHIR cree el ID autogenerado
            outcome = fhirClient.create().resource(org).execute();
        }
        return outcome.getId().getIdPart();
    }

    public Map<String, Object> obtenerOrganizacion(String id) {
        Organization org = fhirClient.read().resource(Organization.class).withId(id).execute();
        Map<String, Object> resultado = new HashMap<>();
        resultado.put("id", org.getIdElement().getIdPart());
        resultado.put("name", org.getName());
        return resultado;
    }

    public List<Map<String, Object>> listarOrganizaciones() {
        Bundle bundle = fhirClient.search().forResource(Organization.class).returnBundle(Bundle.class).execute();
        List<Map<String, Object>> lista = new ArrayList<>();
        for (Bundle.BundleEntryComponent entry : bundle.getEntry()) {
            if (entry.getResource() instanceof Organization) {
                Organization org = (Organization) entry.getResource();
                Map<String, Object> map = new HashMap<>();
                map.put("id", org.getIdElement().getIdPart());
                map.put("name", org.getName());
                lista.add(map);
            }
        }
        return lista;
    }

    // ==========================================
    // UBICACIONES / CENTROS (LOCATIONS)
    // ==========================================

    public String crearUbicacion(String id, String organizationId, String name, String status) {
        Location loc = new Location();
        if (id != null && !id.trim().isEmpty()) {
            loc.setId(id);
        }
        loc.setName(name);
        
        // Status mapping (FHIR admite: active, suspended, inactive)
        if (status != null) {
            try {
                loc.setStatus(Location.LocationStatus.fromCode(status.toLowerCase().trim()));
            } catch (Exception e) {
                loc.setStatus(Location.LocationStatus.ACTIVE);
            }
        } else {
            loc.setStatus(Location.LocationStatus.ACTIVE);
        }

        // Relación con Organización (organization_id)
        if (organizationId != null && !organizationId.trim().isEmpty()) {
            loc.setManagingOrganization(new Reference("Organization/" + organizationId));
        }

        MethodOutcome outcome;
        if (loc.getId() != null) {
            outcome = fhirClient.update().resource(loc).execute();
        } else {
            outcome = fhirClient.create().resource(loc).execute();
        }
        return outcome.getId().getIdPart();
    }

    public Map<String, Object> obtenerUbicacion(String id) {
        Location loc = fhirClient.read().resource(Location.class).withId(id).execute();
        Map<String, Object> resultado = new HashMap<>();
        resultado.put("id", loc.getIdElement().getIdPart());
        resultado.put("name", loc.getName());
        resultado.put("status", loc.getStatus() != null ? loc.getStatus().toCode() : "active");
        
        if (loc.hasManagingOrganization()) {
            resultado.put("organization_id", loc.getManagingOrganization().getReferenceElement().getIdPart());
        } else {
            resultado.put("organization_id", null);
        }
        
        return resultado;
    }

    public List<Map<String, Object>> listarUbicaciones() {
        Bundle bundle = fhirClient.search().forResource(Location.class).returnBundle(Bundle.class).execute();
        List<Map<String, Object>> lista = new ArrayList<>();
        for (Bundle.BundleEntryComponent entry : bundle.getEntry()) {
            if (entry.getResource() instanceof Location) {
                Location loc = (Location) entry.getResource();
                Map<String, Object> map = new HashMap<>();
                map.put("id", loc.getIdElement().getIdPart());
                map.put("name", loc.getName());
                map.put("status", loc.getStatus() != null ? loc.getStatus().toCode() : "active");
                
                if (loc.hasManagingOrganization()) {
                    map.put("organization_id", loc.getManagingOrganization().getReferenceElement().getIdPart());
                } else {
                    map.put("organization_id", null);
                }
                lista.add(map);
            }
        }
        return lista;
    }
}
