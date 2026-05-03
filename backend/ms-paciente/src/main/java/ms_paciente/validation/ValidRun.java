package ms_paciente.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = RunValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidRun {

    String message() default "RUN inválido";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
