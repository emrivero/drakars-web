import { useTheme } from "@emotion/react";
import { CarRentalRounded, LanguageRounded } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Divider, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import { Theme } from "@mui/system";
import { FC } from "react";
import { toggleSidebar } from "../../../store/sidebar/actions/toggle-sidebar";
import { HeaderProps } from "./types";

export const Header: FC<HeaderProps> = () => {
  const theme: Partial<Theme> = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={toggleSidebar}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { md: "flex" } }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1 }}
              fontWeight={600}
            >
              Caronte Cars
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton sx={{ color: "#fff" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CarRentalRounded />
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                fontWeight={600}
              >
                Gestionar reserva
              </Typography>
            </Box>
          </IconButton>
          <Box sx={{ flexGrow: 1 / 24 }} />
          <Divider orientation="vertical" variant="middle" flexItem />
          <Box sx={{ flexGrow: 1 / 24 }} />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, .7fr)",
              alignItems: "center",
            }}
          >
            <LanguageRounded fontSize="small" />
            <Typography component="div">Idioma</Typography>
          </Box>
          <Box sx={{ flexGrow: 1 / 24 }} />
          <Divider orientation="vertical" variant="middle" flexItem />
          <Box sx={{ flexGrow: 1 / 24 }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={"id"}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={false}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
      </Menu>

      <Menu
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={"id"}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={false}
      >
        <MenuItem>Español</MenuItem>
        <MenuItem>Inglés</MenuItem>
      </Menu>
    </Box>
  );
};
