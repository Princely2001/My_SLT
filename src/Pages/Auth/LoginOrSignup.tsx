import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import backgroundImage from "../../assets/Images/background.jpg";
import LoginImage from "..//..//assets//images//loginImage.png";
import ForgetPassword from "./ForgetPassword";
import Login from "./LogIn";
import OTPPage from "./OTP";
import RegisterOTP from "./RegisterOTP";
import Signup from "./SignUp";
import SocialMediaLogin from "./SocialMediaLogin";

const LoginOrSignup = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState("login");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "83vw",
          maxWidth: "900px",
          height: "625px",
          margin: "1px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={LoginImage}
          alt={t("loginOrSignup.loginImageAlt")}
          sx={{
            display: { xs: "none", md: "block" },
            width: "auto",
            maxWidth: "100%",
            height: "95%",
            borderRadius: 3,
            zIndex: 1,
            marginRight: "-100px",
            boxShadow: "0px 3px 3px #0056A260",
          }}
        ></Box>
        <Box
          sx={{
            width: { xs: "90%", md: "71%" },
            height: "100%",
            backgroundColor: "background.paper",
            borderRadius: 3,
            border: "1px solid #0056A2",
            zIndex: 0,
            paddingLeft: { xs: "0px", md: "100px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <Box
            sx={{
              width: "80%",
              height: "64px",
              margin: "20px",
              backgroundColor: "#D9F7FF",
              borderRadius: "16px",
              boxShadow: "0px 3px 3px #0056A260",
              display:
                selectedTab === "forgetPassword" || selectedTab === "otp"
                  ? "none"
                  : "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Box
              onClick={() => setSelectedTab("login")}
              sx={{
                width: "40%",
                height: "70%",
                backgroundColor:
                  selectedTab === "login" ? "#0056A2" : "transparent",
                color: selectedTab === "login" ? "#ffffff" : "#0056A2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                transition: "all 0.3s ease",
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor:
                    selectedTab !== "login"
                      ? "rgba(0, 86, 162, 0.1)"
                      : undefined,
                  "& .MuiTypography-root": {
                    transform:
                      selectedTab !== "login" ? "scale(1.1)" : "none",
                    transition: "transform 0.3s ease",
                  },
                },
              }}
            >
              <Typography variant="body2">{t("loginOrSignup.login")}</Typography>
            </Box>
            <Box
              onClick={() => setSelectedTab("signup")}
              sx={{
                width: "40%",
                height: "70%",
                backgroundColor:
                  selectedTab === "signup" ? "#0056A2" : "transparent",
                color: selectedTab === "signup" ? "#ffffff" : "#0056A2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                transition: "all 0.3s ease",
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor:
                    selectedTab !== "signup"
                      ? "rgba(0, 86, 162, 0.1)"
                      : undefined,
                  "& .MuiTypography-root": {
                    transform:
                      selectedTab !== "signup" ? "scale(1.1)" : "none",
                    transition: "transform 0.3s ease",
                  },
                },
              }}
            >
              <Typography variant="body2">{t("loginOrSignup.signup")}</Typography>
            </Box>
          </Box>

          <Box sx={{ marginX: "20px", height: "100%" }}>
            {selectedTab === "login" && (
              <>
                <Login onSelectTab={setSelectedTab} />
                <SocialMediaLogin />
              </>
            )}
            {selectedTab === "signup" && (
              <>
                <Signup onSelectTab={setSelectedTab} />
                <SocialMediaLogin />
              </>
            )}
            {selectedTab === "forgetPassword" && (
              <ForgetPassword onSelectTab={setSelectedTab} />
            )}
            {selectedTab === "otp" && <OTPPage onSelectTab={setSelectedTab} />}
            {selectedTab === "registerotp" && (
              <RegisterOTP onSelectTab={setSelectedTab} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginOrSignup;
