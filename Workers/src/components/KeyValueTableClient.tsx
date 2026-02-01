"use client";

import { useMemo, useState } from "react";

type Row = { key: string; value: string };

export function KeyValueTableClient(props: { rows: Row[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return props.rows;
    return props.rows.filter((r) => `${r.key} ${r.value}`.toLowerCase().includes(q));
  }, [props.rows, query]);

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/40">
      <div className="flex items-center gap-3 border-b border-zinc-800 px-4 py-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索参数"
          className="w-full rounded-md border border-zinc-700 bg-zinc-950/40 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none"
        />
        <div className="shrink-0 text-xs text-zinc-500">{filtered.length}</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-left text-xs text-zinc-400">
              <th className="w-[320px] px-4 py-2 font-medium">参数</th>
              <th className="px-4 py-2 font-medium">值</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {filtered.map((r) => (
              <tr key={r.key} className="align-top hover:bg-zinc-900/60">
                <td className="px-4 py-2 font-mono text-[12px] text-zinc-200">{r.key}</td>
                <td className="px-4 py-2 font-mono text-[12px] text-zinc-50 whitespace-pre-wrap break-words">{r.value}</td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-4 py-8 text-center text-sm text-zinc-500">
                  无匹配项
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

