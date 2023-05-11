import userApi from "api/userAPI";
import FormSignUp from "components/form/FormSignUp/FormSignUp";
import { UserSignUp } from "../../models";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RegisterComp() {
  const navigate = useNavigate();

  async function handleRegisterForm(formValues: UserSignUp) {
    const res = await userApi.signUp(formValues);

    toast.success("Register account successfully!");
    navigate("/signIn");
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="text-[#06bbcc] p-2 border border-2 rounded-full border-[#06bbcc] mb-4">
          <PersonAddAltIcon />
        </div>
        <h2 className="text-center text-xl mb-4">Sign Up</h2>
      </div>

      <FormSignUp onSubmit={handleRegisterForm} />

      <div className="text-right mt-8">
        <Link to="/signIn">Already have an account? Sign In here</Link>
      </div>
    </div>
  );
}

export default RegisterComp;
