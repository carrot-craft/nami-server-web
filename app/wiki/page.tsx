import { getAllMarkdownFiles } from "@/lib/markdown";
import { WikiArticleList } from "@/components/WikiArticleList";

export const metadata = {
    title: "Wiki - Nami Server",
    description: "サーバーのドキュメントとガイド",
};

export default function WikiPage() {
    const articles = getAllMarkdownFiles("wiki");

    return (
        <div className="min-h-screen px-4 py-20">
            <div className="mx-auto max-w-5xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
                        Nami Wiki
                    </h1>
                    <p className="mt-4 text-muted-foreground">
                        Minecraft Namiサーバーの公式サイト
                    </p>
                </div>

                <WikiArticleList articles={articles} />
            </div>
        </div>
    );
}
