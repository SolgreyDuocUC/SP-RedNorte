package ms_paciente.model;

import ms_paciente.model.types.Gender;

import java.time.LocalDate;
import java.util.List;

/*
 * MODELO DE DOMINIO DEL PACIENTE.
 *
 * REPRESENTA:
 * - Datos demográficos
 * - Información de contacto
 * - Estado del paciente
 * - Identificadores asociados
 *
 * REGLAS DE NEGOCIO:
 * - Debe existir al menos un IdentifierModel (validado en capa service)
 * - primaryPhone es obligatorio (validado en DTO)
 * - gender se maneja como ENUM (alineado con FHIR)
 *
 * DISEÑO:
 * - No contiene anotaciones JPA (separación de responsabilidades)
 * - No contiene validaciones directas (estas van en DTO)
 * - Se utiliza para lógica interna y mapeo a FHIR
 */

public class PatientModel {

    private String id;

    private List<IdentifierModel> identifiers;

    private String firstName;
    private String lastName;

    private Gender gender;
    private LocalDate birthDate;

    private String primaryPhone;
    private String secondaryPhone;

    private String email;
    private String address;

    private boolean active;
}
