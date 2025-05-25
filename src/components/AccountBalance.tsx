import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { parseTime } from "../services/helperFunctions";
import fetchBillingDetails from "../services/postpaid/fetchBillingDetails";
import fetchWalletDetail from "../services/prepaid/fetchWalletDetails";
import useStore from "../services/useAppStore";

const AccountBalance: React.FC = () => {
  const { serviceDetails, selectedTelephone, setLeftMenuItem } = useStore();
  const [amount, setAmount] = useState("");
  const [expireTime, setExpireTime] = useState("");
  const [billingAmount, setBillingAmount] = useState<string | null>(null);
  const isPrepaid = serviceDetails?.promotionType === "Prepaid";

  useEffect(() => {
    const fetchData = async () => {
      // Fetch wallet details
      const walletDetails = await fetchWalletDetail(selectedTelephone);
      const amount = walletDetails?.amount ? walletDetails.amount / 100 : 0;
      const formattedAmount = amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setAmount(formattedAmount);

      // Set expire time
      const walletExpireTime = walletDetails?.expireTime;
      const formattedTime = walletExpireTime ? parseTime(walletExpireTime) : null;
      const formattedExpireDate = formattedTime
        ? formattedTime.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        : "N/A";

      setExpireTime(formattedExpireDate);

      // Fetch billing details
      if (selectedTelephone && serviceDetails?.accountNo) {
        const billingInquiry = await fetchBillingDetails(
          selectedTelephone,
          serviceDetails.accountNo
        );
        if (billingInquiry && billingInquiry.length > 0) {
          // Format billing amount with thousand separators
          const billAmount = parseFloat(billingInquiry[0].billAmount || "0");
          const formattedBillAmount = billAmount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          setBillingAmount(formattedBillAmount);
        }
      }
    };

    fetchData();
  }, [selectedTelephone, serviceDetails]);

  // Function to format amount with thousand separators
  const formatAmount = (value: string) => {
    if (!value) return "0.00";
    const num = parseFloat(value.replace(/,/g, ''));
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "7vh",
        minHeight: "60px",
        border: "2px solid #FFFFFF",
        borderRadius: "8px",
        backgroundColor: "#FFFFFF80",
        paddingY: 0.1,
        paddingX: 2,
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="body2"
          sx={{ color: "#0056A2", fontSize: 18, fontWeight: 700 }}
        >
          {isPrepaid ? "Balance" : "Total Payable"}
        </Typography>
        <Typography variant="body2" sx={{ color: "#0056A2", fontSize: 12 }}>
          {isPrepaid ? "Expires on " : "For month Ending at "}
          <Typography
            variant="body2"
            component="span"
            sx={{ fontSize: 12, fontWeight: 700 }}
          >
            {expireTime}
          </Typography>
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 0.75 }}></Box>
      
      <Typography
        variant="body2"
        sx={{ color: "#0056A2", fontSize: 25, fontWeight: "900" }}
      >
        Rs. {isPrepaid ? amount : billingAmount ? formatAmount(billingAmount) : "0.00"}
      </Typography>

      <Button
        sx={{
          backgroundColor: "#4FD745",
          borderRadius: 2,
          width: "20%",
          height: "35px",
          "&:hover": {
            backgroundColor: "#79D84A",
          },
        }}
        onClick={() => {
          if(isPrepaid) setLeftMenuItem("Transaction");
          else setLeftMenuItem("Bill");
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: "#FFFFFF", textTransform: "capitalize", fontSize: 14 }}
        >
          {isPrepaid ? "Transaction" : "Pay Now"}
        </Typography>
      </Button>
    </Box>
  );
};

export default AccountBalance;