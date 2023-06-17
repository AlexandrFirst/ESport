import React, { FC } from "react";

import { useTranslation } from "next-i18next";
import Link from "next/link";

import { Button } from "@/shared/ui";
import { routes } from "@/shared/config";

interface TryNowButtonProps {
  className?: string;
  fullWidth?: boolean;
}

export const TryNowButton: FC<TryNowButtonProps> = ({
  className,
  fullWidth = true,
}) => {
  const { t } = useTranslation("home");

  return (
    // @ts-ignore
    <Button as={Link} href={routes.Me()} fullWidth={fullWidth}>
      {t("try")}
    </Button>
  );
};
