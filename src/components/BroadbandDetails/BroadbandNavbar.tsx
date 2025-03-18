import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";

interface BroadbandNavbarProps {
  navbarItems: {
    label: string;
    used?: string | null;
    limit?: string | null;
  }[];
  type: string;
  onSelected: (item: string) => void;
  selected:string;
}

const BroadbandNavbar = ({ navbarItems,type,selected, onSelected }: BroadbandNavbarProps) => {
  const [selectedItem, setSelectedItem] = useState(selected);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onSelected(item);
  };
  return (
    <Box
      sx={{
        display: "flex",
        height: "45px",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        color: "#0056A2",
        backgroundColor: "#ffffff",
        border: "1px solid #0056A252",
        borderRadius: "10px",
      }}
    >
      {navbarItems.map((item, index) => {
        return (
          <Button
            key={index}
            onClick={() => handleItemClick(item.label)}
            sx={{
              height: "90%",
              width: "18%",
              paddingY: 0.25,
              paddingX: 0.2,
              display: "flex",
              flexDirection: "column",
              borderRadius: "10px",
              // border:
              //   selectedItem === item.label ? "3px solid #0056A2" : "none",
              color: selectedItem === item.label ? "#ffffff":"#0056A2",
              backgroundColor:
                selectedItem === item.label ? "#0056A2" : "#transparent",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: item.label === "Home Schooling & WFH" ? "13px" : "15px",
                textTransform: "capitalize",
                fontWeight: 700,
              }}
            >
              {item.label}
            </Typography>
            {type === "Summary" ? (
              <Typography
                variant="body2"
                sx={{
                  fontSize: "10px",
                  textTransform: "capitalize",
                  fontWeight: 700,
                }}
              >
                {item.label === "My Package"
                  ? ""
                  : item.limit || item.used
                  ? `${item.used ?? 0} used from ${item.limit ?? 0} GB`
                  : "N/A"}
              </Typography>
            ) : (
              <Typography
                variant="body2"
                sx={{
                  fontSize: "10px",
                  textTransform: "capitalize",
                  fontWeight: 700,
                }}
              >
                {item.limit}
              </Typography>
            )}
          </Button>
        );
      })}
    </Box>
  );
};

export default BroadbandNavbar;
