import BooksView from "@/components/booksView";
import { fetchAllShelves } from "@/lib/goodreads";

export const revalidate = 3600;

export default async function Home() {
  const userId = process.env.GOODREADS_USER_ID;

  if (!userId) {
    throw new Error("Missing GOODREADS_USER_ID in environment variables");
  }
  const data = await fetchAllShelves(userId);
  return <BooksView data={data} />;
}