# 🚀 阿里云新加坡服务器终极部署指南 (Next.js Standalone)

这份文档是根据您的项目代码和阿里云环境特性专门定制的。请严格按照以下步骤操作。

---

## 🛠 第一步：服务器初始化

1.  **重置密码**：在阿里云控制台 -> 轻量应用服务器 -> 服务器详情 -> **重置密码**。
2.  **开放端口**：在阿里云控制台 -> **防火墙** -> 添加规则：
    *   `80` (HTTP)
    *   `443` (HTTPS)
    *   `22` (SSH)

3.  **连接服务器**：
    打开您的本地终端（PowerShell 或 CMD），输入：
    ```powershell
    # 将 x.x.x.x 替换为您的公网 IP
    ssh root@x.x.x.x
    ```

---

## 📦 第二步：安装环境 (只需做一次)

在**服务器终端**复制并执行以下命令块（自动识别系统并安装）：

```bash
# 1. 安装基础工具
if [ -f /etc/debian_version ]; then
    sudo apt update -y && sudo apt install -y curl unzip git nginx
else
    sudo yum update -y && sudo yum install -y curl unzip git nginx
fi

# 2. 安装 Node.js 18 (LTS)
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash - || curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
if [ -f /etc/debian_version ]; then sudo apt install -y nodejs; else sudo yum install -y nodejs; fi

# 3. 安装 PM2 (进程管理)
sudo npm install -g pm2
```

---

## 💻 第三步：本地构建与上传

**请在您的 VS Code 本地终端执行：**

1.  **构建项目** (生成部署包)
    ```powershell
    npm run build
    ```

2.  **上传文件** (请逐行复制执行，每次输入服务器密码)
    > 将 `x.x.x.x` 替换为您的服务器 IP

    ```powershell
    # 1. 创建目录
    ssh root@x.x.x.x "mkdir -p /var/www/ai-nav/.next/static"

    # 2. 上传核心运行包 (包含了 next.config.mjs 和 package.json)
    scp -r .next/standalone/* root@x.x.x.x:/var/www/ai-nav/
    
    # 3. 补传嵌套的 .next 文件 (关键修复步骤)
    scp -r .next/standalone/.next/* root@x.x.x.x:/var/www/ai-nav/.next/

    # 4. 上传静态资源 (样式、图片) -> 必须传，否则样式丢失
    scp -r .next/static root@x.x.x.x:/var/www/ai-nav/.next/

    # 5. 上传公共资源 (Logo、Favicon)
    scp -r public root@x.x.x.x:/var/www/ai-nav/

    # 6. 上传 PM2 配置
    scp ecosystem.config.js root@x.x.x.x:/var/www/ai-nav/

    # 7. 上传 Nginx 配置 (我们刚才优化的版本)
    scp deploy/nginx.conf root@x.x.x.x:/etc/nginx/conf.d/ai-nav.conf
    ```

---

## 🚀 第四步：启动服务

回到**服务器终端**执行：

```bash
# 1. 进入目录
cd /var/www/ai-nav

# 2. 补充安装 sharp (图片优化库，Linux版)
# 注意：Standalone 包里可能包含的是 Windows 版 sharp，所以在服务器上重新安装一下最稳妥
npm install sharp

# 3. 修复主机名映射 (防止启动报错)
sudo bash -c 'echo "127.0.0.1 $(hostname)" >> /etc/hosts'

# 4. 启动项目
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup

# 5. 重启 Nginx 应用配置
# 如果是 CentOS/Alibaba Linux:
sudo systemctl enable nginx
sudo systemctl restart nginx
# 如果是 Ubuntu/Debian:
sudo service nginx restart
```

---

## 🌐 第五步：阿里云域名解析与 HTTPS 配置 (保姆级)

### 1. 阿里云控制台设置域名解析

1.  登录 **[阿里云控制台](https://homenew.console.aliyun.com/)**。
2.  在顶部搜索栏输入 **“域名”**，点击 **“域名控制台”** 进入。
3.  在域名列表中，找到您购买的域名（例如 `example.com`），点击右侧的 **“解析”** 链接。
4.  点击左上角的蓝色按钮 **“添加记录”**，我们需要添加两条记录：

    **第一条 (主域名)：**
    *   **记录类型**：选择 `A`
    *   **主机记录**：输入 `@`
    *   **解析请求来源**：默认
    *   **记录值**：输入服务器IP `47.236.12.234`
    *   **TTL**：默认 (10分钟)
    *   点击 **“确认”**

    **第二条 (www 子域名)：**
    *   再次点击 **“添加记录”**
    *   **记录类型**：选择 `A`
    *   **主机记录**：输入 `www`
    *   **解析请求来源**：默认
    *   **记录值**：输入服务器IP `47.236.12.234`
    *   **TTL**：默认 (10分钟)
    *   点击 **“确认”**

    > ✅ 等待约 1-10 分钟，解析通常会生效。您可以在本地浏览器访问您的域名试一试。

### 2. 服务器自动开启 HTTPS (超详细步骤)

**前提**：请确保上面的解析已经添加，并且能在浏览器里通过域名（http://...）访问到网站（即使显示不安全也没关系）。

请在**服务器终端**（黑色背景窗口）执行以下操作：

#### 步骤 2.1：安装证书工具
复制下面这行命令，粘贴到终端并回车：
```bash
sudo yum install -y certbot python3-certbot-nginx
```
*(等待它跑完，最后显示 `Complete!` 表示安装成功)*

#### 步骤 2.2：运行自动配置命令
请将下面的 `your-domain.com` 换成您**真实的域名**，然后复制执行：
```bash
# 例如：sudo certbot --nginx -d baidu.com -d www.baidu.com
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

#### 步骤 2.3：回答屏幕上的提问 (交互过程)
执行命令后，屏幕会出现英文提问，请按以下说明操作：

1.  **输入邮箱**
    *   屏幕显示：`Enter email address (used for urgent renewal and security notices)`
    *   **操作**：输入您的常用邮箱（如 `xxx@qq.com`），按 **回车**。

2.  **同意协议**
    *   屏幕显示：`Please read the Terms of Service ... (Y)es/(N)o:`
    *   **操作**：输入 `Y`，按 **回车**。

3.  **分享邮箱 (可选)**
    *   屏幕显示：`Would you be willing to share your email ... (Y)es/(N)o:`
    *   **操作**：输入 `N`，按 **回车**。

4.  **恭喜成功**
    *   如果看到 `Congratulations!` 和 `Successfully enabled ...`，说明成功了！
    *   Certbot 会自动帮您修改 Nginx 配置，无需手动重启。

现在，去浏览器输入 `https://您的域名`，您会看到地址栏有一把**小锁头**🔒，网站变绿了！✅
