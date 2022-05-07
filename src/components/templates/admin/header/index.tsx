import { useTheme } from "@emotion/react";
import { Avatar, Fade, Grid, Menu, MenuItem, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { deepOrange } from "@mui/material/colors";
import Toolbar from "@mui/material/Toolbar";
import { Theme } from "@mui/system";
import { FC, useState } from "react";
import { Capitalize } from "../../../atoms/transforms/capitalize";
import { BlackLink } from "../../../molecules/black-link";

export interface AdminHeaderProps {
  title?: string;
}

export const AdminHeader: FC<AdminHeaderProps> = ({ title }) => {
  const theme: Partial<Theme> = useTheme();
  // const { login, logout, isAuthenticated } = useAuth();

  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(profileAnchor);

  const handleMenuProfile = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleCloseMenuProfile = () => {
    setProfileAnchor(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - 280px)`,
          ml: "280px",
        }}
      >
        <Toolbar sx={{ backgroundColor: theme.palette.common.white }}>
          <Grid>
            <Typography variant="h4" noWrap color={theme.palette.primary.main}>
              {title}
            </Typography>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Avatar
              aria-controls={open ? "profile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              sx={{
                bgcolor: deepOrange[500],
                cursor: "pointer",
              }}
              onClick={handleMenuProfile}
            >
              ED
            </Avatar>
          </Grid>
        </Toolbar>
      </AppBar>
      <Menu
        id="profile-menu"
        open={open}
        anchorEl={profileAnchor}
        onClose={handleCloseMenuProfile}
        TransitionComponent={Fade}
      >
        <MenuItem>
          <BlackLink to="profile">
            <Capitalize>editar perfil</Capitalize>
          </BlackLink>
        </MenuItem>
        <MenuItem>
          <BlackLink to="logout">
            <Capitalize>desconectar</Capitalize>
          </BlackLink>
        </MenuItem>
      </Menu>
    </>
  );
};
