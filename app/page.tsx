"use client";

import { useState, useMemo } from "react";
import { Tool, Category } from "@/types";
import toolsData from "@/data/tools.json";
import { ToolCard } from "@/components/ToolCard";
import { Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES: Category[] = [
  "All",
  "Global",
  "China",
  "Chat",
  "Image",
  "Video",
  "Coding",
  "Productivity",
  "Writing",
  "Design",
  "Presentation",
  "Audio/Video",
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filteredTools = useMemo(() => {
    // If no search and "All" category, return all tools immediately
    if (!searchQuery && selectedCategory === "All") {
      return toolsData as Tool[];
    }

    const lowerQuery = searchQuery.toLowerCase();

    return (toolsData as Tool[]).filter((tool) => {
      // 1. Check Search Query
      const matchesSearch = !searchQuery || 
        tool.name.toLowerCase().includes(lowerQuery) ||
        tool.description.toLowerCase().includes(lowerQuery);
      
      if (!matchesSearch) return false;

      // 2. Check Category
      if (selectedCategory === "All") return true;
      if (selectedCategory === "Global") return tool.region === "Global";
      if (selectedCategory === "China") return tool.region === "China";
      
      return tool.category === selectedCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleClearFilter = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold">AI Nav</h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">首页</a>
            <a href="#" className="hover:text-primary transition-colors">提交工具</a>
            <a href="#" className="hover:text-primary transition-colors">关于</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            发现最棒的 <span className="text-primary">AI 工具</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            收录全网优质 AI 软件与网站，助你提升效率，激发创意。
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mt-8">
            <label htmlFor="search-input" className="sr-only">搜索 AI 工具</label>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" aria-hidden="true" />
            <input
              id="search-input"
              type="text"
              placeholder="搜索 AI 工具..."
              className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-card shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        {/* Categories */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-2" role="tablist">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                role="tab"
                aria-selected={selectedCategory === category}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Tools Grid */}
        <section aria-label="工具列表">
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">没有找到相关工具...</p>
              <button 
                onClick={handleClearFilter}
                className="mt-4 text-primary hover:underline font-medium"
              >
                清除筛选条件
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
