import React, { FC } from "react";
import styles from "./HomePage.module.css";

import { UILink } from "@/shared/ui";

import { Hero } from "../Hero/Hero";
import { About } from "../About/About";
import { MainPageFooter } from "../Footer/Footer";

interface HomePageProps {
  className?: string;
}

export const HomePage: FC<HomePageProps> = ({ className }) => {
  return (
    <>
      <UILink href="/competition">Competitions</UILink>
      <div className={styles.wrapper}>
        <Hero />
        <About />
        <MainPageFooter />
      </div>
    </>
  );
};
