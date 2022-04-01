import { useTheme } from "@emotion/react";
import { CarRentalRounded, LanguageRounded } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Divider, Fade, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import { Theme } from "@mui/system";
import { useTranslation } from "next-i18next";
import { FC, useState } from "react";
import { Routes } from "../../../routes/routes";
import { toggleSidebar } from "../../../store/sidebar/actions/toggle-sidebar";
import { Capitalize } from "../../atoms/transforms/capitalize";
import { BlackLink } from "../../molecules/black-link";
import { HeaderProps } from "./types";

export const Header: FC<HeaderProps> = () => {
  const theme: Partial<Theme> = useTheme();
  const { t } = useTranslation("header");

  const [languageAnchor, setLanguageAnchor] = useState<null | HTMLElement>(
    null
  );
  const openLanguageMenu = Boolean(languageAnchor);

  const handleMenuLanguage = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleCloseMenuLanguage = () => {
    setLanguageAnchor(null);
  };

  const [accountAnchor, setAccountAnchor] = useState<null | HTMLElement>(null);
  const openAccountMenu = Boolean(accountAnchor);

  const handleAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAccountAnchor(event.currentTarget);
  };

  const handleCloseAccountMenu = () => {
    setAccountAnchor(null);
  };

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
              Drakcars
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton sx={{ color: "#fff" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CarRentalRounded />
              <Typography variant="h6" sx={{ flexGrow: 1 }} fontWeight={600}>
                <Capitalize>{t("manage_booking")}</Capitalize>
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
            <Typography
              sx={{ cursor: "pointer" }}
              component="div"
              onClick={handleMenuLanguage}
            >
              <Capitalize>{t("language")}</Capitalize>
            </Typography>
            <Menu
              open={openLanguageMenu}
              anchorEl={languageAnchor}
              onClose={handleCloseMenuLanguage}
              TransitionComponent={Fade}
            >
              <MenuItem>
                <BlackLink href="" locale="es">
                  <Capitalize>{t("spanish")}</Capitalize>
                </BlackLink>
              </MenuItem>
              <MenuItem>
                <BlackLink href="" locale="en">
                  <Capitalize>{t("english")}</Capitalize>
                </BlackLink>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1 / 24 }} />
          {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
          <Box
            sx={{ flexGrow: 1 / 24, display: "flex", flexDirection: "column" }}
          >
            <Button
              variant="outlined"
              size="large"
              endIcon={<AccountCircle />}
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              href={Routes.LOGIN_PAGE}
            >
              {t("enter")}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
