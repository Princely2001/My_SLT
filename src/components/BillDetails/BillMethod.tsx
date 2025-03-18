import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import registerSmartBill from "../../services/billMethod/registerSmartBill";
import useStore from "../../services/useAppStore"; // Import the Zustand store

interface BillMethodProps {
  selectedTab: string;
}

const BillMethod: React.FC<BillMethodProps> = ({ selectedTab }) => {
  // Access Zustand store values
  const { billMethodDataBundle, selectedTelephone, selectedAccountNo } = useStore();

  // State for response messages and dialog visibility
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  // Get stored email from localStorage
  const storedEmail = localStorage.getItem("username");

  // Log state values for debugging
  useEffect(() => {
    if (billMethodDataBundle) {
      console.log("billMethodDataBundle changed:", billMethodDataBundle);
      console.log("Possible bill mode list:", billMethodDataBundle.possiblebillmodelist);
      console.log("Bill Method Data Bundle eContact:", billMethodDataBundle?.email);
    }
    console.log("Selected Telephone:", selectedTelephone);
    console.log("Selected Account No:", selectedAccountNo);
  }, [billMethodDataBundle, selectedTelephone, selectedAccountNo]);

  // Function to handle smart bill registration
  const handleSmartBillRegistration = async (method: any) => {
    try {
      const tpNo = selectedTelephone;
      const accountNo = selectedAccountNo;
      const econtact = billMethodDataBundle?.email || "";
      const billCode = method.bill_code;

      const response = await registerSmartBill(tpNo, accountNo, econtact, billCode);

      // Extract response message
      const responseMessage =
        response?.dataBundle?.errorShow || // Message inside nested `dataBundle.errorShow`
        response?.errorShow || // Top-level `errorShow`
        "An unexpected error occurred. Please try again later.";

      setResponseMessage(responseMessage); // Set the message for display
      setDialogOpen(true); // Open the dialog box
    } catch (error) {
      console.error("Registration error:", error);
      setResponseMessage("An unexpected error occurred. Please try again later.");
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // Render no privilege message if bill_code is "24"
  if (billMethodDataBundle?.bill_code === "24") {
    return (
      <Box p={1} textAlign="center" sx={{ mt: 4 }}>
        <Box
          sx={{
            color: "#0056A2",
            backgroundColor: "#E3F2FD",
            padding: 2,
            borderRadius: 2,
            maxWidth: 400,
            margin: "0 auto",
            marginTop: 10,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            No privilege
          </Typography>
          <Typography variant="body1">
            You do not have permission to change the bill method
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box p={1} textAlign="center">
      {billMethodDataBundle?.bill_code === "" ? (
        <Box sx={{ mt: 4, color: "#FF0000", fontWeight: "bold" }}>
          <Typography variant="h6">No privilege</Typography>
          <Typography variant="body1">
            You do not have permission to change the bill method
          </Typography>
        </Box>
      ) : (
        selectedTab === "Bill Methods" && (
          <Box
            sx={{
              color: "#FFFFFF",
              px: 2,
              borderRadius: "8px",
              textAlign: "left",
              width: "100%",
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{ width: "95%", padding: 1 }}
            >
              {/* Current Bill Method Section */}
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "#0056A2",
                  maxWidth: "1000px",
                  color: "#FFFFFF",
                  borderRadius: 2,
                  padding: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    Current Bill Method
                  </Typography>
                  <Typography variant="body1">
                    {billMethodDataBundle?.bill_code_desc || "N/A"} : {storedEmail || "N/A"}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    color: "#ffffff",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  <Typography variant="body2">Edit</Typography>
                </Button>
              </Box>

              {/* Other Methods Section */}
              <Box sx={{ width: "100%", mt: 3, textAlign: "left" }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    mt: -2,
                    mb: 1,
                    color: "#0056A2",
                  }}
                >
                  Other Methods
                </Typography>

                {/* Map through possible bill methods and display */}
                {billMethodDataBundle.possiblebillmodelist?.map(
                  (
                    method: { bill_code_desc: string; bill_code: string },
                    index: React.Key | null | undefined
                  ) => (
                    <Box
                      key={index}
                      sx={{
                        backgroundColor: "#E0F7FA",
                        borderRadius: 2,
                        padding: 2,
                        mb: 1,
                        width: "98%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Box sx={{ width: "100%" }}>
                          <Typography variant="body1" fontWeight="bold" color="#0056A2">
                            {method.bill_code_desc}
                          </Typography>
                          <Typography variant="body1" color="#0056A2">
                            Get your bill via {method.bill_code_desc}
                          </Typography>
                          <FormControlLabel
                            control={<Checkbox color="primary" />}
                            label={
                              <Typography variant="body2">
                                <Box
                                  component="span"
                                  sx={{
                                    color: "#0056A2",
                                    padding: "4px 8px",
                                    borderRadius: "4px",
                                  }}
                                >
                                  I agree to the general terms and conditions
                                </Box>
                              </Typography>
                            }
                          />
                        </Box>
                        <Typography variant="body2">
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "#E0F7FA",
                              color: "#0056A2",
                              border: "2px solid #0056A2",
                              fontWeight: "bold",
                              borderRadius: "8px",
                              "&:hover": {
                                backgroundColor: "#f0f0f0",
                              },
                            }}
                            onClick={() => handleSmartBillRegistration(method)}
                          >
                            Submit
                          </Button>
                        </Typography>
                      </Box>
                    </Box>
                  )
                )}
              </Box>
            </Box>
          </Box>
        )
      )}
      {/* Dialog for displaying response messages */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>
          <DialogContentText>{responseMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BillMethod;
