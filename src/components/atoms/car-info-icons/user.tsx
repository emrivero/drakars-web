import { SvgIcon, SvgIconProps } from "@mui/material";
import { FC } from "react";

export const UserIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox="0 0 12 12" {...props}>
      <path
        id="user"
        clipRule="evenodd"
        d="M5.98214 0C4.7395 0 3.73214 1.00736 3.73214 2.25V3.75C3.73214 4.99264 4.7395 6 5.98214 6H6.06814C7.31078 6 8.31814 4.99264 8.31814 3.75V2.25C8.31814 1.00736 7.31078 0 6.06814 0H5.98214ZM1.55883 6.75C0.823291 6.75 0.204991 7.30224 0.122232 8.0331C-0.0719499 9.74797 1.2696 11.25 2.99543 11.25H9.00463C10.7305 11.25 12.072 9.74797 11.8778 8.0331C11.7951 7.30224 11.1768 6.75 10.4412 6.75H1.55883Z"
      />
    </SvgIcon>
  );
};
