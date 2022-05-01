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
import { FC, useState } from "react";
import { useTranslate } from "../../../i18n/useTranslate";
import { Routes } from "../../../routes/routes";
import { toggleSidebar } from "../../../store/sidebar/actions/toggle-sidebar";
import { Logo } from "../../atoms/logo";
import { Capitalize } from "../../atoms/transforms/capitalize";
import { MuiLink } from "../../molecules/link";

export const Header: FC = () => {
  // const { login, logout, isAuthenticated } = useAuth();
  const { t } = useTranslate();

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
              {/* <Box
                  component={"img"}
                  src="/img/logo.svg"
                  sx={{ width: "200px", py: 1 }}
                /> */}
              <Logo
                color="secondary"
                sx={{
                  height: ".3em",
                  fontSize: "150px",
                }}
              />
            </MuiLink>
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
                <Button>
                  <Capitalize>{t("spanish")}</Capitalize>
                </Button>
              </MenuItem>
              <MenuItem>
                <Button>
                  <Capitalize>{t("english")}</Capitalize>
                </Button>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1 / 24 }} />
          {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
          <Box
            sx={{ flexGrow: 1 / 24, display: "flex", flexDirection: "column" }}
          >
            <Button
              onClick={() => null}
              variant="outlined"
              size="large"
              endIcon={<AccountCircle />}
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              {t("enter")}
            </Button>
            {/* {!true ? (
              
            ) : (
              <Button
                onClick={() => null}
                variant="outlined"
                size="large"
                endIcon={<AccountCircle />}
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                {t("exit")}
              </Button>
            )} */}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
