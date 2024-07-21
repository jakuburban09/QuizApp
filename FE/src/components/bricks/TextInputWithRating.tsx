import React, { useState } from "react";
import { Color, getColorClass } from "helpers/enums";
import Text from "./Text";
import Rating from "./Rating";

interface TextInputWithRatingProps {
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

const TextInputWithRating: React.FC<TextInputWithRatingProps> = ({
  labelText,
  value,
  onChange,
  onBlur,
  name,
  className,
  disabled,
  placeholder,
  color,
  error,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number>(
    parseInt(value || "1"),
  );
  const usedColor = getColorClass(color);

  const handleInputClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleRatingClick = (level: number) => {
    setSelectedRating(level);
    setIsDropdownOpen(false);
    if (onChange) {
      const event = {
        target: { value: level.toString() },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  const outerLabelClasses = `cursor-pointer flex flex-col gap-0`;
  const inputClasses = `relative px-5 py-3 text-purpleDark rounded-[10px] border-2 placeholder-gray600 text-l ${
    isDropdownOpen ? "border-b-0 rounded-b-none" : ""
  } ${className} ${error ? "border-red-600" : "border-purpleDark"}`;

  return (
    <label className={outerLabelClasses}>
      <Text style="buttonMediumBold" className="uppercase">
        {labelText}
      </Text>
      <div className={inputClasses} onClick={handleInputClick}>
        <Rating level={selectedRating} size={24} />
        <input
          type="hidden"
          value={selectedRating.toString()}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
        />
      </div>
      {isDropdownOpen && (
        <div className="border-t-0 border-purpleDark border-2 border-gray-300 rounded-t-none rounded-[10px] shadow-lg bg-white z-10">
          {[1, 2, 3, 4, 5, 6].map((level) => (
            <div
              key={level}
              className="ml-5 mr-5 py-3 cursor-pointer hover:bg-gray-200 border-t border-gray300"
              onClick={() => handleRatingClick(level)}
            >
              <Rating level={level} className="pl-2" />
            </div>
          ))}
        </div>
      )}
      {error && (
        <Text style="buttonMediumBold" className="text-red-600">
          {error}
        </Text>
      )}
    </label>
  );
};

export default TextInputWithRating;
