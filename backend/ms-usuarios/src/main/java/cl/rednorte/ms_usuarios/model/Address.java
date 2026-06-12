package cl.rednorte.ms_usuarios.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "addresses")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id", nullable = false, length = 100)
    private int addressId;


    @Column(name = "use_address", nullable = true, length = 200)
    private String useAddress;

    @Column(name = "line_address", nullable = true, length = 200)
    private String lineAddress;

    @Column(name = "city_address", nullable = true, length = 200)
    private String cityAddress;

    @Column(name = "district_address", nullable = true, length = 200)
    private String districtAddress;

    @Column(name = "state_address", nullable = true, length = 200)
    private String stateAddress;

    @Column(name = "country_address", nullable = true, length = 200)
    private String countryAddress;

}
