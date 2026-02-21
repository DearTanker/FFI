import { FilamentNav } from "@/components/FilamentNav";

/** 构建时生成北京时间版本号 (UTC+8) */
const BUILD_VERSION = (() => {
  const now = new Date();
  const beijing = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  const Y = beijing.getUTCFullYear();
  const M = String(beijing.getUTCMonth() + 1).padStart(2, "0");
  const D = String(beijing.getUTCDate()).padStart(2, "0");
  const h = String(beijing.getUTCHours()).padStart(2, "0");
  const m = String(beijing.getUTCMinutes()).padStart(2, "0");
  return `${Y}.${M}.${D}.${h}${m}`;
})();

export function FilamentsShell(props: { vendor?: string; type?: string; series?: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <div className="mx-auto w-full max-w-7xl flex flex-1">
        <FilamentNav vendor={props.vendor} type={props.type} series={props.series} />
        <main className="flex-1 p-4 sm:p-6 overflow-auto">{props.children}</main>
      </div>
      <footer className="border-t border-zinc-800 bg-zinc-950/80 py-4 px-6 text-xs text-zinc-500 flex items-center justify-between max-w-7xl mx-auto w-full">
        <span className="text-zinc-600">v{BUILD_VERSION}</span>
        <span>
          Based on{" "}
          <a href="https://github.com/OrcaSlicer/OrcaSlicer" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-200 transition-colors">
            OrcaSlicer
          </a>
          {" · Powered by "}
          <a href="https://github.com/DearTanker/FFI" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-200 transition-colors">
            GitHub
          </a>
          {" & "}
          <a href="https://workers.cloudflare.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-200 transition-colors">
            Cloudflare Workers
          </a>
        </span>
      </footer>
    </div>
  );
}

