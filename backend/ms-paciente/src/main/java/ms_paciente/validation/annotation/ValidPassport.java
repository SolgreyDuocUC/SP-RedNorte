package ms_paciente.validation.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import ms_paciente.validation.validator.PassportValidator;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = PassportValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidPassport {
    String message() default "Pasaporte inválido";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
