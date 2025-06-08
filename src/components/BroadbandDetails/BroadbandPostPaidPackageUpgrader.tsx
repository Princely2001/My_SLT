import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  SvgIcon,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import fetchCurrentPackage from "../../services/postpaid/fetchCurrentPackage";
import useStore from "../../services/useAppStore";
import { BBPackage, CurrentPackageDetails } from "../../types/types";
import fetchPackageUpgrades from "../../services/postpaid/fetchPackageUpgrades";
import upgradePackage from "../../services/postpaid/upgradePackage";

interface PackageCardItem {
  title: string;
  subtitle: string;
  price: string;
}


const CustomArrowIcon: React.FC = () => (
  <SvgIcon viewBox="0 0 24 24" sx={{ fontSize: 16 }}>
    <circle cx="12" cy="12" r="11" stroke="green" strokeWidth="2" fill="none" />
    <path d="M10 8l4 4-4 4" stroke="green" strokeWidth="2" fill="none" />
  </SvgIcon>
);

const BroadbandPostPaidPackageUpgrader: React.FC = () => {
  const { t } = useTranslation();
  const { serviceDetails} = useStore();
  const storedEmail = localStorage.getItem("username");
  const [currentPackage, setCurrentPackage] = useState<CurrentPackageDetails | null>(null);
  const packageType = serviceDetails?.listofBBService[0]?.serviceType || "";
  const packageName = serviceDetails?.listofBBService[0]?.packageName || "";
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const tabs = ["standard", "any", "unlimited"] as const;
  const [selectedTab, setSelectedTab] = useState<typeof tabs[number]>("standard");

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

  const getPackages = (): PackageCardItem[] => {
    switch (selectedTab) {
      case "standard":
        return standardPackages.map((pkg) => ({
          title: pkg.BB_PACKAGE_NAME,
          subtitle: `${t("package.standard")}: ${pkg.STANDARD_GB}GB + ${t("package.free")}: ${pkg.FREE_GB}GB`,
          price: pkg.MONTHLY_RENTAL,
        }));
      case "any":
        return anyPackages.map((pkg) => ({
          title: pkg.BB_PACKAGE_NAME,
          subtitle: `${pkg.STANDARD_GB}GB ${pkg.DESCRIPTION}`,
          price: pkg.MONTHLY_RENTAL,
        }));
      case "unlimited":
        return unlimitedPackages.map((pkg) => ({
          title: pkg.BB_PACKAGE_NAME,
          subtitle: pkg.DESCRIPTION,
          price: pkg.MONTHLY_RENTAL,
        }));
      default:
        return [];
    }
  };

  const packages = getPackages();

  useEffect(() => {
    const getCurrentPackage = async () => {
      try {
        if (packageType && packageName) {
          const response = await fetchCurrentPackage(packageType, packageName);
          setCurrentPackage(response || null);
        }
      } catch (err) {
        console.error("Error fetching current package:", err);
        setCurrentPackage(null);
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
            setStandardPackages(response.Standard?.flat() || []);
            setAnyPackages(response.Any?.flat() || []);
            setUnlimitedPackages(response.Unlimited?.flat() || []);
          }
        }
      } catch (err) {
        console.error("Error fetching package upgrades:", err);
        setStandardPackages([]);
        setAnyPackages([]);
        setUnlimitedPackages([]);
      }
    };
    getPackageUpgrades();
  }, [packageType, packageName]);

  const handleActivation = async (item: PackageCardItem) => {
    if (!serviceDetails?.listofBBService[0] || !currentPackage) {
      console.error("Service details or current package not available");
      return;
    }

    try {
      await upgradePackage(
        serviceDetails.listofBBService[0].serviceID,
        serviceDetails.listofBBService[0].serviceType,
        serviceDetails.contactNamewithInit || "",
        serviceDetails.contactMobile || "",
        storedEmail || "",
        currentPackage.bB_PACKAGE_NAME,
        item.title,
        currentPackage.monthlY_RENTAL,
        item.price
      );
    } catch (error) {
      console.error("Package upgrade failed:", error);
    }
  };

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
        <Box>
          <Box display="flex" alignItems="center">
            <CustomArrowIcon />
            <Typography
              variant="body2"
              sx={{ color: "#0056A2", fontSize: "0.8rem", ml: 0.5 }}
            >
              {t("package.currentPackage")}
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
            {t("common.currency")} {currentPackage?.monthlY_RENTAL} + {t("package.tax")}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#0056A2", fontSize: "1rem" }}
          >
            ({t("package.perMonth")})
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
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
              {t("package.standard")}
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="#0056A2">
              {currentPackage?.standarD_GB} {t("comm.gb")}
            </Typography>
          </Box>

          <Typography variant="h4" mx={1} color="#0056A2" fontWeight="bold">
            +
          </Typography>

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
              {t("package.free")}
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="#7642A9">
              {currentPackage?.freE_GB} {t("comm.gb")}
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
              <Typography variant="body2">{t(`package.${tab}`)}</Typography>
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
    minWidth: { xs: "100%", sm: "48%", md: "32%" }, // Responsive width
    backgroundColor: "#0056A2D1",
    color: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 86, 162, 0.3)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#0056A2",
      transform: "translateY(-5px)",
      boxShadow: "0 8px 16px rgba(0, 86, 162, 0.4)",
    },
    height: "100%", // Ensure consistent height
    display: "flex",
    flexDirection: "column",
  }}
>
  <CardContent sx={{ 
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    padding: { xs: 2, md: 3 },
    textAlign: "center"
  }}>
    {/* Title Section */}
    <Typography
      variant="h6"
      sx={{
        mb: 2,
        fontSize: {
          xs: "1.3rem",
          sm: "1.4rem",
          md: "1.6rem",
        },
        fontWeight: "700",
        lineHeight: 1.2,
        minHeight: "3.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {item.title}
    </Typography>

    {/* Price Highlight Box */}
    <Box
      sx={{
        my: 2,
        mx: "auto",
        width: "80%",
        border: "3px solid white",
        padding: { xs: 1.5, md: 2 },
        borderRadius: "8px",
        backgroundColor: "white",
        color: "#0056A2",
      }}
    >
      <Typography
        sx={{ 
          fontSize: { xs: "1.1rem", md: "1.2rem" },
          fontWeight: "700"
        }}
      >
        {item.subtitle}
      </Typography>
    </Box>

    {/* Price Display */}
    <Box sx={{ my: 1 }}>
      <Typography
        sx={{ 
          fontSize: { xs: "1.4rem", md: "1.6rem" },
          fontWeight: "700",
          color: "#FFFFFF"
        }}
      >
        {t("common.currency")}{item.price} + {t("package.tax")}
      </Typography>
      <Typography
        sx={{ 
          fontSize: "0.9rem",
          fontWeight: "600",
          color: "rgba(255, 255, 255, 0.8)"
        }}
      >
        ({t("package.perMonth")})
      </Typography>
    </Box>

    {/* Features List - Add if available */}
    {/* {item.features && (
      <Box sx={{ my: 2, textAlign: "left" }}>
        {item.features.map((feature, i) => (
          <Typography key={i} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <CheckCircleOutline sx={{ mr: 1, fontSize: "1.2rem" }} />
            {feature}
          </Typography>
        ))}
      </Box>
    )} */}

    {/* Upgrade Button */}
    <Button
      variant="contained"
      sx={{
        mt: "auto", // Pushes button to bottom
        mb: 1,
        backgroundColor: "#FFFFFF",
        color: "#50B748",
        borderRadius: "8px",
        padding: { xs: "8px", md: "10px" },
        fontSize: { xs: "1rem", md: "1.1rem" },
        fontWeight: "600",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#4FD745",
          color: "white",
          boxShadow: "0 4px 8px rgba(79, 215, 69, 0.4)"
        },
        width: "80%",
        mx: "auto"
      }}
      onClick={() => handleActivation(item)}
    >
      {t("package.upgrade")}
    </Button>
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