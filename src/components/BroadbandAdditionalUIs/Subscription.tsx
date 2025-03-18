import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";

// Import images
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import AddToBillImage from "../../assets/Images/subscriptionPageImages/AddToBill.png";
import PayNowImage from "../../assets/Images/subscriptionPageImages/PayNow.png";
import WatermarkLogo from "../../assets/Images/watermarklogo.png";
import fetchAdvancedReportEnableDetails from "../../services/postpaid/enableDetailedReport/fetchAdvancedReportEnableDetails";
import { EnableAdvancedReportDetails } from "../../types/types";
import activateDetailedReport from "../../services/postpaid/enableDetailedReport/activateDetailedReport";
import useStore from "../../services/useAppStore";

const SubscriptionPage = () => {
  const { serviceDetails } = useStore();
  const userName = serviceDetails?.listofBBService[0].serviceID || "";
  const [pageLoading, setPageLoading] = useState(true);
  const [selectedSubscriptionIndex, setSelectedSubscriptionIndex] = useState(0);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(-1);
  const [subscriptionDetails, setSubscriptionDetails] = useState<
    EnableAdvancedReportDetails[] | null
  >(null);

  const getSubscriptionDetails = async () => {
    setPageLoading(true);
    const response = await fetchAdvancedReportEnableDetails();
    if (response) {
      setSubscriptionDetails(response);
    }
    setPageLoading(false);
  };
  useEffect(() => {
    getSubscriptionDetails();
  }, []);
  const handleSubmit = () => {
    if (!isCheckboxChecked) {
      alert("Please agree to the general terms and conditions.");
      return;
    }

    if (selectedPaymentOption === -1) {
      alert("Please select a payment option");
      return;
    }
    if (selectedPaymentOption === 0) {
      alert("activated");
      // activateDetailedReport(userName, selectedSubscriptionIndex.toString());
    } else if (selectedPaymentOption === 1) {
      alert("paynow");
      //window.open("<payment_gateway_URL>", "_blank");
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "500px",
        backgroundColor: "white",
        borderRadius: 3, // Padding to create space inside the border
      }}
    >
      <Box
        sx={{
          position: "relative",

          width: "85%",
          height: "85%",
          border: "2px solid #0056A2",
          borderRadius: 3,
          padding: 3,
        }}
      >
        {pageLoading ? (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "100%",
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Title */}
            <Typography
              variant="body2" // Use body2 variant for typography
              sx={{
                fontSize: "22px",
                color: "#0056A2",
                fontWeight: "bold",
                marginBottom: 3,
                textAlign: "center",
              }}
            >
              Subscribe for detailed report
            </Typography>

            {/* Subscription Options */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 3,
              }}
            >
              {subscriptionDetails?.map((option, index) => (
                <Box
                  onClick={() => setSelectedSubscriptionIndex(index)}
                  key={index}
                  sx={{
                    width: "48%",
                    height: "125px",
                    border:
                      selectedSubscriptionIndex === index
                        ? "2px solid #0056A2"
                        : "1px solid #0056A2",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#0056A2",
                    fontWeight: "bold",
                    fontSize: "18px",
                    backgroundColor: "white",
                    flexDirection: "column", // Arrange the icon and text vertically
                    gap: 2, // Space between icon and text
                  }}
                >
                  {index === 0 ? (
                    <AccessTimeIcon sx={{ fontSize: 32, color: "#0056A2" }} />
                  ) : (
                    <EventIcon sx={{ fontSize: 32, color: "#0056A2" }} />
                  )}
                  <Typography variant="body2">{option.packagename}</Typography>
                </Box>
              ))}
            </Box>

            {/* Details Section */}
            <Box
              sx={{
                border: "1px solid #F5F9FF",
                borderRadius: "8px",
                padding: 2,
                marginBottom: 3,
                background: "#057DE81A",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography
                variant="body2" // Use body2 variant for typography
                sx={{
                  fontSize: "16px",
                  color: "#0056A2",
                }}
              >
                {subscriptionDetails &&
                  `Enabling the detailed report will charge Rs.${
                    subscriptionDetails[selectedSubscriptionIndex].postprice
                  } (+Tax) Per ${
                    subscriptionDetails[selectedSubscriptionIndex].packageid ==
                    "1"
                      ? "Month"
                      : "Year"
                  }.`}
              </Typography>

              {/* Replacing Buttons with Images */}
              <Box sx={{ display: "flex", gap: 2, zIndex: 2 }}>
                {/* Add to Bill Image */}
                <img
                  src={AddToBillImage}
                  alt="Add to Bill"
                  style={{
                    border:
                      selectedPaymentOption === 0 ? "2px solid #0056A2" : "",
                    borderRadius: "12px",
                    width: "100px",
                    height: "auto",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectedPaymentOption(0);
                  }} // Add functionality here
                />
                {/* Pay Now Image */}
                <img
                  src={PayNowImage}
                  alt="Pay Now"
                  style={{
                    border:
                      selectedPaymentOption === 1 ? "2px solid #0056A2" : "",
                    borderRadius: "12px",
                    width: "100px",
                    height: "auto",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectedPaymentOption(1);
                  }} // Add functionality here
                />
              </Box>
            </Box>

            {/* Terms and Conditions */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    required
                    checked={isCheckboxChecked}
                    onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                    sx={{
                      color: "#0056A2",
                      "&.Mui-checked": {
                        color: "#0056A2",
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "14px",
                      color: "#0056A2",
                    }}
                  >
                    I agree to the{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      general terms and conditions
                    </span>
                  </Typography>
                </Box>
                <Button
                  type="button"
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    zIndex: 2,
                    backgroundColor: "white",
                    border: "2px solid #0056A2",
                    color: "#0056A2",
                    textTransform: "none",
                    fontSize: "16px",
                    padding: "6px 30px",
                    borderRadius: "18px",
                    "&:hover": {
                      backgroundColor: "#0056A2", // Add hover color
                      color: "white",
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: 16,
                    }}
                  >
                    Submit
                  </Typography>
                </Button>
              </Box>
            </form>

            {/* Subscription Duration */}
            {/* Watermark Logo */}
            <Box
              sx={{
                position: "absolute",
                zIndex: 1,
                right: "2%",
                bottom: "2%",
              }}
            >
              <img src={WatermarkLogo} alt="Watermark Logo" />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SubscriptionPage;
