package cl.rednorte.ms_centros.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.flywaydb.core.Flyway;
import org.flywaydb.core.api.output.MigrateResult;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

/**
 * Ejecuta las migraciones de datos de Flyway (src/main/resources/db/migration)
 * DESPUÉS de que Hibernate haya creado/actualizado el esquema (ddl-auto=update).
 * En este proyecto Flyway solo versiona datos de poblado, no el DDL, por lo que
 * se dispara manualmente en un CommandLineRunner (ejecuta al final del arranque,
 * cuando las tablas ya existen) en vez de dejar que Spring Boot lo autoconfigure
 * (lo que correría ANTES de Hibernate y fallaría por tablas inexistentes).
 * Al vivir en el classpath del jar, funciona igual en local, Docker y prod.
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
        runMigrations();
    }

    /**
     * Ejecuta las migraciones pendientes. Es seguro llamarlo múltiples veces:
     * Flyway registra cada versión aplicada en flyway_schema_history_centros y
     * omite las que ya corrieron.
     */
    public String runMigrations() {
        MigrateResult result = buildFlyway().migrate();
        String msg = "Migraciones aplicadas: " + result.migrationsExecuted
                + " (esquema " + result.targetSchemaVersion + ")";
        log.info(msg);
        return msg;
    }

    private Flyway buildFlyway() {
        return Flyway.configure()
                .dataSource(dataSource)
                .table("flyway_schema_history_centros")
                .locations("classpath:db/migration")
                .baselineOnMigrate(true)
                // El baseline por defecto es version "1", que coincide con
                // nuestra V1 real: Flyway la trataria como "ya aplicada" y la
                // saltaria (Hibernate ya crea las tablas antes de que Flyway
                // corra, por lo que SIEMPRE ve un esquema "no vacio"). Con
                // baselineVersion 0 el punto de partida queda ANTES de V1, así
                // que V1 en adelante se ejecutan de verdad en una BD nueva.
                .baselineVersion("0")
                .load();
    }
}
