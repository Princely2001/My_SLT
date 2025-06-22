import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { textFieldStyle } from "../assets/Themes/CommonStyles";
import createFaultRequest from "../services/createFaultRequest";
import useStore from "../services/useAppStore";
import { useTranslation } from "react-i18next";

interface AddComplaintsProps {
  telephoneNo: string;
}

const AddComplaints: React.FC<AddComplaintsProps> = ({ telephoneNo }) => {
  const { t } = useTranslation(); // i18n hook
  const { serviceDetails } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;
  const serviceStatus = serviceDetails?.listofBBService[0]?.serviceStatus;

  const [serviceOption, setServiceOption] = useState("All");
  const arrow = "https://mysltimages.s3.eu-north-1.amazonaws.com/arrow.png";
  const [contactNo, setContactNo] = useState("");
  const [faultDescription, setFaultDescription] = useState("");
  const [status] = useState(serviceStatus || "");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleDialogClose = () => setIsDialogOpen(false);

  const handleSubmit = async () => {
    if (!serviceID || !telephoneNo || !contactNo || !faultDescription || !status) {
      setDialogMessage(t("addComplaints.validationError"));
      setIsSuccess(false);
      setIsDialogOpen(true);
      return;
    }

    try {
      const response = await createFaultRequest(
        serviceID,
        telephoneNo,
        serviceOption,
        contactNo,
        faultDescription,
        status
      );

      if (response?.isSuccess) {
        setDialogMessage(t("addComplaints.submitSuccess"));
        setIsSuccess(true);
      } else {
        setDialogMessage(response?.errorMessage || t("addComplaints.submitFailure"));
        setIsSuccess(false);
      }

      setIsDialogOpen(true);
    } catch (error) {
      console.error("Exception during API call:", error);
      setDialogMessage(t("addComplaints.submitFailure"));
      setIsSuccess(false);
      setIsDialogOpen(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        color: "#0056A2",
        paddingY: 1,
        paddingX: 3,
        borderRadius: "10px",
        boxShadow: "0px 3px 3px #0000004A",
        height: "450px",
      }}
    >
      {/* Header */}
      <Typography
        variant="h6"
        align="center"
        sx={{ fontWeight: "bold", color: "#0056A2", mb: 2 }}
      >
        ── {t("addComplaints.title")} ──
      </Typography>

      {/* Form Content */}
      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid item xs={12} sm={6}>
          <Box mb={2}>
            <Typography fontWeight="bold" color="#0056A2" mb={1}>
              {t("addComplaints.serviceType")}
            </Typography>
            <TextField
              select
              fullWidth
              variant="outlined"
              size="small"
              sx={textFieldStyle()}
              value={serviceOption}
              onChange={(e) => setServiceOption(e.target.value)}
            >
              <MenuItem value="All">{t("addComplaints.all")}</MenuItem>
              <MenuItem value="Broadband">{t("addComplaints.broadband")}</MenuItem>
              <MenuItem value="PeoTV">{t("addComplaints.peotv")}</MenuItem>
              <MenuItem value="Voice">{t("addComplaints.voice")}</MenuItem>
            </TextField>
          </Box>

          <Box mb={2}>
            <Typography fontWeight="bold" color="#0056A2" mb={1}>
              {t("addComplaints.contactNumber")}
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              sx={textFieldStyle()}
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
            />
          </Box>

          <Box mb={2}>
            <Typography fontWeight="bold" color="#0056A2" mb={1}>
              {t("addComplaints.description")}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={textFieldStyle()}
              value={faultDescription}
              onChange={(e) => setFaultDescription(e.target.value)}
            />
          </Box>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              height: "85%",
              backgroundColor: "#F8FAFD",
              padding: "16px",
              borderRadius: "12px",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              label={t("addComplaints.location")}
              sx={textFieldStyle(40, 250)}
            />
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126744.08449728298!2d79.81216954042364!3d6.927078400000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259404958c1f9%3A0x4fdf4c34fd426a0f!2sColombo!5e0!3m2!1sen!2slk!4v1699056801524!5m2!1sen!2slk"
              style={{
                border: 0,
                width: "100%",
                height: "80%",
                borderRadius: "8px",
              }}
              allowFullScreen
            ></iframe>
          </Card>
        </Grid>
      </Grid>

      {/* Submit Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: "-5px" }}>
        <Button
          variant="outlined"
          onClick={handleSubmit}
          sx={{
            display: "flex",
            gap: 2,
            backgroundColor: "#FFFFFF",
            color: "#0056A2",
            border: "3px solid #0056A2",
            borderRadius: "40px",
            textTransform: "none",
            px: 2,
            py: 1,
            minWidth: "175px",
            fontWeight: "bold",
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: "#EAF2FB",
              borderColor: "#0056A2",
            },
          }}
        >
          <img src={arrow} alt="Arrow Icon" style={{ width: "24px" }} />
          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "20px" }}>
            {t("addComplaints.submit")}
          </Typography>
        </Button>
      </Box>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle sx={{ textAlign: "center", color: isSuccess ? "green" : "red" }}>
          {isSuccess ? t("addComplaints.success") : t("addComplaints.error")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "400px",
              height: "50px",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
              color: "#0056A2",
            }}
          >
            {dialogMessage}
            <img
              src={
                isSuccess
                  ? "https://cdn.dribbble.com/users/39201/screenshots/3694057/nutmeg.gif"
                  : "https://i.gifer.com/Z16w.gif"
              }
              alt={isSuccess ? "Success" : "Failure"}
              style={{ width: "100px", height: "30px", borderRadius: "10px", marginTop: 5 }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            {t("addComplaints.ok")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddComplaints;
