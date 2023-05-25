import React from "react";
import notFound from "assets/notFound/dd.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Props {
  previousPage: string;
}

function NotFoundGroup({ previousPage }: Props) {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        onClick={() => navigate(`${previousPage}`)}
        variant="outlined"
        className="flex gap-4"
      >
        <ArrowBackIcon />
        Go back to list group page
      </Button>
      <div className="my-6">
        <img src={notFound} />

        <div className="my-4">
          <div className="text-center text-[#555c66] mb-6">
            <h2 className="text-[4.5rem] font-semibold">GROUP NOT FOUND</h2>
            <p className="text-[1.25rem] font-semibold">
              Sorry, the group you're looking for doesn't exist
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundGroup;
