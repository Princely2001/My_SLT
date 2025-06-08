import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useState } from "react";

import { textFieldStyle } from "../../assets/Themes/CommonStyles";

import updateContact from "../../services/profile/updateContact";
import useStore from "../../services/useAppStore";

const ChangeContactForm = () => {
  const { serviceDetails } = useStore(); // Fetch serviceDetails from the store
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;
  const WatermarkLogo = "https://mysltimages.s3.eu-north-1.amazonaws.com/watermarklogo.png";

  // State variables to store form inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  
  // State variables for dialog box
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  // Handle form submission
  const handleSubmit = async () => {
    if (!serviceID || !fullName || !email || !mobile) {
      setDialogMessage("Please fill all the fields correctly");
      setDialogOpen(true);
      return;
    }

    try {
      const response = await updateContact(serviceID, email, mobile, fullName);
      if (response) {
        setDialogMessage("Contact updated successfully");
      } else {
        setDialogMessage("Failed to update contact. Please try again.");
      }
    } catch (error) {
      setDialogMessage("Error during contact update. Please try again.");
    }
    setDialogOpen(true);
  };

  // Close the dialog box
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        color: "#0056A2",
        padding: 2,
        borderRadius: "10px",
        height: "65vh",
        boxShadow: "0px 3px 3px #0000004A",
      }}
    >
      <Typography
        variant="body2"
        align="center"
        sx={{ fontSize: "24px", fontWeight: "bold", marginBottom: 4 }}
      >
        Change Contact Information
      </Typography>

      <Box
        sx={{
          border: "1px solid #0056A2",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "95%",
          height: "85%",
          position: "relative",
        }}
      >
        <Card
          sx={{
            height: "85%",
            width: "30%",
            border: "1px solid #0056A2",
            padding: "16px",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            gap: 2, // Add gap between fields
          }}
        >
          {/* Full Name */}
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "#0056A2",
                marginBottom: "8px",
                textAlign: "left",
              }}
            >
              Full Name :
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)} // Update state
              sx={{
                ...textFieldStyle(),
              }}
            />
          </Box>

          {/* Email Address */}
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "#0056A2",
                marginBottom: "8px",
                textAlign: "left",
              }}
            >
              Email Address :
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state
              sx={{
                ...textFieldStyle(),
              }}
            />
          </Box>

          {/* Mobile */}
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "#0056A2",
                marginBottom: "8px",
                textAlign: "left",
              }}
            >
              Mobile :
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)} // Update state
              sx={{
                ...textFieldStyle(),
              }}
            />
          </Box>

          {/* Submit Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            <Button
              variant="outlined"
              onClick={handleSubmit} // Call handleSubmit on button click
              sx={{
                display: "flex",
                gap: 2,
                backgroundColor: "#FFFFFF",
                color: "#0056A2",
                border: "2px solid #0056A2",
                borderRadius: "40px",
                textTransform: "none",
                padding: "6px 14px",
                minWidth: "50%",
                fontWeight: "bold",
                alignItems: "center",
                fontSize: "12",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: "600px", fontSize: "16px" }}
              >
                Submit
              </Typography>
            </Button>
          </Box>
        </Card>
      </Box>

      <Box sx={{ position: "absolute", zIndex: 1, right: "2%", bottom: "2%" }}>
        <img src={WatermarkLogo} alt="Watermark Logo" />
      </Box>

      {/* Dialog box for response messages */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Notification"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChangeContactForm;
