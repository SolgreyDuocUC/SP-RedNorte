package cl.rednorte.ms_ficha_clinica.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

/*
Este model crea la tabla para que los datos puedan persistir de manera relacional,
se establecen los atributos y se pueden restringir en el microservicio:

    - Cantidad de carácteres
    - Tipo de datos
    - Nombre de las columnas

A modo general, es similar a CREATE TABLE
 */

@Entity
@Table(name = "observations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ObservationEntity {

    @Id
    private String id;

    @Column(name = "patient_id", nullable = false)
    private String patientId;

    @Column(name = "encounter_id", nullable = false)
    private String encounterId;

    @Column(nullable = false)
    private String code;

    @Column
    private Double value;

    @Column
    private String unit;

    @SuppressWarnings("deprecation")
    @Column(name = "effective_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date effectiveDate;

}
