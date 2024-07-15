// QuizQuestion.tsx
import React, { useEffect } from "react";
import RadioButton from "./bricks/RadioButton";

interface QuizQuestionProps {
  question: {
    question: string;
    options: string[];
    correctOption: string;
    index: number;
    correct?: boolean;
    answer?: string;
  };
  answers: string[];
  onAnswerChange: (questionIndex: number, value: string) => void;
  isQuizEvaluated: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  answers,
  onAnswerChange,
  isQuizEvaluated,
}) => {
  const selectedOption = answers[question.index];
  return (
    <div className="p-2">
      <div className="rounded-2xl px-4 py-5 bg-purpleishWhiteOpacity border-2 border-grayOpacity shadow-basic max-h-[calc(100vh-243px)] overflow-auto">
        <h2 className="text-purpleDark text-center text-2xl mb-4">
          {question.question}
        </h2>

        <div className="flex flex-col gap-2">
          {question.options.map((option, optionIndex) => (
            <>
              <RadioButton
                key={optionIndex}
                labelText={option}
                isChecked={selectedOption === option}
                onChange={() => onAnswerChange(question.index, option)}
                isCorrect={question.correct}
                answer={question.correctOption === option}
                isQuizEvaluated={isQuizEvaluated}
                name={`question${question.index}`}
                disabled={isQuizEvaluated}
              />
              {/* {isQuizEvaluated && question.correctOption !== option && option === question.answer && (
            <span className="correct-answer">{question.correctOption}</span>
        )} */}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
