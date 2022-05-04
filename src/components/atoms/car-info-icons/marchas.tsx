import { SvgIcon, SvgIconProps } from "@mui/material";
import { FC } from "react";

export const MarchasIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox="0 0 72 72" {...props}>
      <path
        id="marchas"
        d="M72 13.559c0-4.648-3.719-8.416-8.308-8.416s-8.308 3.767-8.308 8.416c0 3.659 2.319 6.741 5.538 7.9v6.126c0 3.098-2.479 5.61-5.538 5.61h-16.614v-11.736c3.219-1.159 5.538-4.242 5.538-7.9 0-4.648-3.719-8.416-8.308-8.416s-8.308 3.767-8.308 8.416c0 3.659 2.319 6.741 5.538 7.9v11.736h-22.154v-11.736c3.219-1.159 5.538-4.242 5.538-7.9 0-4.648-3.719-8.416-8.308-8.416s-8.307 3.767-8.307 8.416c0 3.659 2.319 6.741 5.538 7.9v29.081c-3.219 1.16-5.538 4.242-5.538 7.9 0 4.648 3.719 8.416 8.308 8.416s8.308-3.767 8.308-8.416c0-3.659-2.319-6.741-5.538-7.9v-11.735h22.154v11.736c-3.219 1.159-5.538 4.242-5.538 7.9 0 4.648 3.719 8.416 8.308 8.416s8.308-3.767 8.308-8.416c0-3.659-2.319-6.741-5.538-7.9v-11.736h16.615c6.108 0 11.077-5.034 11.077-11.221v-6.126c3.218-1.16 5.538-4.242 5.538-7.9z"
      />
    </SvgIcon>
  );
};