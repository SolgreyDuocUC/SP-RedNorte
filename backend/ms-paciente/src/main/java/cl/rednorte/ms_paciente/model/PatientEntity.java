package cl.rednorte.ms_paciente.model;

import cl.rednorte.ms_paciente.model.status.Gender;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

/*
La entidad PatientEntity representa una abstracción
persistente del paciente, alineada al estándar HL7 FHIR (Patient),
incluyendo identificador, datos básicos, género y previsión,
permitiendo su evolución futura hacia interoperabilidad clínica completa.
 */

@Entity
@Table(
        name = "patients",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"identifier_type", "identifier_value"})
        }
)
/*
Se implementa una restricción única compuesta por tipo y valor de identificador,
permitiendo la evolución del
identificador del paciente (por ejemplo,
de pasaporte a RUN) sin duplicar registros.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientEntity {

    @Id
    private String id;

    @Column(name = "identifier_type", nullable = false)
    private String identifierType; // RUN, PASSPORT

    @Column(name = "identifier_value", nullable = false)
    private String identifierValue;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "created_date")
    private Date createdAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Column(name = "insurance")
    private String insurance;
}
