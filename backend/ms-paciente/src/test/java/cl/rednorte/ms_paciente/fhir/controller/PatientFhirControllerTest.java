package cl.rednorte.ms_paciente.fhir.controller;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;
import cl.rednorte.ms_paciente.fhir.PatientFhirQueryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;

import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class PatientFhirControllerTest {

    private MockMvc mockMvc;

    @Mock
    private PatientFhirQueryService patientFhirQueryService;

    @Mock
    private FhirContext fhirContext;

    @Mock
    private IParser jsonParser;

    @InjectMocks
    private PatientFhirController patientFhirController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(patientFhirController).build();
    }

    @Test
    void getPatient_WhenExists_ShouldReturnFhirJson() throws Exception {
        String fhirJson = "{\"resourceType\":\"Patient\",\"id\":\"1\"}";
        when(patientFhirQueryService.findAsFhirJson("1")).thenReturn(Optional.of(fhirJson));

        mockMvc.perform(get("/Patient/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/fhir+json"))
                .andExpect(content().string(fhirJson));

        verify(patientFhirQueryService, times(1)).findAsFhirJson("1");
    }

    @Test
    void getPatient_WhenNotExists_ShouldReturnNotFound() throws Exception {
        when(patientFhirQueryService.findAsFhirJson("99")).thenReturn(Optional.empty());
        when(fhirContext.newJsonParser()).thenReturn(jsonParser);
        when(jsonParser.encodeResourceToString(any())).thenReturn("{\"resourceType\":\"OperationOutcome\"}");

        mockMvc.perform(get("/Patient/99"))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType("application/fhir+json"))
                .andExpect(content().string("{\"resourceType\":\"OperationOutcome\"}"));

        verify(patientFhirQueryService, times(1)).findAsFhirJson("99");
    }
}
