import { Metadata } from "next";
import Account from "./Account";

export const metadata: Metadata = {
  title: "Аккаунт",
  description: "Управление Аккаунтам",
};


function LoginPage() {

  return (
    <div>
      <Account/>
    </div>
  );
}

export default LoginPage