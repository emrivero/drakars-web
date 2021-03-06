import { useTheme } from "@emotion/react";
import {
  Avatar,
  Button,
  Fade,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { deepOrange } from "@mui/material/colors";
import Toolbar from "@mui/material/Toolbar";
import { Theme } from "@mui/system";
import { FC, useState } from "react";
import { useAuth } from "../../../../auth/use-auth";
import { Capitalize } from "../../../atoms/transforms/capitalize";

export interface AdminHeaderProps {
  title?: string;
}

export const AdminHeader: FC<AdminHeaderProps> = ({ title }) => {
  const theme: Partial<Theme> = useTheme();
  const { logout, userInfo } = useAuth();

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
          width: { md: `calc(100% - 280px)`, xs: `calc(100% - 200px)` },
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
              {userInfo.name[0]}
              {userInfo.family_name[0]}
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
          <Button onClick={logout}>
            <Capitalize>Mi Perfil</Capitalize>
          </Button>
        </MenuItem>
        <MenuItem>
          <Button onClick={logout}>
            <Capitalize>desconectar</Capitalize>
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};
