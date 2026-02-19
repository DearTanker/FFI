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
  filament_shrink: { pageId: 'filament-basic', groupId: 'information', label: '收缩率（XY）' },
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
  chamber_temperatures: { pageId: 'filament-basic', groupId: 'chamber-temp', label: '激活温度控制', unit: '℃' },

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

  // 特定层冷却 Group
  close_fan_the_first_x_layers: { pageId: 'filament-cooling', groupId: 'cooling-specific-layer', label: '关闭冷却对前', unit: '层' },
  full_fan_speed_layer: { pageId: 'filament-cooling', groupId: 'cooling-specific-layer', label: '满速风扇在', unit: '层' },

  // 部件冷却风扇 Group
  fan_min_speed: {
    pageId: 'filament-cooling', groupId: 'cooling-part-fan', label: '最小风扇速度阈值（风扇速度）', unit: '%',
    paired: { pairKey: 'fan_min_threshold', pairLabel: '最小风扇速度阈值', pairPosition: 'left' as const, pairLeftLabel: '风扇速度', pairRightLabel: '层时间' },
  },
  fan_cooling_layer_time: {
    pageId: 'filament-cooling', groupId: 'cooling-part-fan', label: '最小风扇速度阈值（层时间）', unit: 's',
    paired: { pairKey: 'fan_min_threshold', pairLabel: '最小风扇速度阈值', pairPosition: 'right' as const, pairLeftLabel: '风扇速度', pairRightLabel: '层时间' },
  },
  fan_max_speed: {
    pageId: 'filament-cooling', groupId: 'cooling-part-fan', label: '最大风扇速度阈值（风扇速度）', unit: '%',
    paired: { pairKey: 'fan_max_threshold', pairLabel: '最大风扇速度阈值', pairPosition: 'left' as const, pairLeftLabel: '风扇速度', pairRightLabel: '层时间' },
  },
  slow_down_layer_time: {
    pageId: 'filament-cooling', groupId: 'cooling-part-fan', label: '最大风扇速度阈值（层时间）', unit: 's',
    paired: { pairKey: 'fan_max_threshold', pairLabel: '最大风扇速度阈值', pairPosition: 'right' as const, pairLeftLabel: '风扇速度', pairRightLabel: '层时间' },
  },
  reduce_fan_stop_start_freq: { pageId: 'filament-cooling', groupId: 'cooling-part-fan', label: '保持风扇常开', kind: 'bool' },
  slow_down_for_layer_cooling: { pageId: 'filament-cooling', groupId: 'cooling-part-fan', label: '降低打印速度 以得到更好的冷却', kind: 'bool' },
  no_slow_down_for_cooling_on_outwalls: { pageId: 'filament-cooling', groupId: 'cooling-part-fan', label: '不减速外墙', kind: 'bool' },
  slow_down_min_speed: { pageId: 'filament-cooling', groupId: 'cooling-part-fan', label: '最小打印速度', unit: '毫米/秒' },
  enable_overhang_bridge_fan: { pageId: 'filament-cooling', groupId: 'cooling-part-fan', label: '悬垂/桥接强制冷却', kind: 'bool' },
  overhang_fan_threshold: { pageId: 'filament-cooling', groupId: 'cooling-part-fan', label: '悬垂冷却激活阈值' },
  overhang_fan_speed: { pageId: 'filament-cooling', groupId: 'cooling-part-fan', label: '悬垂和外部桥接风扇速度', unit: '%' },
  first_x_layer_fan_speed: { pageId: 'filament-cooling', groupId: 'cooling-part-fan', label: '初始层风扇速度', unit: '%' },
  pre_start_fan_time: { pageId: 'filament-cooling', groupId: 'cooling-part-fan', label: '打印前启动风扇' },
  overhang_threshold_participating_cooling: { pageId: 'filament-cooling', groupId: 'cooling-part-fan', label: '悬垂和部件冷却参与阈值' },
  filament_enable_overhang_speed: { pageId: 'filament-cooling', groupId: 'cooling-part-fan', label: '启用悬垂速度', kind: 'bool' },

  // 辅助部件冷却风扇 Group
  additional_cooling_fan_speed: { pageId: 'filament-cooling', groupId: 'cooling-aux-fan', label: '风扇速度', unit: '%' },

  // 排气风扇 Group
  activate_air_filtration: { pageId: 'filament-cooling', groupId: 'cooling-exhaust', label: '启用空气过滤/排气', kind: 'bool' },
  during_print_exhaust_fan_speed: { pageId: 'filament-cooling', groupId: 'cooling-exhaust', label: '打印中', unit: '%' },
  complete_print_exhaust_fan_speed: { pageId: 'filament-cooling', groupId: 'cooling-exhaust', label: '完成打印', unit: '%' },

  // ============ SETTING OVERRIDES PAGE ============

  // 回抽 Group
  filament_retraction_length: { pageId: 'filament-overrides', groupId: 'retraction', label: '长度', unit: 'mm' },
  filament_z_hop: { pageId: 'filament-overrides', groupId: 'retraction', label: 'Z抬升高度', unit: 'mm' },
  filament_z_hop_types: { pageId: 'filament-overrides', groupId: 'retraction', label: 'Z抬升类型' },
  filament_retraction_speed: { pageId: 'filament-overrides', groupId: 'retraction', label: '回抽速度', unit: '毫米/秒' },
  filament_deretraction_speed: { pageId: 'filament-overrides', groupId: 'retraction', label: '重新装填速度', unit: '毫米/秒' },
  filament_retract_restart_extra: { pageId: 'filament-overrides', groupId: 'retraction', label: '额外回填长度', unit: 'mm' },
  filament_retraction_minimum_travel: { pageId: 'filament-overrides', groupId: 'retraction', label: '空驶距离阈值', unit: 'mm' },
  filament_retract_when_changing_layer: { pageId: 'filament-overrides', groupId: 'retraction', label: '换层时回抽', kind: 'bool' },
  filament_wipe: { pageId: 'filament-overrides', groupId: 'retraction', label: '回抽时擦拭', kind: 'bool' },
  filament_wipe_distance: { pageId: 'filament-overrides', groupId: 'retraction', label: '擦拭距离', unit: 'mm' },
  filament_retract_before_wipe: { pageId: 'filament-overrides', groupId: 'retraction', label: '擦拭前的回抽量', unit: '%' },
  filament_long_retractions_when_cut: { pageId: 'filament-overrides', groupId: 'retraction', label: '切料时回抽（实验）', kind: 'bool' },
  filament_retraction_distances_when_cut: { pageId: 'filament-overrides', groupId: 'retraction', label: '切料回抽距离' },

  // 熨烫 Group
  filament_ironing_flow: { pageId: 'filament-overrides', groupId: 'ironing', label: '熨烫流量', unit: '%' },
  filament_ironing_spacing: { pageId: 'filament-overrides', groupId: 'ironing', label: '熨烫间距', unit: 'mm' },
  filament_ironing_inset: { pageId: 'filament-overrides', groupId: 'ironing', label: '熨烫内缩', unit: 'mm' },
  filament_ironing_speed: { pageId: 'filament-overrides', groupId: 'ironing', label: '熨烫速度', unit: '毫米/秒' },

  // ============ ADVANCED PAGE ============

  // 耗材丝起始G-code Group
  filament_start_gcode: { pageId: 'filament-advanced', groupId: 'gcode-start', label: '耗材丝起始G-code', kind: 'multiline' },

  // 耗材丝结束G-code Group
  filament_end_gcode: { pageId: 'filament-advanced', groupId: 'gcode-end', label: '耗材丝结束G-code', kind: 'multiline' },

  // ============ MULTIMATERIAL PAGE ============

  // 色塔参数 Group
  filament_minimal_purge_on_wipe_tower: { pageId: 'filament-multimaterial', groupId: 'tower-params', label: '擦拭塔上的最小清理量', unit: '立方毫米' },
  filament_tower_interface_pre_extrusion_dist: { pageId: 'filament-multimaterial', groupId: 'tower-params', label: 'Interface layer pre-extrusion distance', unit: 'mm' },
  filament_tower_interface_pre_extrusion_length: { pageId: 'filament-multimaterial', groupId: 'tower-params', label: 'Interface layer pre-extrusion length', unit: 'mm' },
  filament_tower_ironing_area: { pageId: 'filament-multimaterial', groupId: 'tower-params', label: 'Tower ironing area', unit: '平方毫米' },
  filament_tower_interface_purge_volume: { pageId: 'filament-multimaterial', groupId: 'tower-params', label: 'Interface layer purge length', unit: 'mm' },
  filament_tower_interface_print_temp: { pageId: 'filament-multimaterial', groupId: 'tower-params', label: 'Interface layer print temperature', unit: '℃' },
  filament_cooling_before_tower: { pageId: 'filament-multimaterial', groupId: 'tower-params', label: '擦拭塔前冷却' },

  // 单挤出机多材料打印机的换色参数 Group
  filament_loading_speed_start: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', label: '加载初始速度', unit: '毫米/秒' },
  filament_loading_speed: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', label: '装载速度', unit: '毫米/秒' },
  filament_unloading_speed_start: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', label: '卸载初始速度', unit: '毫米/秒' },
  filament_unloading_speed: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', label: '卸载速度', unit: '毫米/秒' },
  filament_toolchange_delay: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', label: '卸载后延迟', unit: 's' },
  filament_cooling_moves: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', label: '冷却移动次数' },
  filament_cooling_initial_speed: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', label: '第一次冷却移动的速度', unit: '毫米/秒' },
  filament_cooling_final_speed: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', label: '最后一次冷却移动的速度', unit: '毫米/秒' },
  filament_ramming_volumetric_speed: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', label: '尖端成型加载速度' },
  filament_stamping_distance: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', label: '从冷却管中心测量的尖端成型距离' },
  counter_coef_1: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', label: '色彩校准参数 1' },
  counter_coef_2: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', label: '色彩校准参数 2' },
  counter_coef_3: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', label: '色彩校准参数 3' },
  counter_limit_min: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', label: '色彩校准最小值' },
  counter_limit_max: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', label: '色彩校准最大值' },

  // 多挤出机多材料打印机的换色参数 Group
  filament_multitool_ramming: { pageId: 'filament-multimaterial', groupId: 'toolchange-multi', label: '启用多色尖端成型设置', kind: 'bool' },
  filament_multitool_ramming_volume: { pageId: 'filament-multimaterial', groupId: 'toolchange-multi', label: '多色尖端成型体积', unit: '立方毫米' },
  filament_multitool_ramming_flow: { pageId: 'filament-multimaterial', groupId: 'toolchange-multi', label: '多色尖端成型流量', unit: '毫米立方/秒' },
  hole_coef_1: { pageId: 'filament-multimaterial', groupId: 'toolchange-multi', label: '色彩校准参数 1' },
  hole_coef_2: { pageId: 'filament-multimaterial', groupId: 'toolchange-multi', label: '色彩校准参数 2' },
  hole_coef_3: { pageId: 'filament-multimaterial', groupId: 'toolchange-multi', label: '色彩校准参数 3' },
  hole_limit_min: { pageId: 'filament-multimaterial', groupId: 'toolchange-multi', label: '色彩校准最小值' },
  hole_limit_max: { pageId: 'filament-multimaterial', groupId: 'toolchange-multi', label: '色彩校准最大值' },

  // ============ DEPENDENCIES PAGE ============

  // 兼容打印机 Group
  compatible_printers: { pageId: 'filament-dependencies', groupId: 'compatible-printers', label: '兼容打印机' },

  // ============ NOTES PAGE ============

  // 备注 Group
  filament_notes: { pageId: 'filament-notes', groupId: 'notes', label: '备注', kind: 'multiline' },
};

/**
 * 获取特定页面的字段（包括数据中不存在的字段，显示为空）
 */
export function getPageFields(data: Record<string, any>, pageId: string): Record<string, Record<string, any[]>> {
  const result: Record<string, Record<string, any[]>> = {};

  // 先遍历所有映射字段，确保即使数据不存在也会出现
  for (const [key, mapping] of Object.entries(FILAMENT_FIELD_MAP)) {
    if (mapping.pageId !== pageId) continue;
    if (!result[mapping.groupId]) {
      result[mapping.groupId] = {};
    }
    const value = key in data ? data[key] : undefined;
    result[mapping.groupId][key] = [{
      key,
      label: mapping.label,
      value,
      unit: mapping.unit,
      kind: mapping.kind,
      paired: mapping.paired,
    }];
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
  'chamber-temp': ['chamber_temperatures'],
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
  // Cooling page
  'cooling-specific-layer': ['close_fan_the_first_x_layers', 'full_fan_speed_layer'],
  'cooling-part-fan': [
    'fan_min_speed', 'fan_cooling_layer_time',
    'fan_max_speed', 'slow_down_layer_time',
    'reduce_fan_stop_start_freq',
    'slow_down_for_layer_cooling',
    'no_slow_down_for_cooling_on_outwalls',
    'slow_down_min_speed',
    'enable_overhang_bridge_fan',
    'overhang_fan_threshold',
    'overhang_fan_speed',
    'first_x_layer_fan_speed',
    'pre_start_fan_time',
    'overhang_threshold_participating_cooling',
    'filament_enable_overhang_speed',
  ],
  'cooling-aux-fan': ['additional_cooling_fan_speed'],
  'cooling-exhaust': ['activate_air_filtration', 'during_print_exhaust_fan_speed', 'complete_print_exhaust_fan_speed'],
  // Overrides page
  retraction: [
    'filament_retraction_length',
    'filament_z_hop', 'filament_z_hop_types',
    'filament_retraction_speed', 'filament_deretraction_speed',
    'filament_retract_restart_extra', 'filament_retraction_minimum_travel',
    'filament_retract_when_changing_layer',
    'filament_wipe', 'filament_wipe_distance', 'filament_retract_before_wipe',
    'filament_long_retractions_when_cut', 'filament_retraction_distances_when_cut',
  ],
  ironing: ['filament_ironing_flow', 'filament_ironing_spacing', 'filament_ironing_inset', 'filament_ironing_speed'],
  // Advanced page
  'gcode-start': ['filament_start_gcode'],
  'gcode-end': ['filament_end_gcode'],
  // Multimaterial page
  'tower-params': [
    'filament_minimal_purge_on_wipe_tower',
    'filament_tower_interface_pre_extrusion_dist', 'filament_tower_interface_pre_extrusion_length',
    'filament_tower_ironing_area', 'filament_tower_interface_purge_volume',
    'filament_tower_interface_print_temp', 'filament_cooling_before_tower',
  ],
  'toolchange-single': [
    'filament_loading_speed_start', 'filament_loading_speed',
    'filament_unloading_speed_start', 'filament_unloading_speed',
    'filament_toolchange_delay', 'filament_cooling_moves',
    'filament_cooling_initial_speed', 'filament_cooling_final_speed',
    'filament_ramming_volumetric_speed', 'filament_stamping_distance',
    'counter_coef_1', 'counter_coef_2', 'counter_coef_3',
    'counter_limit_min', 'counter_limit_max',
  ],
  'toolchange-multi': [
    'filament_multitool_ramming', 'filament_multitool_ramming_volume', 'filament_multitool_ramming_flow',
    'hole_coef_1', 'hole_coef_2', 'hole_coef_3',
    'hole_limit_min', 'hole_limit_max',
  ],
  // Dependencies page
  'compatible-printers': ['compatible_printers'],
  // Notes page
  notes: ['filament_notes'],
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
  'filament-cooling': ['cooling-specific-layer', 'cooling-part-fan', 'cooling-aux-fan', 'cooling-exhaust'],
  'filament-overrides': ['retraction', 'ironing'],
  'filament-advanced': ['gcode-start', 'gcode-end'],
  'filament-multimaterial': ['tower-params', 'toolchange-single', 'toolchange-multi'],
  'filament-dependencies': ['compatible-printers'],
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
  'cooling-specific-layer': { name: '特定层冷却', iconName: 'cooling-specific-layer' },
  'cooling-part-fan': { name: '部件冷却风扇', iconName: 'cooling-part-fan' },
  'cooling-aux-fan': { name: '辅助部件冷却风扇', iconName: 'cooling-aux-fan' },
  'cooling-exhaust': { name: '排气风扇', iconName: 'cooling-exhaust' },
  retraction: { name: '回抽', iconName: 'retraction' },
  ironing: { name: '熨烫', iconName: 'ironing' },
  'gcode-start': { name: '耗材丝起始G-code', iconName: 'gcode' },
  'gcode-end': { name: '耗材丝结束G-code', iconName: 'gcode' },
  'tower-params': { name: '色塔参数', iconName: 'tower' },
  'toolchange-single': { name: '单挤出机多材料打印机的换色参数', iconName: 'toolchange' },
  'toolchange-multi': { name: '多挤出机多材料打印机的换色参数', iconName: 'toolchange-multi-extruder' },
  'compatible-printers': { name: '兼容打印机', iconName: 'dependencies-printers' },
  notes: { name: '备注', iconName: 'note' },
};

/**
 * Page 的显示名称和图标
 */
export const PAGE_METADATA: Record<string, { name: string; iconName: string }> = {
  'filament-basic': { name: '耗材丝', iconName: 'filament' },
  'filament-cooling': { name: '冷却', iconName: 'cooling' },
  'filament-overrides': { name: '参数覆盖', iconName: 'setting-override' },
  'filament-advanced': { name: '高级', iconName: 'advanced' },
  'filament-multimaterial': { name: '材料', iconName: 'multimaterial' },
  'filament-dependencies': { name: '依赖', iconName: 'dependencies' },
  'filament-notes': { name: '注释', iconName: 'note' },
};
