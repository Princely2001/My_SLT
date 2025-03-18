import { useEffect, useState } from "react";
import { Box, Button, Grid2, Typography } from "@mui/material";
import Promotion from "../../src/assets/Images/QuickAccessIcons/Promotion.png";
import PromotionSelected from "../../src/assets/Images/QuickAccessIcons/PromotionSelected.png";
import PromotionHover from "../../src/assets/Images/QuickAccessIcons/PromotionHover.png";
import NewServices from "../../src/assets/Images/QuickAccessIcons/New Services.png";
import NewServicesSelected from "../../src/assets/Images/QuickAccessIcons/NewServicesSelected.png";
import NewServicesHover from "../../src/assets/Images/QuickAccessIcons/NewServicesHover.png";
import DigitalLife from "../../src/assets/Images/QuickAccessIcons/Digital Life.png";
import DigitalLifeSelected from "../../src/assets/Images/QuickAccessIcons/DigitalLifeSelected.png";
import DigitalLifeHover from "../../src/assets/Images/QuickAccessIcons/DigitalLifeHover.png";
import Bill from "../../src/assets/Images/QuickAccessIcons/Bill.png";
import BillSelected from "../../src/assets/Images/QuickAccessIcons/BillSelected.png";
import BillDisabled from "../../src/assets/Images/QuickAccessIcons/BillDisabled.png";
import BillHover from "../../src/assets/Images/QuickAccessIcons/BillHover.png";
import HotDevices from "../../src/assets/Images/QuickAccessIcons/Hot Devices.png";
import HotDevicesSelected from "../../src/assets/Images/QuickAccessIcons/HotDevicesSelected.png";
import HotDevicesHover from "../../src/assets/Images/QuickAccessIcons/HotDevicesHover.png";
import Complaints from "../../src/assets/Images/QuickAccessIcons/Complaints.png";
import ComplaintsSelected from "../../src/assets/Images/QuickAccessIcons/ComplaintsSelected.png";
import ComplaintsDisabled from "../../src/assets/Images/QuickAccessIcons/ComplaintsDisabled.png";
import ComplaintsHover from "../../src/assets/Images/QuickAccessIcons/ComplaintsHover.png";

import useStore from "../services/useAppStore";

const QuickAccessMenu = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const {
    selectedTelephone,
    serviceDetails,
    setLeftMenuItem,
    setSelectedNavbarItem,
    setSelectedQuickAccessItem,
    selectedQuickAccessItem,
  } = useStore();
  const isPrepaid = serviceDetails?.promotionType === "Prepaid";
  const tileData = [
    {
      label: "Promotion",
      img: Promotion,
      selectedImg: PromotionSelected,
      hoverImg: PromotionHover,
      customStyles: { width: "32px", height: "32px" }, // Custom size for this image
    },
    {
      label: "New Services",
      img: NewServices,
      selectedImg: NewServicesSelected,
      hoverImg: NewServicesHover,
      customStyles: { width: "30px", height: "30px" },
    },
    {
      label: "Digital Life",
      img: DigitalLife,
      selectedImg: DigitalLifeSelected,
      hoverImg: DigitalLifeHover,
      customStyles: { width: "28px", height: "30px" },
    },
    {
      label: isPrepaid ? "Reload" : "Bill",
      img: Bill,
      selectedImg: BillSelected,
      disabledImg: BillDisabled,
      hoverImg: BillHover,
      customStyles: { width: "30px", height: "30px" },
    },
    {
      label: "Hot Devices",
      img: HotDevices,
      selectedImg: HotDevicesSelected,
      hoverImg: HotDevicesHover,
      customStyles: { width: "30px", height: "30px" },
    },
    {
      label: "Complaints",
      img: Complaints,
      selectedImg: ComplaintsSelected,
      disabledImg: ComplaintsDisabled,
      hoverImg: ComplaintsHover,
      customStyles: { width: "30px", height: "28px" },
    },
  ];

  const disabledItems = ["Reload", "Complaints"];
  const [hover, setHover] = useState(-1);
  const handleRedirect = () => {
    window.open("https://eteleshop.slt.lk/", "_blank");
  };

  useEffect(() => {
    setSelectedItem(selectedQuickAccessItem);
  }, [selectedQuickAccessItem]);

  useEffect(() => {
    setSelectedQuickAccessItem("");
  }, [selectedTelephone]);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Grid2 container spacing={1}>
        {tileData.map((tile, index) => {
          const disabled = disabledItems.includes(tile.label) && isPrepaid;

          return (
            <Grid2 size={6} key={index}>
              <Button
                onClick={() => {
                  if (tile.label === "Hot Devices") {
                    handleRedirect();
                  } else {
                    setSelectedQuickAccessItem(tile.label);
                    setLeftMenuItem(tile.label);
                    setSelectedNavbarItem("");
                  }
                }}
                onMouseEnter={() => {
                  if (!disabled && selectedItem !== tile.label) setHover(index);
                }}
                onMouseLeave={() => setHover(-1)}
                disabled={disabled}
                variant="contained"
                sx={{
                  width: "100%",
                  height: "60px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor:
                    selectedItem === tile.label ? "#0056A2" : "#FFFFFF",
                  color: selectedItem === tile.label ? "#FFFFFF" : "#0056A2",
                  display: "flex",
                  gap: 1,
                  justifyContent: "start",
                  alignItems: "center",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor:
                      selectedItem !== tile.label ? "#BAD1E6" : "#0056A2",
                    color: selectedItem !== tile.label ? "#DFF0FF" : "#FFFFFF",
                  },
                  "&:disabled": {
                    backgroundColor: "#CCCCCC",
                    color: "#99999",
                  },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    right: "15px",
                    width: "30px",
                    height: "30px",
                  }}
                >
                  {disabled && (
                    <img
                      src={tile.disabledImg}
                      alt={`${tile.label}-default`}
                      style={{
                        ...tile.customStyles,
                        position: "absolute",
                      }}
                    />
                  )}
                  {!disabled && (
                    <>
                      <img
                        src={tile.img}
                        alt={`${tile.label}-default`}
                        style={{
                          ...tile.customStyles,
                          position: "absolute",
                          opacity:
                            hover === index || selectedItem === tile.label
                              ? 0
                              : 1,
                          transition: "opacity 0.3s ease", // Smooth fade-out
                        }}
                      />
                      <img
                        src={
                          hover === index
                            ? tile.hoverImg
                            : selectedItem === tile.label
                            ? tile.selectedImg
                            : tile.img
                        }
                        alt={`${tile.label}-hover`}
                        style={{
                          ...tile.customStyles,
                          position: "absolute",
                          opacity:
                            hover === index || selectedItem === tile.label
                              ? 1
                              : 0,
                          transition: "opacity 0.3s ease", // Smooth fade-in
                        }}
                      />
                    </>
                  )}
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    marginL: "auto",
                    textTransform: "capitalize",
                    fontWeight: 600,
                  }}
                >
                  {tile.label}
                </Typography>
              </Button>
            </Grid2>
          );
        })}
      </Grid2>
    </Box>
  );
};

export default QuickAccessMenu;
