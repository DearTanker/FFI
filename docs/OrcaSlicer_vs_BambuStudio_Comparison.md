# OrcaSlicer vs BambuStudio: Comprehensive Filament Configuration Comparison

> **Date**: 2025-07  
> **Sources**: [OrcaSlicer](https://github.com/OrcaSlicer/OrcaSlicer) (main) vs [BambuStudio](https://github.com/bambulab/BambuStudio) (master)  
> **Scope**: Filament configuration structure, UI tabs, icons, i18n, wiki, license

---

## Table of Contents

1. [SVG Icon Comparison](#1-svg-icon-comparison-resourcesimages)
2. [TabFilament UI Structure (Tab.cpp)](#2-tabfilament-ui-structure-tabcpp)
3. [Filament Configuration Keys (PrintConfig.cpp)](#3-filament-configuration-keys-printconfigcpp)
4. [i18n / Translation Files](#4-i18n--translation-files)
5. [BambuStudio Wiki](#5-bambustudio-wiki)
6. [License Comparison](#6-license-comparison)

---

## 1. SVG Icon Comparison (`resources/images`)

### Custom G-code Page Icons (OrcaSlicer only)

OrcaSlicer uses `custom-gcode_*.svg` icons for tab page headers. **BambuStudio does NOT have any of these** — this is an OrcaSlicer-specific enhancement.

| OrcaSlicer Icon | Used For |
|---|---|
| `custom-gcode_filament.svg` | Filament page tab |
| `custom-gcode_cooling_fan.svg` | Cooling page tab |
| `custom-gcode_setting_override.svg` | Setting Overrides page tab |
| `custom-gcode_advanced.svg` | Advanced page tab |
| `custom-gcode_note.svg` | Notes page tab |
| `custom-gcode_multi_material.svg` | Multimaterial page tab |
| `custom-gcode_quality.svg` | Quality (Print tab) |
| `custom-gcode_strength.svg` | Strength (Print tab) |
| `custom-gcode_speed.svg` | Speed (Print tab) |
| `custom-gcode_support.svg` | Support (Print tab) |
| `custom-gcode_other.svg` | Others (Print tab) |
| `custom-gcode_object-info.svg` | Basic info (Printer tab) |
| `custom-gcode_gcode.svg` | Machine G-code (Printer tab) |
| `custom-gcode_motion.svg` | Motion ability (Printer tab) |
| `custom-gcode_extruder.svg` | Extruder pages (Printer tab) |

### Parameter Group Icons (`param_*.svg`)

#### Both repos share:
`param_acceleration`, `param_advanced`, `param_adhension`, `param_bridge`, `param_cooling`, `param_cooling_fan`, `param_gcode`, `param_infill`, `param_information`, `param_ironing`, `param_layer_height`, `param_line_width`, `param_precision`, `param_raft`, `param_retraction`, `param_seam`, `param_shell`, `param_special`, `param_speed`, `param_speed_first`, `param_support`, `param_support_filament`, `param_support_tree`, `param_temperature`, `param_tower`, `param_travel_speed`, `param_volumetric_speed`, `param_wall`

#### OrcaSlicer-unique `param_*` icons:
| Icon | Purpose |
|---|---|
| `param_accessory` | Accessory group |
| `param_adaptive_mesh` | Adaptive bed mesh group |
| `param_bed_temp` | Bed temperature group |
| `param_chamber_temp` | Chamber temperature group |
| `param_cooling_aux_fan` | Auxiliary part cooling fan |
| `param_cooling_exhaust` | Exhaust fan group |
| `param_cooling_part_fan` | Part cooling fan group |
| `param_cooling_specific_layer` | Cooling for specific layer |
| `param_dependencies_presets` | Compatible process profiles |
| `param_dependencies_printers` | Compatible printers |
| `param_extruder_clearance` | Extruder clearance group |
| `param_extruder_lift_enforcement` | Z-Hop group |
| `param_extruder_size` | Extruder size |
| `param_extruder_temp` | Nozzle temperature group |
| `param_filament_for_features` | Filament for features |
| `param_flow_ratio_and_pressure_advance` | Flow ratio and PA group |
| `param_jerk` | Jerk settings |
| `param_multi_material` | Multi-material settings |
| `param_overhang` | Overhang settings |
| `param_overhang_speed` | Overhang speed group |
| `param_position` | Extruder position |
| `param_printable_space` | Printable space group |
| `param_retraction_material_change` | Material change retraction |
| `param_settings` | Settings group |
| `param_skirt` | Skirt group |
| `param_toolchange_multi_extruder` | Tool change multi-extruder |
| `param_wall_generator` | Wall generator group |
| `param_wall_surface` | Walls and surfaces group |
| `param_resonance_avoidance` | Resonance avoidance |
| `param_quartercubic` | Quarter cubic infill |
| `param_lateral-honeycomb` | Lateral honeycomb infill |
| `param_lateral-lattice` | Lateral lattice infill |
| `param_tpmsd` | Infill pattern icon |
| `param_tpmsfk` | Infill pattern icon |

#### BambuStudio-unique icons:
| Icon | Purpose |
|---|---|
| `param_2dlattice` | 2D lattice pattern |
| `param_zig-zag` | Zig-zag pattern |
| Various helio-related images | Printer hardware visuals |
| bool operation images | Object boolean operations |
| Printer preview PNGs | Printer preview images |

### Key Insight
OrcaSlicer has **significantly more granular** parameter group icons than BambuStudio, providing distinct icons for almost every option group in the filament, print, and printer tabs. BambuStudio uses fewer icons (often `"empty"` or reuses general icons).

---

## 2. TabFilament UI Structure (Tab.cpp)

### Side-by-Side Page Comparison

| # | OrcaSlicer Page | Icon | BambuStudio Page | Icon |
|---|---|---|---|---|
| 1 | **Filament** | `custom-gcode_filament` | **Filament** | `spool` |
| 2 | **Cooling** | `custom-gcode_cooling_fan` | **Cooling** | `empty` |
| 3 | **Setting Overrides** | `custom-gcode_setting_override` | **Setting Overrides** | `empty` |
| 4 | **Advanced** | `custom-gcode_advanced` | **Advanced** | `advanced` |
| 5 | **Multimaterial** | `custom-gcode_multi_material` | **Notes** | `note` |
| 6 | **Dependencies** | `advanced` | **Multi Filament** | `advanced` |
| 7 | **Notes** | `custom-gcode_note` | — | — |

### Page 1: Filament — Detailed Group Comparison

#### 1.1 Basic Information

| Feature | OrcaSlicer | BambuStudio |
|---|---|---|
| Group Icon | `param_information` | `param_information` |
| `filament_type` | ✅ | ✅ |
| `filament_vendor` | ✅ | ✅ |
| `filament_soluble` | ✅ | ✅ |
| `filament_is_support` | ✅ | ✅ |
| `filament_change_length` | ✅ | ❌ (in tower params) |
| `required_nozzle_HRC` | ✅ | ✅ |
| `default_filament_colour` | ✅ | ✅ |
| `filament_diameter` | ✅ | ✅ |
| `filament_adhesiveness_category` | ✅ | ✅ |
| `filament_density` | ✅ | ✅ |
| `filament_shrink` | ✅ | ✅ |
| `filament_shrinkage_compensation_z` | ✅ OrcaSlicer-only | ❌ |
| `filament_cost` | ✅ | ✅ |
| `temperature_vitrification` | ✅ | ✅ |
| `idle_temperature` | ✅ OrcaSlicer-only | ❌ |
| `nozzle_temperature_range_low/high` | ✅ (combined line) | ✅ (combined line) |
| `impact_strength_z` | ❌ | ✅ BambuStudio-only |
| `filament_flow_ratio` | ❌ (moved to own group) | ✅ (in basic info) |
| `enable_pressure_advance` | ❌ (moved to own group) | ✅ (in basic info) |
| `pressure_advance` | ❌ (moved to own group) | ✅ (in basic info) |
| `filament_velocity_adaptation_factor` | ❌ | ✅ BambuStudio-only |
| `filament_cooling_before_tower` | ❌ | ✅ BambuStudio-only |
| `filament_prime_volume` | ❌ | ✅ BambuStudio-only |

#### 1.2 Flow Ratio and Pressure Advance (OrcaSlicer-only group)

OrcaSlicer splits this into a **dedicated group** with icon `param_flow_ratio_and_pressure_advance`:

| Key | OrcaSlicer | BambuStudio |
|---|---|---|
| `pellet_flow_coefficient` | ✅ | ❌ |
| `filament_flow_ratio` | ✅ | (in Basic info) |
| `enable_pressure_advance` | ✅ | (in Basic info) |
| `pressure_advance` | ✅ | (in Basic info) |
| `adaptive_pressure_advance` | ✅ OrcaSlicer-only | ❌ |
| `adaptive_pressure_advance_overhangs` | ✅ OrcaSlicer-only | ❌ |
| `adaptive_pressure_advance_bridges` | ✅ OrcaSlicer-only | ❌ |
| `adaptive_pressure_advance_model` | ✅ OrcaSlicer-only | ❌ |

#### 1.3 Print Chamber Temperature

| Key | OrcaSlicer | BambuStudio |
|---|---|---|
| Group icon | `param_chamber_temp` | (in Print temperature group) |
| `chamber_temperature` | ✅ (dedicated group) | ✅ (`chamber_temperatures`) |
| `activate_chamber_temp_control` | ✅ OrcaSlicer-only | ❌ |

#### 1.4 Print Temperature (Nozzle)

| Key | OrcaSlicer | BambuStudio |
|---|---|---|
| Group icon | `param_extruder_temp` | `param_temperature` |
| `nozzle_temperature_initial_layer` | ✅ | ✅ |
| `nozzle_temperature` | ✅ | ✅ |

#### 1.5 Bed Temperature

| Key | OrcaSlicer | BambuStudio |
|---|---|---|
| Group icon | `param_bed_temp` (OrcaSlicer-unique) | (in Print temperature group) |
| `supertack_plate_temp` | ✅ ("Cool Plate (SuperTack)") | ✅ |
| `cool_plate_temp` | ✅ | ✅ |
| `textured_cool_plate_temp` | ✅ OrcaSlicer-only | ❌ |
| `eng_plate_temp` | ✅ | ✅ |
| `hot_plate_temp` | ✅ ("Smooth PEI / High Temp") | ✅ |
| `textured_plate_temp` | ✅ ("Textured PEI Plate") | ✅ |
| All have `_initial_layer` variants | ✅ | ✅ |

#### 1.6 Volumetric Speed Limitation

| Key | OrcaSlicer | BambuStudio |
|---|---|---|
| `filament_adaptive_volumetric_speed` | ✅ | ✅ |
| `filament_max_volumetric_speed` | ✅ | ✅ |
| `filament_ramming_volumetric_speed` | ❌ | ✅ BambuStudio-only |

#### 1.7 Filament Scarf Seam Settings (BambuStudio-only group)

BambuStudio has a unique group on the Filament page:
- `filament_scarf_seam_type`
- `filament_scarf_height`
- `filament_scarf_gap`
- `filament_scarf_length`

OrcaSlicer does NOT have filament-level scarf seam settings (scarf seam is in the Print tab's Quality page).

---

### Page 2: Cooling — Detailed Group Comparison

#### 2.1 Cooling for Specific Layer

| Key | OrcaSlicer | BambuStudio |
|---|---|---|
| Group icon | `param_cooling_specific_layer` | `param_cooling` |
| `close_fan_the_first_x_layers` | ✅ | ✅ |
| `full_fan_speed_layer` | ✅ OrcaSlicer-only | ❌ |
| `first_x_layer_fan_speed` | ❌ | ✅ BambuStudio-only |

#### 2.2 Part Cooling Fan

| Key | OrcaSlicer | BambuStudio |
|---|---|---|
| Group icon | `param_cooling_part_fan` | `param_cooling_fan` |
| `fan_min_speed` + `fan_cooling_layer_time` | ✅ (combined line) | ✅ (combined line) |
| `fan_max_speed` + `slow_down_layer_time` | ✅ (combined line) | ✅ (combined line) |
| `reduce_fan_stop_start_freq` | ✅ | ✅ |
| `slow_down_for_layer_cooling` | ✅ | ✅ |
| `dont_slow_down_outer_wall` | ✅ OrcaSlicer-only (renamed) | ❌ (BS: `no_slow_down_for_cooling_on_outwalls`) |
| `slow_down_min_speed` | ✅ | ✅ |
| `enable_overhang_bridge_fan` | ✅ | ✅ |
| `overhang_fan_threshold` | ✅ | ✅ |
| `overhang_threshold_participating_cooling` | ❌ | ✅ BambuStudio-only |
| `overhang_fan_speed` | ✅ | ✅ |
| `internal_bridge_fan_speed` | ✅ OrcaSlicer-only | ❌ |
| `support_material_interface_fan_speed` | ✅ OrcaSlicer-only | ❌ |
| `ironing_fan_speed` | ✅ OrcaSlicer-only | ❌ |
| `pre_start_fan_time` | ❌ | ✅ BambuStudio-only |

#### 2.3 Auxiliary Part Cooling Fan

| Key | OrcaSlicer | BambuStudio |
|---|---|---|
| Group icon | `param_cooling_aux_fan` | `param_cooling_fan` |
| `additional_cooling_fan_speed` | ✅ | ✅ |

#### 2.4 Exhaust Fan

Both have the same three options: `activate_air_filtration`, `during_print_exhaust_fan_speed`, `complete_print_exhaust_fan_speed`

---

### Page 3: Setting Overrides

#### 3.1 Retraction Overrides

| Key | OrcaSlicer | BambuStudio |
|---|---|---|
| `filament_retraction_length` | ✅ | ✅ |
| `filament_z_hop` | ✅ | ✅ |
| `filament_z_hop_types` | ✅ | ✅ |
| `filament_retract_lift_above` | ✅ OrcaSlicer-only | ❌ |
| `filament_retract_lift_below` | ✅ OrcaSlicer-only | ❌ |
| `filament_retract_lift_enforce` | ✅ OrcaSlicer-only | ❌ |
| `filament_retraction_speed` | ✅ | ✅ |
| `filament_deretraction_speed` | ✅ | ✅ |
| `filament_retract_length_nc` | ❌ | ✅ BambuStudio-only |
| `filament_retract_restart_extra` | ✅ | ✅ |
| `filament_retraction_minimum_travel` | ✅ | ✅ |
| `filament_retract_when_changing_layer` | ✅ | ✅ |
| `filament_wipe` | ✅ | ✅ |
| `filament_wipe_distance` | ✅ | ✅ |
| `filament_retract_before_wipe` | ✅ | ✅ |
| `filament_long_retractions_when_cut` | ✅ | ✅ |
| `filament_retraction_distances_when_cut` | ✅ | ✅ |

#### 3.2 Ironing Overrides (OrcaSlicer-only)

OrcaSlicer adds a **second override group** for ironing parameters that BambuStudio does not have:
- `filament_ironing_flow`
- `filament_ironing_spacing`
- `filament_ironing_inset`
- `filament_ironing_speed`

#### 3.3 Speed Overrides (BambuStudio-only)

BambuStudio has a "Speed" override group that OrcaSlicer does not have on this page:
- `override_process_overhang_speed`
- `filament_enable_overhang_speed`
- `filament_overhang_1_4_speed` through `filament_overhang_4_4_speed`
- `filament_overhang_totally_speed`
- `filament_bridge_speed`

---

### Page 4: Advanced (G-code)

Both have the same structure:
- **Filament start G-code** (`filament_start_gcode`)
- **Filament end G-code** (`filament_end_gcode`)

---

### Page 5/6: Multimaterial (OrcaSlicer) vs Notes/Multi Filament (BambuStudio)

#### OrcaSlicer "Multimaterial" Page

| Group | Keys |
|---|---|
| **Wipe tower parameters** | `filament_minimal_purge_on_wipe_tower`, `filament_tower_interface_pre_extrusion_dist`, `filament_tower_interface_pre_extrusion_length`, `filament_tower_ironing_area`, `filament_tower_interface_purge_volume`, `filament_tower_interface_print_temp` |
| **Multi Filament** | `long_retractions_when_ec`, `retraction_distances_when_ec` |
| **Tool change (single extruder MM)** | `filament_loading_speed_start`, `filament_loading_speed`, `filament_unloading_speed_start`, `filament_unloading_speed`, `filament_toolchange_delay`, `filament_cooling_moves`, `filament_cooling_initial_speed`, `filament_cooling_final_speed`, `filament_stamping_loading_speed`, `filament_stamping_distance`, `filament_ramming_parameters` |
| **Tool change (multi extruder MM)** | `filament_multitool_ramming`, `filament_multitool_ramming_volume`, `filament_multitool_ramming_flow` |

#### BambuStudio "Multi Filament" Page

| Group | Keys |
|---|---|
| **Multi Filament** | `long_retractions_when_ec`, `retraction_distances_when_ec` |

> **Key difference**: OrcaSlicer has a much more comprehensive Multimaterial page with wipe tower parameters, single extruder MM tool change parameters, and multi-extruder MM parameters. BambuStudio only has the basic `long_retractions_when_ec` / `retraction_distances_when_ec`.

### OrcaSlicer-Only: Dependencies Page

OrcaSlicer has a **Dependencies** page with:
- Compatible printers (`compatible_printers`, `compatible_printers_condition`)
- Compatible process profiles (`compatible_prints`, `compatible_prints_condition`)

BambuStudio handles compatibility differently and does not expose this as a filament tab page.

### Page Order Summary

| OrcaSlicer | BambuStudio |
|---|---|
| 1. Filament | 1. Filament |
| 2. Cooling | 2. Cooling |
| 3. Setting Overrides | 3. Setting Overrides |
| 4. Advanced | 4. Advanced |
| 5. Multimaterial | 5. Notes |
| 6. Dependencies | 6. Multi Filament |
| 7. Notes | — |

---

## 3. Filament Configuration Keys (PrintConfig.cpp)

Based on the Tab.cpp analysis, here is a comprehensive list of all filament config keys used in each system:

### OrcaSlicer-Unique Filament Config Keys

| Key | Description |
|---|---|
| `filament_shrinkage_compensation_z` | Z-axis shrinkage compensation |
| `idle_temperature` | Temperature when idle |
| `pellet_flow_coefficient` | Pellet printer flow coefficient |
| `adaptive_pressure_advance` | Enable adaptive PA |
| `adaptive_pressure_advance_overhangs` | Adaptive PA for overhangs |
| `adaptive_pressure_advance_bridges` | PA for bridges |
| `adaptive_pressure_advance_model` | Adaptive PA model (code field) |
| `activate_chamber_temp_control` | Chamber temp control toggle |
| `textured_cool_plate_temp` / `_initial_layer` | Textured Cool Plate temps |
| `full_fan_speed_layer` | Full fan speed at layer |
| `dont_slow_down_outer_wall` | Don't slow down for outer walls |
| `internal_bridge_fan_speed` | Separate internal bridge fan speed |
| `support_material_interface_fan_speed` | Support interface fan speed |
| `ironing_fan_speed` | Ironing fan speed |
| `filament_retract_lift_above` | Z-hop only above height |
| `filament_retract_lift_below` | Z-hop only below height |
| `filament_retract_lift_enforce` | Z-hop enforcement setting |
| `filament_ironing_flow` | Ironing flow override |
| `filament_ironing_spacing` | Ironing spacing override |
| `filament_ironing_inset` | Ironing inset override |
| `filament_ironing_speed` | Ironing speed override |
| `filament_minimal_purge_on_wipe_tower` | Min purge on wipe tower |
| `filament_loading_speed_start` | Loading speed at start |
| `filament_loading_speed` | Loading speed |
| `filament_unloading_speed_start` | Unloading speed at start |
| `filament_unloading_speed` | Unloading speed |
| `filament_toolchange_delay` | Delay after unloading |
| `filament_cooling_moves` | Number of cooling moves |
| `filament_cooling_initial_speed` | First cooling move speed |
| `filament_cooling_final_speed` | Last cooling move speed |
| `filament_stamping_loading_speed` | Stamping loading speed |
| `filament_stamping_distance` | Stamping distance |
| `filament_ramming_parameters` | Ramming parameters (dialog) |
| `filament_multitool_ramming` | Multi-tool ramming enable |
| `filament_multitool_ramming_volume` | Multi-tool ramming volume |
| `filament_multitool_ramming_flow` | Multi-tool ramming flow |
| `compatible_printers` | Compatible printers list |
| `compatible_printers_condition` | Compatible printers condition |
| `compatible_prints` | Compatible print profiles |
| `compatible_prints_condition` | Compatible prints condition |

### BambuStudio-Unique Filament Config Keys

| Key | Description |
|---|---|
| `impact_strength_z` | Impact strength Z |
| `filament_velocity_adaptation_factor` | Velocity adaptation factor |
| `filament_cooling_before_tower` | Cooling before tower |
| `filament_prime_volume` / `_nc` | Prime volume (normal/nozzle-change) |
| `filament_change_length` / `_nc` | Change length (in basic info) |
| `filament_ramming_travel_time` / `_nc` | Ramming travel time |
| `filament_pre_cooling_temperature` / `_nc` | Pre-cooling temperature |
| `filament_scarf_seam_type` | Scarf seam type |
| `filament_scarf_height` | Scarf seam height |
| `filament_scarf_gap` | Scarf seam gap |
| `filament_scarf_length` | Scarf seam length |
| `first_x_layer_fan_speed` | First X layer fan speed |
| `overhang_threshold_participating_cooling` | Overhang threshold for cooling |
| `pre_start_fan_time` | Fan pre-start time |
| `filament_retract_length_nc` | Retract length (nozzle change) |
| `override_process_overhang_speed` | Override process overhang speed |
| `filament_enable_overhang_speed` | Enable filament-level overhang speed |
| `filament_overhang_1_4_speed` → `4_4` | Filament overhang speeds |
| `filament_overhang_totally_speed` | Total overhang speed |
| `filament_bridge_speed` | Bridge speed override |
| `filament_ramming_volumetric_speed` / `_nc` | Ramming volumetric speed |

---

## 4. i18n / Translation Files

### OrcaSlicer i18n

- **Location**: `localization/i18n/`
- **Format**: Standard gettext `.po`/`.mo` files with `OrcaSlicer.pot` template
- **Languages** (22 locales):
  `ca`, `cs`, `de`, `en`, `es`, `fr`, `hu`, `it`, `ja`, `ko`, `lt`, `nl`, `pl`, `pt_BR`, `ru`, `sv`, `tr`, `uk`, `vi`, `zh_CN`, `zh_TW`
- **Management**: Community-contributed, active development
- **Note**: `resources/i18n/` only contains a `placeholder.txt`; actual translations are in `localization/i18n/`

### BambuStudio i18n

- **Location**: `resources/i18n/`
- **Format**: Standard gettext `.po`/`.mo` files
- **Languages** (17 locales):
  `cs`, `de`, `en`, `es`, `fr`, `hu`, `it`, `ja`, `ko`, `nl`, `pl`, `pt_BR`, `ru`, `sv`, `tr`, `uk`, `zh_CN`
- **Management**: CI-automated translation updates (commit messages: "ci: update translate file YYYY_MM_DD")

### Comparison

| Aspect | OrcaSlicer | BambuStudio |
|---|---|---|
| **Location** | `localization/i18n/` | `resources/i18n/` |
| **Language count** | 22 | 17 |
| **Template file** | `OrcaSlicer.pot` | (not visible at root) |
| **OrcaSlicer-only locales** | `ca` (Catalan), `lt` (Lithuanian), `vi` (Vietnamese), `zh_TW` (Traditional Chinese) | — |
| **BambuStudio-only locales** | — | None (subset of OrcaSlicer) |
| **Update method** | Community PRs | CI-automated |

---

## 5. BambuStudio Wiki

**Yes, BambuStudio has a GitHub Wiki**: https://github.com/bambulab/BambuStudio/wiki

### Wiki Contents:

| Page | Description |
|---|---|
| **Home** | Main landing page |
| **Windows Compile Guide** | How to compile on Windows |
| **Mac Compile Guide** | How to compile on macOS |
| **Linux Compile Guide** | How to compile on Linux |
| **Docker Run Guide** | Running with Docker |
| **QA** | Q&A section |
| **Command Line Usage** | CLI documentation |
| **BambuLab-Official-Wiki** | Link to official Bambu Lab wiki |
| **How to contribute language** | Translation contribution guide (links to https://wiki.bambulab.com/en/bambu-studio/contribute-languages) |

### OrcaSlicer Wiki

OrcaSlicer does **not** appear to have a GitHub Wiki enabled. Documentation is primarily through:
- GitHub Discussions
- In-repo documentation
- Community wiki at https://wiki.orcaslicer.org (external)

---

## 6. License Comparison

| Aspect | OrcaSlicer | BambuStudio |
|---|---|---|
| **License** | GNU AGPL v3.0 | GNU AGPL v3.0 |
| **File** | `LICENSE.txt` | `LICENSE` |
| **Text** | Identical standard AGPL v3.0 | Identical standard AGPL v3.0 |
| **Key permissions** | Commercial use, modification, distribution, patent use, private use | Same |
| **Key conditions** | License notice, state changes, disclose source, network use = distribution, same license | Same |
| **Key limitations** | Liability, warranty | Same |

**Both projects use the exact same license** — GNU Affero General Public License v3.0. This is inherited from their shared ancestry (PrusaSlicer → BambuStudio → OrcaSlicer).

---

## Summary of Key Differences

### OrcaSlicer Advantages (vs BambuStudio)
1. **More granular icons** — custom `param_*` SVGs for almost every option group
2. **Custom page tab icons** — `custom-gcode_*.svg` series
3. **Adaptive Pressure Advance** — Complete subsystem with model, overhangs, bridges
4. **Ironing overrides** — Filament-level ironing settings (flow, spacing, inset, speed)
5. **Z-hop overrides** — `filament_retract_lift_above/below/enforce`
6. **More temperatures** — `textured_cool_plate_temp`, `idle_temperature`, `activate_chamber_temp_control`
7. **More cooling controls** — Internal bridge fan, support interface fan, ironing fan speed
8. **Dependencies page** — Compatible printers/prints conditions exposed in filament tab
9. **Full Multimaterial support** — Wipe tower, single-extruder MM, multi-extruder MM parameters
10. **More i18n languages** — 22 vs 17 locales (adds Catalan, Lithuanian, Vietnamese, Traditional Chinese)
11. **Pellet printer support** — `pellet_flow_coefficient`
12. **Z-axis shrinkage** — `filament_shrinkage_compensation_z`

### BambuStudio Advantages (vs OrcaSlicer)
1. **Filament-level scarf seam** — `filament_scarf_seam_type/height/gap/length`
2. **Filament-level overhang speed** — Complete overhang speed override system
3. **Nozzle change parameters** — `_nc` variants for retract/prime/ramming
4. **Impact strength** — `impact_strength_z` for filament characterization
5. **Velocity adaptation** — `filament_velocity_adaptation_factor`
6. **Fan pre-start** — `pre_start_fan_time`
7. **Official Wiki** — GitHub Wiki with compile guides, CLI docs
8. **CI-automated translations** — Automated i18n update pipeline
9. **Overhang cooling threshold** — `overhang_threshold_participating_cooling`
10. **Tower cooling** — `filament_cooling_before_tower`

### Architecture Differences
- **OrcaSlicer** separates Flow/PA into its own group; BambuStudio keeps it in Basic info
- **OrcaSlicer** separates Bed temp and Nozzle temp into distinct groups; BambuStudio combines into "Print temperature"
- **OrcaSlicer** separates Chamber temp into its own group; BambuStudio embeds it
- **OrcaSlicer** has 7 pages; BambuStudio has 6 pages
- **OrcaSlicer** has a Dependencies page; BambuStudio does not
- Both use `add_options_page()` → `new_optgroup()` → `append_single_option_line()` pattern
- Both have the `filament_options_with_variant` system for per-extruder options
