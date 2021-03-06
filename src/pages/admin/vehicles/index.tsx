import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, Fade, Menu, MenuItem } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";
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

  const onChangeActive = async (flag: boolean) => {
    await vehicleClient.patch(`${row.index}`, { active: flag });
    paginatorVehicle.paginate();
  };
  const { enqueueSnackbar } = useSnackbar();

  const onRemove = async () => {
    confirm({
      title: (
        <ErrorTypography variant="h5" align="center">
          ??Atenci??n!
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
            Va a borrar el coche permanentemente ??Est?? seguro?
          </ErrorTypography>
        </>
      ),
    })
      .then(async () => {
        const response = await vehicleClient.delete(row.index);
        if (response.status < 300) {
          enqueueSnackbar("Veh??culo eliminado", {
            variant: "success",
            autoHideDuration: 2000,
            anchorOrigin: { horizontal: "center", vertical: "top" },
          });
        } else {
          enqueueSnackbar("El veh??culo tiene una reserva pendiente", {
            variant: "error",
            autoHideDuration: 2000,
            anchorOrigin: { horizontal: "center", vertical: "top" },
          });
        }
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
        <MenuItem onClick={() => onChangeActive(false)}>
          {row.active === "Activo" ? (
            <Button color="warning">
              <Capitalize>desactivar</Capitalize>
            </Button>
          ) : (
            <Button onClick={() => onChangeActive(true)} color="success">
              <Capitalize>activar</Capitalize>
            </Button>
          )}
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
    <AdminLayout title="Veh??culos">
      <AdminPagination
        onAddItem={() => navigation("/admin/vehicles/add")}
        addText="A??adir veh??culo"
        textFieldSearch={{
          onChange: (e) =>
            paginatorVehicle.onFilter({
              search: e.target.value,
              currentPage: 0,
            }),
          value: search,
          placeholder: "Introduce marca o modelo de veh??culo",
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
