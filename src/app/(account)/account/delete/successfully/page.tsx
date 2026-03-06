import { Metadata } from "next";
import DeleteAccountSuccessfully from "./DeleteAccountSuccessfully";

export const metadata: Metadata = {
  title: "Аккаунт успешна удалён",
};


function DeleteAccountSuccessfullyPage() {

  return (
    <div style={{width: "100%", height: "100%"}}>
      <DeleteAccountSuccessfully/>
    </div>
  );
}

export default DeleteAccountSuccessfullyPage