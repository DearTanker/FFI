/**
 * OrcaSlicer 字段 wiki 链接映射
 * wiki 链接对应 https://github.com/OrcaSlicer/OrcaSlicer/wiki/ 下的材料设置页面
 * tooltip 描述已迁移至 i18n 语言文件 (locales/zh-CN.ts, locales/en.ts)
 */

const WIKI_BASE = 'https://github.com/OrcaSlicer/OrcaSlicer/wiki';

/**
 * 字段 → wiki 页面链接的映射
 * 基于 OrcaSlicer 的 wiki 页面结构
 */
const FIELD_WIKI_MAP: Record<string, string> = {
  // Basic Information
  filament_type: 'material_basic_information',
  filament_vendor: 'material_basic_information',
  filament_soluble: 'material_basic_information',
  filament_is_support: 'material_basic_information',
  filament_change_length: 'material_basic_information',
  required_nozzle_HRC: 'material_basic_information',
  default_filament_colour: 'material_basic_information',
  filament_diameter: 'material_basic_information',
  filament_adhesiveness_category: 'material_basic_information',
  filament_density: 'material_basic_information',
  filament_shrink: 'material_basic_information',
  filament_shrinkage_compensation_z: 'material_basic_information',
  filament_cost: 'material_basic_information',
  temperature_vitrification: 'material_basic_information',
  idle_temperature: 'material_basic_information',
  nozzle_temperature_range_low: 'material_basic_information',
  nozzle_temperature_range_high: 'material_basic_information',

  // Flow Ratio & Pressure Advance
  filament_flow_ratio: 'material_flow_ratio_and_pressure_advance#flow-ratio',
  enable_pressure_advance: 'material_flow_ratio_and_pressure_advance#pressure-advance',
  pressure_advance: 'material_flow_ratio_and_pressure_advance#pressure-advance',
  adaptive_pressure_advance: 'material_flow_ratio_and_pressure_advance#pressure-advance',

  // Chamber Temperature
  chamber_temperatures: 'material_temperatures#print-chamber-temperature',

  // Print Temperature
  nozzle_temperature_initial_layer: 'material_temperatures#nozzle',
  nozzle_temperature: 'material_temperatures#nozzle',

  // Bed Temperature
  supertack_plate_temp_initial_layer: 'material_temperatures#bed',
  supertack_plate_temp: 'material_temperatures#bed',
  cool_plate_temp_initial_layer: 'material_temperatures#bed',
  cool_plate_temp: 'material_temperatures#bed',
  textured_cool_plate_temp_initial_layer: 'material_temperatures#bed',
  textured_cool_plate_temp: 'material_temperatures#bed',
  eng_plate_temp_initial_layer: 'material_temperatures#bed',
  eng_plate_temp: 'material_temperatures#bed',
  hot_plate_temp_initial_layer: 'material_temperatures#bed',
  hot_plate_temp: 'material_temperatures#bed',
  textured_plate_temp_initial_layer: 'material_temperatures#bed',
  textured_plate_temp: 'material_temperatures#bed',

  // Volumetric Speed
  filament_adaptive_volumetric_speed: 'material_volumetric_speed_limitation',
  filament_max_volumetric_speed: 'material_volumetric_speed_limitation#max-volumetric-speed',

  // Cooling
  close_fan_the_first_x_layers: 'material_cooling',
  full_fan_speed_layer: 'material_cooling',
  fan_min_speed: 'material_cooling',
  fan_cooling_layer_time: 'material_cooling',
  fan_max_speed: 'material_cooling',
  slow_down_layer_time: 'material_cooling',
  reduce_fan_stop_start_freq: 'material_cooling',
  slow_down_for_layer_cooling: 'material_cooling',
  no_slow_down_for_cooling_on_outwalls: 'material_cooling',
  slow_down_min_speed: 'material_cooling',
  enable_overhang_bridge_fan: 'material_cooling',
  overhang_fan_threshold: 'material_cooling',
  overhang_fan_speed: 'material_cooling',
  internal_bridge_fan_speed: 'material_cooling',
  support_material_interface_fan_speed: 'material_cooling',
  ironing_fan_speed: 'material_cooling',
  additional_cooling_fan_speed: 'material_cooling',
  activate_air_filtration: 'material_cooling',
  during_print_exhaust_fan_speed: 'material_cooling',
  complete_print_exhaust_fan_speed: 'material_cooling',

  // Setting Overrides
  filament_retraction_length: 'material_setting_overrides',
  filament_z_hop: 'material_setting_overrides',
  filament_z_hop_types: 'material_setting_overrides',
  filament_retract_lift_above: 'material_setting_overrides',
  filament_retract_lift_below: 'material_setting_overrides',
  filament_retract_lift_enforce: 'material_setting_overrides',
  filament_retraction_speed: 'material_setting_overrides',
  filament_deretraction_speed: 'material_setting_overrides',
  filament_retract_restart_extra: 'material_setting_overrides',
  filament_retraction_minimum_travel: 'material_setting_overrides',
  filament_retract_when_changing_layer: 'material_setting_overrides',
  filament_wipe: 'material_setting_overrides',
  filament_wipe_distance: 'material_setting_overrides',
  filament_retract_before_wipe: 'material_setting_overrides',
  filament_long_retractions_when_cut: 'material_setting_overrides',
  filament_retraction_distances_when_cut: 'material_setting_overrides',
  filament_ironing_flow: 'material_setting_overrides',
  filament_ironing_spacing: 'material_setting_overrides',
  filament_ironing_inset: 'material_setting_overrides',
  filament_ironing_speed: 'material_setting_overrides',

  // Advanced
  filament_start_gcode: 'material_advanced',
  filament_end_gcode: 'material_advanced',

  // Multimaterial
  filament_minimal_purge_on_wipe_tower: 'material_multimaterial',
  filament_tower_interface_pre_extrusion_dist: 'material_multimaterial',
  filament_tower_interface_pre_extrusion_length: 'material_multimaterial',
  filament_tower_ironing_area: 'material_multimaterial',
  filament_tower_interface_purge_volume: 'material_multimaterial',
  filament_tower_interface_print_temp: 'material_multimaterial',
  filament_loading_speed_start: 'material_multimaterial',
  filament_loading_speed: 'material_multimaterial',
  filament_unloading_speed_start: 'material_multimaterial',
  filament_unloading_speed: 'material_multimaterial',
  filament_toolchange_delay: 'material_multimaterial',
  filament_cooling_moves: 'material_multimaterial',
  filament_cooling_initial_speed: 'material_multimaterial',
  filament_cooling_final_speed: 'material_multimaterial',
  filament_ramming_volumetric_speed: 'material_multimaterial',
  filament_stamping_distance: 'material_multimaterial',
  filament_multitool_ramming: 'material_multimaterial',
  filament_multitool_ramming_volume: 'material_multimaterial',
  filament_multitool_ramming_flow: 'material_multimaterial',

  // Dependencies
  compatible_printers: 'material_dependencies',

  // Notes
  filament_notes: 'material_advanced',
};

/**
 * 获取字段对应的 OrcaSlicer wiki 链接
 */
export function getFieldWikiUrl(fieldKey: string): string | undefined {
  const page = FIELD_WIKI_MAP[fieldKey];
  if (!page) return undefined;
  return `${WIKI_BASE}/${page}`;
}
