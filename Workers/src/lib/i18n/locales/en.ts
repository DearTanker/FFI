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

    // ---- BambuStudio unique fields ----
    impact_strength_z:                   'Impact strength (Z)',
    filament_velocity_adaptation_factor: 'Velocity adaptation factor',
    filament_cooling_before_tower:       'Cooling before tower',
    filament_prime_volume:               'Filament prime volume',
    filament_prime_volume_nc:            'Filament prime volume (non-toolchange)',
    filament_change_length_nc:           'Filament ramming length (non-toolchange)',
    filament_ramming_travel_time:        'Travel time after ramming',
    filament_ramming_travel_time_nc:     'Travel time after ramming (non-toolchange)',
    filament_pre_cooling_temperature:    'Precooling target temperature',
    filament_pre_cooling_temperature_nc: 'Precooling target temperature (non-toolchange)',
    filament_scarf_seam_type:            'Scarf seam type',
    filament_scarf_height:               'Scarf height',
    filament_scarf_gap:                  'Scarf gap',
    filament_scarf_length:               'Scarf length',
    first_x_layer_fan_speed:             'First layer fan speed',
    overhang_threshold_participating_cooling: 'Overhang threshold participating cooling',
    pre_start_fan_time:                  'Pre-start fan time',
    override_process_overhang_speed:     'Override overhang speed',
    filament_enable_overhang_speed:      'Enable overhang speed',
    filament_overhang_1_4_speed:         'Overhang speed (10~25%)',
    filament_overhang_2_4_speed:         'Overhang speed (25~50%)',
    filament_overhang_3_4_speed:         'Overhang speed (50~75%)',
    filament_overhang_4_4_speed:         'Overhang speed (75~100%)',
    filament_overhang_totally_speed:     'Totally overhang speed',
    filament_bridge_speed:               'Bridge speed',
    filament_retract_length_nc:          'Retraction length (non-toolchange)',
    filament_ramming_volumetric_speed_nc:'Ramming volumetric speed (non-toolchange)',
    long_retractions_when_ec:            'Long retraction when extruder change',
    retraction_distances_when_ec:        'Retraction distance when extruder change',
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
    // BambuStudio pairs
    bs_prime_volume:      { label: 'Filament prime volume', left: 'Toolchange', right: 'Non-toolchange' },
    bs_ramming_length:    { label: 'Filament ramming length', left: 'Toolchange', right: 'Non-toolchange' },
    bs_ramming_travel_time: { label: 'Travel time after ramming', left: 'Toolchange', right: 'Non-toolchange' },
    bs_pre_cooling_temp:  { label: 'Precooling target temperature', left: 'Toolchange', right: 'Non-toolchange' },
    bs_nozzle_temp_range: { label: 'Recommended nozzle temperature', left: 'Min', right: 'Max' },
    bs_supertack_plate:   { label: 'Bambu Cool Plate SuperTack', left: 'Initial layer', right: 'Other layers' },
    bs_cool_plate:        { label: 'Cool Plate', left: 'Initial layer', right: 'Other layers' },
    bs_eng_plate:         { label: 'Engineering Plate', left: 'Initial layer', right: 'Other layers' },
    bs_hot_plate:         { label: 'Smooth PEI Plate / High Temp Plate', left: 'Initial layer', right: 'Other layers' },
    bs_textured_plate:    { label: 'Textured PEI Plate', left: 'Initial layer', right: 'Other layers' },
    bs_nozzle_temp:       { label: 'Nozzle', left: 'Initial layer', right: 'Other layers' },
    bs_fan_min_threshold: { label: 'Min fan speed threshold', left: 'Fan speed', right: 'Layer time' },
    bs_fan_max_threshold: { label: 'Max fan speed threshold', left: 'Fan speed', right: 'Layer time' },
    bs_first_layer_cooling: { label: 'Special cooling settings', left: 'No cooling for the first', right: 'First layer fan speed' },
    bs_ramming_volumetric: { label: 'Ramming volumetric speed', left: 'Toolchange', right: 'Non-toolchange' },
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
    // BambuStudio groups
    'bs-information':           'Basic Information',
    'bs-print-temp':            'Print Temperature',
    'bs-volumetric-speed':      'Volumetric Speed Limitation',
    'bs-scarf-seam':            'Filament Scarf Seam Settings',
    'bs-cooling-specific':      'Cooling for Specific Layer',
    'bs-cooling-part-fan':      'Part Cooling Fan',
    'bs-cooling-aux-fan':       'Auxiliary Part Cooling Fan',
    'bs-cooling-exhaust':       'Exhaust Fan',
    'bs-retraction':            'Retraction',
    'bs-speed':                 'Speed',
    'bs-gcode-start':           'Start G-code',
    'bs-gcode-end':             'End G-code',
    'bs-notes-group':           'Notes',
    'bs-multi-filament-group':  'Multi Filament',
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
    // BambuStudio pages
    'bs-filament':              'Filament',
    'bs-cooling':               'Cooling',
    'bs-overrides':             'Setting Overrides',
    'bs-advanced':              'Advanced',
    'bs-notes':                 'Notes',
    'bs-multi-filament':        'Multi Filament',
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
    'view_orca':                'OrcaSlicer View',
    'view_bambu':               'BambuStudio View',
    'nav_update':               'Update Now',
    'nav_updating':             'Updating...',

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

  // ========== Field tooltip descriptions ==========
  // key = JSON param name, value = English description (from OrcaSlicer PrintConfig.cpp def->tooltip)
  tooltips: {
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
