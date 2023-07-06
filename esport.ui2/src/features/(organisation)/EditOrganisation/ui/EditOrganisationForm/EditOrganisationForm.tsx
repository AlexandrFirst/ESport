import { FC } from "react";

import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "@/shared/ui";
import { useSnackbar } from "@/shared/lib";

import {
  CreateEditOrganisationForm,
  GymList,
  IEditOrganisationForm,
  IOrganisation,
  transformOrganisationInfoToUpdate,
  useUpdateOrganisation,
} from "@/entities/organisation";
import { GymItemField, IGymReadInfo } from "@/entities/gym";

import { useEditOrganisationValidation } from "../../lib/hooks/useEditOrganisationValidation";

interface EditOrganisationProps {
  gyms?: IGymReadInfo[];
  organisation?: IOrganisation;
  className?: string;
}

export const EditOrganisationForm: FC<EditOrganisationProps> = ({
  gyms,
  organisation,
}) => {
  const { showSuccess, showError } = useSnackbar();

  const { mutate, isLoading } = useUpdateOrganisation({
    onSuccess() {
      showSuccess("Succsessfully updated organisation");
    },
    onError(e: any) {
      showError(e.messages?.[0] ?? "Something went wrong");
    },
  });
  const getGimListDefaultValue = (): GymList => {
    return (
      gyms?.map((gym) => ({
        address: gym.address,
        name: gym.name,
        closeTime: gym.closeTime,
        openTime: gym.onenTime,
        gymId: gym.gymId,
        gymOrganisationId: gym.organisationId,
      })) ?? []
    );
  };
  const validation = useEditOrganisationValidation();

  const methods = useForm<IEditOrganisationForm>({
    defaultValues: {
      gymList: getGimListDefaultValue(),
      name: organisation?.name,
      description: organisation?.description,
    },
    resolver: yupResolver(validation),
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "gymList",
  });

  const handleAddGym = () =>
    append({
      name: "",
      address: "",
      openTime: "00:00",
      closeTime: "00:00",
      gymId: 0,
      gymOrganisationId: 0,
    });

  const handleSubmit = methods.handleSubmit((data) => {
    console.log(
      "===transformOrganisationInfoToUpdate(data)===",
      transformOrganisationInfoToUpdate({
        ...data,
        organisationId: organisation?.organisationId ?? 0,
      })
    );
    mutate(
      transformOrganisationInfoToUpdate({
        ...data,
        organisationId: organisation?.organisationId ?? 0,
      })
    );
  });

  return (
    <CreateEditOrganisationForm
      methods={methods}
      buttonText={"Save"}
      onSubmit={handleSubmit}
      fullWidthSubmit
      isLoading={isLoading}
      additionalFields={
        <div>
          {fields.map(({ id }, index) => (
            <GymItemField key={id} index={index} remove={remove} />
          ))}
          <Button variant={"outlined"} onClick={handleAddGym}>
            + Add gym
          </Button>
        </div>
      }
    />
  );
};
