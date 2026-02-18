# Quick Start Guide - OrcaSlicer UI Components

## 🚀 How to Use Existing Components

### Import and Display a Tab

```tsx
import { TabView } from '@/components/TabView';
import { TAB_FILAMENT } from '@/lib/orcaSlicerStructure';

export default function MyPage() {
  return <TabView tab={TAB_FILAMENT} />;
}
```

### Display Just Icons

```tsx
import { Icon, TabPageIcon, GroupHeader } from '@/components/Icon';

export default function Demo() {
  return (
    <>
      {/* Simple icon */}
      <Icon name="filament" size={32} />
      
      {/* Page icon with label */}
      <TabPageIcon name="cooling" label="Cooling" active={true} />
      
      {/* Group header with icon */}
      <GroupHeader iconName="retraction" title="Retraction Settings" />
    </>
  );
}
```

### Access Icon Path Directly

```tsx
import { getIconPath } from '@/lib/icons';

const filamentIconPath = getIconPath('filament'); // '/icons/custom-gcode_filament.svg'
```

## 📝 How to Add New Options

### Option Definition

```tsx
// in src/lib/filamentOptions.ts

export const MY_NEW_GROUP: OptionGroup = {
  id: 'my-group-id',
  title: 'My Group Title',
  iconName: 'tower', // Use existing icon
  options: [
    {
      id: 'my_option_1',
      label: 'Option Label',
      type: 'number', // 'string' | 'number' | 'boolean' | 'select' | 'range'
      unit: 'mm',
      defaultValue: 5,
      minValue: 0,
      maxValue: 10,
      step: 0.5,
      tooltip: 'Help text here',
      advanced: false // or true for advanced options
    },
    // ... more options
  ]
};
```

### Option Types

| Type | Usage | Example |
|------|-------|---------|
| `string` | Text input | Material name |
| `number` | Numeric value | Temperature, speed |
| `boolean` | Yes/No toggle | Enable/disable feature |
| `select` | Dropdown menu | Material type selection |
| `range` | Slider | Fan speed 0-100% |
| `multi-select` | Multiple checkboxes | Multiple selections |

### Add Group to TabFilament

```tsx
// in src/lib/orcaSlicerStructure.ts

import { MY_NEW_GROUP } from './filamentOptions';

// Inside TAB_FILAMENT pages, find the target page:
{
  id: 'filament-basic',
  title: 'Filament',
  groups: [
    // ... existing groups
    MY_NEW_GROUP, // Add here
  ]
}
```

## 🎨 Styling

All components use **Tailwind CSS** classes. Customize by modifying component className props:

```tsx
<TabView 
  tab={TAB_FILAMENT}
  className="bg-blue-50 rounded-xl shadow-lg"
/>
```

## 🔌 Extending the Components

### Add State Management

```tsx
'use client';

import { useState } from 'react';
import { TabView } from '@/components/TabView';

export default function ConfigEditor() {
  const [values, setValues] = useState<Record<string, any>>({});
  
  const handleChange = (optionId: string, value: any) => {
    setValues(prev => ({ ...prev, [optionId]: value }));
  };
  
  return (
    <>
      <TabView tab={TAB_FILAMENT} />
      {/* Form fields connected to handleChange */}
    </>
  );
}
```

### Create Custom Option Component

```tsx
'use client';

import { Option } from '@/lib/orcaSlicerStructure';

interface OptionInputProps {
  option: Option;
  value: any;
  onChange: (value: any) => void;
}

export function OptionInput({ option, value, onChange }: OptionInputProps) {
  switch (option.type) {
    case 'number':
      return (
        <div>
          <label>{option.label}</label>
          <input
            type="number"
            min={option.minValue}
            max={option.maxValue}
            step={option.step}
            value={value || option.defaultValue}
            onChange={e => onChange(parseFloat(e.target.value))}
          />
          {option.unit && <span>{option.unit}</span>}
        </div>
      );
    case 'boolean':
      return (
        <label>
          <input
            type="checkbox"
            checked={value || false}
            onChange={e => onChange(e.target.checked)}
          />
          {option.label}
        </label>
      );
    // ... other types
    default:
      return null;
  }
}
```

## 📦 Icon Library

### Available Icons

**Tab Page Icons** (16 total):
- `filament`, `cooling`, `setting-override`, `advanced`, `multimaterial`, `dependencies`, `note`
- `quality`, `strength`, `speed`, `support`, `other`
- `object-info`, `gcode`, `extruder`, `motion`

**Group Icons** (19 total):
- `information`, `flow-ratio`, `chamber-temp`, `extruder-temp`, `bed-temp`, `volumetric-speed`
- `cooling-fan`, `cooling-aux-fan`, `cooling-part-fan`, `cooling-specific-layer`, `cooling-exhaust`
- `retraction`, `ironing`, `tower`, `toolchange`, `toolchange-multi-extruder`
- `dependencies-printers`, `dependencies-presets`

See [src/lib/icons.ts](src/lib/icons.ts) for complete icon mapping.

## 🧪 Testing Components

```tsx
// Test in your component
import { render, screen } from '@testing-library/react';
import { Icon } from '@/components/Icon';

test('renders icon', () => {
  render(<Icon name="filament" size={24} alt="Filament" />);
  const img = screen.getByAltText('Filament');
  expect(img).toBeInTheDocument();
});
```

## 📚 Data Structure Reference

```tsx
// Complete type definitions
interface Tab {
  id: string;
  title: string;
  pages: TabPage[];
}

interface TabPage {
  id: string;
  title: string;
  iconName: IconName;
  groups: OptionGroup[];
}

interface OptionGroup {
  id: string;
  title: string;
  iconName?: IconName;
  options: Option[];
}

interface Option {
  id: string;
  label: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'range';
  value?: any;
  defaultValue?: any;
  unit?: string;
  tooltip?: string;
  advanced?: boolean;
}
```

## 🐛 Troubleshooting

### Icons not loading
- Check that files exist in `public/icons/`
- Verify icon name in `src/lib/icons.ts` is correct
- Clear `.next` build cache: `rm -rf .next`

### TypeScript errors
- Ensure Option.type matches available types in the interface
- IconName must be one of the predefined icon names
- Import types from `@/lib/orcaSlicerStructure`

### Build fails
- Check for circular imports
- Verify all imported components are exported
- Run `npm run build` to catch issues early

---

**See Also**:
- [src/lib/orcaSlicerStructure.ts](src/lib/orcaSlicerStructure.ts) - Data definitions
- [src/lib/filamentOptions.ts](src/lib/filamentOptions.ts) - Option examples
- [src/components/Icon.tsx](src/components/Icon.tsx) - Icon component
- [src/components/TabView.tsx](src/components/TabView.tsx) - View components
- [src/app/orca-config/page.tsx](src/app/orca-config/page.tsx) - Live demo
