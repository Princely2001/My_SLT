import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchLTEPrepaidMainPackages } from "../../services/prepaid/fetchLTEPrepaidMainPackages";
import { BroadbandPrepaidMainPackageDetails } from "../../types/types";

import addBroadbandPackage from "../../services/prepaid/addBroadbandPackage";
import useStore from "../../services/useAppStore";

const BroadbandPrepaidMainPackages: React.FC = () => {
  const { selectedTelephone,setLeftMenuItem,setPackageListUpdate } = useStore();
  const [packages, setPackages] = useState<
    BroadbandPrepaidMainPackageDetails[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPackageIndex, setSelectedPackageIndex] = useState<
    number | null
  >(null);
  useEffect(() => {
    const getPackages = async () => {
      setLoading(true);
      try {
        const data = await fetchLTEPrepaidMainPackages();
        setPackages(data);
      } catch (error) {
        setError(`Failed to fetch packages: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    getPackages();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  const handleButtonPress = (index: number) => {
    setSelectedPackageIndex(index);
    setDialogOpen(true);
  };

  const handleConfirmActivation = async () => {
    const telephoneNo = selectedTelephone.toString();
    const offeringId = packages[selectedPackageIndex!]?.OFFERING_ID;
    const pkgName = packages[selectedPackageIndex!]?.OFFERING_NAME;
    await addBroadbandPackage(telephoneNo,offeringId,pkgName);
    setPackageListUpdate();
    setDialogOpen(false);
    setLeftMenuItem("Main Packages");
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        color: "#FFFFFF1A",
        padding: 2,
        borderRadius: "10px",
        height: "100%",
        boxShadow: "0px 3px 3px #0000004A",
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", gap: 1.5, width: "100%", padding: 2 }}>
        {packages.map((pkg, index) => (
          <Card
            key={index}
            sx={{
              minWidth: "30%",
              backgroundColor: "#3076B2",
              color: "white",
              borderRadius: "10px",
              transition: "transform 0.3s, margin 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#0056A2",
                transform: "scale(1.15)",
                marginLeft: 2,
                marginRight: 2,
              },
            }}
          >
            <CardContent>
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
                    fontSize: "1.10em",
                    fontWeight: "bold",
                  }}
                >
                  {pkg.MYSLT_PKG_NAME}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    width: "75%",
                    border: "3px solid white",
                    padding: 2,
                    borderRadius: 3,
                    "&:hover": {
                      backgroundColor: "#3076B2",
                    },
                  }}
                >
                  <Typography
                    sx={{ margin: "auto", fontSize: "2em" }}
                    variant="body2"
                  >
                    <strong>{pkg.DATA_VOLUME_GB}GB</strong>
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, fontSize: "1.5em", fontWeight: "bold" }}
                >
                  Rs.{pkg.PRICE_LKR_WITH_TAX} /-
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>
                  (With Tax)
                </Typography>
                <Typography variant="body2">
                  Validity Period <strong>{pkg.VALIDITY} Days</strong>
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "white",
                    color: "#50B748",
                    borderRadius: "10px",
                    width: "55%",
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: "#4FD745",
                      color: "white",
                    },
                  }}
                  fullWidth
                  onClick={() => handleButtonPress(index)}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      textTransform: "capitalize",
                      fontSize: "1.25em",
                      fontWeight: "600",
                    }}
                  >
                    Activate
                  </Typography>
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          mt: 2,
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            backgroundColor: "#70A0CB",
            borderRadius: "50%",
            transition: "width 0.3s, background-color 0.3s",
            mb: 1,
          }}
        />
        <Box
          sx={{
            width: 60,
            height: 8,
            backgroundColor: "#0056A2",
            borderRadius: 4,
            transition: "width 0.3s, background-color 0.3s",
            mb: 1,
          }}
        />
        <Box
          sx={{
            width: 8,
            height: 8,
            backgroundColor: "#70A0CB",
            borderRadius: "50%",
            transition: "width 0.3s, background-color 0.3s",
            mb: 1,
          }}
        />
      </Box>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
        <Typography variant="body2" fontSize={23}>
          Confirm Activation
          </Typography>
          </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Typography variant="body2">
            Are you sure you want to activate the{" "}
            {selectedPackageIndex !== null &&
              packages[selectedPackageIndex]?.MYSLT_PKG_NAME}{" "}
            package?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: "#0056A2",
              color: "#FFFFFF",
            }}
            onClick={() => setDialogOpen(false)}
          >
            <Typography variant="body2">Cancel</Typography>
          </Button>
          <Button
            sx={{
              backgroundColor: "#0056A2",
              color: "#FFFFFF",
            }}
            onClick={handleConfirmActivation}
            autoFocus
          >
            <Typography variant="body2">Confirm</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BroadbandPrepaidMainPackages;
