import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TableContainer, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import downloadBill from "../../services/billMethod/downloadBill";
import getEbillStatus from "../../services/billMethod/getEbillStatus"; // Import the API function
import resendBill from "../../services/billMethod/resendEBill"; // Import the resendBill function
import useStore from "../../services/useAppStore";
import { BillHistoryProps } from "../../types/types";

interface DownloadResponse {
  success?: boolean;
  errorShow?: string;
}

const OutstandingBills: React.FC<BillHistoryProps> = ({
  selectedTab,
  billingHistory,
  telephoneNo,
  accountNo,
}) => {
  const billHistoryList = billingHistory?.listofBillHistoryDetail || [];
  const billMethodDataBundle = useStore((state) => state.billMethodDataBundle);
  const [openDialog, setOpenDialog] = useState(false); // State to handle the dialog visibility
  const [dialogMessage, setDialogMessage] = useState(""); // State to hold the dialog message
  const [emailAddress, setEmailAddress] = useState<string>(""); // State to store the email address

  useEffect(() => {
    // Log the billMethodDataBundle whenever it's updated
    console.log("Bill Method Data Bundle:", billMethodDataBundle);
    console.log("Bill Method Data Bundle eContact:", billMethodDataBundle?.email);

    // Call the API when the component mounts
    if (accountNo && telephoneNo) {
      getEbillStatus(accountNo, telephoneNo).then((response) => {
        if (response) {
          console.log("eBill Status API Response:", response); // Log the API response
          
          // If the response contains the emailaddress, store it and log
          if (response.emailaddress) {
            setEmailAddress(response.emailaddress); // Store email address in state
            console.log("Email Address from eBill Status API:", response.emailaddress); // Log the email address
          }
        }
      });
    }
  }, [accountNo, telephoneNo, billMethodDataBundle]); // Dependency array to trigger the API call when these values change

  console.log("Billing History Prop:", billingHistory);
  console.log("Bill History List:", billHistoryList);
  console.log("Telephone No:", telephoneNo);
  console.log("Account No:", accountNo);

  // Log the billViewMonth from each bill in the billHistoryList
  billHistoryList.forEach((bill, index) => {
    console.log(`Bill View Month for Bill ${index + 1}:`, bill.billViewMonth);
  });

  // Handle eBill download
  const handleDownloadBill = async (eBillEmail: string, accountNo: string, tpNo: string, ebillMonth: string) => {
    try {
      // Try to download the bill
      const response: DownloadResponse = await downloadBill(eBillEmail, accountNo, tpNo, ebillMonth);
      
      // Check if the response indicates success or failure
      if (response.success) {
        setDialogMessage("eBill downloaded successfully!"); // Success message
      } else {
        setDialogMessage("Sorry, you have no bill received for the given month."); // Failure message
      }
    } catch (error) {
      setDialogMessage("An error occurred while downloading the eBill."); // Error message
    }
    
    setOpenDialog(true); // Open the dialog after setting the message
  };

  // Handle the "Email Now" button click to trigger the resendBill API
  const handleEmailNow = async (eBillEmail: string, accountNo: string, tpNo: string, ebillMonth: string) => {
    try {
      // Check if the email address exists before proceeding
      if (!eBillEmail || eBillEmail.trim() === "") {
        setDialogMessage("No email address available.");
        setOpenDialog(true);
        return;
      }
      
      // Call the resendBill API with the email address
      const response = await resendBill(eBillEmail, accountNo, ebillMonth, tpNo);
      
      if (response && response.success) {
        setDialogMessage("Email sent successfully!");
      } else {
        setDialogMessage("Sorry, Your bill is still processing.");
      }
    } catch (error) {
      setDialogMessage("An error occurred while sending the email.");
    }
    
    setOpenDialog(true); // Open the dialog after setting the message
  };
  
  // Close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Log the email address from the store as eBillEmail
  const eBillEmail = billMethodDataBundle?.email;
  console.log("eBillEmail:", eBillEmail);

  return (
    <Box textAlign="center">
      {selectedTab === "Bill History" && Array.isArray(billHistoryList) && billHistoryList.length > 0 ? (
        <Box
          color="#FFFFFF"
          p={1}
          borderRadius="8px"
          textAlign="left"
          width="96%"
          sx={{
            maxHeight: '400px',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 2,
              overflow: "auto",
              maxHeight: 335,
              paddingRight: 0.5,
              overflowX: 'hidden',
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
            {billHistoryList.map((bill, index) => (
              <Box
                key={index}
                bgcolor="#E0F7FA"
                p={2}
                mb={2}
                borderRadius="8px"
                display="flex"
                justifyContent="space-between"
                width="98%"
                alignItems="center"
                sx={{
                  marginTop: index === 3 ? 2 : 1,
                }}
              >
                <Box>
                  <Typography variant="body1" color="#0056A2" fontWeight="bold">
                    Outstanding: {bill.outstanding}
                  </Typography>
                  <Typography variant="body1" color="#0056A2">
                    Bill Value: {bill.billValue} for {bill.billMonth}
                  </Typography>
                  <Typography variant="body1" color="#0056A2">
                    Payments: {bill.payments}
                  </Typography>
                </Box>
                {billMethodDataBundle?.bill_code === "02" &&  (
                  <Button
                    variant="contained"
                    color="info"
                    sx={{
                      backgroundColor: "#E0F7FA",
                      color: "#0056A2",
                      fontWeight: "bold",
                      border: "2px solid #0056A2",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                    }}
                    onClick={() => handleEmailNow(eBillEmail, accountNo, telephoneNo, String(bill.billViewMonth))} // Ensure it's a string
                  >
                    <Typography variant="body2">
                      Email Now
                    </Typography>
                  </Button>
                )}
                {billMethodDataBundle?.bill_code === "23" && (
                  <Button
                    variant="contained"
                    color="info"
                    sx={{
                      backgroundColor: "#E0F7FA",
                      color: "#0056A2",
                      fontWeight: "bold",
                      border: "2px solid #0056A2",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                    }}
                    onClick={() => handleDownloadBill(eBillEmail, accountNo, telephoneNo, String(bill.billViewMonth))} // Ensure it's a string
                  >
                    <Typography variant="body2">
                      Download eBill
                    </Typography>
                  </Button>
                )}
              </Box>
            ))}
          </TableContainer>
        </Box>
      ) : (
        <Typography variant="body1" color="red">
          {/* Add any message for empty billing history */}
        </Typography>
      )}

      {/* Dialog Box */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="textSecondary">
            {dialogMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OutstandingBills;
