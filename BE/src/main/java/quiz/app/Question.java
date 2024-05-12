// Question.java
package quiz.app;

import java.util.List;

public class Question {

    private String question;
    private List<String> options;
    private String correctOption;
    private int index;
    private boolean isCorrect;
    private String answer;

    public Question() {
    }

    public Question(String question, List<String> options, String correctOption, int index) {
        this.question = question;
        this.options = options;
        this.correctOption = correctOption;
        this.index = index;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public String getCorrectOption() {
        return correctOption;
    }

    public void setCorrectOption(String correctOption) {
        this.correctOption = correctOption;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean isCorrect) {
        this.isCorrect = isCorrect;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
