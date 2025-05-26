import { Avatar, Box, MenuItem, Typography, Select, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStore from "../../services/useAppStore";
import { useEffect, useState } from "react";
import LanguageIcon from "@mui/icons-material/Language";

// Declare global for Google Translate
declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

interface MySLTMenuProps {
  onMenuClick: () => void;
}

const MySLTMenu = ({ onMenuClick }: MySLTMenuProps) => {
  const { selectedTelephone, setLeftMenuItem } = useStore();
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');

  // Initialize Google Translate
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "si,ta,en",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            gaTrack: false,
          },
          "google_translate_element"
        );
        
        // Custom styling for Google Translate
        const style = document.createElement('style');
        style.innerHTML = `
          .goog-te-gadget {
            color: transparent !important;
            font-size: 0 !important;
          }
          .goog-te-gadget .goog-te-combo {
            padding: 8px 12px;
            border-radius: 4px;
            border: 1px solid #e0e0e0;
            background-color: white;
            color: #333;
            font-size: 14px;
            width: 100%;
          }
          .goog-te-gadget-simple {
            background: transparent !important;
            border: none !important;
          }
          .goog-te-menu-value span {
            display: none !important;
          }
          .goog-te-menu-value:before {
            content: "🌐 Language" !important;
            color: #333 !important;
          }
        `;
        document.head.appendChild(style);
      };
    };

    if (!window.google?.translate) {
      addGoogleTranslateScript();
    } else {
      window.googleTranslateElementInit();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
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
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            My SLT
          </Typography>
          <Typography variant="body2">{selectedTelephone || "N/A"}</Typography>
        </Box>
      </Box>

      {/* Language Selector - Always Visible */}
      <Box sx={{ 
        padding: "8px 16px",
        borderBottom: "1px solid #f0f0f0",
        display: "flex",
        alignItems: "center"
      }}>
        <LanguageIcon sx={{ color: "#005792", mr: 1 }} />
        <Box sx={{ flexGrow: 1 }}>
          <div id="google_translate_element" style={{ width: '100%' }}></div>
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