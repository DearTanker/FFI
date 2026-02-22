'use client';

import { useMemo, useState } from 'react';
import { Icon, GroupHeader } from './Icon';
import { FieldLabel } from './FieldLabel';
import {
  BS_PAGE_ORDER,
  BS_PAGE_METADATA,
  BS_GROUP_ORDER,
  BS_GROUP_METADATA,
  BS_FIELD_ORDER,
  getBsPageFields,
  getBsFieldMetadata,
} from '@/lib/bsFieldMap';
import { tField, tGroup, tPage, tUI, tValue } from '@/lib/i18n';
import { getFieldWikiUrl } from '@/lib/fieldTooltips';

interface BsFilamentDetailsProps {
  data: Record<string, any>;
  rawData?: Record<string, any>;
  className?: string;
}

const CodeIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

/**
 * BambuStudio Tab/Page/Group structure filament details view
 */
export function BsFilamentDetails({ data, rawData, className = '' }: BsFilamentDetailsProps) {
  const [activePage, setActivePage] = useState<string>(BS_PAGE_ORDER[0]);
  const [expandedFields, setExpandedFields] = useState<Set<string>>(new Set());

  const pageFields = useMemo(() => getBsPageFields(data, activePage), [data, activePage]);

  const groupOrder = BS_GROUP_ORDER[activePage] || [];

  const toggleFieldExpand = (fieldKey: string) => {
    const newSet = new Set(expandedFields);
    if (newSet.has(fieldKey)) {
      newSet.delete(fieldKey);
    } else {
      newSet.add(fieldKey);
    }
    setExpandedFields(newSet);
  };

  const isNilValue = (value: any): boolean => {
    if (value === undefined || value === null) return true;
    if (Array.isArray(value)) {
      return value.length === 0 || String(value[0]) === 'nil';
    }
    return String(value) === 'nil';
  };

  // Setting Overrides 页面需要覆盖复选框
  const isOverridePage = activePage === 'bs-overrides';

  const formatJsonValue = (value: any): string => {
    if (value === undefined || value === null) return '';
    if (Array.isArray(value)) {
      const v = value.length > 0 ? String(value[0]) : '';
      if (v === 'nil') return '';
      return tValue(v);
    }
    if (String(value) === 'nil') return '';
    return tValue(String(value));
  };

  const renderListValueBox = (value: any) => {
    const items = Array.isArray(value) ? value.filter((v: any) => v && String(v) !== 'nil') : [];
    if (items.length === 0) {
      return (
        <div className="flex items-center h-8 rounded-md border border-zinc-700 bg-zinc-950/40 px-3 pr-8 overflow-hidden">
          <span className="text-sm text-zinc-600">—</span>
        </div>
      );
    }
    return (
      <div className="rounded-md border border-zinc-700 bg-zinc-950/40 px-3 py-2 pr-8 space-y-1">
        {items.map((item: any, i: number) => (
          <div key={i} className="text-sm text-zinc-100">{String(item)}</div>
        ))}
      </div>
    );
  };

  const renderOverrideCheckbox = (isOverridden: boolean) => {
    if (!isOverridePage) return null;
    return (
      <div className={`flex h-5 w-5 items-center justify-center rounded border shrink-0 mr-2 ${isOverridden ? 'border-emerald-500 bg-emerald-500' : 'border-zinc-600 bg-zinc-800/60'}`}>
        {isOverridden && (
          <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 6l3 3 5-5" />
          </svg>
        )}
      </div>
    );
  };

  const renderNilValueBox = (unit?: string) => {
    return (
      <div className="flex items-center h-8 rounded-md border border-zinc-700/50 bg-zinc-950/20 px-3 pr-8 overflow-hidden opacity-50">
      </div>
    );
  };

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
      if (!value) {
        return (
          <div className="flex items-center h-8 rounded-md border border-zinc-700 bg-zinc-950/40 px-3 pr-8 overflow-hidden">
            <span className="text-sm text-zinc-600">—</span>
          </div>
        );
      }
      return (
        <textarea
          readOnly
          value={value}
          rows={1}
          style={{ fieldSizing: 'content' } as React.CSSProperties}
          className="w-full min-h-[2rem] resize-none rounded-md border border-zinc-700 bg-zinc-950/40 px-3 py-2 pr-8 font-mono text-[12px] text-zinc-100 focus:outline-none overflow-hidden"
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

  const renderJsonCode = (fieldKey: string, rawValue: any, onToggle: () => void) => {
    const jsonSnippet = `"${fieldKey}": ${JSON.stringify(rawValue, null, 2)}`;
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
          title={tUI('back_to_value')}
        >
          <CodeIcon />
        </button>
      </div>
    );
  };

  const renderGroupFields = (groupId: string, fields: Record<string, any[]>) => {
    const fieldOrder = BS_FIELD_ORDER[groupId];
    const orderedKeys: string[] = fieldOrder
      ? fieldOrder.filter((k) => fields[k])
      : Object.keys(fields);

    const renderedPairs = new Set<string>();
    const elements: JSX.Element[] = [];

    for (const fieldKey of orderedKeys) {
      const fieldValues = fields[fieldKey];
      const field = Array.isArray(fieldValues) ? fieldValues[0] : fieldValues;
      if (!field) continue;

      const meta = getBsFieldMetadata(fieldKey);
      const fieldNil = isNilValue(field.value);
      const displayValue = formatJsonValue(field.value);

      // Paired fields
      if (field.paired) {
        const pairKey = field.paired.pairKey;
        if (renderedPairs.has(pairKey)) continue;
        renderedPairs.add(pairKey);

        const isLeft = field.paired.pairPosition === 'left';
        const leftKey = isLeft ? fieldKey : orderedKeys.find((k) => {
          const m = getBsFieldMetadata(k);
          return m?.paired?.pairKey === pairKey && m?.paired?.pairPosition === 'left';
        });
        const rightKey = !isLeft ? fieldKey : orderedKeys.find((k) => {
          const m = getBsFieldMetadata(k);
          return m?.paired?.pairKey === pairKey && m?.paired?.pairPosition === 'right';
        });

        if (!leftKey || !rightKey) continue;

        const leftField = Array.isArray(fields[leftKey]) ? fields[leftKey][0] : fields[leftKey];
        const rightField = Array.isArray(fields[rightKey]) ? fields[rightKey][0] : fields[rightKey];
        if (!leftField || !rightField) continue;

        const leftNil = isNilValue(leftField.value);
        const rightNil = isNilValue(rightField.value);
        const pairNil = leftNil && rightNil;
        const leftValue = formatJsonValue(leftField.value);
        const rightValue = formatJsonValue(rightField.value);
        const leftExpanded = expandedFields.has(leftKey);
        const rightExpanded = expandedFields.has(rightKey);
        const leftRawValue = rawData ? rawData[leftKey] : leftField.value;
        const rightRawValue = rawData ? rawData[rightKey] : rightField.value;

        elements.push(
          <div key={pairKey} className="py-1.5">
            <div className="grid grid-cols-[200px,auto,1fr,auto,1fr] items-center gap-2">
              <div className="min-w-0 flex items-start">
                {renderOverrideCheckbox(!pairNil)}
                <div className="min-w-0">
                  <div className="text-sm break-words"><FieldLabel label={field.paired.pairLabel} fieldKey={leftKey} wikiUrl={getFieldWikiUrl(leftKey)} /></div>
                </div>
              </div>
              <div className="text-xs text-zinc-500 shrink-0">{field.paired.pairLeftLabel}</div>
              <div className="relative min-w-0">
                {leftExpanded ? (
                  renderJsonCode(leftKey, leftRawValue, () => toggleFieldExpand(leftKey))
                ) : leftNil ? (
                  <>
                    {renderNilValueBox(leftField.unit)}
                    <button onClick={() => toggleFieldExpand(leftKey)} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded hover:bg-zinc-800/30" title={tUI('view_source')}><CodeIcon /></button>
                  </>
                ) : (
                  <>
                    {renderValueBox(leftValue, leftField.unit, leftField.kind)}
                    <button onClick={() => toggleFieldExpand(leftKey)} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded hover:bg-zinc-800/30" title={tUI('view_source')}><CodeIcon /></button>
                  </>
                )}
              </div>
              <div className="text-xs text-zinc-500 shrink-0">{field.paired.pairRightLabel}</div>
              <div className="relative min-w-0">
                {rightExpanded ? (
                  renderJsonCode(rightKey, rightRawValue, () => toggleFieldExpand(rightKey))
                ) : rightNil ? (
                  <>
                    {renderNilValueBox(rightField.unit)}
                    <button onClick={() => toggleFieldExpand(rightKey)} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded hover:bg-zinc-800/30" title={tUI('view_source')}><CodeIcon /></button>
                  </>
                ) : (
                  <>
                    {renderValueBox(rightValue, rightField.unit, rightField.kind)}
                    <button onClick={() => toggleFieldExpand(rightKey)} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded hover:bg-zinc-800/30" title={tUI('view_source')}><CodeIcon /></button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
        continue;
      }

      // Single value field
      const isExpanded = expandedFields.has(fieldKey);
      const rawValue = rawData ? rawData[fieldKey] : field.value;

      elements.push(
        <div key={fieldKey} className="py-1.5">
          {isExpanded ? (
            <div className="grid grid-cols-[200px,1fr] items-start gap-4">
              <div className="min-w-0 pt-1 flex items-start">
                {renderOverrideCheckbox(!fieldNil)}
                <div className="min-w-0">
                  <div className="text-sm break-words"><FieldLabel label={field.label || meta?.label || fieldKey} fieldKey={fieldKey} wikiUrl={getFieldWikiUrl(fieldKey)} /></div>
                </div>
              </div>
              <div className="min-w-0">
                {renderJsonCode(fieldKey, rawValue, () => toggleFieldExpand(fieldKey))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-[200px,1fr] items-center gap-4">
              <div className="min-w-0 flex items-start">
                {renderOverrideCheckbox(!fieldNil)}
                <div className="min-w-0">
                  <div className="text-sm break-words"><FieldLabel label={field.label || meta?.label || fieldKey} fieldKey={fieldKey} wikiUrl={getFieldWikiUrl(fieldKey)} /></div>
                </div>
              </div>
              <div className="relative min-w-0">
                {fieldNil ? renderNilValueBox(field.unit) : field.kind === 'list' ? renderListValueBox(field.value) : renderValueBox(displayValue, field.unit, field.kind)}
                <button
                  onClick={() => toggleFieldExpand(fieldKey)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded hover:bg-zinc-800/30"
                  title={tUI('view_source')}
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
    <div className={`rounded-lg border border-zinc-800 bg-zinc-900/40 ${className}`}>
      {/* Page Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-800 px-4 py-3 overflow-x-auto">
        {BS_PAGE_ORDER.map((pageId) => {
          const meta = BS_PAGE_METADATA[pageId];
          const isActive = pageId === activePage;
          return (
            <button
              key={pageId}
              onClick={() => setActivePage(pageId)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
                ${
                  isActive
                    ? 'bg-sky-600/20 border border-sky-500/50 text-sky-300'
                    : 'hover:bg-zinc-800/50 text-zinc-400'
                }
              `}
            >
              <Icon name={meta.iconName as any} size={18} alt={tPage(pageId)} />
              <span className="text-sm font-medium">{tPage(pageId)}</span>
            </button>
          );
        })}
      </div>

      {/* Groups and Fields */}
      <div className="divide-y divide-zinc-800">
        {groupOrder.length === 0 ? (
          <div className="text-center py-6 text-zinc-400">{tUI('page_no_data')}</div>
        ) : (
          groupOrder.map((groupId) => {
            const groupMeta = BS_GROUP_METADATA[groupId];
            const fields = pageFields[groupId] || {};

            if (Object.keys(fields).length === 0) return null;

            return (
              <div key={groupId}>
                {/* Group Header */}
                <div className="px-4 py-2.5 bg-zinc-800/30">
                  <div className="flex items-center gap-3">
                    {groupMeta?.iconName && (
                      <Icon name={groupMeta.iconName as any} size={20} alt={tGroup(groupId)} />
                    )}
                    <h3 className="text-sm font-semibold text-zinc-200">{tGroup(groupId)}</h3>
                  </div>
                </div>

                {/* Fields */}
                <div className="pl-12 pr-4 py-2 space-y-0">
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
