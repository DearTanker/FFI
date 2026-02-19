'use client';

import { useMemo, useState } from 'react';
import { Icon, GroupHeader } from './Icon';
import {
  FILAMENT_PAGE_ORDER,
  PAGE_METADATA,
  GROUP_ORDER,
  GROUP_METADATA,
  getPageFields,
  getFieldMetadata,
  FILAMENT_FIELD_MAP,
} from '@/lib/filamentFieldMap';

interface OrcaFilamentDetailsProps {
  data: Record<string, any>;
  rawData?: Record<string, any>; // 原始 JSON 数据
  className?: string;
}

/**
 * 按 OrcaSlicer Tab/Page/Group 结构显示耗材详情
 * 与新的 orcaSlicerStructure 数据模型完全一致
 */
export function OrcaFilamentDetails({ data, rawData, className = '' }: OrcaFilamentDetailsProps) {
  const [activePage, setActivePage] = useState<string>(FILAMENT_PAGE_ORDER[0]);
  const [expandedFields, setExpandedFields] = useState<Set<string>>(new Set());

  const pageFields = useMemo(() => getPageFields(data, activePage), [data, activePage]);

  const currentPageMeta = PAGE_METADATA[activePage];
  const groupOrder = GROUP_ORDER[activePage] || [];

  const toggleFieldExpand = (fieldKey: string) => {
    const newSet = new Set(expandedFields);
    if (newSet.has(fieldKey)) {
      newSet.delete(fieldKey);
    } else {
      newSet.add(fieldKey);
    }
    setExpandedFields(newSet);
  };

  // 格式化 JSON 值以显示
  const formatJsonValue = (value: any): string => {
    if (Array.isArray(value)) {
      return value.length === 1 ? value[0] : JSON.stringify(value);
    }
    return String(value);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Page Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-4 overflow-x-auto">
        {FILAMENT_PAGE_ORDER.map((pageId) => {
          const meta = PAGE_METADATA[pageId];
          const isActive = pageId === activePage;
          return (
            <button
              key={pageId}
              onClick={() => setActivePage(pageId)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
                ${
                  isActive
                    ? 'bg-blue-600/20 border border-blue-500/50 text-blue-300'
                    : 'hover:bg-zinc-800/50 text-zinc-400'
                }
              `}
            >
              <Icon name={meta.iconName as any} size={18} alt={meta.name} />
              <span className="text-sm font-medium">{meta.name}</span>
            </button>
          );
        })}
      </div>

      {/* Page Header */}
      {currentPageMeta && (
        <div className="flex items-center gap-3">
          <Icon name={currentPageMeta.iconName as any} size={32} alt={currentPageMeta.name} />
          <div>
            <h2 className="text-2xl font-bold text-zinc-50">{currentPageMeta.name}</h2>
          </div>
        </div>
      )}

      {/* Groups and Fields */}
      <div className="space-y-4">
        {groupOrder.length === 0 ? (
          <div className="text-center py-6 text-zinc-400">本页暂无配置数据</div>
        ) : (
          groupOrder.map((groupId) => {
            const groupMeta = GROUP_METADATA[groupId];
            const fields = pageFields[groupId] || {};

            // 如果这个 Group 没有字段，跳过它
            if (Object.keys(fields).length === 0) {
              return null;
            }

            return (
              <div key={groupId} className="rounded-lg border border-zinc-800 bg-zinc-900/40 overflow-hidden">
                {/* Group Header with Icon */}
                <div className="border-b border-zinc-800 px-4 py-3 bg-zinc-800/30">
                  <div className="flex items-center gap-3">
                    {groupMeta?.iconName && (
                      <Icon name={groupMeta.iconName as any} size={20} alt={groupMeta?.name || groupId} />
                    )}
                    <h3 className="text-sm font-semibold text-zinc-200">{groupMeta?.name || groupId}</h3>
                  </div>
                </div>

                {/* Fields in Group */}
                <div className="px-4 py-3 space-y-3">
                  {Object.entries(fields).map(([fieldKey, fieldValues]) => {
                    // fieldValues is an array, we take the first one (simplified)
                    const field = Array.isArray(fieldValues) ? fieldValues[0] : fieldValues;
                    if (!field) return null;

                    const meta = getFieldMetadata(fieldKey);
                    const displayValue = String(field.value || '').trim();
                    const isExpanded = expandedFields.has(fieldKey);
                    const rawValue = rawData ? rawData[fieldKey] : field.value;

                    if (!displayValue) return null;

                    // 렌더링 INPUT
                    const renderInput = (value: string, kind: string, unit?: string) => {
                      if (kind === 'bool') {
                        const isChecked = value === '1' || value.toLowerCase() === 'true';
                        return (
                          <div className="flex h-9 items-center">
                            <input 
                              type="checkbox" 
                              disabled 
                              checked={isChecked} 
                              className="h-4 w-4 rounded border-zinc-700 bg-zinc-950/40 text-emerald-500 focus:ring-emerald-500/20" 
                            />
                          </div>
                        );
                      }
                      if (kind === 'multiline') {
                        return (
                          <textarea
                            readOnly
                            value={value}
                            className="min-h-[80px] w-full resize-y rounded-md border border-zinc-700 bg-zinc-950/40 px-3 py-2 font-mono text-[12px] text-zinc-100 focus:outline-none"
                          />
                        );
                      }
                      return (
                        <div className="relative flex h-9 w-full items-center rounded-md border border-zinc-700 bg-zinc-950/40 px-3 focus-within:border-zinc-500">
                          <input
                            readOnly
                            value={value}
                            className="h-full w-full bg-transparent text-sm text-zinc-100 focus:outline-none"
                          />
                          {unit && <div className="ml-2 shrink-0 text-xs text-zinc-500 select-none">{unit}</div>}
                        </div>
                      );
                    };

                    return (
                      <div key={fieldKey} className="py-2">
                        {/* left-right layout */}
                        <div className="grid grid-cols-[200px,1fr] items-start gap-4">
                          {/* Left: Label and Field Key */}
                          <div className="min-w-0">
                            <div className="truncate text-xs text-zinc-200">
                              {field.label || meta?.label || fieldKey}
                            </div>
                            {(field.label || meta?.label) && field.label !== fieldKey ? (
                              <div className="mt-0.5 font-mono text-[10px] text-zinc-500 truncate">
                                {fieldKey}
                              </div>
                            ) : null}
                          </div>

                          {/* Right: Input and Code Icon */}
                          <div className="flex min-w-0 items-start gap-2">
                            {/* Input Field */}
                            <div className="flex-1 min-w-0">
                              {renderInput(displayValue, field.kind, field.unit)}
                            </div>
                            
                            {/* Code Icon Button */}
                            <button
                              onClick={() => toggleFieldExpand(fieldKey)}
                              className="shrink-0 text-zinc-500 hover:text-zinc-300 transition-colors p-1.5 rounded hover:bg-zinc-800/30 mt-0.5"
                              title="查看源代码"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* JSON Source Code Display (below, when expanded) */}
                        {isExpanded && (
                          <div className="mt-2 ml-[200px] bg-black/50 rounded p-2 border border-zinc-700/50">
                            <div className="text-xs text-zinc-400 mb-1">
                              <code className="text-blue-400">&quot;{fieldKey}&quot;</code>
                              <code className="text-zinc-500">: </code>
                            </div>
                            <pre className="text-xs text-zinc-300 overflow-x-auto font-mono">
                              {JSON.stringify(rawValue, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Info Footer */}
      <div className="text-xs text-zinc-500 p-4 rounded-lg bg-zinc-900/30 border border-zinc-800">
        <p>
          📋 本界面按照 OrcaSlicer 的 UI 结构组织，Tab/Page/Group 顺序与官方应用完全一致。
        </p>
      </div>
    </div>
  );
}
