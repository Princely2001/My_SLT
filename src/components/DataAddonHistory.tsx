import React, { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import fetchPurchaseHistory from "../services/postpaid/fetchhistorydetails";
import { DataBundle } from "../types/types";
import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import useStore from "../services/useAppStore";

const PurchaseHistoryComponent: React.FC = () => {
  const { t } = useTranslation();
  const [allPurchaseHistory, setAllPurchaseHistory] = useState<DataBundle[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date()
  });

  const { serviceDetails} = useStore();
  const subscriberID = serviceDetails?.listofBBService[0]?.serviceID;
  const WaterMarkLogo = "https://mysltimages.s3.eu-north-1.amazonaws.com/watermarklogo.png";
  const today = new Date();

  const fetchHistory = useCallback(async () => {
    const { from, to } = dateRange;

    if (!from || !to) {
      setError(t("purchaseHistory.errors.dateRangeRequired"));
      return;
    }
    if (!subscriberID) {
      setError(t("purchaseHistory.errors.subscriberNotFound"));
      return;
    }
    if (from > to) {
      setError(t("purchaseHistory.errors.invalidDateRange"));
      return;
    }

    setLoading(true);
    setError(null);
    setShowTable(false);

    try {
      const formattedFrom = from.toISOString().split("T")[0];
      const formattedTo = to.toISOString().split("T")[0];
      
      const data = await fetchPurchaseHistory(subscriberID, formattedFrom, formattedTo);
      setAllPurchaseHistory(data && data.length > 0 ? data : []);
      setShowTable(true);
    } catch (err) {
      setError(t("purchaseHistory.errors.fetchFailed"));
      console.error("Error fetching purchase history:", err);
    } finally {
      setLoading(false);
    }
  }, [subscriberID, dateRange, t]);

  useEffect(() => {
    if (subscriberID) {
      fetchHistory();
    }
  }, [subscriberID, fetchHistory]);

  const handleDateChange = useCallback((field: "from" | "to", date: Date | null) => {
    setDateRange(prev => ({
      ...prev,
      [field]: date
    }));
    setShowTable(false);
  }, []);

  const handleSearch = async () => {
    await fetchHistory();
  };

  const filterByTab = (data: DataBundle[] | null, tab: number): DataBundle[] => {
    if (!data) return [];

    switch (tab) {
      case 1:
        return data.filter((item) => {
          const lowerType = item.vasType?.toLowerCase() || '';
          const lowerPackage = item.vasPackage?.toLowerCase() || '';
          const isExtraGb =
            lowerType.includes('extra') || lowerPackage.includes('extra') ||
            lowerType.includes('gb') || lowerPackage.includes('gb');
          const isAddon =
            lowerType.includes('add-on') || lowerPackage.includes('add-on');
          return isExtraGb && !isAddon;
        });

      case 2:
        return data.filter((item) => {
          const lowerType = item.vasType?.toLowerCase() || '';
          const lowerPackage = item.vasPackage?.toLowerCase() || '';
          const isAddon =
            lowerType.includes('add-on') || lowerPackage.includes('add-on');
          return isAddon;
        });

      default:
        return data;
    }
  };

  const filteredHistory = filterByTab(allPurchaseHistory, selectedTab);

 const handleViewModeChange = (
  _: React.MouseEvent<HTMLElement>,
  newViewMode: "cards" | "table" | null
) => {
  if (newViewMode !== null) {
    setViewMode(newViewMode);
  }
};


  return (
    <Box sx={{ 
      position: "relative", 
      minHeight: "440px", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      backgroundColor: "#FFFFFF", 
      padding: 1.5, 
      borderRadius: "10px", 
      height: "auto", 
      boxShadow: "0px 3px 3px #0000004A", 
      overflow: "hidden", 
      zIndex: 2 
    }}>
      <Typography variant="body2" align="center" sx={{ 
        fontSize: "24px", 
        fontWeight: "bold", 
        color: "#0056A2", 
        marginBottom: 1, 
        letterSpacing: "0.5px" 
      }}>
        ── {t("purchaseHistory.title")} ──
      </Typography>

      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-around", 
        alignItems: "center", 
        height: "40px", 
        gap: 1, 
        mb: 2, 
        width: "95%", 
        border: "2px solid #0056A2", 
        borderRadius: "8px", 
        px: 1, 
        backgroundColor: "#FFFFFF" 
      }}>
        {[t("purchaseHistory.tabs.all"), t("purchaseHistory.tabs.extraGB"), t("purchaseHistory.tabs.addOns")].map((tab, index) => (
          <Button 
            key={tab} 
            onClick={() => { setSelectedTab(index); setShowTable(true); }}
            sx={{ 
              flex: 1, 
              height: "32px", 
              backgroundColor: selectedTab === index ? "#0056A2" : "transparent", 
              color: selectedTab === index ? "#FFFFFF" : "#0056A2", 
              borderRadius: "6px", 
              minWidth: 0, 
              padding: "6px 8px", 
              "&:hover": { 
                backgroundColor: selectedTab === index ? "#004b8c" : "#E5F0FA" 
              }, 
              boxShadow: selectedTab === index ? "0px 4px 6px rgba(0, 86, 162, 0.3)" : "none", 
              transition: "all 0.3s ease" 
            }}
          >
            <Typography variant="body2" sx={{ 
              fontSize: "16px", 
              fontWeight: selectedTab === index ? 700 : 600, 
              textTransform: "none" 
            }}>
              {tab}
            </Typography>
          </Button>
        ))}
      </Box>

      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        gap: 2, 
        p: 2, 
        borderRadius: "10px", 
        backgroundColor: "#B3EDFF8A", 
        width: "95%", 
        mb: 2 
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
          <Box sx={{ minWidth: "140px" }}>
            <Typography variant="body2" sx={{ 
              fontSize: "14px", 
              fontWeight: 700, 
              color: "#0056A2", 
              mb: 0.5 
            }}>
              {t("common.from")}:
            </Typography>
            <DatePicker 
              selected={dateRange.from} 
              onChange={(date) => handleDateChange("from", date)} 
              dateFormat="yyyy-MM-dd" 
              maxDate={dateRange.to || today} 
              customInput={
                <TextField 
                  variant="outlined" 
                  size="small" 
                  fullWidth 
                  sx={{ 
                    "& .MuiOutlinedInput-root": { 
                      borderRadius: "8px", 
                      backgroundColor: "white" 
                    } 
                  }} 
                />
              } 
            />
          </Box>

          <Box sx={{ minWidth: "140px" }}>
            <Typography variant="body2" sx={{ 
              fontSize: "14px", 
              fontWeight: 700, 
              color: "#0056A2", 
              mb: 0.5 
            }}>
              {t("common.to")}:
            </Typography>
            <DatePicker 
              selected={dateRange.to} 
              onChange={(date) => handleDateChange("to", date)} 
              dateFormat="yyyy-MM-dd" 
              maxDate={today} 
              
              customInput={
                <TextField 
                  variant="outlined" 
                  size="small" 
                  fullWidth 
                  sx={{ 
                    "& .MuiOutlinedInput-root": { 
                      borderRadius: "8px", 
                      backgroundColor: "white" 
                    } 
                  }} 
                />
              } 
            />
          </Box>
        </Box>

        <Button 
          variant="contained" 
          onClick={handleSearch} 
          disabled={loading}
          sx={{ 
            minWidth: "120px", 
            height: "40px", 
            backgroundColor: "#0056A2", 
            color: "white", 
            borderRadius: "8px", 
            "&:hover": { 
              backgroundColor: "#004b8c" 
            },
            "&:disabled": {
              backgroundColor: "#cccccc"
            }
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            <Typography variant="body2" sx={{ 
              fontSize: "16px", 
              fontWeight: 600, 
              textTransform: "none" 
            }}>
              {t("common.search")}
            </Typography>
          )}
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
          <CircularProgress sx={{ color: "#0056A2" }} />
        </Box>
      )}
      {error && (
        <Typography variant="body2" align="center" sx={{ 
          fontSize: "14px", 
          fontWeight: 700, 
          color: "#ff4d4d", 
          mb: 2 
        }}>
          {error}
        </Typography>
      )}

      {allPurchaseHistory && showTable && (
        <>
          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            width: "100%", 
            mb: 1, 
            pl: 2, 
            pr: 2 
          }}>
            <Typography variant="body2" sx={{ 
              fontSize: "14px", 
              fontWeight: 700, 
              color: "#0056A2" 
            }}>
              {t("purchaseHistory.showingResults", {
                from: dateRange.from?.toLocaleDateString(),
                to: dateRange.to?.toLocaleDateString()
              })}
            </Typography>
            
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              aria-label="view mode"
              size="small"
              sx={{ 
                backgroundColor: "#E5F0FA",
                borderRadius: "8px",
                "& .MuiToggleButton-root": {
                  border: "none",
                  padding: "6px 12px",
                  textTransform: "capitalize",
                  "&.Mui-selected": {
                    backgroundColor: "#0056A2",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#004b8c"
                    }
                  }
                }
              }}
            >
              <ToggleButton value="cards" aria-label="card view">
                <Typography variant="body2" sx={{ fontSize: "14px", fontWeight: 600 }}>
                  {t("purchaseHistory.viewModes.summary")}
                </Typography>
              </ToggleButton>
              <ToggleButton value="table" aria-label="table view">
                <Typography variant="body2" sx={{ fontSize: "14px", fontWeight: 600 }}>
                  {t("purchaseHistory.viewModes.detailed")}
                </Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {viewMode === "cards" ? (
            <Box sx={{ 
              width: "100%", 
              maxHeight: "200px", 
              overflowY: "auto", 
              pr: 1, 
              "&::-webkit-scrollbar": { width: "6px" }, 
              "&::-webkit-scrollbar-thumb": { 
                backgroundColor: "#0D67A6", 
                borderRadius: "10px" 
              } 
            }}>
              <Grid container spacing={2} alignItems="stretch">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex" }}>
                      <Paper elevation={2} sx={{ 
                        p: 2, 
                        borderRadius: 2, 
                        boxShadow: "0 2px 6px rgba(0, 86, 162, 0.15)", 
                        backgroundColor: "#E3F2FD", 
                        width: "100%",
                        display: "flex", 
                        flexDirection: "column", 
                        justifyContent: "space-between",
                      }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                          <Typography sx={{ 
                            fontWeight: 700, 
                            fontSize: "14px", 
                            color: "#0056A2" 
                          }}>
                            {item.vasPackage || t("common.unknownPackage")}
                          </Typography>
                          <Typography sx={{ 
                            fontSize: "14px", 
                            fontWeight: 600, 
                            color: "#0056A2" 
                          }}>
                            {t("common.currency")} {item.payPrice || "0.00"}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                          <Typography sx={{ 
                            fontSize: "13px", 
                            color: "#4B4B4B" 
                          }}>
                            <strong>{t("common.type")}:</strong> {item.vasType || t("common.notAvailable")}
                          </Typography>
                          <Typography sx={{ 
                            fontSize: "13px", 
                            color: "#4B4B4B" 
                          }}>
                            <strong>{t("common.validTill")}:</strong> {item.validTill || t("common.notAvailable")}
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ 
                      fontSize: "14px", 
                      color: "#0056A2", 
                      textAlign: "center", 
                      mt: 2 
                    }}>
                      {t("purchaseHistory.noResults")}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          ) : (
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: 2,
                overflow: "auto",
                maxHeight: "200px",
                width: "100%",
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
                    <TableCell align="center" sx={{ color: "#FFFFFF", fontSize: "15px", fontWeight: "600" }}>
                      {t("purchaseHistory.tableHeaders.type")}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#FFFFFF", fontSize: "15px", fontWeight: "600" }}>
                      {t("purchaseHistory.tableHeaders.name")}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#FFFFFF", fontSize: "15px", fontWeight: "600" }}>
                      {t("purchaseHistory.tableHeaders.validTill")}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#FFFFFF", fontSize: "15px", fontWeight: "600" }}>
                      {t("purchaseHistory.tableHeaders.price")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredHistory.length > 0 ? (
                    filteredHistory.map((item, index) => (
                      <TableRow 
                        key={index} 
                        sx={{ 
                          height: "40px",
                          "&:nth-of-type(odd)": {
                            backgroundColor: "#F9F9F9",
                          },
                          "&:hover": {
                            backgroundColor: "#E5F0FA",
                          }
                        }}
                      >
                        <TableCell align="center" sx={{ padding: "6px", color: "#0056A2" }}>
                          {item.vasType || t("common.notAvailable")}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "6px", color: "#0056A2" }}>
                          {item.vasPackage || t("common.notAvailable")}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "6px", color: "#0056A2" }}>
                          {item.validTill || t("common.notAvailable")}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: "6px", color: "#0056A2" }}>
                          {t("common.currency")} {item.payPrice || "0.00"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ color: "#0056A2", fontFamily: "'Roboto', sans-serif" }}>
                        {t("purchaseHistory.noResults")}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}

      <Box sx={{ 
        position: "absolute", 
        bottom: 15, 
        right: 15, 
        opacity: 0.9, 
        zIndex: 1, 
        pointerEvents: "none" 
      }}>
        <img src={WaterMarkLogo} alt={t("common.watermarkAlt")} width="160" height="180" />
      </Box>
    </Box>
  );
};

export default PurchaseHistoryComponent;