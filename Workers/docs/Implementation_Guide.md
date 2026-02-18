# OrcaSlicer 耗材设置详情页面 - 实现指南

## 📱 项目适配方案

你当前的项目是 Next.js + React + TypeScript + Tailwind CSS 的 Web 应用。以下是将 OrcaSlicer 材料设置页面一比一复刻到你项目中的实现指南。

---

## 🏗️ 推荐的项目结构

```
src/
├── components/
│   ├── PresetDetailsClient.tsx (现有 - 需要扩展)
│   ├── PresetTabs/
│   │   ├── FilamentTab.tsx          (材料页面)
│   │   ├── CoolingTab.tsx            (冷却页面)
│   │   ├── OverridesTab.tsx          (覆盖页面)
│   │   ├── AdvancedTab.tsx           (高级页面)
│   │   ├── MultimaterialTab.tsx      (多材料页面)
│   │   ├── DependenciesTab.tsx       (依赖页面)
│   │   └── NotesTab.tsx              (备注页面)
│   └── FormFields/
│       ├── NumberField.tsx           (数字输入)
│       ├── EnumField.tsx             (下拉选择)
│       ├── BoolField.tsx             (复选框)
│       ├── CodeField.tsx             (代码编辑)
│       ├── ColorField.tsx            (颜色选择)
│       ├── TextField.tsx             (文本输入)
│       ├── SelectorField.tsx         (多选)
│       └── FieldGroup.tsx            (字段分组)
├── hooks/
│   ├── usePresetData.ts             (数据管理)
│   └── useFormValidation.ts         (表单验证)
├── lib/
│   ├── presetSchema.ts              (数据结构定义)
│   └── presetDefaults.ts            (默认值)
└── types/
    └── preset.ts                     (TypeScript类型定义)
```

---

## 🔧 核心类型定义

### types/preset.ts

```typescript
// 字段配置类型
export interface FieldConfig {
  id: string;
  name: string;
  displayName: string;
  type: 'float' | 'int' | 'bool' | 'enum' | 'color' | 'code' | 'text' | 'textarea' | 'selector' | 'range';
  default: any;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  unit?: string;
  options?: string[];
  nullable?: boolean;
  tooltip?: string;
  dependency?: string; // 条件显示
  selectionMode?: 'single' | 'multiple';
  language?: 'gcode' | 'text';
  height?: number;
}

// 分组配置
export interface GroupConfig {
  id: string;
  name: string;
  displayName: string;
  collapsible: boolean;
  fields: FieldConfig[];
  subGroups?: GroupConfig[];
  bedTypes?: BedType[];
}

// 页面配置
export interface PageConfig {
  id: string;
  name: string;
  displayName: string;
  description: string;
  icon: string;
  groups: GroupConfig[];
}

// 预设数据模型
export interface PresetData {
  id: string;
  name: string;
  type: 'filament';
  data: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// 床面类型
export interface BedType {
  id: string;
  name: string;
  displayName: string;
}

// 验证结果
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: Record<string, string>;
}
```

---

## 🎨 Tab 菜单组件

### components/PresetDetailsClient.tsx (修改版)

```typescript
'use client';

import { useState, useMemo } from 'react';
import FilamentTab from './PresetTabs/FilamentTab';
import CoolingTab from './PresetTabs/CoolingTab';
import OverridesTab from './PresetTabs/OverridesTab';
import AdvancedTab from './PresetTabs/AdvancedTab';
import MultimaterialTab from './PresetTabs/MultimaterialTab';
import DependenciesTab from './PresetTabs/DependenciesTab';
import NotesTab from './PresetTabs/NotesTab';
import { PresetData } from '@/types/preset';

interface PresetDetailsSummary {
  id: string;
  name: string;
  [key: string]: any;
}

interface PresetDetailsClientProps {
  summary: PresetDetailsSummary;
  tabs: Array<{
    label: string;
    id: string;
  }>;
}

const TAB_COMPONENTS: Record<string, React.ComponentType<any>> = {
  filament: FilamentTab,
  cooling: CoolingTab,
  overrides: OverridesTab,
  advanced: AdvancedTab,
  multimaterial: MultimaterialTab,
  dependencies: DependenciesTab,
  notes: NotesTab,
};

const TAB_ICONS: Record<string, string> = {
  filament: '🧵',
  cooling: '❄️',
  overrides: '⚙️',
  advanced: '🔧',
  multimaterial: '🎨',
  dependencies: '🔗',
  notes: '📝',
};

export function PresetDetailsClient({ summary, tabs }: PresetDetailsClientProps) {
  const [activeTab, setActiveTab] = useState('filament');
  const [presetData, setPresetData] = useState<PresetData>({
    id: summary.id,
    name: summary.name,
    type: 'filament',
    data: summary,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // Tab 菜单栏
  return (
    <div className="flex flex-col h-full">
      {/* Tab 导航 */}
      <div className="border-b border-zinc-700 bg-zinc-900/50">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-emerald-500 text-emerald-400 bg-zinc-900'
                  : 'text-zinc-400 hover:text-zinc-300'
              }`}
            >
              <span>{TAB_ICONS[tab.id] || '📋'}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 内容区域 */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'filament' && (
          <FilamentTab presetData={presetData} onChange={setPresetData} />
        )}
        {activeTab === 'cooling' && (
          <CoolingTab presetData={presetData} onChange={setPresetData} />
        )}
        {activeTab === 'overrides' && (
          <OverridesTab presetData={presetData} onChange={setPresetData} />
        )}
        {activeTab === 'advanced' && (
          <AdvancedTab presetData={presetData} onChange={setPresetData} />
        )}
        {activeTab === 'multimaterial' && (
          <MultimaterialTab presetData={presetData} onChange={setPresetData} />
        )}
        {activeTab === 'dependencies' && (
          <DependenciesTab presetData={presetData} onChange={setPresetData} />
        )}
        {activeTab === 'notes' && (
          <NotesTab presetData={presetData} onChange={setPresetData} />
        )}
      </div>
    </div>
  );
}
```

---

## 📋 Tab 页面示例

### components/PresetTabs/FilamentTab.tsx

```typescript
'use client';

import { useState } from 'react';
import { PresetData } from '@/types/preset';
import FieldGroup from '../FormFields/FieldGroup';
import NumberField from '../FormFields/NumberField';
import EnumField from '../FormFields/EnumField';
import BoolField from '../FormFields/BoolField';

interface FilamentTabProps {
  presetData: PresetData;
  onChange: (data: PresetData) => void;
}

export default function FilamentTab({ presetData, onChange }: FilamentTabProps) {
  const data = presetData.data;

  const handleFieldChange = (fieldId: string, value: any) => {
    onChange({
      ...presetData,
      data: {
        ...data,
        [fieldId]: value,
      },
    });
  };

  return (
    <div className="space-y-6 p-6 pb-12">
      {/* 基本信息分组 */}
      <FieldGroup title="基本信息" collapsible={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EnumField
            label="耗材类型"
            value={data.filament_type || 'PLA'}
            options={['PLA', 'PETG', 'ABS', 'ASA', 'TPU', 'TPE']}
            onChange={(value) => handleFieldChange('filament_type', value)}
          />
          <NumberField
            label="密度"
            value={data.filament_density || 1.24}
            min={0.5}
            max={2.0}
            step={0.01}
            unit="g/cm³"
            onChange={(value) => handleFieldChange('filament_density', value)}
          />
          <NumberField
            label="直径"
            value={data.filament_diameter || 1.75}
            min={1.0}
            max={4.0}
            step={0.01}
            unit="mm"
            onChange={(value) => handleFieldChange('filament_diameter', value)}
          />
          <NumberField
            label="整卷重量"
            value={data.filament_spool_weight || 1000}
            min={0}
            max={50000}
            unit="g"
            onChange={(value) => handleFieldChange('filament_spool_weight', value)}
          />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <BoolField
            label="可溶性"
            value={data.filament_soluble || false}
            onChange={(value) => handleFieldChange('filament_soluble', value)}
          />
          <BoolField
            label="无边框打印"
            value={data.filament_brimless || false}
            onChange={(value) => handleFieldChange('filament_brimless', value)}
          />
        </div>
      </FieldGroup>

      {/* 流量和压力提前分组 */}
      <FieldGroup title="流量和压力提前" collapsible={true}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NumberField
            label="流量系数"
            value={data.filament_flow_ratio || 1.0}
            min={0.5}
            max={2.0}
            step={0.01}
            unit="%"
            onChange={(value) => handleFieldChange('filament_flow_ratio', value)}
          />
          <NumberField
            label="最大体积速度"
            value={data.filament_volumetric_flow_max || 0}
            min={0}
            max={100}
            unit="mm³/s"
            onChange={(value) => handleFieldChange('filament_volumetric_flow_max', value)}
            tooltip="0 = 无限制"
          />
          <NumberField
            label="PA K值"
            value={data.pressure_advance_k || 0.0}
            min={0.0}
            max={1.0}
            step={0.001}
            precision={3}
            onChange={(value) => handleFieldChange('pressure_advance_k', value)}
          />
          <NumberField
            label="PA N系数"
            value={data.pressure_advance_n_coef || 0.0}
            min={0.0}
            max={2.0}
            step={0.001}
            precision={3}
            onChange={(value) => handleFieldChange('pressure_advance_n_coef', value)}
          />
        </div>

        <div className="mt-4">
          <BoolField
            label="启用自适应PA"
            value={data.enable_pressure_advance_auto || false}
            onChange={(value) => handleFieldChange('enable_pressure_advance_auto', value)}
            tooltip="根据速度自动计算PA"
          />
        </div>
      </FieldGroup>

      {/* 温度设置分组 - 多床面 */}
      <FieldGroup title="温度设置" collapsible={true} note="支持6种不同的床面">
        <div className="space-y-6">
          {/* 喷嘴温度 */}
          <div className="border-l-4 border-emerald-500 pl-4">
            <h4 className="font-semibold text-zinc-50 mb-3">喷嘴温度</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NumberField
                label="标准层温度"
                value={data.temperature || 210}
                min={150}
                max={300}
                unit="°C"
                onChange={(value) => handleFieldChange('temperature', value)}
              />
              <NumberField
                label="初始层最低温度"
                value={data.first_layer_temperature_range_low || 200}
                min={150}
                max={250}
                unit="°C"
                onChange={(value) => handleFieldChange('first_layer_temperature_range_low', value)}
              />
              <NumberField
                label="初始层最高温度"
                value={data.first_layer_temperature_range_high || 240}
                min={150}
                max={300}
                unit="°C"
                onChange={(value) => handleFieldChange('first_layer_temperature_range_high', value)}
              />
            </div>
          </div>

          {/* 床面温度 - 冷却板示例 */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-zinc-50 mb-3">冷却板</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NumberField
                label="打印温度"
                value={data.cool_plate_temp || 35}
                min={0}
                max={100}
                unit="°C"
                onChange={(value) => handleFieldChange('cool_plate_temp', value)}
              />
              <NumberField
                label="初始层温度"
                value={data.cool_plate_temp_initial_layer || 35}
                min={0}
                max={100}
                unit="°C"
                onChange={(value) => handleFieldChange('cool_plate_temp_initial_layer', value)}
              />
            </div>
          </div>

          {/* 腔室温度 */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold text-zinc-50 mb-3">腔室温度</h4>
            <NumberField
              label="腔室温度"
              value={data.chamber_temperature || 0}
              min={0}
              max={100}
              unit="°C"
              onChange={(value) => handleFieldChange('chamber_temperature', value)}
              tooltip="0 = 不适用"
            />
          </div>
        </div>
      </FieldGroup>

      {/* 冷却限制 */}
      <FieldGroup title="冷却限制" collapsible={true}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NumberField
            label="冷却板最低温度"
            value={data.cool_plate_temp_range_low || 20}
            min={0}
            max={100}
            unit="°C"
            onChange={(value) => handleFieldChange('cool_plate_temp_range_low', value)}
          />
          <NumberField
            label="冷却板最高温度"
            value={data.cool_plate_temp_range_high || 50}
            min={0}
            max={100}
            unit="°C"
            onChange={(value) => handleFieldChange('cool_plate_temp_range_high', value)}
          />
        </div>
      </FieldGroup>
    </div>
  );
}
```

---

## 🎯 表单字段组件示例

### components/FormFields/NumberField.tsx

```typescript
'use client';

import { useState } from 'react';

interface NumberFieldProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  unit?: string;
  tooltip?: string;
  onChange: (value: number) => void;
}

export default function NumberField({
  label,
  value,
  min,
  max,
  step = 0.1,
  precision,
  unit,
  tooltip,
  onChange,
}: NumberFieldProps) {
  const [inputValue, setInputValue] = useState(String(value));

  const handleChange = (newValue: string) => {
    setInputValue(newValue);
    const numValue = parseFloat(newValue);
    if (!isNaN(numValue)) {
      const finalValue = precision ? parseFloat(numValue.toFixed(precision)) : numValue;
      onChange(finalValue);
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-zinc-300">{label}</label>
        {tooltip && (
          <span className="text-xs text-zinc-500 cursor-help" title={tooltip}>
            ℹ️
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-zinc-100 focus:border-emerald-500 focus:outline-none"
        />
        {unit && <span className="text-sm text-zinc-400 w-12">{unit}</span>}
      </div>
      {min !== undefined && max !== undefined && (
        <div className="text-xs text-zinc-500">
          范围: {min} - {max}
        </div>
      )}
    </div>
  );
}
```

### components/FormFields/BoolField.tsx

```typescript
'use client';

interface BoolFieldProps {
  label: string;
  value: boolean;
  tooltip?: string;
  onChange: (value: boolean) => void;
}

export default function BoolField({ label, value, tooltip, onChange }: BoolFieldProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-zinc-600 text-emerald-500 focus:ring-emerald-500"
      />
      <div className="flex-1">
        <span className="text-sm font-medium text-zinc-300">{label}</span>
        {tooltip && (
          <p className="text-xs text-zinc-500 mt-1">{tooltip}</p>
        )}
      </div>
    </label>
  );
}
```

### components/FormFields/FieldGroup.tsx

```typescript
'use client';

import { useState } from 'react';

interface FieldGroupProps {
  title: string;
  collapsible?: boolean;
  note?: string;
  children: React.ReactNode;
}

export default function FieldGroup({
  title,
  collapsible = false,
  note,
  children,
}: FieldGroupProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="border border-zinc-800 rounded-lg bg-zinc-900/40 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-zinc-50">{title}</h3>
        {collapsible && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-zinc-400 hover:text-zinc-300 transition-colors"
          >
            {isCollapsed ? '▶️' : '▼️'}
          </button>
        )}
      </div>

      {note && (
        <p className="text-xs text-zinc-500 mb-4 italic">{note}</p>
      )}

      {!isCollapsed && (
        <div>{children}</div>
      )}
    </div>
  );
}
```

---

## 🔌 数据管理 Hook

### hooks/usePresetData.ts

```typescript
import { useState, useCallback } from 'react';
import { PresetData, ValidationResult } from '@/types/preset';

export function usePresetData(initialData: PresetData) {
  const [data, setData] = useState<PresetData>(initialData);
  const [isDirty, setIsDirty] = useState(false);

  const updateField = useCallback((fieldId: string, value: any) => {
    setData((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [fieldId]: value,
      },
      updatedAt: new Date().toISOString(),
    }));
    setIsDirty(true);
  }, []);

  const resetData = useCallback(() => {
    setData(initialData);
    setIsDirty(false);
  }, [initialData]);

  const saveData = useCallback(async () => {
    // 调用你的API保存数据
    try {
      const response = await fetch('/api/presets', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsDirty(false);
        return true;
      }
    } catch (error) {
      console.error('Failed to save:', error);
    }
    return false;
  }, [data]);

  return {
    data,
    isDirty,
    updateField,
    resetData,
    saveData,
  };
}
```

---

## 📊 API 集成示例

### 添加到 src/app/api/presets/route.ts

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    const presetData = await request.json();
    
    // 验证数据
    // 保存到数据库或GitHub
    // ...
    
    return NextResponse.json({ 
      success: true, 
      data: presetData 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save preset' },
      { status: 500 }
    );
  }
}
```

---

## 🚀 快速开始

### 第一步：创建基础类型

```bash
# 创建类型文件
touch src/types/preset.ts

# 创建Tab组件目录
mkdir -p src/components/PresetTabs
mkdir -p src/components/FormFields

# 创建hooks
touch src/hooks/usePresetData.ts
```

### 第二步：实现核心字段组件

按优先级实现：
1. `NumberField.tsx` - 最常用
2. `BoolField.tsx` - 简单
3. `EnumField.tsx` - 下拉选择
4. `FieldGroup.tsx` - 分组容器
5. `CodeField.tsx` - 代码编辑 (可选，使用 `react-ace`)
6. `ColorField.tsx` - 颜色选择 (可选，使用 `react-color`)

### 第三步：构建Tab页面

按顺序构建：
1. `FilamentTab.tsx` - 核心数据
2. `CoolingTab.tsx` - 风扇控制
3. `NotesTab.tsx` - 最简单
4. 其他Tab...

### 第四步：集成到 PresetDetailsClient

修改现有的 `PresetDetailsClient.tsx`，添加Tab导航和切换逻辑。

---

## 💡 最佳实践建议

### 1. 数据验证
```typescript
// 在提交前验证
const validate = (data: PresetData): ValidationResult => {
  const errors: Record<string, string> = {};
  
  if (data.data.temperature < 150 || data.data.temperature > 300) {
    errors.temperature = '温度必须在150-300°C之间';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings: {},
  };
};
```

### 2. 字段依赖关系
```typescript
// 某些字段只在满足条件时显示
const shouldShowField = (fieldId: string, data: Record<string, any>) => {
  if (fieldId === 'pressure_advance_n_coef') {
    return data.enable_pressure_advance_auto === false;
  }
  return true;
};
```

### 3. 国际化支持
```typescript
// 使用 i18next 或类似库处理多语言
import { useTranslation } from 'react-i18next';

const { t } = useTranslation('presets');
<label>{t('filament_type')}</label>
```

### 4. 实时预览
```typescript
// 参数变化时即时更新预览
useEffect(() => {
  // 触发预览更新
  triggerPreview(presetData);
}, [presetData]);
```

### 5. 自动保存
```typescript
// 使用防抖避免过频繁的保存
const debouncedSave = useCallback(
  debounce((data) => saveData(data), 2000),
  []
);

useEffect(() => {
  if (isDirty) {
    debouncedSave(data);
  }
}, [data, isDirty]);
```

---

## 🧪 测试建议

```typescript
// __tests__/PresetDetailsClient.test.tsx
describe('PresetDetailsClient', () => {
  it('should render all tabs', () => {
    // ...
  });

  it('should update field when input changes', () => {
    // ...
  });

  it('should save data to API', () => {
    // ...
  });

  it('should validate temperature range', () => {
    // ...
  });
});
```

---

## 📱 响应式设计考虑

```typescript
// 在 Tailwind 中使用响应式网格
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 移动端：1列 | 平板：2列 | 桌面：3列 */}
</div>
```

---

## 🎯 下一步

1. **创建JSON Schema** - 根据提供的 JSON 文件创建动态表单生成器
2. **数据库设计** - 决定如何存储预设数据（JSON文件、数据库等）
3. **版本控制** - 实现预设版本管理
4. **导入/导出** - 支持OrcaSlicer格式的导入
5. **打印预览** - 显示参数与实际效果的对应

---

## 📚 参考资源

- OrcaSlicer Wiki: https://www.orcaslicer.com/wiki
- Next.js 文档: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com
- React Hook Form: https://react-hook-form.com（可选，用于复杂表单）

---

**文档创建日期**: 2026-02-18  
**版本**: 1.0  
**作者**: AI Assistant
