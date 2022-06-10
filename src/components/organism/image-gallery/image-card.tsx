import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import { FC } from "react";
import { PrimaryTypography } from "../../molecules/primary-typography";

export interface RentCarCardProps {
  imageSrc: string;
  title: string;
  textBody?: string;
  height?: string;
  width?: string;
  selected: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const ImageCard: FC<RentCarCardProps> = ({
  imageSrc,
  textBody,
  title,
  height = null,
  width = "300px",
  selected = false,
  onClick,
}) => {
  const theme = useTheme();
  const mappedTitle = title.split("_").join(" ").toUpperCase();
  return (
    <Card
      sx={{
        border: selected ? `2px solid ${theme.palette.secondary.main}` : "none",
      }}
      elevation={0}
    >
      <CardActionArea
        sx={{
          p: 2,
        }}
        onClick={onClick}
      >
        <CardMedia
          component="img"
          image={`${process.env.REACT_APP_API_URL}${imageSrc}`}
          sx={{ width }}
          loading="lazy"
        ></CardMedia>
        <CardContent>
          <PrimaryTypography variant="body1">{mappedTitle}</PrimaryTypography>
          <Typography>{textBody}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
