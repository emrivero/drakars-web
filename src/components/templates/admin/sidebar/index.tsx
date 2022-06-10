import {
  Add,
  AttachMoney,
  Business,
  CarRentalRounded,
  DirectionsCar,
  Edit,
  ListAltOutlined,
  Person,
  Shield,
} from "@mui/icons-material";
import {
  Divider,
  ListItem,
  ListSubheader,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import axios from "axios";
import { FC } from "react";
import { Securized } from "../../../../auth/securized";
import { useAuth } from "../../../../auth/use-auth";
import { Capitalize } from "../../../atoms/transforms/capitalize";
import { Upper } from "../../../atoms/transforms/upper";
import { BlackLink } from "../../../molecules/black-link";
import { MuiLink } from "../../../molecules/link";

export const AdminSidebar: FC = () => {
  const theme = useTheme();
  const { token, isTokenExpired } = useAuth();
  if (!isTokenExpired) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  return (
    <Drawer
      anchor="left"
      open={true}
      onClose={() => null}
      variant="permanent"
      PaperProps={{
        sx: {
          width: { md: "280px", xs: "200px" },
          flexShrink: 0,
          backgroundColor: theme.palette.primary.dark,
          "& .MuiDrawer-paper": {
            width: { md: "280px", xs: "200px" },
            boxSizing: "border-box",
          },
        },
      }}
    >
      <Toolbar>
        <MuiLink to={"/admin"} sx={{ textDecoration: "none" }}>
          <Typography
            align="center"
            variant="h5"
            fontWeight={600}
            sx={{
              color: theme.palette.common.white,
              fontFamily: `"Open Sans", sans-serif`,
            }}
          >
            <Upper>drakars admin</Upper>
          </Typography>
        </MuiLink>
      </Toolbar>
      <Divider />
      <List>
        <ListSubheader
          sx={{
            backgroundColor: theme.palette.primary.dark,
            color: "rgba(255, 255, 255, 0.4)",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            <Capitalize>Reservas</Capitalize>
          </Typography>
        </ListSubheader>
        <ListItem>
          <BlackLink
            sx={{
              color: "#fff",
              display: "flex",
              alignItems: "center",
              ml: 2,
              "&:hover": {
                color: theme.palette.secondary.main,
              },
            }}
            to="/admin/rents"
          >
            <CarRentalRounded />
            <ListAltOutlined />
            <Box sx={{ ml: 2 }}>
              <Typography>
                <Capitalize>Listado de reservas</Capitalize>
              </Typography>
            </Box>
          </BlackLink>
        </ListItem>
        <Divider sx={{ backgroundColor: "#fff", width: "100%", mb: 2 }} />
        <ListSubheader
          sx={{
            backgroundColor: theme.palette.primary.dark,
            color: "rgba(255, 255, 255, 0.4)",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            <Capitalize>Usuarios</Capitalize>
          </Typography>
        </ListSubheader>
        <ListItem>
          <BlackLink
            sx={{
              color: "#fff",
              display: "flex",
              alignItems: "center",
              ml: 2,
              "&:hover": {
                color: theme.palette.secondary.main,
              },
            }}
            to="/admin/user/clients"
          >
            <Person />
            <AttachMoney />
            <Box sx={{ ml: 2 }}>
              <Typography>
                <Capitalize>clientes</Capitalize>
              </Typography>
            </Box>
          </BlackLink>
        </ListItem>
        <Securized>
          <ListItem>
            <BlackLink
              sx={{
                color: "#fff",
                display: "flex",
                alignItems: "center",
                ml: 2,
                "&:hover": {
                  color: theme.palette.secondary.main,
                },
              }}
              to="/admin/user/editors"
            >
              <Person />
              <Edit />
              <Box sx={{ ml: 2 }}>
                <Typography>
                  <Capitalize>editores</Capitalize>
                </Typography>
              </Box>
            </BlackLink>
          </ListItem>
        </Securized>
        <Securized>
          <ListItem>
            <BlackLink
              sx={{
                color: "#fff",
                display: "flex",
                alignItems: "center",
                ml: 2,
                "&:hover": {
                  color: theme.palette.secondary.main,
                },
              }}
              to="/admin/user/admins"
            >
              <Person />
              <Shield />
              <Box sx={{ ml: 2 }}>
                <Typography>
                  <Capitalize>administradores</Capitalize>
                </Typography>
              </Box>
            </BlackLink>
          </ListItem>
        </Securized>
        <Divider sx={{ backgroundColor: "#fff", width: "100%", mb: 2 }} />
        <ListSubheader
          sx={{
            backgroundColor: theme.palette.primary.dark,
            color: "rgba(255, 255, 255, 0.4)",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            <Capitalize>Vehículos</Capitalize>
          </Typography>
        </ListSubheader>
        <ListItem>
          <BlackLink
            sx={{
              color: "#fff",
              display: "flex",
              alignItems: "center",
              ml: 2,
              "&:hover": {
                color: theme.palette.secondary.main,
              },
            }}
            to="/admin/vehicles/add"
          >
            <DirectionsCar />
            <Add />
            <Box sx={{ ml: 2 }}>
              <Typography>
                <Capitalize>añadir vehículo</Capitalize>
              </Typography>
            </Box>
          </BlackLink>
        </ListItem>
        <ListItem>
          <BlackLink
            sx={{
              color: "#fff",
              display: "flex",
              alignItems: "center",
              ml: 2,
              "&:hover": {
                color: theme.palette.secondary.main,
              },
            }}
            to="/admin/vehicles"
          >
            <DirectionsCar />
            <ListAltOutlined />
            <Box sx={{ ml: 2 }}>
              <Typography>
                <Capitalize>listar vehículos</Capitalize>
              </Typography>
            </Box>
          </BlackLink>
        </ListItem>
        <Divider sx={{ backgroundColor: "#fff", width: "100%", mb: 2 }} />
        <Securized>
          <ListSubheader
            sx={{
              backgroundColor: theme.palette.primary.dark,
              color: "rgba(255, 255, 255, 0.4)",
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              <Capitalize>Oficinas</Capitalize>
            </Typography>
          </ListSubheader>
          <ListItem>
            <BlackLink
              sx={{
                color: "#fff",
                display: "flex",
                alignItems: "center",
                ml: 2,
                "&:hover": {
                  color: theme.palette.secondary.main,
                },
              }}
              to="/admin/offices/add"
            >
              <Business />
              <Add />
              <Box sx={{ ml: 2 }}>
                <Typography>
                  <Capitalize>Añadir oficina</Capitalize>
                </Typography>
              </Box>
            </BlackLink>
          </ListItem>
          <ListItem>
            <BlackLink
              sx={{
                color: "#fff",
                display: "flex",
                alignItems: "center",
                ml: 2,
                "&:hover": {
                  color: theme.palette.secondary.main,
                },
              }}
              to="/admin/offices"
            >
              <Business />
              <ListAltOutlined />
              <Box sx={{ ml: 2 }}>
                <Typography>
                  <Capitalize>Lista de oficinas</Capitalize>
                </Typography>
              </Box>
            </BlackLink>
          </ListItem>
          <Divider sx={{ backgroundColor: "#fff", width: "100%", mb: 2 }} />
        </Securized>
      </List>
    </Drawer>
  );
};
