/**
 * OrcaSlicer 耗材配置字段与 Tab/Page/Group 的映射
 * 将 JSON 配置字段组织成 OrcaSlicer 的实际 UI 结构
 */

import { Option, OptionGroup, TabPage } from './orcaSlicerStructure';

/**
 * 耗材 JSON 字段 → OrcaSlicer UI 结构的映射 (完整)
 * paired: 标记配对字段，同一行显示两个值
 *   - pairKey: 配对行的唯一标识
 *   - pairLabel: 配对行的整行标签
 *   - pairPosition: 'left' | 'right' 表示在该行的位置
 *   - pairLeftLabel / pairRightLabel: 左右子标签
 */
export const FILAMENT_FIELD_MAP: Record<string, {
  pageId: string;
  groupId: string;
  label: string;
  kind?: string;
  unit?: string;
  paired?: {
    pairKey: string;
    pairLabel: string;
    pairPosition: 'left' | 'right';
    pairLeftLabel: string;
    pairRightLabel: string;
  };
}> = {
  // ============ FILAMENT PAGE ============
  
  // Basic Information Group
  filament_type: { pageId: 'filament-basic', groupId: 'information', label: '类型' },
  filament_vendor: { pageId: 'filament-basic', groupId: 'information', label: '供应商' },
  filament_soluble: { pageId: 'filament-basic', groupId: 'information', label: '可溶性材料', kind: 'bool' },
  filament_is_support: { pageId: 'filament-basic', groupId: 'information', label: '支撑材料', kind: 'bool' },
  filament_change_length: { pageId: 'filament-basic', groupId: 'information', label: '耗材冲击长度', unit: 'mm' },
  required_nozzle_HRC: { pageId: 'filament-basic', groupId: 'information', label: '喷嘴硬度要求' },
  default_filament_colour: { pageId: 'filament-basic', groupId: 'information', label: '默认颜色' },
  filament_diameter: { pageId: 'filament-basic', groupId: 'information', label: '直径', unit: 'mm' },
  filament_adhesiveness_category: { pageId: 'filament-basic', groupId: 'information', label: '粘性分类' },
  filament_density: { pageId: 'filament-basic', groupId: 'information', label: '密度', unit: '克/立方厘米' },
  filament_shrink: { pageId: 'filament-basic', groupId: 'information', label: '收缩率（XY）', unit: '%' },
  filament_shrinkage_compensation_z: { pageId: 'filament-basic', groupId: 'information', label: '收缩率（Z）', unit: '%' },
  filament_cost: { pageId: 'filament-basic', groupId: 'information', label: '价格', unit: 'money/kg' },
  temperature_vitrification: { pageId: 'filament-basic', groupId: 'information', label: '软化温度', unit: '℃' },
  idle_temperature: { pageId: 'filament-basic', groupId: 'information', label: '待机温度', unit: '℃' },
  // 建议喷嘴温度 - 配对行（最小 + 最大）
  nozzle_temperature_range_low: {
    pageId: 'filament-basic', groupId: 'information', label: '建议喷嘴温度（最小）', unit: '℃',
    paired: { pairKey: 'nozzle_temp_range', pairLabel: '建议喷嘴温度', pairPosition: 'left', pairLeftLabel: '最小', pairRightLabel: '最大' },
  },
  nozzle_temperature_range_high: {
    pageId: 'filament-basic', groupId: 'information', label: '建议喷嘴温度（最大）', unit: '℃',
    paired: { pairKey: 'nozzle_temp_range', pairLabel: '建议喷嘴温度', pairPosition: 'right', pairLeftLabel: '最小', pairRightLabel: '最大' },
  },

  // Flow Ratio and Pressure Advance Group
  filament_flow_ratio: { pageId: 'filament-basic', groupId: 'flow-ratio', label: '流量比例' },
  enable_pressure_advance: { pageId: 'filament-basic', groupId: 'flow-ratio', label: '启用压力提前', kind: 'bool' },
  pressure_advance: { pageId: 'filament-basic', groupId: 'flow-ratio', label: '压力提前' },
  adaptive_pressure_advance: { pageId: 'filament-basic', groupId: 'flow-ratio', label: '启用自适应压力提前（试验）', kind: 'bool' },

  // Chamber Temperature Group
  activate_chamber_temp_control: { pageId: 'filament-basic', groupId: 'chamber-temp', label: '激活温度控制', kind: 'bool' },

  // Print Temperature Group - 配对行（首层 + 其它层）
  nozzle_temperature_initial_layer: {
    pageId: 'filament-basic', groupId: 'extruder-temp', label: '喷嘴（首层）', unit: '℃',
    paired: { pairKey: 'nozzle_temp', pairLabel: '喷嘴', pairPosition: 'left', pairLeftLabel: '首层', pairRightLabel: '其它层' },
  },
  nozzle_temperature: {
    pageId: 'filament-basic', groupId: 'extruder-temp', label: '喷嘴（其它层）', unit: '℃',
    paired: { pairKey: 'nozzle_temp', pairLabel: '喷嘴', pairPosition: 'right', pairLeftLabel: '首层', pairRightLabel: '其它层' },
  },

  // Bed Temperature Group - 所有配对行（首层 + 其它层）
  supertack_plate_temp_initial_layer: {
    pageId: 'filament-basic', groupId: 'bed-temp', label: '低温打印板（超强粘附）首层', unit: '℃',
    paired: { pairKey: 'supertack_plate', pairLabel: '低温打印板（超强粘附）', pairPosition: 'left', pairLeftLabel: '首层', pairRightLabel: '其它层' },
  },
  supertack_plate_temp: {
    pageId: 'filament-basic', groupId: 'bed-temp', label: '低温打印板（超强粘附）其它层', unit: '℃',
    paired: { pairKey: 'supertack_plate', pairLabel: '低温打印板（超强粘附）', pairPosition: 'right', pairLeftLabel: '首层', pairRightLabel: '其它层' },
  },
  cool_plate_temp_initial_layer: {
    pageId: 'filament-basic', groupId: 'bed-temp', label: '低温打印热床首层', unit: '℃',
    paired: { pairKey: 'cool_plate', pairLabel: '低温打印热床', pairPosition: 'left', pairLeftLabel: '首层', pairRightLabel: '其它层' },
  },
  cool_plate_temp: {
    pageId: 'filament-basic', groupId: 'bed-temp', label: '低温打印热床其它层', unit: '℃',
    paired: { pairKey: 'cool_plate', pairLabel: '低温打印热床', pairPosition: 'right', pairLeftLabel: '首层', pairRightLabel: '其它层' },
  },
  textured_cool_plate_temp_initial_layer: {
    pageId: 'filament-basic', groupId: 'bed-temp', label: '纹理的低温打印床首层', unit: '℃',
    paired: { pairKey: 'textured_cool_plate', pairLabel: '纹理的低温打印床', pairPosition: 'left', pairLeftLabel: '首层', pairRightLabel: '其它层' },
  },
  textured_cool_plate_temp: {
    pageId: 'filament-basic', groupId: 'bed-temp', label: '纹理的低温打印床其它层', unit: '℃',
    paired: { pairKey: 'textured_cool_plate', pairLabel: '纹理的低温打印床', pairPosition: 'right', pairLeftLabel: '首层', pairRightLabel: '其它层' },
  },
  eng_plate_temp_initial_layer: {
    pageId: 'filament-basic', groupId: 'bed-temp', label: '工程材料热床首层', unit: '℃',
    paired: { pairKey: 'eng_plate', pairLabel: '工程材料热床', pairPosition: 'left', pairLeftLabel: '首层', pairRightLabel: '其它层' },
  },
  eng_plate_temp: {
    pageId: 'filament-basic', groupId: 'bed-temp', label: '工程材料热床其它层', unit: '℃',
    paired: { pairKey: 'eng_plate', pairLabel: '工程材料热床', pairPosition: 'right', pairLeftLabel: '首层', pairRightLabel: '其它层' },
  },
  hot_plate_temp_initial_layer: {
    pageId: 'filament-basic', groupId: 'bed-temp', label: '光滑PEI板/高温板首层', unit: '℃',
    paired: { pairKey: 'hot_plate', pairLabel: '光滑PEI板/高温板', pairPosition: 'left', pairLeftLabel: '首层', pairRightLabel: '其它层' },
  },
  hot_plate_temp: {
    pageId: 'filament-basic', groupId: 'bed-temp', label: '光滑PEI板/高温板其它层', unit: '℃',
    paired: { pairKey: 'hot_plate', pairLabel: '光滑PEI板/高温板', pairPosition: 'right', pairLeftLabel: '首层', pairRightLabel: '其它层' },
  },
  textured_plate_temp_initial_layer: {
    pageId: 'filament-basic', groupId: 'bed-temp', label: '纹理PEI热床首层', unit: '℃',
    paired: { pairKey: 'textured_plate', pairLabel: '纹理PEI热床', pairPosition: 'left', pairLeftLabel: '首层', pairRightLabel: '其它层' },
  },
  textured_plate_temp: {
    pageId: 'filament-basic', groupId: 'bed-temp', label: '纹理PEI热床其它层', unit: '℃',
    paired: { pairKey: 'textured_plate', pairLabel: '纹理PEI热床', pairPosition: 'right', pairLeftLabel: '首层', pairRightLabel: '其它层' },
  },

  // Volumetric Speed Limitation Group
  filament_adaptive_volumetric_speed: { pageId: 'filament-basic', groupId: 'volumetric-speed', label: '自适应体积速度', kind: 'bool' },
  filament_max_volumetric_speed: { pageId: 'filament-basic', groupId: 'volumetric-speed', label: '最大体积速度', unit: '毫米立方/秒' },

  // ============ COOLING PAGE ============
  
  // Cooling Fan Settings Group
  first_x_layer_fan_speed: { pageId: 'filament-cooling', groupId: 'cooling-fan', label: '初始层风扇速度', unit: '%' },
  fan_min_speed: { pageId: 'filament-cooling', groupId: 'cooling-fan', label: '最小风扇速度', unit: '%' },
  fan_max_speed: { pageId: 'filament-cooling', groupId: 'cooling-fan', label: '最大风扇速度', unit: '%' },
  full_fan_speed_layer: { pageId: 'filament-cooling', groupId: 'cooling-fan', label: '满速风扇在第 X 层' },
  slow_down_for_layer_cooling: { pageId: 'filament-cooling', groupId: 'cooling-fan', label: '启用冷却减速', kind: 'bool' },
  slow_down_layer_time: { pageId: 'filament-cooling', groupId: 'cooling-fan', label: '冷却层时间', unit: 's' },
  slow_down_min_speed: { pageId: 'filament-cooling', groupId: 'cooling-fan', label: '最小打印速度', unit: 'mm/s' },
  reduce_fan_stop_start_freq: { pageId: 'filament-cooling', groupId: 'cooling-fan', label: '保持风扇常开', kind: 'bool' },
  no_slow_down_for_cooling_on_outwalls: { pageId: 'filament-cooling', groupId: 'cooling-fan', label: '不减速外墙', kind: 'bool' },
  fan_cooling_layer_time: { pageId: 'filament-cooling', groupId: 'cooling-fan', label: '风扇冷却层时间', unit: 's' },

  // Auxiliary Cooling Fan Group
  additional_cooling_fan_speed: { pageId: 'filament-cooling', groupId: 'cooling-aux-fan', label: '辅助冷却风扇速度', unit: '%' },

  // Part Cooling Fan Group
  pre_start_fan_time: { pageId: 'filament-cooling', groupId: 'cooling-part-fan', label: '打印前启动风扇' },

  // Layer Cooling Group
  overhang_fan_speed: { pageId: 'filament-cooling', groupId: 'cooling-specific-layer', label: '悬垂/桥接风扇速度', unit: '%' },
  enable_overhang_bridge_fan: { pageId: 'filament-cooling', groupId: 'cooling-specific-layer', label: '启用悬垂/桥接风扇', kind: 'bool' },
  overhang_fan_threshold: { pageId: 'filament-cooling', groupId: 'cooling-specific-layer', label: '悬垂/桥接风扇激活阈值' },
  overhanging_threshold_participating_cooling: { pageId: 'filament-cooling', groupId: 'cooling-specific-layer', label: '悬垂和部件冷却参与阈值' },
  close_fan_the_first_x_layers: { pageId: 'filament-cooling', groupId: 'cooling-specific-layer', label: '前几层关闭风扇' },
  filament_enable_overhang_speed: { pageId: 'filament-cooling', groupId: 'cooling-specific-layer', label: '启用悬垂速度', kind: 'bool' },

  // Exhaust Control Group
  during_print_exhaust_fan_speed: { pageId: 'filament-cooling', groupId: 'cooling-exhaust', label: '打印中排风扇速度', unit: '%' },
  complete_print_exhaust_fan_speed: { pageId: 'filament-cooling', groupId: 'cooling-exhaust', label: '打印完成排风扇速度', unit: '%' },
  activate_air_filtration: { pageId: 'filament-cooling', groupId: 'cooling-exhaust', label: '启用空气过滤', kind: 'bool' },

  // ============ SETTING OVERRIDES PAGE ============
  
  // Retraction Group
  filament_retraction_length: { pageId: 'filament-overrides', groupId: 'retraction', label: '回抽长度', unit: 'mm' },
  filament_retraction_length_nc: { pageId: 'filament-overrides', groupId: 'retraction', label: '回抽长度 (无切换)', unit: 'mm' },
  filament_retraction_speed: { pageId: 'filament-overrides', groupId: 'retraction', label: '回抽速度', unit: 'mm/s' },
  filament_deretraction_speed: { pageId: 'filament-overrides', groupId: 'retraction', label: '反回抽速度', unit: 'mm/s' },
  filament_z_hop: { pageId: 'filament-overrides', groupId: 'retraction', label: 'Z升降高度', unit: 'mm' },
  filament_z_hop_types: { pageId: 'filament-overrides', groupId: 'retraction', label: 'Z升降类型' },
  filament_retract_when_changing_layer: { pageId: 'filament-overrides', groupId: 'retraction', label: '仅在高度以上提Z', unit: 'mm' },
  filament_retraction_minimum_travel: { pageId: 'filament-overrides', groupId: 'retraction', label: '仅在高度以下提Z', unit: 'mm' },
  filament_wipe: { pageId: 'filament-overrides', groupId: 'retraction', label: '回抽撤销', kind: 'bool' },
  filament_wipe_distance: { pageId: 'filament-overrides', groupId: 'retraction', label: '回抽撤销距离', unit: 'mm' },
  filament_retract_before_wipe: { pageId: 'filament-overrides', groupId: 'retraction', label: '切料回抽 (实验)', unit: '%' },
  filament_change_length_nc: { pageId: 'filament-overrides', groupId: 'retraction', label: '回抽距离 (无切换)', unit: 'mm' },
  filament_retraction_distances_when_cut: { pageId: 'filament-overrides', groupId: 'retraction', label: '切料回抽距离', unit: 'mm' },
  filament_long_retractions_when_cut: { pageId: 'filament-overrides', groupId: 'retraction', label: '长回抽', kind: 'bool' },
  filament_retract_restart_extra: { pageId: 'filament-overrides', groupId: 'retraction', label: '回抽恢复补偿', unit: 'mm' },

  // Ironing Group
  filament_ironing: { pageId: 'filament-overrides', groupId: 'ironing', label: '启用光平', kind: 'bool' },
  filament_ironing_speed: { pageId: 'filament-overrides', groupId: 'ironing', label: '光平速度', unit: 'mm/s' },

  // ============ ADVANCED PAGE ============
  
  // G-code Start Group
  filament_start_gcode: { pageId: 'filament-advanced', groupId: 'gcode-start', label: '耗材启动 G-code', kind: 'multiline' },
  
  // G-code End Group
  filament_end_gcode: { pageId: 'filament-advanced', groupId: 'gcode-end', label: '耗材结束 G-code', kind: 'multiline' },

  // ============ MULTIMATERIAL PAGE ============
  
  // Wipe Tower Parameters Group
  filament_tower_interface_pre_extrusion_dist: { pageId: 'filament-multimaterial', groupId: 'tower-params', label: '接触层预挤出距离', unit: 'mm' },
  filament_tower_interface_pre_extrusion_length: { pageId: 'filament-multimaterial', groupId: 'tower-params', label: '接触层预挤出长度', unit: 'mm' },
  filament_tower_ironing_area: { pageId: 'filament-multimaterial', groupId: 'tower-params', label: '擦拭塔熨烫面积', unit: 'mm²' },
  filament_tower_interface_purge_volume: { pageId: 'filament-multimaterial', groupId: 'tower-params', label: '擦拭塔冲刷长度', unit: 'mm' },
  filament_tower_interface_print_temp: { pageId: 'filament-multimaterial', groupId: 'tower-params', label: '擦拭塔打印温度', unit: '°C' },
  filament_cooling_before_tower: { pageId: 'filament-multimaterial', groupId: 'tower-params', label: '擦拭塔前冷却' },

  // Single Extruder Toolchange Color Parameters
  counter_coef_1: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', label: '单挤出头备选 1', unit: 'mm³' },
  counter_coef_2: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', label: '单挤出头备选 2', unit: 'mm³' },
  counter_coef_3: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', label: '单挤出头备选 3', unit: 'mm³' },
  counter_limit_min: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', label: '单挤出头备选最小值', unit: 'mm³' },
  counter_limit_max: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', label: '单挤出头备选最大值', unit: 'mm³' },

  // Multi Extruder Toolchange Color Parameters
  hole_coef_1: { pageId: 'filament-multimaterial', groupId: 'toolchange-multi', label: '多挤出头孔 1', unit: 'mm³' },
  hole_coef_2: { pageId: 'filament-multimaterial', groupId: 'toolchange-multi', label: '多挤出头孔 2', unit: 'mm³' },
  hole_coef_3: { pageId: 'filament-multimaterial', groupId: 'toolchange-multi', label: '多挤出头孔 3', unit: 'mm³' },
  hole_limit_min: { pageId: 'filament-multimaterial', groupId: 'toolchange-multi', label: '多挤出头孔最小值', unit: 'mm³' },
  hole_limit_max: { pageId: 'filament-multimaterial', groupId: 'toolchange-multi', label: '多挤出头孔最大值', unit: 'mm³' },

  // ============ DEPENDENCIES PAGE ============
  
  // Compatible Printers Group
  compatible_printers: { pageId: 'filament-dependencies', groupId: 'compatible-printers', label: '兼容打印机' },

  // ============ NOTES PAGE ============
  
  // Notes Group
  filament_notes: { pageId: 'filament-notes', groupId: 'notes', label: '备注', kind: 'multiline' },
};

/**
 * 获取特定页面的字段
 */
export function getPageFields(data: Record<string, any>, pageId: string): Record<string, Record<string, any[]>> {
  const result: Record<string, Record<string, any[]>> = {};

  for (const [key, value] of Object.entries(data)) {
    const mapping = FILAMENT_FIELD_MAP[key];
    if (mapping && mapping.pageId === pageId) {
      if (!result[mapping.groupId]) {
        result[mapping.groupId] = {};
      }
      if (!result[mapping.groupId][key]) {
        result[mapping.groupId][key] = [];
      }
      result[mapping.groupId][key].push({
        key,
        label: mapping.label,
        value,
        unit: mapping.unit,
        kind: mapping.kind,
        paired: mapping.paired,
      });
    }
  }

  return result;
}

/**
 * 获取字段的显示标签和其他元数据
 */
export function getFieldMetadata(fieldKey: string): { label: string; unit?: string; kind?: string; paired?: any } | null {
  const mapping = FILAMENT_FIELD_MAP[fieldKey];
  return mapping ? { label: mapping.label, unit: mapping.unit, kind: mapping.kind, paired: mapping.paired } : null;
}

/**
 * 每个 Group 内的字段显示顺序
 * 用于确保字段按 OrcaSlicer UI 中的实际顺序显示
 */
export const FIELD_ORDER: Record<string, string[]> = {
  information: [
    'filament_type', 'filament_vendor', 'filament_soluble', 'filament_is_support',
    'filament_change_length', 'required_nozzle_HRC', 'default_filament_colour',
    'filament_diameter', 'filament_adhesiveness_category', 'filament_density',
    'filament_shrink', 'filament_shrinkage_compensation_z', 'filament_cost',
    'temperature_vitrification', 'idle_temperature',
    'nozzle_temperature_range_low', 'nozzle_temperature_range_high',
  ],
  'flow-ratio': [
    'filament_flow_ratio', 'enable_pressure_advance', 'pressure_advance', 'adaptive_pressure_advance',
  ],
  'chamber-temp': ['activate_chamber_temp_control'],
  'extruder-temp': ['nozzle_temperature_initial_layer', 'nozzle_temperature'],
  'bed-temp': [
    'supertack_plate_temp_initial_layer', 'supertack_plate_temp',
    'cool_plate_temp_initial_layer', 'cool_plate_temp',
    'textured_cool_plate_temp_initial_layer', 'textured_cool_plate_temp',
    'eng_plate_temp_initial_layer', 'eng_plate_temp',
    'hot_plate_temp_initial_layer', 'hot_plate_temp',
    'textured_plate_temp_initial_layer', 'textured_plate_temp',
  ],
  'volumetric-speed': ['filament_adaptive_volumetric_speed', 'filament_max_volumetric_speed'],
};

/**
 * 按 OrcaSlicer 页面顺序获取所有页面 ID
 */
export const FILAMENT_PAGE_ORDER = [
  'filament-basic',
  'filament-cooling',
  'filament-overrides',
  'filament-advanced',
  'filament-multimaterial',
  'filament-dependencies',
  'filament-notes',
] as const;

/**
 * 按 OrcaSlicer Group 顺序获取特定页面的 Group 顺序
 */
export const GROUP_ORDER: Record<string, string[]> = {
  'filament-basic': ['information', 'flow-ratio', 'chamber-temp', 'extruder-temp', 'bed-temp', 'volumetric-speed'],
  'filament-cooling': ['cooling-fan', 'cooling-aux-fan', 'cooling-part-fan', 'cooling-specific-layer', 'cooling-exhaust'],
  'filament-overrides': ['retraction', 'ironing'],
  'filament-advanced': ['gcode-start', 'gcode-end'],
  'filament-multimaterial': ['tower-params', 'multi-filament', 'toolchange-single', 'toolchange-multi'],
  'filament-dependencies': ['compatible-printers', 'compatible-presets'],
  'filament-notes': ['notes'],
};

/**
 * Group 的显示名称和图标
 */
export const GROUP_METADATA: Record<string, { name: string; iconName?: string }> = {
  information: { name: '基础信息', iconName: 'information' },
  'flow-ratio': { name: '流量和压力提前', iconName: 'flow-ratio' },
  'chamber-temp': { name: '打印仓温度', iconName: 'chamber-temp' },
  'extruder-temp': { name: '打印温度', iconName: 'extruder-temp' },
  'bed-temp': { name: '床温', iconName: 'bed-temp' },
  'volumetric-speed': { name: '体积速度限制', iconName: 'volumetric-speed' },
  'cooling-fan': { name: '冷却风扇设置', iconName: 'cooling-fan' },
  'cooling-aux-fan': { name: '辅助风扇', iconName: 'cooling-aux-fan' },
  'cooling-part-fan': { name: '零件冷却风扇', iconName: 'cooling-part-fan' },
  'cooling-specific-layer': { name: '层冷却', iconName: 'cooling-specific-layer' },
  'cooling-exhaust': { name: '排气控制', iconName: 'cooling-exhaust' },
  retraction: { name: '回抽', iconName: 'retraction' },
  ironing: { name: '光平', iconName: 'ironing' },
  'gcode-start': { name: '耗材启动 G-code', iconName: 'gcode' },
  'gcode-end': { name: '耗材结束 G-code', iconName: 'gcode' },
  'tower-params': { name: '擦拭塔参数', iconName: 'tower' },
  'multi-filament': { name: '多耗材', iconName: 'multimaterial' },
  'toolchange-single': { name: '单挤出头工具更换参数', iconName: 'toolchange' },
  'toolchange-multi': { name: '多挤出头工具更换参数', iconName: 'toolchange-multi-extruder' },
  'compatible-printers': { name: '兼容打印机', iconName: 'dependencies-printers' },
  'compatible-presets': { name: '兼容工艺配置文件', iconName: 'dependencies-presets' },
  notes: { name: '备注', iconName: 'note' },
};

/**
 * Page 的显示名称和图标
 */
export const PAGE_METADATA: Record<string, { name: string; iconName: string }> = {
  'filament-basic': { name: '耗材', iconName: 'filament' },
  'filament-cooling': { name: '冷却', iconName: 'cooling' },
  'filament-overrides': { name: '设置覆盖', iconName: 'setting-override' },
  'filament-advanced': { name: '高级', iconName: 'advanced' },
  'filament-multimaterial': { name: '多耗材', iconName: 'multimaterial' },
  'filament-dependencies': { name: '依赖关系', iconName: 'dependencies' },
  'filament-notes': { name: '注释', iconName: 'note' },
};
