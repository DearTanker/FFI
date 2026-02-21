/**
 * i18n — 多语言模块
 *
 * 使用方式:
 *   import { tField, tGroup, tPage, tPair, tUI, tTooltip } from '@/lib/i18n';
 *
 *   tField('fan_min_speed')              // → '最小风扇速度阈值（风扇速度）'
 *   tGroup('cooling-part-fan')           // → '部件冷却风扇'
 *   tPage('filament-cooling')            // → '冷却'
 *   tPair('fan_min_threshold')           // → { label, left, right }
 *   tValue('Spiral Lift')                // → '螺旋'
 *   tUI('loading')                       // → '正在加载...'
 *
 * 切换语言:
 *   import { setLocale } from '@/lib/i18n';
 *   setLocale('en');
 */

import type { Locale, LocaleMessages, PairLabels } from './types';
import zhCN from './locales/zh-CN';
import en from './locales/en';

// ---- 语言包注册 ----
const messages: Record<Locale, LocaleMessages> = {
  'zh-CN': zhCN,
  en,
};

// ---- 当前语言 ----
let currentLocale: Locale = 'zh-CN';

/** 设置当前语言 */
export function setLocale(locale: Locale): void {
  currentLocale = locale;
}

/** 获取当前语言 */
export function getLocale(): Locale {
  return currentLocale;
}

/** 获取当前语言包 */
function msgs(): LocaleMessages {
  return messages[currentLocale];
}

// ---- 翻译快捷函数 ----

/** 字段标签 — key 为 JSON 参数名 */
export function tField(key: string): string {
  return msgs().fields[key] ?? key;
}

/** 配对字段标签 — key 为 pairKey */
export function tPair(key: string): PairLabels | undefined {
  return msgs().pairs[key];
}

/** 分组标签 — key 为 groupId */
export function tGroup(key: string): string {
  return msgs().groups[key] ?? key;
}

/** 页签标签 — key 为 pageId */
export function tPage(key: string): string {
  return msgs().pages[key] ?? key;
}

/**
 * 枚举值翻译 — 将 JSON 中的英文枚举值翻译为当前语言
 * 如 tValue('Spiral Lift') → '螺旋'
 * 未找到翻译则返回原始值
 */
export function tValue(value: string): string {
  return msgs().values[value] ?? value;
}

/**
 * 字段 tooltip 描述 — 来自 OrcaSlicer PrintConfig.cpp 的 def->tooltip
 * 未找到翻译则返回 undefined
 */
export function tTooltip(key: string): string | undefined {
  return msgs().tooltips[key];
}

/**
 * UI 通用文案
 * 支持占位符 {count} 等，传入 params 即可替换:
 *   tUI('profile_count', { count: 5 })  // → '共 5 个配置'
 */
export function tUI(key: string, params?: Record<string, string | number>): string {
  let text = msgs().ui[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(`{${k}}`, String(v));
    }
  }
  return text;
}

// Re-export types
export type { Locale, LocaleMessages, PairLabels } from './types';
