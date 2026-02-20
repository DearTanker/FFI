/**
 * OrcaSlicer 耗材配置字段与 Tab/Page/Group 的映射
 * 将 JSON 配置字段组织成 OrcaSlicer 的实际 UI 结构
 *
 * 所有显示标签已迁移至 i18n 语言包 (src/lib/i18n/locales/)
 * 字段标签通过 tField(key) 获取, 配对标签通过 tPair(pairKey) 获取
 */

import { tField, tGroup, tPage, tPair } from './i18n';

/**
 * 耗材 JSON 字段 → OrcaSlicer UI 结构的映射
 * paired: 标记配对字段，同一行显示两个值
 *   - pairKey: 配对行的唯一标识（同时作为 i18n pairs 的 key）
 *   - pairPosition: 'left' | 'right' 表示在该行的位置
 */
export const FILAMENT_FIELD_MAP: Record<string, {
  pageId: string;
  groupId: string;
  kind?: string;
  unit?: string;
  paired?: {
    pairKey: string;
    pairPosition: 'left' | 'right';
  };
}> = {
  // ============ FILAMENT PAGE ============
  
  // Basic Information Group
  filament_type: { pageId: 'filament-basic', groupId: 'information' },
  filament_vendor: { pageId: 'filament-basic', groupId: 'information' },
  filament_soluble: { pageId: 'filament-basic', groupId: 'information', kind: 'bool' },
  filament_is_support: { pageId: 'filament-basic', groupId: 'information', kind: 'bool' },
  filament_change_length: { pageId: 'filament-basic', groupId: 'information', unit: 'mm' },
  required_nozzle_HRC: { pageId: 'filament-basic', groupId: 'information' },
  default_filament_colour: { pageId: 'filament-basic', groupId: 'information' },
  filament_diameter: { pageId: 'filament-basic', groupId: 'information', unit: 'mm' },
  filament_adhesiveness_category: { pageId: 'filament-basic', groupId: 'information' },
  filament_density: { pageId: 'filament-basic', groupId: 'information', unit: 'g/cm³' },
  filament_shrink: { pageId: 'filament-basic', groupId: 'information' },
  filament_shrinkage_compensation_z: { pageId: 'filament-basic', groupId: 'information', unit: '%' },
  filament_cost: { pageId: 'filament-basic', groupId: 'information', unit: 'money/kg' },
  temperature_vitrification: { pageId: 'filament-basic', groupId: 'information', unit: '℃' },
  idle_temperature: { pageId: 'filament-basic', groupId: 'information', unit: '℃' },
  // 建议喷嘴温度 - 配对行（最小 + 最大）
  nozzle_temperature_range_low: {
    pageId: 'filament-basic', groupId: 'information', unit: '℃',
    paired: { pairKey: 'nozzle_temp_range', pairPosition: 'left' },
  },
  nozzle_temperature_range_high: {
    pageId: 'filament-basic', groupId: 'information', unit: '℃',
    paired: { pairKey: 'nozzle_temp_range', pairPosition: 'right' },
  },

  // Flow Ratio and Pressure Advance Group
  filament_flow_ratio: { pageId: 'filament-basic', groupId: 'flow-ratio' },
  enable_pressure_advance: { pageId: 'filament-basic', groupId: 'flow-ratio', kind: 'bool' },
  pressure_advance: { pageId: 'filament-basic', groupId: 'flow-ratio' },
  adaptive_pressure_advance: { pageId: 'filament-basic', groupId: 'flow-ratio', kind: 'bool' },

  // Chamber Temperature Group
  chamber_temperatures: { pageId: 'filament-basic', groupId: 'chamber-temp', unit: '℃' },

  // Print Temperature Group - 配对行（首层 + 其它层）
  nozzle_temperature_initial_layer: {
    pageId: 'filament-basic', groupId: 'extruder-temp', unit: '℃',
    paired: { pairKey: 'nozzle_temp', pairPosition: 'left' },
  },
  nozzle_temperature: {
    pageId: 'filament-basic', groupId: 'extruder-temp', unit: '℃',
    paired: { pairKey: 'nozzle_temp', pairPosition: 'right' },
  },

  // Bed Temperature Group - 所有配对行（首层 + 其它层）
  supertack_plate_temp_initial_layer: {
    pageId: 'filament-basic', groupId: 'bed-temp', unit: '℃',
    paired: { pairKey: 'supertack_plate', pairPosition: 'left' },
  },
  supertack_plate_temp: {
    pageId: 'filament-basic', groupId: 'bed-temp', unit: '℃',
    paired: { pairKey: 'supertack_plate', pairPosition: 'right' },
  },
  cool_plate_temp_initial_layer: {
    pageId: 'filament-basic', groupId: 'bed-temp', unit: '℃',
    paired: { pairKey: 'cool_plate', pairPosition: 'left' },
  },
  cool_plate_temp: {
    pageId: 'filament-basic', groupId: 'bed-temp', unit: '℃',
    paired: { pairKey: 'cool_plate', pairPosition: 'right' },
  },
  textured_cool_plate_temp_initial_layer: {
    pageId: 'filament-basic', groupId: 'bed-temp', unit: '℃',
    paired: { pairKey: 'textured_cool_plate', pairPosition: 'left' },
  },
  textured_cool_plate_temp: {
    pageId: 'filament-basic', groupId: 'bed-temp', unit: '℃',
    paired: { pairKey: 'textured_cool_plate', pairPosition: 'right' },
  },
  eng_plate_temp_initial_layer: {
    pageId: 'filament-basic', groupId: 'bed-temp', unit: '℃',
    paired: { pairKey: 'eng_plate', pairPosition: 'left' },
  },
  eng_plate_temp: {
    pageId: 'filament-basic', groupId: 'bed-temp', unit: '℃',
    paired: { pairKey: 'eng_plate', pairPosition: 'right' },
  },
  hot_plate_temp_initial_layer: {
    pageId: 'filament-basic', groupId: 'bed-temp', unit: '℃',
    paired: { pairKey: 'hot_plate', pairPosition: 'left' },
  },
  hot_plate_temp: {
    pageId: 'filament-basic', groupId: 'bed-temp', unit: '℃',
    paired: { pairKey: 'hot_plate', pairPosition: 'right' },
  },
  textured_plate_temp_initial_layer: {
    pageId: 'filament-basic', groupId: 'bed-temp', unit: '℃',
    paired: { pairKey: 'textured_plate', pairPosition: 'left' },
  },
  textured_plate_temp: {
    pageId: 'filament-basic', groupId: 'bed-temp', unit: '℃',
    paired: { pairKey: 'textured_plate', pairPosition: 'right' },
  },

  // Volumetric Speed Limitation Group
  filament_adaptive_volumetric_speed: { pageId: 'filament-basic', groupId: 'volumetric-speed', kind: 'bool' },
  filament_max_volumetric_speed: { pageId: 'filament-basic', groupId: 'volumetric-speed', unit: 'mm³/s' },

  // ============ COOLING PAGE ============

  // 特定层冷却 Group
  close_fan_the_first_x_layers: { pageId: 'filament-cooling', groupId: 'cooling-specific-layer', unit: 'layers' },
  full_fan_speed_layer: { pageId: 'filament-cooling', groupId: 'cooling-specific-layer', unit: 'layers' },

  // 部件冷却风扇 Group
  fan_min_speed: {
    pageId: 'filament-cooling', groupId: 'cooling-part-fan', unit: '%',
    paired: { pairKey: 'fan_min_threshold', pairPosition: 'left' as const },
  },
  fan_cooling_layer_time: {
    pageId: 'filament-cooling', groupId: 'cooling-part-fan', unit: 's',
    paired: { pairKey: 'fan_min_threshold', pairPosition: 'right' as const },
  },
  fan_max_speed: {
    pageId: 'filament-cooling', groupId: 'cooling-part-fan', unit: '%',
    paired: { pairKey: 'fan_max_threshold', pairPosition: 'left' as const },
  },
  slow_down_layer_time: {
    pageId: 'filament-cooling', groupId: 'cooling-part-fan', unit: 's',
    paired: { pairKey: 'fan_max_threshold', pairPosition: 'right' as const },
  },
  reduce_fan_stop_start_freq: { pageId: 'filament-cooling', groupId: 'cooling-part-fan', kind: 'bool' },
  slow_down_for_layer_cooling: { pageId: 'filament-cooling', groupId: 'cooling-part-fan', kind: 'bool' },
  no_slow_down_for_cooling_on_outwalls: { pageId: 'filament-cooling', groupId: 'cooling-part-fan', kind: 'bool' },
  slow_down_min_speed: { pageId: 'filament-cooling', groupId: 'cooling-part-fan', unit: 'mm/s' },
  enable_overhang_bridge_fan: { pageId: 'filament-cooling', groupId: 'cooling-part-fan', kind: 'bool' },
  overhang_fan_threshold: { pageId: 'filament-cooling', groupId: 'cooling-part-fan' },
  overhang_fan_speed: { pageId: 'filament-cooling', groupId: 'cooling-part-fan', unit: '%' },
  internal_bridge_fan_speed: { pageId: 'filament-cooling', groupId: 'cooling-part-fan', unit: '%' },
  support_material_interface_fan_speed: { pageId: 'filament-cooling', groupId: 'cooling-part-fan', unit: '%' },
  ironing_fan_speed: { pageId: 'filament-cooling', groupId: 'cooling-part-fan', unit: '%' },

  // 辅助部件冷却风扇 Group
  additional_cooling_fan_speed: { pageId: 'filament-cooling', groupId: 'cooling-aux-fan', unit: '%' },

  // 排气风扇 Group
  activate_air_filtration: { pageId: 'filament-cooling', groupId: 'cooling-exhaust', kind: 'bool' },
  during_print_exhaust_fan_speed: { pageId: 'filament-cooling', groupId: 'cooling-exhaust', unit: '%' },
  complete_print_exhaust_fan_speed: { pageId: 'filament-cooling', groupId: 'cooling-exhaust', unit: '%' },

  // ============ SETTING OVERRIDES PAGE ============

  // 回抽 Group
  filament_retraction_length: { pageId: 'filament-overrides', groupId: 'retraction', unit: 'mm' },
  filament_z_hop: { pageId: 'filament-overrides', groupId: 'retraction', unit: 'mm' },
  filament_z_hop_types: { pageId: 'filament-overrides', groupId: 'retraction' },
  filament_retract_lift_above: { pageId: 'filament-overrides', groupId: 'retraction', unit: 'mm' },
  filament_retract_lift_below: { pageId: 'filament-overrides', groupId: 'retraction', unit: 'mm' },
  filament_retract_lift_enforce: { pageId: 'filament-overrides', groupId: 'retraction' },
  filament_retraction_speed: { pageId: 'filament-overrides', groupId: 'retraction', unit: 'mm/s' },
  filament_deretraction_speed: { pageId: 'filament-overrides', groupId: 'retraction', unit: 'mm/s' },
  filament_retract_restart_extra: { pageId: 'filament-overrides', groupId: 'retraction', unit: 'mm' },
  filament_retraction_minimum_travel: { pageId: 'filament-overrides', groupId: 'retraction', unit: 'mm' },
  filament_retract_when_changing_layer: { pageId: 'filament-overrides', groupId: 'retraction', kind: 'bool' },
  filament_wipe: { pageId: 'filament-overrides', groupId: 'retraction', kind: 'bool' },
  filament_wipe_distance: { pageId: 'filament-overrides', groupId: 'retraction', unit: 'mm' },
  filament_retract_before_wipe: { pageId: 'filament-overrides', groupId: 'retraction', unit: '%' },
  filament_long_retractions_when_cut: { pageId: 'filament-overrides', groupId: 'retraction', kind: 'bool' },
  filament_retraction_distances_when_cut: { pageId: 'filament-overrides', groupId: 'retraction' },

  // 熨烫 Group
  filament_ironing_flow: { pageId: 'filament-overrides', groupId: 'ironing', unit: '%' },
  filament_ironing_spacing: { pageId: 'filament-overrides', groupId: 'ironing', unit: 'mm' },
  filament_ironing_inset: { pageId: 'filament-overrides', groupId: 'ironing', unit: 'mm' },
  filament_ironing_speed: { pageId: 'filament-overrides', groupId: 'ironing', unit: 'mm/s' },

  // ============ ADVANCED PAGE ============

  // 耗材丝起始G-code Group
  filament_start_gcode: { pageId: 'filament-advanced', groupId: 'gcode-start', kind: 'multiline' },

  // 耗材丝结束G-code Group
  filament_end_gcode: { pageId: 'filament-advanced', groupId: 'gcode-end', kind: 'multiline' },

  // ============ MULTIMATERIAL PAGE ============

  // 色塔参数 Group
  filament_minimal_purge_on_wipe_tower: { pageId: 'filament-multimaterial', groupId: 'tower-params', unit: 'mm³' },
  filament_tower_interface_pre_extrusion_dist: { pageId: 'filament-multimaterial', groupId: 'tower-params', unit: 'mm' },
  filament_tower_interface_pre_extrusion_length: { pageId: 'filament-multimaterial', groupId: 'tower-params', unit: 'mm' },
  filament_tower_ironing_area: { pageId: 'filament-multimaterial', groupId: 'tower-params', unit: 'mm²' },
  filament_tower_interface_purge_volume: { pageId: 'filament-multimaterial', groupId: 'tower-params', unit: 'mm' },
  filament_tower_interface_print_temp: { pageId: 'filament-multimaterial', groupId: 'tower-params', unit: '℃' },

  // 单挤出机多材料打印机的换色参数 Group
  filament_loading_speed_start: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', unit: 'mm/s' },
  filament_loading_speed: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', unit: 'mm/s' },
  filament_unloading_speed_start: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', unit: 'mm/s' },
  filament_unloading_speed: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', unit: 'mm/s' },
  filament_toolchange_delay: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', unit: 's' },
  filament_cooling_moves: { pageId: 'filament-multimaterial', groupId: 'toolchange-single' },
  filament_cooling_initial_speed: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', unit: 'mm/s' },
  filament_cooling_final_speed: { pageId: 'filament-multimaterial', groupId: 'toolchange-single', unit: 'mm/s' },
  filament_ramming_volumetric_speed: { pageId: 'filament-multimaterial', groupId: 'toolchange-single' },
  filament_stamping_distance: { pageId: 'filament-multimaterial', groupId: 'toolchange-single' },

  // 多挤出机多材料打印机的换色参数 Group
  filament_multitool_ramming: { pageId: 'filament-multimaterial', groupId: 'toolchange-multi', kind: 'bool' },
  filament_multitool_ramming_volume: { pageId: 'filament-multimaterial', groupId: 'toolchange-multi', unit: 'mm³' },
  filament_multitool_ramming_flow: { pageId: 'filament-multimaterial', groupId: 'toolchange-multi', unit: 'mm³/s' },

  // ============ DEPENDENCIES PAGE ============

  // 兼容打印机 Group
  compatible_printers: { pageId: 'filament-dependencies', groupId: 'compatible-printers' },

  // ============ NOTES PAGE ============

  // 备注 Group
  filament_notes: { pageId: 'filament-notes', groupId: 'notes', kind: 'multiline' },
};

/**
 * 获取特定页面的字段（包括数据中不存在的字段，显示为空）
 * 标签通过 i18n 动态获取
 */
export function getPageFields(data: Record<string, any>, pageId: string): Record<string, Record<string, any[]>> {
  const result: Record<string, Record<string, any[]>> = {};

  for (const [key, mapping] of Object.entries(FILAMENT_FIELD_MAP)) {
    if (mapping.pageId !== pageId) continue;
    if (!result[mapping.groupId]) {
      result[mapping.groupId] = {};
    }
    const value = key in data ? data[key] : undefined;

    // 动态构建 paired 信息（附加 i18n 标签）
    let pairedWithLabels: any = undefined;
    if (mapping.paired) {
      const pairLabels = tPair(mapping.paired.pairKey);
      pairedWithLabels = {
        pairKey: mapping.paired.pairKey,
        pairPosition: mapping.paired.pairPosition,
        pairLabel: pairLabels?.label ?? mapping.paired.pairKey,
        pairLeftLabel: pairLabels?.left ?? '',
        pairRightLabel: pairLabels?.right ?? '',
      };
    }

    result[mapping.groupId][key] = [{
      key,
      label: tField(key),
      value,
      unit: mapping.unit,
      kind: mapping.kind,
      paired: pairedWithLabels,
    }];
  }

  return result;
}

/**
 * 获取字段的显示标签和其他元数据
 */
export function getFieldMetadata(fieldKey: string): { label: string; unit?: string; kind?: string; paired?: any } | null {
  const mapping = FILAMENT_FIELD_MAP[fieldKey];
  if (!mapping) return null;

  let pairedWithLabels: any = undefined;
  if (mapping.paired) {
    const pairLabels = tPair(mapping.paired.pairKey);
    pairedWithLabels = {
      pairKey: mapping.paired.pairKey,
      pairPosition: mapping.paired.pairPosition,
      pairLabel: pairLabels?.label ?? mapping.paired.pairKey,
      pairLeftLabel: pairLabels?.left ?? '',
      pairRightLabel: pairLabels?.right ?? '',
    };
  }

  return {
    label: tField(fieldKey),
    unit: mapping.unit,
    kind: mapping.kind,
    paired: pairedWithLabels,
  };
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
    'internal_bridge_fan_speed',
    'support_material_interface_fan_speed',
    'ironing_fan_speed',
  ],
  'cooling-aux-fan': ['additional_cooling_fan_speed'],
  'cooling-exhaust': ['activate_air_filtration', 'during_print_exhaust_fan_speed', 'complete_print_exhaust_fan_speed'],
  // Overrides page
  retraction: [
    'filament_retraction_length',
    'filament_z_hop', 'filament_z_hop_types',
    'filament_retract_lift_above', 'filament_retract_lift_below', 'filament_retract_lift_enforce',
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
    'filament_tower_interface_print_temp',
  ],
  'toolchange-single': [
    'filament_loading_speed_start', 'filament_loading_speed',
    'filament_unloading_speed_start', 'filament_unloading_speed',
    'filament_toolchange_delay', 'filament_cooling_moves',
    'filament_cooling_initial_speed', 'filament_cooling_final_speed',
    'filament_ramming_volumetric_speed', 'filament_stamping_distance',
  ],
  'toolchange-multi': [
    'filament_multitool_ramming', 'filament_multitool_ramming_volume', 'filament_multitool_ramming_flow',
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
 * Group 的显示名称和图标（名称通过 i18n 动态获取）
 */
export const GROUP_METADATA: Record<string, { iconName?: string }> = {
  information: { iconName: 'information' },
  'flow-ratio': { iconName: 'flow-ratio' },
  'chamber-temp': { iconName: 'chamber-temp' },
  'extruder-temp': { iconName: 'extruder-temp' },
  'bed-temp': { iconName: 'bed-temp' },
  'volumetric-speed': { iconName: 'volumetric-speed' },
  'cooling-specific-layer': { iconName: 'cooling-specific-layer' },
  'cooling-part-fan': { iconName: 'cooling-part-fan' },
  'cooling-aux-fan': { iconName: 'cooling-aux-fan' },
  'cooling-exhaust': { iconName: 'cooling-exhaust' },
  retraction: { iconName: 'retraction' },
  ironing: { iconName: 'ironing' },
  'gcode-start': { iconName: 'gcode' },
  'gcode-end': { iconName: 'gcode' },
  'tower-params': { iconName: 'tower' },
  'toolchange-single': { iconName: 'toolchange' },
  'toolchange-multi': { iconName: 'toolchange-multi-extruder' },
  'compatible-printers': { iconName: 'dependencies-printers' },
  notes: { iconName: 'note' },
};

/**
 * Page 的显示名称和图标（名称通过 i18n 动态获取）
 */
export const PAGE_METADATA: Record<string, { iconName: string }> = {
  'filament-basic': { iconName: 'filament' },
  'filament-cooling': { iconName: 'cooling' },
  'filament-overrides': { iconName: 'setting-override' },
  'filament-advanced': { iconName: 'advanced' },
  'filament-multimaterial': { iconName: 'multimaterial' },
  'filament-dependencies': { iconName: 'dependencies' },
  'filament-notes': { iconName: 'note' },
};
