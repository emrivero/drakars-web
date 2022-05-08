import {
  FormControl,
  FormControlProps,
  InputLabel,
  InputLabelProps,
} from "@mui/material";
import { FC } from "react";
import { SelectInput, SelectInputProps } from "../../molecules/select-input";

export interface FormSelectProps {
  formControlProps?: FormControlProps;
  inputLabelProps?: InputLabelProps;
  selectInputProps?: SelectInputProps;
  labelId: string;
  label: string;
}
export const FormSelect: FC<FormSelectProps> = ({
  formControlProps,
  inputLabelProps,
  selectInputProps,
  labelId,
  label,
}) => {
  return (
    <FormControl fullWidth variant="outlined" {...formControlProps}>
      <InputLabel id={labelId} {...inputLabelProps}>
        {label}
      </InputLabel>
      <SelectInput labelId={labelId} label={label} {...selectInputProps} />
    </FormControl>
  );
};
