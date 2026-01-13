# 宝可梦图鉴小程序 V1.1 自动化测试方案 (Automation Test Plan)

| 文档版本 | 修改日期 | 修改人 | 修改内容 |
| :--- | :--- | :--- | :--- |
| v1.1 | 2026-01-13 | Antigravity | V1.1 自动化测试方案初稿 |

文档依据：
- `docs/v1.1/1.1版本PRD.md`

---

## 1. 测试目标 (Objectives)
针对 V1.1 版本“体验优化”的核心需求，通过自动化手段验证 UI 结构更新、交互逻辑变更及 API 调用（震动反馈）。同时确保 V1.0 的核心功能（列表、搜索、详情）不因 UI 重构而 regression（回退）。

---

## 2. 自动化测试策略 (Strategy)

### 2.1 核心挑战与应对
*   **UI 重构风险**: Type Badge 和 Toggle Button 的 DOM 结构可能改变。
    *   *应对*: 优先使用稳定的 `data-testid` 或组件类名选择器，避免依赖层级结构。
*   **API 验证 (Haptic)**: 震动反馈无法在真机外感知。
    *   *应对*: 使用 `automator` 的 `mockWxMethod` 拦截 `wx.vibrateShort` 调用，验证其被触发。
*   **动效验证 (Transition)**: 动画过程难以捕捉。
    *   *应对*: 验证动画结束后的最终状态（如 `opacity` 或 `hidden` 属性）。

---

## 3. 测试用例设计 (Test Cases)

### 3.1 模块：图鉴列表页 (Home)

| ID | 测试点 | 验证方式 | 预期结果 |
| :--- | :--- | :--- | :--- |
| **H-Auto-001** | **属性标签渲染** | E2E | 获取 `type-badge` 组件，验证其是否包含新版样式类名（如 `.type-fire`）或内联样式正确。 |
| **H-Auto-002** | **属性颜色正确性** | E2E | 验证特定属性（如“火”）的 Badge 背景色是否为预期的 `#F08030`（或对应色值）。 |

### 3.2 模块：图鉴详情页 (Detail)

| ID | 测试点 | 验证方式 | 预期结果 |
| :--- | :--- | :--- | :--- |
| **D-Auto-001** | **闪光按钮存在性** | E2E | 验证页面是否存在新的 `.shiny-toggle` 按钮（或包含 ✨ 图标的元素）。 |
| **D-Auto-002** | **形态切换逻辑** | E2E | 1. 点击切换按钮。<br>2. 验证图片 `src` 变更为闪光形态 URL。<br>3. 再次点击，验证切回普通形态。 |
| **D-Auto-003** | **触感反馈调用** | **Mock** | 1. 注入 `wx.vibrateShort` 的 Mock。<br>2. 触发切换。<br>3. 断言 Mock 函数被调用，参数为 `{ type: 'light' }`。 |
| **D-Auto-004** | **按钮状态样式** | E2E | 验证点击后，切换按钮是否增加了“激活”状态类名（如 `.active` 或 `.is-shiny`）。 |

---

## 4. 实施计划 (Implementation)

1.  **Refactor**: 由于 UI 结构变化，需先运行 V1.0 测试脚本，修复因 DOM 变更导致的 failures。
2.  **Mock Setup**: 配置 Jest 的 `beforeAll` 以支持 `miniProgram.mockWxMethod`。
3.  **New Scripts**: 编写 `detail-v1.1.spec.js` 覆盖上述 D-Auto-001 至 004。

## 5. 验收标准
*   所有新增 V1.1 测试用例 **PASS**。
*   原有 V1.0 测试用例（Home/Detail 核心流程） **PASS**。
