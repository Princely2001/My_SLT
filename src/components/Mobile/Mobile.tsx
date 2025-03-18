import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowImage from "../../assets/Images/MobileImages/arrowImage.png";
import VolteImage from "../../assets/Images/MobileImages/VolteImage.png";
import BottomImage from "../../assets/Images/MobileImages/BottomImageMobile.png";
import TopImage from "../../assets/Images/MobileImages/TopImageMobile.png";
import { Typography } from "@mui/material";

const Mobile = () => {
  const handleRedirect = () => {
    window.open("https://www.mobitel.lk/selfcare-app", "_blank");
  };
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "110%",
        backgroundColor: "white",
        borderRadius: 3,
      }}
    >
      <Box
        component="img"
        src={VolteImage}
        alt="Watermark Logo"
        sx={{
          position: "absolute",
          right:"30px",
          top: "7vh",
          display:{xs:"none",sm:"none",md:"block",lg:"block",xl:"block"},
          width:{md:"40vw",lg:"425px"},
          maxWidth:"425px",
          objectFit: "cover",
        }}
      />
      <Button
      onClick={handleRedirect}
      sx={{
        marginTop: {xs:"0%",sm:"0%",md:"20vh",lg:"20vh"},
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "200px",
        height: "50px",
        backgroundColor: "white",
        border: "3px solid #0056A2",
        borderRadius:"60px",
        "&:hover": {
          backgroundColor: "#DFF0FF",
          color: "white",
        }
      }}
      >
        <Box
        component="img"
        src={ArrowImage}
        alt="Watermark Logo"
        sx={{
          ml: 1,
          mr:2,
          width: '25px',
          height: '25px',
          objectFit: "cover",
        }}
      />
      <Typography variant="body2" sx={{ color: "#0056A2", fontSize: 24 }}>
        Go
      </Typography>
      </Button>
      <Box
        component="img"
        src={BottomImage}
        alt="Watermark Logo"
        sx={{
          zIndex: 1,
          position: "absolute",
          bottom:0,
          right: 20,
          width: "25vw",
          minWidth: "250px",
          opacity: 1,
        }}
      />
      <Box
        component="img"
        src={TopImage}
        alt="Watermark Logo"
        sx={{
          zIndex: 1,
          position: "absolute",
          top:0,
          left: 20,
          width: "25vw",
          minWidth: "250px",
          opacity: 1,
        }}
      />
    </Box>
  );
};

export default Mobile;
