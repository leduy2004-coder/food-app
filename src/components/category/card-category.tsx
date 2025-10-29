import type { CategoryItemType } from "@/schemaValidations/category.schema";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CardCategory = ({ item }: { item: CategoryItemType }) => {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea component="div">
        {/* Ảnh danh mục */}
        <CardMedia
          component="img"
          image={item?.img?.url || "/placeholder.jpg"}
          alt={item.name}
          sx={{
            height: 160,
            display: "block",
            margin: "0 auto",
            objectFit: "cover",
          }}
        />

        {/* Nội dung */}
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="text.primary"
            >
              {item.name}
            </Typography>
            <ArrowForwardIosIcon
              fontSize="small"
              sx={{
                color: "text.secondary",
                transition: "color 0.3s",
                "&:hover": { color: "primary.main" },
              }}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardCategory;
