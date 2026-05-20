import { jsonCmsAdapter } from "@/lib/cms/json-adapter";
import type { CmsAdapter } from "@/lib/cms/adapter";

/** Single entry point — change to sanity adapter when CMS is connected */
export function getCms(): CmsAdapter {
  return jsonCmsAdapter;
}
