"use client";

import { useFilamentContext } from "@/context/FilamentContext";
import { getVendors, getTypes, getSeries, getBrandDisplayName } from "@/lib/filaments-client";
import { toSegment } from "@/lib/segments";
import { StaticLink } from "@/components/StaticLink";

export function FilamentNav(props: { vendor?: string; type?: string; series?: string }) {
  const { index, loading, error } = useFilamentContext();
  
  if (error) {
    return (
      <aside className="w-60 shrink-0 border-r border-zinc-800 bg-zinc-900/40 overflow-auto">
         <div className="sticky top-0 border-b border-zinc-800 bg-zinc-950/40 px-4 py-3 backdrop-blur z-10">
           <div className="text-sm font-semibold text-red-400">加载失败</div>
           <div className="mt-1 text-xs text-zinc-500">请检查网络或刷新重试</div>
         </div>
         <div className="p-4 text-xs text-red-400/80 break-all">
            {error.message}
         </div>
      </aside>
    );
  }

  if (loading || !index) {
      return (
        <aside className="w-60 shrink-0 border-r border-zinc-800 bg-zinc-900/40 overflow-auto">
           <div className="sticky top-0 border-b border-zinc-800 bg-zinc-950/40 px-4 py-3 backdrop-blur z-10">
             <div className="text-sm font-semibold">耗材丝设置</div>
             <div className="mt-1 text-[10px] text-zinc-500">正在加载...</div>
           </div>
        </aside>
      );
  }

  const vendors = getVendors(index);

  return (
    <aside className="w-60 shrink-0 border-r border-zinc-800 bg-zinc-900/40 overflow-auto">
      <div className="sticky top-0 border-b border-zinc-800 bg-zinc-950/40 px-4 py-3 backdrop-blur z-10">
        <div className="text-sm font-semibold">FDM 3D 打印耗材品牌</div>
        <div className="mt-1 text-[10px] text-zinc-500">耗材 → 耗材类型 → 耗材系列 → 耗材丝设置</div>
      </div>

      <nav className="px-2 py-2 text-sm">
        <div className="px-2 py-1 text-xs font-medium text-zinc-400">品牌</div>
        <div className="space-y-1">
          {vendors.map((v) => {
            const active = v === props.vendor;
            return (
              <StaticLink
                key={v}
                href={`/${toSegment(v)}`}
                className={[
                  "flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-zinc-800/60",
                  active ? "bg-zinc-800/80 text-zinc-50" : "text-zinc-200"
                ].join(" ")}
              >
                <span className="truncate">{getBrandDisplayName(index, v)}</span>
              </StaticLink>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
