import { FC } from "react";
import { Icon } from "./Icon";

type RatingProps = {
  level: number;
  size?: number;
  className?: string;
};

const defaultRatingProps: RatingProps = {
  level: 3,
  size: 24,
};

const Rating: FC<RatingProps> = ({ level, size, className }) => {
  let color;
  if (level === 1 || level === 2) {
    color = "#3F8509";
  } else if (level === 3 || level === 4) {
    color = "#B15D03";
    console.log(color);
  } else if (level === 5 || level === 6) {
    color = "#B91F39";
  }

  return (
    <div className={`flex gap-1 ${className}`}>
      <Icon
        iconName={level === 1 ? "StarHalf" : "StarFill"}
        size={size}
        color={color}
      />
      <Icon
        iconName={level >= 4 ? "StarFill" : level >= 3 ? "StarHalf" : "Star"}
        size={size}
        color={color}
      />
      <Icon
        iconName={level === 5 ? "StarHalf" : level === 6 ? "StarFill" : "Star"}
        size={size}
        color={color}
      />
    </div>
  );
};

Rating.defaultProps = defaultRatingProps;

export default Rating;
