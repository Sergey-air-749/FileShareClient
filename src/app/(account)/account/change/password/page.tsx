import { Metadata } from "next";
import ChangePassword from "./ChangePassword";

export const metadata: Metadata = {
  title: "Удалить аккаунт",
};


function ChangePasswordPage() {

  return (
    <div style={{width: "100%", height: "100%"}}>
      <ChangePassword/>
    </div>
  );
}

export default ChangePasswordPage