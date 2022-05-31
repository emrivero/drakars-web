import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, Fade, Menu, MenuItem } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Capitalize } from "../../../components/atoms/transforms/capitalize";
import { ErrorTypography } from "../../../components/molecules/error-typography";
import { TableGridRow } from "../../../components/organism/table-grid";
import { AdminLayout } from "../../../components/templates/admin/layout";
import { AdminPagination } from "../../../components/templates/admin/pagination";
import { useAdminServices } from "../../../service/user/admin/application";
import { useVehicleService } from "../../../service/vehicle/application";
import { vehicleColumns } from "../../../service/vehicle/application/model/VehicleGridColumn";
import { VehicleClient } from "../../../service/vehicle/client";
import { useStore } from "../../../store";

const ActionsMenu: FC<{ row: TableGridRow }> = ({ row }) => {
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(profileAnchor);
  const { updater } = useVehicleService();
  const confirm = useConfirm();
  const vehicleClient = new VehicleClient();
  const { paginatorVehicle } = useAdminServices();

  const handleMenuProfile = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleCloseMenuProfile = () => {
    setProfileAnchor(null);
  };

  const navigate = useNavigate();

  const onEdit = async () => {
    await updater.fetch(row.index);
    navigate("/admin/vehicles/edit");
  };

  const onRemove = async () => {
    confirm({
      title: (
        <ErrorTypography variant="h5" align="center">
          ¡Atención!
        </ErrorTypography>
      ),
      confirmationButtonProps: {
        color: "error",
        variant: "contained",
      },
      confirmationText: "Borrar",
      cancellationText: "Cancelar",
      description: (
        <>
          <ErrorTypography variant="h6" align="center">
            Va a borrar el coche permanentemente ¿Está seguro?
          </ErrorTypography>
        </>
      ),
    })
      .then(async () => {
        await vehicleClient.delete(row.index);
        paginatorVehicle.paginate();
      })
      .catch(() => null);
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
        <MenuItem onClick={onEdit}>
          <Button>
            <Capitalize>Editar</Capitalize>
          </Button>
        </MenuItem>
        <MenuItem onClick={onRemove}>
          <Button color="error">
            <Capitalize>Eliminar</Capitalize>
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

export const ListVehicles: FC = () => {
  const {
    paginatedAdminVehicles: {
      data,
      paginationOptions: { search, totalItems, currentPage, itemsPerPage },
    },
  } = useStore();
  const {
    mappers: { VehicleGridRowMapper },
  } = useVehicleService();
  const { paginatorVehicle } = useAdminServices();

  const navigation = useNavigate();

  useEffect(() => {
    paginatorVehicle.paginate();
  }, [currentPage, itemsPerPage, search]);

  return (
    <AdminLayout title="Vehículos">
      <AdminPagination
        onAddItem={() => navigation("/admin/vehicles/add")}
        addText="Añadir vehículo"
        textFieldSearch={{
          onChange: (e) =>
            paginatorVehicle.onFilter({ search: e.target.value }),
          value: search,
          placeholder: "Introduce marca o modelo de vehículo",
        }}
        tableProps={{
          onSelect: (rows) => rows,
          columns: vehicleColumns,
          paginationProps: {
            count: totalItems,
            page: currentPage,
            onPageChange: (e, page) => paginatorVehicle.changePage(page),
            onRowsPerPageChange: (e) =>
              paginatorVehicle.changeRows(parseInt(e.target.value)),
            rowsPerPage: itemsPerPage,
            rowsPerPageOptions: [10, 25],
          },
          ActionsComponent: ActionsMenu,
          rows: data.data.map(VehicleGridRowMapper),
        }}
      />
    </AdminLayout>
  );
};
