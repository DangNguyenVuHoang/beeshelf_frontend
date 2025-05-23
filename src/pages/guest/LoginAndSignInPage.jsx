import { useEffect, useState } from "react";
import SignIn from "../../component/guest/SignIn";
import SignUp from "../../component/guest/SignUp";
import ForgotPassword from "../../component/guest/ForgotPassword";
import SignInAndLoginGif from "../../assets/img/loginAndSignup.gif";
import { useLocation } from "react-router-dom";
import { LanguageSelector } from "../../component/shared/ChangeLanguages";

export default function LoginAndSignInPage({ toAction }) {
  const location = useLocation();
  let data = location.state;
  const [action, setAction] = useState(toAction);
  return (
    <div className="flex h-screen w-screen justify-between items-center  bg-gray-100">
      <img
        src={SignInAndLoginGif}
        className="h-full w-[60%] object-fill object-center"
      />
      <div className="relative w-[40%] h-full overflow-hidden bg-white">
        <LanguageSelector className={"absolute top-4 left-2 z-10"} />
        <div
          className={`p-20 absolute w-full h-full transform transition-transform duration-500 flex flex-col items-center justify-center ${
            action === "Forgotpassword"
              ? "translate-y-0"
              : action === "Login"
              ? "-translate-y-full"
              : "-translate-y-[200%]"
          }`}
        >
          <ForgotPassword setAction={setAction} />
        </div>
        <div
          className={`p-20 absolute w-full h-full transform transition-transform duration-500 flex flex-col items-center justify-center ${
            action === "Login"
              ? "translate-y-0"
              : action === "Forgotpassword"
              ? "translate-y-full"
              : "-translate-y-full"
          }`}
        >
          <SignIn setAction={setAction} action={action} />
        </div>
        <div
          className={`p-20 absolute w-full h-full transform transition-transform duration-500 flex flex-col items-center justify-center ${
            action === "SignUp"
              ? "translate-y-0"
              : action === "Login"
              ? "translate-y-full"
              : "translate-y-[200%]"
          }`}
        >
          <SignUp setAction={setAction} baseForm={data} />
        </div>
      </div>
    </div>
  );
}
