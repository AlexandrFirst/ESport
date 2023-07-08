import { FC } from "react";

import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { useSnackbar } from "@/shared/lib";
import { BottomNav, Button, Dropdown, FormWrapper, Input } from "@/shared/ui";

import {
  competitionQueryKeys,
  CompetitorType,
  ICompetitor,
  useCreateCompetitionRequest,
} from "@/entities/competition";

import { CreateCompetitionRequestForm } from "../../model/types/create-competition-request-form";
import { useValidation } from "../../lib/hooks/useValidation";
import { yupResolver } from "@hookform/resolvers/yup";

interface ApplyToCompetitionFormProps {
  className?: string;
  lastRecord?: Pick<
    ICompetitor,
    "level" | "weight" | "height" | "competitorType"
  >;
  competitionId: number;
  userId: number;
}

const competitorTypes: { name: string; value: string }[] = [
  {
    name: "Male",
    value: "Male",
  },
  {
    name: "Female",
    value: "Female",
  },
];

export const ApplyToCompetitionForm: FC<ApplyToCompetitionFormProps> = ({
  lastRecord,
  competitionId,
  userId,
}) => {
  const { mutate, isLoading } = useCreateCompetitionRequest();
  const schema = useValidation();
  const methods = useForm<CreateCompetitionRequestForm>({
    resolver: yupResolver(schema),
  });
  const queryClient = useQueryClient();
  const { showApiError, showSuccess } = useSnackbar();

  const competitorTypeLastRecord = {
    name: lastRecord?.competitorType ?? "",
    value: lastRecord?.competitorType ?? CompetitorType.Male,
  };

  const handlePrev = () => {
    methods.setValue("level", lastRecord?.level ?? 0);
    methods.setValue("weight", lastRecord?.weight ?? 0);
    methods.setValue("height", lastRecord?.height ?? 0);
    methods.setValue("competitorType", competitorTypeLastRecord);
  };

  const handleSave = methods.handleSubmit(async (data) => {
    await mutate(
      {
        ...data,
        level: Number(data.level),
        competitorType: data.competitorType.value,
        competitionId,
        userId,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: competitionQueryKeys.getCompetitorRecordsAll(),
          });
          showSuccess("Request created successfully");
        },
        onError: (error) => {
          showApiError(error);
        },
      }
    );
  });

  return (
    <FormWrapper methods={methods}>
      {/*TODO: handle level management system*/}
      <Input
        name={"level"}
        label={"Level"}
        type={"number"}
        max={10}
        min={0}
        fullWidth
        defaultValue={lastRecord?.level}
      />
      <div className={"flex gap-5"}>
        <Input
          name={"weight"}
          label={"Weight"}
          type={"number"}
          max={1000}
          min={1}
          fullWidth
          defaultValue={lastRecord?.weight}
        />
        <Input
          name={"height"}
          label={"Height"}
          type={"number"}
          max={1000}
          min={10}
          fullWidth
          defaultValue={lastRecord?.height}
        />
      </div>
      <Dropdown
        name={"competitorType"}
        list={competitorTypes}
        displayValue={"name"}
        displayKey={"value"}
        label={"Competitor Type"}
        fullWidth
        className={"mt-5"}
        defaultValue={competitorTypeLastRecord}
      />
      {lastRecord && (
        <div className={"flex justify-end mt-5"}>
          <Button onClick={handlePrev} variant={"text"} color={"theme-main"}>
            Use previous value
          </Button>
        </div>
      )}
      <BottomNav onSave={handleSave} loading={isLoading} />
    </FormWrapper>
  );
};
