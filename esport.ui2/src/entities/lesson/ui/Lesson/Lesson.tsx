import { FC } from "react";
import styles from "./Lesson.module.css";

interface LessonProps {
  className?: string;
}

export const Lesson: FC<LessonProps> = (props) => {
  return <div className={styles.wrapper}></div>;
};
