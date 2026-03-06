import { Metadata } from "next";
import ResetPassword from "./ResetPassword";

export const metadata: Metadata = {
  title: "Сбросить пароль",
  description: "Сбросить пароль то аккаунта",
};


function ResetPasswordPage() {

  return (
    <div style={{width: "100%", height: "100%"}}>
      <ResetPassword/>
    </div>
  );
}

export default ResetPasswordPage