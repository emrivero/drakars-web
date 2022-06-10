import { Add } from "@mui/icons-material";
import { Box, Button, Grid, TablePagination } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useAdminServices } from "../../../service/user/admin/application";
import { VehicleImageClient } from "../../../service/user/admin/client/vehicle-image.client";
import { VehicleImageVm } from "../../../service/user/admin/client/view/VehicleImageVm";
import { useStore } from "../../../store";
import { ImageCard } from "./image-card";
import { NewImage } from "./new-image";

export interface ImageGalleryProps {
  handleCancel: () => void;
  onConfirm: (image: VehicleImageVm) => void;
}

export const ImageGallery: FC<ImageGalleryProps> = ({
  handleCancel,
  onConfirm,
}) => {
  const adminClient = new VehicleImageClient();
  const [selected, setSelected] = useState<VehicleImageVm>(null);
  const { paginatorVehicleImage } = useAdminServices();
  const { paginatedVehicleImage } = useStore();
  const [openNewImage, setOpenNewImage] = useState(false);

  const remove = async (name: string) => {
    await adminClient.delete(name);
    paginatorVehicleImage.resetPaginate();
  };

  const handleConfirm = (image: VehicleImageVm) => {
    onConfirm(image);
    handleCancel();
  };

  useEffect(() => {
    paginatorVehicleImage.paginate();
  }, [paginatedVehicleImage.page]);
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container>
        <Grid item sm={2}>
          <TablePagination
            count={paginatedVehicleImage?.data?.count}
            page={paginatedVehicleImage.page}
            rowsPerPage={paginatedVehicleImage.size}
            rowsPerPageOptions={[12]}
            onPageChange={(_, page) => paginatorVehicleImage.changePage(page)}
          />
        </Grid>
        <Grid item sm={5}>
          <Box display={"flex"} justifyContent={"end"}>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => setOpenNewImage(true)}
            >
              Añadir nuevo
            </Button>
          </Box>
        </Grid>

        <Grid item sm={5}>
          <Box display={"flex"} justifyContent={"end"}>
            <Button onClick={handleCancel}>Cancelar</Button>
            <Button
              onClick={() => handleConfirm(selected)}
              color="success"
              variant="contained"
            >
              Confirmar
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        {paginatedVehicleImage?.data?.results?.map((image) => {
          return (
            <Grid
              key={image.name}
              item
              sx={{ py: { sm: 4, md: 8 }, px: 2 }}
              sm={6}
              md={3}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <ImageCard
                onClick={() => setSelected(image)}
                selected={image.name === selected?.name}
                height="65px"
                width="250px"
                imageSrc={image.url}
                title={image.name}
              />
              <Button
                fullWidth
                color="error"
                onClick={() => remove(image.name)}
              >
                Eliminar
              </Button>
            </Grid>
          );
        })}
      </Grid>
      <NewImage
        open={openNewImage}
        onClose={() => {
          setOpenNewImage(false);
          paginatorVehicleImage.resetPaginate();
        }}
      />
    </Box>
  );
};
