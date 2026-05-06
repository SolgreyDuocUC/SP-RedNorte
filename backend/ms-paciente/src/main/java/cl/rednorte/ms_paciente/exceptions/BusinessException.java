package cl.rednorte.ms_paciente.exceptions;

public class BusinessException extends RuntimeException {

    public BusinessException(String message) {
        super(message);
    }
}
