import React from "react";
import { NextPage } from "next";

import { MainLayout } from "@features/MainLayout/MainLayout";
import { Calculator as SportCalculator } from "@pageComponents/page-calculator/calculator";

const Calculator: NextPage = () => {
  return (
    <MainLayout>
      <SportCalculator />
    </MainLayout>
  );
};

export default Calculator;
