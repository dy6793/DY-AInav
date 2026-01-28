# AI 工具导航 (AI Nav)

一个现代化的 AI 工具导航网站，帮助用户发现最好的 AI 软件和工具。

## ✨ 特性

- 🎨 **现代化 UI 设计**：基于 Tailwind CSS 和 Shadcn UI 的精美界面
- 🔍 **实时搜索与过滤**：支持按名称、描述、分类和标签快速筛选
- 🖼️ **自动 Logo 获取**：集成 Icon Horse API，自动获取工具官方 Logo
- 📱 **响应式设计**：完美支持移动端和桌面端访问
- ⚡ **高性能**：基于 Next.js 14 App Router 构建，SEO 友好

## 🚀 部署指南

### 前置要求

- Node.js 18.17 或更高版本
- npm 或 yarn

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 `http://localhost:3000` 查看效果。

### 生产环境构建

```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

### 部署到 Vercel (推荐)

本项目已针对 Vercel 优化，推荐使用 Vercel 进行部署：

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 保持默认配置即可
4. 点击 Deploy 即可上线

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **数据**: JSON (Static Data)

## 📁 目录结构

```
ai-nav/
├── app/              # 页面和布局
├── components/       # React 组件
├── data/            # 静态数据 (tools.json)
├── lib/             # 工具函数
├── public/          # 静态资源
├── types/           # TypeScript 类型定义
└── ...配置文件
```

## 📝 维护说明

如需添加新工具，请直接修改 `data/tools.json` 文件，添加新的工具对象即可。
logo 字段推荐使用 `https://icon.horse/icon/域名` 格式。
