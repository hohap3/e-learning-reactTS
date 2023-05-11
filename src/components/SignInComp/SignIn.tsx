import VpnKeyIcon from "@mui/icons-material/VpnKey";

import FormSignIn from "components/form/FormSignIn/FormSignIn";
import { Link } from "react-router-dom";

function SignInComp() {
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="text-[#06bbcc] p-2 border border-2 rounded-full border-[#06bbcc] mb-4">
          <VpnKeyIcon />
        </div>
        <h2 className="text-center text-xl mb-4">Sign In</h2>
      </div>

      <FormSignIn />

      <div className="text-right mt-8">
        <Link to="/register">Don't have an account? Register here</Link>
      </div>
    </div>
  );
}

export default SignInComp;
