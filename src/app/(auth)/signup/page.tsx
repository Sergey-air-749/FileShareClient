import { Metadata } from "next";
import Signup from "./Signup";

export const metadata: Metadata = {
  title: "Регистрация",
  description: "Регистрация новый аккаунт или продолжить как гость",
};


function SignupPage() {

  return (
    <div style={{width: "100%", height: "100%"}}>
      <Signup/>
    </div>
  );
}

export default SignupPage