import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Box, useMediaQuery, useTheme } from "@mui/material";

const CategoryCard = ({ category }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        width: isSmallScreen ? 300 : 350,
        height: isSmallScreen ? 260 : 280,
        borderRadius: 4,
        border: "2px solid #0099A8",
        textAlign: "center",
        position: "relative",
        overflow: "visible",
        boxShadow: 3,
        transition: "transform 0.3s",
        "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
      }}
    >
      {/* Floating Circular Image Container */}
      <Box
        sx={{
          width: isSmallScreen ? 75 : 90,
          height: isSmallScreen ? 75 : 90,
          borderRadius: "50%",
          backgroundColor: "white",
          border: "2px solid #0099A8",
          boxShadow: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: isSmallScreen ? -35 : -45,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
        }}
      >
        <img
          src={category.categoryImage.url}
          alt={category.title}
          style={{ width: isSmallScreen ? 50 : 60, height: isSmallScreen ? 50 : 60 }}
        />
      </Box>

      <CardContent sx={{ mt: isSmallScreen ? 5 : 6, py: isSmallScreen ? 3 : 4 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          fontSize={isSmallScreen ? "28px" : "35px"}
          color="#0099A8"
        >
          {category.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          fontSize={isSmallScreen ? "18px" : "22px"}
          mt={1}
        >
          {category.description}
        </Typography>
        <Link
          to={`/auction`}
          style={{
            color: "#E53935",
            fontWeight: "600",
            marginTop: "16px",
            display: "inline-block",
            textDecoration: "none",
          }}
        >
           More &rarr;
        </Link>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
