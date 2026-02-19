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
  FIELD_ORDER,
} from '@/lib/filamentFieldMap';

interface OrcaFilamentDetailsProps {
  data: Record<string, any>;
  rawData?: Record<string, any>; // 原始 JSON 数据
  className?: string;
}

// 代码图标 SVG
const CodeIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

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
  // OrcaSlicer 始终取数组 index 0 显示耗材参数
  const formatJsonValue = (value: any): string => {
    if (value === undefined || value === null) return '';
    if (Array.isArray(value)) {
      return value.length > 0 ? String(value[0]) : '';
    }
    return String(value);
  };

  // 渲染单个值框
  const renderValueBox = (value: string, unit?: string, kind?: string) => {
    if (kind === 'bool') {
      const isChecked = value === '1' || value.toLowerCase() === 'true';
      return (
        <div className="flex h-8 items-center px-1">
          <div className={`flex h-5 w-5 items-center justify-center rounded border ${isChecked ? 'border-emerald-500 bg-emerald-500' : 'border-zinc-600 bg-zinc-800/60'}`}>
            {isChecked && (
              <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6l3 3 5-5" />
              </svg>
            )}
          </div>
        </div>
      );
    }
    if (kind === 'multiline') {
      return (
        <textarea
          readOnly
          value={value}
          rows={1}
          style={{ fieldSizing: 'content' } as React.CSSProperties}
          className="w-full resize-none rounded-md border border-zinc-700 bg-zinc-950/40 px-3 py-2 font-mono text-[12px] text-zinc-100 focus:outline-none overflow-hidden"
        />
      );
    }
    return (
      <div className="flex items-center h-8 rounded-md border border-zinc-700 bg-zinc-950/40 px-3 pr-8 overflow-hidden">
        <span className={`text-sm truncate ${value ? 'text-zinc-100' : 'text-zinc-600'}`}>{value || '—'}</span>
        {unit && value && <span className="text-xs text-zinc-500 select-none ml-1 shrink-0">{unit}</span>}
      </div>
    );
  };

  // 渲染展开的 JSON 代码
  const renderJsonCode = (fieldKey: string, rawValue: any, onToggle: () => void) => {
    const jsonSnippet = JSON.stringify({ [fieldKey]: rawValue }, null, 2);
    return (
      <div className="relative w-full">
        <textarea
          readOnly
          value={jsonSnippet}
          rows={1}
          style={{ fieldSizing: 'content' } as React.CSSProperties}
          className="w-full resize-none rounded-md border border-zinc-700 bg-zinc-950/40 px-3 py-2 pr-10 font-mono text-[12px] text-blue-400 focus:outline-none overflow-hidden"
        />
        <button
          onClick={onToggle}
          className="absolute right-2 top-1 text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded hover:bg-zinc-800/30"
          title="返回数值"
        >
          <CodeIcon />
        </button>
      </div>
    );
  };

  // 渲染配对行的 JSON 代码（包含两个字段）
  const renderPairedJsonCode = (leftKey: string, rightKey: string, onToggle: () => void) => {
    const leftRaw = rawData ? rawData[leftKey] : data[leftKey];
    const rightRaw = rawData ? rawData[rightKey] : data[rightKey];
    const combined = { [leftKey]: leftRaw, [rightKey]: rightRaw };
    const jsonSnippet = JSON.stringify(combined, null, 2);
    return (
      <div className="relative w-full">
        <textarea
          readOnly
          value={jsonSnippet}
          rows={1}
          style={{ fieldSizing: 'content' } as React.CSSProperties}
          className="w-full resize-none rounded-md border border-zinc-700 bg-zinc-950/40 px-3 py-2 pr-10 font-mono text-[12px] text-blue-400 focus:outline-none overflow-hidden"
        />
        <button
          onClick={onToggle}
          className="absolute right-2 top-1 text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded hover:bg-zinc-800/30"
          title="返回数值"
        >
          <CodeIcon />
        </button>
      </div>
    );
  };

  // 渲染一个 Group 内的所有字段
  const renderGroupFields = (groupId: string, fields: Record<string, any[]>) => {
    const fieldOrder = FIELD_ORDER[groupId];

    // 获取有序的字段 key 列表
    const orderedKeys: string[] = fieldOrder
      ? fieldOrder.filter((k) => fields[k])
      : Object.keys(fields);

    // 追踪已渲染的配对行，避免重复
    const renderedPairs = new Set<string>();
    const elements: JSX.Element[] = [];

    for (const fieldKey of orderedKeys) {
      const fieldValues = fields[fieldKey];
      const field = Array.isArray(fieldValues) ? fieldValues[0] : fieldValues;
      if (!field) continue;

      const meta = getFieldMetadata(fieldKey);
      const displayValue = formatJsonValue(field.value);

      // 处理配对字段
      if (field.paired) {
        const pairKey = field.paired.pairKey;
        if (renderedPairs.has(pairKey)) continue; // 已渲染过这个配对
        renderedPairs.add(pairKey);

        // 找到配对的另一个字段
        const isLeft = field.paired.pairPosition === 'left';
        const leftKey = isLeft ? fieldKey : orderedKeys.find((k) => {
          const m = getFieldMetadata(k);
          return m?.paired?.pairKey === pairKey && m?.paired?.pairPosition === 'left';
        });
        const rightKey = !isLeft ? fieldKey : orderedKeys.find((k) => {
          const m = getFieldMetadata(k);
          return m?.paired?.pairKey === pairKey && m?.paired?.pairPosition === 'right';
        });

        if (!leftKey || !rightKey) continue;

        const leftField = Array.isArray(fields[leftKey]) ? fields[leftKey][0] : fields[leftKey];
        const rightField = Array.isArray(fields[rightKey]) ? fields[rightKey][0] : fields[rightKey];
        if (!leftField || !rightField) continue;

        const leftValue = formatJsonValue(leftField.value);
        const rightValue = formatJsonValue(rightField.value);
        const isExpanded = expandedFields.has(pairKey);

        elements.push(
          <div key={pairKey} className="py-1.5">
            {isExpanded ? (
              <div className="grid grid-cols-[200px,1fr] items-start gap-4">
                <div className="min-w-0 pt-1">
                  <div className="text-xs text-zinc-200 break-words">{field.paired.pairLabel}</div>
                  <div className="mt-0.5 font-mono text-[10px] text-zinc-500 break-all">{leftKey}</div>
                  <div className="font-mono text-[10px] text-zinc-500 break-all">{rightKey}</div>
                </div>
                <div className="min-w-0">
                  {renderPairedJsonCode(leftKey, rightKey, () => toggleFieldExpand(pairKey))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-[200px,auto,1fr,auto,1fr] items-center gap-2">
                {/* 行标签 */}
                <div className="min-w-0">
                  <div className="text-xs text-zinc-200 break-words">{field.paired.pairLabel}</div>
                  <div className="mt-0.5 font-mono text-[10px] text-zinc-500 break-all">{leftKey}</div>
                  <div className="font-mono text-[10px] text-zinc-500 break-all">{rightKey}</div>
                </div>
                {/* 左子标签 */}
                <div className="text-xs text-zinc-500 shrink-0">{field.paired.pairLeftLabel}</div>
                {/* 左值 */}
                <div className="min-w-0">
                  {renderValueBox(leftValue, leftField.unit, leftField.kind)}
                </div>
                {/* 右子标签 */}
                <div className="text-xs text-zinc-500 shrink-0">{field.paired.pairRightLabel}</div>
                {/* 右值 - 带代码按钮 */}
                <div className="relative min-w-0">
                  {renderValueBox(rightValue, rightField.unit, rightField.kind)}
                  <button
                    onClick={() => toggleFieldExpand(pairKey)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded hover:bg-zinc-800/30"
                    title="查看源代码"
                  >
                    <CodeIcon />
                  </button>
                </div>
              </div>
            )}
          </div>
        );
        continue;
      }

      // 单值字段
      const isExpanded = expandedFields.has(fieldKey);
      const rawValue = rawData ? rawData[fieldKey] : field.value;

      elements.push(
        <div key={fieldKey} className="py-1.5">
          {isExpanded ? (
            <div className="grid grid-cols-[200px,1fr] items-start gap-4">
              <div className="min-w-0 pt-1">
                <div className="text-xs text-zinc-200 break-words">{field.label || meta?.label || fieldKey}</div>
                <div className="mt-0.5 font-mono text-[10px] text-zinc-500 break-all">{fieldKey}</div>
              </div>
              <div className="min-w-0">
                {renderJsonCode(fieldKey, rawValue, () => toggleFieldExpand(fieldKey))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-[200px,1fr] items-center gap-4">
              {/* 标签 */}
              <div className="min-w-0">
                <div className="text-xs text-zinc-200 break-words">{field.label || meta?.label || fieldKey}</div>
                <div className="mt-0.5 font-mono text-[10px] text-zinc-500 break-all">{fieldKey}</div>
              </div>
              {/* 值 - 带代码按钮 */}
              <div className="relative min-w-0">
                {renderValueBox(displayValue, field.unit, field.kind)}
                <button
                  onClick={() => toggleFieldExpand(fieldKey)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded hover:bg-zinc-800/30"
                  title="查看源代码"
                >
                  <CodeIcon />
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    return elements;
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

      {/* Groups and Fields */}
      <div className="space-y-4">
        {groupOrder.length === 0 ? (
          <div className="text-center py-6 text-zinc-400">本页暂无配置数据</div>
        ) : (
          groupOrder.map((groupId) => {
            const groupMeta = GROUP_METADATA[groupId];
            const fields = pageFields[groupId] || {};

            if (Object.keys(fields).length === 0) return null;

            return (
              <div key={groupId} className="rounded-lg border border-zinc-800 bg-zinc-900/40 overflow-hidden">
                {/* Group Header */}
                <div className="border-b border-zinc-800 px-4 py-2.5 bg-zinc-800/30">
                  <div className="flex items-center gap-3">
                    {groupMeta?.iconName && (
                      <Icon name={groupMeta.iconName as any} size={20} alt={groupMeta?.name || groupId} />
                    )}
                    <h3 className="text-sm font-semibold text-zinc-200">{groupMeta?.name || groupId}</h3>
                  </div>
                </div>

                {/* Fields */}
                <div className="px-4 py-2 space-y-0">
                  {renderGroupFields(groupId, fields)}
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
