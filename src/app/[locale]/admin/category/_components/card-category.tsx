"use client";

import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CategoryItemType } from "@/schemaValidations/category.schema";
import Image from "@/components/image";

type Props = {
  item: CategoryItemType;
};

export default function CardCategory({ item }: Props) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        transition: "all 0.25s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
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

        {/* Chỉ dùng Icon, không dùng IconButton */}
        <ArrowForwardIosIcon
          fontSize="small"
          sx={{
            color: "text.secondary",
            transition: "color 0.3s",
            "&:hover": { color: "error.main" },
          }}
        />
      </CardContent>
    </Card>
  );
}
