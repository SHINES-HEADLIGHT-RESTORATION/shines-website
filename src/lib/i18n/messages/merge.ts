import type { SiteMessages } from "@/lib/i18n/messages/types";

export type DeepPartial<T> = T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T extends readonly (infer U)[]
    ? readonly DeepPartial<U>[]
    : T extends object
      ? { [K in keyof T]?: DeepPartial<T[K]> }
      : T;

function mergeValue<T>(base: T, patch: DeepPartial<T> | undefined): T {
  if (patch === undefined) return base;
  if (typeof patch !== "object" || patch === null) return patch as T;
  if (typeof base === "function") return patch as T;
  if (Array.isArray(base)) {
    const patchArr = patch as unknown[];
    if (!Array.isArray(patchArr)) return base;
    return patchArr.map((item, i) =>
      mergeValue(base[i], item as DeepPartial<(typeof base)[number]>),
    ) as T;
  }
  const result = { ...base } as Record<string, unknown>;
  for (const key of Object.keys(patch as object)) {
    const k = key as keyof T;
    const baseVal = base[k];
    const patchVal = (patch as Record<string, unknown>)[key];
    if (patchVal === undefined) continue;
    result[key as string] = mergeValue(baseVal, patchVal as DeepPartial<typeof baseVal>);
  }
  return result as T;
}

/** Overlay translated strings onto the English bundle (same shape, full coverage). */
export function mergeMessages(
  base: SiteMessages,
  patch: DeepPartial<SiteMessages>,
): SiteMessages {
  return mergeValue(base, patch);
}
