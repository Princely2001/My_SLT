import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import RedeemImage from "../assets/Images/redeem.png";
import WatermarkLogo from "../assets/Images/watermarklogo.png";
import redeemVoucher from "../services/postpaid/redeemVoucher";
import useStore from "../services/useAppStore";
import { textFieldStyle } from "../assets/Themes/CommonStyles";

const Redeem: React.FC = () => {
  const { serviceDetails } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;
  const [voucherId, setVoucherId] = useState("");
  const [loading, setLoading] = useState(false); // To handle loading state
  const [message, setMessage] = useState(""); // To display response messages
  const [isDialogOpen, setIsDialogOpen] = useState(false); // To manage message box visibility
  const [isSuccess, setIsSuccess] = useState(false); // To check if the result is success or error
  const [showMessage, setShowMessage] = useState(false); // To handle delayed message display

  const handleValidate = async () => {
    if (!voucherId) {
      setMessage("Please enter a voucher ID.");
      setIsSuccess(false);
      setIsDialogOpen(true);
      setShowMessage(true);
      return;
    }

    if (!serviceID) {
      setMessage("Service ID is missing. Unable to redeem voucher.");
      setIsSuccess(false);
      setIsDialogOpen(true);
      setShowMessage(true);
      return;
    }

    setLoading(true); // Start loading
    setMessage(""); // Reset the message
    setShowMessage(false); // Initially hide the message
    setIsDialogOpen(true); // Open the dialog

    try {
      const response = await redeemVoucher(serviceID, voucherId);

      if (response?.isSuccess) {
        setMessage(response.dataBundle.message || "Voucher redeemed successfully!");
        setIsSuccess(true);
      } else {
        setMessage(response?.errorShow || "Failed to redeem voucher. Please try again.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("An error occurred while redeeming the voucher:", error);
      setMessage("An unexpected error occurred. Please try again.");
      setIsSuccess(false);
    } finally {
      setLoading(false); // Stop loading
      setShowMessage(true); // Show the message
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false); // Close the message box
    setShowMessage(false); // Reset message visibility
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        gap: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 2,
        borderRadius: "10px",
        height: "450px",
        boxShadow: "0px 3px 3px #0000004A",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="body2"
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#0056A2",
          mb: "10vh",
          fontSize: "16px",
        }}
      >
        Enter the promo code on the voucher to avail yourself of the offer.
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          mb: "8vh",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#0056A2",
            fontSize: "14px",
            lineHeight: 1,
          }}
        >
          Enter your voucher ID:
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            variant="outlined"
            value={voucherId}
            onChange={(e) => setVoucherId(e.target.value)}
            sx={{
              ...textFieldStyle(40, 250)
            }}
          />
        </Box>
      </Box>

      <Button
        variant="contained"
        size="large"
        onClick={handleValidate}
        disabled={loading} // Disable button while loading
        sx={{
          display: "flex",
          justifyContent: "start",
          marginBottom: 2,
          color: "#0056A2",
          backgroundColor: "#FFFFFF",
          border: "2px solid #0056A2",
          height: "60px",
          fontWeight: "bold",
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            borderRight: "3px dashed #0056A270",
            pl: 1,
            pr: 3,
          }}
        >
          <img
            src={RedeemImage}
            style={{ width: "34px", height: "38px" }}
            alt="Redeem Icon"
          />
        </Box>

        <Typography
          variant="body2"
          sx={{
            marginLeft: "20px",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#0056A2",
          }}
        >
          {loading ? "Processing..." : "REDEEM VOUCHER"}
        </Typography>
      </Button>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle
          sx={{
            textAlign: "center",
            color: isSuccess ? "green" : "red",
            padding: "10px 20px",
          }}
        >
          
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "250px",
            height: "50px",
            color: "#0056A2",
            overflow: "hidden",
            padding: 0,
          }}
        >
          {showMessage && (
            <>
              {isSuccess ? (
                <>
                  <img
                    src="https://cdn.dribbble.com/users/39201/screenshots/3694057/nutmeg.gif"
                    alt="Success"
                    style={{ width: "100px", borderRadius: "10px" }}
                  />
                  <Typography variant="body2">{message}</Typography>
                </>
              ) : (
                <>
                  <img
                    src="https://i.gifer.com/Z16w.gif"
                    alt="Error"
                    style={{ width: "30px", height: "20px" }}
                  />
                  <Typography variant="body2">{message}</Typography>
                </>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ position: "absolute", zIndex: 1, right: "2%", bottom: "2%" }}>
        <img src={WatermarkLogo} alt="Watermark Logo" />
      </Box>
    </Box>
  );
};

export default Redeem;
