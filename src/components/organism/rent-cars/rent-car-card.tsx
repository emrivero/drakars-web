import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { PrimaryTypography } from "../../molecules/primary-typography";

export interface RentCarCardProps {
  imageSrc: string;
  title: string;
  textBody: string;
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
      <CardActionArea
        sx={{
          p: 2,
        }}
      >
        <CardMedia component="img" image={imageSrc}></CardMedia>
        <CardContent>
          <PrimaryTypography variant="h5">{title}</PrimaryTypography>
          <Typography>{textBody}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
