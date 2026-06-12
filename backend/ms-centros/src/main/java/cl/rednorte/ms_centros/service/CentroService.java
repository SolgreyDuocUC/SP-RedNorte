package cl.rednorte.ms_centros.service;

import cl.rednorte.ms_centros.model.CentroEntity;
import cl.rednorte.ms_centros.repository.CentroRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CentroService {

    private final CentroRepository centroRepository;

    public CentroService(CentroRepository centroRepository) {
        this.centroRepository = centroRepository;
    }

    public String crearUbicacion(String id, String organizationId, String name, String status, List<String> specialties) {
        return crearUbicacion(id, organizationId, name, status, specialties, null, null, null, null, null, null);
    }

    public String crearUbicacion(String id, String organizationId, String name, String status) {
        return crearUbicacion(id, organizationId, name, status, null, null, null, null, null, null, null);
    }

    public String crearUbicacion(String id, String organizationId, String name, String status, List<String> specialties,
                                 String type, String address, String commune, String region, String phone, String email) {
        CentroEntity centro;
        if (id != null && !id.trim().isEmpty() && centroRepository.existsById(id)) {
            centro = centroRepository.findById(id).orElseThrow();
        } else {
            centro = new CentroEntity();
            if (id != null && !id.trim().isEmpty()) {
                centro.setId(id);
            }
        }

        centro.setName(name);
        centro.setStatus(status != null ? status : "active");
        if (specialties != null) {
            centro.setSpecialties(specialties);
        }
        if (type != null) {
            centro.setType(type);
        }
        if (address != null) {
            centro.setAddress(address);
        }
        if (commune != null) {
            centro.setCommune(commune);
        }
        if (region != null) {
            centro.setRegion(region);
        }
        if (phone != null) {
            centro.setPhone(phone);
        }
        if (email != null) {
            centro.setEmail(email);
        }

        CentroEntity saved = centroRepository.save(centro);
        return saved.getId();
    }

    public Map<String, Object> obtenerUbicacion(String id) {
        CentroEntity c = centroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Centro no encontrado: " + id));
        return mapToMap(c);
    }

    public List<Map<String, Object>> listarUbicaciones() {
        List<CentroEntity> list = centroRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();
        for (CentroEntity c : list) {
            result.add(mapToMap(c));
        }
        return result;
    }

    public void eliminarUbicacion(String id) {
        centroRepository.deleteById(id);
    }

    // Métodos dummy para Organizaciones
    public String crearOrganizacion(String id, String name) {
        return id != null ? id : "org-1";
    }

    public Map<String, Object> obtenerOrganizacion(String id) {
        Map<String, Object> org = new HashMap<>();
        org.put("id", id);
        org.put("name", "Organización Default");
        return org;
    }

    public List<Map<String, Object>> listarOrganizaciones() {
        return new ArrayList<>();
    }

    private Map<String, Object> mapToMap(CentroEntity c) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", c.getId());
        map.put("name", c.getName());
        map.put("status", c.getStatus() != null ? c.getStatus() : "active");
        map.put("specialties", c.getSpecialties() != null ? c.getSpecialties() : new ArrayList<String>());
        map.put("type", c.getType() != null ? c.getType() : "hospital");
        map.put("address", c.getAddress() != null ? c.getAddress() : "");
        map.put("commune", c.getCommune() != null ? c.getCommune() : "");
        map.put("region", c.getRegion() != null ? c.getRegion() : "");
        map.put("phone", c.getPhone() != null ? c.getPhone() : "");
        map.put("email", c.getEmail() != null ? c.getEmail() : "");
        return map;
    }
}
