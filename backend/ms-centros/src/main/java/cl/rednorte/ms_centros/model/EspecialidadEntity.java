package cl.rednorte.ms_centros.model;

import jakarta.persistence.*;

@Entity
@Table(name = "especialidades")
public class Especialidades {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEspecialidad;

    @Column(length = 100, nullable = false, unique = true)
    private String nombreEspecialidad;

    @Column(length = 100, nullable = false, unique = true)
    private String descripcionEspecialidad;

}
