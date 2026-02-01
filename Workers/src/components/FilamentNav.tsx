"use client";

import { useFilamentContext } from "@/context/FilamentContext";
import { getVendors, getTypes, getSeries } from "@/lib/filaments-client";
import { toSegment } from "@/lib/segments";
import { StaticLink } from "@/components/StaticLink";

export function FilamentNav(props: { vendor?: string; type?: string; series?: string }) {
  const { index, loading } = useFilamentContext();
  
  if (loading || !index) {
      return (
        <aside className="h-full w-[320px] shrink-0 border-r border-zinc-800 bg-zinc-900/40">
           <div className="sticky top-0 border-b border-zinc-800 bg-zinc-950/40 px-4 py-3 backdrop-blur">
             <div className="text-sm font-semibold">耗材丝设置</div>
             <div className="mt-1 text-xs text-zinc-400">正在加载...</div>
           </div>
        </aside>
      );
  }

  const vendors = getVendors(index);
  const types = props.vendor ? getTypes(index, props.vendor) : [];
  const seriesList = props.vendor && props.type ? getSeries(index, props.vendor, props.type) : [];

  return (
    <aside className="h-full w-[320px] shrink-0 border-r border-zinc-800 bg-zinc-900/40">
      <div className="sticky top-0 border-b border-zinc-800 bg-zinc-950/40 px-4 py-3 backdrop-blur">
        <div className="text-sm font-semibold">耗材丝设置</div>
        <div className="mt-1 text-xs text-zinc-400">耗材 → 耗材类型 → 耗材系列 → 耗材丝设置</div>
      </div>

      <nav className="px-2 py-2 text-sm">
        <div className="px-2 py-1 text-xs font-medium text-zinc-400">耗材</div>
        <div className="space-y-1">
          {vendors.map((v) => {
            const active = v === props.vendor;
            return (
              <StaticLink
                key={v}
                href={`/filaments/${toSegment(v)}`}
                className={[
                  "flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-zinc-800/60",
                  active ? "bg-zinc-800/80 text-zinc-50" : "text-zinc-200"
                ].join(" ")}
              >
                <span className="truncate">{v}</span>
              </StaticLink>
            );
          })}
        </div>

        {props.vendor ? (
          <>
            <div className="mt-4 px-2 py-1 text-xs font-medium text-zinc-400">耗材类型</div>
            <div className="space-y-1">
              {types.map((t) => {
                const active = t === props.type;
                return (
                  <StaticLink
                    key={t}
                    href={`/filaments/${toSegment(props.vendor!)}/${toSegment(t)}`}
                    className={[
                      "flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-zinc-800/60",
                      active ? "bg-zinc-800/80 text-zinc-50" : "text-zinc-200"
                    ].join(" ")}
                  >
                    <span className="truncate">{t}</span>
                  </StaticLink>
                );
              })}
            </div>
          </>
        ) : null}

        {props.vendor && props.type ? (
          <>
            <div className="mt-4 px-2 py-1 text-xs font-medium text-zinc-400">耗材系列</div>
            <div className="space-y-1">
              {seriesList.map((s) => {
                const active = s === props.series;
                return (
                  <StaticLink
                    key={s}
                    href={`/filaments/${toSegment(props.vendor!)}/${toSegment(props.type!)}/${toSegment(s)}`}
                    className={[
                      "flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-zinc-800/60",
                      active ? "bg-zinc-800/80 text-zinc-50" : "text-zinc-200"
                    ].join(" ")}
                  >
                    <span className="truncate">{s}</span>
                  </StaticLink>
                );
              })}
            </div>
          </>
        ) : null}
      </nav>
    </aside>
  );
}
