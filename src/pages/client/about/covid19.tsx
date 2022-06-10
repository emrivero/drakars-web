import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Upper } from "../../../components/atoms/transforms/upper";
import { Banner } from "../../../components/molecules/banner";
import { CustomTypography } from "../../../components/molecules/custom-typography";
import { Layout } from "../../../components/templates/client/layout";
import { CommonSection } from "../../../components/templates/client/layout/common-section";

const Covid19 = () => {
  const theme = useTheme();
  return (
    <Layout>
      <CommonSection>
        <Grid container gap={[0, 4]}>
          <Grid item xs={12}>
            <Box>
              <CustomTypography
                type="open"
                align="center"
                color={theme.palette.primary.dark}
                variant="h3"
              >
                <Upper>nuestras medidas covid-19</Upper>
              </CustomTypography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Para nosotros, tu seguridad es lo más importante. Por ello, hemos
              tomado una serie de medidas que, además de garantizar tu seguridad
              durante el uso y disfrute del vehículo, te proporcionarán más
              flexibilidad y tranquilidad a la hora de posibles inconvenientes
              que puedan surgir derivados de la actual situación del Covid-19.
              Estas son algunas de las medidas que hemos tomado:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Banner title="Cancelación gratuita" />
          </Grid>
          <Grid item xs={12}>
            <CustomTypography>
              Si realizas una reserva con nosotros, no te preocupes por nada ya
              que puedes cancelar tu reserva con 48 hora de antelación y todo tu
              dinero te será reembolsado. Sí, ¡todo! Incluso, si contratas
              nuestro seguro, recibirás de vuelta el importe completo si
              cancelas con una antelación mínima de 48 horas. Este seguro,
              aunque no es obligatorio, es altamente recomendable contratarlo.
              ¿Por qué? Muy sencillo: todos queremos irnos de viaje sin correr
              el riesgo de tener algún disgusto innecesario y que el proveedor
              se quede con tu fianza para pagar el desperfecto. Además, las
              fianzas que los proveedores de alquiler de coche bloquean en tu
              tarjeta de crédito rondan los 1.000€ para cualquier tipo de coche.
              ¿De verdad te quieres arriesgar con fianzas de tal cantidad?
            </CustomTypography>
            <br />
            <CustomTypography>
              Para cancelar o modificar tu reserva, solo tienes que dirigirte a
              tu portal “Gestionar reserva” en el menú superior de nuestra web y
              lo podrás hacer de manera muy sencilla y rápida.
            </CustomTypography>
          </Grid>
          <Grid item xs={12}>
            <Banner title="Limpieza" />
          </Grid>
          <Grid item xs={12}>
            <CustomTypography>
              Nuestros proveedores han centrado gran parte de sus esfuerzos en
              exhaustivos procesos de limpieza para evitar la propagación del
              virus:
            </CustomTypography>
            <br />
            <CustomTypography variant="h6">
              Desinfección de los vehículos
            </CustomTypography>
            <br />
            <CustomTypography>
              Se han establecido rigurosos protocolos de limpieza y desinfección
              centrándose, especialmente, en aquellos puntos que son más
              susceptibles de ser tocados por los usuarios: volante, palanca de
              cambios, manillas, asientos, compartimentos, etcétera. Incluso,
              muchos de nuestros proveedores han optado por contratar empresas
              especializadas en este tipo de protocolos para que el control y la
              eficacia de las medidas sean mayores.
            </CustomTypography>
            <br />
            <CustomTypography variant="h6">
              Limpieza especial de las oficinas
            </CustomTypography>
            <br />
            <CustomTypography>
              Asimismo, se están tomando precauciones extra en las oficinas, a
              las que el cliente irá a recoger el coche que ha reservado: los
              locales se desinfectan con regularidad, se provee a los
              trabajadores con bayetas, paños, toallitas desinfectantes, geles y
              otros productos recomendados, y se pone desinfectante para manos a
              disposición de los empleados y clientes
            </CustomTypography>
          </Grid>
          <Grid item xs={12}>
            <Banner title="Cambios en la forma de trabajar" />
          </Grid>
          <Grid item xs={12}>
            <CustomTypography>
              Las compañías de alquiler de coches están buscando nuevas maneras
              de atender a sus clientes de una forma segura, con el mínimo
              contacto posible:
            </CustomTypography>
            <br />
            <CustomTypography variant="h6">Distanciamiento</CustomTypography>
            <br />
            <CustomTypography>
              Todo aquel que puede trabajar desde casa lo está haciendo. El
              único personal que se encuentra en las oficinas de alquiler de
              coches es el indispensable - y mantienen la distancia con los
              clientes y entre compañeros. Pero no se trata solo de la
              protección individual clientes y empleados sino que también se
              trata de minimizar el riesgo de expandir el virus.
            </CustomTypography>
            <br />
            <CustomTypography variant="h6">
              Seguimiento de las recomendaciones
            </CustomTypography>
            <br />
            <CustomTypography>
              La situación sigue evolucionando gracias a la nueva información
              que nuestros expertos van obteniendo sobre el Coronavirus y sobre
              las mejores formas de luchar contra él. Es por ello que las
              empresas de alquiler de coches están en constante contacto con los
              gobiernos, la OMS (Organización Mundial de la Salud) y otras
              autoridades relevantes.
            </CustomTypography>
          </Grid>
        </Grid>
      </CommonSection>
    </Layout>
  );
};

export default Covid19;
