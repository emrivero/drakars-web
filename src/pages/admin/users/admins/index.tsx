import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, Fade, Menu, MenuItem } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Capitalize } from "../../../../components/atoms/transforms/capitalize";
import { BlackLink } from "../../../../components/molecules/black-link";
import { TableGridRow } from "../../../../components/organism/table-grid";
import { AdminLayout } from "../../../../components/templates/admin/layout";
import { AdminPagination } from "../../../../components/templates/admin/pagination";
import { useAdminServices } from "../../../../service/user/admin/application";
import { adminColumns } from "../../../../service/user/admin/application/model/AdminGridColumn";
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

export const AdminUsers: FC = () => {
  const {
    paginatedAdmins: {
      data,
      paginationOptions: { search, totalItems, currentPage, itemsPerPage },
    },
  } = useStore();
  const { paginatorAdmin } = useAdminServices();

  useEffect(() => {
    paginatorAdmin.paginate();
  }, [currentPage, itemsPerPage, search]);

  return (
    <AdminLayout title="Editores">
      <AdminPagination
        textFieldSearch={{
          onChange: (e) => paginatorAdmin.onFilter({ search: e.target.value }),
          value: search,
          placeholder: "Introduce nombre o correo eléctronico",
        }}
        tableProps={{
          columns: adminColumns,
          paginationProps: {
            count: totalItems,
            page: currentPage,
            onPageChange: (e, page) => paginatorAdmin.changePage(page),
            onRowsPerPageChange: (e) =>
              paginatorAdmin.changeRows(parseInt(e.target.value)),
            rowsPerPage: itemsPerPage,
            rowsPerPageOptions: [10, 25],
          },
          ActionsComponent: ActionsMenu,
          rows: data.data.map((value) => ({
            index: `${value.id}`,
            name: value.name,
            family_name: value.family_name,
            email: value.email,
          })),
        }}
      />
    </AdminLayout>
  );
};
