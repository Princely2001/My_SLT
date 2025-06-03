import {
  Box,
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import fetchDailyUsageData from "../../services/postpaid/fetchDailyUsage";
import fetchPreviousDailyUsageData from "../../services/postpaid/fetchPreviousDailyUsageData";
import useStore from "../../services/useAppStore";
import { DailyUsageDetails } from "../../types/types";

const DailyUsage = () => {
  const { t } = useTranslation();
  const { serviceDetails, setLeftMenuItem, setUsageDetails, detailReportAvailability } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;
  
  const months = [
    t('dailyUsage.currentMonth'),
    t('dailyUsage.lastMonth'),
    t('dailyUsage.twoMonthsAgo')
  ];
  
  const [selectedMonth, setSelectedMonth] = useState<string>(months[0]);
  const [usageData, setUsageData] = useState<DailyUsageDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("Fetching daily usage data for serviceID:", serviceID);

        let data: DailyUsageDetails[] | null = null;

        if (serviceID) {
          if (selectedMonth === months[0]) {
            data = await fetchDailyUsageData(serviceID, "01");
          } else if (selectedMonth === months[1]) {
            data = await fetchPreviousDailyUsageData(serviceID, "01", 1);
          } else if (selectedMonth === months[2]) {
            data = await fetchPreviousDailyUsageData(serviceID, "01", 2);
          }
        }

        if (data) {
          console.log("Fetched Daily Usage Data:", data);
          setUsageData(data);
        } else {
          console.error("No usage data found for serviceID:", serviceID);
        }
      } catch (error) {
        console.error(t('dailyUsage.fetchError'), error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceID, selectedMonth, t]);

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 1.5,
        borderRadius: "10px",
        height: "100%",
        boxShadow: "0px 3px 3px #0000004A",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="body2"
        align="center"
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#0056A2",
          marginBottom: 1,
        }}
      >
        ── {t('dailyUsage.title')} ──
      </Typography>

      {/* Month Navigation */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "40px",
          gap: 2,
          mb: 1,
          width: "95%",
          border: "2px solid #0056A2",
          borderRadius: "8px",
          px: 1,
        }}
      >
        {months.map((month) => (
          <Button
            key={month}
            onClick={() => handleMonthChange(month)}
            sx={{
              flex: 1,
              flexGrow: 1,
              height: "80%",
              backgroundColor: selectedMonth === month ? "#0056A2" : "#FFFFFF",
              color: selectedMonth === month ? "#FFFFFF" : "#0056A2",
              fontWeight: selectedMonth === month ? 700 : 500,
              borderRadius: "6px",
              boxShadow:
                selectedMonth === month
                  ? "0px 4px 6px rgba(0, 86, 162, 0.3)"
                  : "none",
              "&:hover": {
                backgroundColor: "#0056A2",
                color: "#FFFFFF",
              },
              textTransform: "none",
            }}
          >
            <Typography variant="body2">{month}</Typography>
          </Button>
        ))}
      </Box>

      {/* Loading state */}
      {loading && (
        <Typography variant="body1" sx={{ color: "#0056A2", marginBottom: 2 }}>
          {t('comu.loading')}
        </Typography>
      )}

      {/* Legend */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          mb: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 16, height: 16, bgcolor: "#00D300", borderRadius: "50%" }} />
          <Typography variant="body2">{t('dailyUsage.basePackage')}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 16, height: 16, bgcolor: "#ED4872", borderRadius: "50%" }} />
          <Typography variant="body2">{t('dailyUsage.extraGB')}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 16, height: 16, bgcolor: "#FFDD00", borderRadius: "50%" }} />
          <Typography variant="body2">{t('dailyUsage.loyalty')}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ width: 16, height: 16, bgcolor: "#00FFFF", borderRadius: "50%" }} />
          <Typography variant="body2">{t('dailyUsage.vas')}</Typography>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          overflow: "auto",
          maxHeight: "335px",
          paddingRight: 0.5,
          "&::-webkit-scrollbar": { width: "8px", height: "8px" },
          "&::-webkit-scrollbar-track": { backgroundColor: "#f1f1f1", borderRadius: "10px" },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#0D67A6", borderRadius: "10px" },
          "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#0056A2" },
        }}
      >
        <Table>
          <TableHead sx={{ position: "sticky", top: 0, zIndex: 1, backgroundColor: "#0056A2" }}>
            <TableRow>
              <TableCell align="center" sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                {t('dailyUsage.date')}
              </TableCell>
              <TableCell align="center" sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                <Typography variant="body2" sx={{fontWeight: "bold"}}>{t('dailyUsage.totalUsage')}</Typography>
                <Typography variant="body2">({t('common.inGB')})</Typography>
              </TableCell>
              <TableCell align="center" sx={{ width: "40%", color: "#FFFFFF", fontWeight: "bold" }}>
                {t('dailyUsage.usage')}
              </TableCell>
              <TableCell align="center" sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                {t('dailyUsage.report')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usageData ? (
              usageData?.map((row: DailyUsageDetails, index: number) => (
                <TableRow key={index} sx={{ height: "40px" }}>
                  <TableCell align="center" sx={{ padding: "6px" }}>{row.displaydate}</TableCell>
                  <TableCell align="center" sx={{ padding: "6px" }}>{row.daily_total_usage}</TableCell>
                  <TableCell align="center" sx={{ padding: "6px" }}>
                    {row?.usages ? (
                    <Box sx={{ height:"40px", pt:2, display: "flex", justifyContent: "end", alignItems: "center", flexDirection: "column", width: "100%" }}>
                      <Box sx={{ display: "flex", width: "100%", height: 9, borderRadius: "5px", backgroundColor: "#E5E5EF", overflow: "hidden" }}>
                        <Box sx={{ display: "flex", width: `${row.daily_percentage}%`, height: "100%", borderRadius: "5px" }}>
                          {row.usages.map((usage, index) => (
                            <Box
                              key={index}
                              sx={{
                                width: `${usage.percentage}%`,
                                height: 9,
                                backgroundColor: usage.sorter === 1 ? "#00D300" : usage.sorter === 2 ? "#FFDD00" : usage.sorter === 3 ? "#ED4872" : "#00FFFF",
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                      <Link
                        onClick={() => {
                          setLeftMenuItem(t('comu.detailedUsageDetails'));
                          setUsageDetails(row);
                        }}
                        href="#"
                        underline="hover"
                        sx={{ fontSize: "0.75rem", textAlign: "center", mt: 1, color: "#0056A2" }}
                      >
                        {t('dailyUsage.viewDetailedUsage')}
                      </Link>
                    </Box>
                    ) : (
                      <Box>
                        <Typography variant="body2" sx={{color:"#0056A2", fontWeight:600}}>
                          {t('comu.noData')}
                        </Typography>
                      </Box>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Link 
                      onClick={() => {
                        if(detailReportAvailability){
                          setLeftMenuItem(t('comu.protocolReport'));
                          setUsageDetails(row);
                        } else {
                          setLeftMenuItem(t('comu.subscription'));
                        }
                      }} 
                      href="#" 
                      underline="hover" 
                      sx={{ color: "#0056A2" }}
                    >
                      {detailReportAvailability ? t('comu.more') : t('comu.view')}
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  {t('comu.noDataAvailable')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DailyUsage;