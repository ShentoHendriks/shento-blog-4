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
      <div className="container mx-auto px-4 pt-10">
        <h1 className="text-4xl">{frontMatter.title}</h1>
        <p className="my-2 text-gray-500">{frontMatter.date}</p>
        <div className="my-2 flex gap-2">
          {frontMatter.tags &&
            frontMatter.tags.map((tag, index) => (
              <div
                className={`rounded-full px-2 py-0.5 capitalize ${
                  tag == "react" &&
                  "border border-blue-400 bg-blue-50 text-blue-500"
                }`}
                key={index}
              >
                {tag}
              </div>
            ))}
        </div>
        <div className="blog-article pt-10">{content}</div>
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
