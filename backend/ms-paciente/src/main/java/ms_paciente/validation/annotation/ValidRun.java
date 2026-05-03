package ms_paciente.validation.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import ms_paciente.validation.validator.RunValidator;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = RunValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidRun {
    String message() default "RUN inválido";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
