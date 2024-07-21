import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Icon, IconProps } from "./Icon";
import { Color, getColorClass } from "../../helpers/enums";

export enum IconPosition {
  Left = "left",
  Right = "right",
}

type ButtonProps = {
  className?: string;
  buttonText?: string;
  onClickButton?: () => void;
  children?: any;
  iconPosition?: IconPosition;
  icon?: IconProps;
  color?: Color;
  disabled?: boolean;
  hiearchy?: "primary" | "secondary" | "tertiaty";
  href?: string;
  rounded?: boolean;
  type?: "submit" | "button" | "reset";
};

const defaultButtonProps: Partial<ButtonProps> = {
  className: "",
  iconPosition: IconPosition.Left,
  children: "Button text",
  color: Color.Purple,
  onClickButton: () => {
    console.log("Button clicked!");
  },
  hiearchy: "primary",
  rounded: false,
};

const Button: FC<ButtonProps> = ({
  className,
  children,
  onClickButton,
  icon,
  color,
  iconPosition,
  disabled,
  hiearchy,
  href,
  rounded,
  type,
}) => {
  const getIconPositionClass = (position?: IconPosition) => {
    return position === IconPosition.Right ? "flex-row-reverse" : ""; // Adjust this based on your Tailwind CSS setup
  };

  const buttonClass = `${
    hiearchy === "secondary" ? "px-5 py-[10px]" : "px-6 py-3"
  } text-purpleishWhite font-medium flex gap-2 items-center transition duration-300 ease-in-out hover:brightness-90 w-full md:w-auto
     ${
       hiearchy === "secondary"
         ? "border border-2 border-purple bg-transparent text-purple"
         : ""
     }`;

  const usedColor = getColorClass(color);

  const usedIconPosition = getIconPositionClass(iconPosition);

  const isDisabled = disabled ? "brightness-50" : "brightness-100";

  const isRounded = rounded ? "rounded-full p-4" : "rounded-[10px]";

  const buttonClasses = [
    usedColor,
    buttonClass,

    usedIconPosition,
    isDisabled,
    isRounded,
    className || "",
  ].join(" ");

  return (
    <button
      type={type && type}
      className={twMerge(`
          ${buttonClasses}
        `)}
      onClick={() => onClickButton && onClickButton()}
      disabled={disabled}
    >
      {icon && <Icon {...icon} />}
      {children}
    </button>
  );
};

Button.defaultProps = defaultButtonProps;

export default Button;
