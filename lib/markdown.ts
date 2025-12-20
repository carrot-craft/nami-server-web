import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

const contentDirectory = path.join(process.cwd(), "_content");

export interface MarkdownData {
    slug: string;
    contentHtml: string;
    title?: string;
    description?: string;
    [key: string]: any;
}

export async function getMarkdownContent(subDir: string, fileName: string): Promise<MarkdownData | null> {
    const fullPath = path.join(contentDirectory, subDir, fileName);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(remarkGfm)
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        slug: fileName.replace(/\.md$/, ""),
        contentHtml,
        ...matterResult.data,
    };
}

export function getAllMarkdownFiles(subDir: string) {
    const dirPath = path.join(contentDirectory, subDir);
    if (!fs.existsSync(dirPath)) return [];

    const fileNames = fs.readdirSync(dirPath);
    return fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => {
            const fullPath = path.join(dirPath, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const matterResult = matter(fileContents);

            return {
                slug: fileName.replace(/\.md$/, ""),
                ...matterResult.data,
            };
        })
        .sort((a: any, b: any) => (a.order || 99) - (b.order || 99));
}
