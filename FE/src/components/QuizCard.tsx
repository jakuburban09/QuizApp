import { FC } from "react";
import Text from "./bricks/Text";
import { Color } from "helpers/enums";
import AnswerIndicator from "./AnswerIndicator";
import Rating from "./bricks/Rating";

type QuizCardType = {
  nameOfQuiz: string;
  numberOfQuestions?: number;
  level?: number;
  onClick?: () => void;
};

const QuizCard: FC<QuizCardType> = ({
  nameOfQuiz,
  numberOfQuestions = 0,
  level = 1,
  onClick,
}) => {
  return (
    <div className="flex w-full p-4 justify-between rounded-xl bg-purpleishWhiteOpacity shadow-basic hover:bg-purple100">
      <div className="flex flex-col gap-2">
        <Text element="h3" style="h3" color={Color.Purple}>
          {nameOfQuiz}
        </Text>
        <Text element="h4" style="h5">
          {numberOfQuestions.toString() + " questions"}
        </Text>
        <Rating level={level} size={40} />
      </div>
      <AnswerIndicator type="button" onClick={onClick} />
    </div>
  );
};

export default QuizCard;
