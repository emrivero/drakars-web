import { Card, CardContent, CardMedia } from "@mui/material";
import { FC } from "react";
import { PrimaryTypography } from "../../molecules/primary-typography";

export interface RentCarCardProps {
  imageSrc: string;
  title: string;
  textBody?: string;
  height?: string;
}

export const RentCarCard: FC<RentCarCardProps> = ({
  imageSrc,
  textBody,
  title,
  height = null,
}) => {
  return (
    <Card>
      <CardMedia
        component="img"
        image={`${process.env.REACT_APP_API_URL}${imageSrc}`}
      ></CardMedia>
      <CardContent>
        <PrimaryTypography variant="h5">{title}</PrimaryTypography>
        {/* <Typography>{textBody}</Typography> */}
      </CardContent>
    </Card>
  );
};
