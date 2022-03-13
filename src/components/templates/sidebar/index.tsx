import { useTheme } from "@emotion/react";
import {
  AirportShuttle,
  ContactMail,
  ContactSupport,
  Coronavirus,
  DirectionsCar,
  Info,
  Schedule,
} from "@mui/icons-material";
import { ListItem, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { Theme } from "@mui/system";
import { FC } from "react";
import { useStore } from "../../../store";
import { toggleSidebar } from "../../../store/sidebar/actions/toggle-sidebar";
import { BlackLink } from "../../molecules/black-link";
import { SidebarProps } from "./types";

export const Sidebar: FC<SidebarProps> = () => {
  const { open } = useStore((state) => state.sidebarState);
  const theme: Partial<Theme> = useTheme();
  return (
    <Drawer anchor="left" open={open} onClose={toggleSidebar}>
      <Box
        sx={{
          width: 380,
          p: 4,
        }}
        role="presentation"
      >
        <Typography sx={{ color: theme.palette.primary.main }}>
          Servicios
        </Typography>
        <List>
          <ListItem>
            <BlackLink
              href={{ pathname: "/local" }}
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
              href={{ pathname: "/local" }}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <AirportShuttle />
              <Box sx={{ ml: 1 }}>
                <Typography variant="h6">Alquiler de furgonetas</Typography>
              </Box>
            </BlackLink>
          </ListItem>
          <ListItem>
            <BlackLink
              href={{ pathname: "/local" }}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Schedule />
              <Box sx={{ ml: 1 }}>
                <Typography variant="h6">Alquiler de larga duración</Typography>
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
              href={{ pathname: "/local" }}
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
              href={{ pathname: "/local" }}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <ContactMail />
              <Box sx={{ ml: 1 }}>
                <Typography variant="h6">Contacto</Typography>
              </Box>
            </BlackLink>
          </ListItem>
          <ListItem>
            <BlackLink
              href={{ pathname: "/local" }}
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
              href={{ pathname: "/local" }}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Coronavirus />
              <Box sx={{ ml: 1 }}>
                <Typography variant="h6">Covid-19</Typography>
              </Box>
            </BlackLink>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
