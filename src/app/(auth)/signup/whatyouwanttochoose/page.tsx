import { Metadata } from "next";
import WhatYouWantToСhoose from "./WhatYouWantToСhoose";

export const metadata: Metadata = {
  title: "Что вы хотите выбрать чтобы закончить регистрацию?",
};


function WhatYouWantToСhoosePage() {

  return (
    <div style={{width: "100%", height: "100%"}}>
      <WhatYouWantToСhoose/>
    </div>
  );
}

export default WhatYouWantToСhoosePage