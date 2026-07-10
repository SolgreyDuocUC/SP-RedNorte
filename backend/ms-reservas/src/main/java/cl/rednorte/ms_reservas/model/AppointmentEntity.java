package cl.rednorte.ms_reservas.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SoftDelete;
import org.hibernate.annotations.SoftDeleteType;

import java.util.Date;

@Entity
@Table(name = "appointments")
@SoftDelete(strategy = SoftDeleteType.DELETED)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentEntity {

    @Id
    private String id;

    @Column(name = "patient_id", nullable = false)
    private String patientId;

    @Column(name = "practitioner_id")
    private String practitionerId; // Puede ser NULL si está en "waitlist" sin profesional asignado

    @Column(name = "specialty", nullable = false)
    private String specialty; // Clave para emparejar con la lista de espera

    // Relación con el bloque de agenda
    // EAGER requerido: Hibernate no soporta asociaciones LAZY hacia entidades con @SoftDelete
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "slot_id", nullable = true) // Es NULL si está en "waitlist"
    private SlotEntity slot;

    @Column(name = "start_time")
    private Date start; // NULL si está en "waitlist" sin horario asignado

    @Column(name = "end_time")
    private Date end; // NULL si está en "waitlist" sin horario asignado

    @Column(name = "status", nullable = false)
    private String status; // FHIR ampliado: booked, cancelled, waitlist

    @Column(name = "description")
    private String description;

    // Priorización para el algoritmo de reasignación
    @Column(name = "priority")
    private Integer priority; // 1 = Normal, 2 = Urgente, 3 = Crítico

    @Column(name = "created_at", nullable = false)
    private Date createdAt;


    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = new Date();
        }
    }
}