"use client";

import { useMemo, useState } from "react";
import { StaticLink } from "@/components/StaticLink";

type Item = {
  href: string;
  title: string;
  subtitle?: string;
  tags?: string[];
};

export function ProfileListClient(props: { items: Item[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return props.items;
    return props.items.filter((it) => {
      const hay = [it.title, it.subtitle ?? "", ...(it.tags ?? [])].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [props.items, query]);

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/40">
      <div className="flex items-center gap-3 border-b border-zinc-800 px-4 py-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索配置"
          className="w-full rounded-md border border-zinc-700 bg-zinc-950/40 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none"
        />
        <div className="shrink-0 text-xs text-zinc-500">{filtered.length}</div>
      </div>

      <div className="divide-y divide-zinc-800">
        {filtered.map((it) => (
          <StaticLink key={it.href} href={it.href} className="block px-4 py-3 hover:bg-zinc-900/60">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-zinc-50">{it.title}</div>
                {it.subtitle ? <div className="mt-1 truncate text-xs text-zinc-400">{it.subtitle}</div> : null}
              </div>
              {it.tags && it.tags.length > 0 ? (
                <div className="flex max-w-[55%] flex-wrap justify-end gap-1">
                  {it.tags.slice(0, 6).map((t) => (
                    <span
                      key={t}
                      className="rounded border border-zinc-700 bg-zinc-950/30 px-1.5 py-0.5 text-[11px] text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </StaticLink>
        ))}
        {filtered.length === 0 ? <div className="px-4 py-8 text-center text-sm text-zinc-500">无匹配项</div> : null}
      </div>
    </div>
  );
}

