package cl.rednorte.ms_centros.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "regiones")
@Getter             // Genera getId() y getNombre()
@Setter             // Genera setNombre()
@NoArgsConstructor  // Constructor vacío requerido por JPA
@AllArgsConstructor // Requerido por @Builder
@Builder            // Genera el método RegionEntity.builder()
public class RegionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_region")
    private Long id;

    @Column(name = "nombre", nullable = false, unique = true, length = 100)
    private String nombre;
}
