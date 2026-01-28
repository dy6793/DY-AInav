"use client";

import { Tool } from "@/types";
import { ExternalLink, HelpCircle, MessageSquare, Image as ImageIcon, Video, Code, PenTool, FileText, Layout, MessageCircle, Zap, Activity, Smile, Star, Mic, Presentation, Copy, Headphones } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// Map string icon names to Lucide components
const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  Image: ImageIcon, // 'Image' is reserved by next/image
  Video,
  Code,
  PenTool,
  FileText,
  Layout,
  MessageCircle,
  Zap,
  Activity,
  Smile,
  Star,
  Mic,
  Presentation,
  Copy,
  Headphones
};

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const IconComponent = IconMap[tool.icon] || HelpCircle;

  return (
    <Link
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full p-6 bg-card border border-border rounded-xl hover:shadow-lg hover:border-primary/50 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-secondary">
          {tool.logo && !imageError ? (
            <Image
              src={tool.logo}
              alt={`${tool.name} logo`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 48px, 48px"
              onError={() => {
                console.warn(`Failed to load logo for ${tool.name}:`, tool.logo);
                setImageError(true);
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary group-hover:bg-primary/10 transition-colors">
              <IconComponent className="w-6 h-6 text-primary" />
            </div>
          )}
        </div>
        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
        {tool.name}
      </h3>
      
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {tool.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
