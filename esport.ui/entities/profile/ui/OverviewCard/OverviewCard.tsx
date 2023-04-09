import React, { memo } from "react";
import styles from "./OverviewCard.module.scss";

import { SportCard } from "@shared/ui/SportCard/SportCard";

const OverviewCard: React.FC = () => {
  return <SportCard className={styles.wrapper}>OverviewCard</SportCard>;
};

export default memo(OverviewCard);
