import {
  ArrowBackIos,
  CarRental,
  DeleteForever,
  History,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../auth/use-auth";
import { useClientService } from "../../../../service/user/client/application";
import { UserIcon } from "../../../atoms/car-info-icons/user";
import { BlackLink } from "../../../molecules/black-link";
import { ErrorTypography } from "../../../molecules/error-typography";
import { PrimaryTypography } from "../../../molecules/primary-typography";

type ProfileLayoutProps = {
  title?: string;
};

export const ProfileLayout: FC<ProfileLayoutProps> = ({
  children,
  title = "",
}) => {
  const confirm = useConfirm();
  const { deleter } = useClientService();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const onDelete = () => {
    confirm({
      title: (
        <ErrorTypography variant="h5" align="center">
          ¡Atención!
        </ErrorTypography>
      ),
      confirmationButtonProps: {
        color: "error",
        variant: "contained",
      },
      confirmationText: "Confirmar bajar",
      cancellationText: "Cancelar",
      description: (
        <>
          <ErrorTypography variant="h6" align="center">
            Va a borrar todo sus datos permanentemente. ¿Está seguro?
          </ErrorTypography>
        </>
      ),
    }).then(async () => {
      const response = await deleter.deleteMe();
      if (response.status < 300) {
        logout();
        navigate("/home");
      } else {
        enqueueSnackbar(
          "No puede darse de baja porque tiene reservas pendientes",
          {
            variant: "error",
            autoHideDuration: 3000,
            anchorOrigin: { horizontal: "center", vertical: "top" },
          }
        );
      }
    });
  };

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
            <ListItem>
              <Button
                onClick={onDelete}
                size="small"
                variant="contained"
                color="error"
                startIcon={<DeleteForever />}
              >
                <Typography>Darse de baja</Typography>
              </Button>
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
