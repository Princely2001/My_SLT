import { Box, Button, Typography } from "@mui/material";

const DisableDetailedReport = () => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        justifyContent: "start",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 2,
        borderRadius: "10px",
        height: "400px",
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
        ── Unsubscribe for detailed reports ──
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          gap: 4,
        }}
      >
        <Typography variant="body2" sx={{ fontSize: "20px", color: "#0056A2" }}>
          Unsubscribe to usage report
        </Typography>
        <Button
          sx={{
            backgroundColor: "#0056A2",
            color: "#FFFFFF",
            width: "100px",
            borderRadius: "10px",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <Typography variant="body2" sx={{textTransform:"capitalize"}}>Submit</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default DisableDetailedReport;
