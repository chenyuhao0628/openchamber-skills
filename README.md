# 技能开关 · openchamber-skills

当前版本 **0.1.0**，核对日期 **2026-10-22**。只管理 OpenCode 全局技能目录 `~/.config/opencode/skills`，按入口文档启停技能，并检查入口冲突。不改写技能正文，不新增技能，不碰其他 agent 的技能目录。

## 开关方式

- 关闭：`SKILL.md` → `SKILL.md.disabled`
- 平铺技能：`<id>.md` → `<id>.md.disabled`
- 开启：改回原名

OpenCode 的扫描器只认名为 `SKILL.md` 的文件和源根目录的 `*.md`。改名后技能不会被注册：模型可用列表里没有，`skill` 工具也找不到。下一次扫描后生效；当前会话里已经加载过的正文不会撤回。

这比 `disable-model-invocation` 更彻底。后者只是不向模型广告，技能仍然注册，知道 ID 仍能加载。

## 安装

从 GitHub 安装：在 OpenChamber **设置 → 扩展 → 添加扩展 → URL** 填入仓库地址，宿主会拉取已构建的 `panel/main.js` 和 `service/main.js`：

```text
https://github.com/chenyuhao0628/openchamber-skills
```

从本地目录安装（开发时）：

在扩展目录执行：

```sh
npm ci
npm run typecheck
npm test
```

`npm test` 会先构建 `panel/main.js` 和 `service/main.js`。然后在 OpenChamber **设置 → 扩展 → 添加扩展 → 文件夹** 选择本目录，安装时允许本地服务运行。

服务由宿主启动，仅监听 `127.0.0.1`，每个请求都检查宿主注入的 Bearer token。它只扫描和改名 `~/.config/opencode/skills`，不读凭据、不写 `opencode.json`、不发起外部网络请求。

## 管理范围

| 范围 | 是否处理 |
| --- | --- |
| `~/.config/opencode/skills` | 是 |
| `~/.claude/skills`、`~/.agents/skills` | 否，完全不读取 |
| 项目 `.opencode/skills` | 否 |
| `opencode.json` 里的自定义 `skills` 路径 | 否 |
| 内置技能、远程 catalog、MCP 工具 | 否 |

面板只列出上述 OpenCode 全局目录里的技能。

## 冲突检查

| 类型 | 行为 |
| --- | --- |
| 同目录同时有 `SKILL.md` 和 `SKILL.md.disabled` | 阻塞；提供“保留启用”/“保留关闭”，另一个文件备份为 `.conflict-<时间>-<随机>` |
| 同 ID 有多个入口（平铺和目录重名） | 提示并显示生效入口；开关会处理所有同名入口 |
| frontmatter 未闭合 / 入口为空 | 提示；入口开关仍可用；OpenCode 可能跳过该技能 |
| 入口没有 `description` 或标记为仅手动调用 | 提示；模型不会自动选用 |
| 入口文件无法读取 | 提示；入口开关仍可用 |
| 技能目录无法读取 | 阻塞所有写操作，避免在状态不明时继续 |

“保留启用”会把旧的停用入口备份，保留当前启用入口；“保留关闭”会把旧停用入口备份，再用当前入口替换停用入口。两种情况都不直接删除用户文件。

## 面板

- 顶部显示“模型可见 / 共几个 / 约多少 tokens”，以及已关闭数量和冲突数量。
- 一个搜索框；列表只显示名称、ID、描述和开关，不显示来源配置。
- 每个技能一个开关；部分入口混合时显示“全部启用/全部关闭”。
- 有冲突时显示冲突区；没有冲突时不占版面。
- 全部启用/全部关闭需要就地确认。

面板不提供 `.claude`/`.agents`、项目、自定义路径或 MCP 设置。

## 限制

- 没有后台 watcher；技能更新后打开面板或点“重新扫描”。
- 已加载进当前会话的技能正文不会因为关闭而消失。切换后开新会话最干净。
- 技能更新/重装可能重新创建 `SKILL.md`；面板打开时对账并提示。
- OpenChamber 扩展管理页的“停用扩展”只会停掉 service，**不会自动把技能改回来**。停用或卸载前先点“全部启用”。
- 文件系统没有跨进程锁。面板串行处理自己的读写，但如果其他编辑器同时创建同名入口，仍可能出现竞态；冲突检查会在下一次扫描中报告。
- 服务以当前用户权限运行，不声明外部网络、socket 或 exec 权限；只由宿主分配 loopback 端口。它直接使用 Node `fs`，因此不受宿主文件代理的中文目录请求头问题影响。

## 数据与安全

- 只改技能入口文件名；为显示名称和描述会读取 frontmatter，但不返回或记录正文。错误日志只包含路径和错误类型。
- 没有单独的配置文件；扩展状态全部来自技能目录本身。
- 停用状态本身就是 `.disabled` 文件；解决双入口冲突时另存 `.conflict-*` 备份。扩展不删除这些文件。
- 测试与预览都使用临时目录或合成数据；没有把真实技能内容写入测试、日志或文档。

## 开发

```sh
npm run build
npm run typecheck
npm test
npm run preview
```

`npm run preview` 只在 `127.0.0.1` 服务构建产物和合成数据，**不读取真实技能**。预览页可切换正常、入口冲突、明暗主题和窄宽度。

| 路径 | 职责 |
| --- | --- |
| `src/core/skills.ts` | 扫描、frontmatter 读取、冲突判断、改名事务 |
| `src/service/main.ts` | 本地 HTTP、Bearer 校验、路由、串行读写 |
| `src/panel/main.ts` | 列表、开关、冲突提示、批量确认 |
| `src/shared/types.ts` | 面板与服务的数据契约 |
| `tests/core.test.ts` | 合成技能目录上的扫描、冲突、重复 ID、批量 |
| `tests/service.test.ts` | 隔离 HOME 上的 HTTP、认证和冲突路径 |
| `ui/native.css` | 打包时内联的宿主基础样式（本扩展自带副本） |

测试与预览都使用临时目录或合成数据；没有把真实技能内容写入测试、日志或文档。
