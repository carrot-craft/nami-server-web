"use client";

import Link from "next/link";
import { Book } from "lucide-react";
import { useState, useMemo } from "react";
import { MarkdownData } from "@/lib/markdown";

interface WikiArticleListProps {
    articles: MarkdownData[];
}

export function WikiArticleList({ articles }: WikiArticleListProps) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        articles.forEach((article) => {
            article.tags?.forEach((tag) => tags.add(tag));
        });
        return Array.from(tags).sort();
    }, [articles]);

    const filteredArticles = useMemo(() => {
        if (!selectedTag) return articles;
        return articles.filter((article) => article.tags?.includes(selectedTag));
    }, [articles, selectedTag]);

    return (
        <div>
            {/* Tag Filter */}
            <div className="mb-8 flex flex-wrap justify-center gap-2">
                <button
                    onClick={() => setSelectedTag(null)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${selectedTag === null
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                >
                    すべて
                </button>
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${selectedTag === tag
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Articles Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article) => (
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
                                {article.tags.map((tag) => (
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

            {filteredArticles.length === 0 && (
                <div className="mt-8 text-center text-muted-foreground">
                    該当する記事が見つかりませんでした。
                </div>
            )}
        </div>
    );
}
