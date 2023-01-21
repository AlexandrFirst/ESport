import React, { MouseEvent, useState } from "react";

import { Avatar } from "@mui/material";

import { SportIconButton } from "@shared/ui/SportIconButton/SportIconButton";

interface UserProps {
  onLogout?: () => void;
}

export const UserAvatar: React.FC<UserProps> = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const handleLogout = () => {
  //   onLogout?.();
  // };

  return (
    <>
      <SportIconButton onClick={handleOpenMenu}>
        <Avatar />
      </SportIconButton>
      {/*<Menu*/}
      {/*  id="userSlice-menu"*/}
      {/*  anchorEl={anchorEl}*/}
      {/*  open={open}*/}
      {/*  onClose={handleClose}*/}
      {/*  classes={{*/}
      {/*    paper: `bg-skin-contrast`,*/}
      {/*    list: `text-skin-main min-w-[180px]`,*/}
      {/*  }}*/}
      {/*  PaperProps={{ elevation: 8 }}*/}
      {/*>*/}
      {/*  <MenuItem>*/}
      {/*    <Grid item className="pr-4">*/}
      {/*      <SportAvatar name={"John"} />*/}
      {/*    </Grid>*/}
      {/*    <Grid container direction="column">*/}
      {/*      <SelectedItem>{getDisplayName(userSlice)}</SelectedItem>*/}
      {/*      <RegularItem>{validateStr(userSlice?.role)}</RegularItem>*/}
      {/*    </Grid>*/}
      {/*  </MenuItem>*/}
      {/*  <MenuItem className="mt-5" onClick={handleLogout}>*/}
      {/*    <Grid item className="pr-4">*/}
      {/*      <LogoutIcon />*/}
      {/*    </Grid>*/}
      {/*    <Grid container direction="column">*/}
      {/*      <SelectedItem>Logout</SelectedItem>*/}
      {/*    </Grid>*/}
      {/*  </MenuItem>*/}
      {/*</Menu>*/}
    </>
  );
};
