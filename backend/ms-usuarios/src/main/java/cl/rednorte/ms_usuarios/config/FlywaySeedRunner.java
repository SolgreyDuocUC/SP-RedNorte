package cl.rednorte.ms_usuarios.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

/**
 * Ejecuta las migraciones de datos de Flyway (src/main/resources/db/migration)
 * DESPUÉS de que Hibernate haya creado/actualizado el esquema (ddl-auto). En
 * este proyecto Flyway solo versiona datos de poblado, no el DDL, por lo que
 * se dispara manualmente en un CommandLineRunner en vez de dejar que Spring
 * Boot lo autoconfigure (lo que correría ANTES de Hibernate y fallaría por
 * tablas inexistentes). Al vivir en el classpath del jar, funciona igual en
 * local, Docker y prod.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class FlywaySeedRunner implements CommandLineRunner {

    private final DataSource dataSource;

    @Value("${app.db.auto-seed:true}")
    private boolean autoSeed;

    @Override
    public void run(String... args) {
        if (!autoSeed) {
            log.info("Auto-seed (Flyway) desactivado (app.db.auto-seed=false)");
            return;
        }
        var result = Flyway.configure()
                .dataSource(dataSource)
                .table("flyway_schema_history_usuarios")
                .locations("classpath:db/migration")
                .baselineOnMigrate(true)
                // baselineVersion 0: el default ("1") coincide con nuestra V1
                // real y Flyway la saltaria por creer que ya esta aplicada,
                // ya que Hibernate deja el esquema "no vacio" antes de que
                // Flyway corra. Con 0 el baseline queda antes de V1.
                .baselineVersion("0")
                .load()
                .migrate();
        log.info("Migraciones aplicadas: {} (esquema {})", result.migrationsExecuted, result.targetSchemaVersion);
    }
}
