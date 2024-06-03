import { FC, useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import RoundedIconButton from "./bricks/RoundedIconButton";

export enum IconPosition {
  Left = "left",
  Right = "right",
}

type QuizNavigationProps = {
  className?: string;
  questions?: any;
  currentQuestion?: number;
  onClickQuizNavigation?: (newIndex: number) => void;
  questionsState: string[];
  showAllQuestions?: boolean;
  isQuizEvaluated?: boolean;
};

const QuizNavigation: FC<QuizNavigationProps> = ({
  className,
  questions,
  currentQuestion,
  onClickQuizNavigation,
  questionsState,
  showAllQuestions,
  isQuizEvaluated,
}) => {
  const numberOfQuestions = questions.length;

  const QuizNavigationClass =
    "rounded-2xl px-2 py-3 mt-0 flex flex-col border-2 border-grayOpacity bg-purpleishWhiteOpacity text-purpleDark shadow-basic";

  const buttonClasses = [QuizNavigationClass, className || ""].join(" ");

  const handleButtonClick = (index: number): void => {
    // Zavolejte callback funkci pro změnu otázky
    onClickQuizNavigation && onClickQuizNavigation(index);
  };

  return (
    <div className="px-2 py-3">
      <div
        className={twMerge(`
          ${buttonClasses}
          ${className}
        `)}
      >
        <div
          className="rounded-2xl px-2 py-3"
          onClick={() =>
            numberOfQuestions && handleButtonClick(numberOfQuestions + 1)
          }
        >
          {/* <h2 className="text-blue text-2xl">
          {currentQuestion} / {numberOfQuestions}
        </h2> */}
          {numberOfQuestions !== undefined &&
          currentQuestion !== undefined &&
          numberOfQuestions + 1 > currentQuestion ? (
            <div>
              {/* Váš obsah, který se má zobrazit, pokud platí podmínka */}
              <h2 className="text-2xl text-center">
                {currentQuestion} / {numberOfQuestions}
              </h2>
            </div>
          ) : (
            <div>
              {/* Váš obsah, který se má zobrazit, když podmínka není splněna */}
              <h2 className="text-2xl text-center">
                {showAllQuestions ? "Questions" : "Summary"}
              </h2>
            </div>
          )}
        </div>

        <div className={`w-full flex flex-wrap justify-around`}> {/* ${numberOfQuestions % 6 == 0 ? "justify-around" : ""} */}
          {Array.from({ length: numberOfQuestions || 0 }, (_, index) => (
            <div
              key={index}
              className={`${
                showAllQuestions ? "w-1/6 my-4 p-2 text-center" : ""
              }`}
            >
              <RoundedIconButton
                className={`${
                  isQuizEvaluated &&
                  (questions[index].correct ? "bg-green700" : "bg-red600")
                }`}
                currentIndex={index}
                onClickButton={() => handleButtonClick(index)}
                isFilled={questionsState[index] !== undefined}
                isCurrentQuestionActivated={
                  currentQuestion !== undefined && currentQuestion - 1 === index
                }
                text={(index + 1).toString()}
                size={
                  showAllQuestions ? "h-[36px] w-[36px]" : "h-[20px] w-[20px]"
                }
              >
                {showAllQuestions ? index + 1 : ""}
              </RoundedIconButton>
            </div>
          ))}
        </div>

        {showAllQuestions ? <div></div> : <div></div>}
      </div>
    </div>
  );
};

export default QuizNavigation;
