import { Metadata } from "next";
import SendFileStory from "./sendFileStory";

export const metadata: Metadata = {
  title: "История отправленых файлов",
  description: "Здесь вы можете посмотреть все файлы которые вы отправели, время, кому вы отправель и с какого устройства",
};


function sendFileStoryPage() {

  return (
    <div>
      <SendFileStory/>
    </div>
  );
}

export default sendFileStoryPage