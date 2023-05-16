import React from "react";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import SearchIcon from "@mui/icons-material/Search";

function AdminHeader() {
  return (
    <header className="py-5 px-8 h-[80px] bg-[#2b2b4b]">
      <div className="flex items-center h-full gap-10">
        <button className="text-white">
          <ViewWeekIcon />
        </button>

        <div className="flex-1 rounded-lg bg-[#000033] py-2 px-6">
          <div className="flex items-center gap-8">
            <input className="bg-transparent focus:outline-none text-white flex-1 h-full" />

            <button className="text-white">
              <SearchIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
