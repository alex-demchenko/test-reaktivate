import BooksTabs from "../books-tabs/BooksTabs";
import Header from "../header/Header";

export default function App() {
  return (
    <>
      <Header />

      <main className="mx-8">
        <BooksTabs />
      </main>
    </>
  );
}

