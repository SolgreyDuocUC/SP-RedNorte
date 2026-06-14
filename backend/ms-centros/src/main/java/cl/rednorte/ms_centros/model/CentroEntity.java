package cl.rednorte.ms_centros.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "centros")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CentroEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_centro")
    private Long id;

    @Column(name = "nombre", nullable = false, length = 150)
    private String name;

    @Column(name = "direccion", nullable = false, length = 255)
    private String address;

    @Column(name = "telefono", length = 20)
    private String phone;

    @Column(name = "correo_electronico", length = 100)
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_comuna", nullable = false)
    private ComunaEntity comuna;

    @Column(name = "estado_centro", nullable = false)
    private String status; // active, suspended, inactive

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "centro_specialties", joinColumns = @JoinColumn(name = "centro_id"))
    @Column(name = "specialty")
    @Builder.Default
    private List<String> specialties = new ArrayList<>();

    // Dentro de CentroEntity.java
    @ManyToMany
    @JoinTable(
            name = "centro_especialidad",
            joinColumns = @JoinColumn(name = "id_centro"),
            inverseJoinColumns = @JoinColumn(name = "id_especialidad")
    )
    private Set<EspecialidadEntity> especialidades;

    //Metodo de restricción de datos

    public void setSpecialties(List<String> specialties) {
        this.specialties = specialties;
    }

}
