import {
  Business,
  CarRentalRounded,
  DirectionsCar,
  ExpandMore,
  Person,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  ListItem,
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
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore color="primary" />}>
            <ListItem>
              <CarRentalRounded />
              <Box sx={{ ml: 2 }}>
                <Typography variant="h6">Reservas</Typography>
              </Box>
            </ListItem>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <BlackLink
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    ml: 2,
                  }}
                  to="/admin/rents/add"
                >
                  <Typography>
                    <Capitalize>Crear reserva</Capitalize>
                  </Typography>
                </BlackLink>
              </ListItem>
              <ListItem>
                <BlackLink
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    ml: 2,
                  }}
                  to="/admin/rents/manage"
                >
                  <Typography>
                    <Capitalize>Gestionar Reserva</Capitalize>
                  </Typography>
                </BlackLink>
              </ListItem>
              <ListItem>
                <BlackLink
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    ml: 2,
                  }}
                  to="/admin/rents"
                >
                  <Typography>
                    <Capitalize>Listado de reservas</Capitalize>
                  </Typography>
                </BlackLink>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore color="primary" />}>
            <ListItem>
              <Person />
              <Box sx={{ ml: 2 }}>
                <Typography variant="h6">Usuarios</Typography>
              </Box>
            </ListItem>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <BlackLink
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    ml: 2,
                  }}
                  to="/admin/user/clients"
                >
                  <Typography>
                    <Capitalize>clientes</Capitalize>
                  </Typography>
                </BlackLink>
              </ListItem>
              <Securized>
                <ListItem>
                  <BlackLink
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      ml: 2,
                    }}
                    to="/admin/user/editors"
                  >
                    <Typography>
                      <Capitalize>editores</Capitalize>
                    </Typography>
                  </BlackLink>
                </ListItem>
              </Securized>
              <Securized>
                <ListItem>
                  <BlackLink
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      ml: 2,
                    }}
                    to="/admin/user/admins"
                  >
                    <Typography>
                      <Capitalize>administradores</Capitalize>
                    </Typography>
                  </BlackLink>
                </ListItem>
              </Securized>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore color="primary" />}>
            <ListItem>
              <DirectionsCar />
              <Box sx={{ ml: 2 }}>
                <Typography variant="h6">Vehículos</Typography>
              </Box>
            </ListItem>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <BlackLink
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    ml: 2,
                  }}
                  to="/admin/vehicles/add"
                >
                  <Typography>
                    <Capitalize>añadir vehículo</Capitalize>
                  </Typography>
                </BlackLink>
              </ListItem>
              <ListItem>
                <BlackLink
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    ml: 2,
                  }}
                  to="/admin/vehicles"
                >
                  <Typography>
                    <Capitalize>listar vehículos</Capitalize>
                  </Typography>
                </BlackLink>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <Securized>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore color="primary" />}>
              <ListItem>
                <Business />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h6">Oficinas</Typography>
                </Box>
              </ListItem>
            </AccordionSummary>

            <AccordionDetails>
              <List>
                <ListItem>
                  <BlackLink
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      ml: 2,
                    }}
                    to="/admin/offices/add"
                  >
                    <Typography>
                      <Capitalize>Añadir oficina</Capitalize>
                    </Typography>
                  </BlackLink>
                </ListItem>
                <ListItem>
                  <BlackLink
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      ml: 2,
                    }}
                    to="/admin/offices"
                  >
                    <Typography>
                      <Capitalize>Lista de oficinas</Capitalize>
                    </Typography>
                  </BlackLink>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Securized>
        {/* <Accordion>
          <AccordionSummary expandIcon={<ExpandMore color="primary" />}>
            <ListItem>
              <BarChart />
              <Box sx={{ ml: 2 }}>
                <Typography variant="h6">Estadísticas</Typography>
              </Box>
            </ListItem>
            </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <BlackLink
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    ml: 2,
                  }}
                  to="/admin/statistics/general"
                >
                  <Typography>
                    <Capitalize>general</Capitalize>
                  </Typography>
                </BlackLink>
              </ListItem>
              <ListItem>
                <BlackLink
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    ml: 2,
                  }}
                  to="/admin/statistics/users"
                >
                  <Typography>
                    <Capitalize>usuarios</Capitalize>
                  </Typography>
                </BlackLink>
              </ListItem>
              <ListItem>
                <BlackLink
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    ml: 2,
                  }}
                  to="/admin/statistics/vehicles"
                >
                  <Typography>
                    <Capitalize>vehículos</Capitalize>
                  </Typography>
                </BlackLink>
              </ListItem>
              <ListItem>
                <BlackLink
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    ml: 2,
                  }}
                  to="/admin/statistics/offices"
                >
                  <Typography>
                    <Capitalize>oficinas</Capitalize>
                  </Typography>
                </BlackLink>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion> */}
      </List>
    </Drawer>
  );
};
