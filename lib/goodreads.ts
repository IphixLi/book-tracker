import Parser from "rss-parser";
import { Book } from "@/types/book";

const parser = new Parser();

function parseTitle(raw: string) {
  // "Atomic Habits by James Clear"
  const parts = raw.split(" by ");
  return {
    title: parts[0] || raw,
    author: parts[1] || "Unknown",
  };
}

function extractAuthorFromContent(content: string): string | null {
  if (!content) return null;
  const match = content.match(/author:\s*([^<\n]+)/i);
  return match ? match[1].trim() : null;
}

function getLargeImage(url: string | null): string | null {
  if (!url) return null;

  // Replace size marker with larger one
  return url
    .replace(/\._SX\d+_/, "._SX600_")   // width-based
    .replace(/\._SY\d+_/, "._SY600_");  // height-based (fallback)
}

function extractImage(content: string): string | null {
  if (!content) return null;

  const match = content.match(/<img[^>]+src="([^"]+)"/i);
  return match ? match[1] : null;
}

export async function fetchShelf(
  userId: string,
  shelf: string,
): Promise<Book[]> {
  const url = `https://www.goodreads.com/review/list_rss/${userId}?shelf=${shelf}`;

  const feed = await parser.parseURL(url);

  return feed.items.map((item) => {
    const parsed = parseTitle(item.title || "");

    const author =
      extractAuthorFromContent(item.content || "") ||
      item.creator ||
      item["dc:creator"] ||
      parsed.author;

    const image = getLargeImage(extractImage(item.content || "")) || "";
    return {
      id: item.guid || item.link || Math.random().toString(),
      title: parsed.title,
      author: author,
      image: image,
      link: item.link || "",
      pubDate: item.pubDate || "",
      shelf,
    };
  });
}

export async function fetchAllShelves(userId: string) {
  const [read, currentlyReading] = await Promise.all([
    fetchShelf(userId, "read"),
    fetchShelf(userId, "currently-reading"),
  ]);

  return {
    read,
    currentlyReading,
  };
}
