import { Icon, IconProps } from "./bricks/Icon";

type AnswerIndicatorProps = {
  numberOfQuestion?: number;
  isCorrect?: boolean | undefined;
  type?: "indicator" | "button";
  height?: number;
  width?: number;
  onClick?: () => void;
};

const defaultAnswerIndicatorProps: Partial<AnswerIndicatorProps> = {
  type: "indicator",
  width: 72,
}; /* Typ Partial<AnswerIndicatorProps> je typová definice z TypeScriptu, která vytváří nový typ tím, že všechny vlastnosti původního typu AnswerIndicatorProps označí jako volitelné (nullable). To znamená, že všechny vlastnosti tohoto typu mohou buď existovat s určitou hodnotou, nebo mohou chybět (undefined). */

const AnswerIndicator: React.FC<AnswerIndicatorProps> = ({
  numberOfQuestion,
  isCorrect,
  type,
  height,
  width,
  onClick,
}) => {
  const AnswerIndicatorClasses = `${
    type == "indicator"
      ? isCorrect
        ? "bg-green700 outline-green700"
        : "bg-red600 outline-red600"
      : "bg-purple outline-purple cursor-pointer"
  }
flex flex-col outline outline-2 justify-center gap-4 p-3 rounded-[12px] align-middle items-center h-[${height}px] !w-[${width}px]`;

  const AnswerIndicationTextClasses = "text-purpleishWhite";

  const AnswerIndicatorIconClasses = `${
    type == "indicator"
      ? isCorrect
        ? "text-green700"
        : "text-red600"
      : "text-purple p-[4px]"
  } bg-purpleishWhite rounded-full`;

  return (
    <div
      className={AnswerIndicatorClasses}
      onClick={type === "button" ? onClick : undefined}
    >
      {type == "indicator" && (
        <h4 className={AnswerIndicationTextClasses}>{numberOfQuestion}</h4>
      )}

      <div className={AnswerIndicatorIconClasses}>
        <Icon
          iconName={
            type == "indicator" ? (isCorrect ? "Check" : "X") : "ChevronRight"
          }
          height={type == "indicator" ? 24 : 18}
          width={type == "indicator" ? 24 : 18}
        />
      </div>
    </div>
  );
};

AnswerIndicator.defaultProps = defaultAnswerIndicatorProps;

export default AnswerIndicator;
