import { Metadata } from "next";
import ChangeEmailVerification from "./ChangeEmailVerification";

export const metadata: Metadata = {
  title: "Подтвердите почту для её изменения",
};


function ChangeEmailVerificationPage() {

  return (
    <div style={{width: "100%", height: "100%"}}>
      <ChangeEmailVerification/>
    </div>
  );
}

export default ChangeEmailVerificationPage