package cl.rednorte.ms_ficha_clinica.model;

import cl.rednorte.ms_ficha_clinica.model.status.ClinicalStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "conditions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConditionEntity {

    @Id
    private String id;

    @Column(name = "patient_id", nullable = false)
    private String patientId;

    @Column(name = "encounter_id", nullable = false)
    private String encounterId;

    @Column(nullable = false)
    private String code; // CIE-10

    @Column(name = "clinical_status")
    private ClinicalStatus clinicalStatus;

    @Column(name = "description")
    private String description;

    @Column(name = "onset_date")
    private Date onsetDate;

    @SuppressWarnings("deprecation")
    @Column(name = "recorded_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date recordedDate;
}
