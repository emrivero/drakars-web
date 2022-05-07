import { Box, Button, ButtonProps, SxProps } from "@mui/material";
import { FC } from "react";
import {
  TableGrid,
  TableGridProps,
  TableGridRow,
} from "../../../organism/table-grid";

export type CheckboxTableProps = Omit<TableGridProps, "selectable"> & {
  onSelect: (rows: TableGridRow[]) => void;
};

export type CrudActionEvent = (row: TableGridRow) => void;

export interface CrudActionProps {
  onRemove?: CrudActionEvent;
  onView?: CrudActionEvent;
  onEdit?: CrudActionEvent;
  sxContainer?: SxProps;
  sxContainerButton?: SxProps;
  buttonProps?: {
    viewButton?: ButtonProps;
    editButton?: ButtonProps;
    deleteButton?: ButtonProps;
  };
}

export interface CrudTableProps extends TableGridProps {
  ActionsProps?: CrudActionProps;
}

export type CrudCheckboxTableProps = Omit<CrudTableProps, "selectable"> &
  CheckboxTableProps;

export const CheckboxTable: FC<CheckboxTableProps> = (props) => {
  return <TableGrid selectable {...props} />;
};

export const CrudTable: FC<CrudTableProps> = ({
  ActionsProps = {},
  ...props
}) => {
  const defaultActionsProps = {
    onView: () => null,
    onRemove: () => null,
    onEdit: () => null,
    sxContainer: {},
    sxContainerButton: {},
    buttonProps: {
      viewButton: {},
      editButton: {},
      deleteButton: {},
    },
    ...ActionsProps,
  };

  const Actions: FC<CrudActionProps & { row: TableGridRow }> = ({
    row,
    onView,
    onRemove,
    onEdit,
    sxContainer = {},
    sxContainerButton = {},
    buttonProps = {
      viewButton: {},
      editButton: {},
      deleteButton: {},
    },
  }) => {
    const { viewButton, deleteButton, editButton } = buttonProps;

    const addBtnProps: ButtonProps = {
      size: "small",
      variant: "outlined",
      color: "success",
      ...viewButton,
      onClick: () => onView(row),
    };
    const removeBtnProps: ButtonProps = {
      size: "small",
      variant: "outlined",
      color: "error",
      ...deleteButton,
      onClick: () => onRemove(row),
    };
    const editBtnProps: ButtonProps = {
      size: "small",
      variant: "outlined",
      color: "warning",
      ...editButton,
      onClick: () => onEdit(row),
    };

    return (
      <Box sx={{ ...sxContainer, display: "flex" }}>
        <Box sx={{ ...sxContainerButton, p: 0.5 }}>
          <Button {...addBtnProps}>Ver</Button>
        </Box>
        <Box sx={{ ...sxContainerButton, p: 0.5 }}>
          <Button {...editBtnProps}>Editar</Button>
        </Box>
        <Box sx={{ ...sxContainerButton, p: 0.5 }}>
          <Button {...removeBtnProps}>Eliminar</Button>
        </Box>
      </Box>
    );
  };

  const columnsWithButtons = props.columns.concat({
    field: "actions",
    label: "Acciones",
    render: (row) => <Actions {...defaultActionsProps} row={row} />,
  });

  return <TableGrid {...props} columns={columnsWithButtons} />;
};

export const CrudCheckboxTable: FC<CrudCheckboxTableProps> = (props) => {
  return <CrudTable {...props} selectable />;
};
