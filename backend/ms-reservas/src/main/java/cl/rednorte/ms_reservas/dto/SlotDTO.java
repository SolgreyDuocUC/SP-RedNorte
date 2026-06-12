package cl.rednorte.ms_reservas.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SlotDTO {

    private String id;

    @NotBlank(message = "El ID del profesional es obligatorio")
    private String practitionerId;

    @NotBlank(message = "La especialidad médica es obligatoria")
    private String specialty; // Ej: Cardiology, Pediatrics

    @NotNull(message = "La fecha y hora de inicio es obligatoria")
    private Date start;

    @NotNull(message = "La fecha y hora de término es obligatoria")
    private Date end;

    @NotBlank(message = "El estado del slot es obligatorio")
    private String status; // free, busy, reserved
}
