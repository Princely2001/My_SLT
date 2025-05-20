import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import fetchBillStatus from "../../services/billMethod/fetchBillStatus";
import useStore from "../../services/useAppStore";
import fetchBillingDetails from "../../services/postpaid/fetchBillingDetails";

interface BillingDetail {
  outstandingBalance: number;
  lastBillDate: string;
  lastPaymentAmount: number;
  lastPaymentDate: string;
}

interface BillDetailsProps {
  selectedTab: string;
  telephoneNo: string;
  accountNo: string;
  billingDetails: BillingDetail[];
}

const BillDetails: React.FC<BillDetailsProps> = ({
  selectedTab,
  telephoneNo,
  accountNo,
  billingDetails,
}) => {
  const billingData = billingDetails?.[0];

  if (!billingData) {
    return (
      <Box sx={{ p: 2, mt: 2, textAlign: "center", width: "95%" }}>
        <CircularProgress />
      </Box>
    );
  }

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchBillingDetails(telephoneNo, accountNo);
      console.log("Fetched billing details inside useEffect:", details);
    };
  
    fetchDetails();
  }, [telephoneNo, accountNo]);
  

  
  const handlePayNow = async () => {
    const details = await fetchBillingDetails(telephoneNo, accountNo);
  
    if (!details || details.length === 0) {
      console.error("No billing details found");
      return;
    }
  
    const formData = {
      EventSource: accountNo,
      vpc_Amount: details[0].billAmount,
      prepaidID: "",
      reciever: "",
      packageId: "",
      channel: "SLTPRE",
      commitUser: "Omni",
      reporterPackage: "",
      callbackURLSLT: "",
    };
  
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://billpay.slt.lk/confirm.php";
    form.target = "_self"; // Use "_blank" to open in new tab
  
    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });
  
    document.body.appendChild(form);
    form.submit();
  };
  

  return (
    <Box sx={{ p: 0, width: "99%" }}>
      {selectedTab === "Total Payable" && (
        <>
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
              <Typography variant="body1">
                Rs. {billingData.outstandingBalance}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mt: 1 }}>
              For the month ending at {billingData.lastBillDate}
            </Typography>
          </Box>

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
            <Typography variant="body1">
              On {billingData.lastPaymentDate}
            </Typography>
          </Box>

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
              onClick={handlePayNow}
            >
              <Typography variant="body2">Pay Now</Typography>
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default BillDetails;