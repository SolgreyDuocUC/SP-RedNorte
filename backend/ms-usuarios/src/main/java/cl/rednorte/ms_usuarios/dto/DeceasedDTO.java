package cl.rednorte.ms_usuarios.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DeceasedDTO {
    private int deceasedId;
    private boolean deceasedStatus;
    private Timestamp deceasedDateTime;
}
