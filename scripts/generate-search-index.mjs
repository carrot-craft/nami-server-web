import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), '_content');
const publicDirectory = path.join(process.cwd(), 'public');

function getFiles(dir, category) {
    const dirPath = path.join(contentDirectory, dir);
    if (!fs.existsSync(dirPath)) return [];

    const fileNames = fs.readdirSync(dirPath);
    return fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            const fullPath = path.join(dirPath, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const matterResult = matter(fileContents);

            return {
                title: matterResult.data.title || fileName.replace(/\.md$/, ''),
                description: matterResult.data.description || '',
                category,
                slug: fileName.replace(/\.md$/, ''),
                path: `/${category}/${fileName.replace(/\.md$/, '')}`,
                content: matterResult.content,
            };
        });
}

try {
    const rules = getFiles('rules', 'rule');
    const wiki = getFiles('wiki', 'wiki');
    const news = getFiles('news', 'news');

    const staticPages = [
        {
            title: "ホーム (Home)",
            description: "Nami Serverのトップページ。サーバーの概要、特徴、ミニゲームや国家サーバーの紹介。",
            category: "page",
            slug: "home",
            path: "/",
            content: "なみサーバーとは？ クロスプレイ対応サーバー。TNTRUN, DUEL, INFINITY PARKOUR, 国家サーバー, 建国, 町づくり"
        },
        {
            title: "サーバーステータス (Status)",
            description: "Nami Serverの現在の稼働状況を確認できます。",
            category: "page",
            slug: "status",
            path: "/status",
            content: "サーバーステータス リアルタイム稼働状況 接続人数 ping"
        },
        {
            title: "Discord コミュニティ",
            description: "Nami Serverの公式Discordコミュニティ。",
            category: "page",
            slug: "discord",
            path: "/discord",
            content: "コミュニティに参加しよう 交流 サポート 最新情報"
        },
        {
            title: "国家サーバーマップ (Map)",
            description: "国家サーバーのWebマップ。",
            category: "page",
            slug: "map",
            path: "http://nami-kokka-map.mcsv.win:3347/",
            content: "Dynmap Bluemap Webマップ 地図 領土"
        }
    ];

    const allContent = [...rules, ...wiki, ...news, ...staticPages];

    // Ensure public directory exists
    if (!fs.existsSync(publicDirectory)) {
        fs.mkdirSync(publicDirectory);
    }

    fs.writeFileSync(
        path.join(publicDirectory, 'search.json'),
        JSON.stringify(allContent)
    );

    console.log('Search index generated successfully.');
} catch (error) {
    console.error('Failed to generate search index:', error);
    process.exit(1);
}
