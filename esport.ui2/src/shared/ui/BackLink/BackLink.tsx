import { FC, ReactNode } from "react";
import UILink from "../UILink/UILink";
import { useRouter } from "next/router";
import { SubTitle } from "..";

interface ClickableBackLinkProps {
  onClick: () => void;
}

interface UILinkBackLinkProps {
  href: string;
}

type BackLinkProps = (ClickableBackLinkProps | UILinkBackLinkProps) & {
  children?: ReactNode;
};

export const BackLink: FC<BackLinkProps> = ({
  children = "Back",
  ...props
}) => {
  const router = useRouter();

  if ("href" in props)
    return (
      <UILink {...props} color={"inverted"}>
        {"<"} {children}
      </UILink>
    );

  const handleClick = () => props.onClick ?? router.back();

  return (
    <SubTitle
      onClick={handleClick}
      size={"small"}
      className={"cursor-pointer py-1 active:opacity-50 w-fit"}
    >
      {"< "}
      {children}
    </SubTitle>
  );
};
