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
} from '@/lib/filamentFieldMap';

interface OrcaFilamentDetailsProps {
  data: Record<string, any>;
  className?: string;
}

/**
 * 按 OrcaSlicer Tab/Page/Group 结构显示耗材详情
 * 与新的 orcaSlicerStructure 数据模型完全一致
 */
export function OrcaFilamentDetails({ data, className = '' }: OrcaFilamentDetailsProps) {
  const [activePage, setActivePage] = useState<string>(FILAMENT_PAGE_ORDER[0]);

  const pageFields = useMemo(() => getPageFields(data, activePage), [data, activePage]);

  const currentPageMeta = PAGE_METADATA[activePage];
  const groupOrder = GROUP_ORDER[activePage] || [];

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

                    if (!displayValue) return null;

                    return (
                      <div key={fieldKey} className="flex flex-col gap-1 text-sm">
                        <label className="text-[11px] font-medium text-zinc-400">
                          {field.label || meta?.label || fieldKey}
                          {field.unit && <span className="ml-1 text-zinc-500">{field.unit}</span>}
                        </label>
                        {field.kind === 'multiline' ? (
                          <pre className="bg-zinc-950/50 rounded px-2 py-1 text-xs text-zinc-300 overflow-x-auto whitespace-pre-wrap break-words font-mono">
                            {displayValue}
                          </pre>
                        ) : field.kind === 'bool' ? (
                          <div className="text-zinc-100">
                            {displayValue === '1' || displayValue.toLowerCase() === 'true' ? (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs">
                                ✓ 启用
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-700/20 text-zinc-400 text-xs">
                                ○ 禁用
                              </span>
                            )}
                          </div>
                        ) : displayValue.split('\n').length > 1 ? (
                          <textarea
                            className="w-full px-2 py-1 rounded bg-zinc-950/50 text-zinc-100 text-xs border border-zinc-700 resize-none"
                            readOnly
                            rows={Math.min(displayValue.split('\n').length, 5)}
                            value={displayValue}
                          />
                        ) : (
                          <input
                            type="text"
                            className="w-full px-2 py-1 rounded bg-zinc-950/50 text-zinc-100 text-xs border border-zinc-700 focus:border-blue-500 focus:outline-none"
                            readOnly
                            value={displayValue}
                          />
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
