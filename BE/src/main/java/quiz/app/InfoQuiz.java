package quiz.app;

import java.util.List;

public class InfoQuiz {

    private String id;
    private String name;
    private int numberOfQuestions;
    private int level;
    private String language;
    private List<Question> questions;
    private int correctAnswers;
    private int incorrectAnswers;
    private float score;

    public InfoQuiz() {
    }

    public InfoQuiz(String id, String name, int numberOfQuestions, int level, String language, List<Question> questions) {
        this.id = id;
        this.name = name;
        this.numberOfQuestions = numberOfQuestions;
        this.level = level;
        this.language = language;
        this.questions = questions;
    }

    // Getters and setters for all fields including new fields

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

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
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
