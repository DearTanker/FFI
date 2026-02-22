import { FilamentNav } from "@/components/FilamentNav";
import { BUILD_VERSION } from "@/lib/buildInfo";

export function FilamentsShell(props: { vendor?: string; type?: string; series?: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <div className="mx-auto w-full max-w-7xl flex flex-1">
        <FilamentNav vendor={props.vendor} type={props.type} series={props.series} />
        <main className="flex-1 p-4 sm:p-6 overflow-auto border-r border-zinc-800">{props.children}</main>
      </div>
      <footer className="border-t border-zinc-800 bg-zinc-950/80 py-4 px-6 text-xs text-zinc-500 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-1">
          <span className="text-zinc-300">FFI - FDM Filaments Info</span>
          <span className="text-zinc-500">FDM 3D 打印耗材预设参考</span>
        </div>
        <span>
          Based on{" "}
          <a href="https://github.com/OrcaSlicer/OrcaSlicer" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-200 transition-colors">
            OrcaSlicer
          </a>
          {" | Powered by "}
          <a href="https://github.com/DearTanker/FFI" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-200 transition-colors">
            GitHub
          </a>
          {" & "}
          <a href="https://workers.cloudflare.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-200 transition-colors">
            Cloudflare Workers
          </a>
        </span>
        <span className="text-zinc-600">v{BUILD_VERSION}</span>
      </footer>
    </div>
  );
}

