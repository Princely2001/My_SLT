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
import useStore from "../../services/useAppStore"; // Importing the zustand store
import { OtpGlobalState, OtpResponse } from "../../types/types";

interface SignupProps {
  onSelectTab: (tab: string) => void;
}

const Signup = ({ onSelectTab }: SignupProps) => {
  const [userID, setUserID] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Get the setDataBundle method from the store
  const { setOtpState } = useStore();

  // Determine user type based on input (email or mobile)
  const determineUserType = (input: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validates email format
    const phoneRegex = /^\d{10}$/; // Validates a 10-digit mobile number
    if (emailRegex.test(input)) {
      return "EMAIL";
    }
    if (phoneRegex.test(input)) {
      return "MOBILE";
    }
    return "UNKNOWN";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    const userType = determineUserType(userID);
    if (userType === "UNKNOWN") {
      setErrorMessage("Please enter a valid email or 10-digit mobile number.");
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
        console.log("Registration successful:", response.dataBundle);

        const data: OtpGlobalState = {
          userName: userID,
          userType: userType,
          dataBundle: response.dataBundle,
        };
        setOtpState(data);

        onSelectTab("registerotp"); // Navigate to OTP screen
      } else {
        // Handle registration failure
        setErrorMessage(response.errorMessage || "Registration failed");
        console.error("API Error:", response);
      }
    } catch (error) {
      // Handle any errors during registration
      setErrorMessage("An error occurred while registering");
      console.error("Error during registration:", error);
    }
    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Style for text fields
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
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
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
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Show error message if any */}
        {errorMessage && (
          <Typography color="error" variant="body2">
            {errorMessage}
          </Typography>
        )}

        {/* Input fields */}
        <Typography variant="body2" sx={{ color: " #0F3B7A" }}>
          Email or Mobile
        </Typography>
        <TextField
          sx={{ ...textFieldStyles }}
          fullWidth
          variant="outlined"
          margin="normal"
          value={userID}
          placeholder="Enter your email or mobile number"
          onChange={(e) => setUserID(e.target.value.trim())}
          required
        />

        <Typography variant="body2" sx={{ color: " #0F3B7A" }}>
          Name
        </Typography>
        <TextField
          sx={{ ...textFieldStyles }}
          fullWidth
          variant="outlined"
          margin="normal"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value.trim())}
          required
        />

        <Typography variant="body2" sx={{ color: " #0F3B7A" }}>
          Password
        </Typography>
        <TextField
          fullWidth
          sx={{ ...textFieldStyles }}
          type={showPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="body2" sx={{ color: " #0F3B7A" }}>
          Confirm Password
        </Typography>
        <TextField
          fullWidth
          sx={{ ...textFieldStyles }}
          type={showPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          value={confirmPassword}
          placeholder="Confirm your password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Submit button */}
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
              Sign Up
            </Typography>
          )}
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
