import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import WatermarkLogo from "../../assets/Images/watermarklogo.png";
import terminateUserProfile from "../../services/profile/terminateUserProfile"; // Import the terminate API
import updateUserInfo from "../../services/profile/updateUserInfo";

const UserProfile = () => {
  const storedEmail = localStorage.getItem("username");
  const [altrContact, setAltrContact] = useState("");
  const [name, setName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleUpdate = async () => {
    if (!storedEmail) {
      console.error("User email not found");
      return;
    }
    const response = await updateUserInfo(storedEmail, altrContact, name);
    if (response) {
      setResponseMessage(response.message);
    }
  };

  const handleDelete = async () => {
    const response = await terminateUserProfile();
    if (response) {
      setResponseMessage("Profile successfully terminated.");
    } else {
      setResponseMessage("Failed to terminate the profile.");
    }
    setOpenDialog(false); // Close dialog after the action
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "450px",
        backgroundColor: "white",
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#0056A2",
            fontWeight: "bold",
            marginBottom: "20px",
            fontSize: "24px",
          }}
        >
          My Profile
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#0056A2",
            color: "white",
            borderRadius: "8px",
            padding: "10px 15px",
            marginBottom: "50px",
            width: "90%",
            height: "60px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                backgroundColor: "#F5F9FF",
                color: "#0056A2",
                marginRight: "10px",
              }}
            >
              U
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {storedEmail}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "12px" }}>
                You are logged in as a EasyLogin
              </Typography>
            </Box>
          </Box>
          <IconButton
            sx={{ color: "white" }}
            onClick={() => setOpenDialog(true)} // Open confirmation dialog
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        <Box sx={{ width: "90%", marginBottom: "20px" }}>
          <Typography
            variant="body2"
            sx={{
              color: "#0056A2",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Enter Your Mobile :
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={altrContact}
            onChange={(e) => setAltrContact(e.target.value)}
            sx={{
              marginBottom: "20px",
              maxWidth: "50%",
              "& .MuiInputBase-root": {
                backgroundColor: "#EAF3FF",
                height: "45px",
                borderRadius: "10px",
              },
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: "#0056A2",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Name :
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              marginBottom: "20px",
              maxWidth: "50%",
              "& .MuiInputBase-root": {
                backgroundColor: "#EAF3FF",
                height: "45px",
                borderRadius: "10px",
              },
            }}
          />
          <Box sx={{ alignSelf: "flex-start" }}></Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "#0056A2",
              width: "100px",
              border: "2px solid #0056A2",
              textTransform: "none",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "#0056A2",
                color: "white",
              },
            }}
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Box>

        {responseMessage && (
          <Typography variant="body2" sx={{ color: "#0056A2", marginTop: "20px" }}>
            {responseMessage}
          </Typography>
        )}
      </Box>
      <Box sx={{ position: "absolute", zIndex: 1, right: "2%", bottom: "2%" }}>
        <img src={WatermarkLogo} alt="Watermark Logo" style={{ height: "auto" }} />
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your profile? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>No</Button>
          <Button onClick={handleDelete} sx={{ color: "red" }}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserProfile;
