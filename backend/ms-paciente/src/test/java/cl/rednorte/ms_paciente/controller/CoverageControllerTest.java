package cl.rednorte.ms_paciente.controller;

import cl.rednorte.ms_paciente.dto.CoverageDTO;
import cl.rednorte.ms_paciente.service.CoverageService;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class CoverageControllerTest {

    private MockMvc mockMvc;

    @Mock
    private CoverageService coverageService;

    @InjectMocks
    private CoverageController coverageController;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(coverageController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void getAllCoverages_ShouldReturnList() throws Exception {
        when(coverageService.findAll()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/coverages"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));

        verify(coverageService, times(1)).findAll();
    }

    @Test
    void createCoverage_ShouldReturnCreated() throws Exception {
        CoverageDTO dto = new CoverageDTO();
        when(coverageService.create(any(CoverageDTO.class))).thenReturn(dto);

        mockMvc.perform(post("/api/v1/coverages")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        verify(coverageService, times(1)).create(any(CoverageDTO.class));
    }
}
