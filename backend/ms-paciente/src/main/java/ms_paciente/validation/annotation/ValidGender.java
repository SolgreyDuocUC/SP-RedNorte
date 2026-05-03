package ms_paciente.validation.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import ms_paciente.validation.validator.GenderValidator;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = GenderValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidGender {
    String message() default "Género inválido";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
