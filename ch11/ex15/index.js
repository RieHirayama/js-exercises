export function modifyUrl({ base, addQuery, path }) {
  const url = new URL(base);

  if (typeof path === "string") {
    const resolved = new URL(path, url);
    url.pathname = resolved.pathname;
  }

  if (Array.isArray(addQuery)) {
    for (const [k, v] of addQuery) {
      url.searchParams.append(k, v);
    }
  }

  return url.toString();
}

