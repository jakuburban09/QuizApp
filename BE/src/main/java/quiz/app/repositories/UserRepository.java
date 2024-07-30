package quiz.app.repositories;

import quiz.app.dto.UserDTO;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<UserDTO, String> {
    Optional<UserDTO> findByUsername(String username);
}
