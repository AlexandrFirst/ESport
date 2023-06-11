import React, { FC } from "react";
import styles from "./HomePage.module.css";

import { Hero } from "../Hero/Hero";
import { About } from "../About/About";
import { MainPageFooter } from "../Footer/Footer";

interface HomePageProps {
  className?: string;
}

export const HomePage: FC<HomePageProps> = ({ className }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <Hero />
        <About />
        <MainPageFooter />
      </div>
    </>
  );
};
