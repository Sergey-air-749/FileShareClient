import { Metadata } from "next";
import DeleteAccount from "./DeleteAccount";

export const metadata: Metadata = {
  title: "Удалить аккаунт",
};


function DeleteAccountPage() {

  return (
    <div style={{width: "100%", height: "100%"}}>
      <DeleteAccount/>
    </div>
  );
}

export default DeleteAccountPage