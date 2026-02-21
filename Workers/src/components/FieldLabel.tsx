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
  const [tooltipPos, setTooltipPos] = useState<'bottom' | 'top'>('bottom');
  const labelRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tooltip = tTooltip(fieldKey);

  const handleMouseEnter = useCallback(() => {
    if (!tooltip) return;
    timeoutRef.current = setTimeout(() => {
      if (labelRef.current) {
        const rect = labelRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        setTooltipPos(spaceBelow < 200 ? 'top' : 'bottom');
      }
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
          className={`absolute z-50 left-0 w-80 px-3 py-2.5 rounded-md border border-zinc-700 bg-zinc-800 shadow-xl text-xs leading-relaxed whitespace-normal pointer-events-none ${
            tooltipPos === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Wiki 链接 */}
          {wikiUrl && (
            <span className="flex items-center gap-1 mb-1.5 text-blue-400 pointer-events-auto">
              <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 1h7v7M11 1L5 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <a
                href={wikiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-blue-300 truncate"
                onClick={(e) => e.stopPropagation()}
              >
                OrcaSlicer Wiki
              </a>
            </span>
          )}
          {/* 参数名 */}
          <span className="block mb-1 text-zinc-500 font-mono select-all">{fieldKey}</span>
          {/* 描述 */}
          <span className="block text-zinc-300">{tooltip}</span>
        </span>
      )}
    </span>
  );
}
