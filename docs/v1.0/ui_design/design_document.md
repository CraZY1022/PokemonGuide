# 宝可梦图鉴小程序 UI/UX 设计规范 (v1.0)

## 1. 设计概述 (Design Overview)
- **设计理念**: 简洁、工具化、沉浸式。以“精灵球”红白配色为核心致敬经典，结合无边框卡片设计提升现代感。
- **核心体验**: 极速查阅，清晰的信息层级，流畅的转场动画。

## 2. 视觉规范 (Visual Style Guide)

### 2.1 色彩系统 (Color System)

| 用途 | 色值 (Hex) | 描述 |
| :--- | :--- | :--- |
| **主色 (Primary)** | `#E3350D` | 宝可梦红，用于导航栏背景、主按钮、强调文字。 |
| **辅助色 (Secondary)** | `#3B4CCA` | 经典蓝，用于链接、次级按钮或选中状态。 |
| **强调色 (Accent)** | `#FFCC00` | 皮卡丘黄，用于特殊标记、评分或闪光图标。 |
| **背景色 (Background)** | `#F5F7FA` | 全局背景色，带有极淡的冷灰色调。 |
| **卡片/底色 (Surface)** | `#FFFFFF` | 卡片、弹窗背景。 |
| **文本 - 标题 (Text-H)** | `#1F1F1F` | 主要标题，接近纯黑。 |
| **文本 - 正文 (Text-B)** | `#666666` | 正文内容，深灰色。 |
| **文本 - 辅助 (Text-S)** | `#999999` | 辅助信息、占位符。 |
| **分割线 (Divider)** | `#EEEEEE` | 极浅分割线。 |

### 2.2 字体排印 (Typography)
*建议使用微信小程序默认字体栈 (PingFang SC, Roboto, Helvetica-Neue)*

- **大标题 (H1)**: 24px (48rpx), Bold, Line-height 1.4 - *用于详情页名字*
- **标题 (H2)**: 18px (36rpx), Medium - *用于页面顶部标题*
- **副标题 (H3)**: 16px (32rpx), Medium - *用于卡片标题*
- **正文 (Body)**: 14px (28rpx), Regular - *用于列表信息*
- **辅助说明 (Caption)**: 12px (24rpx), Regular - *用于编号、标签*
- **数字/编号**: System Sans-serif - *使用系统默认字体*

### 2.3 布局与间距 (Layout & Spacing)
- **栅格**: 4pt 栅格系统。
- **页面边距 (Margin)**: 16px (32rpx)。
- **卡片间距 (Gutter)**: 10px (20rpx)。
- **圆角 (Radius)**:
    - 按钮/小卡片: 8px
    - 大卡片/弹窗: 16px
    - 圆形头像/图标: 50%

---

## 3. 主要页面结构 (Page Structures)

### 3.1 首页 - 图鉴列表 (Home)
- **顶部导航栏 (NavBar)**: 红色背景，白色标题 "宝可梦图鉴"。
- **搜索/筛选区**:
    - 悬浮于内容之上或置顶固定。
    - **搜索框**: 全宽圆角输入框，白色背景，带搜索图标。
    - **筛选按钮**: 图标按钮，点击展开 Filter Sheet。
- **列表区**:
    - **布局**: 双列瀑布流或网格 (Grid)，宽高比约 3:4。
    - **卡片样式**:
        - 图片居中（透明底）。
        - 底部：左侧 ID (#001)，右侧 属性图标。
        - 标题：中文名居中。
        - 背景：纯白，轻微阴影 (box-shadow: 0 2px 8px rgba(0,0,0,0.05))。
- **加载状态**: 底部显示 Skeleton 骨架屏或 Loading Spinner。

### 3.2 详情页 (Detail)
- **顶部**: 透明导航栏（随着滑动变实色）。
- **头部展示区**:
    - 统一背景色（如 #F5F7FA 或品牌淡红 #FFF0F0）。
    - **大图容器**: 支持左右滑动或点击切换 (普通/闪光)。含切换指示器 (Switch/Toggle)。
- **信息卡片**:
    - 从屏幕底部向上堆叠的圆角卡片 (Bottom Sheet 风格)。
    - **基本信息**: 编号、中英名称、属性 Banner。
    - **数据面板**: 世代信息、简介文本。
- **浮动操作**: 收藏按钮 (V2 预留)。

### 3.3 个人中心 (Profile/Auth)
- **未登录态**:
    - 简洁引导页，Logo 居中。
    - 底部两个大按钮：[登录] [注册]。
- **登录表单**:
    - 输入框下划线或线性风格。
    - 错误提示为红色 Toast。
- **登录态**:
    - 头部用户信息卡片 (头像 + 昵称)。
    - 功能列表 (Cell List): "我的收藏", "设置", "退出登录"。

---

## 4. 交互流程 (Interaction Flows)

### 4.1 形态切换 (Toggle Form)
- **触发**: 用户点击详情页大图右上角的 "✨" 图标或 Toggle 开关。
- **动画**: 直接切换图片 (无复杂动画) 或简单的 Opacity 过渡。
- **反馈**: 震动反馈 (Taptic)。

### 4.2 筛选展开 (Filter Interaction)
- **动作**: 点击顶部筛选漏斗图标。
- **效果**: 底部弹出半屏菜单 (Bottom Modal)。
- **操作**: 用户点选筛选条件 -> 点击“确定”按钮后收起并刷新 (非实时)。

---

## 5. 元件列表 (Component Checklist)

| 组件名 | 描述 | 变体/状态 |
| :--- | :--- | :--- |
| **PokemonCard** | 列表单元格 | Default, Pressed, Loading |
| **TypeBadge** | 属性胶囊状标签 | 18种属性颜色 (Fire, Water, etc.) |
| **SearchBar** | 搜索输入框 | Inactive, Active (Focused) |
| **GenerationFilter** | 筛选选择器 | Dropdown 或 BottomSheet |
| **ShapeToggle** | 形态切换开关 | Normal / Shiny |
| **AuthButton** | 登录/注册按钮 | Primary (Red), Disabled, Loading |
| **NavBar** | 顶部导航 | Default (Red), Transparent |
