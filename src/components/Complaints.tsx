import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import getFaultList from "../services/getFaultList"; // Import the API service
import { Fault } from "../types/types"; // Import the Fault type
import useStore from "../services/useAppStore";


const Complaints = () => {
  const { selectedTelephone,setLeftMenuItem } = useStore(); // Get the telephone number from the store
  const [faults, setFaults] = useState<Fault[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaultList = async () => {
      console.log("Telephone Number passed:", selectedTelephone); // Log the telephone number here

      setLoading(true);
      setError(null);

      try {
        const response = await getFaultList(selectedTelephone);
        console.log("API Response in Complaints Component:", response); // Log the response here for further debugging
        setLoading(false);

        if (response?.isSuccess) {
          // Check if asset is null or empty
          if (response.dataBundle.asset && response.dataBundle.asset.length > 0) {
            const faultsList = response.dataBundle.asset.flatMap((asset) => {
              if (asset.fault) {
                // If there are faults, map them along with the serviceName
                return asset.fault.map((fault: any) => ({
                  ...fault,
                  serviceName: asset.serviceName, // Add serviceName to each fault entry
                }));
              }
              return []; // Return empty array if no faults for the asset
            });
            setFaults(faultsList); // Set the faults in state
          } else {
            // If no asset or no faults, display "No Faults Found."
            setError("No Faults Found.");
          }
        } else {
          setError(response?.errorMessage || "Failed to fetch fault list.");
        }
      } catch (err) { 
        setError("Failed to fetch fault list. Please try again.");
        console.error("Error fetching fault list:", err);
        setLoading(false);
      }
    };

    fetchFaultList();
  }, [selectedTelephone]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        color: "#0056A2",
        padding: 1,
        borderRadius: "10px",
        boxShadow: "0px 3px 3px #0000004A",
        height: "60vh",
      }}
    >
      <Typography
        variant="body2"
        align="center"
        sx={{ fontSize: 24, fontWeight: "bold", marginBottom: "32px" }}
      >
        ── Complaints ──
      </Typography>

      {loading ? (
        <Typography variant="body2">Loading...</Typography>
      ) : error ? (
        // Display the error message with different styling
        <Typography variant="body2" sx={{ marginBottom: "16px", fontWeight: "bold", color: "#0056A2" }}>
          {error}
        </Typography>
      ) : faults.length === 0 ? (
        // Display "No Faults Found" with blue color
        <Typography
          variant="body2"
          sx={{
            color: "#0056A2", // This will ensure it's displayed in blue color
            fontWeight: "bold",
            fontSize: "16px",
            marginTop: "16px",
          }}
        >
          No Faults Found
        </Typography>
      ) : (
        faults.map((fault) => (
          <Card
            key={fault.faultRef}
            sx={{
              backgroundColor: "#3076B2",
              color: "#FFFFFF",
              borderRadius: "8px",
              padding: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
              width: "80%",
            }}
          >
            <CardContent sx={{ flex: 1, padding: "8px" }}>
              {/* Display the service name */}
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", marginBottom: "8px" }}
              >
                Service Name: {fault.serviceName}
              </Typography>

              {/* Display the fault reference */}
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", marginBottom: "8px" }}
              >
                Fault Ref: {fault.faultRef}
              </Typography>
              
              {/* Display the status of the fault */}
              <Typography variant="body2" sx={{ marginBottom: "8px" }}>
                Status: {fault.status}
              </Typography>

              {/* Display the date of the fault */}
              <Typography variant="body2" sx={{ fontSize: "12px" }}>
                Date: {fault.date}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#0056A2",
          color: "#FFFFFF",
          fontWeight: "bold",
          padding: "8px 30px",
          "&:hover": {
            backgroundColor: "#003D75",
            justifyContent: "flex-end",
          },
        }}
        onClick={() => {
          setLeftMenuItem("SUBMIT YOUR COMPLAINT"); // Update the left menu item in the zustand store
        }}
      >
        <Typography variant="body2" sx={{fontSize:"20px"}}>SUBMIT YOUR COMPLAINT</Typography>
      </Button>
    </Box>
  );
};

export default Complaints;
