import React, { useState } from "react";
import { Color, getColorClass } from "helpers/enums";
import Text from "./Text";
import Rating from "./Rating";

interface TextInputWithRatingProps {
  labelText: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  color?: Color;
}

const TextInputWithRating: React.FC<TextInputWithRatingProps> = ({
  labelText,
  value,
  onChange,
  name,
  className,
  disabled,
  placeholder,
  color,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number>(1);
  const usedColor = getColorClass(color);

  const handleInputClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleRatingClick = (level: number) => {
    setSelectedRating(level);
    setIsDropdownOpen(false);
    if (onChange) {
      const event = { target: { value: level.toString() } } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  const outerLabelClasses = `cursor-pointer flex flex-col gap-0`;

  return (
    <label className={outerLabelClasses}>
      <Text style="buttonMediumBold" className="uppercase">
        {labelText}
      </Text>
      <div
        className={`relative px-5 py-3 text-purpleDark rounded-[10px] border-2 border-purpleDark placeholder-gray600 text-l ${className}`}
        style={{
          backgroundColor: "transparent",
          border: "2px solid #36174D",
        }}
        onClick={handleInputClick}
      >
        <Rating level={selectedRating} size={24} />
        <input
          type="hidden"
          value={selectedRating.toString()}
          onChange={onChange}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
        />
      </div>
      {isDropdownOpen && (
        <div className="mt-2 border border-gray-300 rounded shadow-lg bg-white z-10">
          {[1, 2, 3, 4, 5, 6].map((level) => (
            <div
              key={level}
              className="cursor-pointer p-2 hover:bg-gray-200"
              onClick={() => handleRatingClick(level)}
            >
              <Rating level={level} />
            </div>
          ))}
        </div>
      )}
    </label>
  );
};

export default TextInputWithRating;
