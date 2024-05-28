package quiz.app;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;

@RestController
public class QuizController {

    private final ResourceLoader resourceLoader;

    @Autowired
    public QuizController(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/infoQuiz")
    public List<InfoQuiz> infoQuiz() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Resource resource = resourceLoader.getResource("classpath:quizzes.json");
        @SuppressWarnings("unchecked")
        Map<String, Object> quizzesMap = objectMapper.readValue(resource.getInputStream(), Map.class);
        List<InfoQuiz> quizzes = new ArrayList<>();
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> quizzesList = (List<Map<String, Object>>) quizzesMap.get("quizzes");
        for (Map<String, Object> quiz : quizzesList) {
            String id = (String) quiz.get("id");
            String name = (String) quiz.get("name");
            int numberOfQuestions = (int) quiz.get("numberOfQuestions");
            int level = (int) quiz.get("level");
            String language = (String) quiz.get("language");
            quizzes.add(new InfoQuiz(id, name, numberOfQuestions, level, language, null));
        }
        return quizzes;
    }

    @GetMapping("/quiz/{id}")
    public ResponseEntity<InfoQuiz> getQuizById(
            @PathVariable String id,
            @RequestParam(value = "randomizeQuiz", defaultValue = "false") boolean randomizeQuiz) {
        try {
            Resource resource = resourceLoader.getResource("classpath:quizzes.json");
            ObjectMapper objectMapper = new ObjectMapper();
            @SuppressWarnings("unchecked")
            Map<String, Object> quizzesMap = objectMapper.readValue(resource.getInputStream(), Map.class);
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> quizzesList = (List<Map<String, Object>>) quizzesMap.get("quizzes");
            for (Map<String, Object> quiz : quizzesList) {
                if (quiz.get("id").equals(id)) {
                    String name = (String) quiz.get("name");
                    int numberOfQuestions = (int) quiz.get("numberOfQuestions");
                    int level = (int) quiz.get("level");
                    String language = (String) quiz.get("language");
                    @SuppressWarnings("unchecked")
                    List<Map<String, Object>> questions = (List<Map<String, Object>>) quiz.get("questions");
                    List<Question> questionList = new ArrayList<>();
                    for (Map<String, Object> question : questions) {
                        String questionText = (String) question.get("question");
                        @SuppressWarnings("unchecked")
                        List<String> options = (List<String>) question.get("options");
                        String correctOption = (String) question.get("correctOption");
                        int index = (int) question.get("index");

                        if (randomizeQuiz) {
                            Collections.shuffle(options, new Random());
                        }
                        questionList.add(new Question(questionText, options, correctOption, index));
                    }
                    if (randomizeQuiz) {
                        Collections.shuffle(questionList, new Random());
                    }
                    InfoQuiz infoQuiz = new InfoQuiz(id, name, numberOfQuestions, level, language, questionList);
                    return new ResponseEntity<>(infoQuiz, HttpStatus.OK);
                }
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/submitQuiz")
    public ResponseEntity<InfoQuiz> submitQuiz(@RequestBody InfoQuiz quiz) {
        try {
            // Load the correct answers from quizzes.json
            Resource resource = resourceLoader.getResource("classpath:quizzes.json");
            ObjectMapper objectMapper = new ObjectMapper();
            @SuppressWarnings("unchecked")
            Map<String, Object> quizzesMap = objectMapper.readValue(resource.getInputStream(), Map.class);
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> quizzesList = (List<Map<String, Object>>) quizzesMap.get("quizzes");

            // Find the correct quiz by ID
            for (Map<String, Object> correctQuiz : quizzesList) {
                if (correctQuiz.get("id").equals(quiz.getId())) {
                    @SuppressWarnings("unchecked")
                    List<Map<String, Object>> correctQuestions = (List<Map<String, Object>>) correctQuiz.get("questions");

                    // Create a map to store the correct answers by question text
                    Map<String, String> correctAnswersMap = new HashMap<>();
                    for (Map<String, Object> correctQuestion : correctQuestions) {
                        String questionText = (String) correctQuestion.get("question");
                        String correctOption = (String) correctQuestion.get("correctOption");
                        correctAnswersMap.put(questionText, correctOption);
                    }

                    // Calculate the score and set isCorrect for each question
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
                }
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
