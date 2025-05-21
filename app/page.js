import Link from "next/link";
import { getAllArticles } from "@/lib/mdx";

export default async function ArticleList() {
  const articles = await getAllArticles();
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Articles</h1>
      <div>
        {articles.map((article) => (
          <div
            key={article.slug}
            style={{ marginBottom: "30px" }}>
            <h2>
              <Link href={`/article/${article.slug}`}>{article.title}</Link>
            </h2>
            <p>{article.date}</p>
            <p>{article.description}</p>
            <div>
              {article.tags &&
                article.tags.map((tag, index) => <div key={index}>{tag}</div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
