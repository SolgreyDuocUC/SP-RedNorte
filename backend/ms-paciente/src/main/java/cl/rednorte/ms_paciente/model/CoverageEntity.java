package cl.rednorte.ms_paciente.model;

import jakarta.persistence.*;
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

    @OneToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private PatientEntity patient;

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
