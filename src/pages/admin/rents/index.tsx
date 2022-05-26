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
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Capitalize } from "../../../components/atoms/transforms/capitalize";
import { FormatDate } from "../../../components/atoms/transforms/format-date";
import { PrimaryTypography } from "../../../components/molecules/primary-typography";
import { TableGridRow } from "../../../components/organism/table-grid";
import { AdminLayout } from "../../../components/templates/admin/layout";
import { AdminPagination } from "../../../components/templates/admin/pagination";
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
          <Typography fontWeight={500} display="inline">
            {rentInfo?.renterUser.name} {rentInfo?.renterUser.family_name}
          </Typography>
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
            <FormatDate>{rentInfo?.startDate}</FormatDate> {rentInfo?.startHour}
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
            <FormatDate>{rentInfo?.endDate}</FormatDate> {rentInfo?.endHour}
          </Typography>
        </Box>
        <Box>
          <PrimaryTypography display="inline" fontWeight={500}>
            Vehículo:{" "}
          </PrimaryTypography>
          <Typography fontWeight={500} display="inline">
            {rentInfo?.rentedVehicle.mark} {rentInfo?.rentedVehicle.model},
            Llave nº {rentInfo?.rentedVehicle.id}
          </Typography>
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
            {rentInfo?.status === "pending" && "Pendiente"}
            {rentInfo?.status === "checkedin" && "Entregado"}
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
    manageRent.changeRentValue(row.email);
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
          <Button size="small">
            <Capitalize>Ver</Capitalize>
          </Button>
        </MenuItem>
      </Menu>
      <ViewInfo open={openManageRent} cancel={onCancel} rentInfo={rentInfo} />
    </>
  );
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
    <AdminLayout title="Oficinas">
      <AdminPagination
        onAddItem={() => navigation("/admin/offices/add")}
        onRemoveItems={(row) => row}
        addText="Añadir oficina"
        removeText="Eliminar seleccionados"
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
          rows: data.data.map((value) => ({
            index: `${value.id}`,
            // reference: value.reference,
            fullNameUser: `${value.renterUser?.name} ${value.renterUser?.family_name}`,
            email: `${value.renterUser.email}`,
            originAddress: `${value.originOffice.address}`,
            destinyAddress: `${value.destinyOffice.address}`,
            fullNameVehicle: `${value.rentedVehicle.mark} ${value.rentedVehicle.model}`,
            status: value.status,
          })),
        }}
      />
    </AdminLayout>
  );
};
