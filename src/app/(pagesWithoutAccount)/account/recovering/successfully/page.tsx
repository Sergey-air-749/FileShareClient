import { Metadata } from "next";
import RecoverSuccessfully from "./RecoverSuccessfully";

export const metadata: Metadata = {
  title: "Доступ к аккаунту васстоновлен",
};


function RecoverSuccessfullyPage() {

  return (
    <div style={{width: "100%", height: "100%"}}>
      <RecoverSuccessfully/>
    </div>
  );
}

export default RecoverSuccessfullyPage