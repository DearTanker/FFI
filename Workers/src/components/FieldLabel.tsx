'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { tTooltip } from '@/lib/i18n';

interface FieldLabelProps {
  label: string;
  fieldKey: string;
  wikiUrl?: string;
}

/**
 * 字段标签组件 - 悬浮显示 tooltip 气泡，点击跳转 wiki
 * 气泡内容：1) Wiki链接  2) 参数名  3) 参数描述（i18n）
 */
export function FieldLabel({ label, fieldKey, wikiUrl }: FieldLabelProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const labelRef = useRef<HTMLSpanElement>(null);
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

  const handleClick = useCallback(() => {
    if (wikiUrl) {
      window.open(wikiUrl, '_blank', 'noopener,noreferrer');
    }
  }, [wikiUrl]);

  const hasInteraction = !!(tooltip || wikiUrl);

  return (
    <span
      ref={labelRef}
      className={`relative text-xs break-words ${
        hasInteraction
          ? 'text-zinc-200 cursor-pointer hover:text-blue-400 transition-colors'
          : 'text-zinc-200'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={hasInteraction ? handleClick : undefined}
    >
      {label}
      {showTooltip && tooltip && (
        <span
          className="absolute z-50 left-full top-0 ml-2 w-max max-w-sm px-3 py-2.5 rounded-md border border-zinc-700 bg-zinc-800 shadow-xl text-xs leading-relaxed whitespace-normal pointer-events-none"
        >
          {/* Wiki 链接 */}
          {wikiUrl && (
            <span className="block mb-1.5 text-blue-400 break-all">{wikiUrl}</span>
          )}
          {/* 参数名 */}
          <span className="block mb-1 text-zinc-500 font-mono">{fieldKey}</span>
          {/* 描述 */}
          <span className="block text-zinc-300">{tooltip}</span>
        </span>
      )}
    </span>
  );
}
