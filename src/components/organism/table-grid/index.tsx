import {
  Checkbox,
  Paper,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TablePaginationProps,
  TableRow,
} from "@mui/material";
import { ChangeEvent, Dispatch, FC, useEffect, useState } from "react";
import { PrimaryTypography } from "../../molecules/primary-typography";

export type TableGridRow = Record<string, any> & { index: string };

export type TableGridColumn = {
  field: string;
  label?: string;
  align?: "left" | "center" | "right" | "justify" | "inherit";
  render?: (row: TableGridRow) => JSX.Element;
  width?: number;
};

export type TableGridColumnProps = {
  selectable?: boolean;
  cols: TableGridColumn[];
  onCheck?: (e: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  selected?: boolean;
  disabled?: boolean;
};

export type TableGridRowProps = {
  cols: TableGridColumn[];
  rows: TableGridRow[];
  selectedRows: TableGridRow[];
  selectable: boolean;
  onCheck: Dispatch<React.SetStateAction<TableGridRow[]>>;
};

export interface TableGridProps {
  sxTable?: SxProps;
  columns: TableGridColumn[];
  rows: TableGridRow[];
  selectable?: boolean;
  onSelect?: (rows: TableGridRow[]) => void;
  paginationProps: TablePaginationProps;
}

export const TableGridColumns: FC<TableGridColumnProps> = ({
  cols,
  selectable,
  onCheck,
  selected,
  disabled = false,
}) => {
  return (
    <TableRow>
      {selectable && (
        <TableCell>
          <Checkbox
            sx={{ width: 0.05 }}
            onChange={onCheck}
            checked={selected}
            disabled={disabled}
          />
        </TableCell>
      )}
      {cols.map((col) => {
        const cellWidth = col.width !== null && col.width > 1 ? 1 : col.width;
        return (
          <TableCell
            align={col.align || "inherit"}
            key={col.field}
            sx={{
              width: col.width
                ? `calc(100% /( ${cols.length}) * ${cellWidth})`
                : "auto",
            }}
          >
            <PrimaryTypography fontWeight={600}>{col.label}</PrimaryTypography>
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export const TableGridRow: FC<TableGridRowProps> = ({
  cols,
  rows,
  selectable,
  onCheck,
  selectedRows,
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    checked: boolean,
    id: string
  ) => {
    if (checked) {
      const selectedRow = rows.find((row) => row.index === id);
      const selected = [...selectedRows, selectedRow];

      onCheck(selected);
    } else {
      const selected = selectedRows.filter((row) => row.index !== id);
      onCheck(selected);
    }
  };

  return (
    <TableBody>
      {rows.map((row) => {
        return (
          <TableRow key={row.index}>
            {selectable && (
              <TableCell sx={{ width: 0.05 }}>
                <Checkbox
                  sx={{ width: 0.05 }}
                  onChange={(e, checked) => handleChange(e, checked, row.index)}
                  checked={!!selectedRows.find((r) => row.index === r.index)}
                />
              </TableCell>
            )}
            {cols.map((col) => {
              const ColRender = col.render;
              const cellWidth =
                col.width !== null && col.width > 1 ? 1 : col.width;
              return (
                <TableCell
                  align={col.align || "inherit"}
                  key={col.field}
                  sx={{
                    width: col.width
                      ? `calc(100% /( ${cols.length}) * ${cellWidth})`
                      : "auto",
                  }}
                >
                  {col.render ? ColRender(row) : row[col.field]}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export const TableGrid: FC<TableGridProps> = ({
  sxTable = {},
  columns,
  rows,
  selectable = false,
  onSelect = () => null,
  paginationProps,
}) => {
  const [selectedRows, setSelectedRows] = useState<TableGridRow[]>([]);
  const headerSelected = rows.length === selectedRows.length && rows.length > 0;

  const handleCheckAll = (_, checked) => {
    if (checked) {
      setSelectedRows(rows);
    } else {
      setSelectedRows([]);
    }
  };

  useEffect(() => {
    onSelect(selectedRows);
  }, [selectedRows]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%", ...sxTable }}>
          <TableGridColumns
            cols={columns}
            onCheck={handleCheckAll}
            selectable={selectable}
            selected={headerSelected}
            disabled={rows.length === 0}
          />
          <TableGridRow
            rows={rows}
            cols={columns}
            selectable={selectable}
            onCheck={setSelectedRows}
            selectedRows={selectedRows}
          />
        </Table>
      </TableContainer>
      <TablePagination
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
        {...paginationProps}
      />
    </>
  );
};

// count total de elementos
//
