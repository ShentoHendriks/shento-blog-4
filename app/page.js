import Link from "next/link";
import { getAllArticles } from "@/lib/mdx";
import Image from "next/image";

export default async function ArticleList() {
  const articles = await getAllArticles();
  return (
    <div className="container mx-auto pt-10">
      <h1 className="text-4xl tracking-tight mb-10">Latest articles</h1>
      <div className="grid grid-cols-3 gap-4">
        {articles.map((article) => (
          <article
            key={article.slug}
            style={{ marginBottom: "30px" }}
            className="flex flex-col gap-5">
            <div className="w-auto relative h-[200px] rounded-md overflow-hidden">
              <Link href={`/article/${article.slug}`}>
                <Image
                  src={
                    article.image
                      ? article.image
                      : "https://placehold.co/600x400"
                  }
                  alt="Image of article"
                  className="object-cover"
                  fill={true}
                />
              </Link>
            </div>
            <div className="flex gap-2">
              {article.tags &&
                article.tags.map((tag, index) => (
                  <div
                    className={`capitalize px-2 py-0.5 rounded-full ${
                      tag == "react" &&
                      "text-blue-500 bg-blue-50 border border-blue-400"
                    }`}
                    key={index}>
                    {tag}
                  </div>
                ))}
            </div>
            <h2 className="text-xl font-medium">
              <Link href={`/article/${article.slug}`}>{article.title}</Link>
            </h2>
            <p className="text-gray-400">{article.date}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
