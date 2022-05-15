import { ArrowBackIos, CarRental, History } from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { UserIcon } from "../../../atoms/car-info-icons/user";
import { BlackLink } from "../../../molecules/black-link";
import { PrimaryTypography } from "../../../molecules/primary-typography";

type ProfileLayoutProps = {
  title?: string;
};

export const ProfileLayout: FC<ProfileLayoutProps> = ({
  children,
  title = "",
}) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        width: { xs: "100%", md: "90%" },
      }}
    >
      <Grid container mt={6}>
        <Grid item sm={1} mb={6} alignItems="center" display="flex">
          <BlackLink to="/home">
            <ArrowBackIos fontSize="large" />{" "}
          </BlackLink>
          <BlackLink to="/home">
            <PrimaryTypography variant="h5">Atrás</PrimaryTypography>
          </BlackLink>
        </Grid>
        <Grid item sm={11} mb={6}>
          <PrimaryTypography variant="h4" align="center">
            {title}
          </PrimaryTypography>
        </Grid>
        <Grid item sm={2}>
          <List sx={{}}>
            <ListItem>
              <BlackLink
                to="/home/profile"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <UserIcon />
                <Box sx={{ ml: 1 }}>
                  <Typography variant="h6">Información personal</Typography>
                </Box>
              </BlackLink>
            </ListItem>
            <ListItem>
              <BlackLink
                to="/home/profile/booking"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <CarRental />
                <Box sx={{ ml: 1 }}>
                  <Typography variant="h6">Reserva</Typography>
                </Box>
              </BlackLink>
            </ListItem>
            <ListItem>
              <BlackLink
                to="/home/profile/history"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <History />
                <Box sx={{ ml: 1 }}>
                  <Typography variant="h6">Historial</Typography>
                </Box>
              </BlackLink>
            </ListItem>
          </List>
        </Grid>
        <Grid
          item
          sm={10}
          p={6}
          sx={{ borderTop: "2px solid #eee", borderLeft: "2px solid #eee" }}
        >
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};
