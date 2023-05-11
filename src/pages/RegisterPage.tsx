import authHOC from "HOC/authHOC";
import RegisterComp from "components/RegisterComp/RegisterComp";

function RegisterPage() {
  const AuthHOCComp = authHOC(RegisterComp);

  return (
    <section className="mt-[74px]">
      <AuthHOCComp />
    </section>
  );
}

export default RegisterPage;
