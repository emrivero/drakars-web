import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, Fade, Menu, MenuItem } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Capitalize } from "../../../components/atoms/transforms/capitalize";
import { BlackLink } from "../../../components/molecules/black-link";
import { TableGridRow } from "../../../components/organism/table-grid";
import { AdminLayout } from "../../../components/templates/admin/layout";
import { AdminPagination } from "../../../components/templates/admin/pagination";
import { useAdminServices } from "../../../service/user/admin/application";
import { useVehicleService } from "../../../service/vehicle/application";
import { vehicleColumns } from "../../../service/vehicle/application/model/VehicleGridColumn";
import { useStore } from "../../../store";

const ActionsMenu: FC<{ row: TableGridRow }> = ({ row }) => {
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(profileAnchor);

  const handleMenuProfile = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleCloseMenuProfile = () => {
    setProfileAnchor(null);
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
        <MenuItem>
          <BlackLink to="/home/profile">
            <Button>
              <Capitalize>{row.index}</Capitalize>
            </Button>
          </BlackLink>
        </MenuItem>
        <MenuItem>
          <Button>
            <Capitalize>desconectar</Capitalize>
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
        onRemoveItems={(row) => row}
        addText="Añadir vehículo"
        removeText="Eliminar seleccionados"
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
