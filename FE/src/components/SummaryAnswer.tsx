import React from "react";
import Button from "./bricks/Button";
import { Color } from "helpers/enums";
import AnswerIndicator from "./AnswerIndicator";
import { Icon } from "./bricks/Icon";
import Text from "./bricks/Text";

type SummaryAnswerProps = {
  question: string;
  correctAnswer: string;
  answer: string;
  isCorrect: boolean | undefined;
  numberOfQuestion: number;
  goToSlideNumber?: (newIndex: number) => void | undefined;
};

const SummaryAnswer: React.FC<SummaryAnswerProps> = ({
  question,
  correctAnswer,
  answer,
  isCorrect,
  numberOfQuestion,
  goToSlideNumber,
}) => {
  const SummaryAnswerClasses = `${
    isCorrect
      ? "border border-2 border-green700 bg-green200"
      : "border border-2 border-red600 bg-red200"
  }
flex gap-4 rounded-[16px]
`;
  const SummaryAnswerDicClasses = "text-left py-1 my-1 w-full";
  return (
    <div className={SummaryAnswerClasses}>
      <AnswerIndicator
        numberOfQuestion={numberOfQuestion}
        isCorrect={isCorrect}
        backgroundColor={isCorrect ? Color.Green700 : Color.Red600}
      />
      <div className={SummaryAnswerDicClasses}>
        <Text
          element="h4"
          style="buttonMedium"
          className={`text-purpleDark border-b-2 pb-1 mb-1 ${
            isCorrect ? "border-green300" : "border-b-red300"
          }`}
        >
          {question}
        </Text>
        <Text
          style={isCorrect ? "buttonMediumBold" : "buttonMediumStrikethrough"}
          color={isCorrect ? Color.Green700 : Color.Red600}
          className={isCorrect ? "" : "border-b-2 pb-1 mb-1 border-b-red300"}
        >
          {answer}
        </Text>
        {!isCorrect && (
          <Text color={Color.Green700} style="buttonMediumBold">
            {correctAnswer}
          </Text>
        )}
      </div>
      <AnswerIndicator
        type="button"
        onClick={() => goToSlideNumber && goToSlideNumber(numberOfQuestion - 1)} backgroundColor={Color.Purple} // Upraveno na goToSlideNumber
      />
    </div>
  );
};

export default SummaryAnswer;
