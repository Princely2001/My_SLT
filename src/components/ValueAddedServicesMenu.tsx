import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import VasIcon from "./VasIcon";
import { useTranslation } from 'react-i18next';

const ValueAddedServicesMenu = () => {
  const { t } = useTranslation();
  const vas1 = "https://mysltimages.s3.eu-north-1.amazonaws.com/Group+39680.png";
  const vas2  = "https://mysltimages.s3.eu-north-1.amazonaws.com/Group+39681.png";
  const  vas3 = "https://mysltimages.s3.eu-north-1.amazonaws.com/Group+39682.png";
   const vas4 = "https://mysltimages.s3.eu-north-1.amazonaws.com/Group+39683.png";
    const vas5 = "https://mysltimages.s3.eu-north-1.amazonaws.com/Group+39684.png";
   
  const items = [
    {image: vas1, url: "https://duthaya.lk/"},
    {image: vas2, url: "https://kaspersky-dp.slt.lk/customerProductList"},
    {image: vas3, url: "https://www.slt.lk/en/peotv-go"},
    {image: vas4, url: "https://play.google.com/store/apps/details?id=com.arimac.slt&hl=en&gl=US"},
    {image: vas5, url: "https://storage.slt.lk/portal/new-registration/"},
  ];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        paddingX: 2,
        paddingY: 0.1,
        width: "100%",
        height: "7vh",
        minHeight: "60px",
        border: "2px solid #FFFFFF",
        borderRadius: "8px",
        backgroundColor: "#FFFFFF80",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: 20,
          color: "#0056A2",
          fontWeight: "bold",
        }}
      >
        {t("Value Added Services")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          flexGrow: 1,
          gap: 0.3,
        }}
      >
        {items.map((item, index) => (
          <VasIcon key={index} imagePath={item.image} url={item.url} />
        ))}
      </Box>
    </Box>
  );
};

export default ValueAddedServicesMenu;