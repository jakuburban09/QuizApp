package quiz.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import quiz.app.dto.InfoQuizDTO;
import quiz.app.dto.QuizDTO;
import quiz.app.services.CreateQuizService;
import quiz.app.services.GetAllInfoQuizzesService;
import quiz.app.services.GetAllQuizzesService;
import quiz.app.services.GetQuizService;
import quiz.app.services.SubmitQuizService;

import java.util.*;

@RestController
public class QuizController {

    private final GetAllQuizzesService getAllQuizzesService;
    private final GetAllInfoQuizzesService getAllInfoQuizzesService;
    private final CreateQuizService createQuizService;
    private final SubmitQuizService submitQuizService;
    private final GetQuizService getQuizService;

    @Autowired
    public QuizController(
            GetAllQuizzesService getAllQuizzesService,
            GetAllInfoQuizzesService getAllInfoQuizzesService,
            CreateQuizService createQuizService,
            SubmitQuizService submitQuizService,
            GetQuizService getQuizService) {
        this.getAllQuizzesService = getAllQuizzesService;
        this.getAllInfoQuizzesService = getAllInfoQuizzesService;
        this.createQuizService = createQuizService;
        this.submitQuizService = submitQuizService;
        this.getQuizService = getQuizService;
    }

    @CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.11:3000"})

    @GetMapping("/quizzes")
    public List<QuizDTO> getAllQuizzes() {
        return ((GetAllQuizzesService) getAllQuizzesService).getAllQuizzes();
    }

    @GetMapping("/infoQuiz")
    public List<InfoQuizDTO> getAllInfoQuizzesService(){
        return ((GetAllInfoQuizzesService) getAllInfoQuizzesService).getAllInfoQuizzes();
    }

    @GetMapping("/quiz/{id}")
    public ResponseEntity<InfoQuizDTO> getQuizService(@PathVariable String id, @RequestParam(value = "randomizeQuiz", defaultValue = "false") boolean randomizeQuiz){
        return ((GetQuizService) getQuizService).getQuizService(id, randomizeQuiz);
    }

    @PostMapping("/submitQuiz")
    public ResponseEntity<Object> submitQuizService(@RequestBody InfoQuizDTO quiz) {
        return submitQuizService.submitQuizService(quiz);
    }

    @PostMapping("/createQuiz")
    public ResponseEntity<String> createQuizService(@RequestBody QuizDTO quiz) {
        return ((CreateQuizService) createQuizService).createQuizService(quiz);
    }

}
