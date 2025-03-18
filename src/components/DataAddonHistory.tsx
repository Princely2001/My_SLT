import React, { useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fetchPurchaseHistory from "../services/postpaid/fetchhistorydetails";
import { DataBundle } from "../types/types";
import { Box, Typography, Button, TextField } from "@mui/material";

import useStore from "../services/useAppStore";


const PurchaseHistoryComponent: React.FC = () => {
  const [purchaseHistory, setPurchaseHistory] = useState<DataBundle[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const { serviceDetails } = useStore();
  const subscriberID = serviceDetails?.listofBBService[0]?.serviceID;

  const [historyFrom, setHistoryFrom] = useState<Date | null>(new Date());
  const [historyTo, setHistoryTo] = useState<Date | null>(new Date());

  const handleFromDateChange = useCallback((date: Date | null) => {
    setHistoryFrom(date);
  }, []);

  const handleToDateChange = useCallback((date: Date | null) => {
    setHistoryTo(date);
  }, []);

  const handleSearch = async () => {
    if (!historyFrom || !historyTo) return;

    if (historyFrom > historyTo) {
      setError("Invalid date range: 'From' date cannot be later than 'To' date.");
      return;
    }

    setLoading(true);
    setError(null);
    setPurchaseHistory(null);

    try {
      const formattedFrom = historyFrom.toLocaleDateString("en-CA");
      const formattedTo = historyTo.toLocaleDateString("en-CA");

      const data = await fetchPurchaseHistory(subscriberID, formattedFrom, formattedTo);
      setPurchaseHistory(data && data.length > 0 ? data : []);
    } catch {
      setError("Failed to fetch purchase history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "30px",
        textAlign: "center",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "20px", color: "#053da5" }}>
        Purchase History
      </Typography>

      {/* Date Inputs & Search Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          padding: "12px",
          borderRadius: "8px",
          flexWrap: "wrap",
          backgroundColor: "#f8f9fa",
          boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="body2" sx={{ fontWeight: "bold", color: "#333" }}>
              From:
            </Typography>
            <DatePicker
              selected={historyFrom}
              onChange={handleFromDateChange}
              dateFormat="yyyy-MM-dd"
              maxDate={historyTo}
              customInput={
                <TextField
                  variant="outlined"
                  size="small"
                  sx={{
                    width: "140px",
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#ccc" },
                      "&:hover fieldset": { borderColor: "#007bff" },
                      "&.Mui-focused fieldset": { borderColor: "#0056A2", boxShadow: "0px 0px 8px rgba(0, 86, 162, 0.4)" },
                    },
                  }}
                />
              }
            />
          </Box>
          <Typography variant="body1" sx={{ fontWeight: "bold", color: "#333" }}>
            -
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="body2" sx={{ fontWeight: "bold", color: "#333" }}>
              To:
            </Typography>
            <DatePicker
              selected={historyTo}
              onChange={handleToDateChange}
              dateFormat="yyyy-MM-dd"
              minDate={historyFrom}
              customInput={
                <TextField
                  variant="outlined"
                  size="small"
                  sx={{
                    width: "140px",
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#ccc" },
                      "&:hover fieldset": { borderColor: "#007bff" },
                      "&.Mui-focused fieldset": { borderColor: "#0056A2", boxShadow: "0px 0px 8px rgba(0, 86, 162, 0.4)" },
                    },
                  }}
                />
              }
            />
          </Box>
        </Box>

        <Button
          variant="contained"
          sx={{
            padding: "10px 24px",
            fontSize: "14px",
            fontWeight: "bold",
            background: "#053da5",
            color: "white",
            borderRadius: "6px",
            "&:hover": { backgroundColor: "#0056A2" },
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      {loading && <Typography sx={{ marginTop: "20px", color: "#00256A" }}>Loading...</Typography>}
      {error && <Typography sx={{ marginTop: "20px", color: "#ff4d4d", fontWeight: "bold" }}>{error}</Typography>}

      {purchaseHistory && purchaseHistory.length > 0 ? (
        <Box sx={{ marginTop: "20px", padding: "15px", borderRadius: "12px" }}>
          {purchaseHistory.map((item, index) => (
            <Box
              key={index}
              sx={{
                background: "linear-gradient(135deg, #004691, #009acd)",
                color: "white",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                marginBottom: "15px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
                {item.vasType}
              </Typography>
              <Typography variant="body2"><strong>Added by:</strong> {item.subscriberId}</Typography>
              <Typography variant="body2"><strong>Valid Till:</strong> {item.validTill || "N/A"}</Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", marginTop: "10px" }}>
                <Typography variant="h6" sx={{ color: "yellow" }}>{item.vasPackage}</Typography>
                <Typography variant="h6">Rs. {item.payPrice || "0.00"}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        !loading && purchaseHistory !== null && <Typography sx={{ marginTop: "20px", fontSize: "18px", fontWeight: 600, color: "#0056A2" }}>No purchase history available.</Typography>
      )}
    </Box>
  );
};

export default PurchaseHistoryComponent;
