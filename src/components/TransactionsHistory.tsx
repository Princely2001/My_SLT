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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import fetchTransactionHistory from "../services/prepaid/fetchTransactionHistory";
import { parseTime } from "../services/helperFunctions";
import { Transaction } from "../types/types";

interface TransactionsHistoryProps {
serviceId: string;
}

const formatTxnDate = (timestamp: string): string => {
const date = parseTime(timestamp);
return date ? date.toISOString().slice(0, 10) : ""; // Format as YYYY-MM-DD
};

const formatTxnTime = (timestamp: string): string => {
const date = parseTime(timestamp);
return date ? date.toISOString().slice(11, 19) : ""; // Format as HH:MM:SS
};

const TransactionsHistory: React.FC<TransactionsHistoryProps> = ({ serviceId }) => { 
const [transactions, setTransactions] = useState<Transaction[]>([]);
const [error, setError] = useState<string | null>(null);

const toDate = new Date();
const fromDate = new Date(toDate);
fromDate.setMonth(fromDate.getMonth() - 1);

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};

const formattedFromDate = formatDate(fromDate);
const formattedToDate = formatDate(toDate);

useEffect(() => {
  const fetchTransactions = async () => {
    try {
      const data: Transaction[] | null = await fetchTransactionHistory(
        serviceId,
        formattedFromDate,
        formattedToDate
      );
      if (data) {
        const sortedTransactions = data.sort((a, b) => b.txnTime.localeCompare(a.txnTime));
        setTransactions(sortedTransactions);
        setError(null);
      } else {
        setError("Failed to fetch transaction history or data not found.");
      }
    } catch (fetchError) {
      setError(`An error occurred while fetching transaction history.${fetchError} `);
    }
  };

  fetchTransactions();
}, [serviceId, formattedFromDate, formattedToDate]);

return (
  <Box
    sx={{
      display: "flex",
      gap: 1,
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      color: "#FFFFFF1A",
      padding: 1.5,
      borderRadius: "10px",
      height: "100%",
      boxShadow: "0px 3px 3px #0000004A",
      overflow: "hidden",
    }}
  >
    <Box sx={{ padding: 1, width: "100%" }}>
      <Typography
        variant="body2"
        align="center"
        sx={{ fontSize:23, fontWeight: "bold", color: "#0056A2", marginBottom: 2 }}
      >
        ── Transactions History ──
      </Typography>

      {error ? (
        <Typography color="error" align="center" sx={{ marginY: 2 }}>
          {error}
        </Typography>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            overflow: "auto",
            maxHeight: 335,
            paddingRight: 0.5,
            "&::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#0D67A6",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#0056A2",
            },
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#0056A2" }}>
                <TableCell
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Time
                </TableCell>
                <TableCell
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Reload Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{
                    backgroundColor: "#0D67A6",
                    borderRadius: 2,
                    marginY: 1,
                  }}
                >
                  <TableCell
                    sx={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {formatTxnDate(transaction.txnTime)}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#FFFFFF",
                      textAlign: "center",
                    }}
                  >
                    {formatTxnTime(transaction.txnTime)}
                  </TableCell>
                  <TableCell sx={{ color: "#FFFFFF", textAlign: "center" }}>
                    {transaction.statusCode === "1001" ? "Recharge Success" : "Recharge Failed"}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Rs. {transaction.txnAmount}
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
