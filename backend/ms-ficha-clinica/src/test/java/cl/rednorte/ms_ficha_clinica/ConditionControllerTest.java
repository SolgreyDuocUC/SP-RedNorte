package cl.rednorte.ms_ficha_clinica;

import cl.rednorte.ms_ficha_clinica.controller.ConditionController;
import cl.rednorte.ms_ficha_clinica.dto.ConditionDTO;
import cl.rednorte.ms_ficha_clinica.service.ConditionService;
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

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class ConditionControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ConditionService conditionService;

    @InjectMocks
    private ConditionController conditionController;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(conditionController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void createCondition_ShouldReturnCreated() throws Exception {
        ConditionDTO dto = new ConditionDTO();
        when(conditionService.createCondition(any(ConditionDTO.class))).thenReturn(dto);

        mockMvc.perform(post("/api/v1/conditions")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(conditionService, times(1)).createCondition(any(ConditionDTO.class));
    }

    @Test
    void getConditionById_WhenExists_ShouldReturnOk() throws Exception {
        ConditionDTO dto = new ConditionDTO();
        when(conditionService.getConditionById("1")).thenReturn(dto);

        mockMvc.perform(get("/api/v1/conditions/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(conditionService, times(1)).getConditionById("1");
    }

    @Test
    void getConditionById_WhenNotExists_ShouldReturnNotFound() throws Exception {
        when(conditionService.getConditionById("99")).thenReturn(null);

        mockMvc.perform(get("/api/v1/conditions/99"))
                .andExpect(status().isNotFound());

        verify(conditionService, times(1)).getConditionById("99");
    }

    @Test
    void getConditionsByPatientId_ShouldReturnList() throws Exception {
        when(conditionService.getConditionsByPatientId("pat-1")).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/conditions/patient/pat-1"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));

        verify(conditionService, times(1)).getConditionsByPatientId("pat-1");
    }

    @Test
    void getConditionsByEncounterId_ShouldReturnList() throws Exception {
        when(conditionService.getConditionsByEncounterId("enc-1")).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/conditions/encounter/enc-1"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));

        verify(conditionService, times(1)).getConditionsByEncounterId("enc-1");
    }

    @Test
    void getConditionHistory_ShouldReturnList() throws Exception {
        when(conditionService.getConditionHistory("pat-1")).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/conditions/patient/pat-1/history"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));

        verify(conditionService, times(1)).getConditionHistory("pat-1");
    }

    @Test
    void deleteCondition_ShouldReturnNoContent() throws Exception {
        doNothing().when(conditionService).deleteCondition("1");

        mockMvc.perform(delete("/api/v1/conditions/1"))
                .andExpect(status().isNoContent());

        verify(conditionService, times(1)).deleteCondition("1");
    }
}
