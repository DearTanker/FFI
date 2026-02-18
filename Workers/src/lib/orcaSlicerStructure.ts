/**
 * OrcaSlicer UI Structure Interface Definitions
 * Based on src/slic3r/GUI/Tab.cpp structure verification
 */

import { IconName } from './icons';
import {
  getFilamentPageGroups,
  getCoolingPageGroups,
  getOverridesPageGroups,
} from './filamentOptions';

/**
 * Option Group - corresponds to OptionGroup in OrcaSlicer
 * Contains multiple related configuration options
 */
export interface OptionGroup {
  id: string;
  title: string;
  iconName?: IconName;
  description?: string;
  options: Option[];
}

/**
 * Configuration Option - corresponds to individual config_key in OrcaSlicer
 */
export interface Option {
  id: string;
  label: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'multi-select' | 'range';
  value?: any;
  defaultValue?: any;
  minValue?: number;
  maxValue?: number;
  step?: number;
  options?: Array<{ label: string; value: any }>;
  unit?: string;
  tooltip?: string;
  advanced?: boolean;
}

/**
 * Tab Page - corresponds to add_options_page in OrcaSlicer
 * Contains multiple option groups
 */
export interface TabPage {
  id: string;
  title: string;
  iconName: IconName;
  groups: OptionGroup[];
  description?: string;
}

/**
 * Tab - corresponds to class like TabFilament, TabPrint, etc in OrcaSlicer
 * Contains multiple pages
 */
export interface Tab {
  id: string;
  title: string;
  pages: TabPage[];
  description?: string;
}

/**
 * Preset - full configuration document (Filament/Print/Printer preset)
 */
export interface Preset {
  id: string;
  name: string;
  tabId: string;
  values: Record<string, any>;
  lastModified: Date;
  version: string;
}

/**
 * Tab Filament Structure - 7 Pages
 * Based on code-verified ordering from TabFilament::build()
 */
export const TAB_FILAMENT: Tab = {
  id: 'filament',
  title: 'Filament',
  pages: [
    {
      id: 'filament-basic',
      title: 'Filament',
      iconName: 'filament',
      groups: getFilamentPageGroups()
    },
    {
      id: 'filament-cooling',
      title: 'Cooling',
      iconName: 'cooling',
      groups: getCoolingPageGroups()
    },
    {
      id: 'filament-overrides',
      title: 'Setting Overrides',
      iconName: 'setting-override',
      groups: getOverridesPageGroups()
    },
    {
      id: 'filament-advanced',
      title: 'Advanced',
      iconName: 'advanced',
      groups: [
        {
          id: 'gcode-start',
          title: 'Filament start G-code',
          iconName: 'gcode',
          options: []
        },
        {
          id: 'gcode-end',
          title: 'Filament end G-code',
          iconName: 'gcode',
          options: []
        }
      ]
    },
    {
      id: 'filament-multimaterial',
      title: 'Multimaterial',
      iconName: 'multimaterial',
      groups: [
        {
          id: 'tower-params',
          title: 'Wipe tower parameters',
          iconName: 'tower',
          options: []
        },
        {
          id: 'multi-filament',
          title: 'Multi Filament',
          options: []
        },
        {
          id: 'toolchange-single',
          title: 'Tool change parameters with single extruder MM printers',
          iconName: 'toolchange',
          options: []
        },
        {
          id: 'toolchange-multi',
          title: 'Tool change parameters with multi extruder MM printers',
          iconName: 'toolchange-multi-extruder',
          options: []
        }
      ]
    },
    {
      id: 'filament-dependencies',
      title: 'Dependencies',
      iconName: 'dependencies',
      groups: [
        {
          id: 'compatible-printers',
          title: 'Compatible printers',
          iconName: 'dependencies-printers',
          options: []
        },
        {
          id: 'compatible-presets',
          title: 'Compatible process profiles',
          iconName: 'dependencies-presets',
          options: []
        }
      ]
    },
    {
      id: 'filament-notes',
      title: 'Notes',
      iconName: 'note',
      groups: [
        {
          id: 'notes',
          title: 'Notes',
          options: []
        }
      ]
    }
  ]
};

/**
 * Tab Print Structure - 6 Pages
 * Based on code-verified ordering from TabPrint::build()
 */
export const TAB_PRINT: Tab = {
  id: 'print',
  title: 'Print',
  pages: [
    {
      id: 'print-quality',
      title: 'Quality',
      iconName: 'quality',
      groups: []
    },
    {
      id: 'print-strength',
      title: 'Strength',
      iconName: 'strength',
      groups: []
    },
    {
      id: 'print-speed',
      title: 'Speed',
      iconName: 'speed',
      groups: []
    },
    {
      id: 'print-support',
      title: 'Support',
      iconName: 'support',
      groups: []
    },
    {
      id: 'print-multimaterial',
      title: 'Multimaterial',
      iconName: 'multimaterial',
      groups: []
    },
    {
      id: 'print-others',
      title: 'Others',
      iconName: 'other',
      groups: []
    }
  ]
};

/**
 * Tab Printer Structure - FFF & SLA variants
 * Based on src/slic3r/GUI/Tab.cpp TabPrinter::build_fff()
 */
export const TAB_PRINTER_FFF: Tab = {
  id: 'printer-fff',
  title: 'Printer (FFF)',
  pages: [
    {
      id: 'printer-basic-info',
      title: 'Basic information',
      iconName: 'object-info',
      groups: []
    },
    {
      id: 'printer-gcode',
      title: 'Machine G-code',
      iconName: 'gcode',
      groups: []
    },
    {
      id: 'printer-notes',
      title: 'Notes',
      iconName: 'note',
      groups: []
    },
    // Extruder pages would be dynamically added based on printer configuration
    // ...
    {
      id: 'printer-motion',
      title: 'Motion ability',
      iconName: 'motion',
      groups: []
    },
    {
      id: 'printer-multimaterial',
      title: 'Multimaterial',
      iconName: 'multimaterial',
      groups: []
    }
  ]
};
