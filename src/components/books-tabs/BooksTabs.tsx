import { observer } from "mobx-react-lite";
import Books from "../books/Books";
import { booksTabsCtrl } from "./BooksTabs.ctrl";
import { useEffect } from "react";
import { booksTabsModel, Tabs } from "./BooksTabs.model";

function BooksTabs() {
  useEffect(() => {
    booksTabsCtrl.setTab(Tabs.All);
  }, []);

  return (
    <>
      <div className="flex gap-4">
        <button
          className="px-4 py-2 border border-black disabled:bg-gray-300 hover:cursor-pointer hover:disabled:cursor-default"
          onClick={() => booksTabsCtrl.setTab(Tabs.All)}
          disabled={booksTabsModel.tab === Tabs.All}
        >
          All
        </button>
        <button
          className="px-4 py-2 border border-black disabled:bg-gray-300 hover:cursor-pointer hover:disabled:cursor-default"
          onClick={() => booksTabsCtrl.setTab(Tabs.Private)}
          disabled={booksTabsModel.tab === Tabs.Private}
        >
          Private
        </button>
      </div>

      <Books />
    </>
  );
}

export default observer(BooksTabs);
