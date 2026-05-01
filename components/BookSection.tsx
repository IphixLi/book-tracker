import { Book } from "@/types/book";
import BookCard from "./BookCard";

export default function BookSection({
  title,
  books,
  view,
}: {
  title: string;
  books: Book[];
  view: "grid" | "list";
}) {
  function getYear(date: string) {
    const d = new Date(date);
    return isNaN(d.getTime()) ? "Unknown" : d.getFullYear().toString();
  }

  function groupBooks() {
    const grouped: Record<string, Book[]> = {};

    books.forEach((b) => {
      const year = getYear(b.pubDate);
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(b);
    });

    return grouped;
  }

  const grouped = groupBooks();

  const renderBooks = (booksToRender: Book[]) => {
    if (view === "grid") {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {booksToRender.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      );
    }

    // LIST VIEW
    return (
      <div className="flex flex-col gap-3">
        {booksToRender.map((b) => (
          <div
            key={b.id}
            className="flex items-center gap-4 border p-3 rounded"
          >
            <img
              src={b.image}
              alt={b.title}
              className="w-16 h-24 object-contain bg-gray-100 rounded"
            />
            <div>
              <p className="font-medium">{b.title}</p>
              <p className="text-sm text-gray-500">{b.author}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-6">{title}</h2>

      {Object.entries(grouped)
        .sort(([a], [b]) => {
          if (a === "Unknown") return 1;
          if (b === "Unknown") return -1;
          return Number(b) - Number(a); // newest first
        })
        .map(([year, books]) => (
          <div key={year} className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-lg font-semibold">{year}</h3>

              <span className="text-gray-400">|</span>

              <span className="text-sm text-gray-500">
                {books.length} {books.length === 1 ? "book" : "books"}
              </span>
            </div>

            {renderBooks(books)}
          </div>
        ))}
    </div>
  );
}
