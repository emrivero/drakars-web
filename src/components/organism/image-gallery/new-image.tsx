import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { VehicleImageClient } from "../../../service/user/admin/client/vehicle-image.client";
import { PrimaryTypography } from "../../molecules/primary-typography";

export interface NewImageProps {
  open: boolean;
  onClose: () => void;
}

export const NewImage: FC<NewImageProps> = ({ open, onClose }) => {
  const adminClient = new VehicleImageClient();
  const [tempImage, setTempImage] = useState<File>(null);
  const [markAndModel, setMarkAndModel] = useState("");
  const [base64, setBase64Image] = useState("");
  const [error, setError] = useState({ markAndModel: false, image: false });
  const { enqueueSnackbar } = useSnackbar();

  const reset = () => {
    setTempImage(null);
    setBase64Image("");
    setMarkAndModel("");
    setError({ markAndModel: false, image: false });
  };
  const upload = async () => {
    const formData = new FormData();
    setError({ markAndModel: false, image: false });
    if (!markAndModel) {
      setError({ ...error, markAndModel: true });
      return;
    }

    if (!tempImage) {
      setError({ ...error, image: true });
      return;
    }
    formData.append("image", tempImage);
    formData.append("name", markAndModel.replace(/\s+/, "_"));
    const response = await adminClient.create(formData);
    if (response.status < 300) {
      reset();
      onClose();
    } else {
      enqueueSnackbar("Ya existe una imagen con ese nombre", {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: { horizontal: "center", vertical: "bottom" },
      });
    }
  };

  useEffect(() => {
    const setBase64 = async () => {
      if (tempImage) {
        const buffer = await tempImage.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        let binary = "";
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const image = window.btoa(`${binary}`);
        setBase64Image(`data:image/png;base64,${image}`);
      }
    };
    setBase64();
  }, [tempImage]);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Nueva imagen</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <Box sx={{ p: 1 }}>
              <FormLabel>
                <PrimaryTypography fontWeight={500}>
                  Marca y modelo
                </PrimaryTypography>
              </FormLabel>
            </Box>
            <Box sx={{ p: 1, flexGrow: 1 / 3 }}>
              <TextField
                error={error.markAndModel}
                fullWidth
                placeholder="Escriba marca y modelo, por ejemplo: Nissan Micra"
                label="Modelo"
                value={markAndModel}
                onChange={(e) => setMarkAndModel(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ p: 1 }}>
              <FormLabel>
                <PrimaryTypography fontWeight={500}>
                  Adjuntar imagen
                </PrimaryTypography>
              </FormLabel>
            </Box>
            <Box sx={{ p: 1, flexGrow: 1 / 3 }}>
              <TextField
                error={error.image}
                fullWidth
                type={"file"}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files[0];
                  setTempImage(file);
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ p: 1 }}>
              <FormLabel>
                <PrimaryTypography fontWeight={500}>
                  Previsualización
                </PrimaryTypography>
              </FormLabel>
            </Box>
            <Box
              sx={{
                p: 1,
                flexGrow: 1 / 3,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {base64 && <img src={base64} width={300} />}
            </Box>
          </Grid>
          <Grid item sm={12}>
            <Box display={"flex"} justifyContent={"end"}>
              <Button onClick={onClose}>Cancelar</Button>
              <Button onClick={upload} color="success" variant="contained">
                Subir imagen
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
