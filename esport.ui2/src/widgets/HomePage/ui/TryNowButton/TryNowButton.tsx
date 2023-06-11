import React, { FC } from "react";
import { Button } from "@/shared/ui";
import Link from "next/link";
import { routes } from "@/shared/config";

interface TryNowButtonProps {
  className?: string;
  fullWidth?: boolean;
}

export const TryNowButton: FC<TryNowButtonProps> = ({
  className,
  fullWidth = true,
}) => {
  return (
    // @ts-ignore
    <Button as={Link} href={routes.Register()} fullWidth={fullWidth}>
      TRY NOW
    </Button>
  );
};
