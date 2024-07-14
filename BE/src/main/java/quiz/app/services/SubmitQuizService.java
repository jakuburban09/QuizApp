package quiz.app.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import quiz.app.repositories.QuizRepository;
import quiz.app.dto.QuizDTO;
import quiz.app.dto.InfoQuizDTO;
import quiz.app.dto.QuestionDTO;

@Service
public class SubmitQuizService {

    private final QuizRepository quizRepository;

    @Autowired
    public SubmitQuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public ResponseEntity<Object> submitQuizService(InfoQuizDTO quiz) {
        if (quiz.getId() == null) {
            return new ResponseEntity<>("Quiz ID must not be null", HttpStatus.BAD_REQUEST);
        }

        Optional<QuizDTO> correctQuizOptional = quizRepository.findById(quiz.getId());

        if (correctQuizOptional.isPresent()) {
            QuizDTO correctQuiz = correctQuizOptional.get();
            Map<String, String> correctAnswersMap = new HashMap<>();

            for (QuestionDTO correctQuestion : correctQuiz.getQuestions()) {
                correctAnswersMap.put(correctQuestion.getQuestion(), correctQuestion.getCorrectOption());
            }

            float score = 0;
            int correctAnswers = 0;
            int incorrectAnswers = 0;

            List<QuestionDTO> submittedQuestions = quiz.getQuestions();
            for (QuestionDTO submittedQuestion : submittedQuestions) {
                String correctOption = correctAnswersMap.get(submittedQuestion.getQuestion());

                if (submittedQuestion.getAnswer() != null && submittedQuestion.getAnswer().equals(correctOption)) {
                    submittedQuestion.setCorrect(true);
                    correctAnswers++;
                    score += 1;
                } else {
                    submittedQuestion.setCorrect(false);
                    incorrectAnswers++;
                }

                submittedQuestion.setCorrectOption(correctOption);
            }

            score = (score / submittedQuestions.size()) * 100;

            quiz.setCorrectAnswers(correctAnswers);
            quiz.setIncorrectAnswers(incorrectAnswers);
            quiz.setScore(score);

            return new ResponseEntity<>(quiz, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
