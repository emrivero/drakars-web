import { useTheme } from "@emotion/react";
import {
  Business,
  DirectionsCar,
  ExpandMore,
  LocationCity,
  Person,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { Theme } from "@mui/system";
import { FC } from "react";
import { Capitalize } from "../../../atoms/transforms/capitalize";
import { Upper } from "../../../atoms/transforms/upper";
import { WhiteLink } from "../../../molecules/white-link";

export const AdminSidebar: FC<{}> = () => {
  const theme: Partial<Theme> = useTheme();
  return (
    <Drawer
      anchor="left"
      open={true}
      onClose={() => null}
      variant="persistent"
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.secondary.dark,
        },
      }}
    >
      <Box
        sx={{
          width: 280,
          mt: 2,
        }}
        role="presentation"
      >
        <Toolbar>
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
        </Toolbar>
        <List>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore color={theme.palette.common.white} />}
            >
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
                  <WhiteLink
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      ml: 2,
                    }}
                    href="/admin/users"
                  >
                    <Typography>
                      <Capitalize>clientes</Capitalize>
                    </Typography>
                  </WhiteLink>
                </ListItem>
                <ListItem>
                  <WhiteLink
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      ml: 2,
                    }}
                    href="/admin/editors"
                  >
                    <Typography>
                      <Capitalize>editores</Capitalize>
                    </Typography>
                  </WhiteLink>
                </ListItem>
                <ListItem>
                  <WhiteLink
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      ml: 2,
                    }}
                    href="/admin/admins"
                  >
                    <Typography>
                      <Capitalize>administradores</Capitalize>
                    </Typography>
                  </WhiteLink>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore color={theme.palette.common.white} />}
            >
              <ListItem>
                <DirectionsCar />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h6">Vehículos</Typography>
                </Box>
              </ListItem>
            </AccordionSummary>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore color={theme.palette.common.white} />}
            >
              <ListItem>
                <Business />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h6">Oficinas</Typography>
                </Box>
              </ListItem>
            </AccordionSummary>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore color={theme.palette.common.white} />}
            >
              <ListItem>
                <LocationCity />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h6">Ciudades</Typography>
                </Box>
              </ListItem>
            </AccordionSummary>
          </Accordion>
        </List>
      </Box>
    </Drawer>
  );
};
