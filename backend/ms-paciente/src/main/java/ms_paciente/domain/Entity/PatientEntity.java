package ms_paciente.domain.Entity;

import jakarta.persistence.*;
import lombok.*;
import ms_paciente.domain.types.Gender;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/*
 * REPRESENTA LA ENTIDAD PRINCIPAL DE PACIENTE EN REDNORTE.
 *
 * INCLUYE:
 * - Datos demográficos
 * - Contacto
 * - Estado
 * - Relaciones con identificadores y coberturas
 *
 * REGLAS:
 * - primary_phone es obligatorio
 * - gender se maneja como ENUM (alineado a FHIR)
 * - identifiers: al menos uno debe existir (validado en service)
 */

@Entity
@Table(name = "patients")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, updatable = false)
    private String id;

    @Column(name = "first_name", length = 100)
    private String firstName;

    @Column(name = "last_name", length = 100)
    private String lastName;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", length = 20)
    private Gender gender;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "primary_phone", nullable = false, length = 20)
    private String primaryPhone;

    @Column(name = "secondary_phone", length = 20)
    private String secondaryPhone;

    @Column(name = "email", length = 150)
    private String email;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "active", nullable = false)
    private boolean active;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // RELACIÓN UNO A MUCHOS CON IDENTIFIERS
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<IdentifierEntity> identifiers;

    // RELACIÓN UNO A MUCHOS CON COVERAGES
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CoverageEntity> coverages;
}
