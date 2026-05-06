package cl.rednorte.ms_paciente.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "coverages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CoverageEntity {

    @Id
    private String id;

    @Column(name = "patient_id", nullable = false)
    private String patientId;

    // Tipo de cobertura
    @Column(name = "type", nullable = false)
    private String type; // FONASA, ISAPRE

    // Nombre del asegurador
    @Column(name = "provider")
    private String provider; // Colmena, Consalud, Banmédica

    // Número de afiliado (opcional)
    @Column(name = "policy_number")
    private String policyNumber;

}
