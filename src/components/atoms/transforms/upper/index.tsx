import { FC } from "react";
import { TransformBase } from "../base";
import { TransformProps } from "../types";

export const Upper: FC<TransformProps> = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <TransformBase transform={(arg) => arg.toUpperCase()}>
      {children}
    </TransformBase>
  );
};
