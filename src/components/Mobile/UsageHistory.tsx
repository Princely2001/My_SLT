import React, { useState } from "react";
import { Box, Button, Tabs, Tab, Paper, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import PhoneIcon from '@mui/icons-material/Phone';
import SmsIcon from '@mui/icons-material/Sms';
import CallIcon from '@mui/icons-material/Call';

// Props Interface
interface UsageHistoryProps {
  onBack: () => void;
}

export default function UsageHistory({ onBack }: UsageHistoryProps) {
  const [usageTab, setUsageTab] = useState(0);

  return (
    <Box sx={{ p: 3 }}>
      
      {/* Top Row: Back Arrow + Title */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <IconButton onClick={onBack} sx={{ color: "white", mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Usage History
        </Typography>
      </Box>

      {/* Tabs */}
      <Tabs
        value={usageTab}
        onChange={(e, newValue) => setUsageTab(newValue)}
        centered
        textColor="inherit"
        sx={{
          mb: 4,
          borderRadius: "12px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.1)",
          '.MuiTabs-flexContainer': { gap: 1 },
          '.MuiTab-root': {
            color: 'rgba(255,255,255,0.7)',
            fontWeight: 600,
            borderRadius: '8px',
            minHeight: '48px',
            textTransform: 'none',
            '&.Mui-selected': {
              color: '#00e6e6',
              background: 'rgba(0,230,230,0.1)'
            }
          }
        }}
      >
        <Tab icon={<DataUsageIcon />} label="Data" />
        <Tab icon={<PhoneIcon />} label="Voice" />
        <Tab icon={<SmsIcon />} label="SMS" />
        <Tab icon={<CallIcon />} label="Call" />
      </Tabs>

      {/* Tab Content */}
      <Paper sx={usagePaperStyle}>
        <UsageCard
          updatedAt="28/04/2025 11:22 AM"
          title={usageTab === 0 ? "Anytime" : usageTab === 1 ? "Voice M2M" : usageTab === 2 ? "M2M SMS" : "Loyalty Voice"}
          used={usageTab === 0 ? 1.88 : usageTab === 1 ? 20 : 2}
          total={usageTab === 0 ? 2 : usageTab === 1 ? 777 : 777}
          remaining={usageTab === 0 ? "122.61 MB" : usageTab === 1 ? "757 min" : "775"}
          unit={usageTab === 0 ? "GB" : usageTab === 1 ? "min" : "messages"}
          expiry="2025-05-03 07:04:57"
        />
      </Paper>
    </Box>
  );
}

// Card Style
const usagePaperStyle = {
  background: 'rgba(255,255,255,0.05)',
  borderRadius: '16px',
  p: 3,
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255,255,255,0.1)',
};

// Usage Card Component
const UsageCard = ({ updatedAt, title, used, total, remaining, unit, expiry }) => {
  const progress = (used / total) * 100;
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 0.5 }}>
        Updated as at {updatedAt}
      </Typography>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5, color: 'white' }}>
        {title}
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 2, color: 'rgba(255,255,255,0.7)' }}>
        Bundle
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <Box sx={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 5 }}>
            <Box sx={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #00e6e6, #0099cc)', borderRadius: 5 }} />
          </Box>
        </Box>
        <Typography variant="body2" fontWeight={600}>
          {remaining}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          {used} {unit} used of {total} {unit}
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          Remaining
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
        Expires on: {expiry}
      </Typography>
    </Box>
  );
};
