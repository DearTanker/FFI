/**
 * OrcaSlicer 字段 tooltip 描述 + wiki 链接
 * tooltip 来自 OrcaSlicer PrintConfig.cpp 中的 def->tooltip
 * wiki 链接对应 https://github.com/OrcaSlicer/OrcaSlicer/wiki/ 下的材料设置页面
 */

const WIKI_BASE = 'https://github.com/OrcaSlicer/OrcaSlicer/wiki';

/**
 * 每个字段的 tooltip 描述（英文原文，来自 PrintConfig.cpp）
 */
export const FIELD_TOOLTIPS: Record<string, string> = {
  // ---- Basic Information ----
  filament_type: 'The material type of filament.',
  filament_vendor: 'Vendor of filament. For show only.',
  filament_soluble: 'Soluble material is commonly used to print supports and support interfaces.',
  filament_is_support: 'Support material is commonly used to print supports and support interfaces.',
  filament_change_length: 'When changing the extruder, it is recommended to extrude a certain length of filament from the original extruder. This helps minimize nozzle oozing.',
  required_nozzle_HRC: 'Minimum HRC of nozzle required to print the filament. Zero means no checking of nozzle\'s HRC.',
  default_filament_colour: 'Only used as a visual help on UI.',
  filament_diameter: 'Filament diameter is used to calculate extrusion in G-code, so it is important and should be accurate.',
  filament_density: 'Filament density. For statistics only.',
  filament_shrink: 'Enter the shrinkage percentage that the filament will get after cooling (94% if you measure 94mm instead of 100mm). The part will be scaled in XY to compensate.',
  filament_shrinkage_compensation_z: 'Enter the shrinkage percentage that the filament will get after cooling (94% if you measure 94mm instead of 100mm). The part will be scaled in Z to compensate.',
  filament_cost: 'Filament price. For statistics only.',
  temperature_vitrification: 'The material softens at this temperature, so when the bed temperature is equal to or greater than this, it\'s highly recommended to open the front door and/or remove the upper glass to avoid clogging.',
  nozzle_temperature_range_low: 'Minimum recommended nozzle temperature for this filament.',
  nozzle_temperature_range_high: 'Maximum recommended nozzle temperature for this filament.',

  // ---- Flow Ratio & Pressure Advance ----
  filament_flow_ratio: 'The material may have volumetric change after switching between molten and crystalline states. This setting changes all extrusion flow of this filament in G-code proportionally. The recommended value range is between 0.95 and 1.05.',
  enable_pressure_advance: 'Enable pressure advance, auto calibration result will be overwritten once enabled.',
  pressure_advance: 'Pressure advance (Klipper) AKA Linear advance factor (Marlin).',

  // ---- Chamber Temperature ----
  chamber_temperatures: 'Target temperature of the heated chamber.',

  // ---- Print Temperature ----
  nozzle_temperature_initial_layer: 'Nozzle temperature for printing initial layer when using this filament.',
  nozzle_temperature: 'Nozzle temperature for layers after the initial one.',

  // ---- Bed Temperature ----
  supertack_plate_temp_initial_layer: 'Bed temperature of the initial layer. A value of 0 means the filament does not support printing on the Cool Plate SuperTack.',
  supertack_plate_temp: 'Bed temperature for layers except the initial one. A value of 0 means the filament does not support printing on the Cool Plate SuperTack.',
  cool_plate_temp_initial_layer: 'Bed temperature of the initial layer. A value of 0 means the filament does not support printing on the Cool Plate.',
  cool_plate_temp: 'Bed temperature for layers except the initial one. A value of 0 means the filament does not support printing on the Cool Plate.',
  textured_cool_plate_temp_initial_layer: 'Bed temperature of the initial layer. A value of 0 means the filament does not support printing on the Textured Cool Plate.',
  textured_cool_plate_temp: 'Bed temperature for layers except the initial one. A value of 0 means the filament does not support printing on the Textured Cool Plate.',
  eng_plate_temp_initial_layer: 'Bed temperature of the initial layer. A value of 0 means the filament does not support printing on the Engineering Plate.',
  eng_plate_temp: 'Bed temperature for layers except the initial one. A value of 0 means the filament does not support printing on the Engineering Plate.',
  hot_plate_temp_initial_layer: 'Bed temperature of the initial layer. A value of 0 means the filament does not support printing on the High Temp Plate.',
  hot_plate_temp: 'Bed temperature for layers except the initial one. A value of 0 means the filament does not support printing on the High Temp Plate.',
  textured_plate_temp_initial_layer: 'Bed temperature of the initial layer. A value of 0 means the filament does not support printing on the Textured PEI Plate.',
  textured_plate_temp: 'Bed temperature for layers except the initial one. A value of 0 means the filament does not support printing on the Textured PEI Plate.',

  // ---- Volumetric Speed ----
  filament_adaptive_volumetric_speed: 'When enabled, the extrusion flow is limited by the smaller of the fitted value (calculated from line width and layer height) and the user-defined maximum flow. When disabled, only the user-defined maximum flow is applied.',
  filament_max_volumetric_speed: 'This setting stands for how much volume of filament can be melted and extruded per second. Printing speed is limited by max volumetric speed, in case of too high and unreasonable speed setting. Can\'t be zero.',

  // ---- Cooling: Specific Layer ----
  close_fan_the_first_x_layers: 'Turn off all cooling fans for the first few layers. This can be used to improve build plate adhesion.',
  full_fan_speed_layer: 'Fan speed will be ramped up linearly from zero at layer "close_fan_the_first_x_layers" to maximum at layer "full_fan_speed_layer".',

  // ---- Cooling: Part Fan ----
  fan_min_speed: 'Minimum speed for part cooling fan.',
  fan_cooling_layer_time: 'Part cooling fan will be enabled for layers of which estimated time is shorter than this value. Fan speed is interpolated between the minimum and maximum fan speeds according to layer printing time.',
  fan_max_speed: 'Maximum speed for part cooling fan.',
  slow_down_layer_time: 'If the estimated layer time is below this threshold, the printing speed will be reduced to extend the layer printing time to the threshold.',
  reduce_fan_stop_start_freq: 'Reduce the frequency of fan start/stop by not turning off the fan when a short travel move is followed by a print that requires the fan.',
  slow_down_for_layer_cooling: 'If enabled, slicing will slow down the printing speed to ensure each layer has enough cooling time.',
  no_slow_down_for_cooling_on_outwalls: 'Do not slow down speed printing outer walls when required for layer cooling time.',
  slow_down_min_speed: 'The minimum printing speed when slowing down for cooling.',
  enable_overhang_bridge_fan: 'Force cooling fan to be specific speed for overhangs and bridges.',
  overhang_fan_threshold: 'When the overhang degree of the overhang exceeds this value, the fan speed will ramp up to "overhang fan speed".',
  overhang_fan_speed: 'Force part cooling fan to be this speed for overhangs and bridges.',
  internal_bridge_fan_speed: 'Force part cooling fan speed for internal bridges.',
  support_material_interface_fan_speed: 'This fan speed is enforced during printing of support interface.',
  ironing_fan_speed: 'Fan speed when doing ironing.',

  // ---- Cooling: Aux Fan ----
  additional_cooling_fan_speed: 'Speed of auxiliary part cooling fan. Auxiliary fan will run at this speed during printing except the first few layers which is defined by close_fan_the_first_x_layers.',

  // ---- Cooling: Exhaust Fan ----
  activate_air_filtration: 'Activate air filtration system by pulling air through a filter during printing.',
  during_print_exhaust_fan_speed: 'Speed of the exhaust fan during printing.',
  complete_print_exhaust_fan_speed: 'Speed of the exhaust fan after printing completes.',

  // ---- Overrides: Retraction ----
  filament_retraction_length: 'Some amount of material in extruder is pulled back to avoid ooze during long travel. Set zero to disable retraction.',
  filament_z_hop: 'Whenever the retraction is done, the nozzle is lifted a little to create clearance between nozzle and the print. It prevents nozzle from hitting the print when travel move.',
  filament_z_hop_types: 'Z hop type. Auto Lift, Normal Lift, Slope Lift, or Spiral Lift.',
  filament_retract_lift_above: 'If you set this to a positive value, Z lift will only take effect when the current Z is above the specified absolute value.',
  filament_retract_lift_below: 'If you set this to a positive value, Z lift will only take effect when the current Z is below the specified absolute value.',
  filament_retract_lift_enforce: 'Enforce Z hop behavior on certain surfaces.',
  filament_retraction_speed: 'Speed for retracting filament from the nozzle.',
  filament_deretraction_speed: 'Speed for reloading filament into the nozzle. Zero means same speed of retraction.',
  filament_retract_restart_extra: 'When the retraction is compensated after the travel move, the extruder will push this additional amount of filament.',
  filament_retraction_minimum_travel: 'Only trigger retraction when the travel distance is longer than this threshold.',
  filament_retract_when_changing_layer: 'Force a retraction when changes layer.',
  filament_wipe: 'This flag will move the nozzle along the last extrusion path when the retraction is triggered, to reduce the possibility of blob.',
  filament_wipe_distance: 'Describe how long the nozzle will move along the last path when retracting.',
  filament_retract_before_wipe: 'The length of fast retraction before wipe, relative to retraction length.',
  filament_long_retractions_when_cut: 'Retract more when using filament cutter.',
  filament_retraction_distances_when_cut: 'Retraction distance when filament cutter is used.',

  // ---- Overrides: Ironing ----
  filament_ironing_flow: 'The amount of material to extrude during ironing, relative to the flow rate.',
  filament_ironing_spacing: 'The distance between the lines of ironing.',
  filament_ironing_inset: 'The inset from the edge of the area to be ironed.',
  filament_ironing_speed: 'Print speed for ironing.',

  // ---- Advanced ----
  filament_start_gcode: 'Start G-code when starting the printing of this filament.',
  filament_end_gcode: 'End G-code when finishing the printing of this filament.',

  // ---- Multimaterial: Tower Params ----
  filament_minimal_purge_on_wipe_tower: 'After a tool change, the exact position of the newly loaded filament inside the nozzle may not be known, and the filament pressure is likely not yet stable. Before purging the print head into an infill or a sacrificial object, Orca Slicer will always prime this amount of material into the wipe tower to produce successive infill or sacrificial object extrusions reliably.',

  // ---- Multimaterial: Single Extruder Toolchange ----
  filament_loading_speed_start: 'Speed used at the very beginning of loading phase.',
  filament_loading_speed: 'Speed used for loading the filament on the wipe tower.',
  filament_unloading_speed_start: 'Speed used for unloading the tip of the filament immediately after ramming.',
  filament_unloading_speed: 'Speed used for unloading the filament on the wipe tower (does not affect initial part of unloading just after ramming).',
  filament_toolchange_delay: 'Time to wait after the filament is unloaded. May help to get reliable tool changes with flexible materials that may need more time to shrink to original dimensions.',
  filament_cooling_moves: 'Filament is cooled by being moved back and forth in the cooling tubes. Specify desired number of these moves.',
  filament_cooling_initial_speed: 'Cooling moves are gradually accelerating beginning at this speed.',
  filament_cooling_final_speed: 'Cooling moves are gradually accelerating towards this speed.',
  filament_ramming_volumetric_speed: 'Speed of the ramming phase.',
  filament_stamping_distance: 'Stamping distance measured from the center of the cooling tube.',

  // ---- Multimaterial: Multi Extruder Toolchange ----
  filament_multitool_ramming: 'Enable ramming for multi-tool printers.',
  filament_multitool_ramming_volume: 'The volume to be rammed before the tool change.',
  filament_multitool_ramming_flow: 'Flow used for ramming the filament before the tool change.',

  // ---- Dependencies ----
  compatible_printers: 'Select the printers this profile is compatible with.',

  // ---- Notes ----
  filament_notes: 'You can put your notes regarding the filament here.',
};

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
 * 获取字段的 tooltip 描述
 */
export function getFieldTooltip(fieldKey: string): string | undefined {
  return FIELD_TOOLTIPS[fieldKey];
}

/**
 * 获取字段对应的 OrcaSlicer wiki 链接
 */
export function getFieldWikiUrl(fieldKey: string): string | undefined {
  const page = FIELD_WIKI_MAP[fieldKey];
  if (!page) return undefined;
  return `${WIKI_BASE}/${page}`;
}
