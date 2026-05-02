import BooksView from "@/components/booksView";
import { fetchAllShelves } from "@/lib/goodreads";

export default async function Home() {
  const userId = "180395039";
  const data = await fetchAllShelves(userId);
  return <BooksView data={data} />;
}