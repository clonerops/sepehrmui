export const generateURLQueryParam = (url: string, objParams: Record<string, any>): string => {
  const objFormatted = Object.fromEntries(
    Object.entries(objParams).filter(([_, v]) => v != null && v !== "")
  );

  if (Object.keys(objFormatted).length === 0) {
    return url;
  }

  const str =
    url +
    "?" +
    Object.keys(objFormatted)
      .map((key) => {
        const value = objFormatted[key];

        if (Array.isArray(value)) {
          return value
            .filter((v) => v !== null && v !== "")
            .map((v) => `${key}=${encodeURIComponent(v)}`)
            .join('&');
        }

        return value === "" || value === null
          ? ""
          : `${key}=${encodeURIComponent(value)}`;
      })
      .filter((param) => param !== "")
      .join("&");

  return str;
};
