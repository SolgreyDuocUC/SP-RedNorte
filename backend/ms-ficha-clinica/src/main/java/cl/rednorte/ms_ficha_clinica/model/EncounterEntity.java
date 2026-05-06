package cl.rednorte.ms_ficha_clinica.model;

import cl.rednorte.ms_ficha_clinica.model.status.EncounterStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "encounters")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EncounterEntity {

    @Id
    private String id;

    @Column(name = "patient_id", nullable = false)
    private String patientId;

    @Column(name = "location_id")
    private String locationId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EncounterStatus status;

    @SuppressWarnings("deprecation")
    @Column(name = "period_start")
    @Temporal(TemporalType.TIMESTAMP)
    private Date periodStart;

    @SuppressWarnings("deprecation")
    @Column(name = "period_end")
    @Temporal(TemporalType.TIMESTAMP)
    private Date periodEnd;

    @Column
    private String practitioner;
}
