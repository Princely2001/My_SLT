import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { keyframes } from '@emotion/react';

interface SmsPackagesProps {
  onBack: () => void;
  isMobile?: boolean;
}

// Sample SMS bundles
const smsBundles = [
  { name: "100 SMS", price: "Rs.49.00", validity: "3 Days" },
  { name: "250 SMS", price: "Rs.99.00", validity: "7 Days" },
  { name: "Unlimited SMS", price: "Rs.199.00", validity: "30 Days" },
  { name: "Night SMS", price: "Rs.39.00", validity: "1 Night (10 PM - 6 AM)" },
  { name: "Weekend SMS", price: "Rs.69.00", validity: "Sat - Sun" },
  { name: "Work Pack SMS", price: "Rs.89.00", validity: "Mon - Fri (8 AM - 5 PM)" },
  { name: "Friends & Family", price: "Rs.59.00", validity: "5 Days" },
  { name: "Student SMS", price: "Rs.39.00", validity: "7 Days" }
];

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const colorScheme = {
  glowEffect: 'rgba(46, 164, 245, 0.4)',
  border: '1px solid rgba(46, 164, 245, 0.5)',
  text: '#2ea4f5',
  shimmer: 'linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.2) 50%, transparent 55%)',
};

export default function SmsPackages({ onBack, isMobile = false }: SmsPackagesProps) {
  return (
    <Box sx={{ p: 3 }}>
      {/* Top Bar */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onBack}
        sx={{
          color: 'white',
          mb: 3,
          px: 2,
          py: 1,
          borderRadius: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          textTransform: 'none',
          fontSize: isMobile ? '0.875rem' : '1rem',
          fontWeight: 600,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(5px)',
          '&:hover': {
            backgroundColor: 'rgba(0, 168, 232, 0.2)',
            borderColor: 'rgba(0, 168, 232, 0.5)',
            boxShadow: '0 0 15px rgba(0, 168, 232, 0.3)'
          }
        }}
      >
        SMS Packages
      </Button>

      {/* Bundle Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 2
        }}
      >
        {smsBundles.map((bundle, index) => (
          <Paper
            key={index}
            sx={{
              height: 200,
              background: 'rgba(255,255,255,0.05)',
              color: 'white',
              borderRadius: '12px',
              p: 2,
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(0, 168, 232, 0.1)',
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 20px rgba(0,168,232,0.2)'
              }
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {bundle.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mt: 0.5 }}>
                {bundle.validity}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                {bundle.price}
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  border: colorScheme.border,
                  color: colorScheme.text,
                  py: 1,
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(46, 164, 245, 0.1)',
                    transform: 'translateY(-2px)',
                    boxShadow: `0 5px 15px ${colorScheme.glowEffect}`,
                    '&::before': { opacity: 1 }
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: colorScheme.shimmer,
                    opacity: 0,
                    transition: 'opacity 0.5s ease',
                    animation: `${shimmer} 2s infinite`
                  }
                }}
                onClick={() => alert(`Activate ${bundle.name}`)}
              >
                Activate
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
