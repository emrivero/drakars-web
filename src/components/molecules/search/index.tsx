import {
  Autocomplete,
  AutocompleteProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { FC } from "react";

export interface SearchInput {
  AutocompleteProps: Omit<
    AutocompleteProps<{ label: string; value: any }, false, false, false>,
    "renderInput"
  >;
  TextFieldProps?: TextFieldProps;
}

export const SearchInput: FC<SearchInput> = ({
  AutocompleteProps,
  TextFieldProps,
}) => {
  return (
    <Autocomplete
      isOptionEqualToValue={(option, value) => option.value === value.value}
      {...AutocompleteProps}
      renderInput={(params) => (
        <TextField color="primary" {...params} {...TextFieldProps} />
      )}
    />
  );
};
