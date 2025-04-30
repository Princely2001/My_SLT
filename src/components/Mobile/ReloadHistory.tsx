import React from "react";
import { Box, Typography, IconButton, Paper, Divider, Grid } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface ReloadHistoryProps {
  onBack: () => void;
}

// Sample transaction data
const transactions = [
  { date: "28 Apr 2025", time: "10:29 PM", amount: "Rs.200.00" },
  { date: "01 Apr 2025", time: "11:13 PM", amount: "Rs.200.00" },
  { date: "01 Apr 2025", time: "11:12 PM", amount: "Rs.500.00" },
  { date: "01 Mar 2025", time: "10:41 PM", amount: "Rs.500.00" },
  { date: "01 Mar 2025", time: "10:37 PM", amount: "Rs.100.00" },
  { date: "26 Feb 2025", time: "6:01 AM", amount: "Rs.100.00" },
  { date: "11 Feb 2025", time: "5:58 AM", amount: "Rs.200.00" },
];

export default function ReloadHistory({ onBack }: ReloadHistoryProps) {
  return (
    <Box sx={{ p: 3 }}>
      {/* Top Bar */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <IconButton onClick={onBack} sx={{ color: "white", mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "white" }}>
          Transaction History
        </Typography>
      </Box>

      {/* Transaction List */}
      <Paper sx={{
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '16px',
        p: 2,
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: "white"
      }}>
        {transactions.map((tx, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {tx.date}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  {tx.time}
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {tx.amount}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
  <Typography variant="caption" sx={{ color: "#00cc44", fontWeight: 600 }}>
    OTHER
  </Typography>
  <Box sx={{
    px: 0.8,
    py: 0.2,
    backgroundColor: "#00cc44",
    color: "white",
    fontSize: "0.75rem",
    borderRadius: "4px",
    fontWeight: 600,
    lineHeight: 1,
  }}>
    Rs
  </Box>
</Box>

              </Grid>
            </Grid>

            {index !== transactions.length - 1 && (
              <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />
            )}
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
