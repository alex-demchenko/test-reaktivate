import { observer } from "mobx-react-lite";
import { headerModel } from "./Header.model";

function Header() {
  return (
    <header className="px-8 sticky top-0 h-[40px] bg-green-100">
      Your books: {headerModel.userBooks}
    </header>
  );
}

export default observer(Header);
