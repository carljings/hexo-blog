// 从配置文件中获取 umami 的配置；未启用（umami 为 null）时各项为空
const umami_config = (CONFIG.web_analytics && CONFIG.web_analytics.umami) || {};
const website_id = umami_config.website_id;
// 拼接请求地址
const request_url = umami_config.api_server
  ? `${umami_config.api_server}/websites/${website_id}/stats`
  : "";

const start_time = umami_config.start_time
  ? new Date(umami_config.start_time).getTime()
  : 0;
const end_time = new Date().getTime();
const token = umami_config.token;

// 检查配置是否为空：缺失时静默跳过统计，不在页面控制台抛错
const umami_enabled = Boolean(website_id && request_url && start_time && token);

// 构造请求参数
const params = new URLSearchParams({
  startAt: start_time,
  endAt: end_time,
});
// 构造请求头
const request_header = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-umami-api-key": "oZKCH3msvqt10VlXKwoJvHclmaS4bVx0",
    "Accept": "application/json",
    "Authorization": `Bearer ${token}`,
  },
};

// 接口返回非 JSON（如被网关兜底成 HTML 页面）时返回 null，避免 json() 解析报错
async function readStats(response) {
  if (!response.ok) return null;
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return null;
  return response.json().catch(() => null);
}

// 获取站点统计数据
async function siteStats() {
  try {
    const response = await fetch(`${request_url}?${params}`, request_header);
    const data = await readStats(response);
    if (!data) return "-1";
    const uniqueVisitors = data.visitors.value; // 获取独立访客数
    const pageViews = data.pageviews.value; // 获取页面浏览量

    let pvCtn = document.querySelector("#umami-site-pv-container");
    if (pvCtn) {
      let ele = document.querySelector("#umami-site-pv");
      if (ele) {
        ele.textContent = pageViews; // 设置页面浏览量
        pvCtn.style.display = "inline"; // 将元素显示出来
      }
    }

    let uvCtn = document.querySelector("#umami-site-uv-container");
    if (uvCtn) {
      let ele = document.querySelector("#umami-site-uv");
      if (ele) {
        ele.textContent = uniqueVisitors;
        uvCtn.style.display = "inline";
      }
    }
  } catch (error) {
    console.error(error);
    return "-1";
  }
}

// 获取页面浏览量
async function pageStats(path) {
  try {
    const response = await fetch(`${request_url}?${params}&url=${path}`, request_header);
    const data = await readStats(response);
    if (!data) return "-1";
    const pageViews = data.pageviews.value;

    let viewCtn = document.querySelector("#umami-page-views-container");
    if (viewCtn) {
      let ele = document.querySelector("#umami-page-views");
      if (ele) {
        ele.textContent = pageViews;
        viewCtn.style.display = "inline";
      }
    }
  } catch (error) {
    console.error(error);
    return "-1";
  }
}

if (umami_enabled) siteStats();

// 获取页面容器
let viewCtn = document.querySelector("#umami-page-views-container");
// 如果页面容器存在，则获取页面浏览量
if (umami_enabled && viewCtn) {
  let path = window.location.pathname;
  let target = decodeURI(path.replace(/\/*(index.html)?$/, "/"));
  pageStats(target);
}
