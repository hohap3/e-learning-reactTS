import React from "react";
import notFoundImg from "assets/notFound/dd.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="bg-[#ccd3db] py-2">
      <div className="container mx-auto px-8">
        <div className="flex flex-col items-center">
          <h2 className="text-[3rem] mt-[60px] mx-auto w-[589px] text-center text-[#555c66] font-semibold">
            Oops!
          </h2>

          <div className="mb-8">
            <img
              src={notFoundImg}
              alt="Not Found Image"
              className="h-[468px]"
            />
          </div>

          <div className="text-center text-[#555c66] mb-6">
            <h2 className="text-[4.5rem] font-semibold">PAGE NOT FOUND</h2>
            <p className="text-[1.25rem] font-semibold">
              Sorry, the page you're looking for doesn't exist. If you think
              somethin is broken, report a problem.
            </p>
          </div>

          <div className="flex gap-2">
            <Link to="/">
              <Button variant="contained">Go home</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outlined">Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
