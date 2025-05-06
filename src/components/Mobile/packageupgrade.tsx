import React, { useEffect, useRef, useState } from "react";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import ArrowBack from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  SvgIcon,
  keyframes,
  useTheme,
  useMediaQuery
} from "@mui/material";

// Modern color scheme with better contrast and visual hierarchy
const colorScheme = {
  primaryDark: '#0A2E4A',
  primaryLight: 'rgba(10, 46, 74, 0.8)',
  accent: '#00A8E8',
  secondaryAccent: '#40C4FF',
  highlight: 'rgba(100, 210, 255, 0.4)',
  textPrimary: '#FFFFFF',
  textSecondary: '#E0F7FF',
  divider: 'rgba(224, 247, 255, 0.2)',
  cardBg: 'rgba(10, 46, 74, 0.7)',
  buttonGradient: 'linear-gradient(135deg, #00A8E8 0%, #40C4FF 100%)',
  navbarBg: 'rgba(10, 46, 74, 0.95)',
  success: '#4CAF50',
  error: '#FF5252',
  currentPackageBg: 'linear-gradient(145deg, #0A2E4A 0%, #12395E 100%)',
  packageCardBg: 'linear-gradient(145deg, #12395E 0%, #1A4778 100%)',
  activeTabBg: 'linear-gradient(90deg, rgba(0,168,232,0.8) 0%, rgba(64,196,255,0.8) 100%)'
};

// Enhanced dummy data with more realistic package details
const dummyCurrentPackage = {
  bB_PACKAGE_NAME: "Premium Internet 200GB",
  monthlY_RENTAL: "2990",
  standarD_GB: "200",
  freE_GB: "50",
  speed: "100 Mbps",
  contract: "12 months",
  benefits: ["Free router", "Unlimited calls", "24/7 support"]
};

const dummyPackages = {
  Standard: [
    {
      BB_PACKAGE_NAME: "Standard 100GB",
      STANDARD_GB: "100",
      FREE_GB: "20",
      MONTHLY_RENTAL: "1990",
      DESCRIPTION: "100GB Standard + 20GB Free",
      speed: "50 Mbps",
      contract: "12 months",
      benefits: ["Free installation", "Basic router", "Email support"]
    },
    {
      BB_PACKAGE_NAME: "Standard 200GB",
      STANDARD_GB: "200",
      FREE_GB: "50",
      MONTHLY_RENTAL: "2990",
      DESCRIPTION: "200GB Standard + 50GB Free",
      speed: "100 Mbps",
      contract: "12 months",
      benefits: ["Premium router", "Unlimited calls", "Priority support"]
    },
    {
      BB_PACKAGE_NAME: "Standard 300GB",
      STANDARD_GB: "300",
      FREE_GB: "75",
      MONTHLY_RENTAL: "3990",
      DESCRIPTION: "300GB Standard + 75GB Free",
      speed: "150 Mbps",
      contract: "24 months",
      benefits: ["Premium router", "Unlimited calls", "24/7 VIP support"]
    }
  ],
  AnyTime: [
    {
      BB_PACKAGE_NAME: "AnyTime 50GB",
      STANDARD_GB: "50",
      MONTHLY_RENTAL: "1490",
      DESCRIPTION: "50GB Any Time Data",
      speed: "30 Mbps",
      contract: "No contract",
      benefits: ["Flexible usage", "No commitment", "Basic support"]
    },
    {
      BB_PACKAGE_NAME: "AnyTime 100GB",
      STANDARD_GB: "100",
      MONTHLY_RENTAL: "2490",
      DESCRIPTION: "100GB Any Time Data",
      speed: "50 Mbps",
      contract: "No contract",
      benefits: ["Flexible usage", "No commitment", "Email support"]
    },
    {
      BB_PACKAGE_NAME: "AnyTime 200GB",
      STANDARD_GB: "200",
      MONTHLY_RENTAL: "3490",
      DESCRIPTION: "200GB Any Time Data",
      speed: "80 Mbps",
      contract: "No contract",
      benefits: ["Flexible usage", "No commitment", "Priority support"]
    }
  ],
  Unlimited: [
    {
      BB_PACKAGE_NAME: "Unlimited 10Mbps",
      MONTHLY_RENTAL: "3990",
      DESCRIPTION: "Unlimited 10Mbps",
      speed: "10 Mbps",
      contract: "12 months",
      benefits: ["Truly unlimited", "Basic router", "Email support"]
    },
    {
      BB_PACKAGE_NAME: "Unlimited 20Mbps",
      MONTHLY_RENTAL: "5990",
      DESCRIPTION: "Unlimited 20Mbps",
      speed: "20 Mbps",
      contract: "12 months",
      benefits: ["Truly unlimited", "Premium router", "Priority support"]
    },
    {
      BB_PACKAGE_NAME: "Unlimited 50Mbps",
      MONTHLY_RENTAL: "8990",
      DESCRIPTION: "Unlimited 50Mbps",
      speed: "50 Mbps",
      contract: "24 months",
      benefits: ["Truly unlimited", "Premium router", "24/7 VIP support"]
    }
  ]
};

// Animation keyframes
const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(64, 196, 255, 0.4); }
  70% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(64, 196, 255, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(64, 196, 255, 0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(64, 196, 255, 0.5); }
  50% { box-shadow: 0 0 20px rgba(64, 196, 255, 0.8); }
  100% { box-shadow: 0 0 5px rgba(64, 196, 255, 0.5); }
`;

const CustomArrowIcon: React.FC = () => (
  <SvgIcon viewBox="0 0 24 24" sx={{ fontSize: 16 }}>
    <circle cx="12" cy="12" r="11" stroke={colorScheme.secondaryAccent} strokeWidth="2" fill="none" />
    <path d="M10 8l4 4-4 4" stroke={colorScheme.secondaryAccent} strokeWidth="2" fill="none" />
  </SvgIcon>
);

interface BroadbandPostPaidPackageUpgraderProps {
  onBack: () => void;
}

const BroadbandPostPaidPackageUpgrader: React.FC<BroadbandPostPaidPackageUpgraderProps> = ({ onBack }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [currentPackage, setCurrentPackage] = useState(dummyCurrentPackage);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const tabs = ["Standard", "AnyTime", "Unlimited"];
  const [selectedTab, setSelectedTab] = useState("Standard");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const itemWidth = isMobile ? 280 : isTablet ? 320 : 360;
    const currentIndex = Math.round(scrollLeft / itemWidth);
    setActiveIndex(currentIndex);
  };

  const getPackages = () => {
    switch(selectedTab) {
      case "Standard": return dummyPackages.Standard;
      case "AnyTime": return dummyPackages.AnyTime;
      case "Unlimited": return dummyPackages.Unlimited;
      default: return dummyPackages.Standard;
    }
  };

  const packages = getPackages();

  const handleActivation = (item: any) => {
    console.log("Upgrading to package:", item);
    // In a real app, you would call your upgrade API here
    // Show confirmation dialog/modal
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const itemWidth = isMobile ? 280 : isTablet ? 320 : 360;
      scrollRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to active index when tab changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
      setActiveIndex(0);
    }
  }, [selectedTab]);

  return (
    <Box sx={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isMobile ? '1rem' : '2rem',
      position: 'relative',
      background: 'linear-gradient(180deg, #0A1E32 0%, #0A2E4A 100%)',
      borderRadius: '16px',
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.3)'
    }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={onBack}
        sx={{
          position: 'relative',
          alignSelf: 'flex-start',
          color: colorScheme.textPrimary,
          zIndex: 2,
          transition: 'all 0.3s ease',
          padding: '8px 16px',
          borderRadius: '8px',
          backgroundColor: 'rgba(10, 46, 74, 0.7)',
          border: '1px solid rgba(64, 196, 255, 0.3)',
          textTransform: 'none',
          fontSize: isMobile ? '0.9rem' : '1rem',
          fontWeight: 600,
          marginBottom: '2rem',
          '&:hover': {
            backgroundColor: 'rgba(0, 168, 232, 0.3)',
            transform: 'translateX(-4px)',
            boxShadow: '0 4px 12px rgba(64, 196, 255, 0.2)'
          },
          '& .MuiSvgIcon-root': {
            transition: 'transform 0.3s ease',
            color: colorScheme.textPrimary
          },
          '&:hover .MuiSvgIcon-root': {
            transform: 'translateX(-4px)'
          }
        }}
      >
        Back to Packages
      </Button>
    
      {/* Current Package Card */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: "space-between",
          alignItems: "center",
          background: colorScheme.currentPackageBg,
          color: colorScheme.textPrimary,
          padding: isMobile ? '1.5rem' : '2.5rem',
          borderRadius: "16px",
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
          marginBottom: "3rem",
          border: '1px solid rgba(64, 196, 255, 0.3)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 32px rgba(0, 168, 232, 0.4)'
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: colorScheme.buttonGradient,
            animation: `${glow} 3s infinite ease-in-out`
          }
        }}
      >
        {/* Left Section */}
        <Box sx={{ 
          mb: isMobile ? '1.5rem' : 0,
          flex: isMobile ? 1 : 0.4
        }}>
          <Box display="flex" alignItems="center" sx={{ mb: '1rem' }}>
            <CustomArrowIcon sx={{ color: colorScheme.secondaryAccent }} />
            <Typography
              variant="body2"
              sx={{ 
                color: colorScheme.secondaryAccent, 
                fontSize: isMobile ? "0.8rem" : "0.9rem", 
                ml: "0.5rem",
                fontWeight: 600,
                letterSpacing: '1px'
              }}
            >
              YOUR CURRENT PACKAGE
            </Typography>
          </Box>
    
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              background: 'linear-gradient(90deg, #FFFFFF, #E0F7FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid rgba(64, 196, 255, 0.3)',
              fontSize: isMobile ? '1.3rem' : '1.5rem',
              mb: '0.5rem'
            }}
          >
            {currentPackage?.bB_PACKAGE_NAME}
          </Typography>
          
          <Typography variant="body2" sx={{ color: colorScheme.textSecondary, fontSize: isMobile ? '0.9rem' : '1rem' }}>
            {currentPackage.speed} • {currentPackage.contract}
          </Typography>
          
          <Box sx={{ mt: '1rem' }}>
            {currentPackage.benefits.map((benefit, index) => (
              <Box key={index} display="flex" alignItems="center" sx={{ mb: '0.5rem' }}>
                <Box sx={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: colorScheme.secondaryAccent,
                  mr: '0.5rem'
                }} />
                <Typography variant="body2" sx={{ color: colorScheme.textSecondary, fontSize: isMobile ? '0.85rem' : '0.9rem' }}>
                  {benefit}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        
        {/* Middle Section - Price */}
        <Box display="flex" flexDirection="column" alignItems="center" sx={{ 
          mb: isMobile ? '1.5rem' : 0,
          flex: isMobile ? 1 : 0.3,
          position: 'relative',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            height: '60%',
            width: '1px',
            background: 'rgba(64, 196, 255, 0.2)',
            top: '20%',
            [theme.breakpoints.down('sm')]: {
              display: 'none'
            }
          },
          '&::before': {
            left: '-20px'
          },
          '&::after': {
            right: '-20px'
          }
        }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: isMobile ? "2rem" : "2.5rem",
              fontWeight: 800,
              background: 'linear-gradient(90deg, #FFFFFF, #E0F7FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: '0.5rem'
            }}
          >
            Rs. {currentPackage?.monthlY_RENTAL}
          </Typography>
          <Typography
            variant="body2"
            sx={{ 
              fontWeight: 500, 
              color: colorScheme.textSecondary,
              fontSize: isMobile ? '0.9rem' : '1rem'
            }}
          >
            + Tax / Month
          </Typography>
          
          <Box sx={{
            mt: '1.5rem',
            padding: '0.5rem 1rem',
            background: 'rgba(0, 168, 232, 0.2)',
            borderRadius: '20px',
            border: '1px solid rgba(64, 196, 255, 0.3)'
          }}>
            <Typography variant="body2" sx={{ 
              color: colorScheme.secondaryAccent,
              fontWeight: 600,
              fontSize: isMobile ? '0.8rem' : '0.9rem'
            }}>
              Active until: 12/12/2024
            </Typography>
          </Box>
        </Box>
    
        {/* Right Section - Data */}
        <Box display="flex" flexDirection={isMobile ? 'row' : 'column'} alignItems="center" sx={{
          flex: isMobile ? 1 : 0.3,
          gap: isMobile ? '1rem' : '1.5rem'
        }}>
          <Box
            textAlign="center"
            sx={{
              width: isMobile ? '100%' : '140px',
              background: 'rgba(10, 46, 74, 0.7)',
              padding: isMobile ? '0.8rem' : '1.2rem',
              borderRadius: "12px",
              border: '1px solid rgba(64, 196, 255, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
              }
            }}
          >
            <Typography variant="body2" fontWeight="bold" color={colorScheme.secondaryAccent}>
              STANDARD DATA
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="#ffffff" sx={{ fontSize: isMobile ? '1.5rem' : '1.8rem' }}>
              {currentPackage?.standarD_GB}GB
            </Typography>
          </Box>
    
          <Box
            textAlign="center"
            sx={{
              width: isMobile ? '100%' : '140px',
              background: 'rgba(64, 196, 255, 0.2)',
              padding: isMobile ? '0.8rem' : '1.2rem',
              borderRadius: "12px",
              border: '1px solid rgba(64, 196, 255, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
              }
            }}
          >
            <Typography variant="body2" fontWeight="bold" color={colorScheme.secondaryAccent}>
              BONUS DATA
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="#ffffff" sx={{ fontSize: isMobile ? '1.5rem' : '1.8rem' }}>
              {currentPackage?.freE_GB}GB
            </Typography>
          </Box>
        </Box>
      </Box>
    
      {/* Packages Section */}
      <Box
        sx={{
          background: colorScheme.currentPackageBg,
          color: colorScheme.textPrimary,
          padding: isMobile ? '1.5rem' : '2.5rem',
          borderRadius: "16px",
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(64, 196, 255, 0.3)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: colorScheme.buttonGradient,
            animation: `${glow} 3s infinite ease-in-out`
          }
        }}
      >
        <Typography variant="h5" sx={{
          textAlign: 'center',
          mb: '2rem',
          fontWeight: 700,
          color: colorScheme.textPrimary,
          fontSize: isMobile ? '1.3rem' : '1.5rem',
          position: 'relative',
          '&::after': {
            content: '""',
            display: 'block',
            width: '60px',
            height: '3px',
            background: colorScheme.secondaryAccent,
            margin: '0.5rem auto 0',
            borderRadius: '3px'
          }
        }}>
          Upgrade Your Package
        </Typography>
        
        {/* Tab Navigation */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}
        >
          {tabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              sx={{
                padding: isMobile ? '0.6rem 1rem' : '0.75rem 1.5rem',
                background: selectedTab === tab ? 
                  colorScheme.activeTabBg : 
                  'rgba(255, 255, 255, 0.1)',
                color: selectedTab === tab ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                fontWeight: selectedTab === tab ? 700 : 500,
                borderRadius: "8px",
                transition: 'all 0.3s ease',
                minWidth: isMobile ? '100px' : '120px',
                fontSize: isMobile ? '0.8rem' : '0.9rem',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: selectedTab === tab ? 
                    '0 4px 12px rgba(64, 196, 255, 0.4)' : 
                    '0 4px 12px rgba(255, 255, 255, 0.2)',
                  background: selectedTab === tab ? 
                    colorScheme.activeTabBg : 
                    'rgba(255, 255, 255, 0.2)'
                }
              }}
            >
              {tab}
            </Button>
          ))}
        </Box>
        
        {/* Navigation Arrows - Desktop Only */}
        {!isMobile && packages.length > 1 && (
          <>
            <Button
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              sx={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                minWidth: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(10, 46, 74, 0.7)',
                color: colorScheme.textPrimary,
                border: '1px solid rgba(64, 196, 255, 0.3)',
                '&:hover': {
                  background: 'rgba(64, 196, 255, 0.3)'
                },
                '&.Mui-disabled': {
                  opacity: 0.3
                }
              }}
            >
              <ArrowBackIos sx={{ fontSize: '1rem' }} />
            </Button>
            
            <Button
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={activeIndex === packages.length - 1}
              sx={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                minWidth: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(10, 46, 74, 0.7)',
                color: colorScheme.textPrimary,
                border: '1px solid rgba(64, 196, 255, 0.3)',
                '&:hover': {
                  background: 'rgba(64, 196, 255, 0.3)'
                },
                '&.Mui-disabled': {
                  opacity: 0.3
                }
              }}
            >
              <ArrowForwardIos sx={{ fontSize: '1rem' }} />
            </Button>
          </>
        )}
        
        {/* Packages Carousel */}
        <Box
  ref={scrollRef}
  onScroll={handleScroll}
  onMouseDown={handleMouseDown}
  onMouseMove={handleMouseMove}
  onMouseUp={handleMouseUp}
  onMouseLeave={() => setHoveredCard(null)}
  sx={{
    display: "flex",
    gap: isMobile ? "1rem" : "2rem",
    overflowX: "auto",
    padding: isMobile ? "0.5rem" : "1rem",
    scrollSnapType: 'x mandatory',
    scrollPadding: '0 1rem',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    pb: '1rem'
  }}
>
  {packages.map((item, index) => (
    <Card
      key={index}
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
      sx={{
        minWidth: isMobile ? '280px' : isTablet ? '320px' : '360px',
        scrollSnapAlign: 'center',
        background: 'linear-gradient(135deg, rgba(13, 54, 90, 0.9) 0%, rgba(25, 71, 114, 0.9) 100%)',
        color: '#ffffff',
        borderRadius: "16px",
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(64, 196, 255, 0.3)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: hoveredCard === index ? 'translateY(-10px)' : 'none',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          background: 'linear-gradient(90deg, rgba(64, 196, 255, 0.8), rgba(0, 168, 232, 0.8))',
          opacity: hoveredCard === index ? 1 : 0.7,
          transition: 'opacity 0.3s ease'
        }
      }}
    >
      <CardContent sx={{ 
        textAlign: "center",
        padding: isMobile ? '1.5rem' : '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%'
      }}>
        {/* Popular Tag */}
        {index === 1 && (
          <Box sx={{
            position: 'absolute',
            top: '15px',
            right: '-30px',
            background: 'linear-gradient(90deg, #FF8A00, #FF5E00)',
            color: '#fff',
            padding: '0.25rem 2rem',
            transform: 'rotate(45deg)',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            width: '120px',
            textAlign: 'center',
            zIndex: 1
          }}>
            POPULAR
          </Box>
        )}
        
        <Typography
          variant="h5"
          sx={{
            marginBottom: "1.5rem",
            fontWeight: 700,
            fontSize: isMobile ? "1.3rem" : "1.5rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            background: 'linear-gradient(90deg, #FFFFFF, #E0F7FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {item.BB_PACKAGE_NAME}
        </Typography>

        <Box
          sx={{
            width: "100%",
            background: 'rgba(255, 255, 255, 0.1)',
            padding: isMobile ? "1rem" : "1.5rem",
            borderRadius: "12px",
            marginBottom: "1.5rem",
            border: '1px solid rgba(64, 196, 255, 0.2)',
            minHeight: isMobile ? '80px' : '90px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography
            sx={{ 
              fontSize: isMobile ? "1rem" : "1.1rem",
              fontWeight: 600,
              lineHeight: 1.4,
              color: '#ffffff'
            }}
            variant="body2"
          >
            {item.DESCRIPTION || `${item.STANDARD_GB}GB Standard + ${item.FREE_GB}GB Free`}
          </Typography>
        </Box>
        
        {/* Package Details */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          mb: '1.5rem',
          gap: '1rem'
        }}>
          <Box sx={{
            flex: 1,
            background: 'rgba(10, 46, 74, 0.5)',
            padding: '0.5rem',
            borderRadius: '8px',
            border: '1px solid rgba(64, 196, 255, 0.2)'
          }}>
            <Typography variant="body2" sx={{ color: '#40C4FF', fontWeight: 600 }}>
              Speed
            </Typography>
            <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 500 }}>
              {item.speed}
            </Typography>
          </Box>
          
          <Box sx={{
            flex: 1,
            background: 'rgba(10, 46, 74, 0.5)',
            padding: '0.5rem',
            borderRadius: '8px',
            border: '1px solid rgba(64, 196, 255, 0.2)'
          }}>
            <Typography variant="body2" sx={{ color: '#40C4FF', fontWeight: 600 }}>
              Contract
            </Typography>
            <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 500 }}>
              {item.contract}
            </Typography>
          </Box>
        </Box>
        
        {/* Benefits */}
        <Box sx={{ 
          width: '100%',
          textAlign: 'left',
          mb: '1.5rem'
        }}>
          <Typography variant="body2" sx={{ 
            color: '#40C4FF',
            fontWeight: 600,
            mb: '0.5rem'
          }}>
            Package Benefits:
          </Typography>
          {item.benefits.map((benefit, idx) => (
            <Box key={idx} display="flex" alignItems="center" sx={{ mb: '0.3rem' }}>
              <Box sx={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#40C4FF',
                mr: '0.5rem'
              }} />
              <Typography variant="body2" sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: isMobile ? '0.85rem' : '0.9rem'
              }}>
                {benefit}
              </Typography>
            </Box>
          ))}
        </Box>
        
        {/* Price */}
        {/* Price and Upgrade Button - Compact Version */}
<Box sx={{ 
  marginBottom: '0.5rem', // Reduced from 1.5rem
  width: '100%'
}}>
  <Typography
    variant="h3"
    sx={{ 
      fontSize: isMobile ? "2rem" : "2.5rem", 
      fontWeight: 800,
      background: 'linear-gradient(90deg, #FFFFFF, #E0F7FF)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      mb: '0.1rem' // Reduced from 0.25rem
    }}
  >
    Rs.{item.MONTHLY_RENTAL}
  </Typography>
  <Typography
    variant="body2"
    sx={{ 
      fontWeight: 500, 
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: isMobile ? '0.9rem' : '1rem',
      mb: '0.5rem' // Added small margin below this text
    }}
  >
    + Tax / Month
  </Typography>
</Box>

{/* UPGRADE NOW Button - Compact Version */}
<Button
  variant="contained"
  sx={{
    marginTop: '0', // Changed from "auto" to remove extra space
    background: 'linear-gradient(90deg, rgba(64, 196, 255, 0.9), rgba(0, 168, 232, 0.9))',
    color: '#ffffff',
    borderRadius: "12px",
    width: "100%",
    padding: isMobile ? "0.7rem" : "0.9rem", // Slightly reduced padding
    fontSize: isMobile ? "0.9rem" : "1rem",
    fontWeight: 700,
    textTransform: 'none',
    letterSpacing: '0.5px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 168, 232, 0.4)',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 20px rgba(0, 168, 232, 0.6)',
      background: 'linear-gradient(90deg, rgba(64, 196, 255, 1), rgba(0, 168, 232, 1))'
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)',
      transform: 'translateX(-100%)',
      transition: 'transform 0.6s ease'
    },
    '&:hover::before': {
      transform: 'translateX(100%)'
    }
  }}
  onClick={() => handleActivation(item)}
>
  UPGRADE NOW
</Button>
      </CardContent>
    </Card>
  ))}
</Box>
        
        {/* Pagination Indicators */}
        {packages.length > 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "2rem"
            }}
          >
            {packages.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: activeIndex === index ? '24px' : '8px',
                  height: '8px',
                  background: activeIndex === index ? 
                    colorScheme.secondaryAccent : 
                    'rgba(64, 196, 255, 0.3)',
                  borderRadius: '4px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    background: colorScheme.secondaryAccent
                  }
                }}
                onClick={() => scrollToIndex(index)}
              />
            ))}
          </Box>
        )}
      </Box>
      
      {/* Upgrade Info */}
      <Box sx={{
        mt: '3rem',
        background: 'rgba(10, 46, 74, 0.7)',
        padding: isMobile ? '1.5rem' : '2rem',
        borderRadius: '16px',
        border: '1px solid rgba(64, 196, 255, 0.3)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
      }}>
        <Typography variant="h6" sx={{ 
          color: colorScheme.secondaryAccent,
          mb: '1rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center'
        }}>
          <Box component="span" sx={{
            display: 'inline-block',
            width: '24px',
            height: '24px',
            background: colorScheme.secondaryAccent,
            borderRadius: '50%',
            color: colorScheme.primaryDark,
            textAlign: 'center',
            lineHeight: '24px',
            fontWeight: 'bold',
            mr: '0.75rem'
          }}>i</Box>
          Package Upgrade Information
        </Typography>
        
        <Box sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '1.5rem' : '2rem'
        }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ 
              color: colorScheme.textSecondary,
              mb: '0.5rem',
              fontWeight: 500
            }}>
              • Upgrades take effect from your next billing cycle
            </Typography>
            <Typography variant="body2" sx={{ 
              color: colorScheme.textSecondary,
              mb: '0.5rem',
              fontWeight: 500
            }}>
              • No downtime during the upgrade process
            </Typography>
            <Typography variant="body2" sx={{ 
              color: colorScheme.textSecondary,
              fontWeight: 500
            }}>
              • Early termination fees may apply for contract changes
            </Typography>
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ 
              color: colorScheme.textSecondary,
              mb: '0.5rem',
              fontWeight: 500
            }}>
              • Pro-rated charges may apply for mid-cycle upgrades
            </Typography>
            <Typography variant="body2" sx={{ 
              color: colorScheme.textSecondary,
              mb: '0.5rem',
              fontWeight: 500
            }}>
              • New equipment may be required for some packages
            </Typography>
            <Typography variant="body2" sx={{ 
              color: colorScheme.textSecondary,
              fontWeight: 500
            }}>
              • 24/7 customer support available for any questions
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BroadbandPostPaidPackageUpgrader;