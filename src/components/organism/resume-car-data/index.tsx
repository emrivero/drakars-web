import { Card, CardContent, CardMedia } from "@mui/material";
import { FC, MouseEventHandler } from "react";
import { useTranslate } from "../../../i18n/useTranslate";
import { VehicleVm } from "../../../service/vehicle/client/view/VehicleVm";
import { PrimaryTypography } from "../../molecules/primary-typography";

export interface ResumeCarDataProps {
  data: Pick<VehicleVm, "title">;
  imageSrc: string;
  actionText: string;
  onAction?: MouseEventHandler;
  showCategory?: boolean;
  width?: string;
}

export const ResumeCarData: FC<ResumeCarDataProps> = ({ data, imageSrc }) => {
  const { t } = useTranslate();
  return (
    <Card>
      <CardMedia
        component="img"
        // sx={{ height: 0.5, width: 0.5 }}
        image={imageSrc}
      />
      <CardContent>
        <PrimaryTypography variant="h5" align="center">
          {data.title}
        </PrimaryTypography>
      </CardContent>
    </Card>
  );
};
