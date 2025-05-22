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
      <div className="container mx-auto pt-10">
        <h1 className="text-4xl">{frontMatter.title}</h1>
        <p>{frontMatter.date}</p>
        <div>
          {frontMatter.tags.map((tag, index) => (
            <p key={index}>{tag}</p>
          ))}
        </div>
        <div className="pt-20">{content}</div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata({ params }) {
  const slug = await params.slug;
  const { content, frontMatter } = await getArticleBySlug(slug);
  return {
    title: frontMatter.title + " | Shento's Blog",
    description: frontMatter.description,
  };
}
