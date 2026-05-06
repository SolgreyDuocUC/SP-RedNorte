package cl.rednorte.mspaciente.domain.Entity;

import jakarta.persistence.*;
import lombok.*;

/*
 * REPRESENTA LA COBERTURA DEL PACIENTE EN REDNORTE.
 *
 * INCLUYE:
 * - PREVISIÓN DE SALUD (FONASA, ISAPRE)
 * - CONVENIOS (Caja Los Andes, otros)
 *
 * DECISIÓN DE DISEÑO:
 * - Se unifica en una sola entidad para reducir complejidad operativa.
 * - El campo "type" diferencia el tipo de cobertura.
 *
 * VALORES ESPERADOS:
 * - type:
 *      HEALTH_INSURANCE → previsión de salud
 *      AGREEMENT        → convenio
 *
 * - provider:
 *      FONASA, ISAPRE, CAJA_LOS_ANDES, etc.
 */

@Entity
@Table(name = "coverages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CoverageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String type; // HEALTH_INSURANCE | AGREEMENT

    @Column(nullable = false)
    private String provider; // FONASA, ISAPRE, CAJA_LOS_ANDES

    private String plan;   // Nombre del plan (opcional)
    private String status; // ACTIVE, INACTIVE, EXPIRED

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private PatientEntity patient;

}
