package cl.rednorte.mspaciente.validation.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import cl.rednorte.mspaciente.validation.validator.GenderValidator;
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
