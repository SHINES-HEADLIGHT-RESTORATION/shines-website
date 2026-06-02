export type NewsCategory = "UPDATE" | "GUIDE" | "PRESS RELEASE" | "LOCAL" | "QUICK TIP";

export type NewsBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type NewsArticle = {
  slug: string;
  publishedAt: string;
  category: NewsCategory;
  title: string;
  dek: string;
  image?: {
    src: string;
    alt: string;
  };
  thumbnailClass: string;
  blocks: NewsBlock[];
  tags: string[];
  featured?: boolean;
};
