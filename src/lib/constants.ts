export function getSiteUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "https://cbti.codefather.cn";
}

export const SITE_NAME = "CBTI";
export const AUTHOR_NAME = "程序员鱼皮";
export const AUTHOR_URL = "https://space.bilibili.com/12890453";
export const VIBE_URL = "https://ai.codefather.cn/vibe";
