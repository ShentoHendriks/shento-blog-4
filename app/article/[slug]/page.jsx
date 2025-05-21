import { getArticleBySlug, getAllArticles } from "@/lib/mdx";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function Article({ params }) {
  const { slug } = params;

  try {
    const { content, frontMatter } = await getArticleBySlug(slug);

    return (
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        <h1>{frontMatter.title}</h1>
        <p>{frontMatter.date}</p>
        <p>
          {frontMatter.tags.map((tag, index) => (
            <p key={index}>{tag}</p>
          ))}
        </p>
        <hr />
        <div>{content}</div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
