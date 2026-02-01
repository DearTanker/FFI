"use client";

import { useMemo, useState } from "react";
import { StaticLink } from "@/components/StaticLink";

type ProfileItem = {
  fileName: string;
  displayName: string;
  compatiblePrinters: string[];
};

function uniqSorted(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, "zh-Hans-CN", { numeric: true }));
}

export function ProfileSidebarClient(props: {
  vendor: string;
  type: string;
  series: string;
  fileName: string;
  profiles: ProfileItem[];
}) {
  const [printer, setPrinter] = useState<string>("__all__");

  const printerOptions = useMemo(() => {
    const all = props.profiles.flatMap((p) => p.compatiblePrinters ?? []);
    return uniqSorted(all);
  }, [props.profiles]);

  const filtered = useMemo(() => {
    if (printer === "__all__") return props.profiles;
    const list = props.profiles.filter((p) => (p.compatiblePrinters ?? []).includes(printer));
    const active = props.profiles.find((p) => p.fileName === props.fileName);
    if (!active) return list;
    if (list.some((p) => p.fileName === active.fileName)) return list;
    return [active, ...list];
  }, [printer, props.fileName, props.profiles]);

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/40">
      <div className="border-b border-zinc-800 px-4 py-3">
        <div className="text-sm font-semibold text-zinc-50">耗材丝设置</div>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
          <StaticLink href={`/filaments/${props.vendor}/${props.type}/${props.series}`} className="text-emerald-400 hover:text-emerald-300">
            返回列表
          </StaticLink>
          <span>{props.profiles.length} 个配置</span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="shrink-0 text-xs text-zinc-400">兼容打印机</div>
          <select
            value={printer}
            onChange={(e) => setPrinter(e.target.value)}
            className="h-9 w-full rounded-md border border-zinc-700 bg-zinc-950/40 px-2 text-sm text-zinc-100 focus:border-emerald-500 focus:outline-none"
          >
            <option value="__all__">全部</option>
            {printerOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <div className="shrink-0 text-xs text-zinc-500">{filtered.length}</div>
        </div>
      </div>

      <div className="max-h-[70vh] overflow-auto p-2">
        {filtered.map((p) => {
          const href = `/filaments/${props.vendor}/${props.type}/${props.series}/${p.fileName}`;
          const active = p.fileName === props.fileName;
          const subtitle = p.compatiblePrinters.length > 0 ? p.compatiblePrinters.join(" · ") : p.fileName;
          return (
            <StaticLink
              key={p.fileName}
              href={href}
              className={["block rounded-md px-2 py-2 hover:bg-zinc-800/60", active ? "bg-zinc-800/80" : ""].join(" ")}
            >
              <div className="truncate text-sm font-medium text-zinc-50">{p.displayName}</div>
              <div className="mt-1 truncate text-xs text-zinc-400">{subtitle}</div>
            </StaticLink>
          );
        })}
      </div>
    </div>
  );
}

