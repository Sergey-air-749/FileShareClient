import { Metadata } from "next";
import ResetPasswordVerification from "./ResetPasswordVerification";

export const metadata: Metadata = {
  title: "Введите новый пароль",
  description: "Введите новый пароль для аккаунта",
};


function ResetPasswordVerificationPage() {

  return (
    <div style={{width: "100%", height: "100%"}}>
      <ResetPasswordVerification/>
    </div>
  );
}

export default ResetPasswordVerificationPage