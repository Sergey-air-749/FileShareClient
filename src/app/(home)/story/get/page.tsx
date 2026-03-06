import { Metadata } from "next";
import GetFileStory from "./getFileStory";

export const metadata: Metadata = {
  title: "История принятых файлов",
  description: "Здесь вы можете посмотреть все файлы которые скачали, время, от кого и с какого устройства",
};


function getFileStoryPage() {

  return (
    <div>
      <GetFileStory/>
    </div>
  );
}

export default getFileStoryPage