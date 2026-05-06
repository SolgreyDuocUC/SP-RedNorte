package cl.rednorte.mspaciente.domain.Entity;

import jakarta.persistence.*;
import lombok.*;
import cl.rednorte.mspaciente.domain.types.IdentifierType;

/*
 * REPRESENTA UN IDENTIFICADOR OFICIAL DEL PACIENTE.
 *
 * PERMITE MANEJAR:
 * - RUN (Chile)
 * - DNI (otros países)
 * - PASAPORTE
 *
 * DECISIÓN DE DISEÑO:
 * - Un paciente puede tener múltiples identificadores (1:N)
 * - Cada identificador debe tener tipo, valor y país
 *
 * REGLAS:
 * - type: obligatorio (ENUM controlado)
 * - value: obligatorio
 * - country: recomendable para interoperabilidad
 * - RUN debe ser único en el sistema (validado en capa service + constraint)
 */

@Entity
@Table(
        name = "identifiers",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_identifier_type_value", columnNames = {"type", "value"})
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IdentifierEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, updatable = false)
    private String id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 20)
    private IdentifierType type;
    // RUN | DNI | PASSPORT

    @Column(name = "value", nullable = false, length = 50)
    private String value;
    // Número del documento (ej: 12345678-9)

    @Column(name = "country", length = 10)
    private String country;
    // Código país (ej: CL, AR, PE)

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "patient_id", nullable = false)
    private PatientEntity patient;
}
