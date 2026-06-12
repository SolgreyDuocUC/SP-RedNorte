package cl.rednorte.ms_usuarios.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "practitioners")
public class Practitioner {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "practitioner_id", nullable = false, length = 100)
    private int practitionerId;

    @Column (name = "run_practitioner", nullable = false, length = 12)
    private String runPractitioner;

    @Column (name = "active_practitioner" , nullable = false)
    private boolean activePractitioner;

    @Column (name = "first_name_practitioner", nullable = false, length = 200)
    private String firstNamePractitioner;

    @Column (name = "second_name_practitioner", nullable = false, length = 200)
    private String secondNamePractitioner;

    @Column (name = "last_name_practitioner", nullable = false, length = 200)
    private String lastNamePractitioner;

    @Column (name = "gender_practitioner", nullable = false, length = 1)
    private String genderPractitioner;

    @Column (name = "birthday_practitioner", nullable = false )
    private Timestamp birthdayPractitioner;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "practitioner_id")
    private List<ContactPoint> contactPointsPractitioner;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "deceased_id")
    private Deceased deceasedPractitioner;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "practitioner_id")
    private List<Address> addressesPractitioner;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "practitioner_id")
    private List <Qualification> qualificationsPractitioner;


}
