# OrcaSlicer 材料设置页面 完整结构分析

> 本文档为一比一复刻所需的参考资料，详细划分了OrcaSlicer切片中材料页面的所有Tab、分组和数据字段

## 📋 页面结构概览

OrcaSlicer 的 Filament（材料）设置页面包含 **7个主要Page**，共 **200+个配置字段**，组织方式如下：

```
Materials Tab (材料选项卡)
│
├── Filament Page (材料页面) - 125+ 字段
│   ├── Basic Information (基本信息)
│   ├── Flow/PA Settings (流量和压力提前)
│   ├── Temperature Settings (打印温度)
│   └── Cooling Limits (冷却限制)
│
├── Cooling Page (冷却页面) - 18 字段
│   ├── Part Cooling Fan (零件冷却风扇)
│   ├── Exhaust/Auxiliary Fans (排气和辅助风扇)
│   └── Layer-wise Cooling (分层冷却)
│
├── Setting Overrides (设置覆盖) - 18 字段
│   ├── Retraction Overrides (回抽参数覆盖)
│   └── Ironing Overrides (烫平参数覆盖)
│
├── Advanced (高级) - G代码编辑
├── Multimaterial (多材料) - 19 字段
├── Dependencies (依赖) - 兼容性声明
└── Notes (备注) - 用户注释
```

---

## 🔍 详细页面结构

### 1️⃣ Filament Page (材料页面)

这是最重要的页面，包含材料的基本属性和打印参数。

#### 1.1 Basic Information (基本信息)
| 字段 | 类型 | 范围 | 默认值 | 说明 |
|-----|------|------|--------|------|
| `filament_type` | enum(dropdown) | PLA/PETG/ABS/TPU/PA/PC/etc | PLA | 材料类型 |
| `filament_density` | float | 0.5-2.0 g/cm³ | 1.24 | 丝材密度 |
| `filament_diameter` | float | 1.0-4.0 mm | 1.75 | 直径 |
| `filament_spool_weight` | float | 0-50000 g | 1000 | 整卷重量 |
| `filament_cost` | float | 0-10000 $/kg | 20 | 成本 |
| `filament_soluble` | bool | true/false | false | 是否可溶 |
| `filament_brimless` | bool | true/false | false | 无边框打印 |
| Fuzzy Skin Support | bool | true/false | false | 模糊皮肤 |

#### 1.2 Flow & Pressure Advance (流量和压力)
| 字段 | 类型 | 范围 | 默认值 | 说明 |
|-----|------|------|--------|------|
| `filament_flow_ratio` | float | 0.5-2.0 | 1.0 | 流量系数 |
| `filament_volumetric_flow_max` | float | 0-100 mm³/s | 0 | 最大体积速度 |
| `pressure_advance_k` | float | 0-1.0 | 0.0 | PA K值(线性) |
| `pressure_advance_n_coef` | float | 0-2.0 | 0.0 | PA N系数(自适应) |
| `enable_pressure_advance_auto` | bool | true/false | false | 启用自适应PA |
| `pressure_advance_modulation` | float | 0-1.0 | 0.0 | PA调制 |

#### 1.3 Temperature Settings (温度设置) - 多床面
系统支持6种床面，每种都有 **初始层温度** 和 **标准层温度**：

**床面类型：** 钢铁板、PEI涂料、高温涂料、玻璃、磁性钢铁、钢铁光滑

对每个床面：
| 字段名模式 | 类型 | 范围 | 说明 |
|----------|------|------|------|
| `temperature` (hotend_temp) | int | 150-300°C | 标准层喷嘴温度 |
| `temperature_vitrification` | int | ... | 玻璃化温度 |
| `first_layer_temperature_range_high` | int | ... | 初始层范围(高) |
| `first_layer_temperature_range_low` | int | ... | 初始层范围(低) |
| `nozzle_temperature_range_high` | int | ... | 标准层范围(高) |
| `nozzle_temperature_range_low` | int | ... | 标准层范围(低) |
| `chamber_temperature` | int | 0-100°C | 腔室温度 |
| `cool_plate_temp` | int | 0-100°C | 冷却板温度 |
| `cool_plate_temp_initial_layer` | int | ... | 冷却板初始层温度 |
| `eng_plate_temp` | int | 0-100°C | 钢板温度 |
| `eng_plate_temp_initial_layer` | int | ... | 钢板初始层温度 |
| 其他床面温度 | ... | ... | ... |

#### 1.4 Cooling Limits (冷却限制)
| 字段 | 类型 | 范围 | 说明 |
|-----|------|------|------|
| `cool_plate_temp_range_high` | int | 0-100°C | 冷却板范围(高) |
| `cool_plate_temp_range_low` | int | 0-100°C | 冷却板范围(低) |

---

### 2️⃣ Cooling Page (冷却页面)

控制所有冷却风扇的行为。

#### 2.1 Part Cooling Fan (零件冷却风扇)
| 字段 | 类型 | 范围 | 说明 |
|-----|------|------|------|
| `fan_cooling_layer_time` | float | 10-1000s | 启用冷却的最小层时间 |
| `close_fan_the_first_x_layers` | int | 0-20 | 前N层关闭风扇 |
| `min_fan_speed` | int | 0-100% | 最小风扇速度 |
| `max_fan_speed` | int | 0-100% | 最大风扇速度 |
| `full_fan_speed_layer` | int | 0-20 | 达到全速的层数 |
| `disable_fan_first_layers` | int | 0-20 | 禁用风扇的前N层 |
| `additional_cooling_fan_speed` | int | 0-100% | 额外冷却风扇速度 |
| `enable_overhang_bridge_fan` | bool | - | 悬垂和桥接增加风扇 |

#### 2.2 Exhaust & Auxiliary Fans (排气和辅助风扇)
| 字段 | 类型 | 范围 | 说明 |
|-----|------|------|------|
| `during_print_exhaust_fan_speed` | int | 0-100% | 打印中排气风扇速度 |
| `complete_print_exhaust_fan_speed` | int | 0-100% | 完成时排气风扇速度 |
| `activate_air_filtration` | bool | - | 启用空气过滤 |
| `nozzle_flow_compensation` | float | 0-2.0 | 喷嘴流量补偿 |

#### 2.3 Layer-wise Cooling (分层冷却) - 可控制12层
每一层可独立设置风扇速度（0-100%）

---

### 3️⃣ Setting Overrides (设置覆盖页面)

允许在材料级别覆盖系统级别的参数。

#### 3.1 Retraction Overrides (回抽覆盖)
| 字段 | 类型 | 说明 |
|-----|------|------|
| `retract_length` | float | 回抽长度 |
| `retract_lift` | float | 回抽提起 |
| `retract_lift_above` | float | 提起的最小高度 |
| `retract_speed` | float | 回抽速度 |
| `deretract_speed` | float | 解回抽速度 |

#### 3.2 Ironing Overrides (烫平覆盖)
| 字段 | 类型 | 说明 |
|-----|------|------|
| `ironing_type` | enum | 烫平类型 |
| `ironing_density` | float | 烫平密度 |
| `ironing_line_spacing` | float | 烫平线间距 |

---

### 4️⃣ Advanced Page (高级编辑页面)

支持G代码级别的自定义。

| 字段 | 类型 | 说明 |
|-----|------|------|
| `filament_start_gcode` | code | 材料启动G代码 |
| `filament_end_gcode` | code | 材料结束G代码 |
| `color_change_gcode` | code | 换色G代码 |
| `pause_print_gcode` | code | 暂停打印G代码 |
| `template_custom_gcode` | code | 自定义G代码模板 |

---

### 5️⃣ Multimaterial Page (多材料页面)

用于管理多材料打印的约束。

| 字段 | 类型 | 范围 | 说明 |
|-----|------|------|------|
| `filament_extruder_color` | color | RGB | 挤出机颜色 |
| `filament_change_length` | float | 0-200 mm | 换料长度 |
| `toolchange_migration_distance` | float | 0-50 mm | 工具切换迁移距离 |
| `use_relative_e_distances` | bool | - | 使用相对E距离 |
| `wipe_on_retract` | bool | - | 回抽时擦拭 |
| `wipe_tower_width` | float | 10-200 mm | 擦拭塔宽度 |
| compatible_printers | string | list | 兼容打印机列表 |
| compatible_print_profiles | string | list | 兼容打印工艺列表 |

---

### 6️⃣ Dependencies Page (依赖页面)

声明与打印机和工艺配置文件的兼容性。

| 字段 | 说明 |
|-----|------|
| `compatible_printers_condition` | 兼容性条件表达式 |
| `compatible_print_profiles_condition` | 工艺兼容性表达式 |
| `inherits` | 继承自其他预设 |
| `version` | 预设版本号 |

---

### 7️⃣ Notes Page (备注页面)

用户自定义注释和说明。

| 字段 | 说明 |
|-----|------|
| `filament_notes` | 自由格式文本注释 |

---

## 📊 数据字段类型与展示规则

### 字段类型
1. **数值型** (float/int)
   - 显示方式：文本输入框 + 单位标签
   - 通常带有范围限制和前后调整按钮（+/- 按钮）

2. **枚举型** (enum)
   - 显示方式：下拉选择框
   - 例：filament_type, ironing_type 等

3. **布尔型** (bool)
   - 显示方式：复选框 ☑️
   - 例：soluble, brimless 等

4. **颜色型** (color)
   - 显示方式：颜色选择器
   - 例：filament_extruder_color

5. **代码型** (code)
   - 显示方式：多行文本编辑框，支持语法高亮
   - 例：filament_start_gcode, filament_end_gcode

6. **选择器型** (selector)
   - 显示方式：列表选择或复选框组
   - 例：compatible_printers

### 分组显示规则
1. **按逻辑分区** - 使用 Panel / GroupBox 包装相关字段
2. **折叠/展开** - 高级选项通常可折叠
3. **条件显示** - 某些字段根据前置条件显示或隐藏
4. **字段间关联** - 同组字段共享单位和范围说明

---

## 🎨 界面布局特点

### 标准布局
```
[Group Title]
───────────────────────────
 Label 1  | [Input Field 1] | Unit
 Label 2  | [Input Field 2] | Unit
 Label 3  | [Input Field 3] | Unit
───────────────────────────
[Description/Link]
```

### 多值字段（床面温度示例）
```
Temperature Settings
├─ Cool Plate ┬─ Temperature: [___]°C
│             ├─ Initial Layer: [___]°C  
│             └─ Range: [___] - [___]°C
├─ Steel Plate (ENG) ┬─ ...
├─ High Temp ┬─ ...
└─ 其他床面...
```

---

## 📈 数值范围参考表

| 参数名 | 最小值 | 最大值 | 典型值 | 单位 |
|-------|--------|--------|--------|------|
| Temperature (Hotend) | 150 | 300 | 210 | °C |
| Bed Temperature | 0 | 120 | 60 | °C |
| Flow Ratio | 0.5 | 2.0 | 1.0 | % |
| PA K Value | 0 | 1.0 | 0.02 | - |
| Fan Speed | 0 | 100 | 50 | % |
| Retract Length | 0 | 200 | 5 | mm |
| Retract Speed | 20 | 200 | 40 | mm/s |
| First Layer Temp Range Low | 150 | 250 | 200 | °C |
| First Layer Temp Range High | 150 | 300 | 240 | °C |

---

## 🔗 关键设计模式

### 1. 多打印机多床面支持
- 同一个材料预设可以为不同打印机的不同床面设置不同参数
- 通过 `*_range_low` 和 `*_range_high` 定义范围

### 2. 灵活的参数覆盖机制
- 材料可以覆盖系统默认的回抽和烫平参数
- 保证同时支持全局和本地配置

### 3. 自适应和自动化
- `enable_pressure_advance_auto` - 自动PA计算
- `fan_cooling_layer_time` - 根据层时间自动调整风扇
- `enable_overhang_bridge_fan` - 智能特殊区域冷却

### 4. 兼容性管理
- 每个材料预设可声明兼容的打印机和工艺
- 支持条件表达式定义复杂的兼容性规则

### 5. G代码级定制
- 材料级别的启动/结束代码 - 最大的灵活性
- 换色、暂停等事件的内置变量支持

---

## 🎯 复刻时应重点关注

1. **Tab设计** - Pages之间的导航和切换
2. **字段分组** - 逻辑合理的信息层级
3. **输入验证** - 每个字段的范围检查和有效性验证
4. **条件显示** - 某些高级字段需要在特定条件下显示
5. **实时预览** - 参数变化时的及时反馈
6. **多国语言** - 所有标签都需要支持国际化
7. **帮助链接** - 关键参数应该链接到文档或Wiki

---

## 📝 XML/JSON 配置示例

```xml
<!-- 字段定义示例 -->
<field>
  <id>filament_flow_ratio</id>
  <category>Flow/Pressure</category>
  <type>float</type>
  <default>1.0</default>
  <min>0.5</min>
  <max>2.0</max>
  <unit>%</unit>
  <label>Flow Ratio</label>
  <tooltip>Adjust the flow for this filament</tooltip>
</field>
```

---

最后修改：2026年2月18日 | 文档版本：1.0
