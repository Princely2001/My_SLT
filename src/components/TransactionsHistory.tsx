import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import fetchTransactionHistory from "../services/prepaid/fetchTransactionHistory";
import { parseTime } from "../services/helperFunctions";
import { Transaction } from "../types/types";
import useStore from "../services/useAppStore";

interface TransactionsHistoryProps {
  serviceId: string;
}

const formatTxnDate = (timestamp: string): string => {
  const date = parseTime(timestamp);
  return date ? date.toLocaleDateString() : "";
};

const formatTxnTime = (timestamp: string): string => {
  const date = parseTime(timestamp);
  return date ? date.toLocaleTimeString() : "";
};

const TransactionsHistory: React.FC<TransactionsHistoryProps> = ({ serviceId }) => { 
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { serviceDetails } = useStore();
  const subscriberID = serviceDetails?.listofBBService[0]?.serviceID;

  // Initialize date range state (last month to today)
  const initialToDate = new Date();
  const initialFromDate = new Date(initialToDate);
  initialFromDate.setMonth(initialFromDate.getMonth() - 1);

  const [fromDate, setFromDate] = useState<string>(
    initialFromDate.toISOString().slice(0, 10)
  );
  const [toDate, setToDate] = useState<string>(
    initialToDate.toISOString().slice(0, 10)
  );

  const formatDateForApi = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const fetchTransactions = async (fromDateStr: string, toDateStr: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const data: Transaction[] | null = await fetchTransactionHistory(
        serviceId,
        formatDateForApi(fromDateStr),
        formatDateForApi(toDateStr)
      );
      
      if (data) {
        const sortedTransactions = [...data].sort((a, b) => 
          b.txnTime.localeCompare(a.txnTime)
        );
        setTransactions(sortedTransactions);
      } else {
        setError("No transaction history found for this period.");
      }
    } catch (fetchError) {
      setError("Failed to load transaction history. Please try again later.");
      console.error("Transaction history error:", fetchError);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate date range
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    
    if (fromDateObj > toDateObj) {
      setError("From date cannot be after to date");
      return;
    }
    
    fetchTransactions(fromDate, toDate);
  };

  // Load initial data on mount
  useEffect(() => {
    fetchTransactions(fromDate, toDate);
  }, [subscriberID]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 2,
        borderRadius: "10px",
        height: "100%",
        boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.29)",
        overflow: "hidden",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h6"
          align="center"
          sx={{ 
            fontWeight: "bold", 
            color: "#0056A2", 
            mb: 2,
            "&:before, &:after": {
              content: '"──"',
              mx: 1,
              color: "rgba(0, 86, 162, 0.5)"
            }
          }}
        >
          Transactions History
        </Typography>

        {/* Date range form */}
       <Box sx={{ 
  display: "flex", 
  alignItems: "center", 
  gap: 2, 
  p: 2, 
  borderRadius: "10px", 
  backgroundColor: "#B3EDFF8A", 
  width: "95%", 
  mb: 2 
}}>
  <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
    <Box sx={{ minWidth: "140px" }}>
      <Typography variant="body2" sx={{ 
        fontSize: "14px", 
        fontWeight: 700, 
        color: "#0056A2", 
        mb: 0.5 
      }}>
        From:
      </Typography>
      <TextField
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        size="small"
        fullWidth
        sx={{ 
          "& .MuiOutlinedInput-root": { 
            borderRadius: "8px", 
            backgroundColor: "white" 
          } 
        }}
      />
    </Box>

    <Box sx={{ minWidth: "140px" }}>
      <Typography variant="body2" sx={{ 
        fontSize: "14px", 
        fontWeight: 700, 
        color: "#0056A2", 
        mb: 0.5 
      }}>
        To:
      </Typography>
      <TextField
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        size="small"
        fullWidth
        sx={{ 
          "& .MuiOutlinedInput-root": { 
            borderRadius: "8px", 
            backgroundColor: "white" 
          } 
        }}
      />
    </Box>
  </Box>

  <Button 
    variant="contained" 
    onClick={handleSubmit}
    disabled={loading}
    sx={{ 
      minWidth: "120px", 
      height: "40px", 
      backgroundColor: "#0056A2", 
      color: "white", 
      borderRadius: "8px", 
      "&:hover": { 
        backgroundColor: "#004b8c" 
      },
      "&:disabled": {
        backgroundColor: "#cccccc",
        color: "#666666"
      }
    }}
  >
    <Typography variant="body2" sx={{ 
      fontSize: "16px", 
      fontWeight: 600, 
      textTransform: "none" 
    }}>
      {loading ? "Searching..." : "Search"}
    </Typography>
  </Button>
</Box>

        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress color="primary" />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : transactions.length === 0 ? (
          <Alert severity="info" sx={{ mb: 2 }}>
            No transactions found for the selected period
          </Alert>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 2,
              overflow: "auto",
              maxHeight: 400,
              "&::-webkit-scrollbar": {
                width: 8,
                height: 8,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f1f1f1",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#0D67A6",
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "#0056A2",
                },
              },
            }}
          >
            <Table stickyHeader aria-label="transaction history table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{
                      backgroundColor: "#0056A2",
                      color: "#FFFFFF",
                      fontWeight: "bold",
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      backgroundColor: "#0056A2",
                      color: "#FFFFFF",
                      fontWeight: "bold",
                    }}
                  >
                    Time
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      backgroundColor: "#0056A2",
                      color: "#FFFFFF",
                      fontWeight: "bold",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      backgroundColor: "#0056A2",
                      color: "#FFFFFF",
                      fontWeight: "bold",
                    }}
                  >
                    Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    hover
                    sx={{
                      "&:nth-of-type(even)": { backgroundColor: "#f5f9fd" },
                      "&:last-child td": { borderBottom: 0 },
                    }}
                  >
                    <TableCell align="center">
                      {formatTxnDate(transaction.txnTime)}
                    </TableCell>
                    <TableCell align="center">
                      {formatTxnTime(transaction.txnTime)}
                    </TableCell>
                    <TableCell 
                      align="center"
                      sx={{
                        color: transaction.statusCode === "1001" 
                          ? "success.main" 
                          : "error.main",
                        fontWeight: "medium"
                      }}
                    >
                      {transaction.statusCode === "1001" 
                        ? "Success" 
                        : "Failed"}
                    </TableCell>
                    <TableCell 
                      align="center"
                      sx={{ fontWeight: "bold" }}
                    >
                      Rs. {transaction.txnAmount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default TransactionsHistory;