import { FC, Fragment, memo } from "react";
import { IconButton, Menu } from "@/shared/ui";

import { LanguageIcon } from "@heroicons/react/24/solid";

interface TranslateProps {
  className?: string;
}

const languages = ["English", "Ukrainian", "French"];

export const Translate: FC<TranslateProps> = ({ className }) => {
  return (
    <>
      <Menu
        menuButton={
          <IconButton
            as={"div"}
            Svg={LanguageIcon}
            className={className}
            iconSize={"l"}
            // onClick={handleClick}
          />
        }
      />
    </>
  );
};
