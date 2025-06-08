import { CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import fetchServiceDetailByTelephone from "../../services/fetchServiceDetails";
import useStore from "../../services/useAppStore";
import {
  PostpaidUsageDetails,
  ServiceDetailsAPIResponse,
} from "../../types/types";
import CircularProgressBar from "../CircularProgressBar";
import WatermarkLogo from "../../assets/Images/watermarklogo.png";
import fetchMyPackageUsage from "../../services/postpaid/fetchMyPackageUsage";
import fetchOtherPackageUsage from "../../services/postpaid/fetchOtherUsage";
import BroadbandNavbar from "./BroadbandNavbar";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { useTranslation } from 'react-i18next';

const commonTextStyle = {
  fontSize: "14px",
  fontWeight: 700,
  color: "#0056A2",
};

const commonButtonStyle = {
  borderRadius: "10px",
  width: "90%",
};

interface CustomSectionProps {
  label: string;
  value: string | null;
}

const CustomSection = ({ label, value }: CustomSectionProps) => {
  const { t } = useTranslation();
   const WatermarkLogo = "https://mysltimages.s3.eu-north-1.amazonaws.com/watermarklogo.png";
  return (
    <Typography variant="body2" sx={commonTextStyle}>
      {t(label)}:
      <Typography
        component="span"
        variant="body2"
        sx={{ fontSize: "12px", fontWeight: 500, color: "#0056A2" }}
      >
        {value ? ` ${value}` : ` ${t("Loading...")}`}
      </Typography>
    </Typography>
  );
};

interface ActionButtonProps {
  text: string;
  variant?: "outlined" | "contained";
  onClick: () => void;
}

const ActionButton = ({
  text,
  variant = "outlined",
  onClick,
}: ActionButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button
      variant={variant}
      sx={{
        ...commonButtonStyle,
        zIndex: 10,
        border: variant === "outlined" ? "3px solid #0056A2" : "none",
        backgroundColor: variant === "contained" ? "#0056A2" : "transparent",
        color: variant === "contained" ? "#ffffff" : "#0056A2",
        marginY: variant === "contained" ? 0 : 3,
        padding: variant === "contained" ? 1 : 2.5,
        "&:hover": {
          backgroundColor: variant === "contained" ? "#004b8c" : "#e0f7fa",
          border: variant === "outlined" ? "3px solid #004b8c" : "none",
          color: variant === "contained" ? "#ffffff" : "#004b8c",
        },
      }}
      onClick={onClick}
    >
      <Typography
        variant="body2"
        textTransform="capitalize"
        sx={{ fontWeight: "bold", fontSize: 16 }}
      >
        {t(text)}
      </Typography>
    </Button>
  );
};

const BroadbandDetailsPostPaid = () => {
  const { t } = useTranslation();
  const { selectedTelephone, setLeftMenuItem, serviceDetails } = useStore();
  const [serviceData, setServiceData] =
    useState<ServiceDetailsAPIResponse | null>(null);
  const [usageDetails, setUsageDetails] = useState<{
    myPackageDetails?: PostpaidUsageDetails | null;
    extraGBDetails?: PostpaidUsageDetails | null;
    bonusDataDetails?: PostpaidUsageDetails | null;
    freeDataDetails?: PostpaidUsageDetails | null;
    addOnsDetails?: PostpaidUsageDetails | null;
  }>({});
  const [selectedItem, setSelectedItem] = useState(t("My Package"));
  const [selectedPackage, setSelectedPackage] =
    useState<PostpaidUsageDetails | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const serviceID = serviceData?.listofBBService[0]?.serviceID || null;
  const serviceStatus =
    serviceData?.listofBBService[0]?.serviceStatus || t("Loading...");
  const packageName =
    serviceData?.listofBBService[0]?.packageName || t("Loading...");
  const isPrepaid = serviceDetails?.promotionType === "Prepaid" || serviceDetails?.promotionType === null;

  useEffect(() => {
    const fetchData = async () => {
      if (selectedTelephone) {
        const data = await fetchServiceDetailByTelephone(selectedTelephone);
        setServiceData(data);
      }
    };
    fetchData();
  }, [selectedTelephone]);

  useEffect(() => {
    if (serviceID) {
      const fetchUsageData = async () => {
        setLoading(true);
        const myPackageDetails = await fetchMyPackageUsage(serviceID);
        const extraGBDetails = await fetchOtherPackageUsage(
          serviceID,
          "ExtraGB"
        );
        const bonusDataDetails = await fetchOtherPackageUsage(
          serviceID,
          "BonusData"
        );
        const freeDataDetails = await fetchOtherPackageUsage(
          serviceID,
          "FreeData"
        );
        const addOnsDetails = await fetchOtherPackageUsage(
          serviceID,
          "GetDashboardVASBundles"
        );
        setUsageDetails({
          myPackageDetails,
          extraGBDetails,
          bonusDataDetails,
          freeDataDetails,
          addOnsDetails,
        });
        setLoading(false);
      };

      fetchUsageData();
    }
  }, [serviceID, selectedTelephone]);

  const navbarItems = [
    {
      label: t("My Package"),
      used: usageDetails?.myPackageDetails?.package_summary?.used || null,
      limit: usageDetails?.myPackageDetails?.package_summary?.limit || null,
    },
    {
      label: t("Extra GB"),
      used: usageDetails?.extraGBDetails?.package_summary?.used || null,
      limit: usageDetails?.extraGBDetails?.package_summary?.limit || null,
    },
    {
      label: t("Bonus Data"),
      used: usageDetails?.bonusDataDetails?.package_summary?.used || null,
      limit: usageDetails?.bonusDataDetails?.package_summary?.limit || null,
    },
    {
      label: t("Add-Ons"),
      used: usageDetails?.addOnsDetails?.package_summary?.used || null,
      limit: usageDetails?.addOnsDetails?.package_summary?.limit || null,
    },
    {
      label: t("Free Data"),
      used: usageDetails?.freeDataDetails?.package_summary?.used || null,
      limit: usageDetails?.freeDataDetails?.package_summary?.limit || null,
    },
  ];

  useEffect(() => {
    if (selectedItem === t("My Package")) {
      setSelectedPackage(usageDetails?.myPackageDetails || null);
    } else if (selectedItem === t("Extra GB")) {
      setSelectedPackage(usageDetails?.extraGBDetails || null);
    } else if (selectedItem === t("Bonus Data")) {
      setSelectedPackage(usageDetails?.bonusDataDetails || null);
    } else if (selectedItem === t("Add-Ons")) {
      setSelectedPackage(usageDetails?.addOnsDetails || null);
    } else if (selectedItem === t("Free Data")) {
      setSelectedPackage(usageDetails?.freeDataDetails || null);
    }
  }, [selectedItem, usageDetails, t]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        color: "#FFFFFF1A",
        padding: 1,
        width: "49vw",
        borderRadius: "10px",
        height: "100%",
        boxShadow: "0px 3px 3px #0000004A",
      }}
    >
      <BroadbandNavbar
        navbarItems={navbarItems}
        onSelected={setSelectedItem}
        type="Summary"
        selected={t("My Package")}
      />

      <Box sx={{ height: "100%", display: "flex", justifyContent: "end" }}>
        {loading ? (
          <Box
            sx={{
              width: "90%",
              maxWidth: "400px",
              height: "50vh",
              maxHeight: "400px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              padding: 2,
              border: "1px solid #0056A252",
              borderRadius: "10px",
            }}
          >
            <CircularProgress />
            <Typography>{t("Loading...")}</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              width: "90%",
              maxWidth: "400px",
              height: "50vh",
              maxHeight: "400px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              gap: 1,
              padding: 2,
              border: "1px solid #0056A252",
              borderRadius: "10px",
            }}
          >
            {selectedPackage && selectedPackage?.usageDetails.length > 0 && !loading ? (
              <>
                <Typography
                  variant="body2"
                  sx={{ fontSize: 20, fontWeight: 700, color: "#0F3B7A" }}
                >
                  {selectedItem === t("My Package")
                    ? t("Your speed is {{status}} right now", { status: selectedPackage?.status })
                    : selectedPackage?.usageDetails[selectedIndex]?.name ||
                      t("Loading...")}
                </Typography>
                <Box
                  sx={{
                    width: "95%",
                    display: "Flex",
                    gap: 2,
                    justifyContent: "center",
                    alignItems: "Center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <ArrowBackIos
                    sx={{
                      marginRight: -1,
                      color: selectedIndex === 0 ? "gray" : "#0056A2",
                      zIndex: 100,
                    }}
                    onClick={() => {
                      if (selectedIndex > 0) {
                        setSelectedIndex(selectedIndex - 1);
                      }
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      transition: "transform 0.3s ease-in-out",
                      transform: `translateX(-${selectedIndex * 110}%)`,
                      width: "80%",
                      maxWidth: "300px",
                    }}
                  >
                    {selectedPackage?.usageDetails.map((item, index) => (
                      <Box
                        id={item.name}
                        key={index}
                        sx={{
                          minWidth: "110%",
                          display: "flex",
                          justifyContent: "start",
                        }}
                      >
                        <CircularProgressBar
                          percentage={
                            selectedPackage?.usageDetails[selectedIndex]
                              ?.percentage
                          }
                        />
                      </Box>
                    ))}
                  </Box>
                  <ArrowForwardIos
                    sx={{
                      color:
                        selectedIndex ===
                        selectedPackage.usageDetails.length - 1
                          ? "gray"
                          : "#0056A2",
                      zIndex: 100,
                    }}
                    onClick={() => {
                      if (
                        selectedIndex <
                        selectedPackage.usageDetails.length - 1
                      ) {
                        setSelectedIndex(selectedIndex + 1);
                      }
                    }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{ fontSize: 20, fontWeight: 700, color: "#0F3B7A" }}
                >
                  {t("{{used}} GB USED OF {{limit}} GB", {
                    used: selectedPackage?.usageDetails[selectedIndex].used,
                    limit: selectedPackage?.usageDetails[selectedIndex].limit
                  })}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: 16, fontWeight: 500, color: "#0F3B7A" }}
                >
                  {t("Valid Till : {{date}}", {
                    date: selectedPackage?.usageDetails[selectedIndex].expiry_date
                  })}
                </Typography>
              </>
            ) : (
              <Typography
                variant="body2"
                sx={{ fontSize: 20, fontWeight: 700, color: "#0F3B7A" }}
              >
                {t("No data available for this package")}
              </Typography>
            )}
          </Box>
        )}

        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            width: "40%",
            gap: 2,
            paddingX: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "start",
              backgroundColor: "#B3EDFF8A",
              borderRadius: "10px",
              padding: 1,
              gap: 1,
            }}
          >
            <CustomSection label={t("Package")} value={packageName} />
      <CustomSection label={t("Status")} value={serviceStatus} />
      <CustomSection label={t("Username")} value={serviceID} />
          </Box>

          {isPrepaid ? (
            <>
              <ActionButton
                text="Get Main Package"
                variant="contained"
                onClick={() => {
                  setLeftMenuItem("GetBroadbandMainPackage");
                }}
              />
              <ActionButton
                text="Get Data Add-ons"
                variant="contained"
                onClick={() => {
                  setLeftMenuItem("GetBroadbandAddOnPackage");
                }}
              />
            </>
          ) : (
            <>
              <ActionButton
                text="Package Upgrade"
                variant="outlined"
                onClick={() => {
                  setLeftMenuItem("PostPaidPackageUpgrade");
                }}
              />
              <ActionButton
                text="Get Extra GB"
                variant="contained"
                onClick={() => {
                  setLeftMenuItem("GetExtraGB");
                }}
              />
              <ActionButton
                text="Get Data Add-ons"
                variant="contained"
                onClick={() => {
                  setLeftMenuItem("GetPostpaidAddOnPackages");
                }}
              />
            </>
          )}

          <Box
            sx={{ position: "absolute", zIndex: 1, right: "1%", bottom: "1%" }}
          >
            <img src={WatermarkLogo} alt={t("Watermark Logo")} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BroadbandDetailsPostPaid;