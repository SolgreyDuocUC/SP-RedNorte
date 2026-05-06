package cl.rednorte.ms_paciente.exceptions;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
@Builder
public class ApiError {

    private Date timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
}
