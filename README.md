# FFI

FDM Filament Info 是一个用于查看、整理和对比 FDM 3D 打印耗材参数的 Web 应用。项目中的耗材资料以 JSON 文件维护，并提供面向 Bambu Studio 和 OrcaSlicer 的参数查看界面。

在线 Demo：<https://fdm-filament-info.deartanker.workers.dev/>

## 项目结构

- `Filaments/`：耗材数据，按品牌、材料和系列组织。
- `Workers/`：Next.js 前端、Cloudflare Worker API 代理和部署配置。
- `docs/`：数据结构、实现说明和项目文档。
- `package.json`：仓库根目录的快捷脚本。

生产环境使用 Next.js 静态导出生成 `Workers/.next-out/`，再由 Cloudflare Worker 提供静态资源和 API。Worker 的 API 会从 GitHub 获取耗材目录，并代理读取 `Filaments/` 下的文件。

## 环境要求

- Node.js 18.17 或更高版本，推荐使用当前 LTS 版本。
- npm 9 或更高版本。
- 一个 Cloudflare 账号（仅部署时需要）。
- 已安装并登录 Wrangler；项目已经将 Wrangler 声明为 `Workers` 的开发依赖，不需要全局安装。

## 本地运行

在仓库根目录执行：

```bash
cd Workers
npm ci
npm run dev
```

然后打开 <http://localhost:3000>。

开发模式下，Next.js 负责页面开发服务器；如果需要单独调试 Cloudflare Worker，可以在另一个终端执行：

```bash
cd Workers
npm run dev:worker
```

## 部署到 Cloudflare Workers

以下步骤适用于首次部署或在本地手动发布。

### 1. 获取代码并安装依赖

```bash
git clone https://github.com/DearTanker/FFI.git
cd FFI/Workers
npm ci
```

如果你是从自己的仓库部署，请将上面的仓库地址替换为自己的地址。

### 2. 登录 Cloudflare

```bash
npx wrangler login
```

命令会打开浏览器完成授权。也可以使用 API Token 或 CI 环境变量进行认证，具体方式请参考 Wrangler 文档。

### 3. 检查 Worker 配置

默认配置位于 [`Workers/wrangler.toml`](Workers/wrangler.toml)：

- Worker 名称：`fdm-filament-info`
- 静态资源目录：`./.next-out`
- Worker 入口：`src/worker.ts`

如果名称已经被占用，或需要部署到自己的 Cloudflare 项目，请先修改 `name`。修改后，Cloudflare 可能会把它视为一个新的 Worker。

### 4. 构建生产版本

```bash
npm run build
```

该命令会先生成构建版本信息，再执行 Next.js 静态导出。成功后应存在 `Workers/.next-out/` 目录。

### 5. 本地预览生产版本（推荐）

```bash
npm run preview:worker
```

该命令会重新构建项目并启动 Wrangler 本地预览服务。终端会显示实际访问地址。

### 6. 发布

仍在 `Workers` 目录时执行：

```bash
npm run deploy
```

也可以从仓库根目录执行：

```bash
cd ..
npm run deploy:workers
```

注意：根目录的 `deploy:workers` 只负责执行 Wrangler 发布，不会自动构建。每次修改页面或耗材数据后，都应先执行 `cd Workers && npm run build`，再执行发布命令。

## 可选：配置 GitHub Token

Worker 默认可以匿名访问 GitHub API。若遇到 GitHub API 频率限制，可以将 Token 作为 Cloudflare Worker Secret 配置；不要把 Token 写入 `wrangler.toml` 或提交到 Git：

```bash
cd Workers
npx wrangler secret put GITHUB_TOKEN
```

按提示粘贴 Token 后重新部署。该 Token 需要具有读取目标仓库内容的权限；对于公开仓库，通常不需要额外仓库写权限。

## 修改耗材数据

1. 在 `Filaments/` 下按照现有目录结构添加或修改 JSON 文件。
2. 在本地运行 `cd Workers && npm run dev` 检查页面效果。
3. 提交并推送数据变更；生产 Worker 的 GitHub API 代理默认读取 `DearTanker/FFI` 仓库 `main` 分支。
4. 若部署的是自己的仓库，还需要同步修改 [`Workers/src/worker.ts`](Workers/src/worker.ts) 中的 GitHub API 地址，以及前端中对应的原始文件地址配置。

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `cd Workers && npm ci` | 按锁文件安装依赖 |
| `cd Workers && npm run dev` | 启动 Next.js 开发服务器 |
| `cd Workers && npm run typecheck` | 执行 TypeScript 类型检查 |
| `cd Workers && npm run build` | 构建生产静态文件 |
| `cd Workers && npm run preview:worker` | 构建并本地预览 Worker |
| `cd Workers && npm run deploy` | 发布到 Cloudflare Workers |

## 故障排查

### 发布时找不到 `.next-out`

先在 `Workers` 目录执行 `npm run build`，确认 `.next-out/` 已生成，再执行 `npm run deploy`。

### 页面可以打开，但耗材列表加载失败

检查浏览器开发者工具中的 `/api/github/tree` 和 `/api/github/content` 请求，并确认：

- 部署环境可以访问 `api.github.com` 和 `raw.githubusercontent.com`。
- GitHub 仓库的分支、路径与 Worker 中的配置一致。
- 没有触发 GitHub API 限流；必要时配置 `GITHUB_TOKEN`。

### 本地改了数据但页面没有变化

开发页面默认通过 GitHub 代理读取远程数据，可能受边缘缓存影响。确认改动已推送到目标分支，并重新加载页面；生产环境发布后也可能需要等待短暂缓存时间。

## 许可证

本项目许可证见 [`LICENSE`](LICENSE)。
