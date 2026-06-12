package cl.rednorte.ms_usuarios.repository;

import cl.rednorte.ms_usuarios.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
}
