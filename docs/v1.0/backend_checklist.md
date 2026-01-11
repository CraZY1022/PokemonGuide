# 后端开发任务清单 (v1.0)

基于 `docs/v1.0/1.0版本PRD.md` 需求文档梳理。

## 1. 基础架构与环境准备
- [ ] **项目初始化**
    - 目标：搭建后端项目脚手架，配置基础环境（Linter, Formatter, Git Hooks）。
    - 依赖：选定的技术栈（Node.js/Python/Go 等）。
- [ ] **数据库环境搭建**
    - 目标：本地及云端数据库实例启动，配置连接池。
- [ ] **公共模块封装**
    - 目标：统一响应格式（Response Wrapper）、全局异常处理（Error Handler）、日志记录（Logger）。

## 2. 数据库设计与数据处理
- [ ] **设计用户数据模型 (User Schema)**
    - 目标：定义用户表结构，包含字段：`id`, `username`, `password_hash`, `created_at`。
    - 约束：用户名唯一性索引。
- [ ] **设计宝可梦数据模型 (Pokemon Schema)**
    - 目标：定义宝可梦表结构，包含字段：`id`, `name_zh`, `name_en`, `gen`, `types` (Array), `image_normal`, `image_shiny` 等。
    - 索引优化：针对 `gen` (世代), `types` (属性), `name_zh` (中文搜索), `id` (编号) 建立索引。
- [ ] **数据采集与清洗 (Data Seeding)**
    - 目标：获取 #0001 - #1025 宝可梦数据（来源 52poke Wiki 或开源数据集）。
    - 任务：编写脚本将原始数据清洗并批量导入数据库。
    - 外部库：爬虫工具或 HTTP Client (如 axios), 数据处理脚本。

## 3. 核心 API 开发：图鉴模块
- [ ] **宝可梦列表接口 (`GET /api/pokemon`)**
    - 目标：支持分页 (Page/Limit)、筛选 (Gen/Type)、搜索 (Keyword) 的综合查询。
    - 逻辑：优先处理筛选 -> 搜索 -> 分页 -> 返回简要信息（ID, Name, Type, Image）。
- [ ] **宝可梦详情接口 (`GET /api/pokemon/:id`)**
    - 目标：返回指定 ID 的完整信息，包含形态图片 URL。
    - 逻辑：根据 ID 查询，若不存在返回 404。

## 4. 核心 API 开发：用户模块
- [ ] **用户注册接口 (`POST /api/auth/register`)**
    - 目标：接收用户名/密码，校验唯一性，加密存储，返回 Token。
    - 安全：密码必须 Hash 存储 (如 bcrypt)。
- [ ] **用户登录接口 (`POST /api/auth/login`)**
    - 目标：校验用户名密码，验证通过签发 JWT Token。
- [ ] **用户信息接口 (`GET /api/user/profile`)**
    - 目标：需鉴权，返回当前用户基本信息。

## 5. 安全与权限控制
- [ ] **鉴权中间件 (Auth Middleware)**
    - 目标：拦截受保护路由，解析 Header 中的 JWT Token，注入 User Context。
- [ ] **输入验证 (Validation)**
    - 目标：对所有接口入参进行校验（如用户名长度、密码强度、分页参数范围）。

## 6. 测试与部署
- [ ] **单元测试 (Unit Tests)**
    - 目标：覆盖核心 Service 逻辑（如登录校验、数据查询构建）。
- [ ] **集成测试 (Integration Tests)**
    - 目标：验证 API 接口端到端流程。
- [ ] **部署脚本编写**
    - 目标：编写 Dockerfile 或部署脚本，确保环境一致性。
