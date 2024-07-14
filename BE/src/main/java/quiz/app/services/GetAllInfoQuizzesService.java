package quiz.app.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import quiz.app.dto.InfoQuizDTO;
import quiz.app.dto.QuizDTO;
import quiz.app.repositories.QuizRepository;

@Service
public class GetAllInfoQuizzesService {

    private final QuizRepository quizRepository;

    @Autowired
    public GetAllInfoQuizzesService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public List<InfoQuizDTO> getAllInfoQuizzes() {
        List<QuizDTO> quizzes = quizRepository.findAll();
        List<InfoQuizDTO> infoQuizzes = new ArrayList<>();

        for (QuizDTO quiz : quizzes) {
            infoQuizzes.add(new InfoQuizDTO(
                quiz.getId(),
                quiz.getName(),
                quiz.getNumberOfQuestions(),
                quiz.getLevel(),
                quiz.getLanguage(),
                null // Or you can pass questions if needed
            ));
        }

        return infoQuizzes;
    }
}
