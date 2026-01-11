# 后端 1.0 版本交付报告 (Backend Delivery Report)

## 1. 交付概况 (Overview)
*   **版本**: v1.0.0
*   **交付模块**: 宝可梦数据服务 (Pokemon Service)、用户认证服务 (Auth Service)
*   **技术栈**: NestJS + Prisma + PostgreSQL + Docker

## 2. 功能列表 (Features)

### 2.1 基础架构
- [x] **Docker 环境**: 包含 Postgres 15 数据库和 Node.js 后端服务。
- [x] **数据库**: 完整的 Schema 设计 (User, Pokemon) 及索引优化。
- [x] **数据预制**: 已内置 1025 只宝可梦的完整数据 (含中英文名、属性、图片)。

### 2.2 图鉴模块 (Pokemon Module)
- [x] **列表查询**: 支持分页 (`page`, `limit`)。
- [x] **高级筛选**: 支持按属性 (`type`)、世代 (`gen`) 筛选。
- [x] **模糊搜索**: 支持 ID、中文名、英文名混合搜索。
- [x] **详情查询**: 返回这一宝可梦的完整元数据。

### 2.3 认证模块 (User & Auth Module)
- [x] **用户注册**: 用户名/密码注册，密码经 Bcrypt 加密。
- [x] **用户登录**: 凭证校验，返回 JWT Access Token。
- [x] **JWT 鉴权**: 实现了 `JwtStrategy` 和全局/局部 `AuthGuard`。
- [x] **个人信息**: 受保护的 `/auth/profile` 接口。

## 3. 测试指南 (Testing Guide)

### 3.1 环境准备
```bash
cd backend
docker compose up -d
```
*   服务地址: `http://localhost:3000`
*   数据库端口: `5432`

### 3.2 关键测试点
1.  **数据完整性**: 验证 1-1025 号宝可梦是否存在，中文名是否正确。
2.  **搜索准确性**: 测试搜 "皮卡丘"、"25"、"pikachu" 是否都能命中。
3.  **分页逻辑**: 验证 limit 和 page 参数是否有效。
4.  **Token 有效性**:
    *   注册/登录后获取 Token。
    *   访问 `/auth/profile` 带 Token 应返回 200。
    *   不带 Token 或带错误 Token 应返回 401。

## 4. 相关文档
*   **API 接口文档**: `docs/v1.0/api_documentation.md` (最核心参考)
*   **PRD 对照**: `docs/v1.0/1.0版本PRD.md`
