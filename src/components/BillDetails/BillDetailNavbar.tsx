import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';


interface NavbarProps {
  onTabChange: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onTabChange }) => {
  const tabs = ["Total Payable", "Bill History", "Bill Methods"];
  const [selectedTab, setSelectedTab] = useState<string>("Total Payable");

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    onTabChange(tab);
  };

  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%", // Width as a percentage of the viewport or parent container
      height: "2vh", // Height as a percentage of the viewport or parent container
      mb:1,
      borderRadius: 2, // Border radius as a percentage
      gap: 1, // Space between items as a percentage
      padding: 3, // Padding as a percentage Padding inside the box relative to viewport height
    }}
  >
        {tabs.map((tab) => (
          <Button
            key={tab}
            onClick={() => handleTabClick(tab)}
            sx={{
              backgroundColor: selectedTab === tab ? "#0056A2" : "#FFFFFF",
              width: "32%",
              height: "5vh",
              color: selectedTab === tab ? "#FFFFFF" : "#0056A2",
              minHeight: "50px",
              fontWeight: selectedTab === tab ? 700 : 500,
              borderRadius: "10px",
              padding: "8px 16px",
              "&:hover": { backgroundColor: "#0056A2", color: "#FFFFFF" },
            }}
          >
            <Typography variant="body2"sx={{textTransform:"capitalize",fontWeight:600,fontSize:"18px"}}>{tab}</Typography>
          </Button>
        ))}
      </Box>
  );
};

export default Navbar;