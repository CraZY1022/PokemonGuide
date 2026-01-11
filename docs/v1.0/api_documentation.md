# 宝可梦图鉴小程序 API 接口文档 (v1.0)

## 1. 基础说明 (Base Info)

*   **Base URL (Dev)**: `http://localhost:3000`
*   **Base URL (Prod)**: `https://api.yourdomain.com` (待定)
*   **认证方式**: Bearer Token
    *   Header: `Authorization: Bearer <access_token>`

---

## 2. 图鉴模块 (Pokemon)

### 2.1 获取宝可梦列表
获取分页后的宝可梦数据，支持搜索和属性筛选。

*   **URL**: `/pokemon`
*   **Method**: `GET`
*   **Query Parameters**:

| 参数名 | 类型 | 必填 | 说明 | 示例 |
| :--- | :--- | :--- | :--- | :--- |
| `page` | number | 否 | 页码，默认 1 | `1` |
| `limit` | number | 否 | 每页数量，默认 20 | `20` |
| `search` | string | 否 | 搜索关键词 (ID、中文名或英文名) | `皮卡丘` / `25` |
| `gen` | number | 否 | 世代筛选 (1-9) | `1` |
| `type` | string | 否 | 属性筛选 (英文小写) | `electric` |

*   **Response (200 OK)**:

```json
{
  "data": [
    {
      "id": 25,
      "name_zh": "皮卡丘",
      "name_en": "pikachu",
      "gen": 1,
      "types": ["electric"],
      "image_normal": "https://...",
      "image_shiny": "https://..."
    }
  ],
  "meta": {
    "total": 1025,
    "page": 1,
    "limit": 20,
    "totalPages": 52
  }
}
```

### 2.2 获取宝可梦详情
获取指定 ID 的宝可梦详细信息。

*   **URL**: `/pokemon/:id`
*   **Method**: `GET`
*   **Path Parameters**:
    *   `id`: 宝可梦 ID (如 `1`, `25`)
*   **Response (200 OK)**:

```json
{
  "id": 1,
  "name_zh": "妙蛙种子",
  "name_en": "bulbasaur",
  "gen": 1,
  "types": ["grass", "poison"],
  "image_normal": "https://...",
  "image_shiny": "https://...",
  "created_at": "2026-01-11T15:11:58.927Z",
  "updated_at": "2026-01-11T15:11:58.927Z"
}
```

*   **Response (404 Not Found)**:
```json
{
    "message": "Pokemon #9999 not found",
    "error": "Not Found",
    "statusCode": 404
}
```

---

## 3. 用户认证模块 (Auth)

### 3.1 用户注册
注册新用户。

*   **URL**: `/auth/register`
*   **Method**: `POST`
*   **Content-Type**: `application/json`
*   **Body**:

```json
{
  "username": "testuser",
  "password": "password123"
}
```

*   **Response (201 Created)**: 注册成功自动登录，返回 Token。

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsIn..."
}
```

*   **Response (409 Conflict)**: 用户名已存在。

### 3.2 用户登录
已有用户登录。

*   **URL**: `/auth/login`
*   **Method**: `POST`
*   **Content-Type**: `application/json`
*   **Body**:

```json
{
  "username": "testuser",
  "password": "password123"
}
```

*   **Response (201 Created)**: *注：NestJS 默认 Post 返回 201*

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsIn..."
}
```

### 3.3 获取个人信息 (需鉴权)
获取当前登录用户的简要信息。

*   **URL**: `/auth/profile`
*   **Method**: `GET`
*   **Headers**:
    *   `Authorization`: `Bearer <access_token>`
*   **Response (200 OK)**:

```json
{
  "userId": 1,
  "username": "testuser"
}
```

*   **Response (401 Unauthorized)**: Token 无效或过期。
