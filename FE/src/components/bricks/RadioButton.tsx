// RadioButton.tsx
import { Color, getColorClass } from "helpers/enums";
import React from "react";

interface RadioButtonProps {
  labelText: string;
  isChecked?: boolean;
  onChange?: () => void;
  name?: string;
  className?: string;
  disabled?: boolean;
  color?: Color;
  isCorrect?: boolean;
  isQuizEvaluated?: boolean;
  answer?: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  labelText,
  isChecked,
  onChange,
  name,
  className,
  disabled,
  color,
  isCorrect,
  isQuizEvaluated,
  answer,
}) => {
  const usedColor = getColorClass(color);

  const OutterLabelClasses = `cursor-pointer flex items-center px-5 py-3 text-purpleDark rounded-[10px] border-2 border-purpleDark gap-4`;

  const SpanClasses = `${
    isChecked && !isQuizEvaluated ? "bg-purple text-purpleishWhite" : ""
  } 
  ${
    isChecked && isQuizEvaluated && isCorrect
      ? "bg-green700 text-purpleishWhite"
      : ""
  }
  ${
    isChecked && isQuizEvaluated && !isCorrect
      ? "bg-red600 text-purpleishWhite"
      : ""
  }
  ${isQuizEvaluated && answer ? "bg-green700 text-purpleishWhite" : ""}
  `;

  const InputClasses = "";

  const computerOutterLabelClasses = [
    OutterLabelClasses,
    SpanClasses,
    className,
  ].join(" ");

  return (
    <label className={computerOutterLabelClasses}>
      <input
        type="radio"
        checked={isChecked}
        onChange={onChange}
        className={`!h-[20px] !w-[20px]  rounded-full appearance-none`}
        style={{
          border: isChecked ? "2px solid #F3EFFE" : "",
          backgroundColor: isChecked ? "#F3EFFE" : "transparent",
          boxShadow: isChecked
            ? isQuizEvaluated
              ? isCorrect
                ? "inset 0 0 0 3px #3F8509"
                : "inset 0 0 0 3px #B91F39"
              : "inset 0 0 0 3px #36174D"
            : "inset 0 0 0 2px #36174D",
        }}
        disabled={disabled}
      />
      <span className={`text-base text-left w-fit text-black`}>
        {labelText}
      </span>
    </label>
  );
};

export default RadioButton;
