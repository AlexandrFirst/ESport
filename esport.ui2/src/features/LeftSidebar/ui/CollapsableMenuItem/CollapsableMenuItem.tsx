import React, { memo } from "react";
import styles from "./CollapsableMenuItem.module.css";

const CollapsableMenuItem: React.FC = () => {
  return <div className={styles.wrapper}>CollapsableMenuItem</div>;
};

export default memo(CollapsableMenuItem);
