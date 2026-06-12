package cl.rednorte.ms_reservas.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.SoftDelete;
import org.hibernate.annotations.SoftDeleteType;

import java.util.Date;

@Entity
@Table(name = "slots")
@SoftDelete(strategy = SoftDeleteType.DELETED)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SlotEntity {

    @Id
    private String id;

    @Column(name = "practitioner_id", nullable = false)
    private String practitionerId;

    @Column(name = "specialty", nullable = false)
    private String specialty; // Ej: "Cardiología", "Pediatría"

    @Column(name = "start_time", nullable = false)
    private Date start;

    @Column(name = "end_time", nullable = false)
    private Date end;

    @Column(name = "status", nullable = false)
    private String status; // FHIR: free, busy, reserved
}