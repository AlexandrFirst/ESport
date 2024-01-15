import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormWrapper, TextArea } from "@/shared/ui";

interface CreateCompetitionAdditionalInfoProps {
  className?: string;
  methods: UseFormReturn<any>;
}

//TODO: add WYSIWYG editor
export const CreateCompetitionAdditionalInfo: FC<
  CreateCompetitionAdditionalInfoProps
> = ({ className, methods }) => {
  return (
    <FormWrapper methods={methods} className={className}>
      <TextArea fullWidth name={"description"} placeholder={"Description"} />
    </FormWrapper>
  );
};
