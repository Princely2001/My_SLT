import { useState } from "react";
import "./OrderAnimation.css"; // Import custom CSS styles here
import { Typography } from "@mui/material";

const OrderAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 10000); // Reset animation after 10 seconds
  };

  return (
    <button
      className={`order ${isAnimating ? "animate" : ""}`}
      onClick={handleClick}
    >
      <span className="default">
        <Typography sx={{ fontSize: "20px" }} variant="body2">
          Request Now
        </Typography>
      </span>
      <span className="success">
        <Typography sx={{ fontSize: "18px" }} variant="body2">
          Fiber is on the way
          <svg className="scaled-icon" viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1" />
          </svg>
        </Typography>
      </span>
      <div className="box" />
      <div className="truck">
        <div className="back" />
        <div className="front">
          <div className="window" />
        </div>
        <div className="light top" />
        <div className="light bottom" />
      </div>
      <div className="lines" />
    </button>
  );
};

export default OrderAnimation;
