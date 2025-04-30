import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Grid, 
  Divider, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Slide,
  Grow,
  Zoom,
  Fade
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { FaArrowLeft, FaBolt, FaShoppingCart } from 'react-icons/fa';
import { MdDataUsage, MdNightlightRound, MdWbSunny } from 'react-icons/md';

interface UsagehistoryProps {
  onBack: () => void;
}

const Transition = React.forwardRef(function Transition(props: any, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DataUsageDetails({ onBack }: UsagehistoryProps) {
  const [openPurchaseDialog, setOpenPurchaseDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [hoveredChart, setHoveredChart] = useState<string | null>(null);


  const colors = {
    primary: '#3a7bd5',       
    primaryLight: '#00d2ff',  
    primaryDark: '#1a4b8c',  
    dayColor: '#4facfe',      
    nightColor: '#6a11cb',    
    background: '#f8fcff',    
    textPrimary: '#2d3748',   
    textSecondary: '#718096', 
    white: '#ffffff',
    divider: '#e2e8f0',
    success: '#38a169',       
    remaining: '#cbd5e0'     
  };

  
  const dayData = [
    { name: 'Used', value: 65, color: colors.dayColor },
    { name: 'Remaining', value: 35, color: colors.remaining }
  ];

  const nightData = [
    { name: 'Used', value: 40, color: colors.nightColor },
    { name: 'Remaining', value: 60, color: colors.remaining }
  ];

  const dataPackages = [
    { 
      id: 1, 
      name: '1GB Day Pack', 
      amount: '1GB', 
      price: '$2.99', 
      validity: '1 day', 
      type: 'day',
      icon: <MdWbSunny size={24} color={colors.dayColor} />,
      popular: false
    },
    { 
      id: 2, 
      name: '5GB Weekly Pack', 
      amount: '5GB', 
      price: '$9.99', 
      validity: '7 days', 
      type: 'both',
      icon: <MdDataUsage size={24} color={colors.primary} />,
      popular: true
    },
    { 
      id: 3, 
      name: '10GB Monthly Pack', 
      amount: '10GB', 
      price: '$14.99', 
      validity: '30 days', 
      type: 'both',
      icon: <MdDataUsage size={24} color={colors.primary} />,
      popular: false
    },
    { 
      id: 4, 
      name: '3GB Night Pack', 
      amount: '3GB', 
      price: '$4.99', 
      validity: '7 nights', 
      type: 'night',
      icon: <MdNightlightRound size={24} color={colors.nightColor} />,
      popular: false
    },
  ];

  // Custom tooltip with smooth animation
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Fade in={active} timeout={200}>
          <Paper sx={{ 
            padding: '8px 12px',
            background: colors.white,
            border: `1px solid ${colors.divider}`,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            borderRadius: '6px'
          }}>
            <Typography variant="body2" color={colors.textPrimary}>
              {payload[0].name}: <strong>{payload[0].value}%</strong>
            </Typography>
          </Paper>
        </Fade>
      );
    }
    return null;
  };

  return (
    <Fade in={true} timeout={300}>
      <Paper sx={{
       background: "linear-gradient(135deg,rgb(13, 54, 90) 0%,rgb(25, 71, 114) 100%)",
        borderRadius: '16px',
        p: { xs: 3, md: 4 },
        border: `1px solid ${colors.divider}`,
        boxShadow: '0 10px 25px rgba(0,0,0,0.04)',
        maxWidth: '1000px',
        mx: 'auto',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          background: `linear-gradient(90deg, ${colors.dayColor}, ${colors.nightColor})`,
          zIndex: 1
        }
      }}>
        {/* Back Button with smooth hover */}
        <Zoom in={true} style={{ transitionDelay: '100ms' }}>
        <Button 
  variant="contained"
  startIcon={<FaArrowLeft />}
  onClick={onBack}
  sx={{
    background: 'linear-gradient(90deg, #00e6e6, #0099cc)',
    borderRadius: '20px',
    px: 3,
    py: 1,
    fontWeight: 600,
    letterSpacing: '0.5px',
    color: 'white',
    boxShadow: '0 4px 15px rgba(0,230,230,0.3)',
    transition: 'all 0.3s ease',
    textTransform: 'none',
    '&:hover': {
      transform: 'translateX(-4px)',
      boxShadow: '0 6px 20px rgba(0,230,230,0.4)',
      background: 'linear-gradient(90deg, #00c4c4, #0088aa)',
      '& svg': {
        transform: 'translateX(-3px)'
      }
    },
    '&:active': {
      transform: 'translateX(-2px) scale(0.98)'
    },
    '& .MuiButton-startIcon': {
      transition: 'transform 0.3s ease'
    }
  }}
>
  Back
</Button>
        </Zoom>

        {/* Title with subtle gradient */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Grow in={true} timeout={500}>
            <Typography variant="h4" sx={{ 
              fontWeight: 700,
              mb: 1,
              color: "white",
              fontSize: { xs: '1.9rem', md: '2.4rem' },
              letterSpacing: '-0.5px'
            }}>
              Data Usage Dashboard
            </Typography>
          </Grow>
          <Fade in={true} timeout={700}>
            <Typography variant="subtitle1" sx={{
              color: colors.textSecondary,
              fontSize: { xs: '0.95rem', md: '1.05rem' }
            }}>
              Track and manage your data consumption
            </Typography>
          </Fade>
        </Box>

        {/* Charts Grid with staggered animations */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Day Time Usage */}
          <Grid item xs={12} md={6}>
  <Grow in={true} timeout={300} style={{ transitionDelay: '200ms' }}>
    <Paper 
      elevation={0}
      onMouseEnter={() => setHoveredChart('day')}
      onMouseLeave={() => setHoveredChart(null)}
      sx={{
        p: 3,
        background: 'white', // Softened yellow
        backdropFilter: 'blur(8px)',
        border: `1px solid rgba(210, 180, 60, 0.2)`, // Muted gold border
        borderRadius: '14px',
        height: '100%',
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        transform: hoveredChart === 'day' ? 'translateY(-5px)' : 'none',
        boxShadow: hoveredChart === 'day' 
          ? `0 15px 30px rgba(210, 180, 60, 0.1)` 
          : '0 5px 15px rgba(0,0,0,0.03)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(210, 180, 60, 0.05), rgba(210, 180, 60, 0))',
          zIndex: -1,
          opacity: 0,
          transition: 'opacity 0.5s ease'
        },
        '&:hover::before': {
          opacity: 0.5
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: '#D2B43C', // Muted gold
          zIndex: 1,
          transition: 'all 0.4s ease'
        }
      }}
    >
      {/* Header with reduced brightness icon */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 2,
        transition: 'transform 0.3s ease'
      }}>
        <Box sx={{
          background: 'rgba(210, 180, 60, 0.15)',
          borderRadius: '12px',
          p: 1.5,
          mr: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}>
          <MdWbSunny 
            color="#B8860B" // DarkGoldenrod
            size={26}
            style={{
              transition: 'transform 0.3s ease',
              transform: hoveredChart === 'day' ? 'scale(1.1)' : 'scale(1)'
            }}
          />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ 
            color: '#8B6508', // Darker gold text
            fontWeight: 600,
            letterSpacing: '-0.2px'
          }}>
            Day Time Usage
          </Typography>
          <Typography variant="caption" sx={{ 
            color: '#8B7500', // Muted gold
            fontSize: '0.8rem'
          }}>
            8AM - 10PM
          </Typography>
        </Box>
      </Box>
      
      {/* Chart with muted colors */}
      <Box sx={{ 
        height: '220px', 
        mt: 2,
        transition: 'transform 0.3s ease',
        transform: hoveredChart === 'day' ? 'translateY(-3px)' : 'none'
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[
                { name: 'Used', value: 65, color: '#D2B43C' }, // Muted gold
                { name: 'Remaining', value: 35, color: 'rgba(210, 180, 60, 0.15)' }
              ]}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={85}
              paddingAngle={1}
              dataKey="value"
              labelLine={false}
              animationDuration={600}
            >
              <Cell key="cell-used" fill="#D2B43C" stroke="none" />
              <Cell key="cell-remaining" fill="rgba(210, 180, 60, 0.15)" stroke="none" />
            </Pie>
            <Tooltip 
              content={<CustomTooltip />} 
              animationDuration={150}
            />
            <Legend 
              formatter={(value) => (
                <span style={{ 
                  color: '#5D4A00', // Dark muted gold
                  fontSize: '0.75rem'
                }}>
                  {value}
                </span>
              )}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Stats with subtle animation */}
      <Box sx={{ 
        mt: 2, 
        textAlign: 'center',
        background: 'rgba(210, 180, 60, 0.08)',
        borderRadius: '8px',
        p: 2,
        border: `1px solid rgba(210, 180, 60, 0.1)`,
        transition: 'all 0.3s ease'
      }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="caption" sx={{ 
              color: '#5D4A00',
              display: 'block',
              fontSize: '0.75rem'
            }}>
              Used
            </Typography>
            <Typography variant="h6" sx={{ 
              color: '#8B6508',
              fontWeight: 600,
              fontSize: '1.1rem'
            }}>
              3.25GB
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" sx={{ 
              color: '#5D4A00',
              display: 'block',
              fontSize: '0.75rem'
            }}>
              Remaining
            </Typography>
            <Typography variant="h6" sx={{ 
              color: '#8B6508',
              fontWeight: 600,
              fontSize: '1.1rem',
              opacity: 0.8
            }}>
              1.75GB
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  </Grow>
</Grid>

          {/* Night Time Usage */}
          <Grid item xs={12} md={6}>
  <Grow in={true} timeout={300} style={{ transitionDelay: '400ms' }}>
    <Paper 
      elevation={0}
      onMouseEnter={() => setHoveredChart('night')}
      onMouseLeave={() => setHoveredChart(null)}
      sx={{
        p: 3,
        background: 'white', // Soft purple-white
        backdropFilter: 'blur(8px)',
        border: `1px solid rgba(138, 43, 226, 0.2)`, // Purple border
        borderRadius: '14px',
        height: '100%',
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        transform: hoveredChart === 'night' ? 'translateY(-8px) scale(1.02)' : 'none',
        boxShadow: hoveredChart === 'night' 
          ? `0 20px 40px rgba(138, 43, 226, 0.15)` 
          : '0 8px 20px rgba(0,0,0,0.05)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(138, 43, 226, 0))',
          zIndex: -1,
          opacity: 0,
          transition: 'opacity 0.5s ease'
        },
        '&:hover::before': {
          opacity: 1
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #8A2BE2, #4B0082)', // Purple gradient
          zIndex: 1,
          transition: 'all 0.4s ease',
          transform: hoveredChart === 'night' ? 'scaleX(1.1)' : 'scaleX(1)',
          transformOrigin: 'center'
        }
      }}
    >
      {/* Animated moon icon container */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 2,
        transform: hoveredChart === 'night' ? 'translateX(5px)' : 'translateX(0)',
        transition: 'transform 0.4s ease'
      }}>
        <Box sx={{
          background: 'rgba(138, 43, 226, 0.1)',
          borderRadius: '12px',
          p: 1.5,
          mr: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.4s ease',
          transform: hoveredChart === 'night' ? 'rotate(-15deg)' : 'rotate(0)',
          boxShadow: hoveredChart === 'night' 
            ? '0 4px 12px rgba(138, 43, 226, 0.2)' 
            : 'none',
          animation: 'moonGlow 3s infinite alternate',
          '@keyframes moonGlow': {
            '0%': { boxShadow: '0 0 0 0 rgba(138, 43, 226, 0.2)' },
            '100%': { boxShadow: '0 0 0 8px rgba(138, 43, 226, 0)' }
          }
        }}>
          <MdNightlightRound 
            color="#9370DB" // Medium purple
            size={28}
            style={{
              transition: 'transform 0.4s ease',
              transform: hoveredChart === 'night' ? 'scale(1.2)' : 'scale(1)',
              filter: 'drop-shadow(0 0 4px rgba(147, 112, 219, 0.5))'
            }}
          />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ 
            color: '#8A2BE2', // BlueViolet
            fontWeight: 700,
            letterSpacing: '-0.25px',
            transition: 'all 0.3s ease',
            textShadow: hoveredChart === 'night' 
              ? '0 2px 4px rgba(138, 43, 226, 0.2)' 
              : 'none'
          }}>
            Night Time Usage
          </Typography>
          <Typography variant="caption" sx={{ 
            color: '#9370DB', // Medium purple
            fontSize: '0.8rem',
            transition: 'all 0.3s ease',
            display: 'inline-block',
            transform: hoveredChart === 'night' ? 'translateY(2px)' : 'translateY(0)'
          }}>
            10PM - 8AM
          </Typography>
        </Box>
      </Box>
      
      {/* Chart with purple theme */}
      <Box sx={{ 
        height: '240px', 
        mt: 2,
        transition: 'all 0.5s ease',
        transform: hoveredChart === 'night' ? 'translateY(-5px)' : 'translateY(0)'
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[
                { name: 'Used', value: 40, color: '#9370DB' }, // Medium purple
                { name: 'Remaining', value: 60, color: 'rgba(147, 112, 219, 0.2)' }
              ]}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={1}
              dataKey="value"
              labelLine={false}
              animationBegin={400}
              animationDuration={800}
              animationEasing="ease-out"
            >
              <Cell key="cell-used" fill="#9370DB" stroke="none" />
              <Cell key="cell-remaining" fill="rgba(147, 112, 219, 0.2)" stroke="none" />
            </Pie>
            <Tooltip 
              content={<CustomTooltip />} 
              animationDuration={200}
            />
            <Legend 
              formatter={(value) => (
                <span style={{ 
                  color: '#4B0082', // Indigo
                  fontSize: '0.8rem',
                  fontWeight: 500
                }}>
                  {value}
                </span>
              )}
              iconType="circle"
              wrapperStyle={{ paddingTop: '15px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Stats container with starry animation */}
      <Box sx={{ 
        mt: 2, 
        textAlign: 'center',
        background: 'rgba(147, 112, 219, 0.05)',
        borderRadius: '10px',
        p: 2,
        border: `1px solid rgba(147, 112, 219, 0.1)`,
        transition: 'all 0.4s ease',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          '&::after': {
            opacity: 1
          }
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,0.8) 0%, transparent 70%)',
          opacity: 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: 'none',
          zIndex: 0
        }
      }}>
        <Grid container spacing={1} position="relative" zIndex={1}>
          <Grid item xs={6}>
            <Typography variant="caption" sx={{ 
              color: '#4B0082', // Indigo
              display: 'block',
              fontSize: '0.8rem',
              transition: 'all 0.3s ease',
              opacity: hoveredChart === 'night' ? 0.9 : 0.7
            }}>
              Used
            </Typography>
            <Typography variant="h6" sx={{ 
              color: '#8A2BE2', // BlueViolet
              fontWeight: 700,
              lineHeight: 1.2,
              fontSize: '1.2rem',
              transition: 'all 0.3s ease',
              transform: hoveredChart === 'night' ? 'scale(1.05)' : 'scale(1)',
              textShadow: '0 1px 2px rgba(75, 0, 130, 0.2)'
            }}>
              2.0GB
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" sx={{ 
              color: '#4B0082', // Indigo
              display: 'block',
              fontSize: '0.8rem',
              transition: 'all 0.3s ease',
              opacity: hoveredChart === 'night' ? 0.9 : 0.7
            }}>
              Remaining
            </Typography>
            <Typography variant="h6" sx={{ 
              color: '#9370DB', // Medium purple
              fontWeight: 700,
              lineHeight: 1.2,
              fontSize: '1.2rem',
              opacity: 0.8,
              transition: 'all 0.3s ease',
              transform: hoveredChart === 'night' ? 'scale(1.05)' : 'scale(1)',
              textShadow: '0 1px 2px rgba(75, 0, 130, 0.2)'
            }}>
              3.0GB
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  </Grow>
</Grid>
        </Grid>

        <Fade in={true} timeout={800}>
          <Divider sx={{ 
            border: 'none',
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${colors.divider}, transparent)`,
            my: 4,
            opacity: 0.6
          }} />
        </Fade>

        {/* Action Buttons with sequential animations */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Fade in={true} timeout={900}>
            <Typography variant="h6" sx={{ 
              mb: 3, 
              color: "white",
              fontWeight: 600,
              fontSize: { xs: '1.15rem', md: '1.25rem' }
            }}>
              Need more data? Boost your allowance now
            </Typography>
          </Fade>
          
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={5}>
              <Zoom in={true} style={{ transitionDelay: '1000ms' }}>
                <Button
                  variant="contained"
                  onClick={() => setOpenPurchaseDialog(true)}
                  startIcon={<FaBolt />}
                  sx={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                    borderRadius: '10px',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    color: colors.white,
                    boxShadow: '0 5px 15px rgba(58, 123, 213, 0.3)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    width: '100%',
                    '&:hover': {
                      background: `linear-gradient(135deg, ${colors.primaryLight}, ${colors.primary})`,
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 20px rgba(58, 123, 213, 0.4)'
                    },
                    '&:active': {
                      transform: 'translateY(-1px)'
                    }
                  }}
                >
                  Buy Data Pack
                </Button>
              </Zoom>
            </Grid>
            <Grid item xs={12} sm={6} md={5}>
              <Zoom in={true} style={{ transitionDelay: '1200ms' }}>
                <Button
                  variant="outlined"
                  onClick={() => setOpenPurchaseDialog(true)}
                  startIcon={<FaShoppingCart />}
                  sx={{
                    background: colors.white,
                    borderRadius: '10px',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    border: `1px solid ${colors.primary}`,
                    color: colors.primary,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    width: '100%',
                    '&:hover': {
                      background: 'rgba(58, 123, 213, 0.05)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 5px 15px rgba(58, 123, 213, 0.2)',
                      border: `1px solid ${colors.primary}`
                    },
                    '&:active': {
                      transform: 'translateY(-1px)'
                    }
                  }}
                >
                  View Add-Ons
                </Button>
              </Zoom>
            </Grid>
          </Grid>
        </Box>

        {/* Data Packages Dialog with refined animations */}
        <Dialog 
          open={openPurchaseDialog} 
          onClose={() => {
            setOpenPurchaseDialog(false);
            setSelectedPackage(null);
          }}
          TransitionComponent={Transition}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              background: colors.white,
              borderRadius: '16px',
              border: `1px solid ${colors.divider}`,
              boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '5px',
                background: `linear-gradient(90deg, ${colors.dayColor}, ${colors.nightColor})`,
                transition: 'all 0.4s ease'
              }
            }
          }}
        >
          <DialogTitle sx={{ 
            color: colors.textPrimary,
            borderBottom: `1px solid ${colors.divider}`,
            pb: 2,
            fontWeight: 700,
            textAlign: 'center',
            fontSize: '1.4rem',
            background: colors.background,
            letterSpacing: '-0.25px'
          }}>
            Available Data Packages
          </DialogTitle>
          <DialogContent sx={{ pt: 3, pb: 2 }}>
            <Grid container spacing={2}>
              {dataPackages.map((pkg, index) => (
                <Grid item xs={12} key={pkg.id}>
                  <Grow in={true} timeout={index * 100 + 300}>
                    <Paper 
                      onClick={() => setSelectedPackage(pkg)}
                      sx={{
                        p: 2.5,
                        borderRadius: '12px',
                        background: selectedPackage?.id === pkg.id 
                          ? 'rgba(58, 123, 213, 0.05)' 
                          : colors.white,
                        border: selectedPackage?.id === pkg.id
                          ? `1px solid ${pkg.type === 'day' ? colors.dayColor : pkg.type === 'night' ? colors.nightColor : colors.primary}`
                          : `1px solid ${colors.divider}`,
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: `0 8px 20px rgba(0,0,0,0.08)`,
                          borderColor: pkg.type === 'day' 
                            ? colors.dayColor 
                            : pkg.type === 'night' 
                              ? colors.nightColor 
                              : colors.primary
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '5px',
                          height: '100%',
                          background: pkg.type === 'day' 
                            ? colors.dayColor 
                            : pkg.type === 'night' 
                              ? colors.nightColor 
                              : colors.primary,
                          transition: 'all 0.3s ease'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{
                          mr: 2,
                          color: pkg.type === 'day' 
                            ? colors.dayColor 
                            : pkg.type === 'night' 
                              ? colors.nightColor 
                              : colors.primary,
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          {pkg.icon}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <Typography variant="subtitle1" sx={{ 
                              color: colors.textPrimary,
                              fontWeight: 600,
                            }}>
                              {pkg.name}
                            </Typography>
                            {pkg.popular && (
                              <Box sx={{
                                background: colors.primary,
                                borderRadius: '4px',
                                px: 1,
                                py: 0.5,
                                ml: 1
                              }}>
                                <Typography variant="caption" sx={{ 
                                  color: colors.white,
                                  fontWeight: 700,
                                  fontSize: '0.7rem',
                                  lineHeight: 1
                                }}>
                                  POPULAR
                                </Typography>
                              </Box>
                            )}
                          </Box>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            mt: 1.5
                          }}>
                            <Box>
                              <Typography variant="body2" sx={{ 
                                color: colors.textSecondary,
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '0.9rem'
                              }}>
                                <span style={{ 
                                  background: 'rgba(58, 123, 213, 0.1)',
                                  borderRadius: '6px',
                                  padding: '3px 8px',
                                  marginRight: '8px',
                                  fontSize: '0.8rem',
                                  fontWeight: 500
                                }}>
                                  {pkg.amount}
                                </span>
                                <span style={{ fontSize: '0.85rem' }}>
                                  Valid for: {pkg.validity}
                                </span>
                              </Typography>
                            </Box>
                            <Typography variant="h6" sx={{ 
                              color: colors.primary,
                              fontWeight: 700,
                              fontSize: '1.1rem'
                            }}>
                              {pkg.price}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions sx={{ 
            borderTop: `1px solid ${colors.divider}`,
            pt: 2,
            px: 3,
            pb: 3,
            background: colors.background
          }}>
            <Button 
              onClick={() => {
                setOpenPurchaseDialog(false);
                setSelectedPackage(null);
              }}
              sx={{
                color: colors.textSecondary,
                background: colors.white,
                borderRadius: '10px',
                px: 3,
                py: 1.2,
                fontWeight: 600,
                border: `1px solid ${colors.divider}`,
                transition: 'all 0.25s ease',
                '&:hover': {
                  background: colors.background,
                  color: colors.textPrimary,
                  border: `1px solid ${colors.textSecondary}`
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              disabled={!selectedPackage}
              onClick={() => {
                // Handle purchase logic here
                console.log('Purchased:', selectedPackage);
                setOpenPurchaseDialog(false);
                setSelectedPackage(null);
              }}
              sx={{
                background: selectedPackage 
                  ? `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`
                  : 'rgba(0,0,0,0.1)',
                borderRadius: '10px',
                px: 4,
                py: 1.2,
                fontWeight: 600,
                color: colors.white,
                transition: 'all 0.25s ease',
                boxShadow: selectedPackage 
                  ? '0 5px 15px rgba(58, 123, 213, 0.3)'
                  : 'none',
                '&:hover': {
                  transform: selectedPackage ? 'translateY(-2px)' : 'none',
                  boxShadow: selectedPackage 
                    ? '0 7px 18px rgba(58, 123, 213, 0.4)'
                    : 'none',
                  background: selectedPackage 
                    ? `linear-gradient(135deg, ${colors.primaryLight}, ${colors.primary})`
                    : 'rgba(0,0,0,0.1)'
                },
                '&:disabled': {
                  background: 'rgba(0,0,0,0.1)',
                  color: 'rgba(0,0,0,0.3)'
                }
              }}
            >
              Purchase Now
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Fade>
  );
}