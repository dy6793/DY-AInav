# � 网站部署更新指南 (2026版)

本指南提供两种更新网站的方法。推荐优先使用 **方法一 (Git)**，如果服务器内存较小导致构建失败，请切换到 **方法二 (本地构建上传)**。

---

## ✅ 方法一：Git 同步部署 (推荐)
最简单的更新方式，直接在服务器上拉取最新代码并构建。

### 1. 本地提交代码 (在 VS Code 终端)
将您的修改保存并上传到代码仓库：
```powershell
git add .
git commit -m "Update tool list and icons"
git push
```

### 2. 服务器更新 (连接服务器后执行)
登录服务器：
```powershell
ssh root@47.236.12.234
```

在服务器终端执行以下命令块：
```bash
# 进入项目目录
cd /var/www/ai-nav

# 拉取最新代码
git pull

# 安装可能的新依赖 (可选，本次更新如果没加新包可跳过)
npm install

# 重新构建项目
npm run build

# 重启服务应用更改
pm2 reload ai-nav
```
*(如果构建成功并看到 `Success` 或 `online`，则更新完成！)*

---

## 📦 方法二：本地构建 + 上传 (备用方案)
如果方法一在 `npm run build` 时卡住或报错 (通常是因为服务器内存不足)，请使用此方法。

### 1. 本地构建
在 VS Code 终端执行：
```powershell
npm run build
```

### 2. 上传文件
执行以下命令将本地构建好的文件发送到服务器 (需输入密码)：
```powershell
# 1. 上传独立运行包
scp -r .next/standalone/* root@47.236.12.234:/var/www/ai-nav/

# 2. 上传静态资源
scp -r .next/static root@47.236.12.234:/var/www/ai-nav/.next/

# 3. 上传公共资源
scp -r public root@47.236.12.234:/var/www/ai-nav/
```

### 3. 重启服务
登录服务器并重启：
```powershell
ssh root@47.236.12.234 "pm2 reload ai-nav"
```

---

## 🔍 验证更新
访问网站：[https://ainav.ink](https://ainav.ink)
- 检查新工具 (MiniMax, DeepSeek 等) 是否显示。
- 检查图标是否加载正常。
- 检查筛选功能是否可用。
