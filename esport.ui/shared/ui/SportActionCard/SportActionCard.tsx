import React from "react";

import { SportCard, SportCardProps } from "@shared/ui/SportCard/SportCard";

interface SportActionCardProps extends SportCardProps {}

export const SportActionCard: React.FC<SportActionCardProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <SportCard withAction {...props}>
      {children}
    </SportCard>
  );
};
