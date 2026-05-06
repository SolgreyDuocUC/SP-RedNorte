package cl.rednorte.ms_reservas.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "appointments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentEntity {

    @Id
    private String id;

    // Relación lógica (no JPA compleja)
    @Column(name = "patient_id", nullable = false)
    private String patientId;

    @Column(name = "practitioner_id", nullable = false)
    private String practitionerId;

    // Tiempo
    @Column(name = "start_time", nullable = false)
    private Date start;

    @Column(name = "end_time", nullable = false)
    private Date end;

    // Estado (FHIR)
    @Column(name = "status", nullable = false)
    private String status; // booked, cancelled, fulfilled, noshow

    // Descripción
    @Column(name = "description")
    private String description;

    // Auditoría básica
    @Column(name = "created_at")
    private Date createdAt;
}
