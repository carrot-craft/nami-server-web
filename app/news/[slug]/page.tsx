import { getAllMarkdownFiles, getMarkdownContent } from "@/lib/markdown";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const news = getAllMarkdownFiles("news");
    return news.map((item: any) => ({
        slug: item.slug,
    }));
}

export async function generateMetadata({ params }: any) {
    const { slug } = await params;
    const data = await getMarkdownContent("news", `${slug}.md`);
    return {
        title: `${data?.title || "お知らせ"} - Nami Server`,
    };
}

export default async function NewsArticlePage({ params }: any) {
    const { slug } = await params;
    const data = await getMarkdownContent("news", `${slug}.md`);

    if (!data) return notFound();

    return (
        <div className="min-h-screen px-4 py-20">
            <div className="mx-auto max-w-3xl">
                <Link
                    href="/news"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                    <ArrowLeft className="h-4 w-4" />
                    お知らせ一覧に戻る
                </Link>

                <article className="overflow-hidden rounded-3xl border border-border bg-card backdrop-blur-md">
                    <div className="p-8 sm:p-12">
                        <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {data.date}
                            </span>
                        </div>
                        <h1 className="mb-8 text-3xl font-bold text-foreground sm:text-4xl">
                            {data.title}
                        </h1>

                        <div
                            className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-a:text-primary hover:prose-a:underline prose-img:rounded-xl"
                            dangerouslySetInnerHTML={{ __html: data.contentHtml || "" }}
                        />
                    </div>
                </article>
            </div>
        </div>
    );
}
