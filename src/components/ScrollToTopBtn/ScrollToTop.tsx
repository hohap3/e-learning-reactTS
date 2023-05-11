import { Button } from "@mui/material";
import React, { useEffect, useRef } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function ScrollToTop() {
  function handleScrollToTop() {
    document.documentElement.scrollTop = 0;
  }

  return (
    <button
      onClick={handleScrollToTop}
      className="fixed bottom-[1rem] right-[1rem] text-white p-[10px] bg-[#06bbcc] z-[99] rounded-md"
    >
      <KeyboardArrowUpIcon />
    </button>
  );
}

export default ScrollToTop;
