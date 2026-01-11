# 宝可梦图鉴小程序前端开发计划清单 (v1.0)

本文档基于 `1.0版本PRD.md` 及 UI 设计建议生成，旨在明确前端开发路径、规范与技术选型。

---
> **Status Tracker**:
> - [x] Page Structure & Routing
> - [x] Component Implementation (PokemonCard, TypeBadge, SearchBar)
> - [x] Native TS + SCSS Setup
> - [x] Backend API Integration (Axios wrapper style)
> - [x] Infinite Scroll (Custom ScrollView implementation)

---

## 1. 页面结构与路由规划 (Page Structure & Routing)

### 1.1 页面清单 (Pages)

| 页面对应路径 | 页面名称 | 页面层级 | 核心功能 |
| :--- | :--- | :--- | :--- |
| `pages/home/index` | **图鉴列表页** (首页) | TabBar | 展示宝可梦列表、搜索入口、筛选入口。 |
| `pages/profile/index` | **个人中心页** | TabBar | 展示用户信息、登录/注册入口、退出登录。 |
| `pages/detail/index` | **图鉴详情页** | 二级页面 | 展示宝可梦大图、形态切换、基础信息、世代信息。 |
| `pages/auth/index` | **登录/注册页** | 二级页面 | 用户名/密码表单提交，完成认证。 |

### 1.2 导航逻辑
- **TabBar**: 包含 [图鉴] (`pages/home/index`) 和 [我的] (`pages/profile/index`)。
- **列表 -> 详情**: 点击 `PokemonCard` 跳转 `pages/detail/index?id=XXX`。
- **我的 -> 登录**: 若未登录，点击[登录/注册]按钮跳转 `pages/auth/index`。
- **登录 -> 返回**: 登录成功后，返回上一页（`navigateBack`）或重定向至 TabBar 页。

---

## 2. 组件分解方案 (Component Breakdown)

### 2.1 公共组件 (components/)

#### `pokemon-card` (列表卡片)
- **职责**: 列表页单个宝可梦展示单元。
- **Props**: `id`, `name`, `types`, `imageUrl`.
- **交互**: `tap` 事件触发页面跳转。
- **样式**: 卡片圆角、阴影、属性图标布局。

#### `type-badge` (属性徽章)
- **职责**: 展示属性（如 火、水、草）。
- **Props**: `type` (枚举).
- **样式**: 根据 `type` 映射不同的背景色（参照 UI 规范）。

#### `search-bar` (搜索栏)
- **职责**: 接收用户输入。
- **Props**: `placeholder`, `value`.
- **Events**: `input`, `confirm` (触发搜索).
- **状态**: 聚焦/非聚焦态 UI 变化。

#### `filter-sheet` (筛选面板)
- **职责**: 底部弹出的筛选条件选择器。
- **Props**: `visible` (显示状态), `currentGen`, `currentTypes`.
- **Events**: `close`, `apply` (提交筛选).
- **实现**: 使用 `page-container` 或自定义 `view` + 动画实现 Bottom Sheet。

#### `auth-button` (认证按钮)
- **职责**: 登录/注册表单提交按钮。
- **Props**: `text`, `loading`, `disabled`, `type` (primary/secondary).

---

## 3. 交互与数据流方案 (Interaction & Data Flow)

### 3.1 状态管理
由于 V1 业务较简单，推荐使用 **混合模式**：
- **全局状态 (`app.globalData`)**:
  - `userInfo`: 存储登录后的用户信息。
  - `token`: 鉴权 Token。
- **页面状态 (`Page.data`)**:
  - **Home**: `pokemonList` (列表数据), `page` (分页), `filterParams` (筛选条件), `loading` (加载态).
  - **Detail**: `pokemonDetail` (详情数据), `isShiny` (形态展示状态).
- **通信**:
  - `EventChannel` (可选): 用于列表页向详情页预加载数据传递（优化体验）。
  - `Storage`: 持久化 `token` 和 `userInfo`。

### 3.2 接口对接约定 (API Logic)
- **Base URL**: 待后端提供（Mock 阶段可使用本地 JSON）。
- **通用响应结构**:
  ```json
  {
    "code": 0, // 0 成功, 非 0 失败
    "data": {},
    "message": "Success"
  }
  ```
- **核心接口**:
  1. `GET /pokemon/list`: 支持 `page`, `pageSize`, `search`, `gen`, `type` 参数。
  2. `GET /pokemon/detail/:id`: 获取单只详情。
  3. `POST /auth/login`: 登录。
  4. `POST /auth/register`: 注册。

### 3.3 错误处理
- **网络错误**: 统一封装 `wx.request`，拦截 `fail` 回调或非 200 状态码，弹出 `wx.showToast`。
- **鉴权失败**: 401 响应触发登出清理逻辑，并跳转登录页。

---

## 4. 表现层设计方案 (UI Design Implementation)

### 4.1 布局规范 (WXML + WXSS)
- **Grid 布局**: 列表页使用 `display: grid; grid-template-columns: 1fr 1fr;` 实现双列瀑布流。
- **Flex 布局**: 绝大多数组件内部对齐（居中、两端对齐）使用 Flexbox。
- **单位**: 统一使用 `rpx` (Responsive Pixel) 适配多端屏幕（设计稿以 iPhone 6/7/8 375pt 为基准，750rpx）。

### 4.2 样式系统 (Theming)
在 `app.wxss` 中定义 CSS 变量 (CSS Variables)：
```css
page {
  --color-primary: #E3350D;
  --color-secondary: #3B4CCA;
  --color-bg: #F5F7FA;
  --text-main: #1F1F1F;
  --text-sub: #666666;
  --radius-card: 16rpx;
}
```
组件中直接引用变量，方便后续维护和 V2 主题切换。

### 4.3 静态资源
- **图片**: 
  - 宝可梦图片建议使用 CDN 链接。
  - 占位图 (Placeholder) 本地存储。
  - 小图标 (Icons) 优先使用 SVG 或 IconFont，减少包体积。

---

## 5. 兼容性与配置要求 (Compatibility)

- **基础库版本**: 建议不低于 `2.25.0` (支持较新的 CSS 特性和 API)。
- **开发者工具**: 最新稳定版。
- **ES6转ES5**: 开启。
- **增强编译**: 开启 (支持 async/await 等更高级语法)。

---

## 6. 推荐前端技术栈 (Recommended Tech Stack)

### 推荐方案：~~原生加强版~~ -> **原生 TS 进阶版**

- **语言**: ~~JavaScript (ES6+)~~ -> **TypeScript (4.x+)**
  - *理由*: ~~团队门槛低，配合小程序原生生态最顺畅。项目规模 V1 较小，暂无需引入 TypeScript 的复杂配置。~~
  - *理由*: **Type Safety**。利用泛型和 DTO 共享实现前后端类型对齐，显著减少联调 Bug；配合 VSCode 智能提示提升开发效率。
- **框架**: **微信小程序原生 (Native) + Component 模式**
  - *理由*: 性能最好，无第三方框架 (Taro/Uni-app) 的跨端黑盒问题。**全面使用 Component 构造器替代 Page**，以获得更好的 TS 类型推断支持。
- **样式**: ~~WXSS + CSS Variables~~ -> **SCSS + CSS Variables**
  - *理由*: ~~原生支持，配合 CSS 变量可实现低成本的主题管理。~~
  - *理由*: SCSS 支持嵌套写 法，能极大减少代码冗余。微信开发者工具原生支持编译 SCSS。
- **状态管理**: ~~GlobalData + EventChannel~~ -> **MobX-Miniprogram**
  - *理由*: ~~V1 只有简单的用户信息和列表/详情数据，组件深度浅，全局状态极少。~~
  - *理由*: 官方维护的响应式库。相比 Redux 更适合 TS 开发，通过装饰器和 Observable 轻松管理全局状态（如 Auth, Theme）。
- **组件库**: **官方 Vant Weapp (按需引入) 或 自建轻量组件**
  - *理由*: 考虑到 UI 定制化程度高（特殊的红白球风格），**建议自建核心业务组件**，通用组件（如 Toast, Loading, Popup）可适当引用 Vant Weapp 减少开发量。
- **构建工具**: **微信开发者工具 (NPM 构建)**
  - *理由*: 无需复杂的 Webpack/Vite 配置，利用工具自带的 "TypeScript 编译" 和 "构建 NPM" 功能即可。
- **代码规范**: **ESLint + Prettier (TS Standard)**
  - *建议*: 配置 `typescript-eslint` 规则，确保代码风格统一。

### ~~为什么不选 Redux/MobX?~~
- ~~**理由**: V1 只有简单的用户信息和列表/详情数据，组件深度浅，全局状态极少。引入额外的状态管理库会增加包体积和样板代码。简单的 `globalData` + 事件通信足以应对。~~

### 单元测试
- **工具**: 微信开发者工具内置的一键生成测试用例 + Jest (**ts-jest**).
- **策略**: 重点测试 `services` 层的接口处理和 `utils` 层的辅助函数。UI 层测试成本较高，建议依赖人工验收。
