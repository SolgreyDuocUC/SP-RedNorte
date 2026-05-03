package ms_paciente.domain;

/*
 * MODELO DE DOMINIO PARA COBERTURA DEL PACIENTE.
 *
 * REPRESENTA:
 * - PREVISIÓN DE SALUD
 * - CONVENIOS ASOCIADOS
 *
 * DIFERENCIA CON ENTITY:
 * - No contiene relaciones JPA
 * - Se usa para lógica de negocio y transporte interno
 */

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CoverageModel {

    private String id;
    private String patientId;

    private String type;     // HEALTH_INSURANCE | AGREEMENT
    private String provider; // FONASA, ISAPRE, CAJA_LOS_ANDES

    private String plan;     // Plan de salud (si aplica)
    private String status;   // ACTIVE, INACTIVE, EXPIRED
}

