package ms_paciente.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientDTO {

    private String id;

    @NotBlank(message = "El nombre es obligatorio")
    private String firstName;

    @NotBlank(message = "El apellido es obligatorio")
    private String lastName;

    private String gender;

    @NotNull(message = "La fecha de nacimiento es obligatoria")
    private LocalDate birthDate;

    @NotBlank(message = "El teléfono principal es obligatorio")
    private String primaryPhone;

    private String secondaryPhone;

    @Email(message = "El email debe ser válido")
    private String email;

    private String address;

    @NotEmpty(message = "Al menos un identificador es obligatorio")
    @Valid
    private List<IdentifierDTO> identifiers;

    @Valid
    private List<CoverageDTO> coverages;

    private boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
