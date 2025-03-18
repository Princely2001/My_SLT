import Box from "@mui/material/Box";
import useStore from "../../services/useAppStore";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import WaterMarkLogo from "../../assets/Images/watermarklogo.png";
import { useEffect, useState } from "react";

const MyPackagePeotv = () => {
  const { serviceDetails, setLeftMenuItem, selectedNavbarItem } = useStore();
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (serviceDetails!.listofPEOService.length == 0) {
      setShowAlert(true);
    }
  }, [serviceDetails, selectedNavbarItem]);
  return (
    <>
      <Dialog open={showAlert} onClose={() => setShowAlert(false)}>
        <DialogTitle>
          <Typography
            variant="body2"
            sx={{ fontSize: "24px", color: "#00256A" }}
          >
            No PEO TV Connection
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body2"
            sx={{ fontSize: "16px", color: "#0056A2" }}
          >
            Seems like you don't have a PEO TV connection. Let's request one!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: "#fff",
              color: "#00256A",
              "&:hover": {
                backgroundColor: "#00256A",
                color: "#ffffff",
              },
            }}
            onClick={() => {
              setShowAlert(false);
            }}
            color="primary"
          >
            Close
          </Button>
          <Button
            sx={{
              backgroundColor: "#fff",
              color: "#00256A",
              "&:hover": {
                backgroundColor: "#00256A",
                color: "#ffffff",
              },
            }}
            onClick={() => {
              setShowAlert(false);
              setLeftMenuItem("New Services");
            }}
            color="primary"
            autoFocus
          >
            Request Now
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "65vh",
          backgroundColor: "white",
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            margin: "auto",
            border: "3px dashed #0056A2",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            width: "85%",
            height: "80%",
          }}
        >
          {serviceDetails?.listofPEOService &&
          serviceDetails?.listofPEOService.length > 0 ? (
            <>
              <Typography
                variant="body2"
                sx={{
                  color: "#0056A2",
                  fontSize: "20px",
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                {`Service ID : ${serviceDetails?.listofPEOService[0].serviceID}`}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#0056A2",
                  fontSize: "36px",
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                {`${serviceDetails?.listofPEOService[0].packageName}`}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#0056A2", fontSize: "36px" }}
              >
                {`Status : `}
                <Typography
                  variant="body2"
                  component={"span"}
                  sx={{ color: "#4FD745", fontSize: "36px", fontWeight: 600 }}
                >
                  {serviceDetails?.listofPEOService[0].serviceStatus}
                </Typography>
              </Typography>
            </>
          ) : (
            <Typography
              variant="body2"
              sx={{
                color: "#0056A2",
                fontSize: "24px",
                fontWeight: 600,
              }}
            >
              No Data to Show
            </Typography>
          )}
        </Box>
        <Box
          component="img"
          src={WaterMarkLogo}
          alt="Watermark Logo"
          sx={{
            zIndex: 1,
            position: "absolute",
            bottom: 20,
            right: 20,
            width: "200px",
            opacity: 1,
          }}
        />
      </Box>
    </>
  );
};

export default MyPackagePeotv;
