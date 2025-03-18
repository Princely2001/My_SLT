import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  SvgIcon,
} from "@mui/material";
import fetchCurrentPackage from "../../services/postpaid/fetchCurrentPackage";
import useStore from "../../services/useAppStore";
import { BBPackage, CurrentPackageDetails } from "../../types/types";
import fetchPackageUpgrades from "../../services/postpaid/fetchPackageUpgrades";
import upgradePackage from "../../services/postpaid/upgradePackage";

const packages = [
  {
    title: "Any Joy",
    subtitle1: "22GB Any Time BB - ADSL",
    price: 155,
  },
  {
    title: "Any Joy",
    subtitle: "22GB Any Time BB - ADSL",
    price: 155,
  },
  {
    title: "Any Joy",
    subtitle: "22GB Any Time BB - ADSL",
    price: 155,
  },
  {
    title: "Any Joy",
    subtitle: "22GB Any Time BB - ADSL",
    price: 155,
  },
];

const CustomArrowIcon: React.FC = () => (
  <SvgIcon viewBox="0 0 24 24" sx={{ fontSize: 16 }}>
    {/* Green Circle */}
    <circle cx="12" cy="12" r="11" stroke="green" strokeWidth="2" fill="none" />
    {/* Right Arrow */}
    <path d="M10 8l4 4-4 4" stroke="green" strokeWidth="2" fill="none" />
  </SvgIcon>
);
const BroadbandPostPaidPackageUpgrader = () => {
  const { serviceDetails,email } = useStore();
  const [currentPackage, setCurrentPackage] = useState<CurrentPackageDetails>();
  const packageType = serviceDetails?.listofBBService[0]?.serviceType;
  const packageName = serviceDetails?.listofBBService[0]?.packageName;
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const tabs = ["Standard", "Any", "Unlimited"];
  const [selectedTab, setSelectedTab] = useState("Standard");

  const [standardPackages, setStandardPackages] = useState<BBPackage[]>([]);
  const [anyPackages, setAnyPackages] = useState<BBPackage[]>([]);
  const [unlimitedPackages, setUnlimitedPackages] = useState<BBPackage[]>([]);

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
    const itemWidth = 250;
    const currentIndex = Math.round(scrollLeft / itemWidth) + 1;

    setActiveIndex(currentIndex);
  };

  const getPackages = () => {
    let packages = [];

    if (selectedTab === "Standard") {
      packages = standardPackages.map((pkg) => ({
        title: pkg.BB_PACKAGE_NAME,
        subtitle: `Standard : ${pkg.STANDARD_GB}GB + Free : ${pkg.FREE_GB}GB`,
        price: pkg.MONTHLY_RENTAL,
      }));
    } else if (selectedTab === "Any") {
      packages = anyPackages.map((pkg) => ({
        title: pkg.BB_PACKAGE_NAME,
        subtitle: `${pkg.STANDARD_GB}GB ${pkg.DESCRIPTION}`,
        price: pkg.MONTHLY_RENTAL,
      }));
    } else if (selectedTab === "Unlimited") {
      packages = unlimitedPackages.map((pkg) => ({
        title: pkg.BB_PACKAGE_NAME,
        subtitle: pkg.DESCRIPTION,
        price: pkg.MONTHLY_RENTAL,
      }));
    }

    return packages;
  };
  const packages = getPackages();

  useEffect(() => {
    const getCurrentPackage = async () => {
      try {
        if (packageType && packageName) {
          const response = await fetchCurrentPackage(packageType, packageName);
          if (response) {

            setCurrentPackage(response);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    getCurrentPackage();
  }, [packageType, packageName]);

  useEffect(() => {
    const getPackageUpgrades = async () => {
      try {
        if (packageType && packageName) {
          const response = await fetchPackageUpgrades(packageType, packageName);
          if (response) {
            console.log(response);
            setStandardPackages(response.Standard.flat(1) || []);
            setAnyPackages(response.Any.flat(1) || []);
            setUnlimitedPackages(response.Unlimited.flat(1) || []);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    getPackageUpgrades();
  }, [packageType, packageName]);

  const handleActivation = async (item) => {
    try{
      const response = await upgradePackage(
        serviceDetails!.listofBBService[0]?.serviceID,
        serviceDetails!.listofBBService[0]?.serviceType,
        serviceDetails!.contactNamewithInit,
        serviceDetails!.contactMobile,
        email,
        currentPackage?.bB_PACKAGE_NAME || "",
        item.title,
        currentPackage?.monthlY_RENTAL || "",
        item.price,
      )
    }catch(error){
      console.error("An error occurred while upgrading the package:", error);
      return null;
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          color: "#FFFFFF1A",
          padding: 1.5,
          borderRadius: "10px",
          boxShadow: "0px 3px 3px #0000004A",
          overflow: "hidden",
          width: "97%",
          mb: 1,
        }}
      >
        {/* Left Section */}
        <Box>
          <Box display="flex" alignItems="center">
            {/* Custom SVG Icon */}
            <CustomArrowIcon />

            {/* Text */}
            <Typography
              variant="body2"
              sx={{ color: "#0056A2", fontSize: "0.8rem", ml: 0.5 }}
            >
              Current Package
            </Typography>
          </Box>

          <Box sx={{ flexDirection: "column" }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="white"
              sx={{
                backgroundColor: "#1976d2",
                padding: "6px 12px",
                borderRadius: 1,
                display: "inline-block",
                mt: 0.5,
              }}
            >
              {currentPackage?.bB_PACKAGE_NAME}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography
            variant="body2"
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#0056A2",
              mr: 1,
            }}
          >
            Rs. {currentPackage?.monthlY_RENTAL} + Tax
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#0056A2", fontSize: "1rem" }}
          >
            (Per Month)
          </Typography>
        </Box>

        {/* Right Section */}
        <Box display="flex" alignItems="center">
          {/* Standard Data */}
          <Box
            textAlign="center"
            sx={{
              width: "100px",
              backgroundColor: "#C9E1F9",
              padding: 1,
              borderRadius: "10px",
              mr: 2,
            }}
          >
            <Typography variant="body2" fontWeight="bold" color="#0056A2">
              Standard
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="#0056A2">
              {currentPackage?.standarD_GB} GB
            </Typography>
          </Box>

          <Typography variant="h4" mx={1} color="#0056A2" fontWeight="bold">
            +
          </Typography>

          {/* Free Data */}
          <Box
            textAlign="center"
            sx={{
              width: "100px",
              backgroundColor: "#EFE2FC",
              padding: 1,
              borderRadius: "10px",
              ml: 2,
            }}
          >
            <Typography variant="body2" fontWeight="bold" color="#7642A9">
              Free
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="#7642A9">
              {currentPackage?.freE_GB} GB
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          color: "#FFFFFF1A",
          padding: 1,
          borderRadius: "10px",
          height: "100%",
          boxShadow: "0px 3px 3px #0000004A",
          overflow: "hidden",
          width: "98%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: "40px",
            gap: 2,
            mx: 3,
            width: "80%",
            border: "2px solid #0056A2",
            borderRadius: "8px",
            px: 1,
          }}
        >
          {tabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              sx={{
                flex: 1,
                flexGrow: 1,
                height: "80%",
                backgroundColor: selectedTab === tab ? "#0056A2" : "#FFFFFF",
                color: selectedTab === tab ? "#FFFFFF" : "#0056A2",
                fontWeight: selectedTab === tab ? 700 : 500,
                borderRadius: "6px",
                boxShadow:
                  selectedTab === tab
                    ? "0px 4px 6px rgba(0, 86, 162, 0.3)"
                    : "none",
                "&:hover": {
                  backgroundColor: "#0056A2",
                  color: "#FFFFFF",
                },
                textTransform: "none",
              }}
            >
              <Typography variant="body2">{tab}</Typography>
            </Button>
          ))}
        </Box>
        <Box
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setIsDragging(false)}
          sx={{
            display: "flex",
            gap: 1.5,
            overflowX: "auto",
            width: "100%",
            padding: 1,
            cursor: isDragging ? "grabbing" : "grab",
            "&::-webkit-scrollbar": { display: "none" },
            userSelect: "none",
          }}
        >
          <Box sx={{ display: "flex", gap: 1.5, width: "100%", px: 2 }}>
            {packages.map((item, index) => (
              <Card
                key={index}
                sx={{
                  minWidth: "32%",
                  backgroundColor: "#0056A2D1",
                  color: "white",
                  borderRadius: "10px",
                  transition: "transform 0.3s, margin 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#0056A2",
                    transform: "scale(1.05)",
                    marginLeft: 2,
                    marginRight: 2,
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 2,
                        textAlign: "center",
                        fontSize: {
                          xs: "1.2rem",
                          sm: "1.3rem",
                          md: "1.5rem",
                        },
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        width: "70%",
                        border: "3px solid white",
                        padding: 2,
                        borderRadius: 3,
                        backgroundColor: "white",
                        color: "#0056A2",
                      }}
                    >
                      <Typography
                        sx={{ margin: "auto", fontSize: "1rem" }}
                        variant="body2"
                      >
                        <strong>{item.subtitle}</strong>
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ mt: 1, fontSize: "1.5rem", fontWeight: "bold" }}
                    >
                      Rs.{item.price} + Tax
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mb: 1, fontWeight: "bold" }}
                    >
                      (Per Month)
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        backgroundColor: "#FFFFFF",
                        color: "#50B748",
                        borderRadius: "10px",
                        width: "55%",
                        py: 1.5,
                        "&:hover": {
                          backgroundColor: "#4FD745",
                          color: "white",
                        },
                      }}
                      onClick={() => {handleActivation(item)}}
                      fullWidth
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          textTransform: "capitalize",
                          fontSize: "1.25rem",
                          fontWeight: "600",
                        }}
                      >
                        Upgrade
                      </Typography>
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
          }}
        >
          {packages.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: activeIndex === index ? 60 : 8,
                height: 8,
                backgroundColor: activeIndex === index ? "#0056A2" : "#70A0CB",
                borderRadius: activeIndex === index ? 4 : "50%",
                transition: "width 0.3s, background-color 0.3s",
                mb: 1,
              }}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default BroadbandPostPaidPackageUpgrader;
