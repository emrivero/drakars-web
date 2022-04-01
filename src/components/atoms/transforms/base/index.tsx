import { FC } from "react";
import { TransformBaseProps } from "../types";

export const TransformBase: FC<TransformBaseProps> = ({
  children,
  transform,
}) => {
  if (!children) {
    return null;
  }

  const transformed = transform(children);
  return <>{transformed}</>;
};
