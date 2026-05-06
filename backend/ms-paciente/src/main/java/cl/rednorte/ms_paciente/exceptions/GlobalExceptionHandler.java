package cl.rednorte.ms_paciente.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiError> handleNotFound(
            ResourceNotFoundException ex,
            HttpServletRequest request) {

        return buildResponse(ex, HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ApiError> handleDuplicate(
            DuplicateResourceException ex,
            HttpServletRequest request) {

        return buildResponse(ex, HttpStatus.CONFLICT, request);
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiError> handleBusiness(
            BusinessException ex,
            HttpServletRequest request) {

        return buildResponse(ex, HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGeneric(
            Exception ex,
            HttpServletRequest request) {

        return buildResponse(ex, HttpStatus.INTERNAL_SERVER_ERROR, request);
    }

    private ResponseEntity<ApiError> buildResponse(
            Exception ex,
            HttpStatus status,
            HttpServletRequest request) {

        ApiError error = ApiError.builder()
                .timestamp(new Date())
                .status(status.value())
                .error(status.getReasonPhrase())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();

        return new ResponseEntity<>(error, status);
    }
}
