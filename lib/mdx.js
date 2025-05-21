import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import ExampleComponent from "@/app/components/ExampleComponent";

const rootDirectory = path.join(process.cwd(), "content");

export async function getArticleBySlug(slug) {
  const filePath = path.join(rootDirectory, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const { content: rawContent, data } = matter(fileContent);

  const { content } = await compileMDX({
    source: rawContent,
    options: { mdxOptions: {} },
    components: {
      ExampleComponent,
    },
  });

  return {
    content,
    frontMatter: {
      ...data,
      slug,
      tags: data.tags || [],
    },
  };
}

export async function getAllArticles() {
  const files = fs.readdirSync(rootDirectory);

  const articles = files
    .filter((file) => path.extname(file) === ".mdx")
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(rootDirectory, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      return {
        slug,
        ...data,
      };
    })
    .sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date) - new Date(a.date);
      }
      return 0;
    });

  return articles;
}
