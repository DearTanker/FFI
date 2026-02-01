import type { AnchorHTMLAttributes } from "react";

function addTrailingSlash(href: string): string {
  if (!href.startsWith("/")) return href;
  if (href === "/") return href;
  if (href.startsWith("/_next/")) return href;

  const hashIndex = href.indexOf("#");
  const beforeHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";

  const queryIndex = beforeHash.indexOf("?");
  const path = queryIndex >= 0 ? beforeHash.slice(0, queryIndex) : beforeHash;
  const query = queryIndex >= 0 ? beforeHash.slice(queryIndex) : "";

  if (path.endsWith("/")) return path + query + hash;
  return path + "/" + query + hash;
}

export function StaticLink(props: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const { href, ...rest } = props;
  return <a href={addTrailingSlash(href)} {...rest} />;
}

