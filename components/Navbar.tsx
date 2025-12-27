"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SearchModal } from "@/components/SearchModal";

const navItems = [
    { name: "ホーム", href: "/" },
    { name: "お知らせ", href: "/news" },
    { name: "ルール", href: "/rule" },
    { name: "Wiki", href: "/wiki" },
    { name: "マップ", href: "http://nami-kokka-map.mcsv.win:3377/", external: true },
    { name: "ステータス", href: "/status" },
    { name: "Discord", href: "https://discord.com/invite/cd33Z4ts3U", external: true },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Initial keyboard shortcut listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-primary/20 transition-all group-hover:ring-primary/50">
                            <Image
                                src="/images/nami icon.png"
                                alt="Nami"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                            Nami Server
                        </span>
                    </Link>

                    {/* Desktop Interface */}
                    <div className="hidden md:flex md:items-center md:gap-4">
                        {navItems.map((item) => (
                            item.external ? (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                                >
                                    {item.name}
                                </a>
                            ) : (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                                >
                                    {item.name}
                                </Link>
                            )
                        ))}
                        <div className="flex items-center gap-2 ml-2 border-l border-border pl-4">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="flex items-center gap-2 rounded-md bg-secondary/50 px-3 py-1.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
                            >
                                <Search className="h-4 w-4" />
                                <span className="hidden lg:inline">検索...</span>
                                <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                    <span className="text-xs">Ctrl</span>K
                                </kbd>
                            </button>
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile Menu Button & Theme Toggle */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                            <Search className="h-6 w-6" />
                        </button>
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Nav */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-b border-border bg-background/95 backdrop-blur-xl"
                        >
                            <div className="space-y-1 px-4 py-4">
                                {navItems.map((item) => (
                                    item.external ? (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => setIsOpen(false)}
                                            className="block rounded-lg px-4 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                        >
                                            {item.name}
                                        </a>
                                    ) : (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block rounded-lg px-4 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}
