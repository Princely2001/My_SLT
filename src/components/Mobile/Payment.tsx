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
  Card,
  CardMedia,
  CardContent,
  Divider,
  useTheme,
  Fade,
  Grow,
  Slide,
  Zoom,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  CheckCircle,
  Payment as PaymentIcon,
  CreditCard,
  Smartphone,
  Loyalty,
  QrCode,
} from "@mui/icons-material";

// Import the images for payment methods
import visa from "../../assets/Images/MobileImages/visa.png";
import mcash from "../../assets/Images/MobileImages/mcash.jpeg";
import rewards from "../../assets/Images/MobileImages/rewards.png";
import lankaQR from "../../assets/Images/MobileImages/lankaQR.jpg";

// Light theme color scheme
const colorScheme = {
  primaryLight: "#FFFFFF",
  primaryDark: "#F5F5F7",
  accent: "#1976D2",
  secondaryAccent: "#757575",
  highlight: "rgba(25, 118, 210, 0.1)",
  textPrimary: "#212121",
  textSecondary: "#424242",
  divider: "#E0E0E0",
  cardBg: "#FFFFFF",
  buttonGradient: "linear-gradient(135deg, #1976D2 0%, #2196F3 100%)",
  white: {
    pure: "#FFFFFF",
    soft: "#FAFAFA",
    muted: "rgba(255,255,255,0.9)",
  },
  black: {
    pure: "#000000",
    muted: "rgba(0,0,0,0.7)",
  },
  errorRed: "#D32F2F",
  successGreen: "#388E3C",
  pulseStart: "rgba(25, 118, 210, 0.2)",
  pulseEnd: "rgba(25, 118, 210, 0)",
};

const Payment = () => {
  const [selectedNumber, setSelectedNumber] = useState("current");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showOtherNumberField, setShowOtherNumberField] = useState(false);
  const theme = useTheme();

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

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      // Reset after showing success
      setTimeout(() => {
        setPaymentSuccess(false);
      }, 3000);
    }, 2000);
  };

  useEffect(() => {
    if (selectedNumber === "other") {
      setShowOtherNumberField(true);
    } else {
      const timer = setTimeout(() => setShowOtherNumberField(false), 300);
      return () => clearTimeout(timer);
    }
  }, [selectedNumber]);

  const paymentMethodImages: { [key: string]: string } = {
    visa: visa,
    mcash: mcash,
    rewards: rewards,
    lankaQR: lankaQR,
  };

  const paymentMethodIcons: { [key: string]: JSX.Element } = {
    visa: <CreditCard fontSize="small" />,
    mcash: <Smartphone fontSize="small" />,
    rewards: <Loyalty fontSize="small" />,
    lankaQR: <QrCode fontSize="small" />,
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
        padding: { xs: 2, sm: 3 },
        maxWidth: "500px",
        margin: "auto",
        background: colorScheme.primaryLight,
        borderRadius: "16px",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
        border: `1px solid ${colorScheme.divider}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "repeating-linear-gradient(45deg, rgba(25, 118, 210, 0.03), rgba(25, 118, 210, 0.03) 10px, transparent 10px, transparent 20px)",
          opacity: 0.5,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <Box position="relative" zIndex={1}>
        {/* Payment header with animation */}
        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography
              variant="h5"
              sx={{
                color: colorScheme.textPrimary,
                fontWeight: 700,
                letterSpacing: "1px",
                position: "relative",
                display: "inline-block",
                "&:after": {
                  content: '""',
                  display: "block",
                  width: "60%",
                  height: "4px",
                  background: `linear-gradient(90deg, ${colorScheme.accent}, transparent)`,
                  margin: "8px auto 0",
                  borderRadius: "3px",
                },
              }}
            >
              PAYMENT GATEWAY
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: colorScheme.textSecondary,
                mt: 1,
                fontStyle: "italic",
              }}
            >
              Secure and fast payment processing
            </Typography>
          </Box>
        </Slide>

        {/* Number selection section */}
        <Grow in={true} timeout={500}>
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{
                marginBottom: 1,
                color: colorScheme.textPrimary,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Smartphone fontSize="small" color="primary" /> Select Number
            </Typography>
            <RadioGroup
              row
              value={selectedNumber}
              onChange={(e) => setSelectedNumber(e.target.value)}
              sx={{
                "& .MuiTypography-root": {
                  color: colorScheme.textSecondary,
                  fontSize: "0.9rem",
                },
              }}
            >
              <FormControlLabel
                value="current"
                control={
                  <Radio
                    color="primary"
                    sx={{
                      "&:hover": {
                        backgroundColor: colorScheme.highlight,
                      },
                    }}
                  />
                }
                label="Current Number"
              />
              <FormControlLabel
                value="other"
                control={
                  <Radio
                    color="primary"
                    sx={{
                      "&:hover": {
                        backgroundColor: colorScheme.highlight,
                      },
                    }}
                  />
                }
                label="Other Number"
              />
            </RadioGroup>

            <Slide
              direction="up"
              in={showOtherNumberField}
              mountOnEnter
              unmountOnExit
            >
              <Box sx={{ mt: 1 }}>
                <TextField
                  label="Enter Phone Number"
                  variant="outlined"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: colorScheme.divider,
                        transition: "border-color 0.3s ease",
                      },
                      "&:hover fieldset": {
                        borderColor: colorScheme.accent,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: colorScheme.accent,
                        boxShadow: `0 0 0 2px ${colorScheme.highlight}`,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: colorScheme.secondaryAccent,
                    },
                    "& .MuiInputBase-input": {
                      color: colorScheme.textPrimary,
                    },
                  }}
                />
              </Box>
            </Slide>
          </Box>
        </Grow>

        {/* Amount input with pulse animation when focused */}
        <Grow in={true} timeout={700}>
          <Box sx={{ mb: 3 }}>
            <TextField
              label="Amount (LKR)"
              variant="outlined"
              type="text"
              value={amount}
              onChange={handleAmountChange}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: colorScheme.divider,
                  },
                  "&:hover fieldset": {
                    borderColor: colorScheme.accent,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: colorScheme.accent,
                    animation: "pulse 2s infinite",
                    "@keyframes pulse": {
                      "0%": { boxShadow: `0 0 0 0 ${colorScheme.pulseStart}` },
                      "70%": {
                        boxShadow: `0 0 0 10px ${colorScheme.pulseEnd}`,
                      },
                      "100%": { boxShadow: `0 0 0 0 ${colorScheme.pulseEnd}` },
                    },
                  },
                },
                "& .MuiInputLabel-root": {
                  color: colorScheme.secondaryAccent,
                },
                "& .MuiInputBase-input": {
                  color: colorScheme.textPrimary,
                  fontSize: "1.2rem",
                  fontWeight: 500,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography
                      sx={{
                        color: colorScheme.textSecondary,
                        fontWeight: 500,
                      }}
                    >
                      Rs.
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Grow>

        <Divider
          sx={{
            borderColor: colorScheme.divider,
            my: 2,
            borderBottomWidth: "1px",
          }}
        />

        {/* Payment method selection with staggered animations */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{
              marginBottom: 2,
              color: colorScheme.textPrimary,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <PaymentIcon fontSize="small" color="primary" /> Select Payment
            Method
          </Typography>
          <Grid container spacing={2}>
            {["visa", "mcash", "rewards", "lankaQR"].map((method, index) => (
              <Grid item xs={6} key={method}>
                <Grow in={true} timeout={800 + index * 200}>
                  <Card
                    sx={{
                      cursor: "pointer",
                      background: colorScheme.cardBg,
                      border:
                        method === paymentMethod
                          ? `2px solid ${colorScheme.accent}`
                          : `1px solid ${colorScheme.divider}`,
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                      transform:
                        method === paymentMethod ? "translateY(-5px)" : "none",
                      boxShadow:
                        method === paymentMethod
                          ? `0 5px 15px ${colorScheme.highlight}`
                          : "0 2px 8px rgba(0,0,0,0.05)",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: `0 5px 15px ${colorScheme.highlight}`,
                        borderColor: colorScheme.accent,
                      },
                    }}
                    onClick={() => handlePaymentMethodChange(method)}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 60,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          height: method === "lankaQR" ? 50 : 40,
                          objectFit: "contain",
                          width: "auto",
                          padding: method === "lankaQR" ? "5px" : "0",
                          transition: "transform 0.3s ease",
                          transform:
                            method === paymentMethod
                              ? "scale(1.1)"
                              : "scale(1)",
                        }}
                        image={paymentMethodImages[method]}
                        alt={method}
                      />
                      {method === paymentMethod && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            bgcolor: colorScheme.accent,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: `0 0 8px ${colorScheme.highlight}`,
                          }}
                        >
                          <CheckCircle
                            sx={{ color: colorScheme.white.pure, fontSize: 16 }}
                          />
                        </Box>
                      )}
                    </Box>
                    <CardContent sx={{ padding: "8px 16px 16px !important" }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            method === paymentMethod
                              ? colorScheme.accent
                              : colorScheme.textPrimary,
                          textAlign: "center",
                          fontWeight: 500,
                          fontSize: "0.8rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "4px",
                        }}
                      >
                        {paymentMethodIcons[method]}{" "}
                        {paymentMethodLabels[method]}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Pay Now Button with loading and success states */}
        <Box sx={{ mt: 3, position: "relative" }}>
          <Zoom in={!paymentSuccess} timeout={300}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              disabled={!amount || !paymentMethod || isProcessing}
              sx={{
                padding: "14px",
                borderRadius: "10px",
                background: colorScheme.buttonGradient,
                color: colorScheme.white.pure,
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "1px",
                textTransform: "uppercase",
                boxShadow: "0 4px 20px rgba(25, 118, 210, 0.2)",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  opacity: 0.9,
                  boxShadow: `0 0 20px ${colorScheme.highlight}`,
                  transform: "translateY(-2px)",
                },
                "&:disabled": {
                  background: colorScheme.divider,
                  color: colorScheme.textSecondary,
                  boxShadow: "none",
                },
                "&:after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: isProcessing ? "100%" : "0%",
                  height: "100%",
                  background: "rgba(255,255,255,0.3)",
                  transition: isProcessing ? "none" : "width 0.3s ease",
                  animation: isProcessing ? "shimmer 2s infinite" : "none",
                  "@keyframes shimmer": {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(100%)" },
                  },
                },
              }}
            >
              {isProcessing ? "Processing..." : "Pay Now"}
            </Button>
          </Zoom>

          {/* Success message */}
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
                background: colorScheme.successGreen,
                borderRadius: "10px",
                color: colorScheme.white.pure,
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "1px",
                textTransform: "uppercase",
                boxShadow: `0 0 20px rgba(56, 142, 60, 0.3)`,
              }}
            >
              <CheckCircle sx={{ mr: 1 }} /> Payment Successful!
            </Box>
          </Fade>
        </Box>

        {/* Security footer */}
        <Fade in={true} timeout={1000}>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "center",
              color: colorScheme.textSecondary,
              mt: 3,
              fontSize: "0.7rem",
              letterSpacing: "0.5px",
            }}
          >
            <Box
              component="span"
              sx={{ borderBottom: `1px dashed ${colorScheme.textSecondary}` }}
            >
              Secure SSL Encryption
            </Box>
            {" • "}
            <Box
              component="span"
              sx={{ borderBottom: `1px dashed ${colorScheme.textSecondary}` }}
            >
              PCI Compliant
            </Box>
          </Typography>
        </Fade>
      </Box>
    </Box>
  );
};

export default Payment;
