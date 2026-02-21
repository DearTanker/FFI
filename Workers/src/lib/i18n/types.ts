/**
 * i18n Type Definitions
 *
 * OrcaSlicer 的映射链：
 *   JSON 参数名 → PrintConfig.cpp 中的 L("English Label") → .po 文件 msgid/msgstr
 *
 * 本项目的映射链：
 *   JSON 参数名 → locales/{locale}.ts 中的 fields[key] → 显示标签
 */

/** 支持的语言 */
export type Locale = 'zh-CN' | 'en';

/** 配对字段标签 */
export interface PairLabels {
  /** 整行标签 */
  label: string;
  /** 左值子标签 */
  left: string;
  /** 右值子标签 */
  right: string;
}

/** 语言包结构 */
export interface LocaleMessages {
  /** 字段标签 — key 为 JSON 参数名 */
  fields: Record<string, string>;

  /** 配对字段标签 — key 为 pairKey */
  pairs: Record<string, PairLabels>;

  /** 分组标签 — key 为 groupId */
  groups: Record<string, string>;

  /** 页签标签 — key 为 pageId */
  pages: Record<string, string>;

  /** 枚举值翻译 — key 为 JSON 中的枚举原始值 */
  values: Record<string, string>;

  /** 字段 tooltip 描述 — key 为 JSON 参数名 */
  tooltips: Record<string, string>;

  /** 通用 UI 文案 */
  ui: Record<string, string>;
}
