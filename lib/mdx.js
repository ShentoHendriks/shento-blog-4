import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import ExampleComponent from "@/app/components/ExampleComponent";
import CodeBlock from "@/app/components/CodeBlock";
import TabsContainer from "@/app/components/TabsContainer";

const rootDirectory = path.join(process.cwd(), "content");

// Clean rehype-pretty-code configuration
const rehypePrettyCodeOptions = {
  theme: "one-light",
  keepBackground: true,
  filterMetaString: (string) => string,
  onVisitHighlightedLine(node) {
    node.properties.className = [
      ...(node.properties.className || []),
      "highlighted",
    ];
  },
};

export async function getArticleBySlug(slug) {
  const filePath = path.join(rootDirectory, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content: rawContent, data } = matter(fileContent);

  const { content } = await compileMDX({
    source: rawContent,
    options: {
      mdxOptions: {
        rehypePlugins: [
          // Process filename extraction before syntax highlighting
          [rehypePrettyCode, rehypePrettyCodeOptions],
        ],
      },
    },
    components: {
      ExampleComponent,
      pre: CodeBlock,
      TabsContainer,
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
