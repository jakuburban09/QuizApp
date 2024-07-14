package quiz.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import quiz.app.dto.QuizDTO;
import quiz.app.repositories.QuizRepository;

@Service
public class CreateQuizService {

    private final QuizRepository quizRepository;

    @Autowired
    public CreateQuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public ResponseEntity<String> createQuizService(QuizDTO quiz) {
        if (quiz.getId() == null || quiz.getName() == null || 
            quiz.getQuestions() == null || quiz.getQuestions().isEmpty()) {
            return new ResponseEntity<>("Missing required fields", HttpStatus.BAD_REQUEST);
        }

        quizRepository.save(quiz);
        return new ResponseEntity<>("Quiz created successfully", HttpStatus.CREATED);
    }
}