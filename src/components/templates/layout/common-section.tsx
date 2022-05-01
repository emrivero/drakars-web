import { Container } from "@mui/material";
import { FC } from "react";

export const CommonSection: FC = ({ children }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        width: "100%",
        mt: 10,
      }}
    >
      {children}
    </Container>
  );
};
