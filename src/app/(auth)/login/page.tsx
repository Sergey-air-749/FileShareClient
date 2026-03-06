import { Metadata } from "next";
import Login from "./Login";

export const metadata: Metadata = {
  title: "Вход",
  description: "Вход в аккаунт или продолжить как гость",
};


function LoginPage() {

  return (
    <div style={{width: "100%", height: "100%"}}>
      <Login/>
    </div>
  );
}

export default LoginPage