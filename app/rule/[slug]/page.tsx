import { getAllMarkdownFiles, getMarkdownContent } from "@/lib/markdown";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const articles = getAllMarkdownFiles("rules");
    return articles.map((article: any) => ({
        slug: article.slug,
    }));
}

export async function generateMetadata({ params }: any) {
    const { slug } = await params;
    const data = await getMarkdownContent("rules", `${slug}.md`);
    return {
        title: `${data?.title || "Rule"} - Nami Server`,
    };
}

export default async function RuleArticlePage({ params }: any) {
    const { slug } = await params;
    const data = await getMarkdownContent("rules", `${slug}.md`);

    if (!data) {
        notFound();
    }

    return (
        <div className="min-h-screen px-4 py-20">
            <div className="mx-auto max-w-4xl">
                <Link
                    href="/rule"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                    <ArrowLeft className="h-4 w-4" />
                    ルール一覧に戻る
                </Link>

                <article className="rounded-3xl border border-border bg-card p-8 backdrop-blur-sm sm:p-12">
                    <header className="mb-8 border-b border-border pb-8">
                        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                            {data.title}
                        </h1>
                        {data.description && (
                            <p className="mt-2 text-lg text-muted-foreground">
                                {data.description}
                            </p>
                        )}
                    </header>

                    <div
                        className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:text-foreground prose-a:text-primary hover:prose-a:underline prose-code:rounded prose-code:bg-white/10 prose-code:px-1 prose-pre:bg-black/50"
                        dangerouslySetInnerHTML={{ __html: data.contentHtml }}
                    />
                </article>
            </div>
        </div>
    );
}
