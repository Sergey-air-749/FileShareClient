import { Metadata } from "next";
import SignupEmail from "./SignupEmail";

export const metadata: Metadata = {
  title: "Подтвердить почту",
  description: "Подтвердить почту чтобы закончить регистрацию",
};


function SignupEmailPage() {

  return (
    <div style={{width: "100%", height: "100%"}}>
      <SignupEmail/>
    </div>
  );
}

export default SignupEmailPage