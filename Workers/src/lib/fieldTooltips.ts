/**
 * OrcaSlicer 字段 wiki 链接映射
 * wiki 链接对应 https://github.com/OrcaSlicer/OrcaSlicer/wiki/ 下的材料设置页面
 * tooltip 描述已迁移至 i18n 语言文件 (locales/zh-CN.ts, locales/en.ts)
 *
 * 每个字段的 wiki 锚点来自 OrcaSlicer 源码 src/slic3r/GUI/Tab.cpp → TabFilament::build()
 * 格式: append_single_option_line("param_name", "wiki_page#anchor")
 */

const WIKI_BASE = 'https://github.com/OrcaSlicer/OrcaSlicer/wiki';

/**
 * 字段 → wiki 页面链接的映射 (per-parameter)
 * 来源: OrcaSlicer Tab.cpp TabFilament::build()
 */
const FIELD_WIKI_MAP: Record<string, string> = {
  // ── Basic Information ──
  filament_type: 'material_basic_information#type',
  filament_vendor: 'material_basic_information#vendor',
  filament_soluble: 'material_basic_information#soluble-material',
  filament_is_support: 'material_basic_information#support-material',
  filament_change_length: 'material_basic_information#filament-ramming-length',
  required_nozzle_HRC: 'material_basic_information#required-nozzle-hrc',
  default_filament_colour: 'material_basic_information#default-color',
  filament_diameter: 'material_basic_information#diameter',
  filament_adhesiveness_category: 'material_basic_information#adhesiveness-category',
  filament_density: 'material_basic_information#density',
  filament_shrink: 'material_basic_information#shrinkage-xy',
  filament_shrinkage_compensation_z: 'material_basic_information#shrinkage-z',
  filament_cost: 'material_basic_information#price',
  temperature_vitrification: 'material_basic_information#softening-temperature',
  idle_temperature: 'material_basic_information#idle-temperature',
  nozzle_temperature_range_low: 'material_basic_information',
  nozzle_temperature_range_high: 'material_basic_information',

  // ── Flow Ratio & Pressure Advance ──
  pellet_flow_coefficient: 'printer_basic_information_advanced#pellet-modded-printer',
  filament_flow_ratio: 'material_flow_ratio_and_pressure_advance#flow-ratio',
  enable_pressure_advance: 'material_flow_ratio_and_pressure_advance#pressure-advance',
  pressure_advance: 'material_flow_ratio_and_pressure_advance#pressure-advance',
  adaptive_pressure_advance: 'material_flow_ratio_and_pressure_advance#enable-adaptive-pressure-advance-beta',
  adaptive_pressure_advance_overhangs: 'material_flow_ratio_and_pressure_advance#enable-adaptive-pressure-advance-for-overhangs-beta',
  adaptive_pressure_advance_bridges: 'material_flow_ratio_and_pressure_advance#pressure-advance-for-bridges',

  // ── Chamber Temperature ──
  chamber_temperature: 'material_temperatures#print-chamber-temperature',
  chamber_temperatures: 'material_temperatures#print-chamber-temperature',
  activate_chamber_temp_control: 'material_temperatures#print-chamber-temperature',

  // ── Print Temperature ──
  nozzle_temperature_initial_layer: 'material_temperatures#nozzle',
  nozzle_temperature: 'material_temperatures#nozzle',

  // ── Bed Temperature ──
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

  // ── Volumetric Speed Limitation ──
  filament_adaptive_volumetric_speed: 'material_volumetric_speed_limitation#adaptive-volumetric-speed',
  filament_max_volumetric_speed: 'material_volumetric_speed_limitation#max-volumetric-speed',

  // ── Cooling – Specific Layer ──
  close_fan_the_first_x_layers: 'material_cooling#no-cooling-for-the-first',
  full_fan_speed_layer: 'material_cooling#full-fan-speed-at-layer',

  // ── Cooling – Part Cooling Fan ──
  fan_min_speed: 'material_cooling#material-part-cooling-fan',
  fan_cooling_layer_time: 'material_cooling#material-part-cooling-fan',
  fan_max_speed: 'material_cooling#material-part-cooling-fan',
  slow_down_layer_time: 'material_cooling#material-part-cooling-fan',
  reduce_fan_stop_start_freq: 'material_cooling#material-part-cooling-fan',
  slow_down_for_layer_cooling: 'material_cooling#material-part-cooling-fan',
  no_slow_down_for_cooling_on_outwalls: 'material_cooling#material-part-cooling-fan',
  slow_down_min_speed: 'material_cooling#min-print-speed',

  // ── Cooling – Overhang & Bridge ──
  enable_overhang_bridge_fan: 'material_cooling#force-cooling-for-overhangs-and-bridges',
  overhang_fan_threshold: 'material_cooling#overhang-cooling-activation-threshold',
  overhang_fan_speed: 'material_cooling#overhangs-and-external-bridges-fan-speed',
  internal_bridge_fan_speed: 'material_cooling#internal-bridges-fan-speed',
  support_material_interface_fan_speed: 'material_cooling#support-interface-fan-speed',
  ironing_fan_speed: 'material_cooling#ironing-fan-speed',

  // ── Cooling – Auxiliary Fan ──
  additional_cooling_fan_speed: 'material_cooling#auxiliary-part-cooling-fan',

  // ── Cooling – Exhaust Fan ──
  activate_air_filtration: 'material_cooling#activate-air-filtration',
  during_print_exhaust_fan_speed: 'material_cooling#during-print',
  complete_print_exhaust_fan_speed: 'material_cooling#complete-print',

  // ── Setting Overrides – Retraction ──
  filament_retraction_length: 'printer_extruder_retraction#length',
  filament_z_hop: 'printer_extruder_z_hop#z-hop-height',
  filament_z_hop_types: 'printer_extruder_z_hop#z-hop-type',
  filament_retract_lift_above: 'printer_extruder_z_hop#only-lift-z-above',
  filament_retract_lift_below: 'printer_extruder_z_hop#only-lift-z-below',
  filament_retract_lift_enforce: 'printer_extruder_z_hop#on-surfaces',
  filament_retraction_speed: 'printer_extruder_retraction#retraction-speed',
  filament_deretraction_speed: 'printer_extruder_retraction#deretraction-speed',
  filament_retract_restart_extra: 'printer_extruder_retraction#extra-length-on-restart',
  filament_retraction_minimum_travel: 'printer_extruder_retraction#travel-distance-threshold',
  filament_retract_when_changing_layer: 'printer_extruder_retraction#retract-on-layer-change',
  filament_wipe: 'printer_extruder_retraction#wipe-while-retracting',
  filament_wipe_distance: 'printer_extruder_retraction#wipe-distance',
  filament_retract_before_wipe: 'printer_extruder_retraction#retract-amount-before-wipe',
  filament_long_retractions_when_cut: 'printer_extruder_retraction#long-retraction-when-cut-beta',
  filament_retraction_distances_when_cut: 'printer_extruder_retraction#long-retraction-when-cut-beta',

  // ── Setting Overrides – Ironing ──
  filament_ironing_flow: 'quality_settings_ironing#flow',
  filament_ironing_spacing: 'quality_settings_ironing#line-spacing',
  filament_ironing_inset: 'quality_settings_ironing#inset',
  filament_ironing_speed: 'speed_settings_other_layers_speed#ironing-speed',

  // ── Advanced (G-code) ──
  filament_start_gcode: 'material_advanced',
  filament_end_gcode: 'material_advanced',

  // ── Multimaterial – Wipe Tower Parameters ──
  filament_minimal_purge_on_wipe_tower: 'material_multimaterial#multimaterial-wipe-tower-parameters',
  filament_tower_interface_pre_extrusion_dist: 'material_multimaterial#multimaterial-wipe-tower-parameters',
  filament_tower_interface_pre_extrusion_length: 'material_multimaterial#multimaterial-wipe-tower-parameters',
  filament_tower_ironing_area: 'material_multimaterial#multimaterial-wipe-tower-parameters',
  filament_tower_interface_purge_volume: 'material_multimaterial#multimaterial-wipe-tower-parameters',
  filament_tower_interface_print_temp: 'material_multimaterial#multimaterial-wipe-tower-parameters',

  // ── Multimaterial – Multi Filament ──
  long_retractions_when_ec: 'material_multimaterial#multi-filament',
  retraction_distances_when_ec: 'material_multimaterial#multi-filament',

  // ── Multimaterial – Tool Change (Single Extruder MM) ──
  filament_loading_speed_start: 'material_multimaterial#loading-speed-at-the-start',
  filament_loading_speed: 'material_multimaterial#loading-speed',
  filament_unloading_speed_start: 'material_multimaterial#unloading-speed-at-the-start',
  filament_unloading_speed: 'material_multimaterial#unloading-speed',
  filament_toolchange_delay: 'material_multimaterial#delay-after-unloading',
  filament_cooling_moves: 'material_multimaterial#number-of-cooling-moves',
  filament_cooling_initial_speed: 'material_multimaterial#speed-of-the-first-cooling-move',
  filament_cooling_final_speed: 'material_multimaterial#speed-of-the-last-cooling-move',
  filament_stamping_loading_speed: 'material_multimaterial#stamping-loading-speed',
  filament_stamping_distance: 'material_multimaterial#stamping-distance',
  filament_ramming_parameters: 'material_multimaterial#ramming-parameters',
  filament_ramming_volumetric_speed: 'material_multimaterial#ramming-parameters',

  // ── Multimaterial – Tool Change (Multi Extruder MM) ──
  filament_multitool_ramming: 'material_multimaterial#tool-change-parameters-with-multi-extruder',
  filament_multitool_ramming_volume: 'material_multimaterial#multi-tool-ramming-volume',
  filament_multitool_ramming_flow: 'material_multimaterial#multi-tool-ramming-flow',

  // ── Dependencies ──
  compatible_printers: 'material_dependencies#compatible-printers',
  compatible_printers_condition: 'material_dependencies#compatible-printers',
  compatible_prints_condition: 'material_dependencies#compatible-process-profiles',

  // ── Notes ──
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
