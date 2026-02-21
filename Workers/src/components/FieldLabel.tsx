'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { tTooltip } from '@/lib/i18n';

interface FieldLabelProps {
  label: string;
  fieldKey: string;
  wikiUrl?: string;
}

/**
 * 字段标签组件 - 悬浮显示纯文本 tooltip 气泡
 * 气泡内容：1) Wiki链接  2) 参数名  3) 参数描述（i18n）
 */
export function FieldLabel({ label, fieldKey, wikiUrl }: FieldLabelProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tooltip = tTooltip(fieldKey);

  const handleMouseEnter = useCallback(() => {
    if (!tooltip) return;
    timeoutRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 300);
  }, [tooltip]);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowTooltip(false);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <span
      className={`relative text-sm break-words ${tooltip ? 'text-zinc-200 cursor-default' : 'text-zinc-200'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {wikiUrl ? (
        <a href={wikiUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 hover:underline transition-colors">{label}</a>
      ) : label}
      {showTooltip && tooltip && (
        <span
          className="absolute z-50 left-full top-0 ml-2 w-max max-w-sm px-3 py-2.5 rounded-md border border-zinc-700 bg-zinc-800 shadow-xl text-xs leading-relaxed whitespace-normal pointer-events-none"
        >
          {wikiUrl && (
            <span className="block mb-1.5 text-zinc-400 break-all">{wikiUrl}</span>
          )}
          <span className="block mb-1 text-zinc-500 font-mono">{fieldKey}</span>
          <span className="block text-zinc-300">{tooltip}</span>
        </span>
      )}
    </span>
  );
}
