import React from "react";
import Button from "./bricks/Button";
import { Color } from "helpers/enums";
import SummaryAnswer from "./SummaryAnswer";
import Text from "./bricks/Text";

interface Question {
  question: string;
  options: string[];
  correctOption: string;
  correct?: boolean;
  answer?: string;
}

type SummaryProps = {
  isQuizEvaluated: boolean;
  isQuizEvaluatable: boolean;
  score?: number;
  numberOfCorrectAnswers?: number;
  numberOfWrongAnswers?: number;
  isSummaryVisible?: boolean;
  questions: Question[] | undefined;
  goToSlideNumber?: (newIndex: number) => void | undefined;
  evaluateQuiz?: (() => void) | undefined;
};

const Summary: React.FC<SummaryProps> = ({
  isQuizEvaluated,
  isQuizEvaluatable,
  score,
  numberOfCorrectAnswers,
  numberOfWrongAnswers,
  isSummaryVisible,
  questions,
  evaluateQuiz,
  goToSlideNumber,
}) => {
  return (
    <div
    /* className={
        isQuizEvaluated && !isSummaryVisible
          ? "h-[calc(100vh-296px)] overflow-auto"
          : ""
      } */
    >
      {isQuizEvaluated ? (
        <div className="p-2">
          <div className="rounded-2xl px-2 py-3 mb-4 mt-0 flex flex-col border-2 border-grayOpacity bg-purpleishWhiteOpacity text-purpleDark shadow-basic">
            <Text element="h2" style="h3" className="text-center mb-4 mt-1">
              {score?.toFixed(0)}%
            </Text>
            <Text element="h3" style="p" className="text-center mb-1">
              You answered correctly{" "}
              <span className="text-green700">
                {numberOfCorrectAnswers !== undefined
                  ? numberOfCorrectAnswers
                  : "N/A"}
              </span>{" "}
              and{" "}
              <span className="text-red600">
                {numberOfWrongAnswers !== undefined
                  ? numberOfWrongAnswers
                  : "N/A"}
              </span>{" "}
              questions wrongly from{" "}
              <span className="text-purple">
                {numberOfCorrectAnswers !== undefined &&
                numberOfWrongAnswers !== undefined
                  ? numberOfCorrectAnswers + numberOfWrongAnswers
                  : "N/A"}
              </span>
            </Text>
          </div>
          <div className="flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-4">
            {questions &&
              questions.map((question, index) => {
                return (
                  <div key={index}>
                    {/* {question.question} - <span className={question.isCorrect ? 'bg-green' : 'bg-red'}>{question.answer}</span> {!question.isCorrect && <span className="bg-green"> - {question.correctOption}</span>} */}
                    <SummaryAnswer
                      question={question.question}
                      correctAnswer={question.correctOption}
                      answer={question.answer || ""}
                      isCorrect={question.correct}
                      numberOfQuestion={index + 1}
                      goToSlideNumber={
                        goToSlideNumber && (() => goToSlideNumber(index))
                      }
                    />
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="mx-2 h-full my-8">
          <Button
            className={`w-full ${isQuizEvaluatable ? "mb-[64px]" : ""}`}
            icon={{ iconName: "Check" }}
            color={Color.Green700}
            onClickButton={evaluateQuiz}
            disabled={
              isQuizEvaluated ? true : !isQuizEvaluatable ? true : false
            }
          >
            Submit
          </Button>
          {!isQuizEvaluatable && (
            <Text
              style="h4"
              element="h5"
              color={Color.Red600}
              className="text-center mt-4"
            >
              You did not answered all questions!
            </Text>
          )}
        </div>
      )}
    </div>
  );
};

export default Summary;
