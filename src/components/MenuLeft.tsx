import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover,
  Typography,
  Box,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useStore from "../services/useAppStore";
import { useTranslation } from "react-i18next";

const MenuLeft: React.FC = () => {
  const {
    serviceDetails,
    setLeftMenuItem,
    selectedLeftMenuItem,
    selectedNavbarItem,
    detailReportAvailability,
  } = useStore();

  const { t } = useTranslation();

  const isPrepaid: boolean =
    serviceDetails?.promotionType === "Prepaid" ||
    serviceDetails?.promotionType === null;

  const postPaidItems: string[] = [
    "Summary",
    "Daily Usage",
    "Gift Data",
    "History",
    "Redeem Data",
    "Happy Day",
    "More",
  ];
  const prePaidItems: string[] = ["Main Packages", "Data Add-Ons"];
  const broadbandItems: string[] = isPrepaid ? prePaidItems : postPaidItems;
  const peoTVItems: string[] = ["My Package", "VOD", "PEOTVGO", "Packages"];
  const voiceItems: string[] = ["My Package", "Call Forwarding"];

  let items: string[];
  if (selectedNavbarItem === "Broadband") {
    items = broadbandItems;
  } else if (selectedNavbarItem === "PeoTV") {
    items = peoTVItems;
  } else {
    items = voiceItems;
  }

  const [selectedItem, setSelectedItem] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [mousePosition, setMousePosition] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  useEffect(() => {
    if (isPrepaid && selectedNavbarItem === "Broadband") {
      setSelectedItem("");
      setLeftMenuItem("Summary");
    } else if (!isPrepaid && selectedNavbarItem === "Broadband") {
      setSelectedItem("Summary");
      setLeftMenuItem("Summary");
    } else if (
      selectedNavbarItem === "PeoTV" ||
      selectedNavbarItem === "Voice"
    ) {
      setSelectedItem("My Package");
      setLeftMenuItem("My Package");
    }
  }, [isPrepaid]);

  useEffect(() => {
    setSelectedItem(selectedLeftMenuItem);
  }, [selectedLeftMenuItem]);

  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setMousePosition({ mouseX: event.clientX, mouseY: event.clientY });
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMousePosition(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "more-popover" : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: "column",
        color: "#FFFFFF1A",
        padding: 1,
        borderRadius: "10px",
        boxShadow: "0px 3px 3px #0000004A",
        maxHeight: "500px",
      }}
    >
      {items.map((item, index) => (
        <Button
          key={index}
          sx={{
            backgroundColor: item === selectedItem ? "#FFFFFF" : "#FFFFFF40",
            border:
              item === selectedItem
                ? "3px solid #50B748"
                : "1px solid #FFFFFFA6",
            borderRadius: "10px",
            padding: 1.5,
            "&:hover": {
              backgroundColor:
                item === selectedItem ? "#FFFFFF" : "#FFFFFF80",
              borderColor: "#50B748",
            },
          }}
          onClick={(event) => {
            if (item === "More") {
              handleMoreClick(event);
            } else {
              setSelectedItem(item);
              setLeftMenuItem(item);
            }
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: "16px",
              color: item === selectedItem ? "#50B748" : "#FFFFFF",
              textTransform: "capitalize",
              fontWeight: item === selectedItem ? 700 : 600,
            }}
          >
            {t(item)}
          </Typography>
        </Button>
      ))}

      {/* Popover for the More Button */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          mousePosition
            ? { top: mousePosition.mouseY + 10, left: mousePosition.mouseX }
            : undefined
        }
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#f5f5f5",
            minWidth: 200,
            padding: 0,
            color: "#333",
          },
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleClose();
                setLeftMenuItem(
                  detailReportAvailability
                    ? "DisableDetailReport"
                    : "Subscription"
                );
              }}
            >
              <ListItemText>
                <Typography
                  variant="body2"
                  sx={{ color: "#00256A", fontSize: 16 }}
                >
                  {t(
                    detailReportAvailability
                      ? "Disable Detailed Report"
                      : "Enable Detailed Report"
                  )}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleClose();
                setLeftMenuItem("ContactInformationChange");
              }}
            >
              <ListItemText>
                <Typography
                  variant="body2"
                  sx={{ color: "#00256A", fontSize: 16 }}
                >
                  {t("Change Contact Information")}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleClose();
                setLeftMenuItem("BroadbandPasswordChange");
              }}
            >
              <ListItemText>
                <Typography
                  variant="body2"
                  sx={{ color: "#00256A", fontSize: 16 }}
                >
                  {t("Change Broadband Password")}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </Box>
  );
};

export default MenuLeft;
