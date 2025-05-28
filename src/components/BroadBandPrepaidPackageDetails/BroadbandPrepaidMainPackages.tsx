import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { fetchLTEPrepaidMainPackages } from "../../services/prepaid/fetchLTEPrepaidMainPackages";
import { BroadbandPrepaidMainPackageDetails } from "../../types/types";
import addBroadbandPackage from "../../services/prepaid/addBroadbandPackage";
import useStore from "../../services/useAppStore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const BroadbandPrepaidMainPackages: React.FC = () => {
  const theme = useTheme();
  const { selectedTelephone, setLeftMenuItem, setPackageListUpdate } =
    useStore();
  const [packages, setPackages] = useState<
    BroadbandPrepaidMainPackageDetails[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPackageIndex, setSelectedPackageIndex] = useState<
    number | null
  >(null);
  const [activeDot, setActiveDot] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Calculate how many cards are visible at once
  const calculateCardsPerView = () => {
    if (!scrollContainerRef.current) return 1;
    const cardWidth = scrollContainerRef.current.scrollWidth / packages.length;
    return Math.floor(scrollContainerRef.current.clientWidth / cardWidth);
  };

  useEffect(() => {
    const getPackages = async () => {
      setLoading(true);
      try {
        const data = await fetchLTEPrepaidMainPackages();
        setPackages(data);
      } catch (error) {
        setError(`Failed to fetch packages: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    getPackages();
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Calculate which card is currently most visible
      const cardWidth = container.scrollWidth / packages.length;
      const scrollPosition = container.scrollLeft + container.clientWidth / 2;
      const newActiveDot = Math.floor(scrollPosition / cardWidth);

      if (newActiveDot >= 0 && newActiveDot < packages.length) {
        setActiveDot(newActiveDot);
      }

      // Update arrow visibility
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 1
      );
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [packages]);

  const scrollToDot = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth =
        scrollContainerRef.current.scrollWidth / packages.length;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardsPerView = calculateCardsPerView();
      const newIndex = Math.max(0, activeDot - cardsPerView);
      scrollToDot(newIndex);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardsPerView = calculateCardsPerView();
      const newIndex = Math.min(packages.length - 1, activeDot + cardsPerView);
      scrollToDot(newIndex);
    }
  };

  const handleBackToMain = () => {
    setLeftMenuItem("Main Packages");
  };

  const handleButtonPress = (index: number) => {
    setSelectedPackageIndex(index);
    setDialogOpen(true);
  };

  const handleConfirmActivation = async () => {
    const telephoneNo = selectedTelephone.toString();
    const offeringId = packages[selectedPackageIndex!]?.OFFERING_ID;
    const pkgName = packages[selectedPackageIndex!]?.OFFERING_NAME;
    await addBroadbandPackage(telephoneNo, offeringId, pkgName);
    setPackageListUpdate();
    setDialogOpen(false);
    setLeftMenuItem("Main Packages");
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress sx={{ color: "#3076B2" }} size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography
        variant="h6"
        color="error"
        sx={{ textAlign: "center", mt: 4 }}
      >
        {error}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        color: "#FFFFFF1A",
        padding: 2,
        borderRadius: "10px",
        height: "100%",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Back Button */}
    

      {/* Cards Container with Navigation Arrows */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          position: "relative",
        }}
      >
        {/* Left Arrow */}
        {showLeftArrow && (
          <IconButton
            onClick={scrollLeft}
            sx={{
              position: "absolute",
              left: 10,
              zIndex: 2,
              backgroundColor: "white",
              color: "#0056A2",
              width: 48,
              height: 48,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(90deg, #3076B2 0%, #0056A2 100%)",
                color: "white",
                transform: "scale(1.1)",
              },
              "&:active": {
                transform: "scale(0.95)",
              },
            }}
          >
            <ChevronLeftIcon fontSize="large" />
          </IconButton>
        )}

        {/* Scrollable Cards Container */}
        <Box
          ref={scrollContainerRef}
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            padding: "16px 8px",
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            "-ms-overflow-style": "none",
            scrollBehavior: "smooth",
          }}
        >
          {packages.map((pkg, index) => (
            <Card
              key={index}
              sx={{
                minWidth: "30%",
                backgroundColor: "#3076B2",
                color: "white",
                borderRadius: "12px",
                transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: "#0056A2",
                  transform: "scale(1.05)",
                  marginLeft: "12px",
                  marginRight: "12px",
                  boxShadow: "0px 8px 16px rgba(0, 86, 162, 0.3)",
                },
              }}
            >
              <CardContent sx={{ padding: "20px" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {pkg.MYSLT_PKG_NAME}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      width: "80%",
                      border: "3px solid white",
                      padding: 2,
                      borderRadius: 3,
                      justifyContent: "center",
                      alignItems: "center",
                      background: "rgba(255, 255, 255, 0.1)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.2)",
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        margin: "auto",
                        fontSize: "2.2rem",
                        fontWeight: "bold",
                        lineHeight: 1,
                      }}
                      variant="body2"
                    >
                      {pkg.DATA_VOLUME_GB}GB
                    </Typography>
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      mt: 2,
                      fontWeight: "bold",
                      fontSize: "1.8rem",
                    }}
                  >
                    Rs.{pkg.PRICE_LKR_WITH_TAX} /-
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, fontWeight: "bold", opacity: 0.9 }}
                  >
                    (With Tax)
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      mb: 2,
                      fontWeight: "500",
                      "& strong": {
                        color: "#FFD700",
                      },
                    }}
                  >
                    Validity: <strong>{pkg.VALIDITY} Days</strong>
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{
                      mt: 1,
                      background:
                        "linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)",
                      color: "white",
                      borderRadius: "8px",
                      width: "70%",
                      padding: "12px",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #43A047 0%, #1B5E20 100%)",
                        transform: "translateY(-3px)",
                        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      },
                    }}
                    onClick={() => handleButtonPress(index)}
                  >
                    Activate Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Right Arrow */}
        {showRightArrow && (
          <IconButton
            onClick={scrollRight}
            sx={{
              position: "absolute",
              right: 10,
              zIndex: 2,
              backgroundColor: "white",
              color: "#0056A2",
              width: 48,
              height: 48,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(90deg, #3076B2 0%, #0056A2 100%)",
                color: "white",
                transform: "scale(1.1)",
              },
              "&:active": {
                transform: "scale(0.95)",
              },
            }}
          >
            <ChevronRightIcon fontSize="large" />
          </IconButton>
        )}
      </Box>

      {/* Interactive Pagination Dots */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
          gap: 1,
        }}
      >
        {packages.map((_, index) => (
          <IconButton
            key={index}
            onClick={() => scrollToDot(index)}
            sx={{
              p: 0,
              "&:hover": {
                transform: "scale(1.3)",
              },
              transition: "transform 0.2s",
            }}
          >
            <Box
              sx={{
                width: index === activeDot ? 12 : 8,
                height: index === activeDot ? 12 : 8,
                borderRadius: "50%",
                bgcolor: index === activeDot ? "#0056A2" : "#E0E0E0",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: index === activeDot ? "#003D7A" : "#BDBDBD",
                },
              }}
            />
          </IconButton>
        ))}
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0px 8px 24px rgba(0, 86, 162, 0.2)",
            maxWidth: "450px",
            width: "100%",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(90deg, #3076B2 0%, #0056A2 100%)",
            color: "white",
            padding: "20px 24px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Confirm Package Activation
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ padding: "24px" }}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography
              variant="body1"
              sx={{ fontSize: "1.1rem", color: "#333" }}
            >
              You're about to activate:
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 1,
                color: "#0056A2",
                fontWeight: 700,
                fontSize: "1.3rem",
              }}
            >
              {selectedPackageIndex !== null &&
                packages[selectedPackageIndex]?.MYSLT_PKG_NAME}
            </Typography>
          </Box>
          <Box
            sx={{
              background: "#F5F9FF",
              borderRadius: "8px",
              padding: "16px",
              mt: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "#555", textAlign: "center" }}
            >
              <strong>Details:</strong>{" "}
              {selectedPackageIndex !== null &&
                packages[selectedPackageIndex]?.DATA_VOLUME_GB}
              GB | Rs.
              {selectedPackageIndex !== null &&
                packages[selectedPackageIndex]?.PRICE_LKR_WITH_TAX}{" "}
              |
              {selectedPackageIndex !== null &&
                packages[selectedPackageIndex]?.VALIDITY}{" "}
              Days
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            padding: "16px 24px",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderColor: "#0056A2",
              color: "#0056A2",
              borderRadius: "8px",
              padding: "8px 24px",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "rgba(0, 86, 162, 0.08)",
                borderColor: "#004494",
              },
            }}
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #3076B2 0%, #0056A2 100%)",
              color: "white",
              borderRadius: "8px",
              padding: "8px 24px",
              fontWeight: 600,
              boxShadow: "none",
              "&:hover": {
                background: "linear-gradient(90deg, #004494 0%, #002D62 100%)",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              },
            }}
            onClick={handleConfirmActivation}
            autoFocus
          >
            Confirm Activation
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BroadbandPrepaidMainPackages;
