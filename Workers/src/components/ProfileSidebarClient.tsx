"use client";

import { useMemo, useState, useEffect } from "react";
import { StaticLink } from "@/components/StaticLink";
import { toSegment } from "@/lib/segments";
import { tUI } from "@/lib/i18n";

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
    <div className="sticky top-4 rounded-lg border border-zinc-800 bg-zinc-900/40">
      <div className="border-b border-zinc-800 px-4 py-3">
        <div className="text-sm font-semibold text-zinc-50">{tUI('nav_filament_settings')}</div>
        <div className="mt-1 flex items-center justify-between text-xs text-zinc-400">
          <StaticLink href={`/${toSegment(props.vendor)}/${toSegment(props.type)}/${toSegment(props.series)}`} className="text-emerald-400 hover:text-emerald-300">
            {tUI('back_to_list')}
          </StaticLink>
          <span>{tUI('n_profiles', { count: enrichedProfiles.length })}</span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="shrink-0 text-xs text-zinc-400">{tUI('compatible_printers')}</div>
          <select
            value={printer}
            onChange={(e) => setPrinter(e.target.value)}
            className="h-8 w-full rounded-md border border-zinc-700 bg-zinc-900 px-2 text-sm text-zinc-100 focus:border-emerald-500 focus:outline-none"
          >
            <option value="__all__">{tUI('all')}</option>
            {printerOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-2">
        {filtered.map((p) => {
          const href = `/${toSegment(props.vendor)}/${toSegment(props.type)}/${toSegment(props.series)}/${toSegment(p.displayName)}`;
          const active = p.fileName === props.fileName;
          const title = p.displayName.replace(/\s*@.*$/, '') || p.displayName;
          return (
            <StaticLink
              key={p.fileName}
              href={href}
              className={["block rounded-md px-2 py-2 hover:bg-zinc-800/60", active ? "bg-zinc-800/80" : ""].join(" ")}
            >
              <div className="truncate text-sm font-medium text-zinc-50">{title}</div>
              {p.compatiblePrinters.length > 0 ? (
                <div className="mt-0.5 text-xs text-zinc-400 space-y-0.5">
                  {p.compatiblePrinters.map((printer, i) => (
                    <div key={i}>· {printer}</div>
                  ))}
                </div>
              ) : (
                <div className="mt-0.5 text-xs text-zinc-400 break-words">{p.fileName}</div>
              )}
            </StaticLink>
          );
        })}
      </div>
    </div>
  );
}

