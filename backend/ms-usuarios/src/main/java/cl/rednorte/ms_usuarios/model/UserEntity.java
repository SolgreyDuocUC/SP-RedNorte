package cl.rednorte.ms_usuarios.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "run", nullable = false, unique = true, length = 12)
    private String run;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "segundo_nombre", length = 100)
    private String segundoNombre;

    @Column(name = "apellido_paterno", nullable = false, length = 100)
    private String apellidoPaterno;

    @Column(name = "apellido_materno", nullable = false, length = 100)
    private String apellidoMaterno;

    @Column(name = "numero_telefono", length = 20)
    private String numeroTelefono;

    @Column(name = "direccion", length = 255)
    private String direccion;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    private boolean enabled;

    // Relación muchos a muchos con roles
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<RoleEntity> roles = new HashSet<>();
}