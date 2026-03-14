import instanceConfig from "../../instance.config.mjs";

export function getSiteUrl() {
  return import.meta.env.PUBLIC_SITE_URL || "https://example.com";
}

export function getCanonicalUrl(pathname: string) {
  const site = new URL(getSiteUrl());
  const basePath = instanceConfig.mount.basePath === "/" ? "" : instanceConfig.mount.basePath;
  return new URL(`${basePath}${pathname}`.replace(/\/{2,}/g, "/"), site).toString();
}

export function withBasePath(pathname: string) {
  const basePath = import.meta.env.BASE_URL || "/";
  const normalizedBase = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
  return `${normalizedBase}${pathname}`.replace(/\/{2,}/g, "/") || "/";
}
