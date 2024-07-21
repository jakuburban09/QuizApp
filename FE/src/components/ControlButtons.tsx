import React from "react";
import Button from "./bricks/Button";
import { Color } from "helpers/enums";
import { IconPosition } from "./QuizNavigation";

type ControlButtonsProps = {
  /* isQuizEvaluated: boolean;
  isQuizEvaluatable: boolean; */
  currentSlideIndex: number;
  isSummaryVisible?: boolean;
  numberOfQuestions: number;
  evaluateQuiz?: (() => void) | undefined;
  handleQuizNavigation?: ((navigationIndex: number) => void) | undefined;
};

const ControlButtons: React.FC<ControlButtonsProps> = ({
  /* isQuizEvaluated,
  isQuizEvaluatable, */
  isSummaryVisible,
  currentSlideIndex,
  numberOfQuestions,
  handleQuizNavigation,
}) => {
  return (
    <div className="">
      <div
        className={
          !isSummaryVisible
            ? `flex justify-between gap-4 mb-2 absolute my-1 bottom-1 px-2`
            : `flex justify-between gap-4 mb-2 my-1 bottom-1 px-2`
        }
        style={
          !isSummaryVisible ? { width: "calc(100% - 16px)" } : { width: "100%" }
        }
      >
        <Button
          className="w-full"
          color={Color.PurpleDark}
          icon={{ iconName: "ArrowLeft" }}
          /* color={Color.Blue} */
          onClickButton={() =>
            handleQuizNavigation &&
            handleQuizNavigation(
              currentSlideIndex === 0
                ? numberOfQuestions
                : currentSlideIndex - 1,
            )
          }
        >
          {currentSlideIndex === 0 ? "Summary" : "Previous"}
        </Button>
        <Button
          className="w-full"
          icon={{ iconName: "ArrowRight" }}
          iconPosition={IconPosition.Right}
          color={Color.Purple}
          onClickButton={() =>
            handleQuizNavigation &&
            handleQuizNavigation(
              currentSlideIndex === numberOfQuestions
                ? 0
                : currentSlideIndex + 1,
            )
          }
        >
          {currentSlideIndex === numberOfQuestions
            ? "1. Question"
            : currentSlideIndex === numberOfQuestions - 1
              ? "Summary"
              : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default ControlButtons;
