import { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import useStore from "../../services/useAppStore";
import WaterMarkLogo from "../../assets/Images/watermarklogo.png";

const VideoOnDemand = () => {
  const { serviceDetails, setLeftMenuItem, selectedNavbarItem } = useStore();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!serviceDetails?.listofVODService?.length) {
      setShowAlert(true);
    }
  }, [serviceDetails, selectedNavbarItem]);

  const handleCloseAlert = () => setShowAlert(false);

  return (
    <>
      {/* Alert Dialog */}
      <Dialog open={showAlert} onClose={handleCloseAlert}>
        <DialogTitle>
          <Typography variant="body2" sx={{ fontSize: "24px", color: "#00256A" }}>
            No Video On Demand Service
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ fontSize: "16px", color: "#0056A2" }}>
            You don't have a VOD service subscription. Subscribe now!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button sx={buttonStyle} onClick={handleCloseAlert} color="primary">
            Close
          </Button>
          <Button
  sx={buttonStyle}
  onClick={() => {
    handleCloseAlert();
    setLeftMenuItem("New Services");
    window.open("https://www.slt.lk/en/personal/peo-tv/vod", "_blank");
  }}
  color="primary"
  autoFocus
>
  Subscribe Now
</Button>

        </DialogActions>
      </Dialog>

      {/* Main Content Box */}
      <Box sx={containerStyle}>
        <Box sx={contentBoxStyle}>
          {serviceDetails?.listofVODService?.length > 0 ? (
            <>
              <Typography variant="body2" sx={textStyle}>
                {`Service ID : ${serviceDetails.listofVODService[0].serviceID}`}
              </Typography>
              <Typography variant="body2" sx={{ ...textStyle, fontSize: "36px" }}>
                {serviceDetails.listofVODService[0].movieTitle}
              </Typography>
              <Typography variant="body2" sx={{ ...textStyle, fontSize: "36px" }}>
                {`Status : `}
                <Typography
                  variant="body2"
                  component={"span"}
                  sx={{ color: "#4FD745", fontSize: "36px", fontWeight: 600 }}
                >
                  {serviceDetails.listofVODService[0].serviceStatus}
                </Typography>
              </Typography>
            </>
          ) : (
            <Typography variant="body2" sx={{ ...textStyle, fontSize: "24px" }}>
              No Videos Available
            </Typography>
          )}
        </Box>

        {/* Watermark Logo */}
        <Box component="img" src={WaterMarkLogo} alt="Watermark Logo" sx={watermarkStyle} />
      </Box>
    </>
  );
};

// Reusable Styles
const buttonStyle = {
  backgroundColor: "#fff",
  color: "#00256A",
  "&:hover": {
    backgroundColor: "#00256A",
    color: "#ffffff",
  },
};

const containerStyle = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "65vh",
  backgroundColor: "white",
  borderRadius: 3,
};

const contentBoxStyle = {
  margin: "auto",
  border: "3px dashed #0056A2",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
  width: "85%",
  height: "80%",
};

const textStyle = {
  color: "#0056A2",
  fontSize: "20px",
  fontWeight: 600,
  mb: 2,
};

const watermarkStyle = {
  zIndex: 1,
  position: "absolute",
  bottom: 20,
  right: 20,
  width: "200px",
  opacity: 1,
};

export default VideoOnDemand;
