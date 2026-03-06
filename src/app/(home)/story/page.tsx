import { Metadata } from "next";
import Story from "./Story";

export const metadata: Metadata = {
  title: "История файл",
  description: "История отправленых и полученых файлов",
};


function StoryPage() {

  return (
    <div>
      <Story/>
    </div>
  );
  
}

export default StoryPage