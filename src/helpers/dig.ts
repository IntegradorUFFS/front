export default function dig(
  target: Record<string, any>,
  keys: string | (string | ((params: any) => any))[]
): any {
  let digged: any = target;

  if (typeof keys === "string") {
    return digged?.[keys];
  }

  for (const key of keys) {
    if (typeof digged === "undefined" || digged === null) {
      return undefined;
    }
    if (typeof key === "function") {
      digged = key(digged);
    } else {
      digged = digged[key];
    }
  }

  return digged;
}
