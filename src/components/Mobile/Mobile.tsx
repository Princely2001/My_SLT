import React, { useState } from "react";
import { Box, Typography, Button, CircularProgress, Grid, Paper, Divider } from "@mui/material";
import { FaCloudSun, FaCloudMoon, FaPhoneAlt, FaSms, FaBolt, FaWallet, FaChartLine, FaHistory, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import UsageHistory from "./UsageHistory";
import DataUsageDetails from "./Viewdetails";
import ReloadHistory from "./ReloadHistory";

export default function DesktopDashboard() {
  const [activeTab, setActiveTab] = useState("data");
  const [isHovered, setIsHovered] = useState(false);
  const [view, setView] = useState<'dashboard' | 'usageHistory' | 'dataUsageDetails' | 'reloadHistory'>('dashboard');
 
  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,rgb(13, 54, 90) 0%,rgb(25, 71, 114) 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      py: 4,
      color: "white",
      fontFamily: "'Inter', sans-serif",
      position: "relative",
      overflow: "hidden",
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #00e6e6, #0099cc)',
        zIndex: 1
      }
    }}>
      {/* Floating background elements */}
      {[...Array(10)].map((_, i) => (
        <Box key={i} sx={{
          position: 'absolute',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 230, 230, 0.1) 0%, transparent 70%)',
          width: `${200 + Math.random() * 300}px`,
          height: `${200 + Math.random() * 300}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: 0.3,
          zIndex: 0
        }} />
      ))}

      {/* Main Content Container */}
      <Box sx={{
        width: "150%",
        maxWidth: "975px",
        position: "relative",
        zIndex: 1,
        overflowY: "auto",
        height: "75vh",
        maxHeight: "70vh",
        scrollbarWidth: "thin",
        '&::-webkit-scrollbar': {
          width: "8px",
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,230,230,0.5)',
          borderRadius: "4px",
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'rgba(0,0,0,0.1)',
        }
      }}>
        {view === 'dashboard' && (
          <>
            {/* Header Section */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  p: 2,
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                }}>
                  {/* Profile Avatar */}
                  <Box sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #00e6e6, #0099cc)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 700
                  }}>
                    JP
                  </Box>
                  
                  {/* Profile Info */}
                  <Box sx={{
                    animation: 'fadeIn 0.8s ease-in-out',
                    '@keyframes fadeIn': {
                      '0%': { opacity: 0, transform: 'translateY(10px)' },
                      '100%': { opacity: 1, transform: 'translateY(0)' }
                    }
                  }}>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 700,
                      mb: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      textShadow: '0 0 8px rgba(0, 230, 230, 0.3)'
                    }}>
                      Shenaya Fernando
                      <Box component="span" sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#4CAF50',
                        boxShadow: '0 0 8px #4CAF50',
                        animation: 'pulse 2s infinite',
                        '@keyframes pulse': {
                          '0%': { boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.7)' },
                          '70%': { boxShadow: '0 0 0 10px rgba(76, 175, 80, 0)' },
                          '100%': { boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)' }
                        }
                      }} />
                    </Typography>
                    
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      animation: 'slideIn 0.5s ease-out 0.2s both',
                      '@keyframes slideIn': {
                        '0%': { opacity: 0, transform: 'translateX(-10px)' },
                        '100%': { opacity: 1, transform: 'translateX(0)' }
                      }
                    }}>
                      <Box sx={{
                        px: 2,
                        py: 0.5,
                        borderRadius: '12px',
                        background: 'rgba(0, 230, 230, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0, 230, 230, 0.3)',
                        boxShadow: '0 4px 20px rgba(0, 153, 204, 0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 24px rgba(0, 153, 204, 0.3)'
                        },
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(0, 230, 230, 0.2), transparent)',
                          transition: '0.5s',
                        },
                        '&:hover::before': {
                          left: '100%'
                        }
                      }}>
                        <Typography variant="body2" sx={{ 
                          fontWeight: 600,
                          letterSpacing: '0.5px',
                          background: 'linear-gradient(90deg, #00e6e6, #0099cc)',
                          backgroundClip: 'text',
                          textFillColor: 'transparent',
                          position: 'relative',
                          zIndex: 1
                        }}>
                          Silver Member
                        </Typography>
                      </Box>
                      
                      <Typography variant="body2" sx={{
                        color: 'rgba(255,255,255,0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '8px',
                        background: 'rgba(0, 153, 204, 0.1)',
                        backdropFilter: 'blur(5px)',
                        border: '1px solid rgba(0, 153, 204, 0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(0, 153, 204, 0.2)',
                          transform: 'scale(1.03)'
                        }
                      }}>
                        <FaWallet size={14} style={{
                          filter: 'drop-shadow(0 0 4px rgba(0, 230, 230, 0.5))',
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'rotate(10deg)'
                          }
                        }} /> 
                        <Box component="span" sx={{ 
                          color: '#00e6e6',
                          textShadow: '0 0 8px rgba(0, 230, 230, 0.3)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            textShadow: '0 0 12px rgba(0, 230, 230, 0.5)'
                          }
                        }}>
                          Rs 120.08
                        </Box>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  height: '100%'
                }}>
                  <Button 
                    variant="outlined" 
                    startIcon={<FaHistory />}
                    onClick={() => setView('usageHistory')}
                    sx={{ 
                      borderRadius: "20px", 
                      px: 3,
                      py: 1,
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                      borderColor: 'rgba(255,255,255,0.3)',
                      color: 'white',
                      mr: 2,
                      '&:hover': {
                        borderColor: 'rgba(255,255,255,0.5)',
                        background: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    Usage History
                  </Button>
                  <Button 
                    variant="contained" 
                    startIcon={<FaChartLine />}
                    sx={{ 
                      background: 'linear-gradient(90deg, #00e6e6, #0099cc)',
                      borderRadius: "20px", 
                      px: 3,
                      py: 1,
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                      boxShadow: '0 4px 15px rgba(0,230,230,0.3)',
                      '&:hover': {
                        boxShadow: '0 6px 20px rgba(0,230,230,0.4)'
                      }
                    }}
                  >
                    Analytics
                  </Button>
                </Box>
              </Grid>
            </Grid>

            {/* Main Dashboard Grid */}
            <Grid container spacing={4}>
              {/* Left Column */}
              <Grid item xs={12} md={4}>
                {/* Circular Data Progress */}
                <Paper sx={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '16px',
                  p: 3,
                  mb: 4,
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)'
                }}>
                  <Box sx={{ position: "relative", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CircularProgress 
                      variant="determinate" 
                      value={75} 
                      size={150} 
                      thickness={4}
                      sx={{ 
                        color: "#00e6e6",
                        filter: 'drop-shadow(0 0 12px rgba(0,230,230,0.7))'
                      }}
                    />
                    <Box sx={{ textAlign: "center", mt: 3 }}>
                      <Typography variant="h3" sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(90deg, #00e6e6, #ffffff)',
                        backgroundClip: 'text',
                        textFillColor: 'transparent',
                        lineHeight: 1,
                        mb: 1
                      }}>
                        75%
                      </Typography>
                      <Typography variant="h6" sx={{
                        color: 'rgba(255,255,255,0.8)',
                        mb: 2
                      }}>
                        Data Remaining
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => setView('dataUsageDetails')}
                        sx={{
                          background: 'linear-gradient(135deg, rgba(0, 230, 230, 0.2), rgba(0, 153, 204, 0.3))',
                          borderRadius: '20px',
                          px: 4,
                          py: 1.5,
                          fontWeight: 600,
                          border: '1px solid rgba(0, 230, 230, 0.3)',
                          color: '#ffffff',
                          boxShadow: '0 4px 15px rgba(0, 153, 204, 0.2)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, rgba(0, 230, 230, 0.3), rgba(0, 153, 204, 0.4))',
                            boxShadow: '0 6px 20px rgba(0, 153, 204, 0.3)'
                          }
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </Box>
                </Paper>

                {/* Account Balance */}
                <Paper sx={{
  background: 'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))',
  borderRadius: '18px',
  p: 3,
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.15)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 35px rgba(0,153,204,0.2)',
    borderColor: 'rgba(0, 230, 230, 0.25)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #00e6e6, #0099cc)',
    opacity: 0,
    transition: 'opacity 0.6s ease',
  },
  '&:hover::before': {
    opacity: 0.7,
  }
}}>
  {/* Floating currency symbol animation */}
  <motion.div
    style={{
      position: 'absolute',
      top: '15%',
      right: '15%',
      opacity: 0.1,
      fontSize: '3rem',
      color: '#00e6e6'
    }}
    animate={{
      y: [0, -10, 0],
      rotate: [0, 5, 0]
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    Rs
  </motion.div>

  <Box sx={{ 
    textAlign: 'center',
    position: 'relative',
    zIndex: 1
  }}>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h6" sx={{ 
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        color: 'rgba(255,255,255,0.85)',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
      }}>
        <motion.div
          whileHover={{ rotate: 10 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <FaWallet size={20} />
        </motion.div>
        Account Balance
      </Typography>
    </motion.div>

    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.8, type: 'spring' }}
    >
      <Typography variant="h3" sx={{ 
        fontWeight: 700,
        background: 'linear-gradient(90deg, #00e6e6, #80f0ff)',
        backgroundClip: 'text',
        textFillColor: 'transparent',
        lineHeight: 1.2,
        mb: 2,
        textShadow: '0 0 15px rgba(0,230,230,0.3)',
        position: 'relative',
        display: 'inline-block',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -5,
          left: '25%',
          width: '50%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #00e6e6, transparent)',
          opacity: 0.7
        }
      }}>
        Rs 120.08
      </Typography>
    </motion.div>

    <Box sx={{ 
      display: 'flex', 
      gap: 2, 
      justifyContent: 'center',
      position: 'relative'
    }}>
      {/* Top Up Button - Subtler version */}
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
       <Button 
  variant="contained" 
  sx={{ 
    background: 'linear-gradient(135deg, rgba(0,230,230,0.2), rgba(0,153,204,0.25))',
    borderRadius: "20px", 
    px: 3,
    py: 1,
    fontWeight: 600,
    letterSpacing: '0.5px',
    color: 'white',
    border: '1px solid rgba(0,230,230,0.3)',
    boxShadow: '0 4px 12px rgba(0,153,204,0.15)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(135deg, rgba(0,230,230,0.25), rgba(0,153,204,0.3))',
      boxShadow: '0 6px 16px rgba(0,153,204,0.2)',
    },
    '&:active': {
      transform: 'scale(0.98)'
    }
  }}
  onClick={() => window.open('https://online.mobitel.lk/onlinepay/', '_blank')}
>
  Top Up
</Button>
      </motion.div>

      {/* History Button */}
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
  variant="outlined"
  onClick={() => setView('reloadHistory')}
  sx={{ 
    borderRadius: "20px", 
    px: 3,
    py: 1,
    fontWeight: 600,
    letterSpacing: '0.5px',
    borderColor: 'rgba(255,255,255,0.3)',
    color: 'white',
    '&:hover': {
      borderColor: 'rgba(255,255,255,0.5)',
      background: 'rgba(255,255,255,0.1)'
    }
  }}
>
  History
</Button>
      </motion.div>
    </Box>
  </Box>

  {/* Floating particles */}
  <Box sx={{
    position: 'absolute',
    bottom: '20%',
    left: '15%',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#00e6e6',
    filter: 'blur(1px)',
    boxShadow: '0 0 10px #00e6e6',
    opacity: 0.5,
    animation: 'pulse 3s infinite ease-in-out'
  }} />
</Paper>
              </Grid>

              {/* Middle Column */}
              <Grid item xs={12} md={4}>
                {/* Data Usage Details */}
                <Paper sx={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                  borderRadius: '20px',
                  p: 3,
                  mb: 4,
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 35px rgba(0,0,0,0.25)',
                    borderColor: 'rgba(255,255,255,0.25)'
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(0,230,230,0.05) 0%, rgba(0,153,204,0.05) 100%)',
                    zIndex: -1,
                    opacity: 0,
                    transition: 'opacity 0.5s ease'
                  },
                  '&:hover::before': {
                    opacity: 1
                  }
                }}>
                  {/* Animated border highlight on hover */}
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #00e6e6, #0099cc)',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                    'Paper:hover &': {
                      transform: 'scaleX(1)'
                    }
                  }} />
                  
                  <Typography variant="h6" sx={{ 
                    mb: 2, 
                    fontWeight: 700,
                    color: "white",
                    textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: 0,
                      width: '40px',
                      height: '3px',
                      background: 'linear-gradient(90deg, #00e6e6, transparent)',
                      borderRadius: '3px',
                      transition: 'width 0.4s ease'
                    },
                    '&:hover::after': {
                      width: '100px'
                    }
                  }}>
                    Data Usage Breakdown
                  </Typography>
                  
                  {/* Day Data Section */}
                  <Box sx={{ 
                    mb: 3,
                    animation: 'fadeIn 0.6s ease-out'
                  }}>
                    <Box sx={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                      alignItems: 'center'
                    }}>
                      <Typography variant="body1" sx={{ 
                        fontWeight: 500,
                        color: 'rgba(255,255,255,0.9)'
                      }}>
                        <Box component="span" sx={{ 
                          color: '#00e6e6',
                          textShadow: '0 0 8px rgba(0,230,230,0.3)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            textShadow: '0 0 12px rgba(0,230,230,0.5)'
                          }
                        }}>
                          Day Data:
                        </Box> 1545 MB
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: '0.8rem'
                      }}>
                        / 3575 MB
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      width: '100%',
                      height: '10px',
                      background: 'rgba(0,0,0,0.25)',
                      borderRadius: '5px',
                      overflow: 'hidden',
                      mb: 2,
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)'
                    }}>
                      <Box sx={{ 
                        width: '43%',
                        height: '100%',
                        background: 'linear-gradient(90deg, #00e6e6, #0099cc)',
                        borderRadius: '5px',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'width 1s ease-out',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0))',
                          animation: 'shine 2s infinite'
                        }
                      }} />
                    </Box>
                  </Box>
                
                  {/* Night Data Section */}
                  <Box sx={{
                    animation: 'fadeIn 0.8s ease-out'
                  }}>
                    <Box sx={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                      alignItems: 'center'
                    }}>
                      <Typography variant="body1" sx={{ 
                        fontWeight: 500,
                        color: 'rgba(255,255,255,0.9)'
                      }}>
                        <Box component="span" sx={{ 
                          color: '#0099cc',
                          textShadow: '0 0 8px rgba(0,153,204,0.3)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            textShadow: '0 0 12px rgba(0,153,204,0.5)'
                          }
                        }}>
                          Night Data:
                        </Box> 4578 MB
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: '0.8rem'
                      }}>
                        / 4697 MB
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      width: '100%',
                      height: '10px',
                      background: 'rgba(0,0,0,0.25)',
                      borderRadius: '5px',
                      overflow: 'hidden',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)'
                    }}>
                      <Box sx={{ 
                        width: '97%',
                        height: '100%',
                        background: 'linear-gradient(90deg, #0099cc, #0066cc)',
                        borderRadius: '5px',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'width 1s ease-out',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0))',
                          animation: 'shine 2s infinite'
                        }
                      }} />
                    </Box>
                  </Box>
                
                  {/* Glowing dots decoration */}
                  <Box sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#00e6e6',
                    filter: 'blur(1px)',
                    boxShadow: '0 0 10px #00e6e6, 0 0 20px #00e6e6',
                    opacity: 0.6,
                    animation: 'pulse 3s infinite alternate'
                  }} />
                  <Box sx={{
                    position: 'absolute',
                    bottom: 30,
                    left: 25,
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#0099cc',
                    filter: 'blur(1px)',
                    boxShadow: '0 0 8px #0099cc, 0 0 16px #0099cc',
                    opacity: 0.6,
                    animation: 'pulse 3s infinite alternate 0.5s'
                  }} />
                
                  {/* Keyframes for animations */}
                  <style jsx global>{`
                    @keyframes shine {
                      0% { transform: translateX(-100%); }
                      100% { transform: translateX(100%); }
                    }
                    @keyframes fadeIn {
                      from { opacity: 0; transform: translateY(10px); }
                      to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes pulse {
                      0% { opacity: 0.3; transform: scale(0.95); }
                      100% { opacity: 0.7; transform: scale(1.1); }
                    }
                  `}</style>
                </Paper>

               {/* Voice and SMS Section - Enhanced */}
<Paper 
  sx={{
    background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
    borderRadius: '18px',
    p: 3,
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.15)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 40px rgba(0,153,204,0.25)',
      borderColor: 'rgba(0, 230, 230, 0.3)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: 'linear-gradient(90deg, #00e6e6, #0099cc)',
      opacity: 0,
      transition: 'opacity 0.6s ease',
    },
    '&:hover::before': {
      opacity: 1,
    }
  }}
>
  {/* Floating particles */}
  <Box sx={{
    position: 'absolute',
    top: '20%',
    right: '15%',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#00e6e6',
    filter: 'blur(1px)',
    boxShadow: '0 0 10px #00e6e6, 0 0 20px #00e6e6',
    opacity: 0.6,
    animation: 'pulse 3s infinite alternate'
  }} />

  <Typography 
    variant="h6" 
    sx={{ 
      mb: 3, 
      fontWeight: 700,
      color: "white",
      textShadow: '0 2px 8px rgba(0,0,0,0.2)',
      position: 'relative',
      display: 'inline-block',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: -8,
        left: 0,
        width: '40px',
        height: '3px',
        background: 'linear-gradient(90deg, #00e6e6, transparent)',
        borderRadius: '3px',
        transition: 'all 0.4s ease'
      },
      '&:hover::after': {
        width: '100px',
        background: 'linear-gradient(90deg, #00e6e6, #0099cc)'
      }
    }}
  >
    Voice & SMS
  </Typography>

  <Grid container spacing={2}>
    {/* Voice Minutes - Enhanced */}
    <Grid item xs={6}>
      <Box 
        sx={{ 
          textAlign: "center",
          p: 2.5,
          borderRadius: '14px',
          background: 'rgba(0,230,230,0.08)',
          border: '1px solid rgba(0,230,230,0.2)',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.4s ease',
          boxShadow: '0 4px 15px rgba(0,230,230,0.05)',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 25px rgba(0,230,230,0.15)',
            background: 'rgba(0,230,230,0.12)',
            borderColor: 'rgba(0,230,230,0.4)'
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
            transform: 'rotate(45deg)',
            transition: 'all 0.6s ease',
            opacity: 0
          },
          '&:hover::before': {
            opacity: 1,
            animation: 'shine 1.5s'
          }
        }}
      >
        <Box 
          sx={{
            display: 'inline-flex',
            p: 1.5,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(0,230,230,0.3), rgba(0,153,204,0.4))',
            mb: 1.5,
            color: 'white',
            transition: 'all 0.3s ease',
            transform: 'scale(1)',
            boxShadow: '0 0 0 0px rgba(0,230,230,0.3)',
            '&:hover': {
              transform: 'scale(1.1) rotate(5deg)',
              boxShadow: '0 0 0 8px rgba(0,230,230,0.1)'
            }
          }}
        >
          <FaPhoneAlt size={20} />
        </Box>
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: 600,
            mb: 1,
            color: '#00e6e6',
            textShadow: '0 0 8px rgba(0,230,230,0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              textShadow: '0 0 12px rgba(0,230,230,0.5)'
            }
          }}
        >
          Voice Minutes
        </Typography>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              mb: 0.5,
              background: 'linear-gradient(90deg, #00e6e6, #80f0ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 10px rgba(0,230,230,0.3)'
            }}
          >
            0 min
          </Typography>
        </motion.div>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'rgba(255,255,255,0.7)',
            transition: 'all 0.3s ease',
            '&:hover': {
              color: 'rgba(255,255,255,0.9)'
            }
          }}
        >
          of unlimited
        </Typography>
      </Box>
    </Grid>

    {/* SMS Count - Enhanced */}
    <Grid item xs={6}>
      <Box 
        sx={{ 
          textAlign: "center",
          p: 2.5,
          borderRadius: '14px',
          background: 'rgba(0,153,204,0.08)',
          border: '1px solid rgba(0,153,204,0.2)',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.4s ease',
          boxShadow: '0 4px 15px rgba(0,153,204,0.05)',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 25px rgba(0,153,204,0.15)',
            background: 'rgba(0,153,204,0.12)',
            borderColor: 'rgba(0,153,204,0.4)'
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
            transform: 'rotate(45deg)',
            transition: 'all 0.6s ease',
            opacity: 0
          },
          '&:hover::before': {
            opacity: 1,
            animation: 'shine 1.5s'
          }
        }}
      >
        <Box 
          sx={{
            display: 'inline-flex',
            p: 1.5,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(0,153,204,0.3), rgba(0,102,204,0.4))',
            mb: 1.5,
            color: 'white',
            transition: 'all 0.3s ease',
            transform: 'scale(1)',
            boxShadow: '0 0 0 0px rgba(0,153,204,0.3)',
            '&:hover': {
              transform: 'scale(1.1) rotate(5deg)',
              boxShadow: '0 0 0 8px rgba(0,153,204,0.1)'
            }
          }}
        >
          <FaSms size={20} />
        </Box>
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: 600,
            mb: 1,
            color: '#0099cc',
            textShadow: '0 0 8px rgba(0,153,204,0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              textShadow: '0 0 12px rgba(0,153,204,0.5)'
            }
          }}
        >
          SMS Count
        </Typography>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              mb: 0.5,
              background: 'linear-gradient(90deg, #0099cc, #66ccff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 10px rgba(0,153,204,0.3)'
            }}
          >
            0
          </Typography>
        </motion.div>
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'rgba(255,255,255,0.7)',
            transition: 'all 0.3s ease',
            '&:hover': {
              color: 'rgba(255,255,255,0.9)'
            }
          }}
        >
          of unlimited
        </Typography>
      </Box>
    </Grid>
  </Grid>

  {/* Keyframes for animations */}
  <style jsx global>{`
    @keyframes shine {
      0% { transform: translateX(-100%) rotate(45deg); }
      100% { transform: translateX(100%) rotate(45deg); }
    }
    @keyframes pulse {
      0% { opacity: 0.3; transform: scale(0.95); }
      100% { opacity: 0.7; transform: scale(1.1); }
    }
  `}</style>
</Paper>
              </Grid>

              {/* Right Column */}
              <Grid item xs={12} md={4}>
                {/* Day and Night Usage */}
                <Paper sx={{
                 background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
                 borderRadius: '18px',
                 p: 3,
                 mb: 4,
                 backdropFilter: 'blur(12px)',
                 border: '1px solid rgba(255,255,255,0.15)',
                 boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)',
                 position: 'relative',
                 overflow: 'hidden',
                 transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)',
                 '&:hover': {
                   transform: 'translateY(-8px)',
                   boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
                   borderColor: 'rgba(255,255,255,0.25)'
                 },
                 '&::before': {
                   content: '""',
                   position: 'absolute',
                   top: 0,
                   left: 0,
                   right: 0,
                   bottom: 0,
                   background: 'radial-gradient(circle at 20% 30%, rgba(255,193,7,0.03) 0%, rgba(0,153,204,0.03) 100%)',
                   zIndex: -1,
                   opacity: 0,
                   transition: 'opacity 0.6s ease'
                 },
                 '&:hover::before': {
                   opacity: 0.8
                 }
               }}>
                 {/* Animated border highlight */}
                 <Box sx={{
                   position: 'absolute',
                   top: 0,
                   left: 0,
                   right: 0,
                   height: '2px',
                   background: 'linear-gradient(90deg, #FFC107, #0099cc)',
                   transform: 'scaleX(0)',
                   transformOrigin: 'left',
                   transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                   'Paper:hover &': {
                     transform: 'scaleX(1)'
                   }
                 }} />
               
                 <Typography variant="h6" sx={{ 
                   mb: 3, 
                   fontWeight: 700,
                   color: "white",
                   textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                   position: 'relative',
                   display: 'inline-block',
                   '&::after': {
                     content: '""',
                     position: 'absolute',
                     bottom: -8,
                     left: 0,
                     width: '40px',
                     height: '3px',
                     background: 'linear-gradient(90deg, #FFC107, transparent)',
                     borderRadius: '3px',
                     transition: 'all 0.4s ease'
                   },
                   '&:hover::after': {
                     width: '100px',
                     background: 'linear-gradient(90deg, #FFC107, #0099cc)'
                   }
                 }}>
                   Usage Comparison
                 </Typography>
               
                 <Grid container spacing={2}>
                   {/* Day Usage - Enhanced with animations */}
                   <Grid item xs={6}>
                     <Box sx={{ 
                       textAlign: "center",
                       p: 2.5,
                       borderRadius: '12px',
                       background: 'rgba(255,193,7,0.08)',
                       border: '1px solid rgba(255,193,7,0.25)',
                       height: '90%',
                       position: 'relative',
                       overflow: 'hidden',
                       transition: 'all 0.4s ease',
                       boxShadow: '0 4px 15px rgba(255,193,7,0.05)',
                       '&:hover': {
                         transform: 'translateY(-5px)',
                         boxShadow: '0 8px 25px rgba(255,193,7,0.15)',
                         background: 'rgba(255,193,7,0.12)',
                         borderColor: 'rgba(255,193,7,0.4)'
                       },
                       '&::before': {
                         content: '""',
                         position: 'absolute',
                         top: '-50%',
                         left: '-50%',
                         width: '200%',
                         height: '200%',
                         background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                         transform: 'rotate(45deg)',
                         transition: 'all 0.6s ease',
                         opacity: 0
                       },
                       '&:hover::before': {
                         opacity: 1,
                         animation: 'shine 1.5s'
                       }
                     }}>
                       <Box sx={{
                         display: 'inline-flex',
                         p: 1.5,
                         borderRadius: '100%',
                         background: 'rgba(255,193,7,0.2)',
                         mb: 1.5,
                         color: '#FFC107',
                         transition: 'all 0.3s ease',
                         transform: 'scale(1)',
                         boxShadow: '0 0 0 0px rgba(255,193,7,0.3)',
                         '&:hover': {
                           transform: 'scale(1.1)',
                           boxShadow: '0 0 0 8px rgba(255,193,7,0.1)'
                         }
                       }}>
                         <FaCloudSun size={20} />
                       </Box>
                       <Typography variant="body1" sx={{ 
                         fontWeight: 600,
                         mb: 1,
                         color: '#FFC107',
                         textShadow: '0 0 8px rgba(255,193,7,0.3)',
                         transition: 'all 0.3s ease',
                         '&:hover': {
                           textShadow: '0 0 12px rgba(255,193,7,0.5)'
                         }
                       }}>
                         Day Usage
                       </Typography>
                       <Typography variant="h4" sx={{ 
                         fontWeight: 700, 
                         mb: 0.5,
                         background: 'linear-gradient(90deg, #FFC107, #FFA000)',
                         WebkitBackgroundClip: 'text',
                         WebkitTextFillColor: 'transparent',
                         transition: 'all 0.3s ease',
                         '&:hover': {
                           transform: 'scale(1.05)'
                         }
                       }}>
                         2030 MB
                       </Typography>
                       <Typography variant="body2" sx={{ 
                         color: 'rgba(255,255,255,0.7)',
                         transition: 'all 0.3s ease',
                         '&:hover': {
                           color: 'rgba(255,255,255,0.9)'
                         }
                       }}>
                         of 3575 MB
                       </Typography>
                     </Box>
                   </Grid>
               
                   {/* Night Usage - Enhanced with animations */}
                   <Grid item xs={6}>
                     <Box sx={{ 
                       textAlign: "center",
                       p: 2.5,
                       borderRadius: '12px',
                       background: 'rgba(0,153,204,0.08)',
                       border: '1px solid rgba(0,153,204,0.25)',
                       height: '90%',
                       position: 'relative',
                       overflow: 'hidden',
                       transition: 'all 0.4s ease',
                       boxShadow: '0 4px 15px rgba(0,153,204,0.05)',
                       '&:hover': {
                         transform: 'translateY(-5px)',
                         boxShadow: '0 8px 25px rgba(0,153,204,0.15)',
                         background: 'rgba(0,153,204,0.12)',
                         borderColor: 'rgba(0,153,204,0.4)'
                       },
                       '&::before': {
                         content: '""',
                         position: 'absolute',
                         top: '-50%',
                         left: '-50%',
                         width: '200%',
                         height: '200%',
                         background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                         transform: 'rotate(45deg)',
                         transition: 'all 0.6s ease',
                         opacity: 0
                       },
                       '&:hover::before': {
                         opacity: 1,
                         animation: 'shine 1.5s'
                       }
                     }}>
                       <Box sx={{
                         display: 'inline-flex',
                         p: 1.5,
                         borderRadius: '50%',
                         background: 'rgba(0,153,204,0.2)',
                         mb: 1.5,
                         color: '#0099cc',
                         transition: 'all 0.3s ease',
                         transform: 'scale(1)',
                         boxShadow: '0 0 0 0px rgba(0,153,204,0.3)',
                         '&:hover': {
                           transform: 'scale(1.1)',
                           boxShadow: '0 0 0 8px rgba(0,153,204,0.1)'
                         }
                       }}>
                         <FaCloudMoon size={20} />
                       </Box>
                       <Typography variant="body1" sx={{ 
                         fontWeight: 600,
                         mb: 1,
                         color: '#0099cc',
                         textShadow: '0 0 8px rgba(0,153,204,0.3)',
                         transition: 'all 0.3s ease',
                         '&:hover': {
                           textShadow: '0 0 12px rgba(0,153,204,0.5)'
                         }
                       }}>
                         Night Usage
                       </Typography>
                       <Typography variant="h4" sx={{ 
                         fontWeight: 700, 
                         mb: 0.5,
                         background: 'linear-gradient(90deg, #0099cc, #0066cc)',
                         WebkitBackgroundClip: 'text',
                         WebkitTextFillColor: 'transparent',
                         transition: 'all 0.3s ease',
                         '&:hover': {
                           transform: 'scale(1.05)'
                         }
                       }}>
                         119 MB
                       </Typography>
                       <Typography variant="body2" sx={{ 
                         color: 'rgba(255,255,255,0.7)',
                         transition: 'all 0.3s ease',
                         '&:hover': {
                           color: 'rgba(255,255,255,0.9)'
                         }
                       }}>
                         of 4697 MB
                       </Typography>
                     </Box>
                   </Grid>
                 </Grid>
               
                 {/* Floating particles */}
                 <Box sx={{
                   position: 'absolute',
                   top: '10%',
                   left: '15%',
                   width: '4px',
                   height: '4px',
                   borderRadius: '50%',
                   background: '#FFC107',
                   filter: 'blur(0.5px)',
                   boxShadow: '0 0 6px #FFC107, 0 0 12px #FFC107',
                   opacity: 0.6,
                   animation: 'float 6s infinite ease-in-out'
                 }} />
                 <Box sx={{
                   position: 'absolute',
                   bottom: '20%',
                   right: '20%',
                   width: '3px',
                   height: '3px',
                   borderRadius: '50%',
                   background: '#0099cc',
                   filter: 'blur(0.5px)',
                   boxShadow: '0 0 6px #0099cc, 0 0 12px #0099cc',
                   opacity: 0.6,
                   animation: 'float 8s infinite ease-in-out 1s'
                 }} />
               
                 {/* Keyframes for animations */}
                 <style jsx global>{`
                   @keyframes shine {
                     0% { transform: translateX(-100%) rotate(45deg); }
                     100% { transform: translateX(100%) rotate(45deg); }
                   }
                   @keyframes float {
                     0%, 100% { transform: translateY(0) translateX(0); }
                     50% { transform: translateY(-20px) translateX(10px); }
                   }
                 `}</style>
               </Paper>

                {/* Quick Actions */}
                 {/* Quick Actions */}
                 <Paper sx={{
  background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
  borderRadius: '14px',
  p: 3,
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.15)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(0,153,204,0.25)',
    borderColor: 'rgba(0, 230, 230, 0.3)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #00e6e6, #0099cc)',
    opacity: 0,
    transition: 'opacity 0.6s ease',
  },
  '&:hover::before': {
    opacity: 1,
  }
}}>
  {/* Floating particles */}
  <Box sx={{
    position: 'absolute',
    top: '15%',
    right: '10%',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#00e6e6',
    filter: 'blur(1px)',
    boxShadow: '0 0 10px #00e6e6, 0 0 20px #00e6e6',
    opacity: 0.6,
    animation: 'pulse 3s infinite alternate'
  }} />

  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Typography 
      variant="h6" 
      sx={{ 
        mb: 2, 
        fontWeight: 700,
        color: "white",
        textShadow: '0 2px 8px rgba(0,0,0,0.2)',
        position: 'relative',
        display: 'inline-block',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -8,
          left: 0,
          width: '40px',
          height: '3px',
          background: 'linear-gradient(90deg, #00e6e6, transparent)',
          borderRadius: '3px',
          transition: 'all 0.4s ease'
        },
        '&:hover::after': {
          width: '100px',
          background: 'linear-gradient(90deg, #00e6e6, #0099cc)'
        }
      }}
    >
      Quick Actions
    </Typography>
  </motion.div>

  <Grid container spacing={1.5}>
    {[
      { 
        icon: <FaBolt size={18} />, 
        label: "Buy Data Bundle", 
        color: "white",
        hoverColor: "rgba(232, 231, 231, 0.15)"
      },
      { 
        icon: <FaPhoneAlt size={18} />, 
        label: "Add Minutes", 
        color: "white",
        hoverColor: "rgba(0,230,230,0.15)"
      },
      { 
        icon: <FaSms size={18} />, 
        label: "SMS Packages", 
        color: "white",
        hoverColor: "rgba(156,39,176,0.15)"
      },
      { 
        icon: <FaWallet size={18} />, 
        label: "Payment", 
        color: "white",
        hoverColor: "rgba(76,175,80,0.15)"
      }
    ].map((action, index) => (
      <Grid item xs={6} key={index}>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button
            fullWidth
            startIcon={action.icon}
            sx={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              py: 1.8,
              color: action.color,
              justifyContent: 'flex-start',
              pl: 2.5,
              textTransform: 'none',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                background: action.hoverColor,
                boxShadow: `0 0 20px ${action.color}40`,
                borderColor: action.color,
                '&::before': {
                  transform: 'translateX(0)'
                }
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `linear-gradient(90deg, ${action.color}20, transparent)`,
                transform: 'translateX(-100%)',
                transition: 'transform 0.6s ease',
                zIndex: 0
              }
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 600,
                position: 'relative',
                zIndex: 1,
                textShadow: `0 0 8px ${action.color}80`,
                transition: 'all 0.3s ease'
              }}
            >
              {action.label}
            </Typography>
          </Button>
        </motion.div>
      </Grid>
    ))}
  </Grid>

  {/* Keyframes for animations */}
  <style jsx global>{`
    @keyframes pulse {
      0% { opacity: 0.3; transform: scale(0.95); }
      100% { opacity: 0.7; transform: scale(1.1); }
    }
  `}</style>
</Paper>
              </Grid>
            </Grid>
          </>
        )}

        {view === 'usageHistory' && (
          <UsageHistory onBack={() => setView('dashboard')} />
        )}

        {view === 'dataUsageDetails' && (
          <DataUsageDetails onBack={() => setView('dashboard')} />
        )}

        { view === 'reloadHistory' && (
           <ReloadHistory onBack={() => setView('dashboard')} />
        )}
      </Box>
     
      {/* Floating action button */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 10
        }}
      >
        <Button 
          variant="contained"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            minWidth: 0,
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00e6e6, #0099cc)',
            boxShadow: '0 6px 25px rgba(0,230,230,0.4)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(135deg, #00e6e6, #0099cc)'
            }
          }}
        >
          <motion.div
            animate={{
              rotate: isHovered ? 360 : 0,
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          >
            <FaBolt size={24} />
          </motion.div>
        </Button>
      </motion.div>
    </Box>
  );
}