import { Container } from "@mui/material";
import { FC } from "react";

export const CommonSection: FC = ({ children }) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        width: { xs: "100%", md: "80%" },
        mt: 10,
      }}
    >
      {children}
    </Container>
  );
};
