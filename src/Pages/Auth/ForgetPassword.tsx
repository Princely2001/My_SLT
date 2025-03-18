import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { textFieldStyles } from "./LogIn";
import { useState } from "react";
import sendOTPRequest from "../../services/changePassword/sendOTPRequest";
import { OtpGlobalState } from "../../types/types";
import { determineUserType } from "../../services/helperFunctions";
import useStore from "../../services/useAppStore";

interface ForgetPasswordProps {
  onSelectTab: (tab: string) => void;
}

const ForgetPassword = ({ onSelectTab }: ForgetPasswordProps) => {
  const [userID, setUserID] = useState("");
  const [loading, setLoading] = useState(false);
  const { setOtpState } = useStore();

  const handleSubmit = async () => {
    setLoading(true);
    const userType = determineUserType(userID);
    await sendOTPRequest(userID, userType);
    const data: OtpGlobalState = {
      userName: userID,
      userType: null,
      dataBundle: null,
    };
    setOtpState(data);
    setLoading(false);
    onSelectTab("otp");
  };

  return (
    <Box
      sx={{
        height: "80%",
        paddingTop: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        marginTop: "40px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "Poppins, sans-serif",
            color: "#0056A2",
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          Forgot Password ?
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#0056A2",
            textAlign: "center",
            marginBottom: "20px",
            maxWidth: "400px",
            mb: "40px",
          }}
        >
          Enter your Registered email Address or Mobile Number and we will send
          an OTP to reset your password.
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            mb: "40px",
          }}
        >
          <Typography variant="body2" sx={{ color: " #A4A4AA" }}>
            User ID
            <Typography
              component="sup"
              sx={{
                color: "red",
                fontWeight: "bold",
                fontSize: "1rem",
                marginLeft: "2px",
              }}
            >
              *
            </Typography>
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
        </Box>

        <Button
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            width: "200px",
            borderRadius: 15,
            height: "40px",
            textTransform: "capitalize",
            mb: "10px",
          }}
        >
          {loading ? (
            <CircularProgress color="inherit" size={20} />
          ) : (
            <Typography variant="body2" sx={{ color: "#FFFFFF" }}>
              Submit
            </Typography>
          )}
        </Button>
        <Typography
          variant="body2"
          sx={{
            color: "#333333",
            textAlign: "center",
            marginBottom: "20px",
            maxWidth: "400px",
          }}
        >
          Back to{" "}
          <Typography
            onClick={() => onSelectTab("login")}
            component="span"
            sx={{
              color: "#0056A2",
              cursor: "pointer",
              textTransform: "capitalize",
              textDecoration: "underline",
            }}
          >
            Sign in
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgetPassword;
