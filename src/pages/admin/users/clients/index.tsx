import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, Fade, Menu, MenuItem } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Capitalize } from "../../../../components/atoms/transforms/capitalize";
import { TableGridRow } from "../../../../components/organism/table-grid";
import { AdminLayout } from "../../../../components/templates/admin/layout";
import { AdminPagination } from "../../../../components/templates/admin/pagination";
import { useAdminServices } from "../../../../service/user/admin/application";
import { clientColumns } from "../../../../service/user/admin/application/model/ClientGridColumn";
import { useStore } from "../../../../store";

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
          <Button>
            <Capitalize>Ver cliente</Capitalize>
          </Button>
        </MenuItem>
        <MenuItem>
          <Button color="error">
            <Capitalize>Dar de baja</Capitalize>
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

export const ClientUsers: FC = () => {
  const {
    paginatedClients: {
      data,
      paginationOptions: { search, totalItems, currentPage, itemsPerPage },
    },
  } = useStore();
  const { paginatorClient } = useAdminServices();

  useEffect(() => {
    paginatorClient.paginate();
  }, [currentPage, itemsPerPage, search]);

  return (
    <AdminLayout title="Clientes">
      <AdminPagination
        textFieldSearch={{
          onChange: (e) => paginatorClient.onFilter({ search: e.target.value }),
          value: search,
          placeholder: "Introduce nombre o correo eléctronico",
        }}
        tableProps={{
          selectable: false,
          columns: clientColumns,
          paginationProps: {
            count: totalItems,
            page: currentPage,
            onPageChange: (e, page) => paginatorClient.changePage(page),
            onRowsPerPageChange: (e) =>
              paginatorClient.changeRows(parseInt(e.target.value)),
            rowsPerPage: itemsPerPage,
            rowsPerPageOptions: [10, 25],
          },
          ActionsComponent: ActionsMenu,
          rows: data?.data?.map((value) => ({
            index: `${value?.id}`,
            name: value?.name,
            family_name: value?.family_name,
            email: value?.email,
            dni: value?.dni,
            phone: value?.phone,
          })),
        }}
      />
    </AdminLayout>
  );
};
