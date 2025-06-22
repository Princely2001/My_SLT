import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Mobile = () => {
  const { t } = useTranslation();

  const handleRedirect = () => {
    window.open("https://www.mobitel.lk/selfcare-app", "_blank");
  };

  const ArrowImage = "https://mysltimages.s3.eu-north-1.amazonaws.com/arrowImage.png";
  const VolteImage = "https://mysltimages.s3.eu-north-1.amazonaws.com/VolteImage.png";
  const BottomImage = "https://mysltimages.s3.eu-north-1.amazonaws.com/BottomImageMobile.png";
  const TopImage = "https://mysltimages.s3.eu-north-1.amazonaws.com/TopImageMobile.png";

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
        alt="Volte Image"
        sx={{
          position: "absolute",
          right: "30px",
          top: "7vh",
          display: { xs: "none", sm: "none", md: "block", lg: "block", xl: "block" },
          width: { md: "40vw", lg: "425px" },
          maxWidth: "425px",
          objectFit: "cover",
        }}
      />

      <Button
        onClick={handleRedirect}
        sx={{
          marginTop: { xs: "0%", sm: "0%", md: "20vh", lg: "20vh" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "200px",
          height: "50px",
          backgroundColor: "white",
          border: "3px solid #0056A2",
          borderRadius: "60px",
          "&:hover": {
            backgroundColor: "#DFF0FF",
            color: "white",
          },
        }}
      >
        <Box
          component="img"
          src={ArrowImage}
          alt="Arrow Icon"
          sx={{
            ml: 1,
            mr: 2,
            width: "25px",
            height: "25px",
            objectFit: "cover",
          }}
        />
        <Typography variant="body2" sx={{ color: "#0056A2", fontSize: 24 }}>
          {t("go")}
        </Typography>
      </Button>

      <Box
        component="img"
        src={BottomImage}
        alt="Bottom Decoration"
        sx={{
          zIndex: 1,
          position: "absolute",
          bottom: 0,
          right: 20,
          width: "25vw",
          minWidth: "250px",
          opacity: 1,
        }}
      />
      <Box
        component="img"
        src={TopImage}
        alt="Top Decoration"
        sx={{
          zIndex: 1,
          position: "absolute",
          top: 0,
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
