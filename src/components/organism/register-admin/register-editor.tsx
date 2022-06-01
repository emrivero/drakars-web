import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, MouseEventHandler } from "react";
import { useRentCarService } from "../../../service/rent-car/application";
import { useAdminServices } from "../../../service/user/admin/application";
import { useStore } from "../../../store";
import { PrimaryTypography } from "../../molecules/primary-typography";
import { SearchInput } from "../../molecules/search";

interface RegisterEditorProps {
  open: boolean;
  handleSave: MouseEventHandler;
  handleCancel: () => void;
}

export const RegisterEditor: FC<RegisterEditorProps> = ({
  open,
  handleSave,
  handleCancel,
}) => {
  const { creator } = useAdminServices();
  const {
    mappers: { SelectedOfficeOption },
  } = useRentCarService();
  const { newEditor } = useStore();
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      sx={{ p: 4 }}
      onClose={() => {
        creator.clear();
        handleCancel();
      }}
    >
      <DialogTitle>
        <Typography
          component="p"
          variant="h5"
          color={theme.palette.primary.dark}
        >
          Añadir editor
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ minWidth: 500 }}>
        <Grid container>
          <Grid item sm={12}>
            <Box sx={{ p: 1 }}>
              <FormLabel>
                <PrimaryTypography fontWeight={500}>
                  Nombre del editor
                </PrimaryTypography>
              </FormLabel>
            </Box>
            <Box sx={{ display: "flex" }}>
              <TextField
                onChange={(e) =>
                  creator.setEditorState({ name: e.target.value })
                }
                fullWidth
                placeholder="Escriba el nombre de la oficina"
                label="Nombre"
                value={newEditor.name}
              />
            </Box>
          </Grid>
          <Grid item sm={12}>
            <Box sx={{ p: 1 }}>
              <FormLabel>
                <PrimaryTypography fontWeight={500}>
                  Apellidos del editor
                </PrimaryTypography>
              </FormLabel>
            </Box>
            <Box sx={{ display: "flex" }}>
              <TextField
                fullWidth
                onChange={(e) =>
                  creator.setEditorState({ family_name: e.target.value })
                }
                placeholder="Escriba los apellidos del editor"
                label="Apellidos"
                value={newEditor.family_name}
              />
            </Box>
          </Grid>
          <Grid item sm={12}>
            <Box sx={{ p: 1 }}>
              <FormLabel>
                <PrimaryTypography fontWeight={500}>
                  Correo del editor
                </PrimaryTypography>
              </FormLabel>
            </Box>
            <Box sx={{ display: "flex" }}>
              <TextField
                fullWidth
                onChange={(e) =>
                  creator.setEditorState({ email: e.target.value })
                }
                placeholder="Escriba el correo del editor"
                label="Correo eléctronico"
                value={newEditor.email}
              />
            </Box>
          </Grid>
          <Grid item sm={12}>
            <Box sx={{ p: 1 }}>
              <FormLabel>
                <PrimaryTypography fontWeight={500}>
                  Asigne una oficina
                </PrimaryTypography>
              </FormLabel>
            </Box>
            <SearchInput
              AutocompleteProps={{
                noOptionsText: "Sin coincidencias",
                sx: { p: 1 },
                options: newEditor.offices.map(SelectedOfficeOption),
                onInputChange: (_, value, reason) => {
                  reason === "input"
                    ? creator.searchOffice(value)
                    : creator.clearSearch();
                },

                onChange: (e, opt) =>
                  opt &&
                  creator.setEditorState({
                    officeId: opt?.value,
                    searchOffice: opt?.label,
                  }),
                value: {
                  value: newEditor?.officeId,
                  label: newEditor?.searchOffice,
                },
              }}
              TextFieldProps={{ label: "Oficina" }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
