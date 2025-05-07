import React, { useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fetchPurchaseHistory from "../services/postpaid/fetchhistorydetails";
import { DataBundle } from "../types/types";
import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import useStore from "../services/useAppStore";

const tabTypes = ["all", "extra gb", "add-on"];

const PurchaseHistoryComponent: React.FC = () => {
  const [purchaseHistory, setPurchaseHistory] = useState<DataBundle[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const { serviceDetails } = useStore();
  const subscriberID = serviceDetails?.listofBBService[0]?.serviceID;

  const today = new Date();

  const [dateRanges, setDateRanges] = useState<{
    [key: string]: { from: Date | null; to: Date | null };
  }>({
    all: { from: new Date(), to: new Date() },
    "extra gb": { from: new Date(), to: new Date() },
    "add-on": { from: new Date(), to: new Date() },
  });

  const handleDateChange = useCallback(
    (field: "from" | "to", date: Date | null) => {
      const tabKey = tabTypes[selectedTab];
      setDateRanges((prev) => ({
        ...prev,
        [tabKey]: {
          ...prev[tabKey],
          [field]: date,
        },
      }));
    },
    [selectedTab]
  );

  const handleSearch = async () => {
    const tabKey = tabTypes[selectedTab];
    const { from, to } = dateRanges[tabKey];

    if (!from || !to) return;

    if (!subscriberID) {
      setError("Subscriber ID not found.");
      return;
    }

    if (from > to) {
      setError("Invalid date range: 'From' date cannot be later than 'To' date.");
      return;
    }

    setLoading(true);
    setError(null);
    setPurchaseHistory(null);

    try {
      const formattedFrom = from.toISOString().split("T")[0];
      const formattedTo = to.toISOString().split("T")[0];

      const data = await fetchPurchaseHistory(subscriberID, formattedFrom, formattedTo);
      setPurchaseHistory(data && data.length > 0 ? data : []);
    } catch {
      setError("Failed to fetch purchase history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const filterByTab = (data: DataBundle[] | null, tab: number): DataBundle[] => {
    if (!data) return [];

    switch (tab) {
      case 1:
        return data.filter((item) => item.vasType?.toLowerCase() === "extra gb");
      case 2:
        return data.filter((item) => item.vasType?.toLowerCase().includes("add-on"));
      default:
        return data;
    }
  };

  const currentTabKey = tabTypes[selectedTab];
  const { from: historyFrom, to: historyTo } = dateRanges[currentTabKey];
  const filteredHistory = filterByTab(purchaseHistory, selectedTab);

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        height:"400px",
        margin: "auto",
        padding: "30px",
        textAlign: "center",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", marginBottom: "20px", color: "#053da5" }}
      >
        Purchase History
      </Typography>

      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        centered
        textColor="primary"
        TabIndicatorProps={{ style: { display: "none" } }}
        sx={{
          mt: 1,
          backgroundColor: "#e3f2fd",
          borderRadius: "12px",
          px: 2,
          "& .MuiTab-root": {
            fontWeight: "bold",
            borderRadius: "10px",
            transition: "all 0.3s",
            mx: 1,
            minHeight: "36px",
            minWidth: "90px",
            textTransform: "none",
          },
          "& .Mui-selected": {
            backgroundColor: "#0056A2",
            color: "#fff !important",
          },
        }}
      >
        <Tab label="All" />
        <Tab label="Extra GB" />
        <Tab label="Add-Ons" />
      </Tabs>

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
          boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.05)",
          mt: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="body2" sx={{ fontWeight: "bold", color: "#333" }}>
              From:
            </Typography>
            <DatePicker
              selected={historyFrom}
              onChange={(date) => handleDateChange("from", date)}
              dateFormat="yyyy-MM-dd"
              maxDate={historyTo || today}
              customInput={
                <TextField variant="outlined" size="small" sx={{ width: "140px" }} />
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
              onChange={(date) => handleDateChange("to", date)}
              dateFormat="yyyy-MM-dd"
              maxDate={today}
              minDate={historyFrom}
              customInput={
                <TextField variant="outlined" size="small" sx={{ width: "140px" }} />
              }
            />
          </Box>
        </Box>

        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            padding: "10px 24px",
            fontSize: "14px",
            fontWeight: "bold",
            background: "#053da5",
            color: "white",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#0056A2" },
          }}
        >
          Search
        </Button>
      </Box>

      {loading && <CircularProgress sx={{ mt: 4, color: "#0056A2" }} />}
      {error && (
        <Typography sx={{ mt: 2, color: "#ff4d4d", fontWeight: "bold" }}>
          {error}
        </Typography>
      )}

      {purchaseHistory && (
        <Typography sx={{ mt: 2, fontSize: 14 }}>
          Showing results from <strong>{historyFrom?.toLocaleDateString()}</strong> to{" "}
          <strong>{historyTo?.toLocaleDateString()}</strong>
        </Typography>
      )}

      {filteredHistory.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "flex-start",
            marginTop: "24px",
          }}
        >
          {filteredHistory.map((item, index) => (
            <Box
              key={index}
              sx={{
                width: "32%",
                minWidth: "280px",
                background:
                  item.vasType?.toLowerCase() === "extra gb"
                    ? "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)"
                    : item.vasType?.toLowerCase().includes("add-on")
                    ? "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)"
                    : "linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%)",
                padding: "24px",
                borderRadius: "16px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                textAlign: "left",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 32px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#1976d2" }}>
                {item.vasType}
              </Typography>
              <Typography variant="body2">
                <strong>Activated by:</strong> {item.subscriberId}
              </Typography>
              <Typography variant="body2">
                <strong>Valid Till:</strong> {item.validTill || "N/A"}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "16px",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#555" }}>
                  {item.vasPackage}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 800, color: "#125ca1" }}
                >
                  Rs. {item.payPrice || "0.00"}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        !loading &&
        purchaseHistory !== null && (
          <Typography
            sx={{
              marginTop: "20px",
              fontSize: "16px",
              fontWeight: 600,
              color: "#999",
              fontStyle: "italic",
            }}
          >
            No {selectedTab === 1 ? "Extra GB" : selectedTab === 2 ? "Add-Ons" : ""} history
            found in the selected range.
          </Typography>
        )
      )}
    </Box>
  );
};

export default PurchaseHistoryComponent;