import React from "react";
import { Color, getColorClass } from "helpers/enums";
import Text from "./Text";

interface TextInputProps {
  labelText: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  color?: Color;
}

const TextInput: React.FC<TextInputProps> = ({
  labelText,
  value,
  onChange,
  name,
  className,
  disabled,
  color,
  placeholder
}) => {
  const usedColor = getColorClass(color, true);

  const outerLabelClasses = `cursor-pointer flex flex-col gap-2`;

  return (
    <label className={outerLabelClasses}>
      <Text style="buttonMediumBold" className={`uppercase leading-none ${usedColor}`}>{labelText}</Text>
      <input
        type="text"
        value={value}
        onChange={onChange}
        name={name}
        className={`px-5 py-3 rounded-[10px] border-2 placeholder-gray600 text-l ${className}`}
        style={{
          backgroundColor: "transparent",
          border: "2px solid #36174D",
        }}
        disabled={disabled}
        placeholder={placeholder}
      />
    </label>
  );
};

export default TextInput;
