import { Box, Button, Paper, SxProps } from "@mui/material";
import { FC, FormEventHandler, ReactNode } from "react";

export interface FormProps {
  handleSubmit: FormEventHandler<Element>;
  saveContent: ReactNode;
  sx?: SxProps;
}

export const Form: FC<FormProps> = ({
  handleSubmit,
  children,
  saveContent,
  sx = {},
}) => {
  return (
    <form>
      <Paper sx={sx}>
        {children}
        <Box
          sx={{
            pt: 1,
            pb: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {saveContent}
          </Button>
        </Box>
      </Paper>
    </form>
  );
};
