import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Checkbox, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

// Replace with your image paths
import AddToBillImage from "../../assets/Images/subscriptionPageImages/GetExtraGBAdd.jpeg";
import PayNowImage from "../../assets/Images/subscriptionPageImages/GetExtraGBPay.jpeg";
import WatermarkLogo from "../../assets/Images/watermarklogo.png";
import useStore from "../../services/useAppStore";
import fetchPackageDetails from "../../services/postpaid/fetchPackageDetails";
import activatepackagedetails from "../../services/postpaid/activatepackagedetails";
//import { GetExtraGBActivateResponse } from "../../services/postpaid/activatepackagedetails";


const dataPlans = [
  { range: "1GB to 3GB", pricePerGB: 100 },
  { range: "5GB to 19GB", pricePerGB: 85 },
  { range: "20GB to 49GB", pricePerGB: 75 },
  { range: "Above 50GB", pricePerGB: 60 },
];

interface DataPlanProps {
  packageName: string | null;
}

interface GetExtraGBActivateResponse {
  errorMessage: string;
  success: boolean;
  error?: string; // Optional error field if response contains an error
  message?: string; // Optional message for success/failure
}

const GetExtraGbPage: React.FC<DataPlanProps> = ({ packageName }) => {
  const { serviceDetails } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;
  const [selectedGB, setSelectedGB] = useState<number | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [packageDetails, setPackageDetails] = useState<any[]>([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isAddToBillActive, setIsAddToBillActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
  

  const handleSelect = (gb: number) => {
    const selectedPlan = packageDetails.find(plan => plan.volume === gb);
    if (selectedPlan) {
      setSelectedGB(gb);
      setSelectedPrice(parseFloat(selectedPlan.postPrice));
    }
  };

  const handleSubmit = async () => {
    if (isAddToBillActive && serviceID && selectedGB) {
      const selectedPlan = packageDetails.find(plan => plan.volume === selectedGB);
      if (selectedPlan) {
        const packageId = selectedPlan.packageId;
        try {
          // Ensure the correct type is expected here
          const response = await activatepackagedetails(serviceID, packageId);
  
          // Check if response is valid
          if (!response) {
            setErrorMessage("No response from the server.");
            setOpenDialog(true);
          } else if (response.isSuccess === false) {
            setErrorMessage(response.errorMessege || "Unknown error occurred");
            setOpenDialog(true);
          } else {
            setResponseMessage(response.message || "Package activated successfully!");
          }
        } catch (error) {
          setErrorMessage("An unexpected error occurred. Please try again.");
          setOpenDialog(true);
        }
      }
    }
  };
  
  useEffect(() => {
    if (serviceID && packageName) {
      const fetchPackageDetailsData = async () => {
        const response = await fetchPackageDetails(serviceID, packageName);
        if (response && response.length > 0) {
          console.log("Fetched Package Details:", response);
          setPackageDetails(response); // Save the fetched details correctly
        } else {
          console.error("Failed to fetch package details.");
        }
      };

      fetchPackageDetailsData();
    }
  }, [serviceID, packageName]);

  const handleDialogClose = () => {
    setOpenDialog(false); // Close the dialog
    setErrorMessage(null); // Clear the error message
  };

  return (
    
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        color: "#0056A2",
        padding: 1,
        borderRadius: "10px",
        boxShadow: "0px 3px 3px #0000004A",
        height: "500px",
      }}
    >
      {/* Left Section - Price Plan */}
      <Box
        sx={{
          flex: 1,
          padding: 4,
          width: "50%",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#0056A2",
            fontWeight: "bold",
            mb: 1,
            fontSize: "25px",
          }}
        >
          Price Plan
        </Typography>
        {dataPlans.map((plan, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 1,
              marginBottom: 1,
              backgroundColor: "rgba(5, 125, 232, 0.3)",
              border: "1px solid #0056A2",
              borderRadius: "10px",
            }}
          >
            <Typography
              sx={{
                color: "#0056A2",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {plan.range}
            </Typography>
            <Typography
              sx={{
                color: "#0056A2",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {plan.pricePerGB} LKR Per GB
            </Typography>
          </Box>
        ))}

        {/* Data Buttons */}
<Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: 2 }}>
  {Array.from({ length: 10 }, (_, i) => i + 1)
    .filter(gb => gb !== 4) 
    .concat([15, 20, 25]) // Add new options here
    .map((gb) => (
      <Button
        key={gb}
        variant={selectedGB === gb ? "contained" : "outlined"}
        sx={{
          backgroundColor: selectedGB === gb ? "#0056A2" : "white",
          color: selectedGB === gb ? "white" : "#0056A2",
          fontSize: "15px",
          height: "60px",
          fontWeight: "bold",
          border: "2px solid #0056A2",
          borderRadius: "8px",
          padding: "3px 6px",
          "&:hover": {
            backgroundColor: "#f0f0f0",
          
          },
        }}
        onClick={() => handleSelect(gb)}
      >
        {gb}GB
      </Button>
    ))}
  
  
</Box>

      </Box>

      {/* Right Section - Subscription Details */}
      <Box
        sx={{
          border: "3px dashed #0056A2",
          padding: 4,
          margin: "10px 15px",
          borderRadius: "8px",
          width: "35%",
        }}
      >
        {selectedGB && selectedPrice ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "rgba(5, 125, 232, 0.3)",
              width: "90%",
              height: "50px",
              padding: 2.5,
              borderRadius: "10px",
              marginBottom: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: "40px", color: "#0056A2", fontWeight: "bold" }}
            >
              {selectedGB} GB
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontSize: "20px", color: "#0056A2", fontWeight: "bold" }}
            >
              Rs. {Math.floor(selectedPrice)} + Tax
            </Typography>
          </Box>
        ) : (
          <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(5, 125, 232, 0.3)",
    width: "90%",
    height: "50px",
    padding: 2.5, // Increased padding
    borderRadius: "10px",
    marginBottom: 3,
    gap: 4, // Add a gap between children
  }}
  >
  <Typography
    variant="h6"
    sx={{
      fontSize: "45px",
      color: "#0056A2",
      fontWeight: "bold",
    }}
  >
    {selectedGB || "1"} GB
    </Typography>
    <Typography
     variant="h6"
      sx={{
      fontSize: "20px",
      color: "#0056A2",
      fontWeight: "bold",
    }}
  >
    Rs. {selectedPrice || "100"} + Tax
    </Typography>
  </Box>

        )}

        {/* Payment Options */}
        <Box
          sx={{
            
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            marginTop: 2,
          }}
        >
       <Box
            sx={{
              backgroundColor: isAddToBillActive ? "#0056A2" : "transparent",
              borderRadius: "10px",
            }}
           
          >
          <img   
            src={AddToBillImage}
            alt="Add to Bill"
            style={{
              width: "100px",
              height: "auto",
              cursor: "pointer",
              borderRadius: "10px",
              border: isAddToBillActive ? "2px solid blue" : "2px solid transparent",
            }} 
            onClick={() => setIsAddToBillActive(true)} // Activate the "Add to Bill" button
          />
          </Box>
          <img
            src={PayNowImage}
            alt="Pay Now"
            style={{
              width: "100px",
              height: "auto",
              cursor: "pointer",
              
             
            }}
          />
        </Box>

        {/* Terms and Conditions */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 4,
            marginTop: 5,
            flexDirection: "column", // Stack elements vertically
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
            checked={isCheckboxChecked}
            onChange={() => setIsCheckboxChecked(!isCheckboxChecked)} // Toggle the checkbox state
           
              sx={{
                color: "#0056A2",
                "&.Mui-checked": {
                  color: "#0056A2",
                },
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontSize: "14px",
                color: "#0056A2",
                whiteSpace: "nowrap",
                
              }}
            >
              I agree to the{" "}
              <span
                style={{
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
              >
                general terms and conditions
              </span>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
             
             
            }}
          >
            <Button
              variant="contained"
              disabled={!isCheckboxChecked} // Disable button if the checkbox is not checked
              sx={{
                zIndex: 2,
                backgroundColor: "white",
                border: "2px solid #0056A2",
                color: "#0056A2",
                textTransform: "none",
                fontSize: "16px",
                padding: "6px 30px",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
               
              }}
              onClick={handleSubmit} // Call handleSubmit on button click
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography>{errorMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
        

        {/* Watermark Logo */}
        <Box sx={{ position: "absolute", zIndex: 1, right: "2%", bottom: "2%" }}>
          <img src={WatermarkLogo} alt="Watermark Logo" />
        </Box>
      </Box>
      
    </Box>
  );
};

export default GetExtraGbPage;