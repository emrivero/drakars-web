import {
  CarRentalRounded,
  KeyboardArrowDown,
  LanguageRounded,
} from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Divider, Fade, Typography, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import { FC, useState } from "react";
import { useAuth } from "../../../../auth/use-auth";
import { useTranslate } from "../../../../i18n/useTranslate";
import { Routes } from "../../../../routes/routes";
import { toggleSidebar } from "../../../../store/sidebar/actions/toggle-sidebar";
import { Logo } from "../../../atoms/logo";
import { Capitalize } from "../../../atoms/transforms/capitalize";
import { BlackLink } from "../../../molecules/black-link";
import { MuiLink } from "../../../molecules/link";

export const Header: FC = () => {
  const { login, logout, isAuthenticated, userInfo } = useAuth();
  const theme = useTheme();
  const { t, setLang, lang } = useTranslate();

  const [languageAnchor, setLanguageAnchor] = useState<null | HTMLElement>(
    null
  );
  const openLanguageMenu = Boolean(languageAnchor);

  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const openProfileMenu = Boolean(profileAnchor);

  const handleMenuLanguage = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleCloseMenuLanguage = () => {
    setLanguageAnchor(null);
  };

  const handleMenuProfile = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleCloseMenuProfile = () => {
    setProfileAnchor(null);
  };

  const changeLang = (lang: string) => {
    setLang(lang);
    handleCloseMenuLanguage();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => toggleSidebar(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { md: "flex" } }}>
            <MuiLink to={Routes.HOME_PAGE}>
              <Logo
                color="secondary"
                sx={{
                  height: { md: ".3em", xs: ".2em" },
                  fontSize: "150px",
                }}
              />
            </MuiLink>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <BlackLink to="/home/services/manage-booking">
            <IconButton
              sx={{ color: "#fff", display: { xs: "none", md: "inherit" } }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CarRentalRounded />
                <Typography variant="h6" sx={{ flexGrow: 1 }} fontWeight={600}>
                  <Capitalize>{t("manage_booking")}</Capitalize>
                </Typography>
              </Box>
            </IconButton>
          </BlackLink>
          <Box sx={{ flexGrow: 1 / 24 }} />
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ display: { xs: "none", md: "inherit" } }}
          />
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
              <MenuItem
                style={
                  lang === "es"
                    ? {
                        backgroundColor: theme.palette.secondary.light,
                      }
                    : {}
                }
              >
                <Button onClick={() => changeLang("es")}>
                  <Capitalize>{t("spanish")}</Capitalize>
                </Button>
              </MenuItem>
              <MenuItem
                style={
                  lang === "en"
                    ? {
                        backgroundColor: theme.palette.secondary.light,
                      }
                    : {}
                }
              >
                <Button onClick={() => changeLang("en")}>
                  <Capitalize>{t("english")}</Capitalize>
                </Button>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1 / 24 }} />
          {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
          <Box
            sx={{
              flexGrow: 1 / 24,
              flexDirection: "column",
              display: { xs: "none", md: "flex" },
            }}
          >
            {!isAuthenticated ? (
              <Button
                onClick={login}
                variant="outlined"
                size="large"
                endIcon={<AccountCircle />}
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                {t("enter")}
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  endIcon={
                    <>
                      <AccountCircle />
                      <KeyboardArrowDown />
                    </>
                  }
                  color="secondary"
                  onClick={handleMenuProfile}
                  size="large"
                >
                  {userInfo.given_name}
                </Button>
                <Menu
                  open={openProfileMenu}
                  anchorEl={profileAnchor}
                  onClose={handleCloseMenuProfile}
                  TransitionComponent={Fade}
                >
                  <MenuItem href="/home/profile">
                    <BlackLink to="/home/profile">
                      <Button>
                        <Capitalize>mi perfil</Capitalize>
                      </Button>
                    </BlackLink>
                  </MenuItem>
                  <MenuItem>
                    <Button onClick={logout}>
                      <Capitalize>desconectar</Capitalize>
                    </Button>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
