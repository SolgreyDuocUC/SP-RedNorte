package cl.rednorte.ms_centros.excptions;

public class CentroNotFoundException extends RuntimeException {
    public CentroNotFoundException(Long id) {
        super("Centro médico no encontrado con el ID: " + id);
    }
}
