import { MenuItem, MenuItemProps, Select, SelectProps } from "@mui/material";
import { FC } from "react";

export interface SelectInputProps extends SelectProps {
  items?: ({ label: string } & MenuItemProps)[];
}

export const SelectInput: FC<SelectInputProps> = ({ items = [], ...rest }) => {
  return (
    <Select {...rest}>
      {items.map(({ value, label, ...rest }) => (
        <MenuItem value={value} key={value.toString()} {...rest}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};
