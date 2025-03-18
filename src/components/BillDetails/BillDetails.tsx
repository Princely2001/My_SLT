import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React from "react";

interface BillDetailsProps {
  selectedTab: string;
  telephoneNo: string;
  accountNo: string;
  billingDetails: any; 
}

const BillDetails: React.FC<BillDetailsProps> = ({
  selectedTab,
  telephoneNo,
  accountNo,
  billingDetails,
}) => {
  // Log the entire billingDetails to the console
  console.log("Full billing details:", billingDetails);
  console.log("Telephone No:", telephoneNo);
  console.log("Account No:", accountNo);

  // Check if billingDetails exists and use the first entry directly
  const billingData = billingDetails?.[0];

  if (!billingData) {
    return (
      <Box sx={{  p: 2, mt: 2, textAlign: "center", width: "95%"}}>
        <CircularProgress/>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 0, width: "99%" }}>
      {selectedTab === "Total Payable" && (
        <>
          {/* Total Payable Section */}
          <Box
            sx={{
              bgcolor: "#0056A2",
              color: "#FFFFFF",
              borderRadius: "8px",
              textAlign: "left",
              padding: 2,
              width: "98%",
            }}
          >
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1">Total Payable:</Typography>
              <Typography variant="body1">Rs. {billingData.outstandingBalance}</Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body1">
                For the month ending at {billingData.lastBillDate}
              </Typography>
            </Box>
            
          </Box>

          {/* Last Payment Section */}
          <Box
            sx={{
              bgcolor: "#E0F7FA",
              color: "#0056A2",
              mt: 4,
              borderRadius: "8px",
              textAlign: "left",
              padding: 2,
              width: "98%",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Last Payment: Rs. {billingData.lastPaymentAmount}
            </Typography>
            <Typography variant="body1">On {billingData.lastPaymentDate}</Typography>
          </Box>

          {/* Right-Aligned Pay Now Button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="contained"
              color="success"
              sx={{
                padding: "10px 20px",
                fontWeight: "bold",
                minHeight: "7vh",
                width: "15%",
                borderRadius: 2,
              }}
            >
          <Typography
          variant="body2"
        >
          pay now
        </Typography>
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default BillDetails;
