package cl.rednorte.ms_usuarios.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioActualizadoEvent {
    private String userId;
    private String fieldChanged;
    private String newValue;
    private LocalDateTime timestamp;
}
