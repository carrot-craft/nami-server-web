import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "_content");

function getFiles(dir: string, category: string) {
    const dirPath = path.join(contentDirectory, dir);
    if (!fs.existsSync(dirPath)) return [];

    const fileNames = fs.readdirSync(dirPath);
    return fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => {
            const fullPath = path.join(dirPath, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const matterResult = matter(fileContents);

            return {
                title: matterResult.data.title || fileName.replace(/\.md$/, ""),
                description: matterResult.data.description || "",
                category,
                slug: fileName.replace(/\.md$/, ""),
                path: `/${category}/${fileName.replace(/\.md$/, "")}`,
                content: matterResult.content, // Raw markdown content
            };
        });
}

export async function GET() {
    try {
        const rules = getFiles("rules", "rule"); // The URL is /rule (singular)
        const wiki = getFiles("wiki", "wiki");
        const news = getFiles("news", "news");

        const allContent = [...rules, ...wiki, ...news];

        return NextResponse.json(allContent);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch search data" }, { status: 500 });
    }
}
