/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_GA4_ID?: string;
  readonly DEPLOY_LOCAL_TARGET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

