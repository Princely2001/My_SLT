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
  CircularProgress,
  useMediaQuery,
  useTheme,
  Divider
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import useStore from "../../services/useAppStore";

// Dark theme color scheme
const colorScheme = {
  primaryDark: '#0A192F',         // Navy blue
  primaryLight: '#172A45',        // Lighter navy
  accent: '#64FFDA',              // Teal accent
  secondaryAccent: '#8892B0',     // Light gray-blue
  highlight: 'rgba(100, 255, 218, 0.1)',
  textPrimary: '#CCD6F6',         // Light blue-gray
  textSecondary: '#E6F1FF',       // Bright white-blue
  divider: '#1E2A3A',             // Dark divider
  cardBg: '#112240',              // Dark card background
  buttonGradient: 'linear-gradient(135deg, #64FFDA 0%, #8892B0 100%)',
  navbarBg: '#0A192F',            // Dark navbar
  white: '#FFFFFF',
  dark: '#020C1B',                // Very dark blue
  errorRed: '#FF5555',
  successGreen: '#50FA7B'
};

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
  onBack: () => void;
}

const GetExtraGbPage: React.FC<DataPlanProps> = ({ packageName, onBack }) => {
  const { serviceDetails, selectedTelephone } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;
  const storedEmail = localStorage.getItem("username");
  
  const [selectedGB, setSelectedGB] = useState<number | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"addToBill" | "payNow" | null>(null);
  const [packageDetails, setPackageDetails] = useState<PackageDetail[]>([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const mockPackageDetails: PackageDetail[] = [
          { volume: 1, postPrice: "100.00", packageId: "EXTRA1GB" },
          { volume: 2, postPrice: "200.00", packageId: "EXTRA2GB" },
          { volume: 3, postPrice: "300.00", packageId: "EXTRA3GB" },
          { volume: 5, postPrice: "425.00", packageId: "EXTRA5GB" },
          { volume: 10, postPrice: "850.00", packageId: "EXTRA10GB" },
          { volume: 15, postPrice: "1275.00", packageId: "EXTRA15GB" },
          { volume: 20, postPrice: "1500.00", packageId: "EXTRA20GB" },
          { volume: 25, postPrice: "1875.00", packageId: "EXTRA25GB" },
        ];
        setPackageDetails(mockPackageDetails);
      } catch (error) {
        setErrorMessage("Failed to load package options");
        setOpenDialog(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (serviceID && packageName) {
      fetchData();
    }
  }, [serviceID, packageName]);

  const handleSelect = (gb: number) => {
    const selectedPlan = packageDetails.find(plan => plan.volume === gb);
    if (selectedPlan) {
      setSelectedGB(gb);
      setSelectedPrice(parseFloat(selectedPlan.postPrice));
    }
  };

  const handleSubmit = async () => {
    if (!isCheckboxChecked || !selectedGB || !paymentMethod || !serviceID) {
      setErrorMessage("Please select all required options");
      setOpenDialog(true);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const selectedPlan = packageDetails.find(plan => plan.volume === selectedGB);
      if (!selectedPlan) throw new Error("Selected plan not found");

      if (paymentMethod === "addToBill") {
        const mockResponse = {
          isSuccess: true,
          message: "Package added to your bill successfully"
        };
        
        if (!mockResponse.isSuccess) {
          throw new Error("Failed to add to bill");
        }

        setSuccessMessage(mockResponse.message);
      } else {
        const paymentData = {
          CustEmail: storedEmail,
          ContactNumber: selectedTelephone,
          subscriberID: serviceID,
          prepaidID: serviceID,
          reciever: serviceID,
          packageId: selectedPlan.packageId,
          channel: "SLTPRE",
          commitUser: "OmniAPP",
          reporterPackage: selectedPlan.packageId,
          activatedBy: serviceID,
          callbackURLSLT: "", 
        };

        console.log("Payment data:", paymentData);
        setSuccessMessage("Redirecting to payment gateway...");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An unexpected error occurred");
    } finally {
      setOpenDialog(true);
      setIsLoading(false);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg,rgb(13, 54, 90) 0%,rgb(25, 71, 114) 100%)",
        color: colorScheme.textPrimary,
        padding: 2,
        borderRadius: "10px",
        boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.3)",
        minHeight: "500px",
        position: "relative",
      }}
    >
      {/* Header with back button */}
      <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 0.5 : 0,
        mb: 1.5,
        background: 'rgb(15, 45, 72)',
        borderRadius: '8px',
        padding: isMobile ? '8px' : '8px 16px',
        justifyContent: 'space-between',
        minHeight: '48px',
        height: 'auto',
        alignItems: 'center'
      }}>
       <Button
  startIcon={<ArrowBack />}
  onClick={onBack}
  sx={{
    alignSelf: 'flex-start',
    color: 'rgba(237, 240, 243, 0.9)', // Brighter text for better visibility
    zIndex: 2,
    transition: 'all 0.3s ease',
    px: 2,
    py: 1,
    borderRadius: '10px',
    backgroundColor: 'transparent',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 700,
    minWidth: 'auto',
    '&:hover': {
      backgroundColor: 'rgba(0, 168, 232, 0.15)', // Slightly more visible hover
      transform: 'translateX(-5px)',
      boxShadow: '0 0 12px rgba(0, 168, 232, 0.3)' // Soft blue glow effect
    },
    '& .MuiSvgIcon-root': {
      transition: 'all 0.3s ease',
      fontSize: '1.25rem',
      color: 'rgba(237, 240, 243, 0.9)' // Matching icon color
    },
    '&:hover .MuiSvgIcon-root': {
      transform: 'translateX(-3px)'
    },
    // Added responsive adjustments
    '@media (max-width: 600px)': {
      px: 1.5,
      py: 0.75,
      fontSize: '0.9rem',
      '& .MuiSvgIcon-root': {
        fontSize: '1.1rem'
      }
    }
  }}
>
Get Extra Data
</Button>
        <Typography variant="h6" sx={{ 
          color:  'rgba(237, 240, 243, 0.7)',
          fontWeight: 600,
          fontSize: isMobile ? '1.1rem' : '1.3rem'
        }}>
         
        </Typography>
        <Box sx={{ width: isMobile ? 0 : 100 }} /> {/* Spacer for alignment */}
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          width: '100%',
          display: "flex", 
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          padding: 1,
        }}
      >
        {/* Left Section - Price Plan */}
        <Box
          sx={{
            flex: 1,
            p: 2,
            background: 'linear-gradient(90deg, transparent, rgba(12, 62, 62, 0.2), transparent)',
            borderRadius: '8px',
            border: `1px solid ${colorScheme.divider}`,
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            mb: 2,
            color: 'rgba(237, 240, 243, 0.7)',
            borderBottom: `1px solid ${colorScheme.divider}`,
            pb: 1,
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
                backgroundColor: colorScheme.primaryLight,
                borderRadius: "6px",
                boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Typography sx={{ 
                color:  'rgba(237, 240, 243, 0.7)', 
                fontSize: "14px", 
                fontWeight: 500 
              }}>
                {plan.range}
              </Typography>
              <Typography sx={{ 
                color: 'rgba(237, 240, 243, 0.7)', 
                fontSize: "14px", 
                fontWeight: 600 
              }}>
                {plan.pricePerGB} LKR/GB
              </Typography>
            </Box>
          ))}

          {/* Data Buttons */}
          <Box sx={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: 1, 
            marginTop: 2,
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
                    minWidth: "60px",
                    height: "40px",
                    fontWeight: "bold",
                    fontSize: '12px',
                    border: `1px solid ${'rgba(237, 240, 243, 0.7)'}`,
                    borderRadius: "4px",
                    "&.MuiButton-contained": {
                      background: 'rgba(237, 240, 243, 0.7)',
                      color: colorScheme.dark,
                    },
                    "&.MuiButton-outlined": {
                      color: 'rgba(237, 240, 243, 0.7)',
                      "&:hover": {
                        border: `1px solid ${'rgba(237, 240, 243, 0.7)'}`,
                        color: 'rgba(237, 240, 243, 0.7)',
                        backgroundColor: colorScheme.highlight
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
            width: isMobile ? '100%' : '35%',
            p: 2,
            background: 'linear-gradient(90deg, transparent, rgba(12, 62, 62, 0.2), transparent)',
            borderRadius: '8px',
            border: `1px solid ${colorScheme.divider}`,
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Package Summary */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 1.5,
              borderRadius: "6px",
              marginBottom: 2,
              background: colorScheme.primaryLight,
              border: `1px solid ${'rgba(237, 240, 243, 0.7)'}`,
            }}
          >
            <Typography variant="h5" sx={{ 
              color: 'rgba(237, 240, 243, 0.7)',
              fontWeight: "bold",
              fontSize: "20px"
            }}>
              {selectedGB || "0"} GB
            </Typography>
            <Typography variant="h6" sx={{ 
              color: 'rgba(237, 240, 243, 0.7)',
              fontWeight: "bold",
              fontSize: "16px"
            }}>
              Rs. {selectedPrice ? Math.floor(selectedPrice) : "0"} + Tax
            </Typography>
          </Box>

          {/* Payment Options */}
          <Typography variant="body1" sx={{ 
            color: colorScheme.textPrimary,
            mb: 1,
            fontWeight: 500,
            fontSize: '14px'
          }}>
            Select Payment Method
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: 1, 
            marginTop: 1,
            marginBottom: 2,
          }}>
            <Button
              variant={paymentMethod === "payNow" ? "contained" : "outlined"}
              onClick={() => !isLoading && setPaymentMethod("payNow")}
              sx={{
                py: 1,
                borderRadius: '4px',
                fontWeight: 600,
                fontSize: '14px',
                ...(paymentMethod === "payNow" ? {
                  background: 'rgba(237, 240, 243, 0.7)',
                  color: colorScheme.dark,
                } : {
                  color: 'rgba(237, 240, 243, 0.7)',
                  border: `1px solid ${colorScheme.accent}`,
                  background: 'transparent',
                })
              }}
            >
              Pay Now
            </Button>
          </Box>

          <Divider sx={{ 
            my: 1, 
            borderColor: colorScheme.divider
          }} />

          {/* Terms and Conditions */}
            {/* Terms and Conditions */}
            <Box sx={{ mt: 2, mb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Checkbox
                checked={isCheckboxChecked}
                onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                disabled={isLoading}
                sx={{
                  color: colorScheme.accent,
                  "&.Mui-checked": { 
                    color: colorScheme.accent,
                  },
                  padding: '4px',
                  '& .MuiSvgIcon-root': {
                    fontSize: '20px'
                  }
                }}
              />
              <Typography variant="body2" sx={{ 
                color: colorScheme.textPrimary, 
                fontSize: '12px' 
              }}>
                I agree to the{" "}
                <span style={{ 
                  color: colorScheme.accent,
                  fontWeight: "bold", 
                  textDecoration: "underline", 
                  cursor: "pointer" 
                }}>
                  terms and conditions
                </span>
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              disabled={!isCheckboxChecked || !paymentMethod || !selectedGB || isLoading}
              sx={{
                background: 'rgba(65, 105, 145, 0.7)',
                color: colorScheme.white,
                py: 1.5,
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: '14px',
                "&:hover": {
                  opacity: 0.9
                },
                "&:disabled": { 
                  background: colorScheme.divider,
                  color: colorScheme.textSecondary
                },
              }}
              onClick={handleSubmit}
            >
              {isLoading ? <CircularProgress size={20} color="inherit" /> : "Submit"}
            </Button>
          </Box>
        </Box>
      </Box>
        
    

      {/* Result Dialog */}
      <Dialog 
  open={openDialog} 
  onClose={handleDialogClose}
  PaperProps={{
    sx: {
      background: `linear-gradient(135deg, ${colorScheme.primaryDark} 0%, ${colorScheme.primaryLight} 100%)`,
      color: colorScheme.textPrimary,
      borderRadius: '16px',
      border: `1px solid ${colorScheme.divider}`,
      minWidth: isMobile ? '90vw' : '400px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: `linear-gradient(90deg, ${colorScheme.accent}, ${colorScheme.secondaryAccent})`,
        opacity: 0.8
      }
    }
  }}
>
  <DialogTitle sx={{ 
    background: errorMessage ? 'rgba(244, 67, 54, 0.2)' : 'rgba(76, 175, 80, 0.2)',
    borderBottom: `1px solid ${colorScheme.divider}`,
    fontWeight: 700,
    letterSpacing: "0.5px",
    color: colorScheme.textPrimary,
    fontSize: '18px',
    py: 2
  }}>
    {errorMessage ? "Error" : "Success"}
  </DialogTitle>
  
  <DialogContent sx={{ py: 3, px: 3 }}>
    <Typography sx={{ 
      color: colorScheme.textPrimary, 
      fontSize: '15px',
      lineHeight: 1.6,
      mb: 2
    }}>
      {errorMessage || successMessage}
    </Typography>
  </DialogContent>
  
  <DialogActions
    sx={{
      p: 2,
      background: "rgba(0, 0, 0, 0.1)",
      borderTop: `1px solid ${colorScheme.divider}`
    }}
  >
    <Button 
      onClick={handleDialogClose} 
      sx={{ 
        color: colorScheme.textSecondary,
        borderRadius: "20px",
        px: 3,
        border: `1px solid ${colorScheme.divider}`,
        fontWeight: 600,
        textTransform: 'none',
        fontSize: '14px',
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: `0 0 8px rgba(255, 255, 255, 0.1)`
        }
      }}
    >
      Close
    </Button>
    
    {!errorMessage && (
      <Button 
        onClick={handleDialogClose} 
        sx={{ 
          background: 'rgba(38, 73, 109, 0.7)',
          color: colorScheme.white,
          borderRadius: "20px",
          px: 3,
          fontWeight: 700,
          textTransform: 'none',
          fontSize: '14px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          '&:hover': { 
            opacity: 0.9,
            boxShadow: `0 0 16px ${colorScheme.glowEffect}`
          }
        }}
      >
        Continue
      </Button>
    )}
  </DialogActions>
</Dialog>
    </Box>
  );
};

export default GetExtraGbPage;