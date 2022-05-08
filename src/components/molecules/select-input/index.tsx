import { MenuItem, MenuItemProps, Select, SelectProps } from "@mui/material";
import { FC } from "react";

export interface SelectInputProps extends SelectProps<any> {
  items: ({ label: string; value: any } & MenuItemProps)[];
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
