import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import registerUser from "../../services/register/register";
import useStore from "../../services/useAppStore";
import { OtpGlobalState, OtpResponse } from "../../types/types";
import { useTranslation } from "react-i18next";

interface SignupProps {
  onSelectTab: (tab: string) => void;
}

const Signup = ({ onSelectTab }: SignupProps) => {
  const { t } = useTranslation();
  const [userID, setUserID] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { setOtpState } = useStore();

  const determineUserType = (input: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    if (emailRegex.test(input)) return "EMAIL";
    if (phoneRegex.test(input)) return "MOBILE";
    return "UNKNOWN";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage(t("signup.error.passwordMismatch"));
      setLoading(false);
      return;
    }
    const userType = determineUserType(userID);
    if (userType === "UNKNOWN") {
      setErrorMessage(t("signup.error.invalidInput"));
      setLoading(false);
      return;
    }
    try {
      const response: OtpResponse = await registerUser(
        userID,
        password,
        confirmPassword,
        name,
        userType
      );
      if (response.isSuccess) {
        const data: OtpGlobalState = {
          userName: userID,
          userType: userType,
          dataBundle: response.dataBundle,
        };
        setOtpState(data);
        onSelectTab("registerotp");
      } else {
        setErrorMessage(response.errorMessage || t("signup.error.registrationFailed"));
      }
    } catch (error) {
      setErrorMessage(t("signup.error.generic"));
    }
    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      mt: -1,
      border: "1px solid #F0F0F3",
      borderRadius: "15px",
      height: "35px",
      transition: "all 0.3s ease",
      "&:hover": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
        },
        borderColor: "#0F3B7A",
      },
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
        },
        borderColor: "#0F3B7A",
      },
      "& .MuiOutlinedInput-input::placeholder": {
        fontSize: "14px",
        color: "#999999",
      },
    },
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography
        variant="h1"
        sx={{
          fontFamily: "Sarabun, sans-serif",
          color: "#0056A2",
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        {t("signup.title")}
      </Typography>
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <Typography color="error" variant="body2">
            {errorMessage}
          </Typography>
        )}

        <Typography variant="body2" sx={{ color: "#0F3B7A" }}>
          {t("signup.emailOrMobile")}
        </Typography>
        <TextField
          sx={textFieldStyles}
          fullWidth
          variant="outlined"
          margin="normal"
          value={userID}
          placeholder={t("signup.emailOrMobilePlaceholder")}
          onChange={(e) => setUserID(e.target.value.trim())}
          required
        />

        <Typography variant="body2" sx={{ color: "#0F3B7A" }}>
          {t("signup.name")}
        </Typography>
        <TextField
          sx={textFieldStyles}
          fullWidth
          variant="outlined"
          margin="normal"
          value={name}
          placeholder={t("signup.namePlaceholder")}
          onChange={(e) => setName(e.target.value.trim())}
          required
        />

        <Typography variant="body2" sx={{ color: "#0F3B7A" }}>
          {t("signup.password")}
        </Typography>
        <TextField
          fullWidth
          sx={textFieldStyles}
          type={showPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          value={password}
          placeholder={t("signup.passwordPlaceholder")}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={t("signup.togglePasswordVisibility")}
                  onClick={togglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="body2" sx={{ color: "#0F3B7A" }}>
          {t("signup.confirmPassword")}
        </Typography>
        <TextField
          fullWidth
          sx={textFieldStyles}
          type={showPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          value={confirmPassword}
          placeholder={t("signup.confirmPasswordPlaceholder")}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={t("signup.togglePasswordVisibility")}
                  onClick={togglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          type="submit"
          sx={{
            mt: "20px",
            width: "100%",
            backgroundColor: "#0F3B7A",
            padding: "12px",
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: "#003b5c",
            },
          }}
        >
          {loading ? (
            <CircularProgress color="inherit" size={20} />
          ) : (
            <Typography variant="body2" sx={{ color: "#FFFFFF" }}>
              {t("signup.signupButton")}
            </Typography>
          )}
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
