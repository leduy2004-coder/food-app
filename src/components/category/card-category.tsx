import type { CategoryItemType } from "@/schemaValidations/category.schema";

import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CardCategory = ({ item }: { item: CategoryItemType }) => {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
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

      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1" fontWeight={600} color="text.primary">
            {item.name}
          </Typography>
          <ArrowForwardIosIcon
            fontSize="small"
            sx={{
              color: "text.secondary",
              transition: "color 0.3s",
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardCategory;
