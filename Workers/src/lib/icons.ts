/**
 * Icon mapping for OrcaSlicer UI replication
 * Maps icon identifiers to their SVG file paths
 */

export type IconName = 
  // Tab Filament Pages
  | 'filament'
  | 'cooling'
  | 'setting-override'
  | 'advanced'
  | 'multimaterial'
  | 'dependencies'
  | 'note'
  // Tab Print Pages
  | 'quality'
  | 'strength'
  | 'speed'
  | 'support'
  | 'other'
  // Tab Printer Pages
  | 'object-info'
  | 'gcode'
  | 'extruder'
  | 'motion'
  // Group Icons
  | 'information'
  | 'flow-ratio'
  | 'chamber-temp'
  | 'extruder-temp'
  | 'bed-temp'
  | 'volumetric-speed'
  | 'cooling-fan'
  | 'cooling-aux-fan'
  | 'cooling-part-fan'
  | 'cooling-specific-layer'
  | 'cooling-exhaust'
  | 'retraction'
  | 'ironing'
  | 'tower'
  | 'toolchange'
  | 'toolchange-multi-extruder'
  | 'dependencies-printers'
  | 'dependencies-presets';

export const iconMap: Record<IconName, string> = {
  // Tab Filament Pages
  filament: '/icons/custom-gcode_filament.svg',
  cooling: '/icons/custom-gcode_cooling_fan.svg',
  'setting-override': '/icons/custom-gcode_setting_override.svg',
  advanced: '/icons/custom-gcode_advanced.svg',
  multimaterial: '/icons/custom-gcode_multi_material.svg',
  dependencies: '/icons/advanced.svg',
  note: '/icons/custom-gcode_note.svg',
  
  // Tab Print Pages
  quality: '/icons/custom-gcode_quality.svg',
  strength: '/icons/custom-gcode_strength.svg',
  speed: '/icons/custom-gcode_speed.svg',
  support: '/icons/custom-gcode_support.svg',
  other: '/icons/custom-gcode_other.svg',
  
  // Tab Printer Pages
  'object-info': '/icons/custom-gcode_object-info.svg',
  gcode: '/icons/custom-gcode_gcode.svg',
  extruder: '/icons/custom-gcode_extruder.svg',
  motion: '/icons/custom-gcode_motion.svg',
  
  // Group Icons
  information: '/icons/param_information.svg',
  'flow-ratio': '/icons/param_flow_ratio_and_pressure_advance.svg',
  'chamber-temp': '/icons/param_chamber_temp.svg',
  'extruder-temp': '/icons/param_extruder_temp.svg',
  'bed-temp': '/icons/param_bed_temp.svg',
  'volumetric-speed': '/icons/param_volumetric_speed.svg',
  'cooling-fan': '/icons/param_cooling_fan.svg',
  'cooling-aux-fan': '/icons/param_cooling_aux_fan.svg',
  'cooling-part-fan': '/icons/param_cooling_part_fan.svg',
  'cooling-specific-layer': '/icons/param_cooling_specific_layer.svg',
  'cooling-exhaust': '/icons/param_cooling_exhaust.svg',
  retraction: '/icons/param_retraction.svg',
  ironing: '/icons/param_ironing.svg',
  tower: '/icons/param_tower.svg',
  toolchange: '/icons/param_toolchange.svg',
  'toolchange-multi-extruder': '/icons/param_toolchange_multi_extruder.svg',
  'dependencies-printers': '/icons/param_dependencies_printers.svg',
  'dependencies-presets': '/icons/param_dependencies_presets.svg',
};

export function getIconPath(name: IconName): string {
  return iconMap[name] || '/icons/custom-gcode_filament.svg';
}
