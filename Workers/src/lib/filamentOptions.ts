/**
 * OrcaSlicer TabFilament Configuration Options
 * Extracted from src/slic3r/GUI/Tab.cpp - TabFilament class
 * Page: Filament
 */

import { OptionGroup, Option } from './orcaSlicerStructure';

/**
 * Filament Page: Basic Information Group
 */
export const FILAMENT_BASIC_INFO_GROUP: OptionGroup = {
  id: 'filament-basic-information',
  title: 'Basic information',
  iconName: 'information',
  options: [
    {
      id: 'filament_type',
      label: 'Filament type',
      type: 'select',
      options: [
        { label: 'PLA', value: 'PLA' },
        { label: 'ABS', value: 'ABS' },
        { label: 'PETG', value: 'PETG' },
        { label: 'TPU', value: 'TPU' },
        { label: 'PA', value: 'PA' },
        { label: 'PVA', value: 'PVA' },
      ],
      tooltip: 'The type of filament material'
    },
    {
      id: 'filament_diameter',
      label: 'Nozzle diameter',
      type: 'number',
      unit: 'mm',
      defaultValue: 0.4,
      minValue: 0.2,
      maxValue: 1.0,
      step: 0.1,
      tooltip: 'Nozzle hole diameter'
    },
    {
      id: 'filament_density',
      label: 'Filament density',
      type: 'number',
      unit: 'g/cm³',
      defaultValue: 1.25,
      minValue: 0.5,
      maxValue: 2.5,
      step: 0.01,
      tooltip: 'The filament material density'
    }
  ]
};

/**
 * Filament Page: Flow Ratio and Pressure Advance Group
 */
export const FILAMENT_FLOW_RATIO_GROUP: OptionGroup = {
  id: 'filament-flow-ratio',
  title: 'Flow ratio and Pressure Advance',
  iconName: 'flow-ratio',
  options: [
    {
      id: 'filament_flow_ratio',
      label: 'Flow ratio',
      type: 'number',
      unit: '%',
      defaultValue: 100,
      minValue: 50,
      maxValue: 150,
      step: 1,
      tooltip: 'Adjusts the filament flow rate'
    },
    {
      id: 'filament_pressure_advance',
      label: 'Pressure advance',
      type: 'number',
      unit: 'mm',
      defaultValue: 0,
      minValue: 0,
      maxValue: 1.0,
      step: 0.01,
      tooltip: 'Helps with pressure compensation',
      advanced: true
    }
  ]
};

/**
 * Filament Page: Temperature Groups
 */
export const FILAMENT_CHAMBER_TEMP_GROUP: OptionGroup = {
  id: 'filament-chamber-temp',
  title: 'Print chamber temperature',
  iconName: 'chamber-temp',
  options: [
    {
      id: 'filament_chamber_temp',
      label: 'Chamber temperature',
      type: 'number',
      unit: '°C',
      defaultValue: 35,
      minValue: 0,
      maxValue: 100,
      step: 1,
      tooltip: 'Target chamber temperature during printing'
    }
  ]
};

export const FILAMENT_EXTRUDER_TEMP_GROUP: OptionGroup = {
  id: 'filament-extruder-temp',
  title: 'Print temperature',
  iconName: 'extruder-temp',
  options: [
    {
      id: 'filament_min_extruder_temp',
      label: 'Min extruder temperature',
      type: 'number',
      unit: '°C',
      defaultValue: 200,
      minValue: 0,
      maxValue: 350,
      step: 1,
      tooltip: 'Minimum nozzle temperature'
    },
    {
      id: 'filament_max_extruder_temp',
      label: 'Max extruder temperature',
      type: 'number',
      unit: '°C',
      defaultValue: 250,
      minValue: 0,
      maxValue: 350,
      step: 1,
      tooltip: 'Maximum nozzle temperature'
    }
  ]
};

export const FILAMENT_BED_TEMP_GROUP: OptionGroup = {
  id: 'filament-bed-temp',
  title: 'Bed temperature',
  iconName: 'bed-temp',
  options: [
    {
      id: 'filament_bed_temp_initial',
      label: 'Initial bed temperature',
      type: 'number',
      unit: '°C',
      defaultValue: 60,
      minValue: 0,
      maxValue: 150,
      step: 1,
      tooltip: 'Bed temperature for first layer'
    },
    {
      id: 'filament_bed_temp_printing',
      label: 'Printing bed temperature',
      type: 'number',
      unit: '°C',
      defaultValue: 60,
      minValue: 0,
      maxValue: 150,
      step: 1,
      tooltip: 'Bed temperature for subsequent layers'
    }
  ]
};

export const FILAMENT_VOLUMETRIC_SPEED_GROUP: OptionGroup = {
  id: 'filament-volumetric-speed',
  title: 'Volumetric speed limitation',
  iconName: 'volumetric-speed',
  options: [
    {
      id: 'filament_volumetric_speed',
      label: 'Max volumetric speed',
      type: 'number',
      unit: 'mm³/s',
      defaultValue: 15,
      minValue: 0.5,
      maxValue: 50,
      step: 0.1,
      tooltip: 'Maximum filament volume per second',
      advanced: true
    }
  ]
};

/**
 * Cooling Page Groups
 */
export const FILAMENT_COOLING_FAN_GROUP: OptionGroup = {
  id: 'filament-cooling-fan',
  title: 'Cooling Fan Settings',
  iconName: 'cooling-fan',
  options: [
    {
      id: 'filament_cooling_fan_speed',
      label: 'Fan speed',
      type: 'range',
      unit: '%',
      defaultValue: 100,
      minValue: 0,
      maxValue: 100,
      step: 5,
      tooltip: 'Part cooling fan speed'
    }
  ]
};

export const FILAMENT_COOLING_AUX_FAN_GROUP: OptionGroup = {
  id: 'filament-cooling-aux-fan',
  title: 'Auxiliary Fan',
  iconName: 'cooling-aux-fan',
  options: [
    {
      id: 'filament_aux_fan_speed',
      label: 'Auxiliary fan speed',
      type: 'range',
      unit: '%',
      defaultValue: 0,
      minValue: 0,
      maxValue: 100,
      step: 5,
      tooltip: 'Auxiliary cooling fan speed',
      advanced: true
    }
  ]
};

/**
 * Setting Overrides Groups
 */
export const FILAMENT_RETRACTION_GROUP: OptionGroup = {
  id: 'filament-retraction',
  title: 'Retraction',
  iconName: 'retraction',
  options: [
    {
      id: 'filament_retraction_length',
      label: 'Retraction length',
      type: 'number',
      unit: 'mm',
      defaultValue: 3,
      minValue: 0,
      maxValue: 10,
      step: 0.1,
      tooltip: 'Filament length to retract'
    },
    {
      id: 'filament_retraction_speed',
      label: 'Retraction speed',
      type: 'number',
      unit: 'mm/s',
      defaultValue: 40,
      minValue: 5,
      maxValue: 200,
      step: 5,
      tooltip: 'Speed of retraction movement'
    },
    {
      id: 'filament_deretraction_speed',
      label: 'Deretraction speed',
      type: 'number',
      unit: 'mm/s',
      defaultValue: 0,
      minValue: 0,
      maxValue: 200,
      step: 5,
      tooltip: 'Speed of deretraction (0 = same as retraction)',
      advanced: true
    }
  ]
};

export const FILAMENT_IRONING_GROUP: OptionGroup = {
  id: 'filament-ironing',
  title: 'Ironing',
  iconName: 'ironing',
  options: [
    {
      id: 'filament_ironing_enabled',
      label: 'Enable ironing',
      type: 'boolean',
      defaultValue: false,
      tooltip: 'Use ironing on top surface'
    }
  ]
};

/**
 * Get all Filament page groups in correct order
 */
export function getFilamentPageGroups(): OptionGroup[] {
  return [
    FILAMENT_BASIC_INFO_GROUP,
    FILAMENT_FLOW_RATIO_GROUP,
    FILAMENT_CHAMBER_TEMP_GROUP,
    FILAMENT_EXTRUDER_TEMP_GROUP,
    FILAMENT_BED_TEMP_GROUP,
    FILAMENT_VOLUMETRIC_SPEED_GROUP
  ];
}

export function getCoolingPageGroups(): OptionGroup[] {
  return [
    FILAMENT_COOLING_FAN_GROUP,
    FILAMENT_COOLING_AUX_FAN_GROUP
  ];
}

export function getOverridesPageGroups(): OptionGroup[] {
  return [
    FILAMENT_RETRACTION_GROUP,
    FILAMENT_IRONING_GROUP
  ];
}
