import authHOC from "../HOC/authHOC";
import SignInComp from "components/SignInComp/SignIn";

function SignIn() {
  const AuthHOCComp = authHOC(SignInComp);
  return (
    <section className="mt-[74px]">
      <AuthHOCComp />
    </section>
  );
}

export default SignIn;
