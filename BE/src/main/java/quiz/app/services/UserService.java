package quiz.app.services;

import quiz.app.dto.UserDTO;
import quiz.app.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }


    public UserDTO registerUser(String username, String password, String role) {
        UserDTO user = new UserDTO();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        return userRepository.save(user);
    }

    public UserDTO findUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
}
