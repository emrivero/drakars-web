import { BoxProps } from "@mui/material";
import { GridProps } from "@mui/system";
import { FC } from "react";

export interface FormInputProps {
  boxProps?: BoxProps;
}

export interface FormContainerProps {
  gridProps: { item: true } & GridProps;
  inputProps: FormInputProps;
}

export interface CreateFormProps {
  container: FormContainerProps[];
}

export const CreateForm: FC<CreateFormProps> = () => {
  return null;
};
