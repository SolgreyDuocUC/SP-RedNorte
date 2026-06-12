package cl.rednorte.ms_usuarios.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "qualifications")
public class Qualification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "qualification_id", nullable = false, length = 100)
    private int qualification_id;

    @Column(name = "qualification_code", nullable = true, length = 15)
    private String qualificationCode;

    @Column (name = "qualification_period", nullable = true)
    private Timestamp qualificationPeriod;

}
