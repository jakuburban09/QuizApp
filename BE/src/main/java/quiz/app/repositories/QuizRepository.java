package quiz.app.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import quiz.app.dto.QuizDTO;

public interface QuizRepository extends MongoRepository<QuizDTO, String> {
}
