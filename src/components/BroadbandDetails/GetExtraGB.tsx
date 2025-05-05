import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Checkbox, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import AddToBillImage from "../../assets/Images/subscriptionPageImages/GetExtraGBAdd.jpeg";
import PayNowImage from "../../assets/Images/subscriptionPageImages/GetExtraGBPay.jpeg";
import WatermarkLogo from "../../assets/Images/watermarklogo.png";
import useStore from "../../services/useAppStore";
import fetchPackageDetails from "../../services/postpaid/fetchPackageDetails";
import activatepackagedetails from "../../services/postpaid/activatepackagedetails";
import PaymentServiceRequest from "../../services/billMethod/paybill";

const dataPlans = [
  { range: "1GB to 3GB", pricePerGB: 100 },
  { range: "5GB to 19GB", pricePerGB: 85 },
  { range: "20GB to 49GB", pricePerGB: 75 },
  { range: "Above 50GB", pricePerGB: 60 },
];

interface DataPlanProps {
  packageName: string | null;
}

const GetExtraGbPage: React.FC<DataPlanProps> = ({ packageName }) => {
  const { serviceDetails, userDetails } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;
  const [selectedGB, setSelectedGB] = useState<number | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [packageDetails, setPackageDetails] = useState<any[]>([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"addToBill" | "payNow" | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = (gb: number) => {
    const selectedPlan = packageDetails.find(plan => plan.volume === gb);
    if (selectedPlan) {
      setSelectedGB(gb);
      setSelectedPrice(parseFloat(selectedPlan.postPrice));
    }
  };

  const handleSubmit = async () => {
    // Validate all required fields
    if (!isCheckboxChecked) {
      setErrorMessage("Please agree to the terms and conditions");
      setOpenDialog(true);
      return;
    }

    if (!selectedGB) {
      setErrorMessage("Please select a data package");
      setOpenDialog(true);
      return;
    }

    if (!paymentMethod) {
      setErrorMessage("Please select a payment method");
      setOpenDialog(true);
      return;
    }

    if (!serviceID) {
      setErrorMessage("Service ID not found");
      setOpenDialog(true);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const selectedPlan = packageDetails.find(plan => plan.volume === selectedGB);
      if (!selectedPlan) {
        throw new Error("Selected data package not found");
      }

      if (paymentMethod === "addToBill") {
        // Handle Add to Bill payment method
        const response = await activatepackagedetails(serviceID, selectedPlan.packageId);
        
        if (!response) {
          throw new Error("No response received from server");
        }
        
        if (!response.isSuccess) {
          throw new Error(response.errorMessege || "Failed to add package to your bill");
        }

        setSuccessMessage(response.message || "Package successfully added to your monthly bill");
      } else {
        // Handle Pay Now payment method
        const paymentService = new PaymentServiceRequest();
        const paymentResponse = await paymentService.submitPayment({
          custEmail: userDetails?.email || "",
          contactNumber: userDetails?.mobileNumber || "",
          subscriberID: serviceID,
          packageId: selectedPlan.packageId,
          reciever: serviceID,
          vpc_Amount: `${selectedPrice?.toFixed(2) || "0.00"}`
        });

        if (!paymentResponse.success) {
          throw new Error(paymentResponse.error || "Payment processing failed");
        }

        setSuccessMessage(paymentResponse.message || "Payment processed successfully! Your package will be activated shortly.");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setOpenDialog(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (serviceID && packageName) {
        try {
          const response = await fetchPackageDetails(serviceID, packageName);
          if (response && response.length > 0) {
            setPackageDetails(response);
          } else {
            console.error("No package details found");
          }
        } catch (error) {
          console.error("Failed to fetch package details:", error);
          setErrorMessage("Failed to load package options. Please try again later.");
          setOpenDialog(true);
        }
      }
    };

    fetchData();
  }, [serviceID, packageName]);

  const handleDialogClose = () => {
    setOpenDialog(false);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        color: "#0056A2",
        padding: 2,
        borderRadius: "10px",
        boxShadow: "0px 3px 3px #0000004A",
        minHeight: "500px",
        gap: 2,
      }}
    >
      {/* Left Section - Price Plan */}
      <Box
        sx={{
          flex: 1,
          padding: { xs: 2, md: 4 },
          width: { xs: "100%", md: "50%" },
        }}
      >
        <Typography variant="h6" sx={{ color: "#0056A2", fontWeight: "bold", mb: 2, fontSize: "25px" }}>
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
            <Typography sx={{ color: "#0056A2", fontSize: "16px", fontWeight: "bold" }}>
              {plan.range}
            </Typography>
            <Typography sx={{ color: "#0056A2", fontSize: "16px", fontWeight: "bold" }}>
              {plan.pricePerGB} LKR Per GB
            </Typography>
          </Box>
        ))}

        {/* Data Buttons */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 3 }}>
          {Array.from({ length: 10 }, (_, i) => i + 1)
            .filter(gb => gb !== 4)
            .concat([15, 20, 25])
            .map((gb) => (
              <Button
                key={gb}
                variant={selectedGB === gb ? "contained" : "outlined"}
                sx={{
                  minWidth: "80px",
                  height: "60px",
                  fontWeight: "bold",
                  border: "2px solid #0056A2",
                  borderRadius: "8px",
                  "&.MuiButton-contained": {
                    backgroundColor: "#0056A2",
                    color: "white",
                  },
                  "&.MuiButton-outlined": {
                    color: "#0056A2",
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
          padding: 3,
          margin: { xs: "10px 0", md: "10px 15px" },
          borderRadius: "8px",
          width: { xs: "90%", md: "35%" },
          position: "relative",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        {/* Package Summary */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgba(5, 125, 232, 0.2)",
            padding: 2,
            borderRadius: "10px",
            marginBottom: 3,
          }}
        >
          <Typography variant="h4" sx={{ color: "#0056A2", fontWeight: "bold" }}>
            {selectedGB || "0"} GB
          </Typography>
          <Typography variant="h6" sx={{ color: "#0056A2", fontWeight: "bold" }}>
            Rs. {selectedPrice ? Math.floor(selectedPrice) : "0"} + Tax
          </Typography>
        </Box>

        {/* Payment Options */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, marginTop: 3 }}>
          <Box
            sx={{
              border: paymentMethod === "addToBill" ? "2px solid #0056A2" : "2px solid transparent",
              borderRadius: "10px",
              padding: "4px",
              transition: "all 0.3s ease",
            }}
          >
            <img
              src={AddToBillImage}
              alt="Add to Bill"
              style={{
                width: "100px",
                height: "auto",
                cursor: "pointer",
                borderRadius: "8px",
                opacity: paymentMethod === "addToBill" ? 1 : 0.7,
              }}
              onClick={() => setPaymentMethod("addToBill")}
            />
          </Box>
          <Box
            sx={{
              border: paymentMethod === "payNow" ? "2px solid #0056A2" : "2px solid transparent",
              borderRadius: "10px",
              padding: "4px",
              transition: "all 0.3s ease",
            }}
          >
            <img
              src={PayNowImage}
              alt="Pay Now"
              style={{
                width: "100px",
                height: "auto",
                cursor: "pointer",
                borderRadius: "8px",
                opacity: paymentMethod === "payNow" ? 1 : 0.7,
              }}
              onClick={() => setPaymentMethod("payNow")}
            />
          </Box>
        </Box>

        {/* Terms and Conditions */}
        <Box sx={{ mt: 4, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Checkbox
              checked={isCheckboxChecked}
              onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
              sx={{
                color: "#0056A2",
                "&.Mui-checked": { color: "#0056A2" },
              }}
            />
            <Typography variant="body2" sx={{ color: "#0056A2" }}>
              I agree to the{" "}
              <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
                general terms and conditions
              </span>
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            disabled={!isCheckboxChecked || !paymentMethod || !selectedGB || isLoading}
            sx={{
              backgroundColor: "#0056A2",
              color: "white",
              py: 1.5,
              borderRadius: "8px",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#003D7A" },
              "&:disabled": { opacity: 0.6 },
            }}
            onClick={handleSubmit}
          >
            {isLoading ? "Processing..." : "Submit"}
          </Button>
        </Box>

        {/* Watermark Logo */}
        <Box sx={{ position: "absolute", right: 16, bottom: 16 }}>
          <img src={WatermarkLogo} alt="Watermark Logo" width={80} />
        </Box>
      </Box>

      {/* Result Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle sx={{ color: errorMessage ? "error.main" : "success.main" }}>
          {errorMessage ? "Error" : "Success"}
        </DialogTitle>
        <DialogContent>
          <Typography>{errorMessage || successMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleDialogClose} 
            sx={{ color: "#0056A2", fontWeight: "bold" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GetExtraGbPage;