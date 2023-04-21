import React, { memo } from "react";
import styles from "./OverviewCard.module.css";

import { Card } from "@/shared/ui";

const OverviewCard: React.FC = () => {
  return <Card className={styles.wrapper}>OverviewCard</Card>;
};

export default memo(OverviewCard);
