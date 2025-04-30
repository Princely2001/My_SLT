import React, { useState } from "react";
import { Box, Typography, Button, CircularProgress, Grid, Paper, Divider } from "@mui/material";
import { FaCloudSun, FaCloudMoon, FaPhoneAlt, FaSms, FaBolt, FaWallet, FaChartLine, FaHistory } from "react-icons/fa";
import { motion } from "framer-motion";
import UsageHistory from "./UsageHistory";
import DataUsageDetails from "./Viewdetails";

export default function DesktopDashboard() {
  const [activeTab, setActiveTab] = useState("data");
  const [isHovered, setIsHovered] = useState(false);
  const [view, setView] = useState<'dashboard' | 'usageHistory' | 'dataUsageDetails'>('dashboard');

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
                  <Box>
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
                        animation: 'pulse 2s infinite'
                      }} />
                    </Typography>
                    
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5
                    }}>
                      <Box sx={{
                        px: 2,
                        py: 0.5,
                        borderRadius: '12px',
                        background: 'rgba(0, 230, 230, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0, 230, 230, 0.3)',
                        boxShadow: '0 4px 20px rgba(0, 153, 204, 0.2)'
                      }}>
                        <Typography variant="body2" sx={{ 
                          fontWeight: 600,
                          letterSpacing: '0.5px',
                          background: 'linear-gradient(90deg, #00e6e6, #0099cc)',
                          backgroundClip: 'text',
                          textFillColor: 'transparent'
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
                        border: '1px solid rgba(0, 153, 204, 0.2)'
                      }}>
                        <FaWallet size={14} /> 
                        <Box component="span" sx={{ color: '#00e6e6' }}>
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
                  <Box sx={{
                    position: "relative",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <Box sx={{
                      position: 'relative',
                      mb: 2
                    }}>
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
                    </Box>
                    
                    <Box sx={{ textAlign: "center" }}>
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
                      <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
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
                            background: 'linear-gradient(135deg, rgba(0, 230, 230, 0.3), rgba(0, 153, 204, 0.4))'
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
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
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
                          boxShadow: '0 4px 15px rgba(0,230,230,0.3)'
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
                          borderColor: 'rgba(255,255,255,0.3)',
                          color: 'white'
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
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Data Usage Breakdown
                  </Typography>
                  
                  {/* Day Data Section */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        <Box component="span" sx={{ color: '#00e6e6' }}>Day Data:</Box> 1545 MB
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                        / 3575 MB
                      </Typography>
                    </Box>
                    <Box sx={{ width: '100%', height: '10px', background: 'rgba(0,0,0,0.25)', borderRadius: '5px', mb: 2 }}>
                      <Box sx={{ width: '43%', height: '100%', background: 'linear-gradient(90deg, #00e6e6, #0099cc)', borderRadius: '5px' }} />
                    </Box>
                  </Box>

                  {/* Night Data Section */}
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        <Box component="span" sx={{ color: '#0099cc' }}>Night Data:</Box> 4578 MB
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                        / 4697 MB
                      </Typography>
                    </Box>
                    <Box sx={{ width: '100%', height: '10px', background: 'rgba(0,0,0,0.25)', borderRadius: '5px' }}>
                      <Box sx={{ width: '97%', height: '100%', background: 'linear-gradient(90deg, #0099cc, #0066cc)', borderRadius: '5px' }} />
                    </Box>
                  </Box>
                </Paper>

                {/* Voice and SMS Section */}
                <Paper sx={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '16px',
                  p: 3,
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Voice & SMS
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ 
                        textAlign: "center",
                        p: 2,
                        borderRadius: '12px',
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
                        <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
                          Voice Minutes
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#00e6e6' }}>
                          0 min
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ 
                        textAlign: "center",
                        p: 2,
                        borderRadius: '12px',
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
                        <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
                          SMS Count
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#00e6e6' }}>
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
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                    Usage Comparison
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ 
                        textAlign: "center",
                        p: 2.5,
                        borderRadius: '12px',
                        background: 'rgba(255,193,7,0.08)',
                        border: '1px solid rgba(255,193,7,0.25)'
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
                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 1, color: '#FFC107' }}>
                          Day Usage
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                          2030 MB
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          of 3575 MB
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ 
                        textAlign: "center",
                        p: 2.5,
                        borderRadius: '12px',
                        background: 'rgba(0,153,204,0.08)',
                        border: '1px solid rgba(0,153,204,0.25)'
                      }}>
                        <Box sx={{
                          display: 'inline-flex',
                          p: 1.5,
                          borderRadius: '50%',
                          background: 'rgba(0,153,204,0.2)',
                          mb: 1.5,
                          color: '#0099cc'
                        }}>
                          <FaCloudMoon size={20} />
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 1, color: '#0099cc' }}>
                          Night Usage
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                          119 MB
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
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
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
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
                            textTransform: 'none'
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
        )}

        {view === 'usageHistory' && (
          <UsageHistory onBack={() => setView('dashboard')} />
        )}

        {view === 'dataUsageDetails' && (
          <DataUsageDetails onBack={() => setView('dashboard')} />
        )}
      </Box>

      {/* Floating action button */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 10 }}
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
            color: 'white'
          }}
        >
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <FaBolt size={24} />
          </motion.div>
        </Button>
      </motion.div>
    </Box>
  );
}