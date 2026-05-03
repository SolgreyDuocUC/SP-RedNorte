package ms_paciente.validation.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import ms_paciente.validation.validator.IdentifierDTOValidator;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = IdentifierDTOValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidIdentifier {
    String message() default "Identificador inválido";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
