"use client";

import { useState } from "react";
import BookSection from "./BookSection";
import { Book } from "@/types/book";

type Props = {
  data: {
    read: Book[];
    currentlyReading: Book[];
  };
};

export default function ClientView({ data }: Props) {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Goodreads Tracker
        </h1>

        <p className="mt-2 text-base md:text-lg text-gray-500">
          Because I don’t want to see Goodreads ads ¯\_(ツ)_/¯
        </p>
      </div>
      <div className="flex gap-3 mb-6 items-center">
        <button
          onClick={() => setView("grid")}
          className={`px-3 py-1 rounded ${
            view === "grid" ? "border" : "bg-black text-white"
          }`}
        >
          Grid
        </button>

        <button
          onClick={() => setView("list")}
          className={`px-3 py-1 rounded ${
            view === "list" ? "border" : "bg-black text-white"
          }`}
        >
          List
        </button>
      </div>

      <BookSection
        title="Currently Reading"
        books={data.currentlyReading}
        view={view}
      />
      <BookSection title="Read" books={data.read} view={view} />
    </main>
  );
}
