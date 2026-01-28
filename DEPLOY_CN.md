# 🚀 超级详细：从零开始部署 AI 导航站到阿里云/腾讯云

本文档专为**零基础**用户设计，手把手教您如何将网站部署到国内云服务器。

---

## 📚 目录

1.  [购买云服务器](#1-购买云服务器)
2.  [连接服务器](#2-连接服务器)
3.  [安装环境](#3-安装环境)
4.  [准备代码](#4-准备代码)
5.  [上传文件 (最关键的一步)](#5-上传文件-最关键的一步)
6.  [启动网站](#6-启动网站)
7.  [绑定域名与开启 HTTPS](#7-绑定域名与开启-https)

---

## 1. 购买云服务器

以 **阿里云 ECS** 为例（腾讯云/华为云类似）：

1.  **访问官网**：登录阿里云官网，搜索 "ECS"。
2.  **点击购买**：选择“自定义购买”或“快速购买”。
3.  **关键配置选择**：
    *   **地域 (Region)**：
        *   如果您已经有**已备案**的域名，可以选择 **国内节点** (如 杭州、北京、深圳)。
        *   如果您**不想备案**，请务必选择 **中国香港** 或 **新加坡/日本** 等海外节点。
    *   **实例规格**: 个人网站选择 **1核 2G (2GiB)** 即可，性价比最高。
    *   **镜像 (Image)**: **非常重要！** 请选择 **Ubuntu 22.04 64位** (或者 20.04)。不推荐使用 CentOS (已停止维护) 或 Windows Server。
    *   **公网 IP**: 勾选“分配公网 IPv4 地址”，带宽选择 **按使用流量** (推荐，省钱) 或 **固定带宽 2Mbps**。
    *   **登录凭证**: 选择 **自定义密码**，设置一个复杂的 `root` 密码（记下来！）。

### 1.1 特别说明：轻量应用服务器 (Simple Application Server)
如果您购买的是**轻量应用服务器**（新手推荐），操作界面略有不同：
1.  **防火墙配置**：轻量服务器不叫“安全组”，叫**“防火墙”**。
    *   进入轻量服务器控制台 -> 点击卡片进入详情 -> 左侧菜单点击 **“防火墙”**。
    *   点击 **“添加规则”**，分别添加 `80`, `443` 端口。
2.  **重置密码**：如果购买时没设置密码，请在控制台 -> **“服务器运维”** -> **“远程连接”** 设置 root 密码并重启服务器。

### 1.2 重要提醒：关于成都节点与备案
您购买的是**成都**节点，属于中国大陆地区。
*   **必须备案**：如果不进行 ICP 备案，您的域名解析后会被阿里云拦截，无法访问。
*   **临时测试**：在未备案完成前，您只能通过 **公网 IP** 直接访问网站（形式如 `http://1.2.3.4`），无法使用域名。

---

## 2. 连接服务器

### Windows 用户 (使用 PowerShell)
1.  在电脑左下角搜索 `PowerShell` 并打开。
2.  输入以下命令（将 `1.2.3.4` 替换为您的公网 IP）：
    ```powershell
    ssh root@8.137.167.204
    ```
3.  第一次连接会提示 `Are you sure... (yes/no)?`，输入 `yes` 并回车。
4.  输入密码（注意：**输入密码时屏幕不会显示任何字符**，输完直接回车）。

### Mac 用户 (使用 Terminal)
1.  打开 `终端 (Terminal)`。
2.  输入 `ssh root@1.2.3.4`，步骤同上。

> **成功标志**：看到 `root@hostname:~#` 的提示符，说明连接成功。

---

## 3. 安装环境

复制下面的命令块，在服务器终端中**右键粘贴**，然后回车执行。

```bash
# 1. 更新系统软件源
sudo apt update -y

# 2. 安装 Node.js (v18 版本)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 3. 安装 PM2 (用于保持网站一直运行)
sudo npm install -g pm2

# 4. 安装 Nginx (用于让用户通过域名访问)
sudo apt install -y nginx

# 5. 验证安装 (如果都显示版本号则成功)
node -v
npm -v
nginx -v
```

---

## 4. 准备代码

回到您的**本地电脑**（不要在服务器操作这一步）。

1.  打开 VS Code，确保所有代码已保存。
2.  在终端执行构建命令：
    ```bash
    npm run build
    ```
3.  等待构建完成，确保没有报错。此时项目目录下会生成一个 `.next` 文件夹。

---

## 5. 上传文件 (最关键的一步)

我们将使用 **FileZilla** 软件将文件传到服务器。

### 5.1 设置 FileZilla
1.  下载并安装 [FileZilla Client](https://filezilla-project.org/)。
2.  打开软件，点击左上角“文件” -> “站点管理器” -> “新站点”。
3.  **协议**: 选择 **SFTP - SSH File Transfer Protocol**。
4.  **主机**: 您的服务器公网 IP。
5.  **用户**: `root`
6.  **密码**: 您的服务器密码。
7.  点击“连接”。

### 5.2 上传步骤 (请严格遵守)
连接成功后，左边是您的电脑，右边是服务器。

1.  **在右边 (服务器)**:
    *   在地址栏输入 `/var/www/` 并回车。
    *   右键空白处 -> “创建目录” -> 命名为 `ai-nav`。
    *   双击进入 `/var/www/ai-nav`。

2.  **开始上传**:
    *   **第一步**: 找到本地 `.next/standalone` 文件夹，打开它。将里面的**所有内容**（包括 `.next`, `node_modules`, `server.js` 等）全选，拖到右边服务器。
    *   **第二步 (容易漏)**: 找到本地 `.next/static` 文件夹。
        *   在右边服务器，进入 `.next` 目录（刚刚上传上去的）。
        *   在右边服务器，如果没看到 `static` 文件夹，就手动创建一个 `static` 文件夹。
        *   将本地 `.next/static` 里面的**所有内容**，拖到右边服务器的 `.next/static` 里面。
    *   **第三步**: 将本地 `public` 文件夹，拖到右边服务器的 `/var/www/ai-nav` 根目录。
    *   **第四步**: 将本地 `ecosystem.config.js`，拖到右边服务器的 `/var/www/ai-nav` 根目录。

> **检查点**: 此时服务器 `/var/www/ai-nav` 目录下应该有：
> *   `.next` (文件夹)
> *   `node_modules` (文件夹)
> *   `public` (文件夹)
> *   `server.js` (文件)
> *   `ecosystem.config.js` (文件)

---

## 6. 启动网站

回到 **SSH 终端**（黑底白字的那个窗口）。

1.  进入目录：
    ```bash
    cd /var/www/ai-nav
    ```
2.  启动服务：
    ```bash
    pm2 start ecosystem.config.js
    ```
    > 看到 `[PM2] App [ai-nav] launched` 说明启动成功。

3.  设置开机自启：
    ```bash
    pm2 save
    pm2 startup
    ```

---

## 7. 绑定域名与开启 HTTPS

### 7.1 配置 Nginx
1.  编辑配置文件：
    ```bash
    nano /etc/nginx/sites-available/default
    ```
2.  **删除**里面的所有内容（可以长按 Delete 键）。
3.  **粘贴**以下内容（记得修改 `your_domain.com` 为您的真实域名）：

    ```nginx
    server {
        listen 80;
        server_name your_domain.com www.your_domain.com; # <--- 修改这里！

        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```
4.  **保存退出**: 按 `Ctrl + O` (保存) -> `Enter` (确认) -> `Ctrl + X` (退出)。

### 7.2 重启 Nginx
```bash
nginx -t
# 如果显示 syntax is ok，则继续：
systemctl restart nginx
```

此时，在浏览器输入您的域名，应该就能看到网站了！

---

## 8. (可选) 开启 HTTPS 小绿锁

为了安全，建议开启 HTTPS。

```bash
# 安装工具
sudo apt install -y certbot python3-certbot-nginx

# 申请证书 (按照提示输入邮箱，输入 A 同意协议)
sudo certbot --nginx -d your_domain.com -d www.your_domain.com
```

恭喜！您的 AI 导航站已成功部署上线！🚀
