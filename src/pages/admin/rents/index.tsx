import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import { FC, useEffect, useState } from "react";
import { Capitalize } from "../../../components/atoms/transforms/capitalize";
import { PrimaryTypography } from "../../../components/molecules/primary-typography";
import { SelectInput } from "../../../components/molecules/select-input";
import { TableGridRow } from "../../../components/organism/table-grid";
import { AdminLayout } from "../../../components/templates/admin/layout";
import { AdminPagination } from "../../../components/templates/admin/pagination";
import { RentStatusMapper } from "../../../service/rent-car/application/mappers/RentStatusMapper";
import { rentColumns } from "../../../service/rent-car/application/model/rent-grid-column";
import { RentDataConfirmVm } from "../../../service/rent-car/client/vm/RentDataConfirmVm";
import { useAdminServices } from "../../../service/user/admin/application";
import { AdminClient } from "../../../service/user/admin/client";
import { VehicleClient } from "../../../service/vehicle/client";
import { useStore } from "../../../store";

interface ChangeCarProps {
  rentInfo: RentDataConfirmVm;
  open: boolean;
  cancel: () => void;
}

const ChangeCar: FC<ChangeCarProps> = ({ rentInfo, cancel, open }) => {
  const { paginatorRents } = useAdminServices();
  const vehicleClient = new VehicleClient();
  const adminClient = new AdminClient();
  const [error, setError] = useState(false);
  const [selectedVehicle, setSelected] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [availableVehicles, setAvailableVehicles] = useState<
    { value: any; label: string }[]
  >([]);

  const onChangeVehicle = async () => {
    if (!selectedVehicle) {
      setError(true);
    } else {
      const response = await adminClient.changeVehicle(
        rentInfo.reference,
        selectedVehicle
      );
      if (response.status < 300) {
        enqueueSnackbar("Cambio de vehículo exitoso", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: { horizontal: "center", vertical: "top" },
        });
        cancel();
        paginatorRents.paginate();
      } else {
        enqueueSnackbar("Error de servidor", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: { horizontal: "center", vertical: "top" },
        });
      }
    }
  };

  const onClose = () => {
    setError(false);
    setSelected(null);
    setAvailableVehicles([]);
    cancel();
  };

  useEffect(() => {
    if (open) {
      vehicleClient
        .list({
          office: rentInfo?.originOffice?.id,
          startDate: rentInfo?.startDate,
          endDate: rentInfo?.endDate,
        })
        .then((response) => {
          const { data } = response;
          const available = data.data.map((value) => {
            return {
              value: value.id,
              label: `${value.id} - ${value.fullName}`,
            };
          });
          setAvailableVehicles(available);
        });
    }
  }, [open]);

  return (
    <Dialog open={open} sx={{ p: 4 }} onClose={onClose}>
      <DialogTitle>Cambio de vehículo</DialogTitle>
      <DialogContent sx={{ minWidth: 560 }}>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Vehículo actual:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            {rentInfo?.rentedVehicle?.mark} {rentInfo?.rentedVehicle?.model},
            Llave nº {rentInfo?.rentedVehicle?.id}
          </Typography>
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Elegir otro vehículo
          </PrimaryTypography>
          <SelectInput
            error={error}
            fullWidth
            items={availableVehicles}
            onChange={(e) => setSelected(e.target.value)}
            placeholder="Selecciona otro vehículo"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={onChangeVehicle}>
          Cambiar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export interface ViewInfoProps {
  open: boolean;
  cancel: () => void;
  rentInfo: RentDataConfirmVm;
}

const ViewInfo: FC<ViewInfoProps> = ({ open, cancel, rentInfo }) => {
  const theme = useTheme();
  return (
    <Dialog open={open} sx={{ p: 4 }} onClose={cancel}>
      <DialogTitle>
        <Typography
          component="p"
          variant="h5"
          color={theme.palette.primary.dark}
        >
          Gestión de reserva
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ minWidth: 560 }}>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Reserva:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            {rentInfo?.reference}
          </Typography>
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Cliente:{" "}
          </PrimaryTypography>
          {rentInfo?.renterUser ? (
            <Typography fontWeight={500} display="inline">
              {rentInfo?.renterUser.name} {rentInfo?.renterUser.family_name}
            </Typography>
          ) : (
            <Typography fontWeight={500} display="inline">
              Usuario eliminado
            </Typography>
          )}
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            DNI:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            {rentInfo?.renterUser?.dni || ""}
          </Typography>
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Origen:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            {rentInfo?.originOffice.address},{" "}
            {rentInfo?.originOffice.municipality.name},{" "}
            {rentInfo?.originOffice.municipality.city.name}
          </Typography>
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Fecha y hora:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            {moment(rentInfo?.startDate).format("DD-MM-YYYY")}{" "}
            {rentInfo?.startHour}
          </Typography>
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Destino:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            {rentInfo?.destinyOffice.address},{" "}
            {rentInfo?.destinyOffice.municipality.name},{" "}
            {rentInfo?.destinyOffice.municipality.city.name}
          </Typography>
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Fecha y hora:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            {moment(rentInfo?.endDate).format("DD-MM-YYYY")} {rentInfo?.endHour}
          </Typography>
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Vehículo:{" "}
          </PrimaryTypography>
          {rentInfo?.rentedVehicle ? (
            <Typography fontWeight={500} display="inline">
              {rentInfo?.rentedVehicle?.mark} {rentInfo?.rentedVehicle?.model},
              Llave nº {rentInfo?.rentedVehicle?.id}
            </Typography>
          ) : (
            <Typography fontWeight={500} display="inline">
              Vehículo eliminado
            </Typography>
          )}
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Pago:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            Pagado
          </Typography>
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Estado:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            {RentStatusMapper(rentInfo?.status)}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const ActionsMenu: FC<{ row: TableGridRow }> = ({ row }) => {
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(profileAnchor);
  const adminClient = new AdminClient();
  const handleMenuProfile = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleCloseMenuProfile = () => {
    setProfileAnchor(null);
  };
  const [openManageRent, setOpenManageRent] = useState(false);
  const [openChangeVehicle, setOpenChangeVehicle] = useState(false);
  const { manageRent, paginatorRents } = useAdminServices();
  const { rentInfo } = useStore();
  const { enqueueSnackbar } = useSnackbar();

  const onOpen = (row) => {
    manageRent.changeRentValue(row.reference);
    manageRent.getRent();
    setOpenManageRent(true);
    handleCloseMenuProfile();
  };

  const onOpenChangeVehicle = async (row) => {
    manageRent.changeRentValue(row.reference);
    await manageRent.getRent();
    setOpenChangeVehicle(true);
    handleCloseMenuProfile();
  };

  const onCancel = () => {
    manageRent.clear();
    setOpenManageRent(false);
    handleCloseMenuProfile();
  };

  const onCancelRent = async (row) => {
    await adminClient.cancelRent(row.reference);
    handleCloseMenuProfile();
    enqueueSnackbar("Reserva cancelada", {
      variant: "success",
      autoHideDuration: 2000,
      anchorOrigin: { horizontal: "center", vertical: "top" },
    });
    paginatorRents.paginate();
  };

  return (
    <>
      <Button
        variant="outlined"
        endIcon={
          <>
            <KeyboardArrowDown />
          </>
        }
        color="primary"
        onClick={handleMenuProfile}
        size="small"
      >
        Acciones
      </Button>
      <Menu
        open={open}
        anchorEl={profileAnchor}
        onClose={handleCloseMenuProfile}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => onOpen(row)}>
          <Button>
            <Capitalize>Ver</Capitalize>
          </Button>
        </MenuItem>
        {row?.status?.props?.value === "pending" && (
          <MenuItem onClick={() => onOpenChangeVehicle(row)}>
            <Button color="warning">
              <Capitalize>Cambiar vehículo</Capitalize>
            </Button>
          </MenuItem>
        )}
        <MenuItem
          onClick={() => onCancelRent(row)}
          disabled={row?.status?.props?.value !== "pending"}
        >
          <Button color="error">
            <Capitalize>Cancelar</Capitalize>
          </Button>
        </MenuItem>
      </Menu>
      <ViewInfo open={openManageRent} cancel={onCancel} rentInfo={rentInfo} />
      <ChangeCar
        open={openChangeVehicle}
        cancel={() => setOpenChangeVehicle(false)}
        rentInfo={rentInfo}
      />
    </>
  );
};

const StatusValueColumn: FC<{ value: string }> = ({ value }) => {
  const theme = useTheme();
  const mapper = {
    pending: (
      <Typography color={theme.palette.secondary.dark}>
        {RentStatusMapper(value)}
      </Typography>
    ),
    checkedin: (
      <Typography color={theme.palette.primary.main}>
        {RentStatusMapper(value)}
      </Typography>
    ),
    checkedout: (
      <Typography color={theme.palette.success.main}>
        {RentStatusMapper(value)}
      </Typography>
    ),
    delayed: (
      <Typography color={theme.palette.error.main}>
        {RentStatusMapper(value)}
      </Typography>
    ),
    canceled: (
      <Typography sx={{ color: "#888" }} fontStyle="italic">
        {RentStatusMapper(value)}
      </Typography>
    ),
  };

  return <>{mapper[value]}</>;
};

export const Rents: FC = () => {
  const { paginatorRents } = useAdminServices();
  const adminClient = new AdminClient();

  const {
    paginatedRents: {
      paginationOptions: { currentPage, itemsPerPage, totalItems, search },
      data,
    },
  } = useStore();

  useEffect(() => {
    adminClient.refreshRents().then(() => {
      paginatorRents.paginate();
    });
  }, [currentPage, itemsPerPage, search]);

  return (
    <AdminLayout title="Reservas">
      <AdminPagination
        onRefresh={() => paginatorRents.paginate()}
        textFieldSearch={{
          onChange: (e) =>
            paginatorRents.onFilter({ search: e.target.value, currentPage: 0 }),
          value: search,
          placeholder: "Introduce nombre, correo o dni del cliente",
        }}
        tableProps={{
          onSelect: (rows) => rows,
          columns: rentColumns,
          paginationProps: {
            count: totalItems,
            page: currentPage,
            onPageChange: (e, page) => paginatorRents.changePage(page),
            onRowsPerPageChange: (e) =>
              paginatorRents.changeRows(parseInt(e.target.value)),
            rowsPerPage: itemsPerPage,
            rowsPerPageOptions: [10, 25],
          },
          ActionsComponent: ActionsMenu,
          rows: data.data.map((value) => {
            return {
              index: `${value.id}`,
              reference: value.reference,
              fullNameUser: value.renterUser
                ? `${value.renterUser?.name} ${value.renterUser?.family_name}`
                : "Usuario eliminado",
              email: `${value?.renterUser?.email || ""}`,
              originAddress: `${value.originOffice.address}`,
              destinyAddress: `${value.destinyOffice.address}`,
              fullNameVehicle: value.rentedVehicle
                ? `${value.rentedVehicle?.mark || ""} ${
                    value.rentedVehicle?.model || ""
                  }`
                : "Vehículo eliminado",
              startDate: moment(value.startDate).format("DD-MM-YYYY"),
              endDate: moment(value.endDate).format("DD-MM-YYYY"),
              status: <StatusValueColumn value={value.status} />,
            };
          }),
        }}
      >
        {/* <Grid container>
          <Grid
            item
            xs={12}
            md={2}
            sx={{
              mt: 4,
            }}
          >
            <FormControl sx={{ px: 0.5, width: "100%" }} variant="filled">
              <InputLabel id="type-filter">
                <CustomTypography color={theme.themeAdmin.palette.primary.dark}>
                  Estado
                </CustomTypography>
              </InputLabel>
              <Select
                fullWidth
                onChange={(e: SelectChangeEvent) => {
                  // const value = e.target.value as
                  //   | ""
                  //   | "small"
                  //   | "medium"
                  //   | "large"
                  //   | "premium";
                  // paginator.onFilter({ type: value });
                }}
                labelId="type-filter"
                value={""}
                label="Type"
              >
                <MenuItem value={""}>Cualquiera</MenuItem>
                <MenuItem value={"small"}>Pequeño</MenuItem>
                <MenuItem value={"medium"}>Mediano</MenuItem>
                <MenuItem value={"large"}>Familiar</MenuItem>
                <MenuItem value={"premium"}>Premium</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid> */}
      </AdminPagination>
    </AdminLayout>
  );
};
