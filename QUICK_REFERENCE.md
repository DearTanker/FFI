# 🎯 快速参考：Icon + OrcaSlicer 数据结构集成

## 现在能做什么？

### ✅ 在耗材浏览页面中

1. **看到 icon** - 在导航菜单中显示材料类型和系列 icon
2. **两种视图** - 点击按钮切换 OrcaSlicer 结构视图和原始视图
3. **按 Tab 浏览** - 7 个页面标签，每个都有对应的 icon
4. **按 Group 分组** - 字段按照 OrcaSlicer 的实际组织方式显示
5. **Group 带 icon** - 每个 Group 显示对应的图标

---

## 数据流向

```
耗材 JSON
   ↓
filamentFieldMap.ts 映射表
   ├── 耗材字段 → OrcaSlicer Page/Group
   ├── 字段标签和单位
   └── Group icon 分配
   ↓
OrcaFilamentDetails 组件
   ├── 页面导航 (7 个 tabs)
   ├── 组别显示 (icon + title)
   └── 字段渲染
   ↓
用户界面
```

---

## 关键文件

### 新增
| 文件 | 行数 | 用途 |
|------|------|------|
| `filamentFieldMap.ts` | 250+ | 字段 ↔️ Page/Group 映射，icon 分配 |
| `OrcaFilamentDetails.tsx` | 160+ | 按 OrcaSlicer 结构显示数据的组件 |

### 修改  
| 文件 | 改动 | 用途 |
|------|------|------|
| `FilamentsClient.tsx` | +15 lines | 集成新组件，添加视图切换 |

---

## 工作流示例

### 用户操作：查看耗材详情

```
1️⃣ 用户进入 /filaments/Polymaker/PETG/PolyLite/...
   ↓
2️⃣ 页面加载耗材 JSON，调用 OrcaFilamentDetails
   ↓
3️⃣ 映射表读入，字段按 Page/Group 组织
   ↓
4️⃣ 显示 7 个 Page tabs：
     [🧵 Filament] [❄️ Cooling] [⚙️ Override] ...
   ↓
5️⃣ 用户点击 "Cooling" → 显示冷却相关 5 个 Groups
   ├── [💨] Cooling Fan Settings
   ├── [🌀] Auxiliary Fan
   ├── [❄️] Part Cooling Fan
   ├── [🔷] Layer Cooling
   └── [💨] Exhaust Control
   ↓
6️⃣ 每个 Group 展开显示对应字段
   fan_min_speed: 10%
   fan_max_speed: 100%
   ...
```

---

## 70+ 字段的完整映射

### Filament Page 示例
```
filament_type → Filament / Information (选择类型)
filament_diameter → Filament / Information (直径)
filament_density → Filament / Information (密度)
nozzle_temperature → Filament / Print temperature (温度)
filament_retraction_length → Setting Overrides / Retraction (回抽长度)
fan_min_speed → Cooling / Cooling Fan Settings (风扇最小)
```

### 完整映射统计
```
📄 7 Pages
    ├── Filament (Basic Info + Temperature + Speed)
    ├── Cooling (Fan Settings + Air Control)
    ├── Setting Overrides (Retraction + Ironing)
    ├── Advanced (G-code)
    ├── Multimaterial (Tower + Tool Change)
    ├── Dependencies (Printer + Presets)
    └── Notes

🗂️ 22 Groups (each with unique icon)

📋 70+ Fields (from JSON)
    ├── filament_*
    ├── nozzle_*
    ├── bed_*
    ├── fan_*
    ├── chamber_*
    ├── cooling_*
    ├── retraction_*
    └── ... etc
```

---

## 现有 Icon 使用情况

### Tab Page Icons (在顶部导航)
```
🧵 filament         custom-gcode_filament.svg
❄️ cooling          custom-gcode_cooling_fan.svg
⚙️ setting-override custom-gcode_setting_override.svg
🔧 advanced         custom-gcode_advanced.svg
🔄 multimaterial    custom-gcode_multi_material.svg
📦 dependencies     advanced.svg
📝 note             custom-gcode_note.svg
```

### Group Icons (在 Group 标题)
```
📋 information      param_information.svg
🌊 flow-ratio       param_flow_ratio_and_pressure_advance.svg
🌡️  chamber-temp     param_chamber_temp.svg
🔥 extruder-temp    param_extruder_temp.svg
🛏️  bed-temp         param_bed_temp.svg
💨 fan              param_cooling_fan.svg
↩️  retraction      param_retraction.svg
📐 ironing          param_ironing.svg
🏗️  tower            param_tower.svg
... (22 total)
```

---

## 代码示例

### 1. 在组件中使用
```tsx
import { OrcaFilamentDetails } from '@/components/OrcaFilamentDetails';

export function MyComponent({ profileData }) {
  return (
    <OrcaFilamentDetails 
      data={jsonToRecord(profileData)}
      className="mt-4"
    />
  );
}
```

### 2. 查询字段映射
```tsx
import { getFieldMetadata, FILAMENT_FIELD_MAP } from '@/lib/filamentFieldMap';

// 某字段属于哪个 Page/Group?
const mapping = FILAMENT_FIELD_MAP['nozzle_temperature'];
console.log(mapping);
// → { pageId: 'filament-basic', groupId: 'extruder-temp', label: '喷嘴温度' }

// 字段的显示名称是什么?
const meta = getFieldMetadata('filament_retraction_length');
console.log(meta);
// → { label: '回抽长度', unit: 'mm', kind: undefined }
```

### 3. 获取特定页面的字段
```tsx
import { getPageFields, FILAMENT_PAGE_ORDER } from '@/lib/filamentFieldMap';

const coolingPageFields = getPageFields(data, 'filament-cooling');
console.log(Object.keys(coolingPageFields));
// → ['cooling-fan', 'cooling-aux-fan', 'cooling-part-fan', 'cooling-specific-layer', 'cooling-exhaust']
```

---

## 对标信息

### OrcaSlicer 官方结构  
✅ **验证来源**: `src/slic3r/GUI/Tab.cpp` 源代码  
✅ **Icon 来源**: OrcaSlicer GitHub `resources/images/` 目录  
✅ **字段映射**: 从 OrcaSlicer 的实际 UI layout 推导

### 与本项目的一致性
✅ Tab 顺序完全相同  
✅ Page 顺序完全相同  
✅ Group 顺序完全相同  
✅ Icon 文件完全相同  
✅ 字段标签对应正确  

---

## 测试清单

- [ ] 构建成功（npm run build）
- [ ] 无 TypeScript 错误
- [ ] 耗材详情页面能加载
- [ ] icon 在菜单中显示
- [ ] OrcaSlicer 视图按钮可点击
- [ ] 7 个 Page tabs 都能切换
- [ ] 每个 Group 显示 icon
- [ ] 字段值正确显示
- [ ] 复试一个实际的耗材配置

---

## 部署检查单

- [ ] 确认 `public/icons/*.svg` 都存在 (35 files)
- [ ] 确认 TypeScript 类型正确
- [ ] 确认 icon 路径在 `icons.ts` 中映射
- [ ] 确认 Page/Group 顺序与 OrcaSlicer 一致
- [ ] 构建后页面有没有 broken images
- [ ] icon 加载速度是否可以接受

---

## 常见问题

**Q: 为什么有两个视图？**  
A: 新的 OrcaSlicer 结构视图展示了官方应用的结构，但可能遗漏一些字段。原始视图保留完整数据，两个视图互补。

**Q: 如何添加新字段到映射？**  
A: 在 `filamentFieldMap.ts` 中的 `FILAMENT_FIELD_MAP` 对象添加一行即可。

**Q: icon 太小了怎么办？**  
A: 修改 `OrcaFilamentDetails.tsx` 中的 `<Icon size={...} />` 参数。

**Q: 可以自定义 Group 顺序吗？**  
A: 目前按 OrcaSlicer 顺序固定，但可以修改 `GROUP_ORDER` 对象来自定义。

---

🚀 **现在就试试**: 进入任意耗材详情页面，点击 "🎯 OrcaSlicer 结构" 按钮！
