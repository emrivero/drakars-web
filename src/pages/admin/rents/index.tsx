import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Capitalize } from "../../../components/atoms/transforms/capitalize";
import { PrimaryTypography } from "../../../components/molecules/primary-typography";
import { TableGridRow } from "../../../components/organism/table-grid";
import { AdminLayout } from "../../../components/templates/admin/layout";
import { AdminPagination } from "../../../components/templates/admin/pagination";
import { RentStatusMapper } from "../../../service/rent-car/application/mappers/RentStatusMapper";
import { rentColumns } from "../../../service/rent-car/application/model/rent-grid-column";
import { RentDataConfirmVm } from "../../../service/rent-car/client/vm/RentDataConfirmVm";
import { useAdminServices } from "../../../service/user/admin/application";
import { useStore } from "../../../store";

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
            {rentInfo?.renterUser.dni}
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

  const handleMenuProfile = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleCloseMenuProfile = () => {
    setProfileAnchor(null);
  };
  const [openManageRent, setOpenManageRent] = useState(false);
  const { manageRent } = useAdminServices();
  const { rentInfo } = useStore();
  const onOpen = (row) => {
    manageRent.changeRentValue(row.reference);
    manageRent.getRent();
    setOpenManageRent(true);
  };

  const onCancel = () => {
    setOpenManageRent(false);
    manageRent.clear();
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
        <MenuItem onClick={() => onOpen(row)}>
          <Button color="error">
            <Capitalize>Cancelar</Capitalize>
          </Button>
        </MenuItem>
      </Menu>
      <ViewInfo open={openManageRent} cancel={onCancel} rentInfo={rentInfo} />
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

  const {
    paginatedRents: {
      paginationOptions: { currentPage, itemsPerPage, totalItems, search },
      data,
    },
  } = useStore();

  const navigation = useNavigate();

  useEffect(() => {
    paginatorRents.paginate();
  }, [currentPage, itemsPerPage, search]);

  return (
    <AdminLayout title="Reservas">
      <AdminPagination
        textFieldSearch={{
          onChange: (e) => paginatorRents.onFilter({ search: e.target.value }),
          value: search,
          placeholder:
            "Introduce nombre, dirección o código postal de la oficina",
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
            let status = value.status;
            const now = moment();
            const startDate = moment(value.startDate);
            const endDate = moment(value.endDate);
            if (status === "pending" && now.isAfter(startDate)) {
              status = "canceled";
            }

            if (status === "checkedin" && now.isAfter(endDate)) {
              status = "delayed";
            }

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
              status: <StatusValueColumn value={status} />,
            };
          }),
        }}
      />
    </AdminLayout>
  );
};
