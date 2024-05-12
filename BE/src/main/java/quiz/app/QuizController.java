package quiz.app;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class QuizController {

    private final ResourceLoader resourceLoader;

    @Autowired
    public QuizController(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

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
    public ResponseEntity<InfoQuiz> getQuizById(@PathVariable String id) {
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
                        questionList.add(new Question(questionText, options, correctOption, index));
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
        // Calculate the score and set isCorrect for each question
        float score = 0;
        int correctAnswers = 0;
        int incorrectAnswers = 0;

        List<Question> questions = quiz.getQuestions();
        for (Question question : questions) {
            if (question.getAnswer().equals(question.getCorrectOption())) {
                /* question.setCorrectOption(true); */
                correctAnswers++;
                score += 1;
            } else {
                /* question.setCorrectOption(false); */
                incorrectAnswers++;
            }
        }

        score = (score / questions.size()) * 100;

        // Update the InfoQuiz object with the new data
        quiz.setCorrectAnswers(correctAnswers);
        quiz.setCorrectAnswers(incorrectAnswers);
        quiz.setScore(score);

        return new ResponseEntity<>(quiz, HttpStatus.OK);
    }
}
