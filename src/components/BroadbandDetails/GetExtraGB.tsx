import React, { useEffect, useState } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Checkbox, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  CircularProgress
} from "@mui/material";
import AddToBillImage from "../../assets/Images/subscriptionPageImages/GetExtraGBAdd.jpeg";
import PayNowImage from "../../assets/Images/subscriptionPageImages/GetExtraGBPay.jpeg";
import WatermarkLogo from "../../assets/Images/watermarklogo.png";
import useStore from "../../services/useAppStore";
import fetchPackageDetails from "../../services/postpaid/fetchPackageDetails";
import activatepackagedetails from "../../services/postpaid/activatepackagedetails";
//import { GetExtraGBActivateResponse } from "../../services/postpaid/activatepackagedetails";



interface DataPlan {
  range: string;
  pricePerGB: number;
}

interface PackageDetail {
  volume: number;
  postPrice: string;
  packageId: string;
}

const dataPlans: DataPlan[] = [
  { range: "1GB to 3GB", pricePerGB: 100 },
  { range: "5GB to 19GB", pricePerGB: 85 },
  { range: "20GB to 49GB", pricePerGB: 75 },
  { range: "Above 50GB", pricePerGB: 60 },
];

interface DataPlanProps {
  packageName: string | null;
}

interface PaymentResponse {
  success: boolean;
  error?: string;
  message?: string;
}


const GetExtraGbPage: React.FC<DataPlanProps> = ({ packageName }) => {
  const { serviceDetails } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;
  const {   selectedTelephone } = useStore();
  
  console.log("🔍 [Init] Service Details:", serviceDetails);
  console.log("🆔 [Init] Service ID:", serviceID);
  
  const [selectedGB, setSelectedGB] = useState<number | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [packageDetails, setPackageDetails] = useState<PackageDetail[]>([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isAddToBillActive, setIsAddToBillActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const storedEmail = localStorage.getItem("username");
  // Logging effects
  useEffect(() => {
    console.log("📦 [Update] Package Details:", packageDetails);
  }, [packageDetails]);

  useEffect(() => {
    console.log("🔄 [State] Selection Updated:", { selectedGB, selectedPrice });
  }, [selectedGB, selectedPrice]);

  useEffect(() => {
    console.log("✅ [State] Checkbox:", isCheckboxChecked);
  }, [isCheckboxChecked]);

  useEffect(() => {
    console.log("💳 [State] Payment Method:", paymentMethod);
  }, [paymentMethod]);

  const handleSelect = (gb: number) => {
    console.log("🖱️ [Action] Selected GB:", gb);
    const selectedPlan = packageDetails.find(plan => plan.volume === gb);
    
    if (selectedPlan) {
      console.log("📄 [Data] Selected Plan:", selectedPlan);
      setSelectedGB(gb);
      setSelectedPrice(parseFloat(selectedPlan.postPrice));
    } else {
      console.warn("⚠️ [Warning] No plan found for GB:", gb);
    }
  };

  const handleSubmit = async () => {
    console.group("🚀 [Action] Form Submission");
    console.log("⏳ [Status] Validation Started");
  
    if (!isCheckboxChecked || !selectedGB || !paymentMethod || !serviceID) {
      console.log(serviceID);
      console.log(selectedGB);
      console.log(selectedTelephone);
      

      console.warn("⚠️ [Validation] Missing:", {
        checkbox: !isCheckboxChecked,
        GB: !selectedGB,
        method: !paymentMethod,
        serviceID: !serviceID
      });
  
      setErrorMessage("Please select all required options");
      setOpenDialog(true);
      console.groupEnd();
      return;
    }
  
    console.log("✅ [Validation] All fields valid");
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
  
    try {
      const selectedPlan = packageDetails.find(plan => plan.volume === selectedGB);
      if (!selectedPlan) throw new Error("[Error] Selected plan not found");
  
      console.log("📦 [Selected Plan ID]:", selectedPlan.packageId);
  
      if (paymentMethod === "addToBill") {
        console.log("📝 [Action] Adding to bill...");
        const response = await activatepackagedetails(serviceID, selectedPlan.packageId);
        console.log("📄 [Response] Activation:", response);
        
        if (!response?.isSuccess) {
          throw new Error(response?.errorShow || response?.errorMessege || "Failed to add to bill");
        }
  
        setSuccessMessage(response?.message || "Package added to your bill successfully");
      } else {
        console.log("💳 [Action] Redirecting to payment gateway...");
       

         // Define payment fields
         const paymentData = {
        
          CustEmail: storedEmail,
          ContactNumber:selectedTelephone,
          subscriberID: serviceID,
          prepaidID:serviceID,
          reciever:  serviceID,
          packageId: selectedPlan.packageId,
          channel: "SLTPRE",
          commitUser: "OmniAPP",
          reporterPackage: selectedPlan.packageId,
          activatedBy: serviceID,
          callbackURLSLT: "", 
        };
  
        // Create form element
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://billpay.slt.lk/bbtopup/summaryallAPImyslt.php";
        form.target = "_self"; // Use "_blank" to open in new tab
  
    


        console.log("📤 [Form Data to be Sent]:", paymentData);
  
        // Append fields to form
        Object.entries(paymentData).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value?.toString() ?? "";
          form.appendChild(input);
        });
  
        // Append and submit the form
        document.body.appendChild(form);
        form.submit();
  
        return; // Exit, since redirection will occur
      }
    } catch (error: any) {
      console.error("❌ [Error] Transaction Failed:", error);
      setErrorMessage(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
      setOpenDialog(true);
      console.log("⏳ [Status] Loading Complete");
      console.groupEnd();
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      console.group("🌐 [API] Fetching Packages");
      if (serviceID && packageName) {
        try {
          console.log("⏳ [Request] Fetching package details...");
          const response = await fetchPackageDetails(serviceID, packageName);
          console.log("✅ [Response] Received:", response);

          if (response && response.length > 0) {
            setPackageDetails(response);
          } else {
            console.warn("⚠️ [Warning] No package details found");
            setErrorMessage("No package options available");
            setOpenDialog(true);
          }
        } catch (error) {
          console.error("❌ [Error] Fetch Failed:", error);
          setErrorMessage("Failed to load package options");
          setOpenDialog(true);
        }
      }
      console.groupEnd();
    };
    fetchData();
  }, [serviceID, packageName]);

  const handleDialogClose = () => {
    console.log("📢 [UI] Closing Dialog");
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
        boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.29)",
        minHeight: "500px",
        gap: 2,
        position: "relative",
        overflow: "hidden",
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
        <Typography variant="h6" sx={{ 
          color: "#0056A2", 
          fontWeight: "bold", 
          mb: 2, 
          fontSize: { xs: "20px", md: "25px" } 
        }}>
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
              backgroundColor: "rgba(5, 125, 232, 0.1)",
              border: "1px solid #0056A2",
              borderRadius: "10px",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(5, 125, 232, 0.2)",
              }
            }}
          >
            <Typography sx={{ 
              color: "#0056A2", 
              fontSize: { xs: "14px", md: "16px" }, 
              fontWeight: "bold" 
            }}>
              {plan.range}
            </Typography>
            <Typography sx={{ 
              color: "#0056A2", 
              fontSize: { xs: "14px", md: "16px" }, 
              fontWeight: "bold" 
            }}>
              {plan.pricePerGB} LKR/GB
            </Typography>
          </Box>
        ))}

        {/* Data Buttons */}
        <Box sx={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: 2, 
          marginTop: 3,
          justifyContent: "center"
        }}>
          {Array.from({ length: 10 }, (_, i) => i + 1)
            .filter(gb => gb !== 4)
            .concat([15, 20, 25])
            .map((gb) => (
              <Button
                key={gb}
                variant={selectedGB === gb ? "contained" : "outlined"}
                sx={{
                  minWidth: { xs: "60px", md: "80px" },
                  height: { xs: "50px", md: "60px" },
                  fontWeight: "bold",
                  border: "2px solid #0056A2",
                  borderRadius: "8px",
                  "&.MuiButton-contained": {
                    backgroundColor: "#0056A2",
                    color: "white",
                  },
                  "&.MuiButton-outlined": {
                    color: "#0056A2",
                    "&:hover": {
                      border: "2px solid #003D7A",
                      color: "#003D7A"
                    }
                  },
                }}
                onClick={() => handleSelect(gb)}
                disabled={isLoading}
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
          backdropFilter: "blur(5px)",
        }}
      >
        {/* Package Summary */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgba(5, 125, 232, 0.1)",
            padding: 2,
            borderRadius: "10px",
            marginBottom: 3,
            border: "1px solid #0056A2",
          }}
        >
          <Typography variant="h4" sx={{ 
            color: "#0056A2", 
            fontWeight: "bold",
            fontSize: { xs: "28px", md: "34px" }
          }}>
            {selectedGB || "0"} GB
          </Typography>
          <Typography variant="h6" sx={{ 
            color: "#0056A2", 
            fontWeight: "bold",
            fontSize: { xs: "18px", md: "22px" }
          }}>
            Rs. {selectedPrice ? Math.floor(selectedPrice) : "0"} + Tax
          </Typography>
        </Box>

        {/* Payment Options */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: 3, 
          marginTop: 3,
          flexDirection: { xs: "column", sm: "row" }
        }}>
          <Box
            sx={{
              border: paymentMethod === "addToBill" ? "2px solid #0056A2" : "2px solid transparent",
              borderRadius: "10px",
              padding: "4px",
              transition: "all 0.3s ease",
              "&:hover": {
                border: "2px solid #0056A2",
                opacity: 1
              }
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
              onClick={() => !isLoading && setPaymentMethod("addToBill")}
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
        <Box sx={{ mt: 4, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Checkbox
              checked={isCheckboxChecked}
              onChange={(e) => {
                console.log("✅ [UI] Checkbox Changed:", e.target.checked);
                setIsCheckboxChecked(e.target.checked);
              }}
              disabled={isLoading}
              sx={{
                color: "#0056A2",
                "&.Mui-checked": { color: "#0056A2" },
              }}
            />
            <Typography variant="body2" sx={{ color: "#0056A2" }}>
              I agree to the{" "}
              <span style={{ fontWeight: "bold", textDecoration: "underline", cursor: "pointer" }}>
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
              "&:disabled": { 
                backgroundColor: "#E0E0E0",
                color: "#A0A0A0"
              },
            }}
            onClick={handleSubmit}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
          </Button>
        </Box>

        {/* Watermark Logo */}
        <Box sx={{ 
          position: "absolute", 
          right: 16, 
          bottom: 16,
          opacity: 0.3
        }}>
          <img src={WatermarkLogo} alt="Watermark Logo" width={80} />
        </Box>
      </Box>

      {/* Result Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle sx={{ 
          color: errorMessage ? "error.main" : "success.main",
          fontWeight: "bold"
        }}>
          {errorMessage ? "Error" : "Success"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {errorMessage || successMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleDialogClose} 
            sx={{ 
              color: "#0056A2", 
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "rgba(0, 86, 162, 0.1)"
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GetExtraGbPage;