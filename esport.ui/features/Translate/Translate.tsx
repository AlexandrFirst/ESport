import React, { MouseEvent, useState } from "react";

import TranslateIcon from "@mui/icons-material/Translate";

import { SportIconButton } from "../../shared/ui/SportIconButton/SportIconButton";
import { SportMenu } from "../../shared/ui/SportMenu/SportMenu";

interface TranslateProps {
  className?: string;
}

const languages = ["English", "Ukrainian", "French"];

export const Translate: React.FC<TranslateProps> = ({ className }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <SportIconButton className={className} onClick={handleClick}>
        <TranslateIcon />
      </SportIconButton>
      <SportMenu
        // disablePortal
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // className={styles.paper}
        dataList={languages.map((language) => ({
          item: language,
          selected: language === "English",
        }))}
      />
    </>
  );
};
