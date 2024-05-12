import * as icons from "react-bootstrap-icons";

export interface IconProps extends icons.IconProps {
  // Cannot use "name" as it is a valid SVG attribute
  // "iconName", "filename", "icon" will do it instead
  iconName: keyof typeof icons;
}

export const Icon = ({
  iconName,
  height = "20px",
  width = "20px",
  ...props
}: IconProps) => {
  const BootstrapIcon = icons[iconName];
  return <BootstrapIcon width={width} height={height} {...props} />;
};
