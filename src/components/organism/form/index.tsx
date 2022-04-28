import { Box, Button, Paper } from "@mui/material";
import { FC, FormEventHandler, ReactNode } from "react";

export interface FormProps {
  handleSubmit: FormEventHandler<Element>;
  saveContent: ReactNode;
}

export const Form: FC<FormProps> = ({
  handleSubmit,
  children,
  saveContent,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Paper>
        {children}
        <Box
          sx={{
            pt: 1,
            pb: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" color="primary">
            {saveContent}
          </Button>
        </Box>
      </Paper>
    </form>
  );
};
