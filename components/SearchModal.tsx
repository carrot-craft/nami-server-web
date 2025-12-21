"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2, FileText, Book, Newspaper } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchResult {
    title: string;
    description: string;
    category: string;
    slug: string;
    path: string;
    content: string;
}

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [allContent, setAllContent] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Fetch data when modal opens
    useEffect(() => {
        if (isOpen && allContent.length === 0) {
            setIsLoading(true);
            fetch("/api/search")
                .then((res) => res.json())
                .then((data) => {
                    setAllContent(data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to load search data", err);
                    setIsLoading(false);
                });
        }
    }, [isOpen, allContent.length]);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        } else {
            setQuery("");
            setResults([]);
        }
    }, [isOpen]);

    // Filter results
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const searchTerm = query.toLowerCase();
        const filtered = allContent.filter((item) => {
            return (
                item.title.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm) ||
                item.content.toLowerCase().includes(searchTerm)
            );
        }).slice(0, 5); // Limit to 5 results for now

        setResults(filtered);
    }, [query, allContent]);

    // Handle ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    const handleSelect = (path: string) => {
        router.push(path);
        onClose();
    };

    const getIcon = (category: string) => {
        switch (category) {
            case "wiki": return <Book className="h-4 w-4" />;
            case "news": return <Newspaper className="h-4 w-4" />;
            case "rule": return <FileText className="h-4 w-4" />;
            default: return <FileText className="h-4 w-4" />;
        }
    };

    const getCategoryLabel = (category: string) => {
        switch (category) {
            case "wiki": return "Wiki";
            case "news": return "News";
            case "rule": return "Rule";
            default: return category;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 p-4 sm:p-0"
                    >
                        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                            {/* Input Header */}
                            <div className="flex items-center border-b border-border px-4 py-4">
                                <Search className="mr-3 h-5 w-5 text-muted-foreground" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="検索..."
                                    className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                {isLoading ? (
                                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                                ) : (
                                    <button
                                        onClick={onClose}
                                        className="rounded-full p-1 hover:bg-secondary"
                                    >
                                        <X className="h-5 w-5 text-muted-foreground" />
                                    </button>
                                )}
                            </div>

                            {/* Results */}
                            <div className="max-h-[60vh] overflow-y-auto p-2">
                                {query.trim() === "" ? (
                                    <div className="py-12 text-center text-sm text-muted-foreground">
                                        キーワードを入力して検索
                                    </div>
                                ) : results.length > 0 ? (
                                    <div className="space-y-1">
                                        {results.map((result) => (
                                            <button
                                                key={result.path}
                                                onClick={() => handleSelect(result.path)}
                                                className="flex w-full flex-col items-start rounded-xl p-3 text-left transition-colors hover:bg-secondary"
                                            >
                                                <div className="flex w-full items-center justify-between">
                                                    <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                                        {getIcon(result.category)}
                                                        {result.title}
                                                    </span>
                                                    <span className="rounded-full bg-secondary-foreground/10 px-2 py-0.5 text-xs font-medium text-muted-foreground">
                                                        {getCategoryLabel(result.category)}
                                                    </span>
                                                </div>
                                                {result.description && (
                                                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                                                        {result.description}
                                                    </p>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center text-sm text-muted-foreground">
                                        見つかりませんでした: "{query}"
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-border bg-muted/50 px-4 py-2 text-xs text-muted-foreground flex justify-between">
                                <span>検索結果は最大5件表示されます</span>
                                <span className="hidden sm:inline">ESCで閉じる</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
