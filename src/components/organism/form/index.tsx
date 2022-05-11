import { Box, Button, Paper, PaperProps, SxProps } from "@mui/material";
import { FC, FormEventHandler, ReactNode } from "react";

export interface FormProps {
  handleSubmit: FormEventHandler<Element>;
  saveContent: ReactNode;
  sx?: SxProps;
  paperProps?: PaperProps;
  buttomComponent?: JSX.Element;
  disabledSubmit?: boolean;
}

export const Form: FC<FormProps> = ({
  disabledSubmit = false,
  handleSubmit,
  children,
  saveContent,
  paperProps = {},
  sx = {},
  buttomComponent = null,
}) => {
  const defaultButton = (
    <Button
      variant="contained"
      disabled={disabledSubmit}
      color="primary"
      onClick={handleSubmit}
    >
      {saveContent}
    </Button>
  );
  return (
    <form>
      <Paper sx={sx} {...paperProps}>
        {children}
        <Box
          sx={{
            pt: 1,
            pb: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {buttomComponent || defaultButton}
        </Box>
      </Paper>
    </form>
  );
};
