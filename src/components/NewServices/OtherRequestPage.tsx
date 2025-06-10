import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import createSalesLead, { SalesLeadCreationResponse } from "../../services/postpaid/createSalesLead"; // Import the API function

// Define props for the component
interface OtherRequestPageProps {
  telephoneNo: string;
  selectedItem: string;
}

const OtherRequestPage: React.FC<OtherRequestPageProps> = ({ telephoneNo, selectedItem }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [nic, setNic] = useState<string>("");
  const [contactTelNo, setContactTelNo] = useState<string>("");

  // State for managing dialog and error message
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const BroadbandIcon = "https://mysltimages.s3.eu-north-1.amazonaws.com/Broadband.png";
  const PeoTVIcon = "https://mysltimages.s3.eu-north-1.amazonaws.com/PeoTV.png";
  const VoiceIcon = "https://mysltimages.s3.eu-north-1.amazonaws.com/Voice.png";

  console.log("Telephone Number in OtherRequestPage:", telephoneNo);
  console.log("Selected Item in OtherRequestPage:", selectedItem); 

  const handleClick = (item: string) => {
    const updatedItems = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item];

    setSelectedItems(updatedItems);
    console.log("Selected Items after click:", updatedItems); 
  };

  const buttonItems = [
    { label: "PeoTV", image: PeoTVIcon },
    { label: "Voice", image: VoiceIcon },
    { label: "Broadband", image: BroadbandIcon },
  ];

  const commonFontStyle = {
    color: "#00256A",
    fontSize: 16,
    fontWeight: "bold",
  };

  const TextFieldStyle = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#057DE81A",
      height: 40,
      width: { sm: "60vw", md: "60vw", lg: "27vw" },
      borderRadius: "10px",
      "& fieldset": {
        border: "none",
      },
    },
    input: {
      color: "#00256A",
    },
  };

  const ButtonStyle = (isSelected: boolean) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: isSelected ? 27.5 : 25,
    height: isSelected ? 27.5 : 25,
    padding: 1.5,
    border: isSelected ? "4px solid #0056A2" : "3px solid #0056A2",
    borderRadius: "100%",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: isSelected ? "scale(1)" : "scale(1.1)",
    },
  });

  const handleSubmit = async () => {
    console.log("Form Submitted. Selected Items:", selectedItems); 
    console.log("Telephone Number on Submit:", telephoneNo); 
    console.log("Service Type Selected:", selectedItem);

    // Assuming you have firstName, lastName, nic, contactTelNo, and selectedItems populated
   

    const response: SalesLeadCreationResponse | null = await createSalesLead(
      telephoneNo,
      firstName,
      lastName,
      nic,
      contactTelNo,
      selectedItems,  // Array of selected items
      selectedItem
    );

    if (response) {
      if (response.isSuccess) {
        console.log("New Connection Created Successfully:", response.dataBundle);
        setIsSuccess(true);
        setMessage("New Connection created successfully!");
      } else {
        console.error("Error creating sales lead:", response.errorMessege);
        setIsSuccess(false);
        setMessage(response.errorMessege || "An unexpected error occurred.");
      }
    } else {
      console.error("API call failed.");
      setIsSuccess(false);
      setMessage("An unexpected error occurred.");
    }

    // Open the dialog box to show the message
    setIsDialogOpen(true);
  };

  // Handle the dialog close action
  const handleDialogClose = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  return (
    <Box
      sx={{
        paddingX: 5,
        display: "Flex",
        flexDirection: "Column",
        alignItems: "center",
      }}
    >
      <Typography variant="body2" sx={{ ...commonFontStyle, mb: 2 }}>
        {/*Telephone Number: {telephoneNo}*/}
      </Typography>
      <Grid container spacing={1}>
        {/* Use Grid item with proper breakpoint props */}
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 1 }}>
            <Typography variant="body2" sx={{ ...commonFontStyle }}>
              First Name
            </Typography>
            <TextField
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{ ...TextFieldStyle }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 1 }}>
            <Typography variant="body2" sx={{ ...commonFontStyle }}>
              Last Name
            </Typography>
            <TextField
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={{ ...TextFieldStyle }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 1 }}>
            <Typography variant="body2" sx={{ ...commonFontStyle }}>
              NIC
            </Typography>
            <TextField
              variant="outlined"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              sx={{ ...TextFieldStyle }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 1 }}>
            <Typography variant="body2" sx={{ ...commonFontStyle }}>
              Mobile Number
            </Typography>
            <TextField
              variant="outlined"
              value={contactTelNo}
              onChange={(e) => setContactTelNo(e.target.value)}
              sx={{ ...TextFieldStyle }}
            />
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          padding: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: "5vw",
        }}
      >
        {buttonItems.map((item) => {
          const isSelected = selectedItems.includes(item.label);
          return (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50px",
                height: "80px",
              }}
              key={item.label}
            >
              <Button
                onClick={() => handleClick(item.label)}
                sx={{ display: "flex", flexDirection: "column", gap: 1 }}
              >
                <Box sx={ButtonStyle(isSelected)}>
                  <img src={item.image} alt={item.label} />
                </Box>
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ ...commonFontStyle, fontSize: 12 }}
                >
                  {item.label}
                </Typography>
              </Button>
            </Box>
          );
        })}
      </Box>

      <Typography
        variant="body2"
        sx={{ mt: 2, ...commonFontStyle, color: "#0056A2" }}
      >
       {/* Selected Items: {selectedItems.length > 0 ? selectedItems.join(", ") : "None"}*/}
      </Typography>

      <Button
        sx={{
          mt: 2,
          paddingX: 4,
          border: "2px solid #00256A",
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: "#057DE81A",
            transition: "all 0.3s ease",
          },
        }}
        onClick={handleSubmit}
      >
        <Typography
          variant="body2"
          sx={{ ...commonFontStyle, fontSize: 16, textTransform: "capitalize" }}
        >
          Submit
        </Typography>
      </Button>

      {/* Error Message Dialog */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle sx={{ textAlign: "center", color: isSuccess ? "green" : "red" }}>
          {isSuccess ? "Success" : "Error"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#0056A2",
              fontWeight: "bold", // Increase the weight to bold
              fontSize: "20px", // Adjust the font size as needed
            }}
          >
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OtherRequestPage;
