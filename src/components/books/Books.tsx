import { observer } from "mobx-react-lite";
import { booksCtrl } from "./Books.ctrl";
import { booksModel } from "./Books.model";

function Books() {
  return (
    <div>
      {booksModel.books.map((book) => (
        <div key={book.id}>
          {book.author}: {book.name}
        </div>
      ))}

      <button
        className="px-4 py-2 border border-black hover:cursor-pointe"
        onClick={() => booksCtrl.addRandomBook()}
      >
        Add
      </button>
    </div>
  );
}

export default observer(Books);

