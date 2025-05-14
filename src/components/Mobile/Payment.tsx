import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  InputAdornment,
  Fade,
  Slide,
  Zoom,
} from "@mui/material";
import {
  CheckCircle,
  CreditCard,
  Smartphone,
  Loyalty,
  QrCode,
  ArrowBack,
} from "@mui/icons-material";
import { keyframes } from "@emotion/react";

import visa from "../../assets/Images/MobileImages/visa.png";
import mcash from "../../assets/Images/MobileImages/mcash.jpeg";
import rewards from "../../assets/Images/MobileImages/rewards.png";
import lankaQR from "../../assets/Images/MobileImages/lankaQR.jpg";

// Props
interface PaymentProps {
  onBack: () => void;
}

// Shimmer animation
const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

// Color scheme
const colorScheme = {
  primary: "rgb(255, 255, 255)",
  primaryLight: "rgb(250, 250, 250)",
  primaryDark: "rgb(245, 245, 245)",
  accent: "rgb(0, 120, 212)",
  secondaryAccent: "rgb(0, 95, 184)",
  highlight: "rgba(0, 120, 212, 0.1)",
  textPrimary: "rgba(0, 0, 0, 0.87)",
  textSecondary: "rgba(0, 0, 0, 0.6)",
  divider: "rgba(0, 0, 0, 0.12)",
  cardBg: "rgba(255, 255, 255, 0.9)",
  buttonGradient:
    "linear-gradient(135deg, rgba(0, 120, 212, 0.9) 0%, rgba(0, 95, 184, 0.9) 100%)",
  navbarBg: "rgba(255, 255, 255, 0.95)",
  glassEffect: "rgba(255, 255, 255, 0.7)",
  glowEffect: "rgba(0, 120, 212, 0.2)",
  shadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
};

const Payment: React.FC<PaymentProps> = ({ onBack }) => {
  const [selectedNumber, setSelectedNumber] = useState("current");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showOtherNumberField, setShowOtherNumberField] = useState(false);

  useEffect(() => {
    if (selectedNumber === "other") {
      setShowOtherNumberField(true);
    } else {
      const timer = setTimeout(() => setShowOtherNumberField(false), 300);
      return () => clearTimeout(timer);
    }
  }, [selectedNumber]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handleSubmit = () => {
    if (!amount || !paymentMethod) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => setPaymentSuccess(false), 3000);
    }, 2000);
  };

  const paymentMethodImages: { [key: string]: string } = {
    visa,
    mcash,
    rewards,
    lankaQR,
  };

  const paymentMethodLabels: { [key: string]: string } = {
    visa: "Credit/Debit Card",
    mcash: "mCash",
    rewards: "Loyalty Rewards",
    lankaQR: "LankaQR",
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "440px",
        height: "100%",
      }}
    >
      <Box
        sx={{
          flex: 1,
          p: 3,
          display: "flex",
          justifyContent: "center",
          backgroundColor: colorScheme.primaryDark,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1300px",
            backgroundColor: colorScheme.primary,
            borderRadius: "12px",
            boxShadow: colorScheme.shadow,
            overflow: "hidden",
            padding: 3,
            position: "relative",
          }}
        >
          {/* Header with Back Button */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
              position: "relative",
            }}
          >
            <Button
              onClick={onBack}
              sx={{
                minWidth: "auto",
                p: 0.5,
                color: colorScheme.accent,
                "&:hover": {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
              }}
            >
              <ArrowBack sx={{ fontSize: "1.5rem" }} />
            </Button>
            <Box sx={{ flex: 1, textAlign: "center" }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  fontSize: "24px",
                  color: colorScheme.accent,
                }}
              >
                Payment Gateway
              </Typography>
            </Box>
            <Box sx={{ width: "40px" }} />
          </Box>

          {/* Radio Button Selection */}
          <RadioGroup
            row
            value={selectedNumber}
            onChange={(e) => setSelectedNumber(e.target.value)}
          >
            <FormControlLabel
              value="current"
              control={<Radio color="primary" />}
              label="Current Number"
            />
            <FormControlLabel
              value="other"
              control={<Radio color="primary" />}
              label="Other Number"
            />
          </RadioGroup>

          {showOtherNumberField && (
            <Slide
              direction="up"
              in={showOtherNumberField}
              mountOnEnter
              unmountOnExit
            >
              <TextField
                label="Enter Phone Number"
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              />
            </Slide>
          )}

          {/* Amount Input */}
          <TextField
            label="Amount (LKR)"
            variant="outlined"
            type="text"
            value={amount}
            onChange={handleAmountChange}
            fullWidth
            sx={{ mt: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography
                    sx={{ color: colorScheme.textSecondary, fontWeight: 500 }}
                  >
                    Rs.
                  </Typography>
                </InputAdornment>
              ),
            }}
          />

          <Divider sx={{ my: 3 }} />

          {/* Payment Method Grid */}
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, mb: 2, color: colorScheme.textPrimary }}
          >
            Select Payment Method
          </Typography>
          <Grid container spacing={2}>
            {Object.keys(paymentMethodImages).map((method) => (
              <Grid item xs={6} sm={3} key={method}>
                <Paper
                  onClick={() => handlePaymentMethodChange(method)}
                  sx={{
                    height: 200,
                    background: colorScheme.cardBg,
                    color: colorScheme.accent,
                    borderRadius: "12px",
                    p: 2,
                    border: `1px solid ${colorScheme.highlight}`,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      background: colorScheme.highlight,
                      transform: "translateY(-4px)",
                      boxShadow: `0 8px 20px ${colorScheme.glowEffect}`,
                    },
                  }}
                >
                  <img
                    src={paymentMethodImages[method]}
                    alt={method}
                    style={{ height: 50, marginBottom: 8 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: colorScheme.textPrimary,
                      textAlign: "center",
                    }}
                  >
                    {paymentMethodLabels[method]}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Submit Button */}
          <Box sx={{ mt: 4, position: "relative" }}>
            <Zoom in={!paymentSuccess} timeout={300}>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleSubmit}
                disabled={!amount || !paymentMethod || isProcessing}
                sx={{
                  border: `1px solid ${colorScheme.accent}`,
                  color: colorScheme.accent,
                  py: 1,
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "1rem",
                  position: "relative",
                  overflow: "hidden",
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: colorScheme.highlight,
                    transform: "translateY(-2px)",
                    boxShadow: `0 5px 15px ${colorScheme.glowEffect}`,
                    "&::before": { opacity: 1 },
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: colorScheme.glassEffect,
                    opacity: 0,
                    transition: "opacity 0.5s ease",
                    animation: `${shimmer} 2s infinite`,
                  },
                }}
              >
                {isProcessing ? "Processing..." : "Pay Now"}
              </Button>
            </Zoom>

            <Fade in={paymentSuccess} timeout={500}>
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#27ae60",
                  borderRadius: "10px",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1rem",
                  letterSpacing: "1px",
                }}
              >
                <CheckCircle sx={{ mr: 1 }} /> Payment Successful!
              </Box>
            </Fade>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Payment;
