import React from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

type DynamicLinkProps = {
  to: string;
  children: React.ReactNode;
  className: string;
};

const DynamicLink: React.FC<DynamicLinkProps> = ({
  children,
  to,
  className,
}) => {
  const { lng } = useParams<{ lng: string }>();
  const { t } = useTranslation();

  return (
    <Link to={`/${lng}/${to}`} className={className}>
      {children}
    </Link>
  );
};

export default DynamicLink;
