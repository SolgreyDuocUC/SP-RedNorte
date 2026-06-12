package cl.rednorte.ms_ficha_clinica;

import cl.rednorte.ms_ficha_clinica.controller.ObservationController;
import cl.rednorte.ms_ficha_clinica.dto.ObservationDTO;
import cl.rednorte.ms_ficha_clinica.service.ObservationService;
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
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class ObservationControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ObservationService observationService;

    @InjectMocks
    private ObservationController observationController;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(observationController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void createObservation_ShouldReturnCreated() throws Exception {
        ObservationDTO dto = new ObservationDTO();
        dto.setId("1");
        when(observationService.createObservation(any(ObservationDTO.class))).thenReturn(dto);

        mockMvc.perform(post("/api/v1/observations")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(observationService, times(1)).createObservation(any(ObservationDTO.class));
    }

    @Test
    void getAllObservations_WhenEmpty_ShouldReturnNoContent() throws Exception {
        when(observationService.getAllObservations()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/observations"))
                .andExpect(status().isNoContent());

        verify(observationService, times(1)).getAllObservations();
    }

    @Test
    void getAllObservations_WhenNotEmpty_ShouldReturnOk() throws Exception {
        when(observationService.getAllObservations()).thenReturn(List.of(new ObservationDTO()));

        mockMvc.perform(get("/api/v1/observations"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(observationService, times(1)).getAllObservations();
    }

    @Test
    void getObservationById_ShouldReturnOk() throws Exception {
        ObservationDTO dto = new ObservationDTO();
        when(observationService.getObservationById("1")).thenReturn(dto);

        mockMvc.perform(get("/api/v1/observations/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(observationService, times(1)).getObservationById("1");
    }

    @Test
    void updateObservation_ShouldReturnUpdated() throws Exception {
        ObservationDTO dto = new ObservationDTO();
        when(observationService.updateObservation(eq("1"), any(ObservationDTO.class))).thenReturn(dto);

        mockMvc.perform(put("/api/v1/observations/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(observationService, times(1)).updateObservation(eq("1"), any(ObservationDTO.class));
    }

    @Test
    void deleteObservation_ShouldReturnNoContent() throws Exception {
        doNothing().when(observationService).deleteObservation("1");

        mockMvc.perform(delete("/api/v1/observations/1"))
                .andExpect(status().isNoContent());

        verify(observationService, times(1)).deleteObservation("1");
    }
}
