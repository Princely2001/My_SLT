import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import WatermarkLogo from "../assets/Images/watermarklogo.png";
import { textFieldStyle } from "../assets/Themes/CommonStyles";
import validateDataGiftSubscriber from "../services/postpaid/ValidateDataGiftResponse";
import useStore from "../services/useAppStore";
import { useTranslation } from "react-i18next";

const GiftData: React.FC = () => {
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch serviceDetails and mobile number from the store
  const { serviceDetails, setLeftMenuItem, giftDataMobileNumber, setGiftDataMobileNumber } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;

  useEffect(() => {
    console.log("Service ID:", serviceID);
  }, [serviceID]);

  const handleValidate = async () => {
    if (!username || !serviceID) {
      setErrorMessage(t("Subscriber ID or username is missing. Please provide both."));
      setIsSuccess(false);
      setIsDialogOpen(true);
      return;
    }

    try {
      const response = await validateDataGiftSubscriber(serviceID, username);

      if (response) {
        if (response.isSuccess) {
          setApiResponse(t("Receiver Validate Success"));
          setIsSuccess(true);
          setErrorMessage(null);
          setGiftDataMobileNumber(username);
        } else {
          setApiResponse(null);
          setErrorMessage(t("Subscriber ID you entered is Invalid – Please enter a correct Subscriber ID."));
          setIsSuccess(false);
        }
      } else {
        setApiResponse(null);
        setErrorMessage(t("Unexpected error occurred during the API call."));
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Validation API call failed:", error);
      setApiResponse(null);
      setErrorMessage(t("An error occurred during validation."));
      setIsSuccess(false);
    } finally {
      setIsDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    if (!errorMessage) {
      setLeftMenuItem("GetGiftDataPage");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        color: "#FFFFFF1A",
        padding: 2,
        borderRadius: "10px",
        height: "400px",
        boxShadow: "0px 3px 3px #0000004A",
        overflow: "hidden",
        width: "95%",
        position: "relative",
      }}
    >
      <Typography
        variant="body1"
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#0056A2",
          mb: 8,
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {t("Enter the username of the person to whom you wish to Gift Data")}
        <br />
        {t("Select the package by tapping VALIDATE RECEIVER")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          mb: 8,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: "16px",
            color: "#0056A2",
            lineHeight: 1,
          }}
        >
          {t("Receiver's username :")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              ...textFieldStyle(40, 250),
            }}
          />
        </Box>
      </Box>

      <Button
        variant="contained"
        size="large"
        onClick={handleValidate}
        sx={{
          marginBottom: 1,
          color: "#0056A2",
          backgroundColor: "#FFFFFF",
          border: "2px solid #0056A2",
          height: "50px",
          fontWeight: "bold",
          borderRadius: "8px",
        }}
      >
        <Typography variant="body2" sx={{ fontSize: "20px", fontWeight: 600 }}>
          {t("Validate Receiver")}
        </Typography>
      </Button>

      <Typography
        variant="body2"
        sx={{
          color: "#0056A2",
          fontSize: 13,
        }}
      >
        {t("Ensure the username is correct, as this transaction cannot be reversed.")}
      </Typography>

      {/* Dialog for displaying API messages */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle sx={{ textAlign: "center", color: isSuccess ? "green" : "red" }}>
          {isSuccess ? t("Success") : t("Error")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "400px",
              height: "50px",
              gap: -10,
              color: "#0056A2",
              fontWeight: "bold",
              fontSize: "10px",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            {isSuccess ? (
              <>
                {apiResponse}
                <img
                  src="https://cdn.dribbble.com/users/39201/screenshots/3694057/nutmeg.gif"
                  alt="Success"
                  style={{ width: "100px", height: "30px", borderRadius: "10px" }}
                />
              </>
            ) : (
              <>
                {errorMessage}
                <img
                  src="https://i.gifer.com/Z16w.gif"
                  alt="Failure"
                  style={{ width: "30px", height: "18px", borderRadius: "10px" }}
                />
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            {t("Ok")}
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ position: "absolute", zIndex: 1, right: "2%", bottom: "2%" }}>
        <img src={WatermarkLogo} alt="Watermark Logo" />
      </Box>
    </Box>
  );
};

export default GiftData;
