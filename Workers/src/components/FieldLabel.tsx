'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface FieldLabelProps {
  label: string;
  fieldKey: string;
  tooltip?: string;
  wikiUrl?: string;
}

/**
 * 字段标签组件 - 悬浮显示 tooltip，点击跳转 wiki
 * 模拟 OrcaSlicer 的交互：hover 显示参数描述，click 打开 wiki
 */
export function FieldLabel({ label, fieldKey, tooltip, wikiUrl }: FieldLabelProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<'bottom' | 'top'>('bottom');
  const labelRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (!tooltip) return;
    timeoutRef.current = setTimeout(() => {
      // 检测是否需要向上弹出
      if (labelRef.current) {
        const rect = labelRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        setTooltipPos(spaceBelow < 160 ? 'top' : 'bottom');
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
      {wikiUrl && (
        <svg className="inline-block ml-1 w-2.5 h-2.5 text-zinc-500 opacity-0 group-hover/label:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 1h7v7M11 1L5 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {showTooltip && tooltip && (
        <span
          className={`absolute z-50 left-0 w-72 px-3 py-2 rounded-md border border-zinc-700 bg-zinc-800 shadow-xl text-xs text-zinc-300 leading-relaxed whitespace-normal pointer-events-none ${
            tooltipPos === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
        >
          {tooltip}
        </span>
      )}
    </span>
  );
}
