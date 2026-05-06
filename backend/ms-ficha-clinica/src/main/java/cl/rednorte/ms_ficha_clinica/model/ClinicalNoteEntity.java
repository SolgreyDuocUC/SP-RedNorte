package cl.rednorte.ms_ficha_clinica.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "clinical_notes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClinicalNoteEntity {

    @Id
    private String id;

    @Column(name = "patient_id", nullable = false)
    private String patientId;

    @Column(name = "encounter_id", nullable = false)
    private String encounterId;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column
    private String author;

    @SuppressWarnings("deprecation")
    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
}
