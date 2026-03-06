import { Metadata } from "next";
import ChangeName from "./ChangeName";

export const metadata: Metadata = {
  title: "Изменить имя пользователя",
  description: "Вход в аккаунт или продолжить как гость",
};


function ChangeNamePage() {

  return (
    <div style={{width: "100%", height: "100%"}}>
      <ChangeName/>
    </div>
  );
}

export default ChangeNamePage