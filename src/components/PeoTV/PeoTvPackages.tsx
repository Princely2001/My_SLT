import { Box, Typography} from "@mui/material";
import useStore from "../../services/useAppStore";
import WaterMarkLogo from "../../assets/Images/watermarklogo.png";

const PeoTvPackages = () => {
  const { serviceDetails} = useStore();
  const packages = serviceDetails?.listofPEOService ?? [];

  return (
    <>
      {/* Main Content Box */}
      <Box sx={containerStyle}>
        <Box sx={contentBoxStyle}>
          {packages.length > 0 ? (
            packages.map((packageItem, index) => (
              <Typography key={index} variant="body2" sx={textStyle}>
                {`${packageItem.packageName} - ${packageItem.serviceStatus}`}
              </Typography>
            ))
          ) : (
            <Typography variant="body2" sx={{ ...textStyle, fontSize: "24px" }}>
              No Packages Available
            </Typography>
          )}
        </Box>

        {/* Watermark Logo */}
        <Box component="img" src={WaterMarkLogo} alt="Watermark Logo" sx={watermarkStyle} />
      </Box>
    </>
  );
};
const containerStyle = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "65vh",
  backgroundColor: "white",
  borderRadius: 3,
};

const contentBoxStyle = {
  margin: "auto",
  border: "3px dashed #0056A2",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
  width: "85%",
  height: "80%",
};

const textStyle = {
  color: "#0056A2",
  fontSize: "20px",
  fontWeight: 600,
  mb: 2,
};

const watermarkStyle = {
  zIndex: 1,
  position: "absolute",
  bottom: 20,
  right: 20,
  width: "200px",
  opacity: 1,
};

export default PeoTvPackages;
