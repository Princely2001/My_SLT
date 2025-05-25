import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import GoogleLogo from "../../assets/images/google-icon.png";
import FacebookLogo from "../../assets/images/facebook-icon1.jpg";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import axios from "axios";

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
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const [googleUser, setGoogleUser] = useState<any>(null);
  const navigate = useNavigate();

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
      }}
    >
      <Typography variant="body2" sx={{ color: "#333333", mb: 1 }}>
        Or sign in with
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, position: "relative" }}>
        {/* Google Login */}
        <Box
          component="img"
          src={GoogleLogo}
          alt="Google Login"
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
              alt="Facebook Login"
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

        {/* Loading Indicator */}
        {isFacebookLoading && (
          <CircularProgress size={24} sx={{ position: "absolute", right: -40 }} />
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
