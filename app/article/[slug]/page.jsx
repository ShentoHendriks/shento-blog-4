import { getArticleBySlug, getAllArticles } from "@/lib/mdx";
import { notFound } from "next/navigation";

// Generate static params for all articles
export async function generateStaticParams() {
  const articles = await getAllArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate metadata for each article
export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const { frontMatter } = await getArticleBySlug(slug);

    return {
      title: frontMatter.title,
      description: frontMatter.description,
    };
  } catch (error) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found",
    };
  }
}

export default async function Article({ params }) {
  const { slug } = params;

  try {
    const { content, frontMatter } = await getArticleBySlug(slug);

    return (
      <article className="container mx-auto px-4 py-8 prose lg:prose-xl">
        <div className="mb-8">
          <h1>{frontMatter.title}</h1>
          <p className="text-gray-600">{frontMatter.date}</p>
          <div className="flex gap-2 my-4">
            {frontMatter.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 px-2 py-1 rounded text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div>{content}</div>
      </article>
    );
  } catch (error) {
    notFound();
  }
}
