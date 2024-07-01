package quiz.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
public class QuizController {

    private final QuizRepository quizRepository;

    @Autowired
    public QuizController(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/quizzes")
    public List<Quiz> getAllQuizzes() {
        List<Quiz> quizzes = quizRepository.findAll();
        quizzes.forEach(quiz -> System.out.println(quiz));
        return quizzes;
    }

    @GetMapping("/infoQuiz")
    public List<InfoQuiz> infoQuiz() {
        List<Quiz> quizzes = quizRepository.findAll();
        List<InfoQuiz> infoQuizzes = new ArrayList<>();

        for (Quiz quiz : quizzes) {
            infoQuizzes.add(new InfoQuiz(
                quiz.getId(),
                quiz.getName(),
                quiz.getNumberOfQuestions(),
                quiz.getLevel(),
                quiz.getLanguage(),
                null // Nebo můžeš předat otázky, pokud je to potřeba
            ));
        }

        return infoQuizzes;
    }


    @GetMapping("/quiz/{id}")
    public ResponseEntity<InfoQuiz> getQuizById(
            @PathVariable String id,
            @RequestParam(value = "randomizeQuiz", defaultValue = "false") boolean randomizeQuiz) {

        Optional<Quiz> quizOptional = quizRepository.findById(id);

        if (quizOptional.isPresent()) {
            Quiz quiz = quizOptional.get();

            List<Question> questions = quiz.getQuestions();
            if (randomizeQuiz) {
                for (Question question : questions) {
                    Collections.shuffle(question.getOptions(), new Random());
                }
                Collections.shuffle(questions, new Random());
            }

            InfoQuiz infoQuiz = new InfoQuiz(
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


    @PostMapping("/submitQuiz")
    public ResponseEntity<InfoQuiz> submitQuiz(@RequestBody InfoQuiz quiz) {
        Optional<Quiz> correctQuizOptional = quizRepository.findById(quiz.getId());

        if (correctQuizOptional.isPresent()) {
            Quiz correctQuiz = correctQuizOptional.get();
            Map<String, String> correctAnswersMap = new HashMap<>();

            for (Question correctQuestion : correctQuiz.getQuestions()) {
                correctAnswersMap.put(correctQuestion.getQuestion(), correctQuestion.getCorrectOption());
            }

            float score = 0;
            int correctAnswers = 0;
            int incorrectAnswers = 0;

            List<Question> submittedQuestions = quiz.getQuestions();
            for (Question submittedQuestion : submittedQuestions) {
                String correctOption = correctAnswersMap.get(submittedQuestion.getQuestion());

                if (submittedQuestion.getAnswer().equals(correctOption)) {
                    submittedQuestion.setCorrect(true);
                    correctAnswers++;
                    score += 1;
                } else {
                    submittedQuestion.setCorrect(false);
                    incorrectAnswers++;
                }

                // Set the correctOption in the submittedQuestion for returning to FE
                submittedQuestion.setCorrectOption(correctOption);
            }

            score = (score / submittedQuestions.size()) * 100;

            // Update the InfoQuiz object with the new data
            quiz.setCorrectAnswers(correctAnswers);
            quiz.setIncorrectAnswers(incorrectAnswers);
            quiz.setScore(score);

            return new ResponseEntity<>(quiz, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/createQuiz")
    public ResponseEntity<String> createQuiz(@RequestBody Quiz quiz) {
        // Kontrola, zda jsou všechny položky správně nastaveny
        if (quiz.getId() == null || quiz.getName() == null || 
            quiz.getQuestions() == null || quiz.getQuestions().isEmpty()) {
            return new ResponseEntity<>("Missing required fields", HttpStatus.BAD_REQUEST);
        }

        // Uložení do databáze
        quizRepository.save(quiz);
        return new ResponseEntity<>("Quiz created successfully", HttpStatus.CREATED);
    }
}
