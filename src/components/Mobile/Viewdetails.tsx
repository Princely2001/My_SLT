import { useState, useEffect } from 'react';
import { Box, Button, Typography, useMediaQuery, useTheme, Divider } from "@mui/material";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import ArrowBack from "@mui/icons-material/ArrowBack";
import CircularProgressBar from "../CircularProgressBar";
import BroadbandNavbar from "../BroadbandDetails/BroadbandNavbar";
import { keyframes } from '@emotion/react';

// Define interfaces
interface PostpaidUsageDetails {
  package_summary: {
    used: string;
    limit: string;
  };
  usageDetails: Array<{
    name: string;
    used: string;
    limit: string;
    expiry_date: string;
    percentage: number;
  }>;
}

interface ServiceData {
  listofBBService: Array<{
    serviceID: string;
    serviceStatus: string;
    packageName: string;
  }>;
}

// Color Scheme
const colorScheme = {
  primaryDark: 'rgb(13, 54, 90)',
  primaryLight: 'rgb(25, 71, 114)',
  accent: 'rgb(0, 168, 232)',
  secondaryAccent: 'rgb(64, 196, 255)',
  highlight: 'rgb(100, 210, 255)',
  textPrimary: 'rgba(255, 255, 255, 0.95)',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  divider: 'rgba(255, 255, 255, 0.12)',
  cardBg: 'rgba(18, 63, 102, 0.4)',
  buttonGradient: 'linear-gradient(135deg, rgb(0, 168, 232) 0%, rgb(64, 196, 255) 100%)',
  navbarBg: 'rgba(13, 54, 90, 0.8)'
};

// Animations
const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(3deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 168, 232, 0.6); }
  70% { box-shadow: 0 0 0 15px rgba(0, 168, 232, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 168, 232, 0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Mock data
const dummyServiceData: ServiceData = {
  listofBBService: [{
    serviceID: "BB-123456",
    serviceStatus: "Active",
    packageName: "Premium Internet 200GB"
  }]
};

const dummyUsageDetails = {
  myPackageDetails: {
    package_summary: { used: "75", limit: "200" },
    usageDetails: [
      {
        name: "Main Package",
        used: "75",
        limit: "200",
        expiry_date: "2024-12-31",
        percentage: 37.5
      },
      {
        name: "Night Package",
        used: "30",
        limit: "100",
        expiry_date: "2024-12-31",
        percentage: 30
      }
    ]
  },
  extraGBDetails: {
    package_summary: { used: "5", limit: "10" },
    usageDetails: [
      {
        name: "Extra GB Pack",
        used: "5",
        limit: "10",
        expiry_date: "2024-06-30",
        percentage: 50
      }
    ]
  },
  bonusDataDetails: {
    package_summary: { used: "2", limit: "5" },
    usageDetails: [
      {
        name: "Bonus Data",
        used: "2",
        limit: "5",
        expiry_date: "2024-07-15",
        percentage: 40
      }
    ]
  },
  addOnsDetails: {
    package_summary: { used: "0", limit: "0" },
    usageDetails: []
  },
  freeDataDetails: {
    package_summary: { used: "10", limit: "15" },
    usageDetails: [
      {
        name: "Free Data Pack",
        used: "10",
        limit: "15",
        expiry_date: "2024-08-01",
        percentage: 66.67
      }
    ]
  }
};

const navbarItems = [
  { label: "My Package", ...dummyUsageDetails.myPackageDetails.package_summary },
  { label: "Extra GB", ...dummyUsageDetails.extraGBDetails.package_summary },
  { label: "Bonus Data", ...dummyUsageDetails.bonusDataDetails.package_summary },
  { label: "Add-Ons", ...dummyUsageDetails.addOnsDetails.package_summary },
  { label: "Free Data", ...dummyUsageDetails.freeDataDetails.package_summary },
];

const DataUsageDetails = ({ onBack }: { onBack: () => void }) => {
  const [selectedItem, setSelectedItem] = useState("My Package");
  const [selectedPackage, setSelectedPackage] = useState<PostpaidUsageDetails | null>(
    dummyUsageDetails.myPackageDetails
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handlePackageChange = (item: string) => {
    setIsLoading(true);
    setSelectedItem(item);
    
    setTimeout(() => {
      switch(item) {
        case "My Package":
          setSelectedPackage(dummyUsageDetails.myPackageDetails);
          break;
        case "Extra GB":
          setSelectedPackage(dummyUsageDetails.extraGBDetails);
          break;
        case "Bonus Data":
          setSelectedPackage(dummyUsageDetails.bonusDataDetails);
          break;
        case "Add-Ons":
          setSelectedPackage(dummyUsageDetails.addOnsDetails);
          break;
        case "Free Data":
          setSelectedPackage(dummyUsageDetails.freeDataDetails);
          break;
      }
      setSelectedIndex(0);
      setIsLoading(false);
    }, 500);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, ${colorScheme.primaryDark} 0%, ${colorScheme.primaryLight} 100%)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      py: 4,
      px: isMobile ? 2 : 4,
      color: colorScheme.textPrimary,
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
        background: colorScheme.buttonGradient,
        zIndex: 1
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        right: '-50%',
        bottom: '-50%',
        background: 'linear-gradient(45deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.03) 100%)',
        animation: `${floatAnimation} 20s infinite linear`,
        zIndex: 0
      }
    }}>
      {/* Back Button */}
      <Button
  startIcon={<ArrowBack />}
  onClick={onBack}
  sx={{
    alignSelf: 'flex-start', // This helps when inside a flex container
    color: 'white',
    mb: 4,
    zIndex: 2,
    transition: 'all 0.3s ease',
    px: 2,
    py: 1,
    borderRadius: '8px',
    backgroundColor: 'transparent',
    textTransform: 'none',
    fontSize: '1.25rem',
    fontWeight: 700,
    justifyContent: 'flex-start', // Makes icon and text align to left *within* the button
    '&:hover': {
      backgroundColor: 'rgba(0, 168, 232, 0.1)',
      transform: 'translateX(-5px)',
      boxShadow: '0 2px 10px rgba(0, 168, 232, 0.3)',
    },
  }}
>
  Transaction History
</Button>



      {/* Main Content Container */}
      <Box sx={{
        width: '100%',
        maxWidth: '1200px',
        background: colorScheme.cardBg,
        borderRadius: '24px',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        p: isMobile ? 2 : 4,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
        animation: `${fadeIn} 0.5s ease-out`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, rgba(0, 168, 232, 0.1) 0%, rgba(64, 196, 255, 0.05) 100%)`,
          zIndex: -1
        }
      }}>
        {/* Navbar */}
        <BroadbandNavbar
          navbarItems={navbarItems}
          onSelected={handlePackageChange}
          type="Summary"
          selected={selectedItem}
          isMobile={isMobile}
          darkMode
          accentColor={colorScheme.accent}
          bgColor={colorScheme.navbarBg}
        />

        {/* Content Area */}
        <Box sx={{ 
          display: "flex", 
          flexDirection: isMobile ? 'column' : 'row',
          gap: 4,
          mt: 4
        }}>
          {/* Left Panel - Usage Visualization */}
          <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            p: isMobile ? 2 : 4,
            background: colorScheme.cardBg,
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)',
            minHeight: '400px',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: `0 12px 40px ${colorScheme.accent}40`
            }
          }}>
            {isLoading ? (
              <Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2
              }}>
                <Box sx={{
                  width: 180,
                  height: 180,
                  borderRadius: '50%',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%)',
                  backgroundSize: '200% 100%',
                  animation: `${shimmer} 1.5s infinite linear`
                }} />
                <Box sx={{
                  width: '80%',
                  height: 24,
                  borderRadius: '4px',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%)',
                  backgroundSize: '200% 100%',
                  animation: `${shimmer} 1.5s infinite linear`
                }} />
                <Box sx={{
                  width: '60%',
                  height: 16,
                  borderRadius: '4px',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%)',
                  backgroundSize: '200% 100%',
                  animation: `${shimmer} 1.5s infinite linear`,
                  mt: 1
                }} />
              </Box>
            ) : selectedPackage?.usageDetails.length > 0 ? (
              <>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600, 
                  animation: `${fadeIn} 0.5s ease-out`,
                  textAlign: 'center',
                  background: colorScheme.buttonGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                  {selectedItem === "My Package"
                    ? `Your speed is Active right now`
                    : selectedPackage?.usageDetails[selectedIndex]?.name}
                </Typography>
                
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '-30px',
                      left: '-30px',
                      right: '-30px',
                      bottom: '-30px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${colorScheme.accent}20 0%, ${colorScheme.accent}00 70%)`,
                      zIndex: -1,
                      animation: isHovering ? `${pulseAnimation} 2s infinite` : 'none'
                    }
                  }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <ArrowBackIos
                    sx={{
                      color: selectedIndex === 0 ? 'rgba(255,255,255,0.3)' : colorScheme.secondaryAccent,
                      cursor: selectedIndex === 0 ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      fontSize: isMobile ? '1.5rem' : '2rem',
                      '&:hover': {
                        transform: selectedIndex === 0 ? 'none' : 'scale(1.3)',
                        color: selectedIndex === 0 ? 'rgba(255,255,255,0.3)' : colorScheme.highlight
                      }
                    }}
                    onClick={() => selectedIndex > 0 && setSelectedIndex(prev => prev - 1)}
                  />
                  
                  <CircularProgressBar
                    percentage={selectedPackage.usageDetails[selectedIndex].percentage}
                    size={isMobile ? 150 : 200}
                    accentColor={colorScheme.accent}
                    darkMode
                  />

                  <ArrowForwardIos
                    sx={{
                      color: selectedIndex === selectedPackage.usageDetails.length - 1 
                        ? 'rgba(255,255,255,0.3)' : colorScheme.secondaryAccent,
                      cursor: selectedIndex === selectedPackage.usageDetails.length - 1 ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      fontSize: isMobile ? '1.5rem' : '2rem',
                      '&:hover': {
                        transform: selectedIndex === selectedPackage.usageDetails.length - 1 ? 'none' : 'scale(1.3)',
                        color: selectedIndex === selectedPackage.usageDetails.length - 1 ? 'rgba(255,255,255,0.3)' : colorScheme.highlight
                      }
                    }}
                    onClick={() => selectedIndex < selectedPackage.usageDetails.length - 1 && 
                      setSelectedIndex(prev => prev + 1)}
                  />
                </Box>

                <Box sx={{ 
                  textAlign: 'center',
                  animation: `${fadeIn} 0.7s ease-out`,
                  width: '100%'
                }}>
                  <Typography variant="h4" sx={{ 
                    fontWeight: 700,
                    mb: 1,
                    background: 'linear-gradient(90deg, #FFFFFF, #E0F7FA)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {`${selectedPackage.usageDetails[selectedIndex].used} GB`}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: colorScheme.textSecondary,
                    mb: 2,
                    fontWeight: 500
                  }}>
                    {`of ${selectedPackage.usageDetails[selectedIndex].limit} GB used`}
                  </Typography>
                  
                  <Divider sx={{ 
                    my: 2, 
                    background: `linear-gradient(90deg, transparent, ${colorScheme.secondaryAccent}, transparent)`,
                    height: '1px'
                  }} />
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mt: 1, 
                      color: colorScheme.textSecondary,
                      position: 'relative',
                      display: 'inline-block',
                      px: 2,
                      py: 1,
                      borderRadius: '12px',
                      background: `rgba(0, 168, 232, 0.1)`,
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-2px',
                        left: '20%',
                        width: '60%',
                        height: '2px',
                        background: `linear-gradient(90deg, transparent, ${colorScheme.secondaryAccent}, transparent)`,
                        animation: `${floatAnimation} 3s infinite linear`
                      }
                    }}
                  >
                    {`Valid until ${formatDate(selectedPackage.usageDetails[selectedIndex].expiry_date)}`}
                  </Typography>
                </Box>
              </>
            ) : (
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                gap: 2
              }}>
                <Box sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  border: '2px dashed rgba(255, 255, 255, 0.2)'
                }}>
                  <Typography variant="h4" sx={{ opacity: 0.5 }}>∅</Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 500, color: colorScheme.textPrimary }}>
                  No usage data available
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, color: colorScheme.textSecondary }}>
                  You don't have any active packages for this category
                </Typography>
              </Box>
            )}
          </Box>

          {/* Right Panel - Account Details */}
          <Box sx={{
            width: isMobile ? '100%' : '35%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: isMobile ? 2 : 3,
            background: colorScheme.cardBg,
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            animation: `${fadeIn} 0.7s ease-out`
          }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              mb: 2,
              pb: 1,
              color: colorScheme.textPrimary,
              borderBottom: `1px solid ${colorScheme.divider}`,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-1px',
                left: 0,
                width: '40px',
                height: '2px',
                background: colorScheme.accent,
                borderRadius: '2px'
              }
            }}>
              Account Details
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 2,
              mb: 2
            }}>
              {[
                { label: "Package", value: dummyServiceData.listofBBService[0].packageName },
                { label: "Status", value: dummyServiceData.listofBBService[0].serviceStatus, highlight: true },
                { label: "Service ID", value: dummyServiceData.listofBBService[0].serviceID },
              ].map((item, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    p: 2,
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255, 255, 255, 0.03)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.08)',
                      transform: 'translateX(5px)'
                    }
                  }}
                >
                  <Typography variant="body1" sx={{ color: colorScheme.textSecondary }}>{item.label}:</Typography>
                  <Typography variant="body1" sx={{ 
                    fontWeight: 500,
                    color: item.highlight ? colorScheme.secondaryAccent : colorScheme.textPrimary,
                    textShadow: item.highlight ? `0 0 8px ${colorScheme.accent}40` : 'none'
                  }}>
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ 
              mt: 'auto',
              display: 'flex', 
              flexDirection: 'column', 
              gap: 2,
              animation: `${fadeIn} 0.9s ease-out`
            }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  background: colorScheme.buttonGradient,
                  color: 'white',
                  py: 1.5,
                  borderRadius: '12px',
                  border: 'none',
                  transition: 'all 0.3s ease',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: `0 8px 20px ${colorScheme.accent}50`
                  }
                }}
              >
                Package Upgrade
              </Button>
              
              <Button
                variant="contained"
                fullWidth
                sx={{
                  background: `linear-gradient(135deg, rgba(0, 168, 232, 0.2) 0%, rgba(64, 196, 255, 0.2) 100%)`,
                  color: colorScheme.secondaryAccent,
                  py: 1.5,
                  borderRadius: '12px',
                  border: `1px solid ${colorScheme.secondaryAccent}30`,
                  transition: 'all 0.3s ease',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  '&:hover': {
                    background: `linear-gradient(135deg, rgba(0, 168, 232, 0.3) 0%, rgba(64, 196, 255, 0.3) 100%)`,
                    transform: 'translateY(-3px)',
                    boxShadow: `0 8px 20px ${colorScheme.secondaryAccent}40`
                  }
                }}
              >
                Get Extra GB
              </Button>
              
              <Button
                variant="contained"
                fullWidth
                sx={{
                  background: 'linear-gradient(135deg, rgba(13, 54, 90, 0.3) 0%, rgba(25, 71, 114, 0.2) 100%)',
                  color: colorScheme.textPrimary,
                  py: 1.5,
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(13, 54, 90, 0.4) 0%, rgba(25, 71, 114, 0.3) 100%)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 20px rgba(0, 168, 232, 0.3)'
                  }
                }}
              >
                Data Add-ons
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Decorative elements */}
      <Box sx={{
        position: 'absolute',
        top: '15%',
        left: '5%',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${colorScheme.accent}10 0%, ${colorScheme.accent}00 70%)`,
        animation: `${floatAnimation} 12s infinite ease-in-out`,
        zIndex: 0,
        filter: 'blur(1px)'
      }} />
      
      <Box sx={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '180px',
        height: '180px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${colorScheme.secondaryAccent}10 0%, ${colorScheme.secondaryAccent}00 70%)`,
        animation: `${floatAnimation} 15s infinite ease-in-out`,
        animationDelay: '2s',
        zIndex: 0,
        filter: 'blur(1px)'
      }} />
      
      <Box sx={{
        position: 'absolute',
        top: '60%',
        left: '15%',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)',
        animation: `${floatAnimation} 10s infinite ease-in-out`,
        animationDelay: '1s',
        zIndex: 0,
        filter: 'blur(0.5px)'
      }} />
    </Box>
  );
};

export default DataUsageDetails;