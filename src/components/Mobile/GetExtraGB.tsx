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
import WatermarkLogo from "../../assets/Images/watermarklogo.png";
import useStore from "../../services/useAppStore";
import { keyframes } from '@emotion/react';

// Color Scheme matching ViewDetails
const colorScheme = {
  primaryDark: 'rgb(13, 54, 90)',
  primaryLight: 'rgb(25, 71, 114)',
  accent: 'rgb(0, 168, 232)',
  secondaryAccent: 'rgb(64, 196, 255)',
  highlight: 'rgba(100, 210, 255, 0.3)',
  textPrimary: 'rgba(255, 255, 255, 0.95)',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  divider: 'rgba(255, 255, 255, 0.12)',
  cardBg: 'rgba(18, 63, 102, 0.4)',
  buttonGradient: 'linear-gradient(135deg, rgba(0, 168, 232, 0.9) 0%, rgba(64, 196, 255, 0.9) 100%)',
  navbarBg: 'rgba(13, 54, 90, 0.9)',
  glassEffect: 'rgba(255, 255, 255, 0.05)',
  glowEffect: 'rgba(64, 196, 255, 0.3)'
};

// Animations matching ViewDetails
const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const borderGlow = keyframes`
  0% { border-color: rgba(64, 196, 255, 0.3); }
  50% { border-color: rgba(64, 196, 255, 0.7); }
  100% { border-color: rgba(64, 196, 255, 0.3); }
`;

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
        // Mock data - replace with actual API call
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
        // Mock activation
        const mockResponse = {
          isSuccess: true,
          message: "Package added to your bill successfully"
        };
        
        if (!mockResponse.isSuccess) {
          throw new Error("Failed to add to bill");
        }

        setSuccessMessage(mockResponse.message);
      } else {
        // Prepare payment data
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
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${colorScheme.primaryDark} 0%, ${colorScheme.primaryLight} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
        px: isMobile ? 2 : 4,
        color: colorScheme.textPrimary,
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: colorScheme.buttonGradient,
          zIndex: 1
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          right: '-50%',
          bottom: '-50%',
          background: 'linear-gradient(45deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.03) 100%)',
          animation: `${floatAnimation} 20s infinite linear`,
          zIndex: 0
        }
      }}
    >
      {/* Back Button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={onBack}
        sx={{
          alignSelf: 'flex-start',
          color: colorScheme.textPrimary,
          mb: 4,
          zIndex: 2,
          transition: 'all 0.3s ease',
          px: 2,
          py: 1,
          borderRadius: '8px',
          backgroundColor: 'transparent',
          textTransform: 'none',
          fontSize: '1.25rem',
          fontWeight: 700,
          '&:hover': {
            backgroundColor: 'rgba(0, 168, 232, 0.1)',
            transform: 'translateX(-5px)',
          },
        }}
      >
        Get Extra GB
      </Button>

      {/* Main Content */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '1200px',
          background: colorScheme.cardBg,
          borderRadius: '24px',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          p: isMobile ? 2 : 4,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
          animation: `${fadeIn} 0.5s ease-out`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, rgba(0, 168, 232, 0.1) 0%, rgba(64, 196, 255, 0.05) 100%)`,
            zIndex: -1
          }
        }}
      >
        <Typography variant="h4" sx={{ 
          fontWeight: 700,
          mb: 3,
          color: colorScheme.textPrimary,
          textAlign: 'center',
          background: `linear-gradient(90deg, ${colorScheme.accent}, ${colorScheme.secondaryAccent})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Get Extra Data
        </Typography>

        <Box sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}>
          {/* Left Section - Price Plan */}
          <Box
            sx={{
              flex: 1,
              p: isMobile ? 2 : 3,
              background: colorScheme.cardBg,
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              mb: 2,
              color: colorScheme.textPrimary,
              borderBottom: `1px solid ${colorScheme.divider}`,
              pb: 1,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-1px',
                left: 0,
                width: '40px',
                height: '2px',
                background: colorScheme.accent,
                borderRadius: '2px'
              }
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
                  padding: 1.5,
                  marginBottom: 1.5,
                  backgroundColor: 'rgba(0, 168, 232, 0.1)',
                  border: `1px solid ${colorScheme.secondaryAccent}30`,
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: 'rgba(0, 168, 232, 0.2)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <Typography sx={{ 
                  color: colorScheme.textPrimary, 
                  fontSize: { xs: "14px", md: "16px" }, 
                  fontWeight: 500 
                }}>
                  {plan.range}
                </Typography>
                <Typography sx={{ 
                  color: colorScheme.secondaryAccent, 
                  fontSize: { xs: "14px", md: "16px" }, 
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
                      border: `2px solid ${colorScheme.secondaryAccent}`,
                      borderRadius: "8px",
                      "&.MuiButton-contained": {
                        background: colorScheme.buttonGradient,
                        color: colorScheme.textPrimary,
                        boxShadow: `0 4px 15px ${colorScheme.accent}40`,
                      },
                      "&.MuiButton-outlined": {
                        color: colorScheme.secondaryAccent,
                        "&:hover": {
                          border: `2px solid ${colorScheme.highlight}`,
                          color: colorScheme.highlight
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
              p: isMobile ? 2 : 3,
              background: colorScheme.cardBg,
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              position: 'relative',
            }}
          >
            {/* Package Summary */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                borderRadius: "12px",
                marginBottom: 3,
                background: 'rgba(0, 168, 232, 0.15)',
                border: `1px solid ${colorScheme.secondaryAccent}30`,
              }}
            >
              <Typography variant="h4" sx={{ 
                color: colorScheme.textPrimary,
                fontWeight: "bold",
                fontSize: { xs: "28px", md: "34px" }
              }}>
                {selectedGB || "0"} GB
              </Typography>
              <Typography variant="h6" sx={{ 
                color: colorScheme.secondaryAccent,
                fontWeight: "bold",
                fontSize: { xs: "18px", md: "22px" }
              }}>
                Rs. {selectedPrice ? Math.floor(selectedPrice) : "0"} + Tax
              </Typography>
            </Box>

            {/* Payment Options */}
            <Typography variant="body1" sx={{ 
              color: colorScheme.textPrimary,
              mb: 2,
              fontWeight: 500
            }}>
              Select Payment Method
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 2, 
              marginTop: 2,
              marginBottom: 3,
            }}>
              
              
              <Button
                variant={paymentMethod === "payNow" ? "contained" : "outlined"}
                onClick={() => !isLoading && setPaymentMethod("payNow")}
                sx={{
                  py: 1.5,
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  transition: 'all 0.3s ease',
                  ...(paymentMethod === "payNow" ? {
                    background: colorScheme.buttonGradient,
                    color: colorScheme.textPrimary,
                    boxShadow: `0 4px 15px ${colorScheme.accent}40`,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 6px 20px ${colorScheme.accent}60`
                    }
                  } : {
                    color: colorScheme.secondaryAccent,
                    border: `2px solid ${colorScheme.secondaryAccent}`,
                    background: 'rgba(64, 196, 255, 0.05)',
                    '&:hover': {
                      background: 'rgba(64, 196, 255, 0.15)',
                      borderColor: colorScheme.accent
                    }
                  })
                }}
              >
                Pay Now
              </Button>
            </Box>

            <Divider sx={{ 
              my: 2, 
              background: `linear-gradient(90deg, transparent, ${colorScheme.secondaryAccent}, transparent)`,
              height: '1px'
            }} />

            {/* Terms and Conditions */}
            <Box sx={{ mt: 3, mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Checkbox
                  checked={isCheckboxChecked}
                  onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                  disabled={isLoading}
                  sx={{
                    color: colorScheme.secondaryAccent,
                    "&.Mui-checked": { 
                      color: colorScheme.secondaryAccent,
                    },
                  }}
                />
                <Typography variant="body2" sx={{ color: colorScheme.textSecondary }}>
                  I agree to the{" "}
                  <span style={{ 
                    color: colorScheme.secondaryAccent,
                    fontWeight: "bold", 
                    textDecoration: "underline", 
                    cursor: "pointer" 
                  }}>
                    general terms and conditions
                  </span>
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                disabled={!isCheckboxChecked || !paymentMethod || !selectedGB || isLoading}
                sx={{
                  background: colorScheme.buttonGradient,
                  color: colorScheme.textPrimary,
                  py: 1.5,
                  borderRadius: "12px",
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 8px 20px ${colorScheme.accent}50`
                  },
                  "&:disabled": { 
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.3)'
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
              opacity: 0.2
            }}>
              <img src={WatermarkLogo} alt="Watermark Logo" width={80} />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Result Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleDialogClose}
        PaperProps={{
          sx: {
            background: colorScheme.cardBg,
            border: `1px solid ${colorScheme.divider}`,
            borderRadius: '12px',
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ 
          background: colorScheme.buttonGradient,
          color: colorScheme.textPrimary,
          fontWeight: "bold"
        }}>
          {errorMessage ? "Error" : "Success"}
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Typography sx={{ color: colorScheme.textPrimary }}>
            {errorMessage || successMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleDialogClose} 
            sx={{ 
              color: colorScheme.secondaryAccent,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: 'rgba(0, 168, 232, 0.1)'
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Decorative elements */}
      <Box sx={{
        position: 'absolute',
        top: '15%',
        left: '5%',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${colorScheme.accent}10 0%, ${colorScheme.accent}00 70%)`,
        animation: `${floatAnimation} 12s infinite ease-in-out`,
        zIndex: 0,
        filter: 'blur(1px)'
      }} />
      
      <Box sx={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${colorScheme.secondaryAccent}10 0%, ${colorScheme.secondaryAccent}00 70%)`,
        animation: `${floatAnimation} 15s infinite ease-in-out`,
        animationDelay: '2s',
        zIndex: 0,
        filter: 'blur(1px)'
      }} />
    </Box>
  );
};

export default GetExtraGbPage;