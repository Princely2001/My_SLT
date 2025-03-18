import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import WaterMarkLogo from "../../assets/Images/watermarklogo.png";
import { textFieldStyle } from "../../assets/Themes/CommonStyles";
import callForwardingRequest from "../../services/postpaid/Voice/callForwardingRequest"; // Import the call forwarding API
import checkCallForwardingStatus from "../../services/postpaid/Voice/checkCallForwardingStatus"; // Import the API function

const CallForwarding: React.FC<{ telephoneNo: string }> = ({ telephoneNo }) => {
  const [statusMessage, setStatusMessage] = useState<string>(""); // State for status message
  const [errorMessage, setErrorMessage] = useState<string>(""); // State for error message
  const [dialogOpen, setDialogOpen] = useState<boolean>(false); // State to control dialog visibility
  const [forwardingNumber, setForwardingNumber] = useState<string>(""); // State for forwarding number
  const [currentStatus, setCurrentStatus] = useState<string>(""); // State to store the current status (Y or N)

  useEffect(() => {
    const fetchStatus = async () => {
      const statusResponse = await checkCallForwardingStatus(telephoneNo);
      if (statusResponse) {
        // Check the status from the API response
        const status = statusResponse.status;
        setCurrentStatus(status); // Store the current status
        if (status === "N") {
          setStatusMessage("Call forwarding status failed");
        } else if (status === "Y") {
          setStatusMessage("Call forwarding status Request Success");
        } else {
          setStatusMessage("Unknown status received from API");
        }

        // Check for the error message in the response
        if (statusResponse.errorShow) {
          setErrorMessage(statusResponse.errorShow);
          setDialogOpen(true); 
        }
      } else {
        setErrorMessage("Sorry, the service is temporarily unavailable. Please try again later");
        setDialogOpen(true); // Open the dialog if there is no response from API
      }
    };

    fetchStatus();
  }, [telephoneNo]);

  const handleDialogClose = () => {
    setDialogOpen(false); // Close the dialog
  };

  const handleSubscribeClick = async () => {
    if (!forwardingNumber) {
      setStatusMessage("Please enter a forwarding number.");
      return;
    }

    // Set the requestType based on the current status (Y or N)
    const requestType = currentStatus === "Y" ? "N" : "Y"; 

    // Prepare the data for the API request
    const response = await callForwardingRequest(telephoneNo, forwardingNumber, requestType);

    if (response) {
      if (requestType === "Y") {
        setStatusMessage("Call forwarding has been successfully activated.");
      } else if (requestType === "N") {
        setStatusMessage("Call forwarding has been successfully canceled.");
      }
    } else {
      setStatusMessage("Failed to process the request.");
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        gap: 2,
        flexDirection: "column",
        justifyContent: "start",
        alignContent: "center",
        backgroundColor: "#FFFFFF",
        color: "#0056A2",
        padding: 1,
        borderRadius: "10px",
        height: "65vh",
        boxShadow: "0px 3px 3px #0000004A",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "70%",
          padding: 3,
          backgroundColor: "#FFFFFF",
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontSize: 24, fontWeight: "bold", marginBottom: "32px" }}
        >
          Call Forwarding
        </Typography>
        <Box sx={{ marginBottom: "16px" }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              color: "#0056A2",
              marginBottom: "8px",
            }}
          >
            Your Number
            <Typography
              component="sup"
              sx={{
                color: "red",
                fontWeight: "bold",
                fontSize: "1rem",
                marginLeft: "2px",
              }}
            >
              *
            </Typography>
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={telephoneNo} // Display the passed telephone number
            disabled
            sx={{
              ...textFieldStyle(),
            }}
          />
        </Box>
        <Box sx={{ marginBottom: "16px" }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              color: "#0056A2",
              marginBottom: "8px",
            }}
          >
            Forwarding Number
            <Typography
              component="sup"
              sx={{
                color: "red",
                fontWeight: "bold",
                fontSize: "1rem",
                marginLeft: "2px",
              }}
            >
              *
            </Typography>
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Enter forwarding number"
            value={forwardingNumber}
            onChange={(e) => setForwardingNumber(e.target.value)}
            sx={{
              ...textFieldStyle(),
            }}
          />
        </Box>
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                color: "#0056A2",
                "&.Mui-checked": {
                  color: "#0056A2",
                },
              }}
            />
          }
          label={
            <Typography
              variant="body2"
              sx={{
                color: "#0056A2",
              }}
            >
              <Box
                component="span"
                sx={{
                  color: "#0056A2",
                  padding: "4px 8px",
                  borderRadius: "4px",
                }}
              >
                I agree to the general terms and conditions
              </Box>
            </Typography>
          }
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Button
          variant="contained"
          onClick={handleSubscribeClick} // Handle the button click
          sx={{
            width: "200px",
            backgroundColor: "#ffffff",
            color: "#0056A2",
            borderRadius: "10px",
            border: "2px solid #0056A2",
            mb: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              textTransform: "capitalize",
              fontWeight: 600,
              fontSize: "20px",
            }}
          >
            Subscribe
          </Typography>
        </Button>
      </Box>
      {statusMessage && (
        <Typography
          variant="body2"
          sx={{
            marginTop: 2,
            color: statusMessage.includes("failed") ? "red" : "green",
            fontWeight: "bold",
          }}
        >
          {statusMessage}
        </Typography>
      )}
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

      {/* Dialog for error messages */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogContent>
          <DialogContentText
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "400px",
              height: "50px",
              gap: -10,
              color: "#0056A2",
              fontWeight: "bold",
              fontSize: "10px",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            {errorMessage ? (
              <>
                {errorMessage}
                {/* Failure GIF */}
                <img
                  src="https://i.gifer.com/Z16w.gif"
                  alt="Failure"
                  style={{ width: "30px", height: "18px", borderRadius: "10px" }}
                />
              </>
            ) : (
              <>
                {"Service is working fine."}
                {/* Success GIF */}
                <img
                  src="https://cdn.dribbble.com/users/39201/screenshots/3694057/nutmeg.gif"
                  alt="Success"
                  style={{ width: "100px", height: "30px", borderRadius: "10px" }}
                />
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CallForwarding;
