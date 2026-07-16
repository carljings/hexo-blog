# 📝 myblog — Hexo 个人博客

> 已部署至 [carljings.top/blog](https://carljings.top/blog)

## 技术栈
- Hexo 静态博客框架
- 主题：NexT / Live2D
- 本地搜索

## 目录结构
- `2024/` `2026/` — 年度文章归档
- `about/` — 关于页
- `archives/` — 归档索引
- `categories/` `tags/` — 分类与标签
- `css/` `js/` — 静态资源
- `img/` — 图片资源
- `local-search.xml` — 搜索索引

## 部署
nginx 直接托管静态文件：
```nginx
location /blog {
    alias /etc/nginx/myblog/;
    index index.html;
}
```
