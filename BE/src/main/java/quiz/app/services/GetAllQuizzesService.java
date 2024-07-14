package quiz.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import quiz.app.dto.QuizDTO;
import quiz.app.repositories.QuizRepository;

import java.util.List;

@Service
public class GetAllQuizzesService {

    private final QuizRepository quizRepository;

    @Autowired
    public GetAllQuizzesService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public List<QuizDTO> getAllQuizzes() {
        List<QuizDTO> quizzes = quizRepository.findAll();
        quizzes.forEach(quiz -> System.out.println(quiz));
        return quizzes;
    }
}
