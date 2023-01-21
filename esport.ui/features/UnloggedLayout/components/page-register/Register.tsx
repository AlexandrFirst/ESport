import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { IRegisterForm } from "@features/UnloggedLayout/interfaces";
import { RegisterSteps } from "@features/UnloggedLayout/enums";

import { Left } from "../Left/Left";
import { Main } from "../Main";
import { Right } from "../Right/Right";
import { SportHeadComponentProps } from "@features/SportHead/SportHead";

import { Form } from "./Form/Form";
import { useRegisterValidation } from "@features/UnloggedLayout/components/page-register/useRegisterValidation";
import { yupResolver } from "@hookform/resolvers/yup";

const registerHead: SportHeadComponentProps = {
  title: "E-Sport | Create your account",
};

export const Register: React.FC = () => {
  const validationSchema = useRegisterValidation();
  const methods = useForm<IRegisterForm>({
    resolver: yupResolver(validationSchema),
  });

  const [currStep, setCurrStep] = useState(RegisterSteps.MainInfo);

  return (
    <Main
      headProps={registerHead}
      leftComponent={<Left />}
      rightComponent={
        <Right
          title="Adventure starts here 🚀"
          subtitle="Please sign-in to your account and start the adventure"
        >
          <Form
            methods={methods}
            currStep={currStep}
            setCurrStep={setCurrStep}
          />
        </Right>
      }
    />
  );
};
