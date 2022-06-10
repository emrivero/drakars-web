import { Box, Grid, Typography, useTheme } from "@mui/material";
import { Upper } from "../../../components/atoms/transforms/upper";
import { CustomTypography } from "../../../components/molecules/custom-typography";
import { PrimarySpan } from "../../../components/molecules/primary-span";
import { PrimaryTypography } from "../../../components/molecules/primary-typography";
import { Layout } from "../../../components/templates/client/layout";
import { CommonSection } from "../../../components/templates/client/layout/common-section";

const AboutUs = () => {
  const theme = useTheme();
  return (
    <Layout>
      <CommonSection>
        <Grid
          container
          gap={[0, 4]}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.02)",
            padding: 2,
            borderRadius: "5%",
          }}
        >
          <Grid item xs={12}>
            <CustomTypography
              type="open"
              align="center"
              color={theme.palette.primary.dark}
              variant="h3"
            >
              <Upper>¿Quiénes somos?</Upper>
            </CustomTypography>
            <Typography variant="h4" align="center">
              Un pequeño resumen de la historia de nuestra empresa
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <img
              src="/img/about.jpg"
              width="100%"
              style={{ borderRadius: "5%" }}
            />
          </Grid>
          <Grid item xs={12} md={8} display="flex" alignItems={"center"}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h6" fontWeight={400} paragraph={true}>
                <PrimarySpan fontWeight={"bolder"}>Drakars</PrimarySpan> tiene
                su origen a principios de los 90, cuando un joven sueco llamado
                Liam Skarsgård viaja en su año sabático a la provincia de Málaga
                y allí se enamora de la costa andaluza.
              </Typography>
              <Typography variant="h6" fontWeight={400} paragraph={true}>
                Decidido a permanecer en el país consigue con esfuerzo emprender
                una idea relacionada con sus dos mayores pasiones: España y
                viajar. Así que pone en marcha con una inversión inicial muy
                modesta tres oficinas de alquiler de coches de su incipiente
                nueva empresa a la que llamó{" "}
                <PrimarySpan fontWeight={"bolder"}>Drakars</PrimarySpan>.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8} display="flex" alignItems={"center"}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h6" fontWeight={400} paragraph={true}>
                El nombre alude por un lado a las embarcaciones vikingas rápidas
                y ligeras que usaban los piratas escandinavos en sus aventuras,
                los «drakkars», añadiendo esa connotación de aventura y viaje
                que tanto le gusta a nuestro fundador, y por otro lado la
                palabra «car» (coche en inglés) terminando así en un juego de
                palabras redondo.
              </Typography>
              <Typography variant="h6" fontWeight={400} paragraph={true}>
                Treinta años después en{" "}
                <PrimarySpan fontWeight={"bolder"}>Drakars</PrimarySpan>{" "}
                contamos con más de 200 oficinas repartidas por todo el
                territorio español y una flota de más de 20.000 vehículos.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <img
              src="/img/drakkar.jpg"
              width="100%"
              style={{ borderRadius: "5%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight={400} paragraph={true}>
              En <PrimarySpan fontWeight={"bolder"}>Drakars</PrimarySpan>{" "}
              queremos ser un valor seguro para tí, permitiendo que viajes lo
              más cómodo y seguro posible por toda España y haciendo honor a
              nuestros valores de{" "}
              <PrimarySpan fontWeight={"bolder"}>
                experiencia y aventura
              </PrimarySpan>{" "}
              que queremos transmitir a nuestros clientes.{" "}
              <b>Elígenos y no te arrepentirás.</b>
            </Typography>
            <PrimaryTypography
              textAlign="center"
              letterSpacing={6}
              variant={"h4"}
              paragraph
            >
              <Upper>aquí comienza tu viaje</Upper>
            </PrimaryTypography>
            <PrimaryTypography
              textAlign="center"
              letterSpacing={3}
              variant={"h4"}
            >
              <Upper>bienvenido a Drakars</Upper>
            </PrimaryTypography>
          </Grid>
        </Grid>
      </CommonSection>
    </Layout>
  );
};

export default AboutUs;
