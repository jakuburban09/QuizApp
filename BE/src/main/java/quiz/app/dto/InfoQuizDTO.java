package quiz.app.dto;

import java.util.List;

public class InfoQuizDTO {

    private String id;
    private String name;
    private int numberOfQuestions;
    private int level;
    private String language;
    private List<QuestionDTO> questions;
    private int correctAnswers;
    private int incorrectAnswers;
    private float score;

    public InfoQuizDTO() {
    }

    public InfoQuizDTO(String id, String name, int numberOfQuestions, int level, String language, List<QuestionDTO> questions) {
        this.id = id;
        this.name = name;
        this.numberOfQuestions = numberOfQuestions;
        this.level = level;
        this.language = language;
        this.questions = questions;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNumberOfQuestions() {
        return numberOfQuestions;
    }

    public void setNumberOfQuestions(int numberOfQuestions) {
        this.numberOfQuestions = numberOfQuestions;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public List<QuestionDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionDTO> questions) {
        this.questions = questions;
    }

    public int getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(int correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public int getIncorrectAnswers() {
        return incorrectAnswers;
    }

    public void setIncorrectAnswers(int incorrectAnswers) {
        this.incorrectAnswers = incorrectAnswers;
    }

    public float getScore() {
        return score;
    }

    public void setScore(float score) {
        this.score = score;
    }
}
