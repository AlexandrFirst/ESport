import React, { MouseEvent, useState } from "react";
import styles from "./translate.module.css";

import TranslateIcon from "@mui/icons-material/Translate";
import { Menu, MenuItem } from "@mui/material";

import { SportIconButton } from "@components/SportIconButton/SportIconButton";
import cn from "classnames";

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
      <Menu
        disablePortal
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // className={styles.paper}
        classes={{
          paper: styles.paper,
          list: styles.text,
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang}
            onClick={handleClose}
            className={cn(styles.menu_item, {
              [styles.menu_item_selected]: lang === "English",
            })}
          >
            {lang}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
