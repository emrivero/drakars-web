import { useTheme } from "@emotion/react";
import { FacebookRounded, Twitter, YouTube } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { Theme } from "@mui/system";
import { FC } from "react";
import { useTranslate } from "../../../../i18n/useTranslate";
import { GreyBox } from "../../../molecules/grey-box";

export const Footer: FC = () => {
  const theme: Partial<Theme> = useTheme();
  const { t } = useTranslate();
  return (
    <GreyBox sx={{ flexGrow: 1, p: 4 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: "center", mb: { sm: 0, xs: 4 } }}
      >
        <Grid item xs={2} sm={1} textAlign="center">
          <FacebookRounded />
        </Grid>
        <Grid item xs={2} sm={1} textAlign="center">
          <Twitter />
        </Grid>
        <Grid item xs={2} sm={1} textAlign="center">
          <YouTube />
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.grey[400],
            }}
          >
            {t("rigths")}
          </Typography>
        </Grid>
      </Grid>
    </GreyBox>
  );
};
