import { FC } from "react";
import styles from "./BodyPart.module.css";

interface BodyPartProps {
  className?: string;
}

export const BodyPart: FC<BodyPartProps> = (props) => {

    return (
        <div className={styles.wrapper}>

        </div>
    );
};
