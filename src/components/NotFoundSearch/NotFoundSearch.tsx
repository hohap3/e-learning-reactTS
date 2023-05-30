import React from "react";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

interface Props {
  message: string;
}

function NotFoundSearch({ message }: Props) {
  return (
    <div className="flex items-center gap-4 bg-blue-500 p-2 text-white rounded">
      <PriorityHighIcon />
      <h2 className="text-[1.06rem] font-medium">{message}</h2>
    </div>
  );
}

export default NotFoundSearch;
