import { CircularProgress } from "@mui/material";
import React from "react";

function LoadingCircle() {
  return (
    <div className="flex items-center justify-center">
      <CircularProgress />
    </div>
  );
}

export default LoadingCircle;
