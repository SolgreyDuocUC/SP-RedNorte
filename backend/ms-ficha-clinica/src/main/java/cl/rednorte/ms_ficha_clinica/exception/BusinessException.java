package cl.rednorte.ms_ficha_clinica.exception;

public class BusinessException extends RuntimeException {
    public BusinessException(String message) {
        super(message);
    }
}
