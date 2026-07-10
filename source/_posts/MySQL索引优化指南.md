---
title: MySQL索引优化指南
date: 2026-07-06 16:00:00
tags: [MySQL, 数据库, 性能优化]
categories: [数据库]
---

## 为什么需要索引

索引是数据库性能优化的最重要手段，可以显著加快数据检索速度。

## 索引类型

### B+ 树索引

MySQL 默认的索引类型，适用于大多数查询场景。

```sql
CREATE INDEX idx_name ON users(name);
```

### 全文索引

用于全文搜索：

```sql
CREATE FULLTEXT INDEX idx_content ON articles(content);
```

## 索引优化原则

### 最左前缀原则

联合索引 `(a, b, c)` 可以被以下查询使用：

```sql
SELECT * FROM table WHERE a = 1;
SELECT * FROM table WHERE a = 1 AND b = 2;
SELECT * FROM table WHERE a = 1 AND b = 2 AND c = 3;
```

### 避免索引失效

以下情况会导致索引失效：

```sql
-- 使用函数
SELECT * FROM users WHERE YEAR(create_time) = 2026;

-- 隐式类型转换
SELECT * FROM users WHERE phone = 13800138000;

-- 使用 OR
SELECT * FROM users WHERE name = '张三' OR age = 25;
```

## 执行计划分析

使用 `EXPLAIN` 分析查询：

```sql
EXPLAIN SELECT * FROM users WHERE name = '张三';
```

关键字段：
- **type**: 访问类型（ALL, index, range, ref, eq_ref, const, system）
- **key**: 使用的索引
- **rows**: 预估扫描行数

## 总结

合理创建和使用索引是数据库性能优化的关键，需要在查询性能和维护成本之间找到平衡。
