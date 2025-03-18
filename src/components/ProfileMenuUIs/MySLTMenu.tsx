import { Avatar, Box, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // For navigation
import useStore from "../../services/useAppStore"; // Zustand store hook

interface MySLTMenuProps {
  onMenuClick: () => void;
}

const MySLTMenu = ({ onMenuClick }: MySLTMenuProps) => {
  // Access the selected telephone number from the store
  const { selectedTelephone, setLeftMenuItem } = useStore();
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    // Clear access token
    localStorage.removeItem("accessToken");
    console.log("Access token cleared");

    // Optionally redirect to login page
    navigate("/login"); // Ensure you have a route set up for "/login"
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "100%",
        maxWidth: "250px",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        margin: "0 auto",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "16px",
          backgroundColor: "#005792",
          color: "white",
        }}
      >
        <Avatar sx={{ backgroundColor: "lightgray", marginRight: "8px" }} />
        <Box>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            My SLT
          </Typography>
          <Typography variant="body2">{selectedTelephone || "N/A"}</Typography>
        </Box>
      </Box>

      {/* Menu Items */}
      <Box sx={{ padding: "8px" }}>
        <MenuItem
          onClick={() => {
            setLeftMenuItem("My Profile");
            onMenuClick();
          }}
          sx={{
            padding: "12px",
            borderRadius: "4px",
            marginBottom: "8px",
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
        >
          <Typography variant="body2">My Profile</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setLeftMenuItem("Manage Connections");
            onMenuClick();
          }}
          sx={{
            padding: "12px",
            borderRadius: "4px",
            marginBottom: "8px",
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
        >
          <Typography variant="body2">Manage Connections</Typography>
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{
            padding: "12px",
            borderRadius: "4px",
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
        >
          <Typography variant="body2">Logout</Typography>
        </MenuItem>
      </Box>
    </Box>
  );
};

export default MySLTMenu;
