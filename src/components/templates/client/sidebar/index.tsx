import { useTheme } from "@emotion/react";
import {
  ChevronLeft,
  ChevronRight,
  ContactSupport,
  Coronavirus,
  CorporateFare,
  DirectionsCar,
  Info,
  Mail,
} from "@mui/icons-material";
import { IconButton, ListItem, styled, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { Theme } from "@mui/system";
import { FC } from "react";
import { Routes } from "../../../../routes/routes";
import { useStore } from "../../../../store";
import { toggleSidebar } from "../../../../store/sidebar/actions/toggle-sidebar";
import { BlackLink } from "../../../molecules/black-link";

const DrawerHeader = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  maxHeight: "16px",
}));

export const Sidebar: FC = () => {
  const { open } = useStore((state) => state.sidebarState);
  const theme: Partial<Theme> = useTheme();
  return (
    <Drawer anchor="left" open={open} onClose={() => toggleSidebar()}>
      <Box
        sx={{
          width: 380,
          p: 4,
        }}
        role="presentation"
      >
        <DrawerHeader>
          <IconButton onClick={() => toggleSidebar(false)}>
            {theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>
        <Typography sx={{ color: theme.palette.primary.main }}>
          Servicios
        </Typography>
        <List>
          <ListItem>
            <BlackLink
              to="/home/services/rent-car"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <DirectionsCar />
              <Box sx={{ ml: 1 }}>
                <Typography variant="h6">Alquiler de coches</Typography>
              </Box>
            </BlackLink>
          </ListItem>
          <ListItem>
            <BlackLink
              to="/home/services/offices"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <CorporateFare />
              <Box sx={{ ml: 1 }}>
                <Typography variant="h6">Nuestras oficinas</Typography>
              </Box>
            </BlackLink>
          </ListItem>
        </List>
        <Divider sx={{ mb: 2 }} />
        <Typography sx={{ color: theme.palette.primary.main }}>
          Sobre nosotros
        </Typography>
        <List>
          <ListItem>
            <BlackLink
              to={Routes.ABOUT_US}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Info />
              <Box sx={{ ml: 1 }}>
                <Typography variant="h6">Quiénes somos</Typography>
              </Box>
            </BlackLink>
          </ListItem>
          <ListItem>
            <BlackLink
              to={Routes.FAQ}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <ContactSupport />
              <Box sx={{ ml: 1 }}>
                <Typography variant="h6">FAQ</Typography>
              </Box>
            </BlackLink>
          </ListItem>
          <ListItem>
            <BlackLink
              to={Routes.COVID19}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Coronavirus />
              <Box sx={{ ml: 1 }}>
                <Typography variant="h6">Covid-19</Typography>
              </Box>
            </BlackLink>
          </ListItem>
          <ListItem>
            <BlackLink
              to={Routes.CONTACT_PAGE}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Mail />
              <Box sx={{ ml: 1 }}>
                <Typography variant="h6">Contacta</Typography>
              </Box>
            </BlackLink>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
