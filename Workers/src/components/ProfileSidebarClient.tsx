"use client";

import { useMemo, useState, useEffect } from "react";
import { StaticLink } from "@/components/StaticLink";
import { toSegment } from "@/lib/segments";

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
  const [enrichedProfiles, setEnrichedProfiles] = useState<ProfileItem[]>(props.profiles);

  // 获取每个 profile 的完整 compatible_printers 信息
  useEffect(() => {
    const fetchPrinterInfo = async () => {
      const updated = await Promise.all(
        props.profiles.map(async (profile) => {
          // 如果已经有 compatiblePrinters，跳过
          if (profile.compatiblePrinters.length > 0) {
            return profile;
          }

          try {
            const path = `Filaments/${props.vendor}/${props.type}/${props.series}/${profile.fileName}`;
            const res = await fetch(`/api/github/content?path=${encodeURIComponent(path)}`);
            if (!res.ok) return profile;

            const data = await res.json() as Record<string, unknown>;
            const printers = data["compatible_printers"];
            const compatiblePrinters = Array.isArray(printers)
              ? printers.map((p) => typeof p === "string" ? p : "").filter(Boolean)
              : [];

            return { ...profile, compatiblePrinters };
          } catch (error) {
            console.error(`Failed to fetch printers for ${profile.fileName}:`, error);
            return profile;
          }
        })
      );
      setEnrichedProfiles(updated);
    };

    fetchPrinterInfo();
  }, [props.vendor, props.type, props.series, props.profiles]);

  const printerOptions = useMemo(() => {
    const all = enrichedProfiles.flatMap((p) => p.compatiblePrinters ?? []);
    return uniqSorted(all);
  }, [enrichedProfiles]);

  const filtered = useMemo(() => {
    if (printer === "__all__") return enrichedProfiles;
    return enrichedProfiles.filter((p) => (p.compatiblePrinters ?? []).includes(printer));
  }, [printer, props.fileName, enrichedProfiles]);

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/40">
      {/* 顶栏：标题 + 返回 + 配置数 + 打印机筛选 */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
        <div className="text-sm font-semibold text-zinc-50">耗材丝设置</div>
        <StaticLink href={`/filaments/${props.vendor}/${props.type}/${props.series}`} className="text-xs text-emerald-400 hover:text-emerald-300">
          返回列表
        </StaticLink>
        <span className="text-xs text-zinc-400">{enrichedProfiles.length} 个配置</span>

        <div className="ml-auto flex items-center gap-2">
          <div className="shrink-0 text-xs text-zinc-400">兼容打印机</div>
          <select
            value={printer}
            onChange={(e) => setPrinter(e.target.value)}
            className="h-8 rounded-md border border-zinc-700 bg-zinc-900 px-2 text-sm text-zinc-100 focus:border-emerald-500 focus:outline-none"
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

      {/* 配置列表 */}
      <div className="flex flex-wrap gap-2 px-4 pb-3">
        {filtered.map((p) => {
          const href = `/filaments/${toSegment(props.vendor)}/${toSegment(props.type)}/${toSegment(props.series)}/${toSegment(p.displayName)}`;
          const active = p.fileName === props.fileName;
          const subtitle = p.compatiblePrinters.length > 0 ? p.compatiblePrinters.join(" · ") : p.fileName;
          return (
            <StaticLink
              key={p.fileName}
              href={href}
              className={[
                "shrink-0 rounded-md px-3 py-2 hover:bg-zinc-800/60 border",
                active ? "bg-zinc-800/80 border-emerald-500/50" : "border-zinc-800",
              ].join(" ")}
            >
              <div className="whitespace-nowrap text-sm font-medium text-zinc-50">{p.displayName}</div>
              <div className="mt-0.5 whitespace-nowrap text-xs text-zinc-400">{subtitle}</div>
            </StaticLink>
          );
        })}
      </div>
    </div>
  );
}

