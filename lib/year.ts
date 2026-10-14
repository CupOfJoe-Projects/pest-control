import { cacheLife } from "next/cache";

/** Current year, cached so pages can prerender. Refreshes daily. */
export async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
