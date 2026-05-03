package ms_paciente.model;

/*
 * MODELO DE DOMINIO PARA IDENTIFICADORES DEL PACIENTE.
 *
 * REPRESENTA DOCUMENTOS OFICIALES COMO:
 * - RUN (Chile)
 * - DNI (otros países)
 * - PASAPORTE
 *
 * REGLAS:
 * - type: obligatorio (define el tipo de documento)
 * - value: obligatorio (número del documento)
 * - country: opcional pero recomendado para interoperabilidad
 */

import ms_paciente.model.types.IdentifierType;

public class IdentifierModel {

    private IdentifierType type; // ENUM → evita errores de string
    private String value;
    private String country;
}
