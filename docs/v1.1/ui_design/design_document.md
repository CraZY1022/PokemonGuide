# 宝可梦图鉴小程序 UI/UX 设计规范 (v1.1)

> 基于 V1.0 迭代，本版本专注于**视觉精致度**与**交互微动效**的提升。

## 1. 变更日志 (Changelog)
- **v1.1**: 新增高饱和度属性色板；重构 Shiny Toggle 按钮样式；定义形态切换动效曲线。

## 2. 视觉规范更新

### 2.1 属性色板 (Type Colors) - High Saturation
*参考官方 Wiki 配色，用于 Type Badge 背景*

| 属性 (Type) | 色值 (Hex) | 属性 (Type) | 色值 (Hex) |
| :--- | :--- | :--- | :--- |
| **一般 (Normal)** | `#A8A77A` | **格斗 (Fighting)** | `#C22E28` |
| **飞行 (Flying)** | `#A98FF3` | **毒 (Poison)** | `#A33EA1` |
| **地面 (Ground)** | `#E2BF65` | **岩石 (Rock)** | `#B6A136` |
| **虫 (Bug)** | `#A6B91A` | **幽灵 (Ghost)** | `#735797` |
| **钢 (Steel)** | `#B7B7CE` | **火 (Fire)** | `#EE8130` |
| **水 (Water)** | `#6390F0` | **草 (Grass)** | `#7AC74C` |
| **电 (Electric)** | `#F7D02C` | **超能 (Psychic)** | `#F95587` |
| **冰 (Ice)** | `#96D9D6` | **龙 (Dragon)** | `#6F35FC` |
| **恶 (Dark)** | `#705746` | **妖精 (Fairy)** | `#D685AD` |

### 2.2 组件样式升级

#### A. 属性标签 (Type Badge)
- **样式**: 纯色背景 + 白色文字 + 10% 透明度黑色阴影。
- **圆角**: 4px (微圆角，更现代硬朗)。
- **字体**: PingFang SC Semibold, 10px / 12px。

#### B. 闪光切换按钮 (Shiny Toggle)
- **位置**: 详情页大图区域右下角悬浮。
- **默认态 (Normal)**:
    - 背景: 白色半透明 (`rgba(255,255,255, 0.9)`) + 描边 `#EEEEEE`。
    - 图标: 灰色 **Sparkles (三颗四角星)** ✨ (`#999`)。
- **激活态 (Shiny)**:
    - 背景: 淡黄色渐变 (`#FFFDE7`) + 金色描边 `#F7D02C`。
    - 图标: 金色 **Sparkles (三颗四角星)** ✨ (`#F7D02C`) + 外发光。
- **反馈**: 点击时缩放 (Scale 0.9)。

## 3. 交互规范更新

### 3.1 形态切换 (Form Transition)
- **视觉**: 图片 **Cross-fade** (交叉淡入淡出)。
    - Duration: `300ms`
    - Timing Function: `ease-in-out`
- **触感 (Haptic)**:
    - 触发时机: 切换动作触发且图片加载完毕。
    - 强度: `Light` (iOS Taptic Engine)。

### 3.2 预加载 (Preload)
- 进入详情页 `onLoad` 时，立即请求 Shiny 形态图片 URL，并缓存至隐藏节点，确保切换无闪烁。
