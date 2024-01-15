import { FC } from "react";
import styles from "./CreateCategoriesForm.module.css";

import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";

import { Button, FormWrapper, IconButton, Input } from "@/shared/ui";

import { ICreateCompetitionSteps } from "../../model/types/CreateCompetitionSteps";
import { TrashIcon } from "lucide-react";

interface CreateCategoriesFormProps {
  methods: UseFormReturn<ICreateCompetitionSteps>;
  categoryFields: UseFieldArrayReturn<ICreateCompetitionSteps, "categories">;
}

export const CreateCategoriesForm: FC<CreateCategoriesFormProps> = ({
  methods,
  categoryFields,
}) => {
  const { fields, append, remove } = categoryFields;

  const handleAddCategory = () => {
    append({ title: "" });
  };

  const handleRemoveCategory = (index: number) => () => remove(index);

  return (
    <FormWrapper methods={methods}>
      {fields.map((field, index) => (
        <div key={field.id} className={"flex gap-3 items-center"}>
          <Input
            name={`categories[${index}].title`}
            label={"Category title"}
            className={"mr-8"}
          />
          <Input name={`categories[${index}].minAge`} label={"Min age"} />
          -
          <Input
            name={`categories[${index}].maxAge`}
            label={"Max age"}
            className={"mr-8"}
          />
          <Input
            name={`categories[${index}].minWeight`}
            label={"Min weight (kg)"}
          />
          -
          <Input
            name={`categories[${index}].maxWeight`}
            label={"Max weight (kg)"}
            className={"mr-8"}
          />
          <Input
            name={`categories[${index}].minHeight`}
            label={"Min height (cm)"}
          />
          -
          <Input
            name={`categories[${index}].maxHeight`}
            label={"Max height (cm)"}
          />
          <IconButton
            Svg={TrashIcon}
            onClick={handleRemoveCategory(index)}
            fill={false}
            svgClassName={styles.trash}
            iconSize={"m"}
          />
        </div>
      ))}
      <Button onClick={handleAddCategory}>Add category</Button>
    </FormWrapper>
  );
};
