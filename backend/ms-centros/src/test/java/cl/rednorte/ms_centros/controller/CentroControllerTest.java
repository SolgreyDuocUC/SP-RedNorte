package cl.rednorte.ms_centros.controller;

import cl.rednorte.ms_centros.service.CentroService;
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
import java.util.HashMap;
import java.util.Map;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class CentroControllerTest {

    private MockMvc mockMvc;

    @Mock
    private CentroService centroService;

    @InjectMocks
    private CentroController centroController;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(centroController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void crearOrganizacion_ShouldReturnSuccessMessage() throws Exception {
        Map<String, String> payload = new HashMap<>();
        payload.put("id", "org-1");
        payload.put("name", "Org Test");

        when(centroService.crearOrganizacion(anyString(), anyString())).thenReturn("org-1");

        mockMvc.perform(post("/api/v1/organizations")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isOk())
                .andExpect(content().string("Organización creada exitosamente con ID: org-1"));

        verify(centroService, times(1)).crearOrganizacion("org-1", "Org Test");
    }

    @Test
    void obtenerOrganizacion_ShouldReturnOrganization() throws Exception {
        Map<String, Object> org = new HashMap<>();
        org.put("id", "org-1");
        org.put("name", "Org Test");

        when(centroService.obtenerOrganizacion("org-1")).thenReturn(org);

        mockMvc.perform(get("/api/v1/organizations/org-1"))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(org)));

        verify(centroService, times(1)).obtenerOrganizacion("org-1");
    }

    @Test
    void listarOrganizaciones_ShouldReturnList() throws Exception {
        when(centroService.listarOrganizaciones()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/organizations"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));

        verify(centroService, times(1)).listarOrganizaciones();
    }

    @Test
    void crearUbicacion_ShouldReturnSuccessMessage() throws Exception {
        Map<String, String> payload = new HashMap<>();
        payload.put("id", "loc-1");
        payload.put("organization_id", "org-1");
        payload.put("name", "Loc Test");
        payload.put("status", "active");

        when(centroService.crearUbicacion(anyString(), anyString(), anyString(), anyString())).thenReturn("loc-1");

        mockMvc.perform(post("/api/v1/locations")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isOk())
                .andExpect(content().string("Ubicación creada exitosamente con ID: loc-1"));

        verify(centroService, times(1)).crearUbicacion("loc-1", "org-1", "Loc Test", "active");
    }

    @Test
    void obtenerUbicacion_ShouldReturnLocation() throws Exception {
        Map<String, Object> loc = new HashMap<>();
        loc.put("id", "loc-1");
        loc.put("name", "Loc Test");

        when(centroService.obtenerUbicacion("loc-1")).thenReturn(loc);

        mockMvc.perform(get("/api/v1/locations/loc-1"))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(loc)));

        verify(centroService, times(1)).obtenerUbicacion("loc-1");
    }

    @Test
    void listarUbicaciones_ShouldReturnList() throws Exception {
        when(centroService.listarUbicaciones()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/v1/locations"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));

        verify(centroService, times(1)).listarUbicaciones();
    }
}
