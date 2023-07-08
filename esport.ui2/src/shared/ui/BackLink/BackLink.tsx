import { FC, ReactNode } from "react";
import UILink from "../UILink/UILink";
import { useRouter } from "next/router";
import { SubTitle } from "..";
import cn from "classnames";

interface ClickableBackLinkProps {
  onClick: () => void;
}

interface UILinkBackLinkProps {
  href: string;
}

type BackLinkProps = (ClickableBackLinkProps | UILinkBackLinkProps) & {
  children?: ReactNode;
  className?: string;
};

export const BackLink: FC<BackLinkProps> = ({
  children = "Back",
  className,
  ...props
}) => {
  if ("href" in props)
    return (
      <UILink {...props} className={className} color={"inverted"}>
        {"<"} {children}
      </UILink>
    );

  return (
    <SubTitle
      onClick={props.onClick}
      size={"small"}
      className={cn("cursor-pointer py-1 active:opacity-50 w-fit", className)}
    >
      {"< "}
      {children}
    </SubTitle>
  );
};
