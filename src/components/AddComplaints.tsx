import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import arrow from "../assets/images/arrow.png";
import { textFieldStyle } from "../assets/Themes/CommonStyles";
// Import the API function
import createFaultRequest from "../services/createFaultRequest";
import useStore from "../services/useAppStore";

interface AddComplaintsProps {
  telephoneNo: string;
}

const AddComplaints: React.FC<AddComplaintsProps> = ({ telephoneNo }) => {
  const { serviceDetails } = useStore(); // Fetch serviceDetails from the store
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID; // Get the first serviceID dynamically
  const serviceStatus = serviceDetails?.listofBBService[0]?.serviceStatus; // Get serviceStatus dynamically
  
  const [serviceOption, setServiceOption] = useState("All");
  const [contactNo, setContactNo] = useState("");
  const [faultDescription, setFaultDescription] = useState("");
  const [status, setStatus] = useState(serviceStatus || "");  // Default to serviceStatus if available

  // Dialog States
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true); // Success or failure flag
  const [dialogMessage, setDialogMessage] = useState(""); // Message to show in dialog

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleSubmit = async () => {
    // Log form data before the API call
    console.log("Form Data before API call :", {
      serviceID: serviceID || "undefined",
      telephoneNo: telephoneNo || "undefined",
      serviceOption: serviceOption || "undefined",
      contactNo: contactNo || "undefined",
      faultDescription: faultDescription || "undefined",
      status: status || "undefined",
    });
  
    // Validate required fields
    if (!serviceID || !telephoneNo || !contactNo || !faultDescription || !status) {
      console.error("Validation Error: Missing required fields.");
      setDialogMessage("Please fill in all required fields.");
      setIsSuccess(false);
      setIsDialogOpen(true);
      return;
    }
  
    // Make the API call
    try {
      const response = await createFaultRequest(
        serviceID,
        telephoneNo,
        serviceOption,
        contactNo,
        faultDescription,
        status
      );
  
      if (response?.isSuccess) {
        console.log("Fault request created successfully:", response);
        setDialogMessage("Complaint submitted successfully!");
        setIsSuccess(true);
      } else {
        console.error("Error creating fault request:", response?.errorMessage || "Unknown error");
        setDialogMessage(response?.errorMessage || "Unknown error occurred");
        setIsSuccess(false);
      }
  
      setIsDialogOpen(true); // Open the dialog after API response
    } catch (error) {
      console.error("Exception during API call:", error);
      setDialogMessage("An unexpected error occurred.");
      setIsSuccess(false);
      setIsDialogOpen(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        color: "#0056A2",
        paddingY: 1,
        paddingX: 3,
        borderRadius: "10px",
        boxShadow: "0px 3px 3px #0000004A",
        height: "450px",
      }}
    >
      {/* Header Section */}
      <Typography
        variant="body2"
        align="center"
        sx={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#0056A2",
          marginBottom: "20px",
        }}
      >
        ── Submit Complaint ──
      </Typography>

      {/* Form Content */}
      <Grid container spacing={2}>
        {/* Left Column - Inputs */}
        <Grid item xs={12} sm={6}>
          <Box sx={{ marginBottom: "16px" }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "#0056A2",
                marginBottom: "8px",
              }}
            >
              Service Type
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                ...textFieldStyle(),
              }}
              value={serviceOption}
              onChange={(e) => setServiceOption(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Broadband">Broadband</MenuItem>
              <MenuItem value="PeoTV">PeoTV</MenuItem>
              <MenuItem value="Voice">Voice</MenuItem>
            </TextField>
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
              Contact Number
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                ...textFieldStyle(),
              }}
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
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
              Complaint Description
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{
                ...textFieldStyle(),
              }}
              value={faultDescription}
              onChange={(e) => setFaultDescription(e.target.value)}
            />
          </Box>
        </Grid>

        {/* Right Column - Map Section */}
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              height: "85%",
              backgroundColor: "#F8FAFD",
              padding: "16px",
              borderRadius: "12px",
            }}
          >
            <TextField
              select
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                ...textFieldStyle(40, 250), 
              }}
            />
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126744.08449728298!2d79.81216954042364!3d6.927078400000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259404958c1f9%3A0x4fdf4c34fd426a0f!2sColombo!5e0!3m2!1sen!2slk!4v1699056801524!5m2!1sen!2slk&zoom=13&disableDefaultUI=true&mapTypeControl=false"
              style={{
                border: 0,
                width: "100%",
                height: "80%",
                borderRadius: "8px",
              }}
              allowFullScreen
            ></iframe>
          </Card>
        </Grid>
      </Grid>

      {/* Submit Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "-5px", // Reduced margin to move the button up
        }}
      >
        <Button
          variant="outlined"
          sx={{
            display: "flex",
            gap: 2,
            backgroundColor: "#FFFFFF",
            color: "#0056A2",
            border: "3px solid #0056A2",
            borderRadius: "40px",
            textTransform: "none",
            padding: "6px 14px",
            minWidth: "175px",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: "#EAF2FB",
              borderColor: "#0056A2",
            },
          }}
          onClick={handleSubmit}
        >
          <img src={arrow} alt="Arrow Icon" style={{ width: "24px" }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "600px", fontSize: "20px" }}
          >
            Submit
          </Typography>
        </Button>
      </Box>

      {/* Dialog for displaying API messages */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle sx={{ textAlign: "center", color: isSuccess ? "green" : "red" }}>
          {isSuccess ? "Success" : "Error"}
        </DialogTitle>
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
            {dialogMessage}
            <img
              src={isSuccess ? "https://cdn.dribbble.com/users/39201/screenshots/3694057/nutmeg.gif" : "https://i.gifer.com/Z16w.gif"}
              alt={isSuccess ? "Success" : "Failure"}
              style={{ width: "100px", height: "30px", borderRadius: "10px" }}
            />
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

export default AddComplaints;
