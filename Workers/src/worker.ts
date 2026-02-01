type Env = {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
};

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
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

    return env.ASSETS.fetch(request);
  }
};

export default worker;
