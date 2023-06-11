import { FC, useState } from "react";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  BottomNav,
  Card,
  Checkbox,
  DragAndDropFileUpload,
  FormAutocomplete,
  FormWrapper,
  Input,
  Title,
} from "@/shared/ui";
import { useSnackbar } from "@/shared/lib";

import { useCurrentUserProfileInfo } from "@/entities/user";
import { useGetTraumas } from "@/entities/trauma";
import { useGetBodyParts } from "@/entities/bodyPart";
import { useTrainerCreateExercise } from "@/entities/exercise";

import { ICreateExerciseForm } from "../../model/types/create-exercise-form";
import { useValidation } from "../../lib/hooks/useValidation";

import { ExerciseVideoList } from "../ExerciseVideoList/ExerciseVideoList";

interface CreateExerciseProps {
  className?: string;
}

export const CreateExerciseForm: FC<CreateExerciseProps> = (props) => {
  const router = useRouter();
  const validationSchema = useValidation();

  const methods = useForm<ICreateExerciseForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      isPublic: false,
      sports: [],
      traumas: [],
      bodyParts: [],
    },
  });
  const { setValue } = methods;

  const { showWarning, showApiError, showSuccess } = useSnackbar();

  const { mutate, isLoading: isCreateLessonLoading } =
    useTrainerCreateExercise();

  const { trainerSports, isProfileLoading } = useCurrentUserProfileInfo();
  const { data: traumas, isLoading: isTraumasLoading } = useGetTraumas();
  const { data: bodyParts, isLoading: isBodyPartsLoading } = useGetBodyParts();

  const [videos, setVideos] = useState<File[] | null>(null);

  const handleSubmit = methods.handleSubmit(async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("Name", data.name);
    formData.append("Description", data.description);
    formData.append("IsPublic", String(data.isPublic));

    data.sports.forEach((sport, index) => {
      formData.append(`SportIds[${index}]`, String(sport.sportId));
    });
    data.traumas.forEach((trauma, index) => {
      formData.append(`TraumaIds[${index}]`, String(trauma.id));
    });
    data.bodyParts.forEach((bodyPart, index) => {
      formData.append(`BodyPartIds[${index}]`, String(bodyPart.id));
    });

    if (videos) {
      videos.forEach((video, index) => {
        formData.append(`exerciseInfos[${index}].videoExerciseExample`, video);
        formData.append(`exerciseInfos[${index}].exerciseId`, "0");
      });
    }
    await mutate(formData, {
      onError(e) {
        showApiError(e);
      },
      onSuccess() {
        showSuccess("Exercise created successfully");
        setValue("name", "");
        setValue("description", "");
        setValue("isPublic", false);
        setValue("sports", []);
        setValue("traumas", []);
        setValue("bodyParts", []);
        setVideos(null);
        // router.push(routes.Trainer.Excercises());
      },
    });
  });

  const handleDragFilesReject = () =>
    showWarning("Only video files are allowed");

  return (
    <Card>
      <Title center>Create exercise</Title>
      <FormWrapper methods={methods}>
        <Input name={"name"} label={"Name"} fullWidth />
        <Input name={"description"} label={"Description"} fullWidth />
        {!videos?.length ? (
          <DragAndDropFileUpload
            className={"mt-4 mb-10"}
            accept={"video/*"}
            onFileChange={setVideos}
            multiple
            onFilesReject={handleDragFilesReject}
          />
        ) : (
          <ExerciseVideoList
            files={videos}
            className={"mt-4 mb-10"}
            setFiles={setVideos}
            onFilesReject={handleDragFilesReject}
          />
        )}
        <FormAutocomplete
          list={trainerSports ?? []}
          displayValue={"name"}
          displayKey={"sportId"}
          lazy
          multiple
          name={"sports"}
          label={"Sports"}
          fullWidth
        />
        <FormAutocomplete
          list={traumas ?? []}
          name={"traumas"}
          label={"Traumas of the exercise"}
          displayValue={"name"}
          displayKey={"id"}
          lazy
          multiple
          withFilter
          className={"mt-10"}
          loading={isTraumasLoading}
          fullWidth
        />
        <FormAutocomplete
          list={bodyParts ?? []}
          name={"bodyParts"}
          label={"Body parts used in exercise"}
          displayValue={"name"}
          displayKey={"id"}
          lazy
          multiple
          withFilter
          className={"mt-10"}
          fullWidth
          loading={isBodyPartsLoading}
        />
        <Checkbox name={"isPublic"} label={"Make public"} className={"my-3"} />
        <BottomNav loading={isCreateLessonLoading} onSave={handleSubmit} />
      </FormWrapper>
    </Card>
  );
};