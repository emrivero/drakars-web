import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { DragonIcon } from "../../atoms/dragon-icon";
import { MuiLink } from "../../molecules/link";
import { PrimaryBox } from "../../molecules/primary-box";
import { PrimaryTypography } from "../../molecules/primary-typography";
import { SecondaryBox } from "../../molecules/secondary-box";

export interface FavDestination {
  location: string;
  price: number;
}

export const FavDestination: FC<FavDestination> = ({ price, location }) => {
  const mdSize = "170px";
  return (
    <MuiLink to={""}>
      <Box
        sx={{
          position: "relative",
          height: { xs: mdSize },
          width: { xs: mdSize },
        }}
      >
        <DragonIcon
          color="primary"
          sx={{
            fontSize: { xs: mdSize },
            borderRadius: "80%",
            backgroundColor: "#eee",
            p: 1,
          }}
        />
        <Box sx={{ position: "absolute", bottom: "-25px", right: "-15px" }}>
          <Box justifyContent="end" display="flex">
            <PrimaryTypography fontWeight={900}>Desde</PrimaryTypography>
          </Box>
          <SecondaryBox>
            <PrimaryTypography
              variant="h5"
              fontWeight={600}
              fontStyle="italic"
              fontFamily="'Acme', sans-serif"
              sx={{
                mt: 0,
                px: 1,
                letterSpacing: 2,
                textAlign: "center",
              }}
            >
              {price} €
            </PrimaryTypography>
          </SecondaryBox>
          <Box>
            <PrimaryTypography variant="caption">
              Impuestos incluidos
            </PrimaryTypography>
          </Box>
        </Box>
        <Box sx={{ position: "absolute", top: "-25px", right: "-15px" }}>
          <PrimaryBox>
            <Typography
              variant="h6"
              fontWeight={600}
              fontStyle="italic"
              fontFamily="'Acme', sans-serif"
              sx={{
                color: "#fff",
                mt: 0,
                px: 1,
                letterSpacing: 2,
              }}
            >
              {location}
            </Typography>
          </PrimaryBox>
        </Box>
      </Box>
    </MuiLink>
  );
};
