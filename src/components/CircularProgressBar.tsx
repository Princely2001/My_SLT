import { PieChart } from "@mui/x-charts/PieChart";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

interface CircularProgressBarProps {
  percentage: number;
}

const CircularProgressBar = ({ percentage }: CircularProgressBarProps) => {
  // Validate and clamp the percentage value to be between 0 and 100
  const value = Math.max(0, Math.min(100, percentage));

  // Calculate the remaining value for the pie chart
  const remainingValue = 100 - value;

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
      }}
    >
      <PieChart
        series={[
          {
            data: [
              { id: 0, value, label: "Used", color: "#40E734" }, // Used color for the filled portion
              {
                id: 1,
                value: remainingValue,
                label: "Remaining",
                color: "#EAEAEA",
              }, // Remaining portion color
            ],
            innerRadius: 100, // Inner radius for the donut chart effect
            outerRadius: 125, // Outer radius of the pie chart
            paddingAngle: 0, // Angle between slices
            cornerRadius: 0, // Corner radius for slices
            startAngle: -0.5, // Start angle for the chart
            endAngle: 360, // End angle for the chart
            cx: 150, // Center X position
            cy: 120, // Center Y position
          },
        ]}
        width={300} // Set the desired width
        height={250} // Set the desired height
        slotProps={{
          legend: { hidden: true },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          top: "50%",
          left: "50%",
          transform: "translate(-45%, -50%)",
          color: "#0056A2",
        }}
      >
        <Typography sx={{fontSize:40,fontWeight:900}} variant="body2">{`${value}%`}</Typography>
        <Typography sx={{fontSize:16,fontWeight:900}} variant="body2">REMAINING</Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressBar;
