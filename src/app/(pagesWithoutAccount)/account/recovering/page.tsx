import { Metadata } from "next";
import Recovering from "./Recovering";

export const metadata: Metadata = {
  title: "Восстановить аккаунт",
  description: "Восстановить аккаунт если вы его удалили",
};


function RecoveringPage() {

  return (
    <div style={{width: "100%", height: "100%"}}>
      <Recovering/>
    </div>
  );
}

export default RecoveringPage