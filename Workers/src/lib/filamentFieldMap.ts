/**
 * OrcaSlicer 耗材配置字段与 Tab/Page/Group 的映射
 * 将 JSON 配置字段组织成 OrcaSlicer 的实际 UI 结构
 */

import { Option, OptionGroup, TabPage } from './orcaSlicerStructure';

/**
 * 耗材 JSON 字段 → OrcaSlicer UI 结构的映射
 */
export const FILAMENT_FIELD_MAP: Record<string, {
  pageId: string;
  groupId: string;
  label: string;
  kind?: string;
  unit?: string;
}> = {
  // Filament Page - Basic Information Group
  filament_type: { pageId: 'filament-basic', groupId: 'information', label: '耗材类型' },
  filament_diameter: { pageId: 'filament-basic', groupId: 'information', label: '直径', unit: 'mm' },
  filament_density: { pageId: 'filament-basic', groupId: 'information', label: '密度', unit: 'g/cm³' },
  filament_cost: { pageId: 'filament-basic', groupId: 'information', label: '成本', unit: '¥/kg' },
  default_filament_colour: { pageId: 'filament-basic', groupId: 'information', label: '默认颜色' },

  // Filament Page - Flow Ratio and Pressure Advance Group
  filament_flow_ratio: { pageId: 'filament-basic', groupId: 'flow-ratio', label: '流量比例', unit: '%' },
  filament_max_volumetric_speed: { pageId: 'filament-basic', groupId: 'flow-ratio', label: '最大体积流量', unit: 'mm³/s' },

  // Filament Page - Chamber Temperature Group
  chamber_temperatures: { pageId: 'filament-basic', groupId: 'chamber-temp', label: '腔体温度', unit: '°C' },

  // Filament Page - Print Temperature Group
  nozzle_temperature: { pageId: 'filament-basic', groupId: 'extruder-temp', label: '喷嘴温度', unit: '°C' },
  nozzle_temperature_initial_layer: { pageId: 'filament-basic', groupId: 'extruder-temp', label: '初始层喷嘴温度', unit: '°C' },
  nozzle_temperature_range_low: { pageId: 'filament-basic', groupId: 'extruder-temp', label: '最低推荐温度', unit: '°C' },
  nozzle_temperature_range_high: { pageId: 'filament-basic', groupId: 'extruder-temp', label: '最高推荐温度', unit: '°C' },

  // Filament Page - Bed Temperature Group
  textured_plate_temp: { pageId: 'filament-basic', groupId: 'bed-temp', label: '纹理板温度 (印刷)', unit: '°C' },
  textured_plate_temp_initial_layer: { pageId: 'filament-basic', groupId: 'bed-temp', label: '纹理板温度 (初始层)', unit: '°C' },
  hot_plate_temp: { pageId: 'filament-basic', groupId: 'bed-temp', label: '光面板温度 (印刷)', unit: '°C' },
  hot_plate_temp_initial_layer: { pageId: 'filament-basic', groupId: 'bed-temp', label: '光面板温度 (初始层)', unit: '°C' },
  cool_plate_temp: { pageId: 'filament-basic', groupId: 'bed-temp', label: '冷板温度 (印刷)', unit: '°C' },
  cool_plate_temp_initial_layer: { pageId: 'filament-basic', groupId: 'bed-temp', label: '冷板温度 (初始层)', unit: '°C' },

  // Filament Page - Volumetric Speed Limitation Group
  filament_volumetric_speed: { pageId: 'filament-basic', groupId: 'volumetric-speed', label: '体积流量限制', unit: 'mm³/s' },
  filament_adaptive_volumetric_speed: { pageId: 'filament-basic', groupId: 'volumetric-speed', label: '自适应体积流量' },

  // Cooling Page - Cooling Fan Settings Group
  fan_min_speed: { pageId: 'filament-cooling', groupId: 'cooling-fan', label: '最小风扇速度', unit: '%' },
  fan_max_speed: { pageId: 'filament-cooling', groupId: 'cooling-fan', label: '最大风扇速度', unit: '%' },
  slow_down_for_layer_cooling: { pageId: 'filament-cooling', groupId: 'cooling-fan', label: '启用冷却减速', kind: 'bool' },
  slow_down_layer_time: { pageId: 'filament-cooling', groupId: 'cooling-fan', label: '冷却层时间', unit: 's' },

  // Cooling Page - Auxiliary Fan Group
  additional_cooling_fan_speed: { pageId: 'filament-cooling', groupId: 'cooling-aux-fan', label: '辅助冷却风扇速度', unit: '%' },

  // Cooling Page - Part Cooling Fan Group
  // (Already covered above, but can add specific part fan controls)

  // Cooling Page - Layer Cooling Group
  overhang_fan_speed: { pageId: 'filament-cooling', groupId: 'cooling-specific-layer', label: '悬垂/桥接风扇速度', unit: '%' },
  enable_overhang_bridge_fan: { pageId: 'filament-cooling', groupId: 'cooling-specific-layer', label: '启用悬垂/桥接风扇', kind: 'bool' },
  close_fan_the_first_x_layers: { pageId: 'filament-cooling', groupId: 'cooling-specific-layer', label: '前几层关闭风扇' },

  // Cooling Page - Exhaust Control Group
  during_print_exhaust_fan_speed: { pageId: 'filament-cooling', groupId: 'cooling-exhaust', label: '打印中排风扇速度', unit: '%' },
  complete_print_exhaust_fan_speed: { pageId: 'filament-cooling', groupId: 'cooling-exhaust', label: '打印完成排风扇速度', unit: '%' },
  activate_air_filtration: { pageId: 'filament-cooling', groupId: 'cooling-exhaust', label: '启用空气过滤', kind: 'bool' },

  // Setting Overrides Page - Retraction Group
  filament_retraction_length: { pageId: 'filament-overrides', groupId: 'retraction', label: '回抽长度', unit: 'mm' },
  filament_retraction_length_nc: { pageId: 'filament-overrides', groupId: 'retraction', label: '回抽长度 (无切换)', unit: 'mm' },
  filament_retraction_speed: { pageId: 'filament-overrides', groupId: 'retraction', label: '回抽速度', unit: 'mm/s' },
  filament_deretraction_speed: { pageId: 'filament-overrides', groupId: 'retraction', label: '反回抽速度', unit: 'mm/s' },
  filament_retract_before_wipe: { pageId: 'filament-overrides', groupId: 'retraction', label: '擦拭前回抽', unit: '%' },
  filament_retract_restart_extra: { pageId: 'filament-overrides', groupId: 'retraction', label: '回抽恢复补偿', unit: 'mm' },

  // Setting Overrides Page - Ironing Group
  filament_ironing: { pageId: 'filament-overrides', groupId: 'ironing', label: '启用光平', kind: 'bool' },
  filament_ironing_speed: { pageId: 'filament-overrides', groupId: 'ironing', label: '光平速度', unit: 'mm/s' },

  // Advanced Page - G-code Groups
  filament_start_manual_mode: { pageId: 'filament-advanced', groupId: 'gcode-start', label: '启用自定义启动 G-code', kind: 'bool' },
  filament_custom_manual_start_gcode: { pageId: 'filament-advanced', groupId: 'gcode-start', label: '耗材启动 G-code', kind: 'multiline' },
  filament_end_manual_mode: { pageId: 'filament-advanced', groupId: 'gcode-end', label: '启用自定义结束 G-code', kind: 'bool' },
  filament_custom_manual_end_gcode: { pageId: 'filament-advanced', groupId: 'gcode-end', label: '耗材结束 G-code', kind: 'multiline' },

  // Multimaterial Page - Wipe Tower Parameters Group
  filament_tower_interface_pre_extrusion_dist: { pageId: 'filament-multimaterial', groupId: 'tower-params', label: '接触层预挤出距离', unit: 'mm' },
  filament_tower_interface_pre_extrusion_length: { pageId: 'filament-multimaterial', groupId: 'tower-params', label: '接触层预挤出长度', unit: 'mm' },
  filament_tower_ironing_area: { pageId: 'filament-multimaterial', groupId: 'tower-params', label: '擦拭塔熨烫面积', unit: 'mm²' },
  filament_tower_interface_purge_volume: { pageId: 'filament-multimaterial', groupId: 'tower-params', label: '擦拭塔冲刷长度', unit: 'mm' },

  // Dependencies Page - Compatible Printers Group
  compatible_printers: { pageId: 'filament-dependencies', groupId: 'compatible-printers', label: '兼容打印机' },

  // Notes Page
  filament_notes: { pageId: 'filament-notes', groupId: 'notes', label: '备注', kind: 'multiline' },
};

/**
 * 获取特定页面的字段
 */
export function getPageFields(data: Record<string, any>, pageId: string): Record<string, Record<string, any[]>> {
  const result: Record<string, Record<string, any[]>> = {};

  for (const [key, value] of Object.entries(data)) {
    const mapping = FILAMENT_FIELD_MAP[key];
    if (mapping && mapping.pageId === pageId) {
      if (!result[mapping.groupId]) {
        result[mapping.groupId] = {};
      }
      if (!result[mapping.groupId][key]) {
        result[mapping.groupId][key] = [];
      }
      result[mapping.groupId][key].push({
        key,
        label: mapping.label,
        value,
        unit: mapping.unit,
        kind: mapping.kind,
      });
    }
  }

  return result;
}

/**
 * 获取字段的显示标签和其他元数据
 */
export function getFieldMetadata(fieldKey: string): { label: string; unit?: string; kind?: string } | null {
  const mapping = FILAMENT_FIELD_MAP[fieldKey];
  return mapping ? { label: mapping.label, unit: mapping.unit, kind: mapping.kind } : null;
}

/**
 * 按 OrcaSlicer 页面顺序获取所有页面 ID
 */
export const FILAMENT_PAGE_ORDER = [
  'filament-basic',
  'filament-cooling',
  'filament-overrides',
  'filament-advanced',
  'filament-multimaterial',
  'filament-dependencies',
  'filament-notes',
] as const;

/**
 * 按 OrcaSlicer Group 顺序获取特定页面的 Group 顺序
 */
export const GROUP_ORDER: Record<string, string[]> = {
  'filament-basic': ['information', 'flow-ratio', 'chamber-temp', 'extruder-temp', 'bed-temp', 'volumetric-speed'],
  'filament-cooling': ['cooling-fan', 'cooling-aux-fan', 'cooling-part-fan', 'cooling-specific-layer', 'cooling-exhaust'],
  'filament-overrides': ['retraction', 'ironing'],
  'filament-advanced': ['gcode-start', 'gcode-end'],
  'filament-multimaterial': ['tower-params', 'multi-filament', 'toolchange-single', 'toolchange-multi'],
  'filament-dependencies': ['compatible-printers', 'compatible-presets'],
  'filament-notes': ['notes'],
};

/**
 * Group 的显示名称和图标
 */
export const GROUP_METADATA: Record<string, { name: string; iconName?: string }> = {
  information: { name: '基本信息', iconName: 'information' },
  'flow-ratio': { name: '流量比和压力推进', iconName: 'flow-ratio' },
  'chamber-temp': { name: '打印室温度', iconName: 'chamber-temp' },
  'extruder-temp': { name: '喷嘴温度', iconName: 'extruder-temp' },
  'bed-temp': { name: '热床温度', iconName: 'bed-temp' },
  'volumetric-speed': { name: '体积速度限制', iconName: 'volumetric-speed' },
  'cooling-fan': { name: '冷却风扇设置', iconName: 'cooling-fan' },
  'cooling-aux-fan': { name: '辅助风扇', iconName: 'cooling-aux-fan' },
  'cooling-part-fan': { name: '零件冷却风扇', iconName: 'cooling-part-fan' },
  'cooling-specific-layer': { name: '层冷却', iconName: 'cooling-specific-layer' },
  'cooling-exhaust': { name: '排气控制', iconName: 'cooling-exhaust' },
  retraction: { name: '回抽', iconName: 'retraction' },
  ironing: { name: '光平', iconName: 'ironing' },
  'gcode-start': { name: '耗材启动 G-code', iconName: 'gcode' },
  'gcode-end': { name: '耗材结束 G-code', iconName: 'gcode' },
  'tower-params': { name: '擦拭塔参数', iconName: 'tower' },
  'multi-filament': { name: '多耗材', iconName: 'multimaterial' },
  'toolchange-single': { name: '单挤出头工具更换参数', iconName: 'toolchange' },
  'toolchange-multi': { name: '多挤出头工具更换参数', iconName: 'toolchange-multi-extruder' },
  'compatible-printers': { name: '兼容打印机', iconName: 'dependencies-printers' },
  'compatible-presets': { name: '兼容工艺配置文件', iconName: 'dependencies-presets' },
  notes: { name: '备注', iconName: 'note' },
};

/**
 * Page 的显示名称和图标
 */
export const PAGE_METADATA: Record<string, { name: string; iconName: string }> = {
  'filament-basic': { name: '耗材', iconName: 'filament' },
  'filament-cooling': { name: '冷却', iconName: 'cooling' },
  'filament-overrides': { name: '设置覆盖', iconName: 'setting-override' },
  'filament-advanced': { name: '高级', iconName: 'advanced' },
  'filament-multimaterial': { name: '多耗材', iconName: 'multimaterial' },
  'filament-dependencies': { name: '依赖关系', iconName: 'dependencies' },
  'filament-notes': { name: '注释', iconName: 'note' },
};
