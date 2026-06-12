package cl.rednorte.ms_usuarios.service.Impl;

import cl.rednorte.ms_usuarios.dto.*;
import cl.rednorte.ms_usuarios.model.*;
import cl.rednorte.ms_usuarios.repository.PractitionerRepository;
import cl.rednorte.ms_usuarios.service.PractitionerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PractitionerServiceImpl implements PractitionerService {

    private final PractitionerRepository practitionerRepository;

    @Override
    public List<PractitionerDTO> findAll() {
        return practitionerRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<PractitionerDTO> findById(int id) {
        return practitionerRepository.findById(id)
                .map(this::convertToDTO);
    }

    @Override
    public List<PractitionerDTO> findByName(String name) {
        return practitionerRepository.findByFirstNamePractitionerContainingIgnoreCase(name)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<PractitionerDTO> findByRun(String run) {
        return practitionerRepository.findByRunPractitioner(run)
                .map(this::convertToDTO);
    }

    @Override
    public PractitionerDTO save(PractitionerDTO practitionerDTO) {
        // Mapeo inverso si es necesario
        return null;
    }

    @Override
    public PractitionerDTO update(int id, PractitionerDTO practitionerDTO) {
        return null;
    }

    @Override
    public void deleteById(int id) {
        practitionerRepository.deleteById(id);
    }

    private PractitionerDTO convertToDTO(Practitioner p) {
        return PractitionerDTO.builder()
                .practitionerId(p.getPractitionerId())
                .runPractitioner(p.getRunPractitioner())
                .activePractitioner(p.isActivePractitioner())
                .firstNamePractitioner(p.getFirstNamePractitioner())
                .secondNamePractitioner(p.getSecondNamePractitioner())
                .lastNamePractitioner(p.getLastNamePractitioner())
                .genderPractitioner(p.getGenderPractitioner())
                .birthdayPractitioner(p.getBirthdayPractitioner())
                .qualificationsPractitioner(p.getQualificationsPractitioner() != null ? 
                    p.getQualificationsPractitioner().stream()
                        .map(q -> QualificationDTO.builder()
                            .qualificationId(q.getQualification_id())
                            .qualificationCode(q.getQualificationCode())
                            .build())
                        .collect(Collectors.toList()) : null)
                .contactPointsPractitioner(p.getContactPointsPractitioner() != null ? 
                    p.getContactPointsPractitioner().stream()
                        .map(c -> ContactDTO.builder()
                            .contactId(c.getContactPointId())
                            .contactType(c.getSystemContact())
                            .contactValue(c.getValueContatc()) // Corrigiendo typo del modelo
                            .build())
                        .collect(Collectors.toList()) : null)
                .build();
    }
}
