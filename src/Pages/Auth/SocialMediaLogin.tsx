import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GoogleLogo from "../../assets/images/google-icon.png";
import FacebookLogo from "../../assets/images/facebook-icon1.jpg";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

// Type definitions for Facebook responses
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

const SocialMediaLogin = () => {
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const navigate = useNavigate();

  const handleFacebookSuccess = (response: FacebookAuthResponse) => {
    console.log("Facebook login success:", response);
    setIsFacebookLoading(false);
    navigate("/home");
  };

  const handleFacebookFailure = (error: unknown) => {
    console.error("Facebook login failed:", error);
    setIsFacebookLoading(false);
    // Consider adding user feedback here (e.g., toast notification)
  };

  const handleFacebookProfile = (profile: FacebookProfile) => {
    console.log("Facebook Profile:", profile);
    // You might want to store this profile data in your state/context
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Implement your Google login logic here
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        mt: 2,
        mb: 2,
      }}
    >
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Or sign in with
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Google Login */}
        <Box
          component="img"
          src={GoogleLogo}
          alt="Sign in with Google"
          onClick={handleGoogleLogin}
          sx={{
            width: 36,
            height: 36,
            cursor: "pointer",
            "&:hover": {
              opacity: 0.8,
            },
          }}
        />

        {/* Facebook Login */}
        <FacebookLogin
          appId="515088714636776" // Consider moving this to environment variables
          onSuccess={handleFacebookSuccess}
          onFail={handleFacebookFailure}
          onProfileSuccess={handleFacebookProfile}
          useRedirect={false}
          render={({ onClick }) => (
            <Box
              component="img"
              src={FacebookLogo}
              alt="Sign in with Facebook"
              onClick={(e) => {
                e.preventDefault();
                setIsFacebookLoading(true);
                onClick();
              }}
              sx={{
                width: 36,
                height: 36,
                cursor: "pointer",
                borderRadius: "50%",
                opacity: isFacebookLoading ? 0.6 : 1,
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            />
          )}
        />

        {/* Loading indicator */}
        {isFacebookLoading && (
          <CircularProgress size={24} sx={{ position: "absolute" }} />
        )}
      </Box>
    </Box>
  );
};

export default SocialMediaLogin;