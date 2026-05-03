package ms_paciente.model;

/*
 * MODELO DE EXTENSIÓN DEL PACIENTE.
 *
 * PROPÓSITO:
 * - Evitar sobrecargar el modelo principal (PatientModel)
 * - Contener atributos internos específicos de negocio
 *
 * USO:
 * - Se utiliza para lógica interna de RedNorte
 * - Puede mapearse a campos adicionales en la entidad o mantenerse separado
 *
 * CAMPOS:
 * - patientId: referencia al paciente (UUID)
 * - isForeign: indica si el paciente es extranjero
 *
 * NOTA:
 * - Este campo puede inferirse desde Identifier (country),
 *   pero se mantiene por eficiencia en consultas
 */

public class PatientExtensionModel {

    private String patientId;
    private boolean isForeign;
}
