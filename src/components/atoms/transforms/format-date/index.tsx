import { FC } from "react";
import { TransformBase } from "../base";
import { TransformProps } from "../types";

export const FormatDate: FC<TransformProps> = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <TransformBase
      transform={(arg) => {
        const splitDate = arg.split("-");
        return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
      }}
    >
      {children}
    </TransformBase>
  );
};
