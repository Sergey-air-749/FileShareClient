import { Metadata } from "next";
import DeleteAccountVerification from "./DeleteAccountVerification";

export const metadata: Metadata = {
  title: "Введите пароль чтобы продолжить",
};


function DeleteAccountVerificationPage() {

  return (
    <div style={{width: "100%", height: "100%"}}>
      <DeleteAccountVerification/>
    </div>
  );
}

export default DeleteAccountVerificationPage