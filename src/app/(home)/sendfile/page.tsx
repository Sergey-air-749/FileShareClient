import { Metadata } from "next";
import Sendfile from "./SendFile";

export const metadata: Metadata = {
  title: "Отправить файл",
  description: "Здесь вы можете отправить файл на другое устройства или другому пользователю",
};


function SendfilePage() {

  return (
    <div>
      <Sendfile/>
    </div>
  );
}

export default SendfilePage