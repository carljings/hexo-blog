# 📝 hexo-blog — Hexo 个人博客

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
仓库地址：`https://github.com/carljings/hexo-blog.git`。已有 Git 工作副本可更新拉取地址：

```sh
git remote set-url origin https://github.com/carljings/hexo-blog.git
git fetch origin
```

仓库改名不改变下面的现有部署目录。

nginx 直接托管静态文件：
```nginx
location /blog {
    alias /etc/nginx/myblog/;
    index index.html;
}
```

发布前应核对线上版本，避免用旧快照覆盖较新的站点内容；改名后检查上述线上地址能正常打开。
