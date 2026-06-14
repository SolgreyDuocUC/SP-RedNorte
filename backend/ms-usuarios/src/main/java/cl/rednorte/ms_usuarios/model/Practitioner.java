package cl.rednorte.ms_usuarios.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "profesionales")
public class Practitioner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_profesional")
    private Integer practitionerId;

    @NotNull(message = "El RUN no puede ser nulo")
    @Size(min = 1, max = 12, message = "El RUN debe tener entre 1 y 12 caracteres")
    @Column(name = "run_profesional", nullable = false, length = 12, unique = true)
    private String runPractitioner;

    @NotNull(message = "El estado activo es obligatorio")
    @Column(name = "activo", nullable = false)
    private boolean activePractitioner;

    @NotNull(message = "El primer nombre no puede ser nulo")
    @Size(max = 200, message = "El primer nombre no puede superar los 200 caracteres")
    @Column(name = "primer_nombre", nullable = false, length = 200)
    private String firstNamePractitioner;

    @Size(max = 200, message = "El segundo nombre no puede superar los 200 caracteres")
    @Column(name = "segundo_nombre", length = 200)
    private String secondNamePractitioner;

    @NotNull(message = "El apellido no puede ser nulo")
    @Size(max = 200, message = "El apellido no puede superar los 200 caracteres")
    @Column(name = "apellidos", nullable = false, length = 200)
    private String lastNamePractitioner;

    @NotNull(message = "El género no puede ser nulo")
    @Size(min = 1, max = 1, message = "El género debe ser de 1 solo carácter")
    @Column(name = "genero", nullable = false, length = 1)
    private String genderPractitioner;

    @NotNull(message = "La fecha de nacimiento no puede ser nula")
    @Column(name = "fecha_nacimiento", nullable = false)
    private LocalDate birthdayPractitioner;

    @OneToMany(mappedBy = "practitioner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ContactPoint> contactPointsPractitioner = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "id_defuncion", referencedColumnName = "deceased_id")
    private Deceased deceasedPractitioner;

    @OneToMany(mappedBy = "practitioner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addressesPractitioner = new ArrayList<>();

    @OneToMany(mappedBy = "practitioner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Qualification> qualificationsPractitioner = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "practitioner_centros", joinColumns = @JoinColumn(name = "practitioner_id"))
    @Column(name = "centro_id")
    private List<Long> centroIds = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "practitioner_especialidades", joinColumns = @JoinColumn(name = "practitioner_id"))
    @Column(name = "especialidad_id")
    private List<Long> especialidadIds = new ArrayList<>();

}