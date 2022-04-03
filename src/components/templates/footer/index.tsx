import { useTheme } from "@emotion/react";
import { FacebookRounded, Twitter, YouTube } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { Theme } from "@mui/system";
import { FC } from "react";
import { GreyBox } from "../../molecules/grey-box";
import { FooterProps } from "./types";

export const Footer: FC<FooterProps> = () => {
  const theme: Partial<Theme> = useTheme();
  return (
    <GreyBox sx={{ flexGrow: 1, p: 4 }}>
      <Grid container spacing={3} sx={{ mb: 4, justifyContent: "center" }}>
        <Grid item sm={3}>
          <Typography align="center">LOGO</Typography>
        </Grid>
        <Grid item sm={6}>
          <Grid container sx={{ justifyContent: "center" }} spacing={2}>
            <Grid item sm={3}>
              <Typography variant="caption" align="center">
                Aviso legal
              </Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography variant="caption" align="center">
                Cookies
              </Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography variant="caption" align="center">
                Política de privacidad
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ justifyContent: "center" }} spacing={2}>
            <Grid item sm={3}>
              <Typography variant="caption" align="center">
                Condiciones generales
              </Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography variant="caption" align="center">
                Preguntas frecuentes
              </Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography variant="caption" align="center">
                Acerca de Caronte Cars
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={3}>
          <Typography align="center">MAS</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        <Grid item sm={1} textAlign="center">
          <FacebookRounded />
        </Grid>
        <Grid item sm={1} textAlign="center">
          <Twitter />
        </Grid>
        <Grid item sm={1} textAlign="center">
          <YouTube />
        </Grid>
        <Grid item sm={12} textAlign="center">
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.grey[400],
            }}
          >
            © 2022 Drakcars - Todos los derechos reservados
          </Typography>
        </Grid>
      </Grid>
    </GreyBox>
  );
};
