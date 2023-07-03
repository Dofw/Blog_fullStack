/**
 * 配置浏览器本地存储的方式，可直接存储对象数组。
 */
import WebStorageCache from "web-storage-cache"

type CacheType = "localStorage" | "sessionStorage"

export const CACHE_KEY = {
  API_TOKEN: "token"
  // IS_DARK: "isDark",
  // USER: "user",
  // LANG: "lang",
  // THEME: "theme",
  // LAYOUT: "layout",
  // ROLE_ROUTERS: "roleRouters",
  // DICT_CACHE: "dictCache"
}

const simpleCache = {} // 单例模式
export const useCache = (type: CacheType = "localStorage") => {
  let wsCache: WebStorageCache
  if (simpleCache[type]) {
    wsCache = simpleCache[type]
  }

  wsCache = simpleCache[type] = new WebStorageCache({
    storage: type
  })

  return {
    wsCache
  }
}
