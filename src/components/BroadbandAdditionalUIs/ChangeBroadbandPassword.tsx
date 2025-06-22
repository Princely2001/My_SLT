import { useState } from "react";
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { textFieldStyle } from "../../assets/Themes/CommonStyles";
import { useTranslation } from "react-i18next";

const ChangeBroadbandPassword = () => {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const WatermarkLogo = "https://mysltimages.s3.eu-north-1.amazonaws.com/watermarklogo.png";

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

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
        {t("changePasswordTitle")}
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
            gap: 2,
          }}
        >
          {/* Current Password */}
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
              {t("currentPassword")} :
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              sx={textFieldStyle()}
            />
          </Box>

          {/* New Password */}
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
              {t("newPassword")} :
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              type={showPassword ? "text" : "password"}
              sx={textFieldStyle()}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Confirm Password */}
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
              {t("confirmPassword")} :
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              type={showConfirmPassword ? "text" : "password"}
              sx={textFieldStyle()}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleConfirmPasswordVisibility}>
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Update Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            <Button
              variant="outlined"
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
                sx={{ fontWeight: "600", fontSize: "16px" }}
              >
                {t("updatePassword")}
              </Typography>
            </Button>
          </Box>
        </Card>
      </Box>

      <Box sx={{ position: "absolute", zIndex: 1, right: "2%", bottom: "2%" }}>
        <img src={WatermarkLogo} alt="Watermark Logo" />
      </Box>
    </Box>
  );
};

export default ChangeBroadbandPassword;
