import { Metadata } from "next";
import ChangeEmail from "./ChangeEmail";

export const metadata: Metadata = {
  title: "Изменить адрес эл. почты",
};


function ChangeEmailPage() {

  return (
    <div style={{width: "100%", height: "100%"}}>
      <ChangeEmail/>
    </div>
  );
}

export default ChangeEmailPage