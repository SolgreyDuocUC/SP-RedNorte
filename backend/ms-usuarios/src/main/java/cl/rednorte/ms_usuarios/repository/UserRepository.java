package cl.rednorte.ms_usuarios.repository;

import cl.rednorte.ms_usuarios.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, UUID> {
    Optional<UserEntity> findByRun(String run);

    Optional<UserEntity> findByEmail(String email);

    boolean existsByRun(String run);

    boolean existsByEmail(String email);
}
