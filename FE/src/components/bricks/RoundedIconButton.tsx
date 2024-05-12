import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Color, getColorClass } from "helpers/enums";
import { log } from "console";

enum Size {
  Small = "20px",
  Medium = "24px",
  Large = "28px",
  XLarge = "32px",
  XXLarge = "36px",
  XXXLarge = "40px",
}

type RoundedIconButtonProps = {
  className?: string;
  size?: string;
  color?: Color;
  currentIndex?: number;
  onClickButton?: (currentIndex: number) => void;
  isFilled?: boolean;
  children?: any;
  isCurrentQuestionActivated?: boolean;
  text?: string;
};

const RoundedIconButtonDefaultProps = {
  size: Size.Small,
  /* color: Color.Blue, */
};

const RoundedIconButton: FC<RoundedIconButtonProps> = ({
  className,
  size,
  children,
  onClickButton,
  currentIndex,
  color,
  isFilled,
  isCurrentQuestionActivated,
  text,
}) => {
  const usedColor = getColorClass(color);
  const filledColor = isFilled ? "bg-purpleDark" : "bg-gray500";
  const outline = isCurrentQuestionActivated
    ? isFilled
      ? "outline outline-2 outline-purple"
      : "outline outline-2 outline-purple bg-purple"
    : "";
  /* outline-blue outline-3 outline */
  const BaseClasses = `w-5 h-5 rounded-md text-purpleishWhite`;
  const Size = size;

  const RoundedIconButtonClasses = [
    BaseClasses,
    /* usedColor, */
    filledColor,
    outline,
    Size,
    className || "",
  ].join(" ");

  const handleClick = () => {
    if (onClickButton) {
      onClickButton(currentIndex || 0); // Pokud je currentIndex undefined, použijeme 0
    }
  };

  return (
    <button className={twMerge(RoundedIconButtonClasses)} onClick={handleClick}>
      {children}
    </button>
  );
};

RoundedIconButton.defaultProps = RoundedIconButtonDefaultProps;

export default RoundedIconButton;
