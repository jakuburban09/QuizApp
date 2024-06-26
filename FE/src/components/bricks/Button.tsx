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
}) => {
  const getIconPositionClass = (position?: IconPosition) => {
    return position === IconPosition.Right ? "flex-row-reverse" : ""; // Adjust this based on your Tailwind CSS setup
  };

  const buttonClass = `${
    hiearchy === "secondary" ? "px-5 py-[10px]" : "px-6 py-3"
  } text-purpleishWhite rounded-[10px] font-medium flex gap-2 items-center transition duration-300 ease-in-out hover:brightness-90
     ${
       hiearchy === "secondary"
         ? "border border-2 border-purple bg-transparent text-purple"
         : ""
     }`;

  const usedColor = getColorClass(color);

  const usedIconPosition = getIconPositionClass(iconPosition);

  const isDisabled = disabled ? "brightness-50" : "brightness-100";

  const buttonClasses = [
    usedColor,
    buttonClass,

    usedIconPosition,
    isDisabled,
    className || "",
  ].join(" ");

  return (
    <button
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
