import SignHello from "../SignIn/SignHello";
import SignUpPage from "./SignUpPage";

function SignUp() {
  return (
    <div className="flex flex-col lg:flex-row ">
      <div className="lg:w-1/2 hidden lg:block">
        <SignHello />
      </div>
      <div className="w-full lg:w-1/2 ">
        <SignUpPage />
      </div>
    </div>
  );
}

export default SignUp;
