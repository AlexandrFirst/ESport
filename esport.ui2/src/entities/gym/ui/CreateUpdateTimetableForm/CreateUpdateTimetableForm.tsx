import React, { FC } from "react";
import styles from "./CreateUpdateTimetableForm.module.css";

import cn from "classnames";
import { UseFormReturn } from "react-hook-form";

import { Checkbox, FormWrapper, TextArea, TimeInput } from "@/shared/ui";

import { CreateUpdateShiftWithTrainerRequest } from "../../model/types/create-update-shift";

interface CreateUpdateTimetableFormProps {
  className?: string;
  withTrainerRequest?: boolean;
  methods: UseFormReturn<CreateUpdateShiftWithTrainerRequest>;
}

export const CreateUpdateTimetableForm: FC<CreateUpdateTimetableFormProps> = ({
  className,
  withTrainerRequest,
  methods,
}) => {
  return (
    <FormWrapper methods={methods} className={cn(styles.content, className)}>
      <div className={"flex gap-5 items-center justify-center"}>
        <TimeInput name={"from"} label={"From"} /> -
        <TimeInput name={"to"} label={"To"} />
      </div>
      <Checkbox name={"notifyOnUpdate"} label={"Notify me on update"} />
      {withTrainerRequest && (
        <TextArea
          className={"my-5"}
          name={"trainerRequest"}
          placeholder={"Create trainer request..."}
          fullWidth
        />
      )}
    </FormWrapper>
  );
};
