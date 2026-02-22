"use client";

import { useFilamentContext } from "@/context/FilamentContext";
import { getVendors, getTypes, getSeries, getBrandDisplayName } from "@/lib/filaments-client";
import { toSegment } from "@/lib/segments";
import { StaticLink } from "@/components/StaticLink";
import { tUI } from "@/lib/i18n";

export function FilamentNav(props: { vendor?: string; type?: string; series?: string }) {
  const { index, loading, error, refreshing, refresh } = useFilamentContext();
  
  if (error) {
    return (
      <aside className="w-60 shrink-0 border-l border-r border-zinc-800 bg-zinc-900/40 overflow-auto">
         <div className="sticky top-0 border-b border-zinc-800 bg-zinc-950/40 px-4 py-3 backdrop-blur z-10">
           <div className="text-sm font-semibold text-red-400">{tUI('error_load_nav')}</div>
           <div className="mt-1 text-xs text-zinc-500">{tUI('error_retry')}</div>
         </div>
         <div className="p-4 text-xs text-red-400/80 break-all">
            {error.message}
         </div>
      </aside>
    );
  }

  if (loading || !index) {
      return (
        <aside className="w-60 shrink-0 border-l border-r border-zinc-800 bg-zinc-900/40 overflow-auto">
           <div className="sticky top-0 border-b border-zinc-800 bg-zinc-950/40 px-4 py-3 backdrop-blur z-10">
             <div className="text-sm font-semibold">{tUI('nav_filament_settings')}</div>
             <div className="mt-1 text-[10px] text-zinc-500">{tUI('loading')}</div>
           </div>
        </aside>
      );
  }

  const vendors = getVendors(index);

  return (
    <aside className="w-60 shrink-0 border-l border-r border-zinc-800 bg-zinc-900/40 overflow-auto flex flex-col">
      <div className="sticky top-0 border-b border-zinc-800 bg-zinc-950/40 px-4 py-3 backdrop-blur z-10">
        <div className="text-sm font-semibold">{tUI('nav_brands_title')}</div>
        <div className="mt-1 text-[10px] text-zinc-500">{tUI('nav_brands_guide')}</div>
      </div>

      <nav className="px-2 py-2 text-sm">
        <div className="px-2 py-1 text-xs font-medium text-zinc-400">{tUI('nav_section_brand')}</div>
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

      <div className="mt-auto border-t border-zinc-800 px-4 py-3">
        <button
          onClick={refresh}
          disabled={refreshing}
          className="w-full flex items-center justify-center gap-1.5 rounded-md bg-zinc-800/60 px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-700/60 hover:text-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 2v6h-6" />
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
            <path d="M3 22v-6h6" />
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          </svg>
          {refreshing ? tUI('nav_updating') : tUI('nav_update')}
        </button>
      </div>
    </aside>
  );
}
