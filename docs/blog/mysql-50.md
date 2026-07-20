---
title: MySQL 必学 50 题
description: MySQL 经典练习题，涵盖基础查询、聚合函数、连接查询、子查询等核心知识点
date: 2026-07-12
---

# MySQL 必学 50 题

本文整理了 MySQL 学习过程中最经典的 50 道练习题，涵盖基础查询、条件过滤、聚合函数、连接查询、子查询等核心知识点。每道题都配有完整的建表语句和 SQL 示例，适合初学者巩固基础。

## 数据库表结构

### 学生表 (student)

```sql
CREATE TABLE student (
    s_id VARCHAR(10) PRIMARY KEY COMMENT '学生编号',
    s_name VARCHAR(20) NOT NULL COMMENT '学生姓名',
    s_birth VARCHAR(10) NOT NULL COMMENT '出生年月',
    s_sex VARCHAR(10) NOT NULL COMMENT '学生性别'
);

INSERT INTO student VALUES 
('01', '赵雷', '1990-01-01', '男'),
('02', '钱电', '1990-12-21', '男'),
('03', '孙风', '1990-05-20', '男'),
('04', '李云', '1990-08-06', '男'),
('05', '周梅', '1991-12-01', '女'),
('06', '吴兰', '1992-03-01', '女'),
('07', '郑竹', '1989-07-01', '女'),
('08', '王菊', '1990-01-20', '女');
```

### 课程表 (course)

```sql
CREATE TABLE course (
    c_id VARCHAR(10) PRIMARY KEY COMMENT '课程编号',
    c_name VARCHAR(20) NOT NULL COMMENT '课程名称',
    t_id VARCHAR(10) NOT NULL COMMENT '授课教师编号'
);

INSERT INTO course VALUES 
('01', '语文', '02'),
('02', '数学', '01'),
('03', '英语', '03');
```

### 教师表 (teacher)

```sql
CREATE TABLE teacher (
    t_id VARCHAR(10) PRIMARY KEY COMMENT '教师编号',
    t_name VARCHAR(20) NOT NULL COMMENT '教师姓名'
);

INSERT INTO teacher VALUES 
('01', '张三'),
('02', '李四'),
('03', '王五');
```

### 成绩表 (score)

```sql
CREATE TABLE score (
    s_id VARCHAR(10) NOT NULL COMMENT '学生编号',
    c_id VARCHAR(10) NOT NULL COMMENT '课程编号',
    s_score DECIMAL(5,1) COMMENT '分数',
    PRIMARY KEY (s_id, c_id)
);

INSERT INTO score VALUES 
('01', '01', 80),
('01', '02', 90),
('01', '03', 99),
('02', '01', 70),
('02', '02', 60),
('02', '03', 80),
('03', '01', 80),
('03', '02', 80),
('03', '03', 80),
('04', '01', 50),
('04', '02', 30),
('04', '03', 20),
('05', '01', 76),
('05', '02', 87),
('06', '01', 31),
('06', '03', 34),
('07', '02', 89),
('07', '03', 98);
```

---

## 基础查询 (1-10)

### 1. 查询"01"课程比"02"课程成绩高的学生信息及课程分数

```sql
SELECT 
    a.*, 
    b.s_score AS 01_score, 
    c.s_score AS 02_score
FROM student a
JOIN score b ON a.s_id = b.s_id AND b.c_id = '01'
JOIN score c ON a.s_id = c.s_id AND c.c_id = '02'
WHERE b.s_score > c.s_score;
```

### 2. 查询平均成绩大于等于 60 分的学生学号和平均成绩

```sql
SELECT 
    s_id, 
    ROUND(AVG(s_score), 2) AS avg_score
FROM score
GROUP BY s_id
HAVING avg_score >= 60;
```

### 3. 查询所有学生的学号、姓名、选课总数、所有课程的总成绩

```sql
SELECT 
    a.s_id, 
    a.s_name, 
    COUNT(b.c_id) AS course_count, 
    SUM(b.s_score) AS total_score
FROM student a
LEFT JOIN score b ON a.s_id = b.s_id
GROUP BY a.s_id, a.s_name;
```

### 4. 查询姓"李"的老师的数量

```sql
SELECT COUNT(*) AS count_li
FROM teacher
WHERE t_name LIKE '李%';
```

### 5. 查询学过"张三"老师课的学生信息

```sql
SELECT DISTINCT a.*
FROM student a
JOIN score b ON a.s_id = b.s_id
JOIN course c ON b.c_id = c.c_id
JOIN teacher d ON c.t_id = d.t_id
WHERE d.t_name = '张三';
```

### 6. 查询学过"01"且学过"02"课程的学生信息

```sql
SELECT a.*
FROM student a
JOIN score b ON a.s_id = b.s_id AND b.c_id = '01'
JOIN score c ON a.s_id = c.s_id AND c.c_id = '02';
```

### 7. 查询学过"01"但没学过"02"课程的学生信息

```sql
SELECT a.*
FROM student a
LEFT JOIN score b ON a.s_id = b.s_id AND b.c_id = '02'
JOIN score c ON a.s_id = c.s_id AND c.c_id = '01'
WHERE b.s_id IS NULL;
```

### 8. 查询没有学全所有课程的学生信息

```sql
SELECT a.*
FROM student a
LEFT JOIN score b ON a.s_id = b.s_id
GROUP BY a.s_id, a.s_name, a.s_birth, a.s_sex
HAVING COUNT(b.c_id) < (SELECT COUNT(*) FROM course);
```

### 9. 查询与"01"号学生学习的课程完全相同的其他学生信息

```sql
SELECT a.*
FROM student a
JOIN score b ON a.s_id = b.s_id
WHERE a.s_id != '01'
  AND b.c_id IN (SELECT c_id FROM score WHERE s_id = '01')
GROUP BY a.s_id, a.s_name, a.s_birth, a.s_sex
HAVING COUNT(DISTINCT b.c_id) = (SELECT COUNT(*) FROM score WHERE s_id = '01');
```

### 10. 查询没学过"张三"老师讲授的任何课程的学生信息

```sql
SELECT a.*
FROM student a
WHERE a.s_id NOT IN (
    SELECT DISTINCT b.s_id
    FROM score b
    JOIN course c ON b.c_id = c.c_id
    JOIN teacher d ON c.t_id = d.t_id
    WHERE d.t_name = '张三'
);
```

---

## 进阶查询 (11-20)

### 11. 查询两门及以上不及格课程的学生学号，姓名及其平均成绩

```sql
SELECT 
    a.s_id, 
    a.s_name, 
    ROUND(AVG(b.s_score), 2) AS avg_score
FROM student a
JOIN score b ON a.s_id = b.s_id
WHERE b.s_score < 60
GROUP BY a.s_id, a.s_name
HAVING COUNT(*) >= 2;
```

### 12. 查询"01"课程成绩小于 60 的学生，按成绩降序排列

```sql
SELECT 
    a.*, 
    b.s_score
FROM student a
JOIN score b ON a.s_id = b.s_id
WHERE b.c_id = '01' AND b.s_score < 60
ORDER BY b.s_score DESC;
```

### 13. 按平均成绩从高到低显示所有学生的所有课程的成绩以及平均成绩

```sql
SELECT 
    a.s_id,
    a.s_name,
    MAX(CASE WHEN b.c_id = '01' THEN b.s_score END) AS 语文,
    MAX(CASE WHEN b.c_id = '02' THEN b.s_score END) AS 数学,
    MAX(CASE WHEN b.c_id = '03' THEN b.s_score END) AS 英语,
    ROUND(AVG(b.s_score), 2) AS 平均分
FROM student a
LEFT JOIN score b ON a.s_id = b.s_id
GROUP BY a.s_id, a.s_name
ORDER BY 平均分 DESC;
```

### 14. 查询各科成绩最高分、最低分、平均分、及格率、优秀率

```sql
SELECT 
    c.c_id,
    c.c_name,
    MAX(b.s_score) AS 最高分,
    MIN(b.s_score) AS 最低分,
    ROUND(AVG(b.s_score), 2) AS 平均分,
    ROUND(SUM(CASE WHEN b.s_score >= 60 THEN 1 ELSE 0 END) / COUNT(*) * 100, 2) AS 及格率,
    ROUND(SUM(CASE WHEN b.s_score >= 90 THEN 1 ELSE 0 END) / COUNT(*) * 100, 2) AS 优秀率
FROM course c
LEFT JOIN score b ON c.c_id = b.c_id
GROUP BY c.c_id, c.c_name;
```

### 15. 按各科成绩进行排名，显示排名（相同成绩相同名次）

```sql
SELECT 
    a.s_id,
    a.s_name,
    b.c_id,
    b.s_score,
    DENSE_RANK() OVER (PARTITION BY b.c_id ORDER BY b.s_score DESC) AS ranking
FROM student a
JOIN score b ON a.s_id = b.s_id
ORDER BY b.c_id, ranking;
```

### 16. 查询每门课程成绩前三名的学生

```sql
SELECT *
FROM (
    SELECT 
        a.s_id,
        a.s_name,
        b.c_id,
        b.s_score,
        ROW_NUMBER() OVER (PARTITION BY b.c_id ORDER BY b.s_score DESC) AS rn
    FROM student a
    JOIN score b ON a.s_id = b.s_id
) t
WHERE rn <= 3;
```

### 17. 查询学生的总成绩并排名，总成绩相同并列

```sql
SELECT 
    a.s_id,
    a.s_name,
    SUM(b.s_score) AS total_score,
    DENSE_RANK() OVER (ORDER BY SUM(b.s_score) DESC) AS ranking
FROM student a
LEFT JOIN score b ON a.s_id = b.s_id
GROUP BY a.s_id, a.s_name;
```

### 18. 查询不同老师所教课程的平均分，从高到低

```sql
SELECT 
    a.t_id,
    a.t_name,
    c.c_name,
    ROUND(AVG(b.s_score), 2) AS avg_score
FROM teacher a
JOIN course c ON a.t_id = c.t_id
LEFT JOIN score b ON c.c_id = b.c_id
GROUP BY a.t_id, a.t_name, c.c_name
ORDER BY avg_score DESC;
```

### 19. 查询所有课程成绩都大于 80 分的学生信息

```sql
SELECT a.*
FROM student a
WHERE a.s_id IN (
    SELECT s_id
    FROM score
    GROUP BY s_id
    HAVING MIN(s_score) > 80
);
```

### 20. 查询有成绩的学生中，课程数少于 3 门的学生信息

```sql
SELECT a.*
FROM student a
JOIN score b ON a.s_id = b.s_id
GROUP BY a.s_id, a.s_name, a.s_birth, a.s_sex
HAVING COUNT(b.c_id) < 3;
```

---

## 聚合与连接 (21-30)

### 21. 查询每门课程被选修的学生数

```sql
SELECT 
    c.c_id,
    c.c_name,
    COUNT(b.s_id) AS student_count
FROM course c
LEFT JOIN score b ON c.c_id = b.c_id
GROUP BY c.c_id, c.c_name;
```

### 22. 查询出只选修了两门课程的学生学号和姓名

```sql
SELECT 
    a.s_id,
    a.s_name
FROM student a
JOIN score b ON a.s_id = b.s_id
GROUP BY a.s_id, a.s_name
HAVING COUNT(b.c_id) = 2;
```

### 23. 查询同名同姓学生的名单并统计人数

```sql
SELECT 
    s_name, 
    COUNT(*) AS count
FROM student
GROUP BY s_name
HAVING COUNT(*) > 1;
```

### 24. 查询男生和女生的人数

```sql
SELECT 
    s_sex, 
    COUNT(*) AS count
FROM student
GROUP BY s_sex;
```

### 25. 查询名字中含"风"字的学生信息

```sql
SELECT *
FROM student
WHERE s_name LIKE '%风%';
```

### 26. 查询 1990 年出生的学生名单

```sql
SELECT *
FROM student
WHERE s_birth LIKE '1990%';
```

### 27. 查询每门课程分数段人数：[85-100], [70-85), [60-70), [0-60)

```sql
SELECT 
    c.c_id,
    c.c_name,
    SUM(CASE WHEN b.s_score >= 85 THEN 1 ELSE 0 END) AS '[85-100]',
    SUM(CASE WHEN b.s_score >= 70 AND b.s_score < 85 THEN 1 ELSE 0 END) AS '[70-85)',
    SUM(CASE WHEN b.s_score >= 60 AND b.s_score < 70 THEN 1 ELSE 0 END) AS '[60-70)',
    SUM(CASE WHEN b.s_score < 60 THEN 1 ELSE 0 END) AS '[0-60)'
FROM course c
LEFT JOIN score b ON c.c_id = b.c_id
GROUP BY c.c_id, c.c_name;
```

### 28. 查询学过"张三"老师所教课程的学生成绩及课程名称

```sql
SELECT 
    a.s_id,
    a.s_name,
    c.c_name,
    b.s_score
FROM student a
JOIN score b ON a.s_id = b.s_id
JOIN course c ON b.c_id = c.c_id
JOIN teacher d ON c.t_id = d.t_id
WHERE d.t_name = '张三';
```

### 29. 查询任意一门课程成绩在 70 分以上的学生姓名、课程名、分数

```sql
SELECT 
    a.s_name,
    c.c_name,
    b.s_score
FROM student a
JOIN score b ON a.s_id = b.s_id
JOIN course c ON b.c_id = c.c_id
WHERE b.s_score > 70;
```

### 30. 查询有挂科（成绩 < 60）的课程信息及挂科人数

```sql
SELECT 
    c.c_id,
    c.c_name,
    COUNT(*) AS fail_count
FROM course c
JOIN score b ON c.c_id = b.c_id
WHERE b.s_score < 60
GROUP BY c.c_id, c.c_name;
```

---

## 子查询与高级 (31-40)

### 31. 查询课程编号为"02"且成绩在 80 分以上的学生学号和姓名

```sql
SELECT 
    a.s_id,
    a.s_name
FROM student a
JOIN score b ON a.s_id = b.s_id
WHERE b.c_id = '02' AND b.s_score >= 80;
```

### 32. 查询每门课程的选修人数

```sql
SELECT 
    c.c_id,
    c.c_name,
    COUNT(b.s_id) AS student_count
FROM course c
LEFT JOIN score b ON c.c_id = b.c_id
GROUP BY c.c_id, c.c_name;
```

### 33. 查询选修"张三"老师课且成绩最高的学生信息及成绩

```sql
SELECT 
    a.*,
    b.s_score
FROM student a
JOIN score b ON a.s_id = b.s_id
JOIN course c ON b.c_id = c.c_id
JOIN teacher d ON c.t_id = d.t_id
WHERE d.t_name = '张三'
ORDER BY b.s_score DESC
LIMIT 1;
```

### 34. 查询不同课程成绩相同的学生的学号、课程号、成绩

```sql
SELECT DISTINCT 
    a.s_id,
    a.c_id,
    a.s_score
FROM score a
JOIN score b ON a.s_id = b.s_id AND a.c_id != b.c_id AND a.s_score = b.s_score;
```

### 35. 统计每门课各分数段人数（用 CASE WHEN）

```sql
SELECT 
    c.c_name,
    SUM(CASE WHEN b.s_score >= 90 THEN 1 ELSE 0 END) AS '优秀(>=90)',
    SUM(CASE WHEN b.s_score >= 80 AND b.s_score < 90 THEN 1 ELSE 0 END) AS '良好(80-89)',
    SUM(CASE WHEN b.s_score >= 70 AND b.s_score < 80 THEN 1 ELSE 0 END) AS '中等(70-79)',
    SUM(CASE WHEN b.s_score >= 60 AND b.s_score < 70 THEN 1 ELSE 0 END) AS '及格(60-69)',
    SUM(CASE WHEN b.s_score < 60 THEN 1 ELSE 0 END) AS '不及格(<60)'
FROM course c
LEFT JOIN score b ON c.c_id = b.c_id
GROUP BY c.c_id, c.c_name;
```

### 36. 查询平均成绩大于等于 85 的所有学生学号、姓名、平均成绩

```sql
SELECT 
    a.s_id,
    a.s_name,
    ROUND(AVG(b.s_score), 2) AS avg_score
FROM student a
JOIN score b ON a.s_id = b.s_id
GROUP BY a.s_id, a.s_name
HAVING avg_score >= 85;
```

### 37. 查询课程名称为"数学"且分数低于 60 的学生姓名和分数

```sql
SELECT 
    a.s_name,
    b.s_score
FROM student a
JOIN score b ON a.s_id = b.s_id
JOIN course c ON b.c_id = c.c_id
WHERE c.c_name = '数学' AND b.s_score < 60;
```

### 38. 查询所有学生的课程及分数（存在学生没成绩，没成绩显示 NULL）

```sql
SELECT 
    a.s_id,
    a.s_name,
    c.c_name,
    b.s_score
FROM student a
LEFT JOIN score b ON a.s_id = b.s_id
LEFT JOIN course c ON b.c_id = c.c_id;
```

### 39. 查询各科成绩前两名的学生

```sql
SELECT *
FROM (
    SELECT 
        a.s_id,
        a.s_name,
        b.c_id,
        c.c_name,
        b.s_score,
        ROW_NUMBER() OVER (PARTITION BY b.c_id ORDER BY b.s_score DESC) AS rn
    FROM student a
    JOIN score b ON a.s_id = b.s_id
    JOIN course c ON b.c_id = c.c_id
) t
WHERE rn <= 2;
```

### 40. 查询至少选修两门课程的学生学号

```sql
SELECT s_id
FROM score
GROUP BY s_id
HAVING COUNT(*) >= 2;
```

---

## 综合应用 (41-50)

### 41. 查询同性别学生数量

```sql
SELECT 
    s_sex, 
    COUNT(*) AS count
FROM student
GROUP BY s_sex;
```

### 42. 查询名字中含"风"字的学生信息

```sql
SELECT *
FROM student
WHERE s_name LIKE '%风%';
```

### 43. 查询学过"01"号课程但没学过"02"号课程的学生信息

```sql
SELECT a.*
FROM student a
JOIN score b ON a.s_id = b.s_id AND b.c_id = '01'
LEFT JOIN score c ON a.s_id = c.s_id AND c.c_id = '02'
WHERE c.s_id IS NULL;
```

### 44. 查询"01"号课程成绩比"02"号课程成绩高的学生信息

```sql
SELECT a.*
FROM student a
JOIN score b ON a.s_id = b.s_id AND b.c_id = '01'
JOIN score c ON a.s_id = c.s_id AND c.c_id = '02'
WHERE b.s_score > c.s_score;
```

### 45. 查询平均成绩大于等于 60 分的学生学号和平均成绩

```sql
SELECT 
    s_id, 
    ROUND(AVG(s_score), 2) AS avg_score
FROM score
GROUP BY s_id
HAVING avg_score >= 60;
```

### 46. 查询所有学生的学号、姓名、选课总数、所有课程总成绩

```sql
SELECT 
    a.s_id,
    a.s_name,
    COUNT(b.c_id) AS course_count,
    IFNULL(SUM(b.s_score), 0) AS total_score
FROM student a
LEFT JOIN score b ON a.s_id = b.s_id
GROUP BY a.s_id, a.s_name;
```

### 47. 查询姓"李"的老师的数量

```sql
SELECT COUNT(*) AS count_li
FROM teacher
WHERE t_name LIKE '李%';
```

### 48. 查询学过"张三"老师课的学生信息

```sql
SELECT a.*
FROM student a
WHERE a.s_id IN (
    SELECT b.s_id
    FROM score b
    JOIN course c ON b.c_id = c.c_id
    JOIN teacher d ON c.t_id = d.t_id
    WHERE d.t_name = '张三'
);
```

### 49. 查询没学过"张三"老师课的学生信息

```sql
SELECT *
FROM student
WHERE s_id NOT IN (
    SELECT DISTINCT b.s_id
    FROM score b
    JOIN course c ON b.c_id = c.c_id
    JOIN teacher d ON c.t_id = d.t_id
    WHERE d.t_name = '张三'
);
```

### 50. 查询学过编号"01"和"02"课程的学生学号、姓名、各科成绩及平均分

```sql
SELECT 
    a.s_id,
    a.s_name,
    MAX(CASE WHEN b.c_id = '01' THEN b.s_score END) AS 语文,
    MAX(CASE WHEN b.c_id = '02' THEN b.s_score END) AS 数学,
    ROUND(AVG(b.s_score), 2) AS 平均分
FROM student a
JOIN score b ON a.s_id = b.s_id
WHERE b.c_id IN ('01', '02')
GROUP BY a.s_id, a.s_name;
```

---

## 总结

以上 50 道题涵盖了 MySQL 核心知识点：

| 知识点 | 题号 |
|--------|------|
| 基础 SELECT | 1, 4, 25, 26 |
| WHERE 条件过滤 | 7, 12, 31, 37 |
| JOIN 连接查询 | 5, 6, 9, 28 |
| GROUP BY 分组 | 2, 3, 11, 21 |
| HAVING 过滤 | 2, 11, 20, 23 |
| 聚合函数 | 14, 27, 35 |
| 子查询 | 8, 10, 19, 48 |
| 窗口函数 | 15, 16, 17, 39 |
| CASE WHEN | 13, 27, 35 |
| LIKE 模糊查询 | 25, 42 |
| 排序与限制 | 12, 33 |

建议按照顺序练习，先理解每个知识点，再尝试自己写出 SQL 语句。
