package cl.rednorte.ms_centros.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "especialidades")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EspecialidadEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_especialidad")
    private Long idEspecialidad;

    @NotBlank(message = "El nombre de la especialidad es obligatorio")
    @Size(max = 100, message = "El nombre no puede superar los 100 caracteres")
    @Column(name = "nombre_especialidad", length = 100, nullable = false, unique = true)
    private String nombreEspecialidad; // Ej: "Pediatría", "Cardiología" (Garantiza el estándar único)

    @NotBlank(message = "La descripción es obligatoria")
    @Size(max = 255, message = "La descripción no puede superar los 255 caracteres")
    @Column(name = "descripcion_especialidad", length = 255, nullable = false) // Se eliminó 'unique = true'
    private String descripcionEspecialidad;

    @ManyToMany(mappedBy = "especialidades")
    private Set<CentroEntity> centros = new HashSet<>();

}