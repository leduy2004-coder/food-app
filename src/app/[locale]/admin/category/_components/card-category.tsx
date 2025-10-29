"use client";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CategoryItemType } from "@/schemaValidations/category.schema";
import Image from "@/components/image";

type Props = {
  item: CategoryItemType;
};

export default function CardCategory({ item }: Props) {
  return (
    <Card
      key={item.id}
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <CardActionArea>
        {/* Hình ảnh */}
        <CardMedia
          sx={{
            height: 160,
            position: "relative",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Image
            src={item?.img?.url}
            alt={item.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </CardMedia>

        {/* Nội dung */}
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pt: 2,
          }}
        >
          <Typography variant="subtitle1" fontWeight={600} color="text.primary">
            {item.name}
          </Typography>

          <IconButton
            size="small"
            color="inherit"
            sx={{ "&:hover": { color: "error.main" } }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
