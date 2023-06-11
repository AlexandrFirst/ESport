import React, { FC, ReactNode } from "react";
import styles from "./PromoCard.module.css";
import { BoldText, Card } from "@/shared/ui";

interface PromoCardProps {
  className?: string;
  children?: ReactNode;
}

export const PromoCard: FC<PromoCardProps> = ({ className, children }) => {
  return (
    <Card className={styles.wrapper}>
      <BoldText>{children}</BoldText>
    </Card>
  );
};
