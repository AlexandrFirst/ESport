import { FC } from "react";
import styles from "./Exercise.module.css";

interface ExerciseProps {
  className?: string;
}

export const Exercise: FC<ExerciseProps> = (props) => {

    return (
        <div className={styles.wrapper}>

        </div>
    );
};
