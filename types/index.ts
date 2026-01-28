export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  logo?: string;
  category: string;
  region?: 'Global' | 'China';
  tags: string[];
}

export type Category = 'All' | 'Global' | 'China' | 'Chat' | 'Image' | 'Video' | 'Coding' | 'Productivity' | 'Audio' | 'Writing' | 'Design' | 'Presentation' | 'Audio/Video';
