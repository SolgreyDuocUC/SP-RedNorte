package cl.rednorte.ms_usuarios.security;

import cl.rednorte.ms_usuarios.model.UserEntity;
import cl.rednorte.ms_usuarios.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JpaUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    @Override
    public UserDetails loadUserByUsername(String emailOrUsername) throws UsernameNotFoundException {

        UserEntity user = userRepository.findByEmail(emailOrUsername)
                .or(() -> userRepository.findByRun(emailOrUsername))
                .orElseThrow(() -> new UsernameNotFoundException(
                        String.format("No user found with email or username '%s'", emailOrUsername)
                ));

        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                user.isEnabled(),
                true,
                true,
                true,
                authorities
        );
    }
}
