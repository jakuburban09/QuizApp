import { FC } from "react";
import { Color, getColorClass } from "helpers/enums";
import React from "react";

type TextProps = {
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  style?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "p2"
    | "buttonMedium"
    | "buttonMediumBold"
    | "buttonMediumBoldStrikethrough"
    | "buttonMediumStrikethrough"
    | "buttonSmall";
  children: any;
  className?: string;
  color?: Color;
  id?: string;
};

const defaultTextProps: Partial<TextProps> = {
  element: "p",
  style: "p",
  className: "",
  color: Color.PurpleDark,
};

const Text: FC<TextProps> = ({
  element,
  style,
  children,
  className,
  color,
  id,
}) => {
  const h1Classes = `text-5xl leading-[130%] font-bold`;
  const h2Classes = `text-4xl leading-[130%] font-medium`;
  const h3Classes = `text-3xl leading-[130%] font-medium`;
  const h4Classes = `text-2xl leading-8`;
  const h5Classes = `text-xl leading-6 font-semibold`;
  const h6Classes = `text-sm leading-6 font-semibold`;
  const pClasses = `text-base leading-6`;
  const p2Classes = `text-sm leading-6`;
  const buttonMedium = `text-base leading-8`;
  const buttonMediumBold = `text-base leading-8 font-bold`;
  const buttonMediumBoldStrikethrough = `text-base leading-8 font-bold line-through`;
  const buttonMediumStrikethrough = `text-base leading-8 line-through`;
  const buttonSmall = `text-sm leading-8`;

  let classes;

  const usedColor = getColorClass(color, true);

  switch (style || element) {
    case "h1":
      classes = [h1Classes, className, usedColor].join(" ");
      break;

    case "h2":
      classes = [h2Classes, className, usedColor].join(" ");
      break;

    case "h3":
      classes = [h3Classes, className, usedColor].join(" ");
      break;

    case "h4":
      classes = [h4Classes, className, usedColor].join(" ");
      break;

    case "h5":
      classes = [h5Classes, className, usedColor].join(" ");
      break;

    case "h6":
      classes = [h6Classes, className, usedColor].join(" ");
      break;

    case "p":
      classes = [pClasses, className, usedColor].join(" ");
      break;

    case "p2":
      classes = [p2Classes, className, usedColor].join(" ");
      break;

    case "buttonMedium":
      classes = [buttonMedium, className, usedColor].join(" ");
      break;

    case "buttonMediumBold":
      classes = [buttonMediumBold, className, usedColor].join(" ");
      break;

    case "buttonMediumBoldStrikethrough":
      classes = [buttonMediumBoldStrikethrough, className, usedColor].join(" ");
      break;

    case "buttonMediumStrikethrough":
      classes = [buttonMediumStrikethrough, className, usedColor].join(" ");
      break;

    case "buttonSmall":
      classes = [buttonSmall, className, usedColor].join(" ");
      break;

    default:
      break;
  }

  return React.createElement(
    element || "p",
    { className: classes, id: id },
    children,
  );
};

Text.defaultProps = defaultTextProps;

export default Text;
