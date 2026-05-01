import { Book } from "@/types/book";

export default function BookCard({ book }: { book: Book }) {
  return (
    <a
      href={book.link}
      target="_blank"
      className="block border rounded-xl p-4 hover:shadow"
    >
      <div className="w-full aspect-[2/3] bg-gray-100 flex items-center justify-center rounded mb-2">
        <img
          src={book.image}
          alt={book.title}
          className="max-h-full max-w-full object-cover shadow-sm"
        />
      </div>

      <h3 className="font-semibold">{book.title}</h3>
      <p className="text-sm text-gray-500">{book.author}</p>
    </a>
  );
}
