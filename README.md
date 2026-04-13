# CBTI — 程序员行为类型测试

> Coder Behavior Type Indicator
>
> 你是 SUDO 还是 NULL？30 道题，测出你的编程人格。

## 在线体验

👉 [点击开始测试](https://cbti.codefather.cn)

## 项目简介

CBTI 是一个面向程序员群体的趣味人格测试网站，灵感来自 MBTI 和 [SBTI](https://sbti.unun.dev/)。

通过 30 道和编程日常相关的选择题，从 **5 大行为模型、15 个维度** 综合分析，匹配出你的编程人格类型。

共有 **27 种普通人格 + 1 种隐藏人格**，每种人格都用一个程序员都懂的关键词命名（如 `SUDO`、`NULL`、`CTRL-C`、`996`、`VIBE`），配有专属人物形象、段子化描述和分享文案。

## 人格类型一览

| 代码 | 名称 | 一句话 |
|------|------|--------|
| SUDO | 万能管理员 | 遇事不决，sudo 一下 |
| README | 文档侠 | 别问我，看文档 |
| GIT-F | 强推人 | git push --force，信仰之推 |
| CRUD | 增删改查侠 | 需求再复杂，本质都是CRUD |
| BUG-0 | 零Bug战士 | Bug？在我的代码里不存在 |
| 404 | 隐身人 | 不在工位，不在线，不存在 |
| VIBE | 氛围程序员 | 我不写代码，我只告诉AI我的感觉 |
| LGTM | 老好人 | LGTM 👍 |
| NPM-i | 轮子收藏家 | npm install 一切 |
| DEL-F | 删库跑路人 | rm -rf / 或者跑路 |
| FIXME | 永远在修的人 | TODO: fix this later |
| HACK | 野生黑客 | 又不是不能用.jpg |
| CTRL-C | 复制粘贴工程师 | CV大法好 |
| RUSH | 极限速通者 | Deadline是第一生产力 |
| RTFM | 原教旨主义者 | 不看文档别来问我 |
| //TODO | 永远下一版 | // TODO: 下次一定 |
| 996 | 卷王之王 | 你下班了？我再优化一下 |
| GOTO | 叛逆者 | 规则是用来打破的 |
| PING | 社交达人 | 我ping你一下，你在吗？ |
| NULL | 空指针 | NullPointerException: 人生 is null |
| SENIOR | 面试造火箭 | 手撕红黑树，入职增删改查 |
| YAML | 配置工程师 | 我不写代码，我写配置文件 |
| STACK | 八股文战神 | HashMap底层原理？问我就对了 |
| SLEEP | Deadline觉醒者 | 我没死，我只是在等deadline |
| FORK | 开源圣体 | 不要star，要PR |
| AGILE | 敏捷话术大师 | 让我们做一个retro |
| REGEX | 正则之神 | 匹配失败 |
| ☕ JAVA | 咖啡因驱动开发者 | 隐藏人格 |

## 维度体系

**5 个行为模型 × 3 个子维度 = 15 个评估维度**，每个维度 L/M/H 三档。

| 模型 | 子维度 |
|------|--------|
| 💻 代码信仰 | C1 代码洁癖度 · C2 技术债态度 · C3 工程素养 |
| 🐛 Bug应对 | B1 Bug归因 · B2 抗压能力 · B3 担当意识 |
| 🤝 团队协作 | T1 沟通风格 · T2 协作主动性 · T3 知识分享 |
| 🚀 驱动引擎 | D1 技术热情 · D2 内卷指数 · D3 创造欲 |
| 🤖 AI共处 | A1 AI依赖度 · A2 AI焦虑感 · A3 技术信仰 |

## 匹配算法

1. 每道题 1/2/3 分，每维度 2 题，分值范围 2-6
2. 分数转等级：≤3 → L，4 → M，≥5 → H
3. 15 维度等级转为数值向量（L=0, M=1, H=2）
4. 与 27 种人格的标准向量计算**曼哈顿距离**
5. 距离最小者为匹配人格，同时计算匹配度百分比

## 技术栈

- **框架**：Next.js 16 + TypeScript
- **样式**：Tailwind CSS 4
- **部署**：EdgeOne Pages（静态导出）
- **图片**：28 张手绘人物形象（PNG，透明背景）
- 纯前端计算，无后端依赖，无数据收集

## 项目结构

```
src/
├── app/
│   ├── page.tsx          # 首页
│   ├── test/page.tsx     # 答题页
│   ├── result/page.tsx   # 结果页
│   ├── types/page.tsx    # 全部人格浏览
│   ├── layout.tsx        # 根布局
│   └── globals.css       # 全局样式
├── components/
│   ├── CharacterSVG.tsx  # 人物形象组件
│   ├── MountainScene.tsx # 首页山景背景
│   └── RadarChart.tsx    # 五维雷达图
├── data/
│   ├── questions.ts      # 30 道题目
│   ├── personalities.ts  # 27+1 种人格定义
│   └── dimensions.ts     # 15 维度定义
├── lib/
│   └── scoring.ts        # 计分和匹配算法
public/
└── characters/           # 28 张人物形象图
scripts/
└── split_characters.py   # 图片切割脚本
```

## 本地开发

```bash
npm install
npm run dev        # 启动开发服务器 http://localhost:3000
npm run build      # 构建（静态导出到 out/）
```

## 部署

项目配置了 `output: "export"`，构建后生成纯静态文件，可部署到任意静态托管平台：

```bash
npm run build
# 将 out/ 目录部署到 EdgeOne Pages / Vercel / Netlify / Cloudflare Pages 等
```

## 作者

[程序员鱼皮](https://space.bilibili.com/12890453)

## 声明

本测试仅供娱乐，别拿它当面试、晋升、相亲、跳槽的依据。
