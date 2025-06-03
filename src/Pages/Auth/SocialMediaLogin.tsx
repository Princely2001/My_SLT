import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import GoogleLogo from "../../assets/images/google-icon.png";
import FacebookLogo from "../../assets/images/facebook-icon1.jpg";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import axios from "axios";
import { languageState } from "../../types/types";

// Facebook Type Definitions
type FacebookAuthResponse = {
  accessToken: string;
  userID: string;
  expiresIn: number;
  signedRequest: string;
  graphDomain: string;
  data_access_expiration_time: number;
};

type FacebookProfile = {
  id: string;
  name: string;
  email?: string;
  picture?: {
    data: {
      url: string;
    };
  };
};

const CLIENT_ID = "641643356344-un4nm5pqbp11f2g0h8rmuri4u8ij6fev.apps.googleusercontent.com";

const SocialMediaLoginInner = () => {
  const { t, i18n } = useTranslation();
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const [googleUser, setGoogleUser] = useState<any>(null);
  const navigate = useNavigate();

  // Handle language change
  const handleLanguageChange = (event: SelectChangeEvent) => {
    const newLanguage = event.target.value as 'en' | 'si' | 'ta';
    i18n.changeLanguage(newLanguage);
    languageState.currentLanguage = newLanguage;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('appLanguage', newLanguage);
    }
  };

  // Google Login Handler
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      console.log("Google access token:", accessToken);

      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const userInfo = res.data;
        console.log("Google user info:", userInfo);
        setGoogleUser(userInfo);
        navigate("/home");
      } catch (err) {
        console.error("Failed to fetch Google user info:", err);
      }
    },
    onError: (error) => {
      console.error("Google login failed:", error);
    },
  });

  // Facebook Handlers
  const handleFacebookSuccess = (response: FacebookAuthResponse) => {
    console.log("Facebook login success:", response);
    setIsFacebookLoading(false);
    navigate("/home");
  };

  const handleFacebookFailure = (error: unknown) => {
    console.error("Facebook login failed:", error);
    setIsFacebookLoading(false);
  };

  const handleFacebookProfile = (profile: FacebookProfile) => {
    console.log("Facebook profile:", profile);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        mt: 2,
        mb: 2,
        gap: 2,
      }}
    >
      {/* Language Selector */}
      <FormControl sx={{ minWidth: 120 }} size="small">
        <Select
          value={i18n.language}
          onChange={handleLanguageChange}
          displayEmpty
          inputProps={{ 'aria-label': t('languageSelector.selectLanguage') }}
          sx={{
            borderRadius: '20px',
            '& .MuiSelect-select': {
              py: 1,
            }
          }}
        >
          
          <MenuItem value="en">{t('languages.english')}</MenuItem>
          <MenuItem value="si">{t('languages.sinhala')}</MenuItem>
          <MenuItem value="ta">{t('languages.tamil')}</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="body2" sx={{ color: "#333333" }}>
        {t("socialLogin.orSignInWith")}
      </Typography>

      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        gap: 2, 
        position: "relative",
        width: "100%",
        justifyContent: "center"
      }}>
        {/* Social Media Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Google Login */}
          <Box
            component="img"
            src={GoogleLogo}
            alt={t("socialLogin.googleLogin")}
            onClick={() => loginWithGoogle()}
            sx={{
              width: 37,
              height: 37,
              cursor: "pointer",
              borderRadius: "50%",
              transition: "0.3s",
              "&:hover": { transform: "scale(1.1)" },
            }}
          />

          {/* Facebook Login */}
          <FacebookLogin
            appId="515088714636776"
            onSuccess={handleFacebookSuccess}
            onFail={handleFacebookFailure}
            onProfileSuccess={handleFacebookProfile}
            useRedirect={false}
            render={({ onClick }) => (
              <Box
                component="img"
                src={FacebookLogo}
                alt={t("socialLogin.facebookLogin")}
                onClick={(e) => {
                  e.preventDefault();
                  setIsFacebookLoading(true);
                  onClick();
                }}
                sx={{
                  width: 37,
                  height: 37,
                  cursor: "pointer",
                  borderRadius: "50%",
                  opacity: isFacebookLoading ? 0.6 : 1,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.1)" },
                }}
              />
            )}
          />
        </Box>

        {/* Loading Indicator */}
        {isFacebookLoading && (
          <CircularProgress 
            size={24} 
            sx={{ position: "absolute", right: -40 }} 
            aria-label={t("socialLogin.loading")}
          />
        )}
      </Box>
    </Box>
  );
};

const SocialMediaLogin = () => (
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <SocialMediaLoginInner />
  </GoogleOAuthProvider>
);

export default SocialMediaLogin;