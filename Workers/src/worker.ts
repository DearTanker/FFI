type Env = {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
};

const worker = {
  async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
    const url = new URL(request.url);

    // API: Get GitHub Tree
    if (url.pathname === "/api/github/tree") {
      const cacheUrl = new URL(request.url);
      const cacheKey = new Request(cacheUrl.toString(), request);
      // @ts-ignore
      const cache = caches.default;
      let response = await cache.match(cacheKey);

      if (!response) {
        const ghUrl = "https://api.github.com/repos/DearTanker/FFI/git/trees/main?recursive=1";
        const ghResp = await fetch(ghUrl, {
          headers: {
            "User-Agent": "FDM-Filament-Info-Worker",
            "Accept": "application/vnd.github+json"
          }
        });

        if (!ghResp.ok) {
           return new Response(JSON.stringify({ error: "Failed to fetch from GitHub", status: ghResp.status }), {
             status: ghResp.status,
             headers: { "Content-Type": "application/json" }
           });
        }

        const data = await ghResp.json();
        response = new Response(JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=60" // Cache for 60s
          }
        });
        if (ctx && ctx.waitUntil) {
            ctx.waitUntil(cache.put(cacheKey, response.clone()));
        }
      }
      return response;
    }

    // API: Get GitHub Content (Proxy for raw files)
    if (url.pathname === "/api/github/content") {
      const filePath = url.searchParams.get("path");
      if (!filePath) {
        return new Response("Missing path", { status: 400 });
      }
      // Security: Ensure path starts with Filaments/ and doesn't traverse up
      if (!filePath.startsWith("Filaments/") || filePath.includes("..")) {
         return new Response("Invalid path", { status: 403 });
      }

      const rawUrl = `https://raw.githubusercontent.com/DearTanker/FFI/main/${encodeURI(filePath)}`;
      const resp = await fetch(rawUrl);
      const newResp = new Response(resp.body, resp);
      newResp.headers.set("Access-Control-Allow-Origin", "*");
      return newResp;
    }

    if (url.pathname === "/@vite/client" || url.pathname === "/%40vite/client") {
      return new Response(null, { status: 204 });
    }

    const accept = request.headers.get("accept") ?? "";
    const isNavigate = request.headers.get("sec-fetch-mode") === "navigate" || accept.includes("text/html");
    const isInternalAsset = url.pathname.startsWith("/_next/");
    if (isNavigate && !isInternalAsset && url.pathname !== "/" && !url.pathname.endsWith("/")) {
      const to = new URL(url.pathname + "/" + url.search, url);
      return Response.redirect(to.toString(), 308);
    }

    let response = await env.ASSETS.fetch(request);

    if (response.status === 404) {
      if (url.pathname.startsWith("/filaments/")) {
         const spaUrl = new URL("/filaments/", request.url);
         const spaResponse = await env.ASSETS.fetch(new Request(spaUrl, request));
         if (spaResponse.status === 200) {
            return spaResponse;
         }
      }
    }
    
    return response;
  }
};

export default worker;
