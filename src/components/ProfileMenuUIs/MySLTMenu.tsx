import { Avatar, Box, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStore from "../../services/useAppStore";
import { useEffect, useRef } from "react";
import LanguageIcon from "@mui/icons-material/Language";

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
  const translateElementRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    const initializeGoogleTranslate = () => {
      if (window.google && window.google.translate && translateElementRef.current) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "si,ta,en",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );

        // Add styles for Google Translate
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
            cursor: pointer;
          }
          .goog-te-gadget-simple {
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
          }
          .goog-te-menu-value {
            display: none !important;
          }
          .goog-te-menu-value span {
            display: none !important;
          }
          .goog-te-banner-frame {
            display: none !important;
          }
          .skiptranslate {
            display: none !important;
          }
          body {
            top: 0 !important;
          }
          .goog-te-combo {
            margin: 0 !important;
          }
        `;
        document.head.appendChild(style);
      }
    };

    const loadGoogleTranslateScript = () => {
      if (scriptLoadedRef.current) return;
      scriptLoadedRef.current = true;

      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = initializeGoogleTranslate;
    };

    if (!window.google?.translate) {
      loadGoogleTranslateScript();
    } else {
      initializeGoogleTranslate();
    }

    return () => {
      // Clean up Google Translate elements when component unmounts
      const googleBanner = document.querySelector('.goog-te-banner-frame');
      if (googleBanner) {
        googleBanner.remove();
      }
      const googleTranslatedElements = document.querySelectorAll('.goog-te-gadget');
      googleTranslatedElements.forEach(el => el.remove());
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const handleMenuClick = (menuItem: string) => {
    setLeftMenuItem(menuItem);
    onMenuClick();
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
        position: "relative",
        zIndex: 1300,
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

      {/* Language Selector */}
     

      {/* Menu Items */}
      <Box sx={{ padding: "8px", position: "relative", zIndex: 1 }}>
        <MenuItem
          onClick={() => handleMenuClick("My Profile")}
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
          onClick={() => handleMenuClick("Manage Connections")}
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