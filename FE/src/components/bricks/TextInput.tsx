import React from "react";
import { Color, getColorClass } from "helpers/enums";
import Text from "./Text";

interface TextInputProps {
  labelText: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  color?: Color;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  labelText,
  value,
  onChange,
  onBlur,
  name,
  className,
  disabled,
  color,
  placeholder,
  error,
}) => {
  const usedColor = getColorClass(color, true);

  const outerLabelClasses = `cursor-pointer flex flex-col gap-2`;
  const inputClasses = `px-5 py-3 rounded-[10px] border-2 placeholder-gray600 text-l ${className} ${
    error ? "border-red-600" : "border-gray-600"
  }`;

  return (
    <label className={outerLabelClasses}>
      <Text
        style="buttonMediumBold"
        className={`uppercase leading-none ${usedColor}`}
      >
        {labelText}
      </Text>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        className={inputClasses}
        style={{
          backgroundColor: "transparent",
        }}
        disabled={disabled}
        placeholder={placeholder}
      />
      {error && (
        <Text style="buttonMediumBold" className="text-red600">
          {error}
        </Text>
      )}
    </label>
  );
};

export default TextInput;
