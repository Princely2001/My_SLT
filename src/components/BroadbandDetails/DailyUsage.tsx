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
import fetchDailyUsageData from "../../services/postpaid/fetchDailyUsage";
import fetchPreviousDailyUsageData from "../../services/postpaid/fetchPreviousDailyUsageData";
import useStore from "../../services/useAppStore";
import { DailyUsageDetails } from "../../types/types";

const getMonthNames = (): string[] => {
  const now = new Date();
  const monthNames = new Intl.DateTimeFormat("en-US", { month: "long" });

  const lastMonth = monthNames.format(
    new Date(now.setMonth(now.getMonth() - 1))
  ); // Last month
  const twoMonthsAgo = monthNames.format(
    new Date(now.setMonth(now.getMonth() - 1))
  ); // Month before last

  return ["Current Month", lastMonth, twoMonthsAgo];
};

const DailyUsage = () => {
  const { serviceDetails,setLeftMenuItem,setUsageDetails,detailReportAvailability } = useStore(); // Fetch serviceDetails from the store
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;
  const months = getMonthNames();
  const [selectedMonth, setSelectedMonth] = useState<string>(months[0]);
  const [usageData, setUsageData] = useState<DailyUsageDetails[]>([]); // State to store fetched usage data
  const [loading, setLoading] = useState<boolean>(false); // State to handle loading

  // Fetch daily usage data based on selected month
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        console.log("Fetching daily usage data for serviceID:", serviceID); // Debug log

        let data: DailyUsageDetails[] | null = null;

        if (serviceID) {
          if (selectedMonth === months[0]) {
            // Current Month
            data = await fetchDailyUsageData(serviceID, "01");
          } else if (selectedMonth === months[1]) {
            // Last Month
            data = await fetchPreviousDailyUsageData(serviceID, "01", 1);
          } else if (selectedMonth === months[2]) {
            // Two Months Ago
            data = await fetchPreviousDailyUsageData(serviceID, "01", 2);
          }
        }
        // Log the fetched data to debug
        if (data) {
          console.log("Fetched Daily Usage Data:", data);
          setUsageData(data); // Update the state with the fetched data
        } else {
          console.error("No usage data found for serviceID:", serviceID);
        }
      } catch (error) {
        console.error("Error fetching daily usage data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData(); // Call the fetch function
  }, [serviceID, selectedMonth]); // Re-fetch when serviceID or selectedMonth changes

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
        ── Daily Usage ──
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
          Loading data...
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
          <Box
            sx={{
              width: 16,
              height: 16,
              bgcolor: "#00D300",
              borderRadius: "50%",
            }}
          />
          <Typography variant="body2">Base Package</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              bgcolor: "#ED4872",
              borderRadius: "50%",
            }}
          />
          <Typography variant="body2">Extra GB</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              bgcolor: "#FFDD00",
              borderRadius: "50%",
            }}
          />
          <Typography variant="body2">Loyalty</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              bgcolor: "#00FFFF",
              borderRadius: "50%",
            }}
          />
          <Typography variant="body2">VAS</Typography>
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
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#0D67A6",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#0056A2",
          },
        }}
      >
        <Table>
          <TableHead
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              backgroundColor: "#0056A2",
            }}
          >
            <TableRow>
              <TableCell
                align="center"
                sx={{ color: "#FFFFFF", fontWeight: "bold" }}
              >
                Date
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#FFFFFF", fontWeight: "bold" }}
              >
                <Typography variant="body2" sx={{fontWeight: "bold"}}>Total Usage</Typography>
                <Typography variant="body2">(in GB)</Typography>
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: "40%", color: "#FFFFFF", fontWeight: "bold" }}
              >
                Usage
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#FFFFFF", fontWeight: "bold" }}
              >
                Report
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usageData ? (
              usageData?.map((row: DailyUsageDetails, index: number) => (
                <TableRow key={index} sx={{ height: "40px" }}>
                  <TableCell align="center" sx={{ padding: "6px" }}>{row.displaydate}</TableCell>
                  <TableCell align="center" sx={{ padding: "6px" }}>{row.daily_total_usage} </TableCell>
                  <TableCell align="center" sx={{ padding: "6px" }}>
                    {row?.usages ? (
                    <Box
                      sx={{
                        height:"40px",
                        pt:2,
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center", // Center the progress bar vertically
                        flexDirection: "column",
                        width: "100%", // Ensure full width for the progress bar
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          width: "100%",
                          height: 9,
                          borderRadius: "5px",
                          backgroundColor: "#E5E5EF",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                        sx={{
                            display: "flex",
                            width: `${row.daily_percentage}%`,
                            height: "100%",
                            borderRadius: "5px",
                            
                        }}
                        >
                            {row?.usages?
                            row.usages.map((usage, index) => {
                          return (
                            <Box
                              key={index}
                              sx={{
                                width: `${usage.percentage}%`,
                                height: 9,
                                backgroundColor: usage.sorter === 1 ? "#00D300" : usage.sorter === 2 ? "#FFDD00" : usage.sorter === 3 ? "#ED4872" : "#00FFFF",
                                
                              }}
                            ></Box>
                          );
                        }):<Box>no data</Box>
                      }
                        </Box>
                      </Box>
                      <Link
                      onClick={() => {
                        setLeftMenuItem("DetailedUsageDetails");
                        setUsageDetails(row);
                      }}
                        href="#"
                        underline="hover"
                        sx={{
                          fontSize: "0.75rem",
                          textAlign: "center",
                          mt: 1, // Added margin-top for spacing
                          color: "#0056A2",
                        }}
                      >
                        View Detailed Usage
                      </Link>
                    </Box>):<Box>
                      <Typography variant="body2" sx={{color:"#0056A2", fontWeight:600}}>
                        No data
                      </Typography>
                      </Box>}
                  </TableCell>
                  <TableCell align="center">
                    <Link onClick={() => {
                      if(detailReportAvailability){
                          setLeftMenuItem("ProtocolReport");
                          setUsageDetails(row);
                      }else{
                        setLeftMenuItem("Subscription");
                      }
                        }} href="#" underline="hover" sx={{ color: "#0056A2" }}>
                      {detailReportAvailability? "More":"View"}
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No data available
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
