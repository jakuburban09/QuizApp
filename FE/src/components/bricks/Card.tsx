import { FC } from "react";
import { twMerge } from "tailwind-merge";
import Text from "./Text";
import { Color } from "helpers/enums";
type CardProps = {
  headline: string;
  text: string;
  color?: "orange" | "green" | "blue" | "red";
  className?: string;
};

const defaultCardProps: Partial<CardProps> = {
  color: "orange",
};

const Card: FC<CardProps> = ({ headline, text, color, className }) => {
  const CardClassesGradient = `${
    color === "orange"
      ? "from-orange700"
      : color === "red"
        ? "from-red700"
        : color === "blue"
          ? "from-blue700"
          : "from-green700"
  }`;
  const CardClassesDefault = `px-4 py-6 bg-gradient-to-br to-black40Transparent rounded-xl text-purpleishWhite`;

  const CardClasses = [
    CardClassesGradient,
    CardClassesDefault,
    className || "",
  ].join(" ");

  return (
    <div className={CardClasses}>
      <Text
        element="h5"
        style="h5"
        color={Color.PurpleishWhite}
        className="mb-[10px]"
      >
        {headline}
      </Text>
      <Text element="p" style="p2" color={Color.PurpleishWhite}>
        {text}
      </Text>
    </div>
  );
};

Card.defaultProps = defaultCardProps;

export default Card;
