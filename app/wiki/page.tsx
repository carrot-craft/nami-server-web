import { getAllMarkdownFiles } from "@/lib/markdown";
import Link from "next/link";
import { Book } from "lucide-react";

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

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article: any) => (
                        <Link
                            key={article.slug}
                            href={`/wiki/${article.slug}`}
                            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:scale-[1.02] hover:bg-secondary/50"
                        >
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                                <Book className="h-6 w-6" />
                            </div>
                            <h2 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                                {article.title}
                            </h2>
                            {article.description && (
                                <p className="text-sm text-muted-foreground">
                                    {article.description}
                                </p>
                            )}
                            {article.tags && article.tags.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {article.tags.map((tag: string) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
