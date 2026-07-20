---
title: TypeScript 实用工具类型详解
description: TypeScript 内置了许多工具类型，能极大提升类型编程效率
date: 2026-07-10
---

# TypeScript 实用工具类型详解

TypeScript 内置了许多工具类型，能极大提升类型编程效率。本文逐一讲解最常用的那些。

## Partial\<T\>

将所有属性变为可选：

```typescript
interface User {
  name: string
  age: number
  email: string
}

// 所有字段可选
type PartialUser = Partial<User>
// 等价于 { name?: string; age?: number; email?: string }

// 实际用途：更新函数
function updateUser(id: string, updates: Partial<User>) {
  // 只传需要更新的字段
}

updateUser('1', { name: '新名字' })
```

## Required\<T\>

将所有属性变为必选：

```typescript
interface Config {
  host?: string
  port?: number
  debug?: boolean
}

// 所有字段必选
type StrictConfig = Required<Config>
// 等价于 { host: string; port: number; debug: boolean }
```

## Pick\<T, K\>

从类型中选取部分属性：

```typescript
interface User {
  name: string
  age: number
  email: string
  avatar: string
}

// 只取 name 和 email
type UserBasic = Pick<User, 'name' | 'email'>
// 等价于 { name: string; email: string }
```

## Omit\<T, K\>

从类型中排除部分属性：

```typescript
// 排除 id 和 createdAt
type CreateUser = Omit<User, 'id' | 'createdAt'>
```

## Record\<K, V\>

构造一个键类型为 K、值类型为 V 的对象类型：

```typescript
// 字典类型
type StringMap = Record<string, number>
// 等价于 { [key: string]: number }

// 枚举映射
type Roles = 'admin' | 'user' | 'guest'
type RolePermissions = Record<Roles, string[]>
```

## Extract\<T, U\> 与 Exclude\<T, U\>

```typescript
type T = 'a' | 'b' | 'c' | 'd'

// Extract - 从 T 中提取可以赋值给 U 的类型
type Extracted = Extract<T, 'a' | 'c'> // 'a' | 'c'

// Exclude - 从 T 中排除可以赋值给 U 的类型
type Excluded = Exclude<T, 'a' | 'c'> // 'b' | 'd'
```

## ReturnType\<T\>

获取函数返回值类型：

```typescript
function createUser() {
  return { id: 1, name: '张三', createdAt: new Date() }
}

type User = ReturnType<typeof createUser>
// 等价于 { id: number; name: string; createdAt: Date }
```

## Parameters\<T\>

获取函数参数类型：

```typescript
function fetchUser(id: string, options: { includeAvatar: boolean }) {
  // ...
}

type FetchUserParams = Parameters<typeof fetchUser>
// 等价于 [string, { includeAvatar: boolean }]
```

## NonNullable\<T\>

排除 null 和 undefined：

```typescript
type MaybeString = string | null | undefined
type DefiniteString = NonNullable<MaybeString> // string
```

## Awaited\<T\>

获取 Promise 的解析类型：

```typescript
type Data = Awaited<Promise<string>> // string
type Nested = Awaited<Promise<Promise<number>>> // number
```

## 实战组合

这些工具类型可以组合使用，非常强大：

```typescript
interface Article {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

// 创建文章：排除自动生成的字段
type CreateArticle = Omit<Article, 'id' | 'createdAt' | 'updatedAt'>

// 更新文章：所有字段可选
type UpdateArticle = Partial<Omit<Article, 'id'>>

// 文章列表项：只取展示需要的字段
type ArticleListItem = Pick<Article, 'id' | 'title' | 'tags' | 'createdAt'>
```

## 总结

| 工具类型 | 用途 |
|----------|------|
| `Partial<T>` | 所有字段可选 |
| `Required<T>` | 所有字段必选 |
| `Pick<T, K>` | 选取部分字段 |
| `Omit<T, K>` | 排除部分字段 |
| `Record<K, V>` | 构造字典类型 |
| `Extract<T, U>` | 提取兼容类型 |
| `Exclude<T, U>` | 排除兼容类型 |
| `ReturnType<T>` | 获取返回值类型 |
| `Parameters<T>` | 获取参数类型 |

善用这些工具类型，能让你的 TypeScript 代码更加健壮和灵活。
