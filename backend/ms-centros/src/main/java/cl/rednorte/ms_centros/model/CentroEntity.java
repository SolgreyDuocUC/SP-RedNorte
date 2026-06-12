package cl.rednorte.ms_centros.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "centros")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CentroEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String name;

    private String type; // hospital, clinic, primary-care, specialized-center

    private String address;

    private String commune;

    private String region;

    private String phone;

    private String email;

    private String status; // active, suspended, inactive

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "centro_specialties", joinColumns = @JoinColumn(name = "centro_id"))
    @Column(name = "specialty")
    @Builder.Default
    private List<String> specialties = new ArrayList<>();
}
