package cl.rednorte.ms_centros.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "comunas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ComunaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_comuna")
    private Long id;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "id_region", nullable = false)
    private RegionEntity region;

}
