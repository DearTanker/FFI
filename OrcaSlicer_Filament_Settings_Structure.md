# OrcaSlicer 材料设置 (Filament Settings) UI 结构分析

> 基于 OrcaSlicer GitHub 仓库的 TabFilament 类代码分析

## 概述

OrcaSlicer 中的材料设置页面（Filament Tab）由多个 Pages（页面）组成，每个 Page 包含多个 OptionGroups（选项组），每个 OptionGroup 包含多个配置字段。

---

## 完整结构化数据

### Page 1: **Filament（材料）**

#### 1.1 Group: Basic information（基本信息）<span style="color:blue">param_information</span>

| 字段名称 | 配置键 | 字段类型 | 描述 | Wiki 链接 |
|---------|--------|---------|------|----------|
| 材料类型 | filament_type | 选项框（下拉） | 灯丝的类型（PLA、PETG等） | material_basic_information#type |
| 材料厂商 | filament_vendor | 字符串 | 灯丝制造商名称 | material_basic_information#vendor |
| 易溶材料 | filament_soluble | 布尔值 | 是否为易溶材料 | material_basic_information#soluble-material |
| 为支撑材料 | filament_is_support | 布尔值 | 是否为支撑材料 | material_basic_information#support-material |
| 灯丝填充长度 | filament_change_length | 数字（mm） | 灯丝更换时的填充长度 | material_basic_information#filament-ramming-length |
| 所需喷嘴HRC | required_nozzle_HRC | 选项框 | 推荐喷嘴硬度 | material_basic_information#required-nozzle-hrc |
| 默认灯丝颜色 | default_filament_colour | 颜色 | 灯丝的默认颜色 | material_basic_information#default-color |
| 灯丝直径 | filament_diameter | 数字（mm） | 灯丝标准直径 | material_basic_information#diameter |
| 粘着性等级 | filament_adhesiveness_category | 选项框 | 材料对床面的粘着性 | material_basic_information#adhesiveness-category |
| 灯丝密度 | filament_density | 数字（g/cm³） | 材料密度 | material_basic_information#density |
| 缩放比例(XY) | filament_shrink | 百分比（%） | XY方向收缩 | material_basic_information#shrinkage-xy |
| 缩放补偿(Z) | filament_shrinkage_compensation_z | 百分比（%） | Z方向收缩补偿 | material_basic_information#shrinkage-z |
| 灯丝成本 | filament_cost | 数字（¥/kg） | 灯丝价格 | material_basic_information#price |
| 软化温度 | temperature_vitrification | 数字（℃） | 玻璃化转变温度 | material_basic_information#softening-temperature |
| 闲置温度 | idle_temperature | 数字（℃） | 物体闲置时的温度 | material_basic_information#idle-temperature |
| **推荐喷嘴温度范围** | - | **组合字段** | **下面两个字段组成** | - |
| 喷嘴温度下限 | nozzle_temperature_range_low | 数字（℃） | 推荐最低喷嘴温度 | material_basic_information#nozzle-temperature-range |
| 喷嘴温度上限 | nozzle_temperature_range_high | 数字（℃） | 推荐最高喷嘴温度 | material_basic_information#nozzle-temperature-range |

#### 1.2 Group: Flow ratio and Pressure Advance（流量比和压力提前）<span style="color:blue">param_flow_ratio_and_pressure_advance</span>

| 字段名称 | 配置键 | 字段类型 | 描述 | Wiki 链接 |
|---------|--------|---------|------|----------|
| 颗粒流量系数 | pellet_flow_coefficient | 数字 | 用于颗粒打印机的流量系数 | printer_basic_information_advanced#pellet-modded-printer |
| 灯丝流量比 | filament_flow_ratio | 百分比（%） | 灯丝的相对流量 | material_flow_ratio_and_pressure_advance#flow-ratio |
| 启用压力提前 | enable_pressure_advance | 布尔值 | 是否启用提前补偿 | material_flow_ratio_and_pressure_advance#pressure-advance |
| 压力提前值 | pressure_advance | 数字 | PA值（影响角与外壳） | material_flow_ratio_and_pressure_advance#pressure-advance |
| 启用自适应PA | adaptive_pressure_advance | 布尔值 | 启用自适应压力提前 | material_flow_ratio_and_pressure_advance#enable-adaptive-pressure-advance-beta |
| 悬垂部分自适应PA | adaptive_pressure_advance_overhangs | 布尔值 | 为悬垂部分启用自适应PA | material_flow_ratio_and_pressure_advance#enable-adaptive-pressure-advance-for-overhangs-beta |
| 桥接自适应PA | adaptive_pressure_advance_bridges | 布尔值 | 为桥接启用自适应PA | material_flow_ratio_and_pressure_advance#pressure-advance-for-bridges |
| 自适应PA模型 | adaptive_pressure_advance_model | 代码文本 | 自适应PA的计算模型 | - |

#### 1.3 Group: Print chamber temperature（打印腔温度）<span style="color:blue">param_chamber_temp</span>

| 字段名称 | 配置键 | 字段类型 | 描述 | Wiki 链接 |
|---------|--------|---------|------|----------|
| 打印腔温度 | chamber_temperature | 数字（℃） | 打印腔体的目标温度 | material_temperatures#print-chamber-temperature |
| 启用腔温控制 | activate_chamber_temp_control | 布尔值 | 是否启用腔温控制 | material_temperatures#print-chamber-temperature |

#### 1.4 Group: Print temperature（打印温度）<span style="color:blue">param_extruder_temp</span>

| 字段名称 | 配置键 | 字段类型 | 描述 | Wiki 链接 |
|---------|--------|---------|------|----------|
| **喷嘴温度** | - | **组合字段** | **初始层和标准层** | material_temperatures#nozzle |
| 喷嘴温度(初始层) | nozzle_temperature_initial_layer | 数字（℃） | 第一层喷嘴温度 | material_temperatures#nozzle |
| 喷嘴温度(标准层) | nozzle_temperature | 数字（℃） | 其他层喷嘴温度 | material_temperatures#nozzle |

#### 1.5 Group: Bed temperature（床温）<span style="color:blue">param_bed_temp</span>

| 字段名称 | 配置键 | 字段类型 | 描述 | Wiki 链接 |
|---------|--------|---------|------|----------|
| **Cool Plate (SuperTack) 温度** | - | **组合字段** | **Cool Plate SuperTack床面温度** | material_temperatures#bed |
| Cool Plate SuperTack 初始层温度 | supertack_plate_temp_initial_layer | 数字（℃） | 初始层温度 | material_temperatures#bed |
| Cool Plate SuperTack 标准层温度 | supertack_plate_temp | 数字（℃） | 标准层温度 | material_temperatures#bed |
| **Cool Plate 温度** | - | **组合字段** | **标准 Cool Plate 床面温度** | material_temperatures#bed |
| Cool Plate 初始层温度 | cool_plate_temp_initial_layer | 数字（℃） | 初始层温度 | material_temperatures#bed |
| Cool Plate 标准层温度 | cool_plate_temp | 数字（℃） | 标准层温度 | material_temperatures#bed |
| **Textured Cool Plate 温度** | - | **组合字段** | **纹理 Cool Plate 床面温度** | material_temperatures#bed |
| Textured Cool Plate 初始层温度 | textured_cool_plate_temp_initial_layer | 数字（℃） | 初始层温度 | material_temperatures#bed |
| Textured Cool Plate 标准层温度 | textured_cool_plate_temp | 数字（℃） | 标准层温度 | material_temperatures#bed |
| **Engineering Plate 温度** | - | **组合字段** | **Engineering Plate 床面温度** | material_temperatures#bed |
| Engineering Plate 初始层温度 | eng_plate_temp_initial_layer | 数字（℃） | 初始层温度 | material_temperatures#bed |
| Engineering Plate 标准层温度 | eng_plate_temp | 数字（℃） | 标准层温度 | material_temperatures#bed |
| **Smooth PEI Plate / High Temp Plate 温度** | - | **组合字段** | **PEI Plate 床面温度** | material_temperatures#bed |
| Smooth PEI Plate 初始层温度 | hot_plate_temp_initial_layer | 数字（℃） | 初始层温度 | material_temperatures#bed |
| Smooth PEI Plate 标准层温度 | hot_plate_temp | 数字（℃） | 标准层温度 | material_temperatures#bed |
| **Textured PEI Plate 温度** | - | **组合字段** | **纹理 PEI Plate 床面温度** | material_temperatures#bed |
| Textured PEI Plate 初始层温度 | textured_plate_temp_initial_layer | 数字（℃） | 初始层温度 | material_temperatures#bed |
| Textured PEI Plate 标准层温度 | textured_plate_temp | 数字（℃） | 标准层温度 | material_temperatures#bed |

#### 1.6 Group: Volumetric speed limitation（体积速度限制）<span style="color:blue">param_volumetric_speed</span>

| 字段名称 | 配置键 | 字段类型 | 描述 | Wiki 链接 |
|---------|--------|---------|------|----------|
| 自适应体积速度 | filament_adaptive_volumetric_speed | 布尔值 | 启用自适应体积速度 | material_volumetric_speed_limitation#adaptive-volumetric-speed |
| 最大体积速度 | filament_max_volumetric_speed | 数字（mm³/s） | 灯丝的最大体积挤出速度 | material_volumetric_speed_limitation#max-volumetric-speed |

---

### Page 2: **Cooling（冷却）**

#### 2.1 Group: Cooling for specific layer（特定层冷却）<span style="color:blue">param_cooling_specific_layer</span>

| 字段名称 | 配置键 | 字段类型 | 描述 | Wiki 链接 |
|---------|--------|---------|------|----------|
| 关闭前X层的风扇 | close_fan_the_first_x_layers | 整数 | 关闭风扇的层数 | material_cooling#no-cooling-for-the-first |
| 满速风扇层 | full_fan_speed_layer | 整数 | 达到满速风扇的层数 | material_cooling#full-fan-speed-at-layer |

#### 2.2 Group: Part cooling fan（部件冷却风扇）<span style="color:blue">param_cooling_part_fan</span>

| 字段名称 | 配置键 | 字段类型 | 描述 | Wiki 链接 |
|---------|--------|---------|------|----------|
| **最小风扇速度阈值** | - | **组合字段** | **风扇启动条件** | material_cooling#material-part-cooling-fan |
| 最小风扇速度 | fan_min_speed | 百分比（%） | 风扇的最低速度 | material_cooling#material-part-cooling-fan |
| 冷却层时间 | fan_cooling_layer_time | 数字（秒） | 启用最小速度的阈值时间 | material_cooling#material-part-cooling-fan |
| **最大风扇速度阈值** | - | **组合字段** | **风扇满速条件** | material_cooling#material-part-cooling-fan |
| 最大风扇速度 | fan_max_speed | 百分比（%） | 风扇的最高速度 | material_cooling#material-part-cooling-fan |
| 层冷却阈值时间 | slow_down_layer_time | 数字（秒） | 达到最大速度的阈值时间 | material_cooling#material-part-cooling-fan |
| 减少风扇启停频率 | reduce_fan_stop_start_freq | 布尔值 | 保持风扇始终运行 | material_cooling#keep-fan-always-on |
| 为更好冷却而减速 | slow_down_for_layer_cooling | 布尔值 | 为冷却而降低打印速度 | material_cooling#slow-printing-down-for-better-layer-cooling |
| 不减速外壳 | dont_slow_down_outer_wall | 布尔值 | 外壳不参与减速 | material_cooling#dont-slow-down-outer-walls |
| 最小打印速度 | slow_down_min_speed | 数字（mm/s） | 减速时的最低速度 | material_cooling#min-print-speed |
| 启用悬垂/桥接强制冷却 | enable_overhang_bridge_fan | 布尔值 | 为悬垂和桥接启用强制冷却 | material_cooling#force-cooling-for-overhangs-and-bridges |
| 悬垂冷却启动阈值 | overhang_fan_threshold | 数字（%） | 启用悬垂冷却的阈值 | material_cooling#overhang-cooling-activation-threshold |
| 悬垂和外部桥冷却风扇速度 | overhang_fan_speed | 百分比（%） | 悬垂部分的风扇速度 | material_cooling#overhangs-and-external-bridges-fan-speed |
| 内部桥接冷却风扇速度 | internal_bridge_fan_speed | 百分比（%） | 内部桥接的独立风扇速度 | material_cooling#internal-bridges-fan-speed |
| 支撑界面冷却风扇速度 | support_material_interface_fan_speed | 百分比（%） | 支撑界面的风扇速度 | material_cooling#support-interface-fan-speed |
| 烫平冷却风扇速度 | ironing_fan_speed | 百分比（%） | 烫平功能的风扇速度 | material_cooling#ironing-fan-speed |

#### 2.3 Group: Auxiliary part cooling fan（辅助冷却风扇）<span style="color:blue">param_cooling_aux_fan</span>

| 字段名称 | 配置键 | 字段类型 | 描述 | Wiki 链接 |
|---------|--------|---------|------|----------|
| 辅助冷却风扇速度 | additional_cooling_fan_speed | 百分比（%） | 额外冷却风扇的速度 | material_cooling#auxiliary-part-cooling-fan |

#### 2.4 Group: Exhaust fan（排气扇）<span style="color:blue">param_cooling_exhaust</span>

| 字段名称 | 配置键 | 字段类型 | 描述 | Wiki 链接 |
|---------|--------|---------|------|----------|
| 激活空气过滤 | activate_air_filtration | 布尔值 | 启用空气过滤系统 | material_cooling#activate-air-filtration |
| 在打印过程中 | during_print_exhaust_fan_speed | 百分比（%） | 打印期间的排气扇速度 | material_cooling#during-print |
| 打印完成后 | complete_print_exhaust_fan_speed | 百分比（%） | 打印完成后的排气扇速度 | material_cooling#complete-print |

---

### Page 3: **Setting Overrides（设置覆盖）** <span style="color:blue">custom-gcode_setting_override</span>

#### 3.1 Group: Retraction（回抽）

此组支持针对单个灯丝的回抽参数覆盖。包含以下可覆盖的字段，每个字段都有一个复选框来启用/禁用覆盖：

| 字段名称 | 配置键 | 字段类型 | 描述 |
|---------|--------|---------|------|
| 回抽长度 | filament_retraction_length | 数字（mm） | 回抽距离 |
| Z跳跃 | filament_z_hop | 数字（mm） | Z轴上升高度 |
| Z跳跃类型 | filament_z_hop_types | 选项框 | 跳跃类型 |
| 抬升上限 | filament_retract_lift_above | 数字（mm） | 抬升触发高度 |
| 抬升下限 | filament_retract_lift_below | 数字（mm） | 抬升停止高度 |
| 强制抬升 | filament_retract_lift_enforce | 布尔值 | 强制执行抬升 |
| 回抽速度 | filament_retraction_speed | 数字（mm/s） | 回抽速度 |
| 反回抽速度 | filament_deretraction_speed | 数字（mm/s） | 反回抽速度 |
| 重启额外长度 | filament_retract_restart_extra | 数字（mm） | 重启时的额外挤出 |
| 回抽最小行程 | filament_retraction_minimum_travel | 数字（mm） | 触发回抽的最小移动距离 |
| 层变时回抽 | filament_retract_when_changing_layer | 布尔值 | 层变时是否回抽 |
| 擦拭 | filament_wipe | 布尔值 | 启用擦拭功能 |
| 擦拭距离 | filament_wipe_distance | 数字（mm） | 擦拭的距离 |
| 回抽前擦拭 | filament_retract_before_wipe | 数字（mm） | 擦拭前的回抽距离 |
| 长回抽切割 | filament_long_retractions_when_cut | 布尔值 | 启用长回抽切割 |
| 切割回抽距离 | filament_retraction_distances_when_cut | 字符串 | 切割时的回抽距离 |

#### 3.2 Group: Ironing（烫平）

此组包含烫平参数的覆盖设置，每个字段都有复选框控制是否使用灯丝特定值：

| 字段名称 | 配置键 | 字段类型 | 描述 |
|---------|--------|---------|------|
| 烫平流量 | filament_ironing_flow | 百分比（%） | 烫平的相对流量 |
| 烫平间距 | filament_ironing_spacing | 数字（mm） | 烫平线的间距 |
| 烫平内凹 | filament_ironing_inset | 数字（mm） | 从边缘的内凹距离 |
| 烫平速度 | filament_ironing_speed | 数字（mm/s） | 烫平的移动速度 |

---

### Page 4: **Advanced（高级）**

#### 4.1 Group: Filament start G-code（灯丝开始G代码）<span style="color:blue">param_gcode</span>

| 字段名称 | 配置键 | 字段类型 | 描述 |
|---------|--------|---------|------|
| 灯丝开始G代码 | filament_start_gcode | 代码（多行） | 灯丝更换后的初始化代码 |

#### 4.2 Group: Filament end G-code（灯丝结束G代码）<span style="color:blue">param_gcode</span>

| 字段名称 | 配置键 | 字段类型 | 描述 |
|---------|--------|---------|------|
| 灯丝结束G代码 | filament_end_gcode | 代码（多行） | 灯丝卸载前的清理代码 |

---

### Page 5: **Multimaterial（多材料）**

#### 5.1 Group: Wipe tower parameters（擦拭塔参数）<span style="color:blue">param_tower</span>

| 字段名称 | 配置键 | 字段类型 | 描述 | Wiki 链接 |
|---------|--------|---------|------|----------|
| 最小擦拭量 | filament_minimal_purge_on_wipe_tower | 数字（mm³） | 擦拭塔的最小挤出量 | material_multimaterial#multimaterial-wipe-tower-parameters |
| 塔预挤出距离 | filament_tower_interface_pre_extrusion_dist | 数字 | 预挤出开始的距离 | material_multimaterial#multimaterial-wipe-tower-parameters |
| 塔预挤出长度 | filament_tower_interface_pre_extrusion_length | 数字（mm） | 预挤出的长度 | material_multimaterial#multimaterial-wipe-tower-parameters |
| 塔烫平面积 | filament_tower_ironing_area | 数字（mm²） | 烫平区域 | material_multimaterial#multimaterial-wipe-tower-parameters |
| 塔界面冲洗体积 | filament_tower_interface_purge_volume | 数字（mm³） | 界面冲洗体积 | material_multimaterial#multimaterial-wipe-tower-parameters |
| 塔界面打印温度 | filament_tower_interface_print_temp | 数字（℃） | 界面打印温度 | material_multimaterial#multimaterial-wipe-tower-parameters |

#### 5.2 Group: Multi Filament（多灯丝）

| 字段名称 | 配置键 | 字段类型 | 描述 | Wiki 链接 |
|---------|--------|---------|------|----------|
| 更换时长回抽 | long_retractions_when_ec | 布尔值 | 灯丝更换时的长回抽 | material_multimaterial#multi-filament |
| 更换回抽距离 | retraction_distances_when_ec | 字符串 | 更换时的回抽距离列表 | material_multimaterial#multi-filament |

#### 5.3 Group: Tool change parameters with single extruder MM printers（单喷头MM打印机工具更换参数）<span style="color:blue">param_toolchange</span>

| 字段名称 | 配置键 | 字段类型 | 描述 | Wiki 链接 |
|---------|--------|---------|------|----------|
| 加载启动速度 | filament_loading_speed_start | 数字（mm/s） | 加载开始速度 | material_multimaterial#loading-speed-at-the-start |
| 加载速度 | filament_loading_speed | 数字（mm/s） | 加载标准速度 | material_multimaterial#loading-speed |
| 卸载启动速度 | filament_unloading_speed_start | 数字（mm/s） | 卸载开始速度 | material_multimaterial#unloading-speed-at-the-start |
| 卸载速度 | filament_unloading_speed | 数字（mm/s） | 卸载标准速度 | material_multimaterial#unloading-speed |
| 工具更换延迟 | filament_toolchange_delay | 数字（秒） | 更换后的等待时间 | material_multimaterial#delay-after-unloading |
| 冷却移动次数 | filament_cooling_moves | 整数 | 冷却移动的次数 | material_multimaterial#number-of-cooling-moves |
| 冷却初速度 | filament_cooling_initial_speed | 数字（mm/s） | 第一次冷却移动速度 | material_multimaterial#speed-of-the-first-cooling-move |
| 冷却末速度 | filament_cooling_final_speed | 数字（mm/s） | 最后一次冷却移动速度 | material_multimaterial#speed-of-the-last-cooling-move |
| 冲压加载速度 | filament_stamping_loading_speed | 数字（mm/s） | 冲压加载速度 | material_multimaterial#stamping-loading-speed |
| 冲压距离 | filament_stamping_distance | 数字（mm） | 冲压距离 | material_multimaterial#stamping-distance |
| 填充参数 | filament_ramming_parameters | 对话/代码 | 填充参数配置 | material_multimaterial#ramming-parameters |

#### 5.4 Group: Tool change parameters with multi extruder MM printers（多喷头MM打印机工具更换参数）<span style="color:blue">param_toolchange_multi_extruder</span>

| 字段名称 | 配置键 | 字段类型 | 描述 | Wiki 链接 |
|---------|--------|---------|------|----------|
| 多工具填充 | filament_multitool_ramming | 布尔值 | 启用多工具填充 | material_multimaterial#tool-change-parameters-with-multi-extruder |
| 多工具填充体积 | filament_multitool_ramming_volume | 数字（mm³） | 填充体积 | material_multimaterial#multi-tool-ramming-volume |
| 多工具填充流量 | filament_multitool_ramming_flow | 数字 | 填充流量比 | material_multimaterial#multi-tool-ramming-flow |

---

### Page 6: **Dependencies（依赖关系）**

#### 6.1 Group: Compatible printers（兼容打印机）<span style="color:blue">param_dependencies_printers</span>

| 字段名称 | 配置键 | 字段类型 | 描述 | Wiki 链接 |
|---------|--------|---------|------|----------|
| 兼容打印机 | compatible_printers | 打印机选择器 | 此灯丝兼容的打印机列表 | material_dependencies#compatible-printers |
| 兼容打印机条件 | compatible_printers_condition | 文本（表达式） | 兼容性条件表达式 | material_dependencies#compatible-printers |

#### 6.2 Group: Compatible process profiles（兼容工艺配置文件）<span style="color:blue">param_dependencies_presets</span>

| 字段名称 | 配置键 | 字段类型 | 描述 | Wiki 链接 |
|---------|--------|---------|------|----------|
| 兼容工艺配置 | compatible_prints | 工艺选择器 | 此灯丝兼容的工艺配置列表 | material_dependencies#compatible-process-profiles |
| 兼容工艺条件 | compatible_prints_condition | 文本（表达式） | 兼容性条件表达式 | material_dependencies#compatible-process-profiles |

---

### Page 7: **Notes（备注）**

#### 7.1 Group: Notes<span style="color:blue">note</span>

| 字段名称 | 配置键 | 字段类型 | 描述 |
|---------|--------|---------|------|
| 灯丝备注 | filament_notes | 文本（多行） | 关于此灯丝的自定义备注 |

---

## UI 字段类型参考

| 类型 | 描述 | 示例值 |
|-----|------|--------|
| **数字** | 浮点或整数输入 | 200.5, 100 |
| **整数** | 整数输入 | 5, -2 |
| **布尔值** | 复选框 | true, false |
| **选项框** | 下拉选择 | PLA, PETG, ABS |
| **颜色** | 颜色选择器 | #FF0000, #00FF00 |
| **百分比** | 0-100 的百分比 | 50 (表示50%) |
| **代码** | 多行代码编辑器 | G28; G29; M104 |
| **文本** | 单行文本 | "描述文本" |
| **组合字段** | 多个相关字段组合 | 温度范围、坐标对等 |
| **选择器** | 列表选择控件 | 打印机/配置文件列表 |

---

## 分组总览

```
Filament (材料)
├── Basic information (基本信息) - 7个+温度范围
├── Flow ratio and Pressure Advance (流量和压力提前) - 7个
├── Print chamber temperature (打印腔温度) - 2个
├── Print temperature (打印温度) - 2个
├── Bed temperature (床温) - 12个（6个床面，每个2个温度）
└── Volumetric speed limitation (体积速度限制) - 2个

Cooling (冷却)
├── Cooling for specific layer (特定层冷却) - 2个
├── Part cooling fan (部件冷却) - 12个
├── Auxiliary part cooling fan (辅助冷却) - 1个
└── Exhaust fan (排气) - 3个

Setting Overrides (设置覆盖)
├── Retraction (回抽) - 14个（带覆盖控制）
└── Ironing (烫平) - 4个（带覆盖控制）

Advanced (高级)
├── Filament start G-code (开始代码) - 1个
└── Filament end G-code (结束代码) - 1个

Multimaterial (多材料)
├── Wipe tower parameters (擦拭塔) - 6个
├── Multi Filament (多灯丝) - 2个
├── Tool change w/ single extruder (单喷头工具更换) - 10个
└── Tool change w/ multi extruder (多喷头工具更换) - 3个

Dependencies (依赖)
├── Compatible printers (兼容打印机) - 2个
└── Compatible process profiles (兼容工艺) - 2个

Notes (备注)
└── Notes (备注) - 1个
```

---

## 总体统计

- **总 Pages（页面）**: 7
- **总 Groups（分组）**: 25+
- **总字段数**: ~125+
- **可覆盖字段**: 18（在Setting Overrides中）
- **温度相关字段**: 18（各种床面和腔体温度）
- **布尔值字段**: ~35
- **数值字段**: ~65
- **代码字段**: 3（G-code相关）

---

## 关键设计特点

### 1. **分层设计**
- **Page 1 (Filament)**: 基础材料属性和打印温度
- **Page 2 (Cooling)**: 冷却系统配置
- **Page 3 (Setting Overrides)**: 灯丝特定的回抽和烫平覆盖
- **Page 4 (Advanced)**: G代码定制
- **Page 5 (Multimaterial)**: 多材料打印支持
- **Page 6 (Dependencies)**: 兼容性声明
- **Page 7 (Notes)**: 用户备注

### 2. **多床面支持**
支持6种不同的床面类型，每种都有初始层和标准层两个温度设置：
- Cool Plate (SuperTack)
- Cool Plate
- Textured Cool Plate
- Engineering Plate
- Smooth PEI Plate / High Temp Plate
- Textured PEI Plate

### 3. **覆盖机制**
在 Setting Overrides 页面中，用户可以为单个灯丝设置特定的回抽和烫平参数，通过复选框启用/禁用。

### 4. **自适应功能**
- 自适应体积速度
- 自适应压力提前（支持普通、悬垂、桥接三种）

### 5. **工艺集成**
- 支持与打印工艺配置的兼容性声明
- 支持与打印机兼容性声明
- 支持条件表达式定义兼容性规则

---

## 常用参数范围参考

| 参数 | 最小值 | 典型值 | 最大值 | 单位 |
|-----|--------|--------|--------|-----|
| 喷嘴温度 | 150 | 200-250 | 300+ | ℃ |
| 床温(冷板) | 0 | 30-50 | 80 | ℃ |
| 床温(热板) | 0 | 50-100 | 120 | ℃ |
| 灯丝直径 | 1.4 | 1.75/2.85 | 4 | mm |
| 流量比 | 80 | 100 | 120 | % |
| PA值 | 0 | 0.02-0.05 | 0.1 | - |
| 回抽长度 | 0 | 3-5 | 15 | mm |
| 回抽速度 | 20 | 40-90 | 150 | mm/s |
| 和Z跳跃 | 0 | 0.2-0.5 | 2 | mm |
| 风扇速度 | 0 | 50 | 100 | % |

---

## 导出格式

本文档也可以导出为以下格式：
- ✅ Markdown（当前格式）
- 📋 JSON Schema
- 🗄️ SQL 数据库结构
- 📊 Excel/CSV
- 🎨 UI 原型

