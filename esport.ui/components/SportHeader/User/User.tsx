import React, { MouseEvent, useState } from "react";

import { Avatar, Grid, Menu, MenuItem } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import { SportIconButton } from "@components/SportIconButton/SportIconButton";

import { SERVER_DELAY } from "@constants/server";

import { useAppDispatch, useAppSelector } from "@storage/hooks/useStore";
import { logOut, selectUser } from "@storage/slices/user";
import { hideLoading, showLoading } from "@storage/slices/loadingIndicator";

import { getDisplayName, validateStr } from "utils";

import { SelectedItem } from "../Text/SelectedItem";
import { RegularItem } from "../Text/RegularItem";
import { SportAvatar } from "@components/SportAvatar/SportAvatar";

interface UserProps {}

export const User: React.FC<UserProps> = () => {
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(showLoading());
    setTimeout(() => {
      dispatch(hideLoading());
      dispatch(logOut());
    }, SERVER_DELAY);
  };

  return (
    <>
      <SportIconButton onClick={handleOpenMenu}>
        <Avatar />
      </SportIconButton>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        classes={{
          paper: `bg-skin-contrast`,
          list: `text-skin-main min-w-[180px]`,
        }}
        PaperProps={{ elevation: 8 }}
      >
        <MenuItem>
          <Grid item className="pr-4">
            <SportAvatar name={"John"} />
          </Grid>
          <Grid container direction="column">
            <SelectedItem>{getDisplayName(user)}</SelectedItem>
            <RegularItem>{validateStr(user?.role)}</RegularItem>
          </Grid>
        </MenuItem>
        <MenuItem className="mt-5" onClick={handleLogout}>
          <Grid item className="pr-4">
            <LogoutIcon />
          </Grid>
          <Grid container direction="column">
            <SelectedItem>Logout</SelectedItem>
          </Grid>
        </MenuItem>
      </Menu>
    </>
  );
};
