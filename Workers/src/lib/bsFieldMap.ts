/**
 * BambuStudio 耗材配置字段与 Tab/Page/Group 的映射
 * 将 JSON 配置字段组织成 BambuStudio 的实际 UI 结构
 *
 * 基于 BambuStudio 源码 src/slic3r/GUI/Tab.cpp 中的 TabFilament::build()
 */

import { tField, tGroup, tPage, tPair } from './i18n';

/**
 * BambuStudio 耗材字段 → UI 结构映射
 */
export const BS_FILAMENT_FIELD_MAP: Record<string, {
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
  filament_type: { pageId: 'bs-filament', groupId: 'bs-information' },
  filament_vendor: { pageId: 'bs-filament', groupId: 'bs-information' },
  filament_soluble: { pageId: 'bs-filament', groupId: 'bs-information', kind: 'bool' },
  filament_is_support: { pageId: 'bs-filament', groupId: 'bs-information', kind: 'bool' },
  impact_strength_z: { pageId: 'bs-filament', groupId: 'bs-information' },
  required_nozzle_HRC: { pageId: 'bs-filament', groupId: 'bs-information' },
  default_filament_colour: { pageId: 'bs-filament', groupId: 'bs-information' },
  filament_diameter: { pageId: 'bs-filament', groupId: 'bs-information', unit: 'mm' },
  filament_adhesiveness_category: { pageId: 'bs-filament', groupId: 'bs-information' },
  filament_flow_ratio: { pageId: 'bs-filament', groupId: 'bs-information' },
  enable_pressure_advance: { pageId: 'bs-filament', groupId: 'bs-information', kind: 'bool' },
  pressure_advance: { pageId: 'bs-filament', groupId: 'bs-information' },
  filament_density: { pageId: 'bs-filament', groupId: 'bs-information', unit: 'g/cm³' },
  filament_shrink: { pageId: 'bs-filament', groupId: 'bs-information' },
  filament_velocity_adaptation_factor: { pageId: 'bs-filament', groupId: 'bs-information' },
  filament_cost: { pageId: 'bs-filament', groupId: 'bs-information', unit: 'money/kg' },
  temperature_vitrification: { pageId: 'bs-filament', groupId: 'bs-information', unit: '℃' },
  filament_cooling_before_tower: { pageId: 'bs-filament', groupId: 'bs-information', kind: 'bool' },
  filament_tower_interface_pre_extrusion_dist: { pageId: 'bs-filament', groupId: 'bs-information', unit: 'mm' },
  filament_tower_interface_pre_extrusion_length: { pageId: 'bs-filament', groupId: 'bs-information', unit: 'mm' },
  filament_tower_ironing_area: { pageId: 'bs-filament', groupId: 'bs-information', unit: 'mm²' },
  filament_tower_interface_purge_volume: { pageId: 'bs-filament', groupId: 'bs-information', unit: 'mm' },
  filament_tower_interface_print_temp: { pageId: 'bs-filament', groupId: 'bs-information', unit: '℃' },
  // Composite line: Filament prime volume
  filament_prime_volume: {
    pageId: 'bs-filament', groupId: 'bs-information', unit: 'mm³',
    paired: { pairKey: 'bs_prime_volume', pairPosition: 'left' },
  },
  filament_prime_volume_nc: {
    pageId: 'bs-filament', groupId: 'bs-information', unit: 'mm³',
    paired: { pairKey: 'bs_prime_volume', pairPosition: 'right' },
  },
  // Composite line: Filament ramming length
  filament_change_length: {
    pageId: 'bs-filament', groupId: 'bs-information', unit: 'mm',
    paired: { pairKey: 'bs_ramming_length', pairPosition: 'left' },
  },
  filament_change_length_nc: {
    pageId: 'bs-filament', groupId: 'bs-information', unit: 'mm',
    paired: { pairKey: 'bs_ramming_length', pairPosition: 'right' },
  },
  // Composite line: Travel time after ramming
  filament_ramming_travel_time: {
    pageId: 'bs-filament', groupId: 'bs-information', unit: 's',
    paired: { pairKey: 'bs_ramming_travel_time', pairPosition: 'left' },
  },
  filament_ramming_travel_time_nc: {
    pageId: 'bs-filament', groupId: 'bs-information', unit: 's',
    paired: { pairKey: 'bs_ramming_travel_time', pairPosition: 'right' },
  },
  // Composite line: Precooling target temperature
  filament_pre_cooling_temperature: {
    pageId: 'bs-filament', groupId: 'bs-information', unit: '℃',
    paired: { pairKey: 'bs_pre_cooling_temp', pairPosition: 'left' },
  },
  filament_pre_cooling_temperature_nc: {
    pageId: 'bs-filament', groupId: 'bs-information', unit: '℃',
    paired: { pairKey: 'bs_pre_cooling_temp', pairPosition: 'right' },
  },
  // Composite line: Recommended nozzle temperature
  nozzle_temperature_range_low: {
    pageId: 'bs-filament', groupId: 'bs-information', unit: '℃',
    paired: { pairKey: 'bs_nozzle_temp_range', pairPosition: 'left' },
  },
  nozzle_temperature_range_high: {
    pageId: 'bs-filament', groupId: 'bs-information', unit: '℃',
    paired: { pairKey: 'bs_nozzle_temp_range', pairPosition: 'right' },
  },

  // Print Temperature Group
  chamber_temperatures: { pageId: 'bs-filament', groupId: 'bs-print-temp', unit: '℃' },
  supertack_plate_temp_initial_layer: {
    pageId: 'bs-filament', groupId: 'bs-print-temp', unit: '℃',
    paired: { pairKey: 'bs_supertack_plate', pairPosition: 'left' },
  },
  supertack_plate_temp: {
    pageId: 'bs-filament', groupId: 'bs-print-temp', unit: '℃',
    paired: { pairKey: 'bs_supertack_plate', pairPosition: 'right' },
  },
  cool_plate_temp_initial_layer: {
    pageId: 'bs-filament', groupId: 'bs-print-temp', unit: '℃',
    paired: { pairKey: 'bs_cool_plate', pairPosition: 'left' },
  },
  cool_plate_temp: {
    pageId: 'bs-filament', groupId: 'bs-print-temp', unit: '℃',
    paired: { pairKey: 'bs_cool_plate', pairPosition: 'right' },
  },
  eng_plate_temp_initial_layer: {
    pageId: 'bs-filament', groupId: 'bs-print-temp', unit: '℃',
    paired: { pairKey: 'bs_eng_plate', pairPosition: 'left' },
  },
  eng_plate_temp: {
    pageId: 'bs-filament', groupId: 'bs-print-temp', unit: '℃',
    paired: { pairKey: 'bs_eng_plate', pairPosition: 'right' },
  },
  hot_plate_temp_initial_layer: {
    pageId: 'bs-filament', groupId: 'bs-print-temp', unit: '℃',
    paired: { pairKey: 'bs_hot_plate', pairPosition: 'left' },
  },
  hot_plate_temp: {
    pageId: 'bs-filament', groupId: 'bs-print-temp', unit: '℃',
    paired: { pairKey: 'bs_hot_plate', pairPosition: 'right' },
  },
  textured_plate_temp_initial_layer: {
    pageId: 'bs-filament', groupId: 'bs-print-temp', unit: '℃',
    paired: { pairKey: 'bs_textured_plate', pairPosition: 'left' },
  },
  textured_plate_temp: {
    pageId: 'bs-filament', groupId: 'bs-print-temp', unit: '℃',
    paired: { pairKey: 'bs_textured_plate', pairPosition: 'right' },
  },
  nozzle_temperature_initial_layer: {
    pageId: 'bs-filament', groupId: 'bs-print-temp', unit: '℃',
    paired: { pairKey: 'bs_nozzle_temp', pairPosition: 'left' },
  },
  nozzle_temperature: {
    pageId: 'bs-filament', groupId: 'bs-print-temp', unit: '℃',
    paired: { pairKey: 'bs_nozzle_temp', pairPosition: 'right' },
  },

  // Volumetric Speed Limitation Group
  filament_adaptive_volumetric_speed: { pageId: 'bs-filament', groupId: 'bs-volumetric-speed', kind: 'bool' },
  filament_max_volumetric_speed: { pageId: 'bs-filament', groupId: 'bs-volumetric-speed', unit: 'mm³/s' },
  filament_ramming_volumetric_speed: {
    pageId: 'bs-filament', groupId: 'bs-volumetric-speed',
    paired: { pairKey: 'bs_ramming_volumetric', pairPosition: 'left' },
  },
  filament_ramming_volumetric_speed_nc: {
    pageId: 'bs-filament', groupId: 'bs-volumetric-speed',
    paired: { pairKey: 'bs_ramming_volumetric', pairPosition: 'right' },
  },

  // Scarf Seam Settings Group
  filament_scarf_seam_type: { pageId: 'bs-filament', groupId: 'bs-scarf-seam' },
  filament_scarf_height: { pageId: 'bs-filament', groupId: 'bs-scarf-seam', unit: '%' },
  filament_scarf_gap: { pageId: 'bs-filament', groupId: 'bs-scarf-seam', unit: '%' },
  filament_scarf_length: { pageId: 'bs-filament', groupId: 'bs-scarf-seam', unit: 'mm' },

  // ============ COOLING PAGE ============

  // Cooling for specific layer
  close_fan_the_first_x_layers: {
    pageId: 'bs-cooling', groupId: 'bs-cooling-specific',
    paired: { pairKey: 'bs_first_layer_cooling', pairPosition: 'left' },
  },
  first_x_layer_fan_speed: {
    pageId: 'bs-cooling', groupId: 'bs-cooling-specific', unit: '%',
    paired: { pairKey: 'bs_first_layer_cooling', pairPosition: 'right' },
  },

  // Part cooling fan
  fan_min_speed: {
    pageId: 'bs-cooling', groupId: 'bs-cooling-part-fan', unit: '%',
    paired: { pairKey: 'bs_fan_min_threshold', pairPosition: 'left' },
  },
  fan_cooling_layer_time: {
    pageId: 'bs-cooling', groupId: 'bs-cooling-part-fan', unit: 's',
    paired: { pairKey: 'bs_fan_min_threshold', pairPosition: 'right' },
  },
  fan_max_speed: {
    pageId: 'bs-cooling', groupId: 'bs-cooling-part-fan', unit: '%',
    paired: { pairKey: 'bs_fan_max_threshold', pairPosition: 'left' },
  },
  slow_down_layer_time: {
    pageId: 'bs-cooling', groupId: 'bs-cooling-part-fan', unit: 's',
    paired: { pairKey: 'bs_fan_max_threshold', pairPosition: 'right' },
  },
  reduce_fan_stop_start_freq: { pageId: 'bs-cooling', groupId: 'bs-cooling-part-fan', kind: 'bool' },
  slow_down_for_layer_cooling: { pageId: 'bs-cooling', groupId: 'bs-cooling-part-fan', kind: 'bool' },
  no_slow_down_for_cooling_on_outwalls: { pageId: 'bs-cooling', groupId: 'bs-cooling-part-fan', kind: 'bool' },
  slow_down_min_speed: { pageId: 'bs-cooling', groupId: 'bs-cooling-part-fan', unit: 'mm/s' },
  enable_overhang_bridge_fan: { pageId: 'bs-cooling', groupId: 'bs-cooling-part-fan', kind: 'bool' },
  overhang_fan_threshold: { pageId: 'bs-cooling', groupId: 'bs-cooling-part-fan' },
  overhang_threshold_participating_cooling: { pageId: 'bs-cooling', groupId: 'bs-cooling-part-fan' },
  overhang_fan_speed: { pageId: 'bs-cooling', groupId: 'bs-cooling-part-fan', unit: '%' },
  pre_start_fan_time: { pageId: 'bs-cooling', groupId: 'bs-cooling-part-fan', unit: 's' },

  // Auxiliary part cooling fan
  additional_cooling_fan_speed: { pageId: 'bs-cooling', groupId: 'bs-cooling-aux-fan', unit: '%' },

  // Exhaust fan
  activate_air_filtration: { pageId: 'bs-cooling', groupId: 'bs-cooling-exhaust', kind: 'bool' },
  during_print_exhaust_fan_speed: { pageId: 'bs-cooling', groupId: 'bs-cooling-exhaust', unit: '%' },
  complete_print_exhaust_fan_speed: { pageId: 'bs-cooling', groupId: 'bs-cooling-exhaust', unit: '%' },

  // ============ SETTING OVERRIDES PAGE ============

  // Retraction Group
  filament_retraction_length: { pageId: 'bs-overrides', groupId: 'bs-retraction', unit: 'mm' },
  filament_z_hop: { pageId: 'bs-overrides', groupId: 'bs-retraction', unit: 'mm' },
  filament_z_hop_types: { pageId: 'bs-overrides', groupId: 'bs-retraction' },
  filament_retraction_speed: { pageId: 'bs-overrides', groupId: 'bs-retraction', unit: 'mm/s' },
  filament_deretraction_speed: { pageId: 'bs-overrides', groupId: 'bs-retraction', unit: 'mm/s' },
  filament_retract_length_nc: { pageId: 'bs-overrides', groupId: 'bs-retraction', unit: 'mm' },
  filament_retract_restart_extra: { pageId: 'bs-overrides', groupId: 'bs-retraction', unit: 'mm' },
  filament_retraction_minimum_travel: { pageId: 'bs-overrides', groupId: 'bs-retraction', unit: 'mm' },
  filament_retract_when_changing_layer: { pageId: 'bs-overrides', groupId: 'bs-retraction', kind: 'bool' },
  filament_wipe: { pageId: 'bs-overrides', groupId: 'bs-retraction', kind: 'bool' },
  filament_wipe_distance: { pageId: 'bs-overrides', groupId: 'bs-retraction', unit: 'mm' },
  filament_retract_before_wipe: { pageId: 'bs-overrides', groupId: 'bs-retraction', unit: '%' },
  filament_long_retractions_when_cut: { pageId: 'bs-overrides', groupId: 'bs-retraction', kind: 'bool' },
  filament_retraction_distances_when_cut: { pageId: 'bs-overrides', groupId: 'bs-retraction' },

  // Speed Group
  override_process_overhang_speed: { pageId: 'bs-overrides', groupId: 'bs-speed', kind: 'bool' },
  filament_enable_overhang_speed: { pageId: 'bs-overrides', groupId: 'bs-speed', kind: 'bool' },
  filament_overhang_1_4_speed: { pageId: 'bs-overrides', groupId: 'bs-speed', unit: 'mm/s' },
  filament_overhang_2_4_speed: { pageId: 'bs-overrides', groupId: 'bs-speed', unit: 'mm/s' },
  filament_overhang_3_4_speed: { pageId: 'bs-overrides', groupId: 'bs-speed', unit: 'mm/s' },
  filament_overhang_4_4_speed: { pageId: 'bs-overrides', groupId: 'bs-speed', unit: 'mm/s' },
  filament_overhang_totally_speed: { pageId: 'bs-overrides', groupId: 'bs-speed', unit: 'mm/s' },
  filament_bridge_speed: { pageId: 'bs-overrides', groupId: 'bs-speed', unit: 'mm/s' },

  // ============ ADVANCED PAGE ============

  filament_start_gcode: { pageId: 'bs-advanced', groupId: 'bs-gcode-start', kind: 'multiline' },
  filament_end_gcode: { pageId: 'bs-advanced', groupId: 'bs-gcode-end', kind: 'multiline' },

  // ============ NOTES PAGE ============

  filament_notes: { pageId: 'bs-notes', groupId: 'bs-notes-group', kind: 'multiline' },

  // ============ MULTI FILAMENT PAGE ============

  long_retractions_when_ec: { pageId: 'bs-multi-filament', groupId: 'bs-multi-filament-group', kind: 'bool' },
  retraction_distances_when_ec: { pageId: 'bs-multi-filament', groupId: 'bs-multi-filament-group', unit: 'mm' },
};

/**
 * BambuStudio 页面顺序
 */
export const BS_PAGE_ORDER = [
  'bs-filament',
  'bs-cooling',
  'bs-overrides',
  'bs-advanced',
  'bs-notes',
  'bs-multi-filament',
] as const;

/**
 * BambuStudio 页面元数据
 */
export const BS_PAGE_METADATA: Record<string, { iconName: string }> = {
  'bs-filament':        { iconName: 'filament' },
  'bs-cooling':         { iconName: 'cooling' },
  'bs-overrides':       { iconName: 'setting-override' },
  'bs-advanced':        { iconName: 'advanced' },
  'bs-notes':           { iconName: 'note' },
  'bs-multi-filament':  { iconName: 'advanced' },
};

/**
 * BambuStudio Group 顺序
 */
export const BS_GROUP_ORDER: Record<string, string[]> = {
  'bs-filament': ['bs-information', 'bs-print-temp', 'bs-volumetric-speed', 'bs-scarf-seam'],
  'bs-cooling': ['bs-cooling-specific', 'bs-cooling-part-fan', 'bs-cooling-aux-fan', 'bs-cooling-exhaust'],
  'bs-overrides': ['bs-retraction', 'bs-speed'],
  'bs-advanced': ['bs-gcode-start', 'bs-gcode-end'],
  'bs-notes': ['bs-notes-group'],
  'bs-multi-filament': ['bs-multi-filament-group'],
};

/**
 * BambuStudio Group 元数据
 */
export const BS_GROUP_METADATA: Record<string, { iconName?: string }> = {
  'bs-information':      { iconName: 'information' },
  'bs-print-temp':       { iconName: 'extruder-temp' },
  'bs-volumetric-speed': { iconName: 'volumetric-speed' },
  'bs-scarf-seam':       { iconName: 'volumetric-speed' },
  'bs-cooling-specific': { iconName: 'cooling-specific-layer' },
  'bs-cooling-part-fan': { iconName: 'cooling-part-fan' },
  'bs-cooling-aux-fan':  { iconName: 'cooling-aux-fan' },
  'bs-cooling-exhaust':  { iconName: 'cooling-exhaust' },
  'bs-retraction':       { iconName: 'retraction' },
  'bs-speed':            { iconName: 'speed' },
  'bs-gcode-start':      { iconName: 'gcode' },
  'bs-gcode-end':        { iconName: 'gcode' },
  'bs-notes-group':      { iconName: 'note' },
  'bs-multi-filament-group': {},
};

/**
 * BambuStudio 每个 Group 内的字段顺序
 */
export const BS_FIELD_ORDER: Record<string, string[]> = {
  'bs-information': [
    'filament_type', 'filament_vendor', 'filament_soluble', 'filament_is_support',
    'impact_strength_z', 'required_nozzle_HRC', 'default_filament_colour',
    'filament_diameter', 'filament_adhesiveness_category',
    'filament_flow_ratio', 'enable_pressure_advance', 'pressure_advance',
    'filament_density', 'filament_shrink', 'filament_velocity_adaptation_factor',
    'filament_cost', 'temperature_vitrification',
    'filament_cooling_before_tower',
    'filament_tower_interface_pre_extrusion_dist', 'filament_tower_interface_pre_extrusion_length',
    'filament_tower_ironing_area', 'filament_tower_interface_purge_volume',
    'filament_tower_interface_print_temp',
    'filament_prime_volume', 'filament_prime_volume_nc',
    'filament_change_length', 'filament_change_length_nc',
    'filament_ramming_travel_time', 'filament_ramming_travel_time_nc',
    'filament_pre_cooling_temperature', 'filament_pre_cooling_temperature_nc',
    'nozzle_temperature_range_low', 'nozzle_temperature_range_high',
  ],
  'bs-print-temp': [
    'chamber_temperatures',
    'supertack_plate_temp_initial_layer', 'supertack_plate_temp',
    'cool_plate_temp_initial_layer', 'cool_plate_temp',
    'eng_plate_temp_initial_layer', 'eng_plate_temp',
    'hot_plate_temp_initial_layer', 'hot_plate_temp',
    'textured_plate_temp_initial_layer', 'textured_plate_temp',
    'nozzle_temperature_initial_layer', 'nozzle_temperature',
  ],
  'bs-volumetric-speed': [
    'filament_adaptive_volumetric_speed', 'filament_max_volumetric_speed',
    'filament_ramming_volumetric_speed', 'filament_ramming_volumetric_speed_nc',
  ],
  'bs-scarf-seam': [
    'filament_scarf_seam_type', 'filament_scarf_height', 'filament_scarf_gap', 'filament_scarf_length',
  ],
  'bs-cooling-specific': [
    'close_fan_the_first_x_layers', 'first_x_layer_fan_speed',
  ],
  'bs-cooling-part-fan': [
    'fan_min_speed', 'fan_cooling_layer_time',
    'fan_max_speed', 'slow_down_layer_time',
    'reduce_fan_stop_start_freq',
    'slow_down_for_layer_cooling',
    'no_slow_down_for_cooling_on_outwalls',
    'slow_down_min_speed',
    'enable_overhang_bridge_fan',
    'overhang_fan_threshold',
    'overhang_threshold_participating_cooling',
    'overhang_fan_speed',
    'pre_start_fan_time',
  ],
  'bs-cooling-aux-fan': ['additional_cooling_fan_speed'],
  'bs-cooling-exhaust': ['activate_air_filtration', 'during_print_exhaust_fan_speed', 'complete_print_exhaust_fan_speed'],
  'bs-retraction': [
    'filament_retraction_length',
    'filament_z_hop', 'filament_z_hop_types',
    'filament_retraction_speed', 'filament_deretraction_speed',
    'filament_retract_length_nc',
    'filament_retract_restart_extra', 'filament_retraction_minimum_travel',
    'filament_retract_when_changing_layer',
    'filament_wipe', 'filament_wipe_distance', 'filament_retract_before_wipe',
    'filament_long_retractions_when_cut', 'filament_retraction_distances_when_cut',
  ],
  'bs-speed': [
    'override_process_overhang_speed',
    'filament_enable_overhang_speed',
    'filament_overhang_1_4_speed', 'filament_overhang_2_4_speed',
    'filament_overhang_3_4_speed', 'filament_overhang_4_4_speed',
    'filament_overhang_totally_speed',
    'filament_bridge_speed',
  ],
  'bs-gcode-start': ['filament_start_gcode'],
  'bs-gcode-end': ['filament_end_gcode'],
  'bs-notes-group': ['filament_notes'],
  'bs-multi-filament-group': ['long_retractions_when_ec', 'retraction_distances_when_ec'],
};

/**
 * 获取特定页面的字段
 */
export function getBsPageFields(data: Record<string, any>, pageId: string): Record<string, Record<string, any[]>> {
  const result: Record<string, Record<string, any[]>> = {};

  for (const [key, mapping] of Object.entries(BS_FILAMENT_FIELD_MAP)) {
    if (mapping.pageId !== pageId) continue;
    if (!result[mapping.groupId]) {
      result[mapping.groupId] = {};
    }
    const value = key in data ? data[key] : undefined;

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
 * 获取字段元数据
 */
export function getBsFieldMetadata(fieldKey: string): { label: string; unit?: string; kind?: string; paired?: any } | null {
  const mapping = BS_FILAMENT_FIELD_MAP[fieldKey];
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
