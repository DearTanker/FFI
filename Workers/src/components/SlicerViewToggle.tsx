'use client';

import Image from 'next/image';
import { tUI } from '@/lib/i18n';

export type SlicerView = 'orca' | 'bambu';

interface SlicerViewToggleProps {
  value: SlicerView;
  onChange: (view: SlicerView) => void;
}

/**
 * OrcaSlicer / BambuStudio 视图切换按钮
 * Toggle 样式，带有各自的图标
 */
export function SlicerViewToggle({ value, onChange }: SlicerViewToggleProps) {
  return (
    <div className="inline-flex rounded-lg border border-zinc-700 bg-zinc-900/60 p-0.5">
      <button
        onClick={() => onChange('orca')}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
          ${value === 'orca'
            ? 'bg-[#009789]/15 border border-[#009789]/50 shadow-sm'
            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 border border-transparent'
          }
        `}
      >
        <Image
          src="/icons/logo-orcaslicer.svg"
          alt="OrcaSlicer"
          width={20}
          height={20}
          className="inline-block"
        />
        <span>{tUI('view_orca')}</span>
      </button>
      <button
        onClick={() => onChange('bambu')}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
          ${value === 'bambu'
            ? 'bg-[#00AE42]/15 border border-[#00AE42]/50 shadow-sm'
            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 border border-transparent'
          }
        `}
      >
        <Image
          src="/icons/logo-bambustudio.svg"
          alt="BambuStudio"
          width={20}
          height={20}
          className="inline-block"
        />
        <span>{tUI('view_bambu')}</span>
      </button>
    </div>
  );
}
