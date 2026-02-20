/**
 * 简体中文语言包
 *
 * 字段标签 (fields) 来源于 OrcaSlicer 翻译链：
 *   PrintConfig.cpp L("English Label") → OrcaSlicer_zh_CN.po msgstr
 *   部分标签为本项目自定义描述
 *
 * 更新步骤:
 *   1. 在 OrcaSlicer PrintConfig.cpp 中找到参数定义: this->add("json_key", ...)
 *   2. 找到对应英文标签: def->label = L("English Label")
 *   3. 在 OrcaSlicer_zh_CN.po 中搜索该英文标签获取中文翻译: msgid → msgstr
 *   4. 将 json_key → 中文翻译 添加到 fields 中
 */

import type { LocaleMessages } from '../types';

const zhCN: LocaleMessages = {
  // ========== 字段标签 ==========
  // key = JSON 参数名, value = 中文显示标签
  // 注释中附注 OrcaSlicer 对应的 L("...") 英文标签
  fields: {
    // ---- Filament Page: Basic Information ----
    filament_type:                       '类型',                           // L("Type")
    filament_vendor:                     '供应商',                         // L("Vendor")
    filament_soluble:                    '可溶性材料',                     // L("Soluble material")
    filament_is_support:                 '支撑材料',                       // L("Support material")
    filament_change_length:              '耗材冲击长度',                   // L("Filament ramming length")
    required_nozzle_HRC:                 '喷嘴硬度要求',                   // L("Required nozzle HRC")
    default_filament_colour:             '默认颜色',                       // --
    filament_diameter:                   '直径',                           // L("Diameter")
    filament_adhesiveness_category:      '粘性分类',                       // L("Adhesiveness Category")
    filament_density:                    '密度',                           // L("Filament density")
    filament_shrink:                     '收缩率（XY）',                   // L("Shrinkage (XY)")
    filament_shrinkage_compensation_z:   '收缩率（Z）',                    // L("Shrinkage (Z)")
    filament_cost:                       '价格',                           // L("Price")
    temperature_vitrification:           '软化温度',                       // L("Softening temperature")
    idle_temperature:                    '待机温度',                       // L("Idle temperature")
    nozzle_temperature_range_low:        '建议喷嘴温度（最小）',           // L("Min")
    nozzle_temperature_range_high:       '建议喷嘴温度（最大）',           // L("Max")

    // ---- Filament Page: Flow Ratio and Pressure Advance ----
    filament_flow_ratio:                 '流量比例',                       // L("Flow ratio")
    enable_pressure_advance:             '启用压力提前',                   // L("Enable pressure advance")
    pressure_advance:                    '压力提前',                       // L("Pressure advance")
    adaptive_pressure_advance:           '启用自适应压力提前（试验）',     // L("Enable adaptive pressure advance for overhangs (beta)")

    // ---- Filament Page: Chamber Temperature ----
    chamber_temperatures:                '激活温度控制',                   // L("Activate temperature control")

    // ---- Filament Page: Print Temperature ----
    nozzle_temperature_initial_layer:    '喷嘴（首层）',                   // L("Initial layer")
    nozzle_temperature:                  '喷嘴（其它层）',                 // L("Other layers")

    // ---- Filament Page: Bed Temperature ----
    supertack_plate_temp_initial_layer:  '低温打印板（超强粘附）首层',      // L("Initial layer")
    supertack_plate_temp:                '低温打印板（超强粘附）其它层',    // L("Other layers")
    cool_plate_temp_initial_layer:       '低温打印板首层',                 // L("Initial layer")
    cool_plate_temp:                     '低温打印板其它层',               // L("Other layers")
    textured_cool_plate_temp_initial_layer: '纹理低温打印板首层',          // L("Initial layer")
    textured_cool_plate_temp:            '纹理低温打印板其它层',           // L("Other layers")
    eng_plate_temp_initial_layer:        '工程板首层',                     // L("Initial layer")
    eng_plate_temp:                      '工程板其它层',                   // L("Other layers")
    hot_plate_temp_initial_layer:        '高温打印板首层',                 // L("Initial layer")
    hot_plate_temp:                      '高温打印板其它层',               // L("Other layers")
    textured_plate_temp_initial_layer:   '纹理PEI热床首层',               // L("Initial layer")
    textured_plate_temp:                 '纹理PEI热床其它层',             // L("Other layers")

    // ---- Filament Page: Volumetric Speed ----
    filament_adaptive_volumetric_speed:  '自适应体积速度',                 // L("Adaptive volumetric speed")
    filament_max_volumetric_speed:       '最大体积速度',                   // L("Max volumetric speed")

    // ---- Cooling Page: 特定层冷却 ----
    close_fan_the_first_x_layers:        '关闭冷却对前',                   // L("No cooling for the first")
    full_fan_speed_layer:                '满速风扇在',                     // L("Full fan speed at layer")

    // ---- Cooling Page: 部件冷却风扇 ----
    fan_min_speed:                       '最小风扇速度阈值（风扇速度）',   // L("Fan speed")
    fan_cooling_layer_time:              '最小风扇速度阈值（层时间）',     // L("Layer time")
    fan_max_speed:                       '最大风扇速度阈值（风扇速度）',   // L("Fan speed")
    slow_down_layer_time:                '最大风扇速度阈值（层时间）',     // L("Layer time")
    reduce_fan_stop_start_freq:          '保持风扇常开',                   // L("Keep fan always on")
    slow_down_for_layer_cooling:         '降低打印速度 以得到更好的冷却',  // L("Slow printing down for better layer cooling")
    no_slow_down_for_cooling_on_outwalls:'不减速外墙',                     // L("Don't slow down outer walls")
    slow_down_min_speed:                 '最小打印速度',                   // L("Min print speed")
    enable_overhang_bridge_fan:          '悬垂/桥接强制冷却',             // L("Force cooling for overhangs and bridges")
    overhang_fan_threshold:              '悬垂冷却激活阈值',               // L("Overhang cooling activation threshold")
    overhang_fan_speed:                  '悬垂和外部桥接风扇速度',         // L("Overhangs and external bridges fan speed")
    internal_bridge_fan_speed:           '内部桥接风扇速度',               // L("Internal bridges fan speed")
    support_material_interface_fan_speed:'支撑接触面风扇速度',             // L("Support interface fan speed")
    ironing_fan_speed:                   '熨烫时风扇速度',                 // L("Ironing fan speed")

    // ---- Cooling Page: 辅助冷却风扇 ----
    additional_cooling_fan_speed:        '风扇速度',                       // L("Fan speed")

    // ---- Cooling Page: 排气风扇 ----
    activate_air_filtration:             '启用空气过滤/排气',              // L("Activate air filtration")
    during_print_exhaust_fan_speed:      '打印中',                         // L("Fan speed")
    complete_print_exhaust_fan_speed:    '完成打印',                       // L("Fan speed")

    // ---- Setting Overrides: 回抽 ----
    filament_retraction_length:          '长度',                           // L("Retraction length")
    filament_z_hop:                      'Z抬升高度',                      // L("Z hop")
    filament_z_hop_types:                'Z抬升类型',                      // L("Z hop type")
    filament_retract_lift_above:         '仅在高度以上抬Z',                // L("Only lift Z above")
    filament_retract_lift_below:         '仅在高度以下抬Z',                // L("Only lift Z below")
    filament_retract_lift_enforce:       '仅表面抬Z',                      // L("On surfaces")
    filament_retraction_speed:           '回抽速度',                       // L("Retraction speed")
    filament_deretraction_speed:         '重新装填速度',                   // L("Deretraction speed")
    filament_retract_restart_extra:      '额外回填长度',                   // L("Extra length on restart")
    filament_retraction_minimum_travel:  '空驶距离阈值',                   // L("Travel distance threshold")
    filament_retract_when_changing_layer:'换层时回抽',                     // L("Retract when changing layer")
    filament_wipe:                       '回抽时擦拭',                     // L("Wipe")
    filament_wipe_distance:              '擦拭距离',                       // L("Wipe distance")
    filament_retract_before_wipe:        '擦拭前的回抽量',                 // L("Retract before wipe")
    filament_long_retractions_when_cut:  '切料时回抽（实验）',             // L("Long retraction when cut")
    filament_retraction_distances_when_cut:'切料回抽距离',                 // L("Retraction distance when cut")

    // ---- Setting Overrides: 熨烫 ----
    filament_ironing_flow:               '熨烫流量',                       // L("Ironing flow")
    filament_ironing_spacing:            '熨烫间距',                       // L("Ironing line spacing")
    filament_ironing_inset:              '熨烫内缩',                       // L("Ironing inset")
    filament_ironing_speed:              '熨烫速度',                       // L("Ironing speed")

    // ---- Advanced ----
    filament_start_gcode:                '耗材丝起始G-code',              // L("Start G-code")
    filament_end_gcode:                  '耗材丝结束G-code',              // L("End G-code")

    // ---- Multimaterial: 色塔参数 ----
    filament_minimal_purge_on_wipe_tower:'擦拭塔上的最小清理量',          // L("Minimal purge on wipe tower")
    filament_tower_interface_pre_extrusion_dist: 'Interface layer pre-extrusion distance', // L(...)
    filament_tower_interface_pre_extrusion_length: 'Interface layer pre-extrusion length', // L(...)
    filament_tower_ironing_area:         'Tower ironing area',             // L("Tower ironing area")
    filament_tower_interface_purge_volume:'Interface layer purge length',  // L(...)
    filament_tower_interface_print_temp: 'Interface layer print temperature', // L(...)

    // ---- Multimaterial: 单挤出机换色参数 ----
    filament_loading_speed_start:        '加载初始速度',                   // L("Loading speed at the start")
    filament_loading_speed:              '装载速度',                       // L("Loading speed")
    filament_unloading_speed_start:      '卸载初始速度',                   // L("Unloading speed at the start")
    filament_unloading_speed:            '卸载速度',                       // L("Unloading speed")
    filament_toolchange_delay:           '卸载后延迟',                     // L("Delay after unloading")
    filament_cooling_moves:              '冷却移动次数',                   // L("Number of cooling moves")
    filament_cooling_initial_speed:      '第一次冷却移动的速度',           // L("Speed of the first cooling move")
    filament_cooling_final_speed:        '最后一次冷却移动的速度',         // L("Speed of the last cooling move")
    filament_ramming_volumetric_speed:   '尖端成型加载速度',               // --
    filament_stamping_distance:          '从冷却管中心测量的尖端成型距离', // L("Stamping distance...")

    // ---- Multimaterial: 多挤出机换色参数 ----
    filament_multitool_ramming:          '启用多色尖端成型设置',           // --
    filament_multitool_ramming_volume:   '多色尖端成型体积',               // --
    filament_multitool_ramming_flow:     '多色尖端成型流量',               // --

    // ---- Dependencies ----
    compatible_printers:                 '兼容打印机',                     // L("Compatible printers")

    // ---- Notes ----
    filament_notes:                      '备注',                           // L("Notes")
  },

  // ========== 配对字段标签 ==========
  pairs: {
    nozzle_temp_range:    { label: '建议喷嘴温度', left: '最小', right: '最大' },
    nozzle_temp:          { label: '喷嘴', left: '首层', right: '其它层' },
    supertack_plate:      { label: '低温打印板（超强粘附）', left: '首层', right: '其它层' },
    cool_plate:           { label: '低温打印板', left: '首层', right: '其它层' },
    textured_cool_plate:  { label: '纹理低温打印板', left: '首层', right: '其它层' },
    eng_plate:            { label: '工程板', left: '首层', right: '其它层' },
    hot_plate:            { label: '高温打印板', left: '首层', right: '其它层' },
    textured_plate:       { label: '纹理PEI热床', left: '首层', right: '其它层' },
    fan_min_threshold:    { label: '最小风扇速度阈值', left: '风扇速度', right: '层时间' },
    fan_max_threshold:    { label: '最大风扇速度阈值', left: '风扇速度', right: '层时间' },
  },

  // ========== 分组标签 ==========
  groups: {
    'information':              '基础信息',
    'flow-ratio':               '流量和压力提前',
    'chamber-temp':             '打印仓温度',
    'extruder-temp':            '打印温度',
    'bed-temp':                 '床温',
    'volumetric-speed':         '体积速度限制',
    'cooling-specific-layer':   '特定层冷却',
    'cooling-part-fan':         '部件冷却风扇',
    'cooling-aux-fan':          '辅助部件冷却风扇',
    'cooling-exhaust':          '排气风扇',
    'retraction':               '回抽',
    'ironing':                  '熨烫',
    'gcode-start':              '耗材丝起始G-code',
    'gcode-end':                '耗材丝结束G-code',
    'tower-params':             '色塔参数',
    'toolchange-single':        '单挤出机多材料打印机的换色参数',
    'toolchange-multi':         '多挤出机多材料打印机的换色参数',
    'compatible-printers':      '兼容打印机',
    'notes':                    '备注',
  },

  // ========== 页签标签 ==========
  pages: {
    'filament-basic':           '耗材丝',
    'filament-cooling':         '冷却',
    'filament-overrides':       '参数覆盖',
    'filament-advanced':        '高级',
    'filament-multimaterial':   '材料',
    'filament-dependencies':    '依赖',
    'filament-notes':           '注释',
  },

  // ========== UI 通用文案 ==========
  ui: {
    // 页面标题 & 元信息
    'site_title':               'FDM 3D 打印耗材信息',
    'site_subtitle':            'FDM Filaments Info',
    'site_description':         '浏览与检索 FDM 3D 打印耗材丝配置信息',

    // 侧边导航
    'nav_brands_title':         'FDM 3D 打印耗材品牌',
    'nav_brands_guide':         '耗材 → 耗材类型 → 耗材系列 → 耗材丝设置',
    'nav_section_brand':        '品牌',
    'nav_filament_settings':    '耗材丝设置',

    // 面包屑
    'breadcrumb_root':          '耗材',

    // 状态
    'loading':                  '正在加载...',
    'error_load':               '无法加载耗材数据',
    'error_load_nav':           '加载失败',
    'error_retry':              '请检查网络或刷新重试',

    // 导航 & 筛选
    'type':                     '类型',
    'series':                   '系列',
    'material_type':            '材料类型',
    'product_series':           '产品系列',
    'no_types':                 '暂无可用类型',
    'no_series':                '暂无可用系列',
    'select_type_first':        '请先选择类型',
    'select_brand_first':       '请先选择品牌',
    'select_type_prompt':       '请先选择耗材类型',
    'select_series_prompt':     '请选择耗材系列',
    'select_brand_prompt':      '请先在左侧菜单选择品牌',
    'select_type_above':        '请在上方选择耗材类型',
    'select_series_above':      '请在上方选择耗材系列',
    'brand_instruction':        '选择下方的类型和系列查看耗材配置',
    'no_profiles':              '暂无该系列的配置',
    'profile_count':            '共 {count} 个配置',

    // 配置列表
    'back_to_list':             '返回列表',
    'n_profiles':               '{count} 个配置',
    'compatible_printers':      '兼容打印机',
    'all':                      '全部',

    // 详情页
    'view_source':              '查看源代码',
    'back_to_value':            '返回数值',
    'page_no_data':             '本页暂无配置数据',
    'not_overridden':           '未覆盖（使用打印机默认值）',
  },

  // ========== 枚举值翻译 ==========
  // key = JSON 中的原始英文值, value = 中文翻译
  values: {
    // filament_z_hop_types (Z抬升类型)
    'Auto Lift':                '自动',                           // L("Auto")
    'Normal Lift':              '普通',                           // L("Normal")
    'Slope Lift':               '梯形',                           // L("Slope")
    'Spiral Lift':              '螺旋',                           // L("Spiral")

    // filament_retract_lift_enforce (仅表面抬Z)
    'All Surfaces':             '所有表面',                       // L("All Surfaces")
    'Top Only':                 '仅顶面',                       // L("Top Only")
    'Bottom Only':              '仅底面',                       // L("Bottom Only")
    'Top and Bottom':           '顶面和底面',                     // L("Top and Bottom")
  },
};

export default zhCN;
