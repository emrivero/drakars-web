import { FC } from "react";
import { Upper } from "../../atoms/transforms/upper";
import { CustomTypography } from "../custom-typography";
import { PrimaryBox } from "../primary-box";

export interface BannerProps {
  title: string;
}

export const Banner: FC<BannerProps> = ({ title }) => {
  return (
    <PrimaryBox
      sx={{
        width: "100%",
        py: 1,
        px: 3,
      }}
    >
      <CustomTypography type="acme" variant="h4" color={"white"} align="center">
        <Upper>{title}</Upper>
      </CustomTypography>
    </PrimaryBox>
  );
};
