package quiz.app.services;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import quiz.app.dto.InfoQuizDTO;
import quiz.app.dto.QuestionDTO;
import quiz.app.dto.QuizDTO;
import quiz.app.repositories.QuizRepository;

@Service
public class GetQuizService {

    private final QuizRepository quizRepository;

    @Autowired
    public GetQuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public ResponseEntity<InfoQuizDTO> getQuizService(
            @PathVariable String id,
            @RequestParam(value = "randomizeQuiz", defaultValue = "false") boolean randomizeQuiz) {

        Optional<QuizDTO> quizOptional = quizRepository.findById(id);

        if (quizOptional.isPresent()) {
            QuizDTO quiz = quizOptional.get();

            List<QuestionDTO> questions = quiz.getQuestions();
            if (randomizeQuiz) {
                for (QuestionDTO question : questions) {
                    Collections.shuffle(question.getOptions(), new Random());
                }
                Collections.shuffle(questions, new Random());
            }

            InfoQuizDTO infoQuiz = new InfoQuizDTO(
                    quiz.getId(),
                    quiz.getName(),
                    quiz.getNumberOfQuestions(),
                    quiz.getLevel(),
                    quiz.getLanguage(),
                    questions
            );

            return new ResponseEntity<>(infoQuiz, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
