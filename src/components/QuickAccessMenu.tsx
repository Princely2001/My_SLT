import { useEffect, useState } from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import useStore from "../services/useAppStore";

const QuickAccessMenu = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState("");
  const [hover, setHover] = useState(-1);
  const Promotion = "https://mysltimages.s3.eu-north-1.amazonaws.com/Promotion.png";
  const  PromotionSelected = "https://mysltimages.s3.eu-north-1.amazonaws.com/PromotionSelected.png";
  const PromotionHover = "https://mysltimages.s3.eu-north-1.amazonaws.com/PromotionHover.png";
  const  NewServices = "https://mysltimages.s3.eu-north-1.amazonaws.com/New+Services.png";
  const NewServicesSelected = "https://mysltimages.s3.eu-north-1.amazonaws.com/NewServicesSelected.png";
  const NewServicesHover = "https://mysltimages.s3.eu-north-1.amazonaws.com/NewServicesHover.png";
  const DigitalLife = "https://mysltimages.s3.eu-north-1.amazonaws.com/Digital+Life.png";
  const  DigitalLifeSelected = "https://mysltimages.s3.eu-north-1.amazonaws.com/DigitalLifeSelected.png";
  const DigitalLifeHover = "https://mysltimages.s3.eu-north-1.amazonaws.com/DigitalLifeHover.png"
  const   Bill = "https://mysltimages.s3.eu-north-1.amazonaws.com/Bill.png";
  const  BillSelected = "https://mysltimages.s3.eu-north-1.amazonaws.com/BillSelected.png";
  const  BillDisabled = "https://mysltimages.s3.eu-north-1.amazonaws.com/BillDisabled.png";
  const BillHover = "https://mysltimages.s3.eu-north-1.amazonaws.com/BillHover.png";
  const HotDevices = "https://mysltimages.s3.eu-north-1.amazonaws.com/Hot+Devices.png";
  const HotDevicesSelected = "https://mysltimages.s3.eu-north-1.amazonaws.com/HotDevicesSelected.png";
  const  HotDevicesHover = "https://mysltimages.s3.eu-north-1.amazonaws.com/HotDevicesHover.png";
  const Complaints = "https://mysltimages.s3.eu-north-1.amazonaws.com/Complaints.png";
  const ComplaintsSelected = "https://mysltimages.s3.eu-north-1.amazonaws.com/ComplaintsSelected.png";
  const ComplaintsDisabled = "https://mysltimages.s3.eu-north-1.amazonaws.com/ComplaintsDisabled.png";
  const  ComplaintsHover = "https://mysltimages.s3.eu-north-1.amazonaws.com/ComplaintsHover.png";

  const {
    selectedTelephone,
    serviceDetails,
    setLeftMenuItem,
    setSelectedNavbarItem,
    setSelectedQuickAccessItem,
    selectedQuickAccessItem,
  } = useStore();

  const isPrepaid = serviceDetails?.promotionType === "Prepaid";

  const disabledItems = ["Reload", "Complaints"];

  const tileData = [
    {
      key: "Promotion",
      img: Promotion,
      selectedImg: PromotionSelected,
      hoverImg: PromotionHover,
      customStyles: { width: "32px", height: "32px" },
    },
    {
      key: "New Services",
      img: NewServices,
      selectedImg: NewServicesSelected,
      hoverImg: NewServicesHover,
      customStyles: { width: "30px", height: "30px" },
    },
    {
      key: "Digital Life",
      img: DigitalLife,
      selectedImg: DigitalLifeSelected,
      hoverImg: DigitalLifeHover,
      customStyles: { width: "28px", height: "30px" },
    },
    {
      key: isPrepaid ? "Reload" : "Bill",
      img: Bill,
      selectedImg: BillSelected,
      disabledImg: BillDisabled,
      hoverImg: BillHover,
      customStyles: { width: "30px", height: "30px" },
    },
    {
      key: "Hot Devices",
      img: HotDevices,
      selectedImg: HotDevicesSelected,
      hoverImg: HotDevicesHover,
      customStyles: { width: "30px", height: "30px" },
    },
    {
      key: "Complaints",
      img: Complaints,
      selectedImg: ComplaintsSelected,
      disabledImg: ComplaintsDisabled,
      hoverImg: ComplaintsHover,
      customStyles: { width: "30px", height: "28px" },
    },
  ];

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
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        {tileData.map((tile, index) => {
          const disabled = disabledItems.includes(tile.key) && isPrepaid;

          return (
            <Grid item xs={6} key={index}>
              <Button
                onClick={() => {
                  if (tile.key === "Hot Devices") {
                    handleRedirect();
                  } else {
                    setSelectedQuickAccessItem(tile.key);
                    setLeftMenuItem(tile.key);
                    setSelectedNavbarItem("");
                  }
                }}
                onMouseEnter={() => {
                  if (!disabled && selectedItem !== tile.key) setHover(index);
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
                    selectedItem === tile.key ? "#0056A2" : "#FFFFFF",
                  color: selectedItem === tile.key ? "#FFFFFF" : "#0056A2",
                  display: "flex",
                  gap: 1,
                  justifyContent: "start",
                  alignItems: "center",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor:
                      selectedItem !== tile.key ? "#BAD1E6" : "#0056A2",
                    color: selectedItem !== tile.key ? "#DFF0FF" : "#FFFFFF",
                  },
                  "&:disabled": {
                    backgroundColor: "#CCCCCC",
                    color: "#999999",
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
                  {disabled ? (
                    <img
                      src={tile.disabledImg}
                      alt={`${t(tile.key)}-disabled`}
                      style={{
                        ...tile.customStyles,
                        position: "absolute",
                      }}
                    />
                  ) : (
                    <>
                      <img
                        src={tile.img}
                        alt={`${t(tile.key)}-default`}
                        style={{
                          ...tile.customStyles,
                          position: "absolute",
                          opacity:
                            hover === index || selectedItem === tile.key
                              ? 0
                              : 1,
                          transition: "opacity 0.3s ease",
                        }}
                      />
                       <img
                        src={
                          hover === index
                            ? tile.hoverImg
                            : selectedItem === tile.key
                            ? tile.selectedImg
                            : tile.img
                        }
                        alt={`${t(tile.key)}-hover`}
                        style={{
                          ...tile.customStyles,
                          position: "absolute",
                          opacity:
                            hover === index || selectedItem === tile.key
                              ? 1
                              : 0,
                          transition: "opacity 0.3s ease",
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
                  {t(tile.key)}
                </Typography>
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default QuickAccessMenu;