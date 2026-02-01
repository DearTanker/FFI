"use client";

import { useMemo, useState } from "react";
import type { PresetField, PresetSummary, PresetTab, TabId } from "@/lib/filamentPreset";

function Stat(props: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-zinc-800 bg-zinc-950/30 px-3 py-2">
      <div className="text-[11px] text-zinc-400">{props.label}</div>
      <div className="mt-1 truncate text-sm font-medium text-zinc-50">{props.value || "-"}</div>
    </div>
  );
}

function singleLine(v: string): string {
  return v.replace(/\s*\n\s*/g, " · ").trim();
}

function boolValue(field: PresetField): boolean {
  const s = singleLine(field.value).toLowerCase();
  return s === "1" || s === "true" || s === "yes";
}

function FieldRow(props: { field: PresetField }) {
  const v = props.field.value;
  const kind = props.field.kind;
  const unit = props.field.unit;

  const renderInput = (value: string, kind: string, unit?: string) => {
    if (kind === "bool") {
      const isChecked = singleLine(value).toLowerCase() === "1" || singleLine(value).toLowerCase() === "true" || singleLine(value).toLowerCase() === "yes";
      return (
        <div className="flex h-9 items-center">
          <input type="checkbox" disabled checked={isChecked} className="h-4 w-4 rounded border-zinc-700 bg-zinc-950/40 text-emerald-500 focus:ring-emerald-500/20" />
        </div>
      );
    }
    if (kind === "select") {
      return (
        <div className="flex h-9 w-full items-center justify-between rounded-md border border-zinc-700 bg-zinc-950/40 px-3">
          <span className="text-sm text-zinc-100">{singleLine(value) || "无"}</span>
          <svg className="h-4 w-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      );
    }
    if (kind === "multiline") {
      return (
        <textarea
          readOnly
          value={value}
          className="min-h-[120px] w-full resize-y rounded-md border border-zinc-700 bg-zinc-950/40 px-3 py-2 font-mono text-[12px] text-zinc-100 focus:outline-none"
        />
      );
    }
    return (
      <div className="relative flex h-9 w-full items-center rounded-md border border-zinc-700 bg-zinc-950/40 px-3 focus-within:border-zinc-500">
        <input
          readOnly
          value={singleLine(value)}
          className={[
            "h-full w-full bg-transparent text-sm text-zinc-100 focus:outline-none",
            kind === "number" ? "text-right" : ""
          ].join(" ")}
        />
        {unit && <div className="ml-2 shrink-0 text-xs text-zinc-500 select-none">{unit}</div>}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-[200px,1fr] items-start gap-4 py-1.5">
      <div className="min-w-0">
        <div className="truncate text-xs text-zinc-200">{props.field.label}</div>
        {props.field.label !== props.field.key ? (
          <div className="mt-0.5 flex flex-col gap-0.5 font-mono text-[10px] text-zinc-500">
            <div className="truncate">{props.field.key}</div>
            {props.field.pair?.rightKey && <div className="truncate">{props.field.pair.rightKey}</div>}
          </div>
        ) : null}
      </div>
      {props.field.pair ? (
        <div className="grid min-w-0 grid-cols-2 items-start gap-3">
          <div className="flex min-w-0 items-start gap-2">
            <div className="mt-2 shrink-0 text-[11px] text-zinc-400">{props.field.pair.leftLabel}</div>
            {renderInput(v, kind, undefined)}
          </div>
          <div className="flex min-w-0 items-start gap-2">
            <div className="mt-2 shrink-0 text-[11px] text-zinc-400">{props.field.pair.rightLabel}</div>
            {renderInput(props.field.pair.rightValue, kind, unit)}
          </div>
        </div>
      ) : (
        <div className="flex min-w-0 items-start gap-2">
          {renderInput(v, kind, unit)}
        </div>
      )}
    </div>
  );
}

function SectionBlock(props: { title: string; fields: PresetField[] }) {
  if (props.fields.length === 0) return null;

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/40">
      <div className="border-b border-zinc-800 px-4 py-2 text-xs font-semibold text-zinc-200">{props.title}</div>
      <div className="px-4 py-2">
        {props.fields.map((f) => (
          <FieldRow key={f.key} field={f} />
        ))}
      </div>
    </div>
  );
}

export function PresetDetailsClient(props: { summary: PresetSummary; tabs: PresetTab[] }) {
  const [tab, setTab] = useState<TabId>(props.tabs[0]?.id ?? "filament");
  const [query, setQuery] = useState("");

  const active = useMemo(() => props.tabs.find((t) => t.id === tab) ?? props.tabs[0], [props.tabs, tab]);

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return active?.sections ?? [];
    return (active?.sections ?? [])
      .map((s) => ({
        ...s,
        fields: s.fields.filter((f) => `${f.key} ${f.label} ${f.value}`.toLowerCase().includes(q))
      }))
      .filter((s) => s.fields.length > 0);
  }, [active, query]);

  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="喷嘴温度" value={[props.summary.nozzleTempInitial, props.summary.nozzleTemp].filter(Boolean).join(" → ")} />
        <Stat label="热床温度" value={[props.summary.bedTempInitial, props.summary.bedTemp].filter(Boolean).join(" → ")} />
        <Stat label="流量比 / 体积流量" value={[props.summary.flowRatio, props.summary.maxVolumetricSpeed].filter(Boolean).join(" · ")} />
        <Stat label="直径 / 密度 / 成本" value={[props.summary.diameter, props.summary.density, props.summary.cost].filter(Boolean).join(" · ")} />
      </div>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900/40">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 px-4 py-2">
          <div className="flex flex-wrap gap-1">
            {props.tabs.map((t) => {
              const activeTab = t.id === tab;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={[
                    "rounded-md px-3 py-1.5 text-xs",
                    activeTab ? "bg-zinc-800 text-zinc-50" : "text-zinc-300 hover:bg-zinc-800/60"
                  ].join(" ")}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索"
              className="h-9 w-[260px] max-w-full rounded-md border border-zinc-700 bg-zinc-950/40 px-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none"
            />
            <div className="shrink-0 text-xs text-zinc-500">{filteredSections.reduce((acc, s) => acc + s.fields.length, 0)}</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filteredSections.map((s) => (
          <SectionBlock key={s.id} title={s.label} fields={s.fields} />
        ))}
        {filteredSections.length === 0 ? <div className="text-center text-sm text-zinc-500">无匹配项</div> : null}
      </div>

    </div>
  );
}
