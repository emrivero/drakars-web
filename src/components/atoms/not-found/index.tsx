import { SvgIcon, SvgIconProps } from "@mui/material";
import { FC } from "react";

export const NotFoundIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <path
        d="M 9 1 C 6.2444986 1 4 3.2444986 4 6 C 4 7.1975927 4.4408562 8.2842561 5.1464844 9.1464844 L 1.0214844 13.271484 L 1.7285156 13.978516 L 5.8535156 9.8535156 C 6.7157439 10.559144 7.8024073 11 9 11 C 11.755501 11 14 8.7555014 14 6 C 14 3.2444986 11.755501 1 9 1 z M 9 2 C 11.215061 2 13 3.7849387 13 6 C 13 8.2150613 11.215061 10 9 10 C 6.7849387 10 5 8.2150613 5 6 C 5 3.7849387 6.7849387 2 9 2 z M 7.5 4 A 0.5 0.5 0 0 0 7 4.5 A 0.5 0.5 0 0 0 7.5 5 A 0.5 0.5 0 0 0 8 4.5 A 0.5 0.5 0 0 0 7.5 4 z M 10.5 4 A 0.5 0.5 0 0 0 10 4.5 A 0.5 0.5 0 0 0 10.5 5 A 0.5 0.5 0 0 0 11 4.5 A 0.5 0.5 0 0 0 10.5 4 z M 9 6 C 7.9014686 6 7 6.9014686 7 8 L 8 8 C 8 7.4425314 8.4425314 7 9 7 C 9.5574686 7 10 7.4425314 10 8 L 11 8 C 11 6.9014686 10.098531 6 9 6 z"
        white-space="normal"
        overflow="visible"
      />
    </SvgIcon>
  );
};
