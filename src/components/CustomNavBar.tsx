import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import useStore from "../services/useAppStore";

const CustomNavBar = () => {
  const {
    serviceDetails,
    setSelectedNavbarItem,
    selectedNavbarItem,
    selectedTelephone,
    setLeftMenuItem,
    setSelectedQuickAccessItem,
  } = useStore();

  const isPrepaid =
    serviceDetails?.promotionType === "Prepaid" ||
    serviceDetails?.promotionType === null;

  const [selectedItem, setSelectedItem] = useState("Broadband");

  const items = [
    { label: "Broadband", key: "Broadband" },
    { label: "PEO TV", key: "PeoTV" },
    { label: "Voice", key: "Voice" },
    { label: "Mobile", key: "Mobile" },
  ];

  const handleItemClick = (item: string) => {
    setSelectedQuickAccessItem("");
    setSelectedItem(item);
    setSelectedNavbarItem(item);
    if (item === "Broadband") setLeftMenuItem("Summary");
    if (item === "PeoTV") setLeftMenuItem("My Package");
    if (item === "Voice") setLeftMenuItem("My Package");
  };

  const disabledItems = ["PeoTV", "Mobile", "Voice"];

  useEffect(() => {
    setSelectedItem(selectedNavbarItem);
  }, [selectedNavbarItem]);

  useEffect(() => {
    setSelectedNavbarItem("Broadband");
    setSelectedItem("Broadband");
  }, [selectedTelephone]);

  useEffect(() => {
    console.log("Selected Telephone number:", selectedTelephone);
  }, [selectedTelephone]);

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        width: "100%",
        height: "5vh",
        minHeight: "40px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-around",
        paddingY: 0.5,
        paddingX: 0,
      }}
    >
      {items.map((item, index) => {
        const disabled = disabledItems.includes(item.key) && isPrepaid;
        return (
          <Button
            key={index}
            disabled={disabled}
            onClick={() => handleItemClick(item.key)}
            sx={{
              marginX: 1,
              flexGrow: 1,
              width: "auto",
              color: selectedItem === item.key ? "white" : "#0056A2",
              backgroundColor:
                selectedItem === item.key ? "#0056A2" : "transparent",
              borderRadius: 2,
              textTransform: "capitalize",
              "&:hover": {
                scale: selectedItem !== item.key ? 1.1 : 1,
                transition: "all 0.3s ease",
              },
            }}
          >
            <Typography variant="body2" sx={{ fontSize: 16 }}>
              {item.label}
            </Typography>
          </Button>
        );
      })}
    </Box>
  );
};

export default CustomNavBar;
