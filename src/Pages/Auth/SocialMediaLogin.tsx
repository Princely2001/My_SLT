import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GoogleLogo from "../../assets/images/google-icon.png";
import FacebookLogo from "../../assets/images/facebook-icon1.jpg";

const SocialMediaLogin = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        mt:1,
      }}
    >
      <Typography variant={'body2'} sx={{color: "#333333" }}>
        Or sign in with
      </Typography>

      <Box sx={{ display: "flex",alignItems:"center", gap: 1 }}>
        {" "}
        {/* Gap between logos */}
        <Box
          component="img"
          src={GoogleLogo}
          alt="Google Logo"
          sx={{
            width: "37px",
            height: "37px",
            cursor: "pointer",
          }}
        />
        <Box
          component="img"
          src={FacebookLogo}
          alt="Facebook Logo"
          sx={{
            width: "40px",
            height: "40px",
            cursor: "pointer",
          }}
        />
      </Box>
    </Box>
  );
};

export default SocialMediaLogin;
