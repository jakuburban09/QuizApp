import React from "react";
import {
  Check,
  X,
  ExclamationTriangle,
  InfoCircle,
  ChevronRight,
} from "react-bootstrap-icons";
import { Icon, IconProps } from "./bricks/Icon";
import { Color, getColorClass } from "helpers/enums";

type AnswerIndicatorProps = {
  numberOfQuestion?: number;
  isCorrect?: boolean | undefined;
  type?:
    | "indicator"
    | "button"
    | "success"
    | "error"
    | "warning"
    | "info"
    | undefined;
  backgroundColor?: Color;
  height?: number;
  width?: number;
  onClick?: () => void;
};

const defaultAnswerIndicatorProps: Partial<AnswerIndicatorProps> = {
  type: "indicator",
  width: 72,
};

const AnswerIndicator: React.FC<AnswerIndicatorProps> = ({
  numberOfQuestion,
  isCorrect,
  type,
  backgroundColor,
  height,
  width,
  onClick,
}) => {
  let iconName: IconProps["iconName"];

  switch (type) {
    case "indicator":
      iconName = isCorrect ? "Check" : "X";
      break;
    case "success":
      iconName = "Check";
      break;
    case "error":
      iconName = "X";
      break;
    case "warning":
      iconName = "Exclamation";
      break;
    case "info":
      iconName = "InfoCircle";
      break;
    case "button":
      iconName = "ChevronRight";
      break;
    default:
      iconName = "ChevronRight";
      break;
  }

  const usedColor = getColorClass(backgroundColor);

  const AnswerIndicatorClasses = `flex flex-col outline outline-2 justify-center gap-4 p-3 rounded-[12px] align-middle items-center h-[${height}px] !w-[${width}px]`;

  const AnswerIndicationTextClasses = "text-purpleishWhite";

  const AnswerIndicatorIconClasses = `${
    type === "indicator"
      ? isCorrect
        ? "text-green700"
        : "text-red600"
      : "text-purple p-[4px]"
  } bg-purpleishWhite rounded-full`;

  const buttonClasses = [usedColor, AnswerIndicatorClasses].join(" ");

  return (
    <div
      className={buttonClasses}
      onClick={type === "button" ? onClick : undefined}
    >
      {type === "indicator" && numberOfQuestion && (
        <h4 className={AnswerIndicationTextClasses}>{numberOfQuestion}</h4>
      )}
      <div className={AnswerIndicatorIconClasses}>
        <Icon
          iconName={iconName}
          height={type === "indicator" ? 24 : 18}
          width={type === "indicator" ? 24 : 18}
        />
      </div>
    </div>
  );
};

AnswerIndicator.defaultProps = defaultAnswerIndicatorProps;

export default AnswerIndicator;
