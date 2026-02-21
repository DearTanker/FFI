/**
 * English locale
 *
 * Field labels sourced from OrcaSlicer PrintConfig.cpp:
 *   def->label = L("English Label")
 *
 * Update steps:
 *   1. Find the parameter in OrcaSlicer PrintConfig.cpp: this->add("json_key", ...)
 *   2. Copy the English label from: def->label = L("English Label")
 *   3. Add json_key → "English Label" to fields below
 */

import type { LocaleMessages } from '../types';

const en: LocaleMessages = {
  // ========== Field Labels ==========
  fields: {
    // ---- Filament Page: Basic Information ----
    filament_type:                       'Type',
    filament_vendor:                     'Vendor',
    filament_soluble:                    'Soluble material',
    filament_is_support:                 'Support material',
    filament_change_length:              'Filament ramming length',
    required_nozzle_HRC:                 'Required nozzle HRC',
    default_filament_colour:             'Default color',
    filament_diameter:                   'Diameter',
    filament_adhesiveness_category:      'Adhesiveness category',
    filament_density:                    'Filament density',
    filament_shrink:                     'Shrinkage (XY)',
    filament_shrinkage_compensation_z:   'Shrinkage (Z)',
    filament_cost:                       'Price',
    temperature_vitrification:           'Softening temperature',
    idle_temperature:                    'Idle temperature',
    nozzle_temperature_range_low:        'Nozzle temperature range (Min)',
    nozzle_temperature_range_high:       'Nozzle temperature range (Max)',

    // ---- Filament Page: Flow Ratio and Pressure Advance ----
    filament_flow_ratio:                 'Flow ratio',
    enable_pressure_advance:             'Enable pressure advance',
    pressure_advance:                    'Pressure advance',
    adaptive_pressure_advance:           'Enable adaptive pressure advance (beta)',

    // ---- Filament Page: Chamber Temperature ----
    chamber_temperatures:                'Activate temperature control',

    // ---- Filament Page: Print Temperature ----
    nozzle_temperature_initial_layer:    'Nozzle (Initial layer)',
    nozzle_temperature:                  'Nozzle (Other layers)',

    // ---- Filament Page: Bed Temperature ----
    supertack_plate_temp_initial_layer:  'Supertack plate initial layer',
    supertack_plate_temp:                'Supertack plate other layers',
    cool_plate_temp_initial_layer:       'Cool plate initial layer',
    cool_plate_temp:                     'Cool plate other layers',
    textured_cool_plate_temp_initial_layer: 'Textured cool plate initial layer',
    textured_cool_plate_temp:            'Textured cool plate other layers',
    eng_plate_temp_initial_layer:        'Engineering plate initial layer',
    eng_plate_temp:                      'Engineering plate other layers',
    hot_plate_temp_initial_layer:        'Hot plate initial layer',
    hot_plate_temp:                      'Hot plate other layers',
    textured_plate_temp_initial_layer:   'Textured PEI plate initial layer',
    textured_plate_temp:                 'Textured PEI plate other layers',

    // ---- Filament Page: Volumetric Speed ----
    filament_adaptive_volumetric_speed:  'Adaptive volumetric speed',
    filament_max_volumetric_speed:       'Max volumetric speed',

    // ---- Cooling Page: Layer-specific Cooling ----
    close_fan_the_first_x_layers:        'No cooling for the first',
    full_fan_speed_layer:                'Full fan speed at layer',

    // ---- Cooling Page: Part Cooling Fan ----
    fan_min_speed:                       'Min fan speed threshold (Fan speed)',
    fan_cooling_layer_time:              'Min fan speed threshold (Layer time)',
    fan_max_speed:                       'Max fan speed threshold (Fan speed)',
    slow_down_layer_time:                'Max fan speed threshold (Layer time)',
    reduce_fan_stop_start_freq:          'Keep fan always on',
    slow_down_for_layer_cooling:         'Slow printing down for better layer cooling',
    no_slow_down_for_cooling_on_outwalls:'Don\'t slow down outer walls',
    slow_down_min_speed:                 'Min print speed',
    enable_overhang_bridge_fan:          'Force cooling for overhangs and bridges',
    overhang_fan_threshold:              'Overhang cooling activation threshold',
    overhang_fan_speed:                  'Overhangs and external bridges fan speed',
    internal_bridge_fan_speed:           'Internal bridges fan speed',
    support_material_interface_fan_speed:'Support interface fan speed',
    ironing_fan_speed:                   'Ironing fan speed',

    // ---- Cooling Page: Auxiliary Fan ----
    additional_cooling_fan_speed:        'Fan speed',

    // ---- Cooling Page: Exhaust Fan ----
    activate_air_filtration:             'Activate air filtration',
    during_print_exhaust_fan_speed:      'During print',
    complete_print_exhaust_fan_speed:    'Complete print',

    // ---- Setting Overrides: Retraction ----
    filament_retraction_length:          'Length',
    filament_z_hop:                      'Z hop',
    filament_z_hop_types:                'Z hop type',
    filament_retract_lift_above:         'Only lift Z above',
    filament_retract_lift_below:         'Only lift Z below',
    filament_retract_lift_enforce:       'On surfaces',
    filament_retraction_speed:           'Retraction speed',
    filament_deretraction_speed:         'Deretraction speed',
    filament_retract_restart_extra:      'Extra length on restart',
    filament_retraction_minimum_travel:  'Travel distance threshold',
    filament_retract_when_changing_layer:'Retract when changing layer',
    filament_wipe:                       'Wipe',
    filament_wipe_distance:              'Wipe distance',
    filament_retract_before_wipe:        'Retract before wipe',
    filament_long_retractions_when_cut:  'Long retraction when cut',
    filament_retraction_distances_when_cut:'Retraction distance when cut',

    // ---- Setting Overrides: Ironing ----
    filament_ironing_flow:               'Ironing flow',
    filament_ironing_spacing:            'Ironing line spacing',
    filament_ironing_inset:              'Ironing inset',
    filament_ironing_speed:              'Ironing speed',

    // ---- Advanced ----
    filament_start_gcode:                'Start G-code',
    filament_end_gcode:                  'End G-code',

    // ---- Multimaterial: Wipe Tower ----
    filament_minimal_purge_on_wipe_tower:'Minimal purge on wipe tower',
    filament_tower_interface_pre_extrusion_dist: 'Interface layer pre-extrusion distance',
    filament_tower_interface_pre_extrusion_length: 'Interface layer pre-extrusion length',
    filament_tower_ironing_area:         'Tower ironing area',
    filament_tower_interface_purge_volume:'Interface layer purge length',
    filament_tower_interface_print_temp: 'Interface layer print temperature',

    // ---- Multimaterial: Single Extruder Toolchange ----
    filament_loading_speed_start:        'Loading speed at the start',
    filament_loading_speed:              'Loading speed',
    filament_unloading_speed_start:      'Unloading speed at the start',
    filament_unloading_speed:            'Unloading speed',
    filament_toolchange_delay:           'Delay after unloading',
    filament_cooling_moves:              'Number of cooling moves',
    filament_cooling_initial_speed:      'Speed of the first cooling move',
    filament_cooling_final_speed:        'Speed of the last cooling move',
    filament_ramming_volumetric_speed:   'Ramming volumetric speed',
    filament_stamping_distance:          'Stamping distance from cooling tube center',

    // ---- Multimaterial: Multi Extruder Toolchange ----
    filament_multitool_ramming:          'Enable multi-tool ramming',
    filament_multitool_ramming_volume:   'Multi-tool ramming volume',
    filament_multitool_ramming_flow:     'Multi-tool ramming flow',

    // ---- Dependencies ----
    compatible_printers:                 'Compatible printers',

    // ---- Notes ----
    filament_notes:                      'Notes',
  },

  // ========== Paired Field Labels ==========
  pairs: {
    nozzle_temp_range:    { label: 'Nozzle temperature range', left: 'Min', right: 'Max' },
    nozzle_temp:          { label: 'Nozzle', left: 'Initial layer', right: 'Other layers' },
    supertack_plate:      { label: 'Supertack plate', left: 'Initial layer', right: 'Other layers' },
    cool_plate:           { label: 'Cool plate', left: 'Initial layer', right: 'Other layers' },
    textured_cool_plate:  { label: 'Textured cool plate', left: 'Initial layer', right: 'Other layers' },
    eng_plate:            { label: 'Engineering plate', left: 'Initial layer', right: 'Other layers' },
    hot_plate:            { label: 'Hot plate', left: 'Initial layer', right: 'Other layers' },
    textured_plate:       { label: 'Textured PEI plate', left: 'Initial layer', right: 'Other layers' },
    fan_min_threshold:    { label: 'Min fan speed threshold', left: 'Fan speed', right: 'Layer time' },
    fan_max_threshold:    { label: 'Max fan speed threshold', left: 'Fan speed', right: 'Layer time' },
  },

  // ========== Group Labels ==========
  groups: {
    'information':              'Basic Information',
    'flow-ratio':               'Flow Ratio and Pressure Advance',
    'chamber-temp':             'Chamber Temperature',
    'extruder-temp':            'Print Temperature',
    'bed-temp':                 'Bed Temperature',
    'volumetric-speed':         'Volumetric Speed Limitation',
    'cooling-specific-layer':   'Layer-specific Cooling',
    'cooling-part-fan':         'Part Cooling Fan',
    'cooling-aux-fan':          'Auxiliary Part Cooling Fan',
    'cooling-exhaust':          'Exhaust Fan',
    'retraction':               'Retraction',
    'ironing':                  'Ironing',
    'gcode-start':              'Start G-code',
    'gcode-end':                'End G-code',
    'tower-params':             'Wipe Tower Parameters',
    'toolchange-single':        'Single Extruder Toolchange',
    'toolchange-multi':         'Multi Extruder Toolchange',
    'compatible-printers':      'Compatible Printers',
    'notes':                    'Notes',
  },

  // ========== Page Tab Labels ==========
  pages: {
    'filament-basic':           'Filament',
    'filament-cooling':         'Cooling',
    'filament-overrides':       'Setting Overrides',
    'filament-advanced':        'Advanced',
    'filament-multimaterial':   'Multimaterial',
    'filament-dependencies':    'Dependencies',
    'filament-notes':           'Notes',
  },

  // ========== UI Strings ==========
  ui: {
    // Page title & meta
    'site_title':               'FDM 3D Printing Filament Info',
    'site_subtitle':            'FDM Filaments Info',
    'site_description':         'Browse and search FDM 3D printing filament preset configurations',

    // Sidebar navigation
    'nav_brands_title':         'FDM 3D Printing Filament Brands',
    'nav_brands_guide':         'Filament → Type → Series → Filament Settings',
    'nav_section_brand':        'Brands',
    'nav_filament_settings':    'Filament Settings',

    // Breadcrumb
    'breadcrumb_root':          'Filaments',

    // Status
    'loading':                  'Loading...',
    'error_load':               'Failed to load filament data',
    'error_load_nav':           'Load failed',
    'error_retry':              'Please check your network or refresh',

    // Navigation & filtering
    'type':                     'Type',
    'series':                   'Series',
    'material_type':            'Material Type',
    'product_series':           'Product Series',
    'no_types':                 'No types available',
    'no_series':                'No series available',
    'select_type_first':        'Select a type first',
    'select_brand_first':       'Select a brand first',
    'select_type_prompt':       'Please select a filament type',
    'select_series_prompt':     'Please select a filament series',
    'select_brand_prompt':      'Please select a brand from the sidebar',
    'select_type_left':         'Select a filament type on the left',
    'select_series_left':       'Select a filament series on the left',
    'brand_instruction':        'Select type and series on the left to view filament presets',
    'no_profiles':              'No presets available for this series',
    'profile_count':            '{count} presets',

    // Profile list
    'back_to_list':             'Back to list',
    'n_profiles':               '{count} presets',
    'compatible_printers':      'Compatible printers',
    'all':                      'All',

    // Details page
    'view_source':              'View source',
    'back_to_value':            'Back to value',
    'page_no_data':             'No configuration data on this page',
    'not_overridden':           'Not overridden (using printer default)',
  },

  // ========== Enum value translations ==========
  // key = raw JSON value, value = English display label
  values: {
    // filament_z_hop_types
    'Auto Lift':                'Auto',
    'Normal Lift':              'Normal',
    'Slope Lift':               'Slope',
    'Spiral Lift':              'Spiral',

    // filament_retract_lift_enforce
    'All Surfaces':             'All Surfaces',
    'Top Only':                 'Top Only',
    'Bottom Only':              'Bottom Only',
    'Top and Bottom':           'Top and Bottom',
  },
};

export default en;
