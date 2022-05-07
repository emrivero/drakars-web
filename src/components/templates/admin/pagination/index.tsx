import {
  Box,
  BoxProps,
  Button,
  Grid,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { GridProps } from "@mui/system";
import { FC, useState } from "react";
import { TableGridRow } from "../../../organism/table-grid";
import { CrudCheckboxTable, CrudCheckboxTableProps } from "../dk-table";

export interface AdminPaginationProps {
  addText: string;
  textFieldSearch?: TextFieldProps;
  containerProps?: GridProps;
  containerTableProps?: BoxProps;
  tableProps: CrudCheckboxTableProps;
  onAddItem: () => void;
  onRemoveItems: (row: TableGridRow[]) => void;
}

export const AdminPagination: FC<AdminPaginationProps> = ({
  addText,
  textFieldSearch = {},
  containerProps = {},
  containerTableProps = {},
  tableProps,
  onAddItem,
  onRemoveItems,
}) => {
  const [selectedRows, setSelected] = useState<TableGridRow[]>([]);

  const internalOnSelect = (rows: TableGridRow[]) => {
    setSelected(rows);
  };

  return (
    <Grid container rowSpacing={4} {...containerProps}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          InputProps={{
            type: "search",
          }}
          {...textFieldSearch}
        />
      </Grid>
      <Grid item xs={12} display="flex">
        <Box mr={1}>
          <Button variant="contained" color="primary" onClick={onAddItem}>
            {addText}
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onRemoveItems(selectedRows)}
          >
            Eliminar seleccionados
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ width: "100%", height: "70vh" }} {...containerTableProps}>
          <CrudCheckboxTable {...tableProps} onSelect={internalOnSelect} />
        </Box>
      </Grid>
    </Grid>
  );
};