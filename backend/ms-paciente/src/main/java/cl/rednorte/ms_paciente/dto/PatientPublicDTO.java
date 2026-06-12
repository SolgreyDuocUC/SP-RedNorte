package cl.rednorte.ms_paciente.dto;

/**
 * Vista mínima del paciente que se expone a otros MS por endpoint interno.
 * Solo campos no clínicos necesarios para auth (búsqueda por RUN + envío
 * de OTP). NUNCA incluir diagnósticos, alergias, ni datos sensibles.
 */
public record PatientPublicDTO(
        String id,
        String identifierType,
        String identifierValue,
        String firstName,
        String lastName,
        String phone,
        String email
) {}
