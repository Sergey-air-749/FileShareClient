import { Metadata } from "next";
import Gendfile from "./GendFile";

export const metadata: Metadata = {
  title: "Получить файл",
  description: "Здесь вы можете получить отправленые вам файлы",
};


function GetfilePage() {

  return (
    <div>
      <Gendfile/>
    </div>
  );
}

export default GetfilePage