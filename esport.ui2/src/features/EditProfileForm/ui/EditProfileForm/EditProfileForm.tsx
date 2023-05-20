import React, { FC } from "react";
import styles from "./EditProfileForm.module.css";

import { useForm } from "react-hook-form";

import { Button, FormWrapper, TwoItemsGridContainer } from "@/shared/ui";
import { IProfile } from "@/entities/profile";

interface EditProfileFormProps {
  profile: IProfile;
  className?: string;
}

export const EditProfileForm: FC<EditProfileFormProps> = ({ profile }) => {
  const methods = useForm();
  const handleSubmit = methods.handleSubmit((data) => {
    console.log("===data===", data);
  });

  return (
    <>
      <FormWrapper methods={methods}>
        <TwoItemsGridContainer className={styles.formContainer}>
          {/*<FormCard*/}
          {/*  profile={profile?.userIdentityInfo}*/}
          {/*  namePrefix={"identity"}*/}
          {/*  label={"Login data"}*/}
          {/*/>*/}
          {/*<FormCard*/}
          {/*  profile={profile?.userTraineeInfo}*/}
          {/*  namePrefix={"trainee"}*/}
          {/*  label={"Trainee info"}*/}
          {/*  fallback={<Button>Become a trainee</Button>}*/}
          {/*/>*/}
          {/*<FormCard*/}
          {/*  profile={profile?.userTrainerInfo}*/}
          {/*  namePrefix={"trainer"}*/}
          {/*  label={"Trainer info"}*/}
          {/*/>*/}
          {/*<FormCard*/}
          {/*  profile={profile?.userAdminInfo}*/}
          {/*  namePrefix={"gymAdmin"}*/}
          {/*  label={"Administator of the gym info"}*/}
          {/*/>*/}
          {/*<FormCard*/}
          {/*  profile={profile?.userOrganisationAdminInfos?.[0]}*/}
          {/*  namePrefix={"organizationAdmin"}*/}
          {/*  label={"Administator of organization info"}*/}
          {/*/>*/}
        </TwoItemsGridContainer>
        <div className={styles.btn_wrapper}>
          <Button fullWidth={false} variant={"outlined"} color={"error"}>
            Cancel
          </Button>
          <Button fullWidth={false} onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </FormWrapper>
    </>
  );
};
