import { Grid, Typography, useTheme } from "@mui/material";
import { Upper } from "../../../components/atoms/transforms/upper";
import { CustomTypography } from "../../../components/molecules/custom-typography";
import { FaqItem } from "../../../components/molecules/faq-item";
import { Layout } from "../../../components/templates/client/layout";
import { CommonSection } from "../../../components/templates/client/layout/common-section";

const Faq = () => {
  const theme = useTheme();

  return (
    <Layout>
      <CommonSection>
        <Grid container gap={[0, 8]}>
          <Grid item xs={12}>
            <CustomTypography
              type="open"
              align="center"
              color={theme.palette.primary.dark}
              variant="h3"
            >
              <Upper>preguntas frecuentes</Upper>
            </CustomTypography>
            <Typography align="center">
              Para ayudar a contestar con rapidez cualquier duda que te surja,
              hemos incluido a continuación una sección con las preguntas más
              frecuentes.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FaqItem title="¿Quién puede conducir el coche?">
              El conductor será la persona que presente la documentación
              obligatoria: permiso de conducir original vigente al retirar el
              vehículo, junto con el Documento de Identidad y una tarjeta de
              crédito (visa o mastercard) válidos y a nombre del conductor.
            </FaqItem>
            <FaqItem title="Política de privacidad">
              Cualquier dato de carácter personal que el usuario nos facilite
              será tratado conforme a nuestra Política de Privacidad, disponible
              en los Términos y Condiciones ubicados al final de la web
            </FaqItem>
            <FaqItem title="¿Puedo hacer una reserva sin estar registrado?">
              Sí. Para realizar una reserva a través de la web no es necesario
              registrarse.
            </FaqItem>
            <FaqItem title="¿Puedo reservar un vehículo para hoy?">
              En Drakars puedes realizar la reserva en muchos destinos hasta 1
              hora antes de la recogida.
            </FaqItem>
            <FaqItem title="¿Por qué debo llevar una tarjeta de crédito?">
              La tarjeta de crédito sirve como garantía. Es obligatorio
              presentarla para poder recoger el vehículo, debe estar a nombre
              del conductor principal y ser válida.
            </FaqItem>
            <FaqItem title="Si reservo un coche a través de la web, ¿cuándo realizo el pago?">
              Antes de finalizar el proceso de reserva de tu vehículo, te
              indicamos alguna de estas opciones de pago: Pago en persona: se
              realiza el pago con tarjeta de crédito válidad a nombre del
              conductor principal. Pago Online: se realiza el pago online del
              importe total del alquiler mediante tarjeta de crédito, y después
              en destino únicamente deberás pagar gastos de combustible y
              extras.
            </FaqItem>
          </Grid>
        </Grid>
      </CommonSection>
    </Layout>
  );
};

export default Faq;
