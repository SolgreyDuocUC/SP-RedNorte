package cl.rednorte.ms_ficha_clinica;

import cl.rednorte.ms_ficha_clinica.controller.ClinicalHistoryController;
import cl.rednorte.ms_ficha_clinica.dto.ClinicalHistoryDTO;
import cl.rednorte.ms_ficha_clinica.service.ClinicalHistoryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class ClinicalHistoryControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ClinicalHistoryService clinicalHistoryService;

    @InjectMocks
    private ClinicalHistoryController clinicalHistoryController;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(clinicalHistoryController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void getFullClinicalHistory_ShouldReturnHistory() throws Exception {
        String patientId = "pat-1";
        ClinicalHistoryDTO dto = new ClinicalHistoryDTO();

        when(clinicalHistoryService.getFullClinicalHistory(patientId)).thenReturn(dto);

        mockMvc.perform(get("/api/v1/history/patient/{patientId}", patientId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(clinicalHistoryService, times(1)).getFullClinicalHistory(patientId);
    }
}
