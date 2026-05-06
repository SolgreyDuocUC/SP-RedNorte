package cl.rednorte.ms_ficha_clinica.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

//Hola
@Entity
@Table(name = "procedures")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProcedureEntity {

    @Id
    private String id;

    @Column(name = "patient_id", nullable = false)
    private String patientId;

    @Column(name = "encounter_id", nullable = false)
    private String encounterId;

    @Column(nullable = false)
    private String code;

    @Column(nullable = false)
    private String status; // preparation, in-progress, completed, stopped

    @SuppressWarnings("deprecation")
    @Column(name = "performed_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date performedDate;

    @Column
    private String description;
}
