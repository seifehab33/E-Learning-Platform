import SignHello from "./SignHello";
import LoginPage from "./LoginPage";

function SignIn() {
  return (
    <div className="flex flex-col lg:flex-row ">
      <div className="lg:w-1/2 hidden lg:block">
        <SignHello />
      </div>
      <div className="w-full lg:w-1/2 ">
        <LoginPage />
      </div>
    </div>
  );
}

export default SignIn;
