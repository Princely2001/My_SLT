import React, { useState } from "react";
import { Box, Typography, Button, CircularProgress, Grid, Paper, Divider } from "@mui/material";
import { FaCloudSun, FaCloudMoon, FaPhoneAlt, FaSms, FaBolt, FaWallet, FaChartLine, FaHistory } from "react-icons/fa";
import { motion } from "framer-motion";
import UsageHistory from "./UsageHistory";

export default function DesktopDashboard() {
  const [activeTab, setActiveTab] = useState("data");
  const [isHovered, setIsHovered] = useState(false);
  const [view, setView] = useState<'dashboard' | 'usageHistory'>('dashboard');

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
  overflowY: "auto", // Enables vertical scrolling
  height: "75vh", // Takes full viewport height
  maxHeight: "70vh", // Prevents exceeding viewport
  scrollbarWidth: "thin", // For Firefox
  '&::-webkit-scrollbar': { // For Chrome/Safari
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

{view === 'dashboard' ? (
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
    0701715336
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
                    boxShadow: '0 6px 20px rgba(0,230,230,0.4)',
                    background: 'linear-gradient(90deg, #00e6e6, #0099cc)'
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
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)',
  position: 'relative',
  overflow: 'hidden',
  animation: 'float 6s ease-in-out infinite',
  '@keyframes float': {
    '0%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-8px)' },
    '100%': { transform: 'translateY(0px)' }
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 12px 40px rgba(0, 153, 204, 0.25)',
    borderColor: 'rgba(0, 230, 230, 0.3)',
    '&::before': {
      opacity: 1
    }
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 70% 30%, rgba(0, 230, 230, 0.08), transparent 70%)',
    opacity: 0,
    transition: 'opacity 0.5s ease',
    zIndex: 0
  }
}}>
  <Box sx={{
    position: "relative",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 1
  }}>
    <Box sx={{
      position: 'relative',
      mb: 2,
      '&::before': {
        content: '""',
        position: 'absolute',
        width: '110%',
        height: '110%',
        background: 'radial-gradient(circle, rgba(0, 230, 230, 0.2) 0%, transparent 60%)',
        borderRadius: '50%',
        animation: 'pulse 3s infinite',
        '@keyframes pulse': {
          '0%': { transform: 'scale(0.95)', opacity: 0.6 },
          '70%': { transform: 'scale(1.1)', opacity: 0.2 },
          '100%': { transform: 'scale(0.95)', opacity: 0.6 }
        }
      }
    }}>
      <CircularProgress 
        variant="determinate" 
        value={75} 
        size={150} 
        thickness={4}
        sx={{ 
          color: "#00e6e6",
          filter: 'drop-shadow(0 0 12px rgba(0,230,230,0.7))',
          position: 'relative',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'rotate(15deg)'
          }
        }}
      />
    </Box>
    
    <Box sx={{
      textAlign: "center",
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: -10,
        left: '25%',
        width: '50%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(0, 230, 230, 0.5), transparent)',
        animation: 'widthGrow 2s infinite',
        '@keyframes widthGrow': {
          '0%': { width: '0%', left: '50%' },
          '50%': { width: '50%', left: '25%' },
          '100%': { width: '0%', left: '25%' }
        }
      }
    }}>
      <Typography 
        variant="h3" 
        sx={{
          fontWeight: 700,
          background: 'linear-gradient(90deg, #00e6e6, #ffffff)',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          lineHeight: 1,
          mb: 1,
          textShadow: '0 0 10px rgba(0, 230, 230, 0.3)',
          animation: 'textGlow 2s ease-in-out infinite alternate',
          '@keyframes textGlow': {
            '0%': { textShadow: '0 0 10px rgba(0, 230, 230, 0.3)' },
            '100%': { textShadow: '0 0 15px rgba(0, 230, 230, 0.6)' }
          }
        }}
      >
        75%
      </Typography>
      <Typography 
        variant="h6"
        sx={{
          color: 'rgba(255,255,255,0.8)',
          mb: 2,
          textShadow: '0 0 8px rgba(255,255,255,0.1)'
        }}
      >
        Data Remaining
      </Typography>
      <Button
        variant="contained"
        sx={{
          background: 'linear-gradient(135deg, rgba(0, 230, 230, 0.15), rgba(0, 153, 204, 0.2))',
          backdropFilter: 'blur(5px)',
          borderRadius: '20px',
          px: 3,
          py: 1,
          fontWeight: 600,
          border: '1px solid rgba(0, 230, 230, 0.3)',
          color: '#00e6e6',
          boxShadow: '0 4px 15px rgba(0, 153, 204, 0.2)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            background: 'linear-gradient(135deg, rgba(0, 230, 230, 0.25), rgba(0, 153, 204, 0.3))',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(0, 153, 204, 0.3)',
            '&::before': {
              left: '100%'
            }
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            transition: 'all 0.6s ease'
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
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              p: 3,
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
              }
            }}>
              <Box sx={{ 
                textAlign: 'center',
              }}>
                <Typography variant="h6" sx={{ 
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  color: 'rgba(255,255,255,0.8)'
                }}>
                  <FaWallet size={20} /> Account Balance
                </Typography>
                <Typography variant="h3" sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(90deg, #00e6e6, #0099cc)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  lineHeight: 1.2,
                  mb: 2
                }}>
                  Rs 120.08
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button 
                    variant="contained" 
                    sx={{ 
                      background: 'linear-gradient(90deg, #00e6e6, #0099cc)',
                      borderRadius: "20px", 
                      px: 3,
                      py: 1,
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                      boxShadow: '0 4px 15px rgba(0,230,230,0.3)',
                      '&:hover': {
                        boxShadow: '0 6px 20px rgba(0,230,230,0.4)',
                        background: 'linear-gradient(90deg, #00e6e6, #0099cc)'
                      }
                    }}
                  >
                    Top Up
                  </Button>
                  <Button 
                    variant="outlined" 
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
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Middle Column */}
          <Grid item xs={12} md={4}>
            {/* Data Usage Details */}
            <Paper sx={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              p: 3,
              mb: 4,
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
              }
            }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600,color:"white" }}>
                Data Usage Breakdown
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1,
                  alignItems: 'center'
                }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    <Box component="span" sx={{ color: '#00e6e6' }}>Day Data:</Box> 1545 MB
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(248, 243, 243, 0.6)' }}>
                    / 3575 MB
                  </Typography>
                </Box>
                <Box sx={{ 
                  width: '100%',
                  height: '8px',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  mb: 2
                }}>
                  <Box sx={{ 
                    width: '43%',
                    height: '100%',
                    background: 'linear-gradient(90deg, #00e6e6, #0099cc)',
                    borderRadius: '4px'
                  }} />
                </Box>
              </Box>

              <Box>
                <Box sx={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1,
                  alignItems: 'center'
                }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    <Box component="span" sx={{ color: '#0099cc', }}>Night Data:</Box> 4578 MB
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(247, 243, 243, 0.6)' }}>
                    / 4697 MB
                  </Typography>
                </Box>
                <Box sx={{ 
                  width: '100%',
                  height: '8px',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <Box sx={{ 
                    width: '97%',
                    height: '100%',
                    background: 'linear-gradient(90deg, #0099cc, #0066cc)',
                    borderRadius: '4px'
                  }} />
                </Box>
              </Box>
            </Paper>

            {/* Voice and SMS Section */}
            <Paper sx={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              p: 3,
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
              }
            }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600,color:"white" }}>
                Voice & SMS
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ 
                    textAlign: "center",
                    p: 2,
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    background: 'rgba(0,230,230,0.1)',
                    height: '90%'
                  }}>
                    <Box sx={{
                      display: 'inline-flex',
                      p: 1.5,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(0,230,230,0.2), rgba(0,153,204,0.3))',
                      mb: 1
                    }}>
                      <FaPhoneAlt size={20} />
                    </Box>
                    <Typography variant="body1" sx={{ 
                      fontWeight: 500,
                      mb: 0.5,
                      color: 'rgba(255,255,255,0.8)'
                    }}>
                      Voice Minutes
                    </Typography>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 700,
                      color: '#00e6e6'
                    }}>
                      0 min
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ 
                    textAlign: "center",
                    p: 2,
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    background: 'rgba(0,230,230,0.1)',
                    height: '90%'
                  }}>
                    <Box sx={{
                      display: 'inline-flex',
                      p: 1.5,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(0,230,230,0.2), rgba(0,153,204,0.3))',
                      mb: 1
                    }}>
                      <FaSms size={20} />
                    </Box>
                    <Typography variant="body1" sx={{ 
                      fontWeight: 500,
                      mb: 0.5,
                      color: 'rgba(255,255,255,0.8)'
                    }}>
                      SMS Count
                    </Typography>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 700,
                      color: '#00e6e6'
                    }}>
                      0
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={4}>
            {/* Day and Night Usage */}
            <Paper sx={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              p: 3,
              mb: 4,
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
              }
            }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600,color:"white" }}>
                Usage Comparison
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ 
                    textAlign: "center",
                    p: 2,
                    borderRadius: '10px',
                    background: 'rgba(255,193,7,0.1)',
                    border: '1px solid rgba(255,193,7,0.2)',
                    height: '90%'
                  }}>
                    <Box sx={{
                      display: 'inline-flex',
                      p: 1.5,
                      borderRadius: '100%',
                      background: 'rgba(255,193,7,0.2)',
                      mb: 1.5,
                      color: '#FFC107'
                    }}>
                      <FaCloudSun size={20} />
                    </Box>
                    <Typography variant="body1" sx={{ 
                      fontWeight: 600,
                      mb: 1,
                      color: '#FFC107'
                    }}>
                      Day Usage
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, }}>
                      2030 MB
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: 'rgba(255,255,255,0.6)',
                    }}>
                      of 3575 MB
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ 
                    textAlign: "center",
                    p: 2,
                    borderRadius: '12px',
                    background: 'rgba(0,153,204,0.1)',
                    border: '1px solid rgba(0,153,204,0.2)',
                    height: '90%'
                  }}>
                    <Box sx={{
                      display: 'inline-flex',
                      p: 1.5,
                      borderRadius: '50%',
                      background: 'rgba(0,153,204,0.2)',
                      mb: 1.5,
                      color: '#0099cc',
                      
                    }}>
                      <FaCloudMoon size={20} />
                    </Box>
                    <Typography variant="body1" sx={{ 
                      fontWeight: 600,
                      mb: 1,
                      color: '#0099cc'
                    }}>
                      Night Usage
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                      119 MB
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: 'rgba(255,255,255,0.6)',
                    }}>
                      of 4697 MB
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Quick Actions */}
            <Paper sx={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '10px',
              p: 3,
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
              }
            }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600,color:"white" }}>
                Quick Actions
              </Typography>
              <Grid container spacing={1}>
                {[
                  { icon: <FaBolt size={18} />, label: "Buy Data Bundle", color: "white" },
                  { icon: <FaPhoneAlt size={18} />, label: "Add Minutes", color: "white" },
                  { icon: <FaSms size={18} />, label: "SMS Packages", color: "white" },
                  { icon: <FaWallet size={18} />, label: "Payment", color: "white" }
                ].map((action, index) => (
                  <Grid item xs={6} key={index}>
                    <Button
                      fullWidth
                      startIcon={action.icon}
                      sx={{
                        background: 'rgba(0,0,0,0.2)',
                        borderRadius: '12px',
                        py: 1.5,
                        color: 'white',
                        justifyContent: 'flex-start',
                        pl: 2,
                        textTransform: 'none',
                        '&:hover': {
                          background: 'rgba(255,255,255,0.1)'
                        }
                      }}
                    >
                      <Typography variant="body2" sx={{ color: action.color, fontWeight: 500 }}>
                        {action.label}
                      </Typography>
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        </>
        ) : (
          // UsageHistory Screen
          <UsageHistory onBack={() => setView('dashboard')} />
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