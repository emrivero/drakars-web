import { FC } from "react";
import { TransformBase } from "../base";
import { TransformProps } from "../types";

export const Capitalize: FC<TransformProps> = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <TransformBase
      transform={(arg) => {
        const firstLetter = arg[0].toUpperCase();
        return `${firstLetter}${arg.slice(1)}`;
      }}
    >
      {children}
    </TransformBase>
  );
};
