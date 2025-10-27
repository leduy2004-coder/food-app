
import Box from "@mui/material/Box";
import HomePage from "@/layouts/home";
export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh", // full height màn hình
        width: "100%", // full width
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HomePage />
    </Box>
  );
}
