package cl.rednorte.ms_paciente.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

/**
 * Cuerpo del PATCH a {@code /api/v1/patients/{id}/contact}.
 * Solo datos de contacto — campos clínicos NO se permiten por este endpoint.
 * Cualquier campo {@code null} se interpreta como "no cambiar".
 */
public record PatientContactDTO(
        @Size(max = 50) String phone,
        @Email @Size(max = 150) String email,
        @Size(max = 300) String address
) {}
