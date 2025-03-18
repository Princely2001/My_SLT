// src/components/Banner.tsx
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import fetchBannerData from "../services/fetchBannerData";
import { BannerData } from "../types/types";

const Banner = () => {
  const [bannerData, setBannerData] = useState<BannerData[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBannerData();
      if (data) {
        setBannerData(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out transition
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerData.length); // Change to next image
        setFade(true); // Start fade-in transition
      }, 50); // Wait for fade-out to complete
    }, 5000); // Interval duration for changing images

    return () => clearInterval(interval);
  }, [bannerData.length]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        flexDirection: "column",
        alignItems: "center",
        padding: 0,
        borderRadius: 2,
        position: "relative",
        height: "195px",
        boxShadow: "0px 3px 3px #0000004A",
        overflow: "hidden",
        mt: 1,
        backgroundColor: "#f0f0f0",
      }}
    >
      {bannerData.length > 0 && (
        <Box
          component="div"
          sx={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${bannerData[currentImageIndex]?.url})`, // Dynamically set the image URL
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transition: "opacity 0.5s ease",
            opacity: fade ? 1 : 0, // Handle fade-in and fade-out
            borderRadius: 2,
          }}
        />
      )}
    </Box>
  );
};

export default Banner;
