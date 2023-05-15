import React, { FC, ReactNode } from "react";

import { Card } from "@/shared/ui";
import { ProfileDataForm, ProfileDataFormProps } from "@/entities/profile";

interface FormCardProps extends ProfileDataFormProps {
  fallback?: ReactNode;
}

export const FormCard: FC<FormCardProps> = ({
  profile,
  fallback,
  ...props
}) => {
  return (
    <Card padding={"md"}>
      {profile ? <ProfileDataForm {...props} profile={profile} /> : fallback}
    </Card>
  );
};
