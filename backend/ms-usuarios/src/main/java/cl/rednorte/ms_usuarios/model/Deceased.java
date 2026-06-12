package cl.rednorte.ms_usuarios.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "deceased")
public class Deceased {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deceased_id",  nullable = false,length = 10)
    private int deceasedId;

    @Column(name = "deceased_status", nullable = false)
    private boolean deceasedStatus;

    @Column(name = "deceased_date_time", nullable = true)
    private Timestamp deceasedDateTime;
}
