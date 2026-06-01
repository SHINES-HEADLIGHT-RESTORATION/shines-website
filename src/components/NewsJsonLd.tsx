import {
  formatNewsDate,
  newsArticleBodyText,
  newsArticlePath,
  type NewsArticle,
} from "@/lib/news";
import { site } from "@/lib/site";

type NewsJsonLdProps = {
  article: NewsArticle;
};

export function NewsJsonLd({ article }: NewsJsonLdProps) {
  const url = `${site.url}${newsArticlePath(article)}`;
  const body = newsArticleBodyText(article);

  const newsArticle = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.dek,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    articleBody: body,
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: url,
    url,
    keywords: article.tags.join(", "),
    ...(article.image && {
      image: [`${site.url}${article.image.src}`],
    }),
    about: {
      "@type": "Service",
      name: "Headlight restoration",
      provider: {
        "@type": "AutoRepair",
        name: site.name,
        url: site.url,
      },
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "News",
        item: `${site.url}/news`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: article.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}

export function NewsIndexJsonLd() {
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${site.name} News`,
    description:
      "Guides, updates, and service news about professional headlight restoration in Belgium and Europe.",
    url: `${site.url}/news`,
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }}
    />
  );
}
