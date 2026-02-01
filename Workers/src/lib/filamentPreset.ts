export type PresetRow = {
  key: string;
  label: string;
  value: string;
};

type JsonValue = null | boolean | number | string | JsonValue[] | { [k: string]: JsonValue };

function asStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => (typeof x === "string" ? x : String(x))).filter((x) => x.length > 0);
  if (typeof v === "string") return v.length > 0 ? [v] : [];
  if (typeof v === "number" || typeof v === "boolean") return [String(v)];
  return [];
}

function firstString(v: unknown): string {
  const arr = asStringArray(v);
  return arr[0] ?? "";
}

function formatValue(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (Array.isArray(v)) return asStringArray(v).join("\n");
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

const labelByKey: Record<string, string> = {
  name: "名称",
  filament_settings_id: "耗材丝设置 ID",
  filament_vendor: "供应商",
  filament_type: "耗材类型",
  filament_id: "耗材 ID",
  compatible_printers: "兼容打印机",
  filament_soluble: "可溶性材料",
  filament_is_support: "支撑材料",
  impact_strength_z: "Z向冲击强度",
  required_nozzle_HRC: "喷嘴硬度要求",
  default_filament_colour: "默认颜色",
  filament_diameter: "直径",
  filament_adhesiveness_category: "粘接性类别",
  filament_density: "密度",
  filament_shrink: "收缩",
  filament_velocity_adaptation_factor: "速度适应系数",
  filament_cost: "价格",
  filament_notes: "备注",
  filament_flow_ratio: "流量比例",
  filament_max_volumetric_speed: "最大体积流量",
  filament_adaptive_volumetric_speed: "自适应体积流量",
  filament_printable: "可打印性",
  filament_scarf_gap: "斜拼接缝隙",
  filament_scarf_height: "斜拼接高度",
  filament_scarf_length: "斜拼接长度",
  filament_scarf_seam_type: "斜拼接方式",
  nozzle_temperature: "喷嘴温度",
  nozzle_temperature_initial_layer: "喷嘴",
  nozzle_temperature_range_low: "建议喷嘴温度",
  nozzle_temperature_range_high: "建议喷嘴温度 (最大)",
  textured_plate_temp: "纹理板温度",
  textured_plate_temp_initial_layer: "纹理PEI打印板",
  hot_plate_temp: "热板温度",
  hot_plate_temp_initial_layer: "光面PEI打印板 / 高温打印板",
  cool_plate_temp: "冷板温度",
  cool_plate_temp_initial_layer: "低温打印板",
  eng_plate_temp: "工程板温度",
  eng_plate_temp_initial_layer: "工程材料打印板",
  supertack_plate_temp: "SuperTack 板温度",
  supertack_plate_temp_initial_layer: "增粘低温打印板",
  chamber_temperatures: "腔体温度",
  temperature_vitrification: "软化温度",
  filament_cooling_before_tower: "擦拭塔冷却",
  filament_tower_interface_pre_extrusion_dist: "接触层预挤出距离",
  filament_tower_interface_pre_extrusion_length: "接触层预挤出长度",
  filament_tower_ironing_area: "擦拭塔熨烫面积",
  filament_tower_interface_purge_volume: "擦拭塔冲刷长度",
  fan_min_speed: "最小风扇速度",
  fan_max_speed: "最大风扇速度",
  additional_cooling_fan_speed: "附加冷却风扇速度",
  overhang_fan_speed: "悬垂风扇速度",
  enable_overhang_bridge_fan: "启用悬垂/桥接风扇",
  close_fan_the_first_x_layers: "前几层关闭风扇",
  slow_down_for_layer_cooling: "启用冷却减速",
  slow_down_layer_time: "冷却层时间",
  slow_down_min_speed: "冷却最小速度",
  during_print_exhaust_fan_speed: "打印中排风扇速度",
  complete_print_exhaust_fan_speed: "打印完成排风扇速度",
  activate_air_filtration: "启用空气过滤",
  filament_extruder_variant: "挤出机规格",
  filament_retraction_length: "回抽长度",
  filament_retraction_length_nc: "回抽长度 (无切换)",
  filament_retraction_speed: "回抽速度",
  filament_deretraction_speed: "抽回恢复速度",
  filament_retract_before_wipe: "擦拭前回抽",
  filament_retract_restart_extra: "回抽恢复补偿",
  filament_retract_when_changing_layer: "换层回抽",
  filament_retraction_distances_when_cut: "切断回抽距离",
  filament_retraction_minimum_travel: "回抽最小移动距离",
  filament_long_retractions_when_cut: "切断时长回抽",
  filament_change_length: "材料预冲刷长度",
  filament_change_length_nc: "材料预冲刷长度 (无切换)",
  filament_prime_volume: "材料清理量",
  filament_prime_volume_nc: "材料清理量 (无切换)",
  filament_minimal_purge_on_wipe_tower: "擦拭塔最小冲刷量",
  filament_ramming_volumetric_speed: "预冲刷体积速度",
  filament_ramming_volumetric_speed_nc: "预冲刷体积速度 (无切换)",
  filament_ramming_travel_time: "预冲刷后的空驶时间",
  filament_ramming_travel_time_nc: "预冲刷后的空驶时间 (无切换)",
  filament_flush_volumetric_speed: "冲刷体积速度",
  filament_flush_temp: "冲刷温度",
  filament_flush_temp_initial_layer: "冲刷温度",
  filament_flush_temp_initial_layer_nc: "首层冲刷温度 (无切换)",
  filament_pre_cooling_temperature: "预降温目标温度",
  filament_pre_cooling_temperature_nc: "预降温目标温度 (无切换)",
  filament_start_gcode: "耗材丝起始 G-code",
  filament_end_gcode: "耗材丝结束 G-code",
  from: "来源",
  inherits: "继承",
  version: "版本",
  full_fan_speed_layer: "全速风扇层",
  pre_start_fan_time: "风扇预启动时间",
  pressure_advance: "压力提前",
  reduce_fan_stop_start_freq: "降低风扇启停频率",
  cooling_slowdown_logic: "冷却减速逻辑",
  cooling_perimeter_transition_distance: "冷却减速过渡距离",
  circle_compensation_speed: "圆弧补偿速度",
  counter_coef_1: "内补偿系数 1",
  counter_coef_2: "内补偿系数 2",
  counter_coef_3: "内补偿系数 3",
  counter_limit_max: "内补偿上限",
  counter_limit_min: "内补偿下限",
  overhang_fan_threshold: "悬垂风扇阈值",
  overhang_threshold_participating_cooling: "参与冷却的悬垂阈值",
  hole_coef_1: "孔补偿系数 1",
  hole_coef_2: "孔补偿系数 2",
  hole_coef_3: "孔补偿系数 3",
  hole_limit_max: "孔补偿上限",
  hole_limit_min: "孔补偿下限",
  filament_wipe: "擦拭",
  filament_wipe_distance: "擦拭距离",
  filament_z_hop: "Z 抬升",
  filament_z_hop_types: "Z 抬升方式",
  filament_bridge_speed: "桥接速度",
  filament_overhang_totally_speed: "悬垂速度",
  filament_overhang_1_4_speed: "悬垂速度 (1/4)",
  filament_overhang_2_4_speed: "悬垂速度 (2/4)",
  filament_overhang_3_4_speed: "悬垂速度 (3/4)",
  filament_overhang_4_4_speed: "悬垂速度 (4/4)",
  filament_enable_overhang_speed: "启用悬垂速度",
  filament_tower_interface_print_temp: "接触层打印温度",
  diameter_limit: "直径偏差限制",
  during_print_exhaust_fan_speed_num: "打印中排风扇速度数值",
  complete_print_exhaust_fan_speed_num: "打印完成排风扇速度数值"
};

function labelForKey(key: string): string {
  return labelByKey[key] ?? key;
}

export type TabId = "filament" | "cooling" | "overrides" | "advanced" | "notes" | "multi";
export type FieldKind = "text" | "number" | "bool" | "multiline" | "select";

export type PresetField = PresetRow & {
  tab: TabId;
  section: string;
  kind: FieldKind;
  unit?: string;
  order: number;
  pair?: {
    leftLabel: string;
    rightLabel: string;
    rightValue: string;
  };
};

export type PresetTab = {
  id: TabId;
  label: string;
  sections: Array<{ id: string; label: string; fields: PresetField[] }>;
};

function normalizeNil(s: string): string {
  if (s === "nil") return "";
  return s;
}

function parseBool(v: unknown): boolean | null {
  const s = firstString(v).trim().toLowerCase();
  if (!s) return null;
  if (s === "1" || s === "true" || s === "yes") return true;
  if (s === "0" || s === "false" || s === "no") return false;
  return null;
}

function parseNumber(v: unknown): number | null {
  const s = normalizeNil(firstString(v)).trim();
  if (!s) return null;
  const n = Number(s.replace(/%$/g, ""));
  if (Number.isFinite(n)) return n;
  return null;
}

function kindForKey(key: string, v: unknown): FieldKind {
  if (key === "filament_type") return "select";
  if (key === "filament_scarf_seam_type") return "select";
  if (key === "filament_adaptive_volumetric_speed") return "bool";
  if (key.includes("gcode")) return "multiline";
  if (key.includes("notes")) return "multiline";
  const b = parseBool(v);
  if (b !== null) return "bool";
  const n = parseNumber(v);
  if (n !== null) return "number";
  return "text";
}

function unitForKey(key: string): string | undefined {
  if (key.endsWith("_temp") || key.includes("temperature") || key.includes("_temp_")) return "°C";
  if (key.includes("fan_speed")) return "%";
  if (key.includes("exhaust_fan_speed")) return "%";
  if (key === "filament_diameter") return "mm";
  if (key === "filament_density") return "g/cm³";
  if (key === "filament_cost") return "money/kg";
  if (key.includes("retraction_length")) return "mm";
  if (key.includes("retraction_speed")) return "mm/s";
  if (key.includes("max_volumetric_speed")) return "mm³/s";
  if (key.includes("ramming_volumetric_speed")) return "mm³/s";
  if (key.includes("ramming_travel_time")) return "秒";
  if (key.includes("prime_volume")) return "mm³";
  if (key === "filament_tower_interface_purge_volume") return "mm";
  if (key.includes("purge")) return "mm³";
  if (key.includes("flush")) return "°C";
  if (key.includes("shrink")) return "%";
  if (key.includes("filament_tower_ironing_area")) return "mm²";
  if (key.includes("filament_tower_interface_pre_extrusion_dist")) return "mm";
  if (key.includes("filament_tower_interface_pre_extrusion_length")) return "mm";
  if (key.includes("filament_change_length")) return "mm";
  if (key.includes("filament_scarf_height")) return "mm/%";
  if (key.includes("filament_scarf_gap")) return "mm/%";
  if (key.includes("filament_scarf_length")) return "mm";
  return undefined;
}

function sectionForKnownKey(key: string): { tab: TabId; section: string; order: number } | null {
  const filamentBasic = "基础信息";
  const filamentTemp = "打印温度";
  const filamentSpeed = "体积速度限制";
  const filamentMaterial = "材料属性";
  const filamentScarf = "材料斜拼接参数";
  const coolingLayer = "特定层冷却";
  const coolingPart = "零件冷却风扇";
  const coolingAux = "辅助部件冷却风扇";
  const overridesRetract = "回抽";
  const overridesSpeed = "速度";
  const advancedStart = "耗材丝起始 G-code";
  const advancedEnd = "耗材丝结束 G-code";
  const multiPurge = "冲刷/置换";
  const multiRetract = "回抽/换料";

  const map: Record<string, { tab: TabId; section: string; order: number }> = {
    name: { tab: "filament", section: filamentBasic, order: 1 },
    filament_settings_id: { tab: "filament", section: filamentBasic, order: 2 },
    filament_id: { tab: "filament", section: filamentBasic, order: 3 },
    compatible_printers: { tab: "filament", section: filamentBasic, order: 4 },
    filament_type: { tab: "filament", section: filamentBasic, order: 10 },
    filament_vendor: { tab: "filament", section: filamentBasic, order: 20 },
    filament_soluble: { tab: "filament", section: filamentBasic, order: 30 },
    filament_is_support: { tab: "filament", section: filamentBasic, order: 40 },
    impact_strength_z: { tab: "filament", section: filamentBasic, order: 50 },
    required_nozzle_HRC: { tab: "filament", section: filamentBasic, order: 60 },
    default_filament_colour: { tab: "filament", section: filamentBasic, order: 70 },
    filament_diameter: { tab: "filament", section: filamentBasic, order: 80 },
    filament_adhesiveness_category: { tab: "filament", section: filamentBasic, order: 90 },
    filament_flow_ratio: { tab: "filament", section: filamentBasic, order: 100 },
    filament_density: { tab: "filament", section: filamentBasic, order: 110 },
    filament_shrink: { tab: "filament", section: filamentBasic, order: 120 },
    filament_velocity_adaptation_factor: { tab: "filament", section: filamentBasic, order: 125 },
    filament_cost: { tab: "filament", section: filamentBasic, order: 130 },
    temperature_vitrification: { tab: "filament", section: filamentBasic, order: 140 },
    filament_cooling_before_tower: { tab: "filament", section: filamentBasic, order: 150 },
    filament_tower_interface_pre_extrusion_dist: { tab: "filament", section: filamentBasic, order: 160 },
    filament_tower_interface_pre_extrusion_length: { tab: "filament", section: filamentBasic, order: 170 },
    filament_tower_ironing_area: { tab: "filament", section: filamentBasic, order: 180 },
    filament_tower_interface_purge_volume: { tab: "filament", section: filamentBasic, order: 190 },
    filament_tower_interface_print_temp: { tab: "filament", section: filamentBasic, order: 200 },
    filament_prime_volume: { tab: "filament", section: filamentBasic, order: 210 },
    filament_change_length: { tab: "filament", section: filamentBasic, order: 220 },
    filament_ramming_travel_time: { tab: "filament", section: filamentBasic, order: 230 },
    filament_pre_cooling_temperature: { tab: "filament", section: filamentBasic, order: 240 },
    nozzle_temperature_range_low: { tab: "filament", section: filamentBasic, order: 250 },
    nozzle_temperature_range_high: { tab: "filament", section: filamentBasic, order: 251 },

    supertack_plate_temp_initial_layer: { tab: "filament", section: filamentTemp, order: 10 },
    supertack_plate_temp: { tab: "filament", section: filamentTemp, order: 20 },
    cool_plate_temp_initial_layer: { tab: "filament", section: filamentTemp, order: 30 },
    cool_plate_temp: { tab: "filament", section: filamentTemp, order: 40 },
    eng_plate_temp_initial_layer: { tab: "filament", section: filamentTemp, order: 50 },
    eng_plate_temp: { tab: "filament", section: filamentTemp, order: 60 },
    hot_plate_temp_initial_layer: { tab: "filament", section: filamentTemp, order: 70 },
    hot_plate_temp: { tab: "filament", section: filamentTemp, order: 80 },
    textured_plate_temp_initial_layer: { tab: "filament", section: filamentTemp, order: 90 },
    textured_plate_temp: { tab: "filament", section: filamentTemp, order: 100 },
    nozzle_temperature_initial_layer: { tab: "filament", section: filamentTemp, order: 110 },
    nozzle_temperature: { tab: "filament", section: filamentTemp, order: 120 },
    chamber_temperatures: { tab: "filament", section: filamentTemp, order: 130 },

    filament_adaptive_volumetric_speed: { tab: "filament", section: filamentSpeed, order: 10 },
    filament_max_volumetric_speed: { tab: "filament", section: filamentSpeed, order: 20 },
    filament_ramming_volumetric_speed: { tab: "filament", section: filamentSpeed, order: 30 },
    filament_printable: { tab: "filament", section: filamentSpeed, order: 30 },

    filament_scarf_gap: { tab: "filament", section: filamentScarf, order: 10 },
    filament_scarf_height: { tab: "filament", section: filamentScarf, order: 20 },
    filament_scarf_length: { tab: "filament", section: filamentScarf, order: 30 },
    filament_scarf_seam_type: { tab: "filament", section: filamentScarf, order: 40 },

    close_fan_the_first_x_layers: { tab: "cooling", section: coolingLayer, order: 10 },
    additional_cooling_fan_speed: { tab: "cooling", section: coolingLayer, order: 20 },
    cooling_slowdown_logic: { tab: "cooling", section: coolingLayer, order: 30 },
    cooling_perimeter_transition_distance: { tab: "cooling", section: coolingLayer, order: 40 },
    slow_down_for_layer_cooling: { tab: "cooling", section: coolingLayer, order: 50 },
    slow_down_layer_time: { tab: "cooling", section: coolingLayer, order: 60 },
    slow_down_min_speed: { tab: "cooling", section: coolingLayer, order: 70 },

    fan_min_speed: { tab: "cooling", section: coolingPart, order: 10 },
    fan_max_speed: { tab: "cooling", section: coolingPart, order: 20 },
    full_fan_speed_layer: { tab: "cooling", section: coolingPart, order: 30 },
    overhang_fan_threshold: { tab: "cooling", section: coolingPart, order: 40 },
    overhang_threshold_participating_cooling: { tab: "cooling", section: coolingPart, order: 50 },
    overhang_fan_speed: { tab: "cooling", section: coolingPart, order: 60 },
    enable_overhang_bridge_fan: { tab: "cooling", section: coolingPart, order: 70 },
    pre_start_fan_time: { tab: "cooling", section: coolingPart, order: 80 },

    during_print_exhaust_fan_speed: { tab: "cooling", section: coolingAux, order: 10 },
    complete_print_exhaust_fan_speed: { tab: "cooling", section: coolingAux, order: 20 },
    activate_air_filtration: { tab: "cooling", section: coolingAux, order: 30 },

    filament_retraction_length: { tab: "overrides", section: overridesRetract, order: 10 },
    filament_retraction_speed: { tab: "overrides", section: overridesRetract, order: 20 },
    filament_deretraction_speed: { tab: "overrides", section: overridesRetract, order: 30 },
    filament_retract_before_wipe: { tab: "overrides", section: overridesRetract, order: 40 },
    filament_retract_restart_extra: { tab: "overrides", section: overridesRetract, order: 50 },
    filament_retract_when_changing_layer: { tab: "overrides", section: overridesRetract, order: 60 },
    filament_retraction_minimum_travel: { tab: "overrides", section: overridesRetract, order: 70 },
    filament_z_hop: { tab: "overrides", section: overridesRetract, order: 80 },
    filament_z_hop_types: { tab: "overrides", section: overridesRetract, order: 90 },

    filament_overhang_totally_speed: { tab: "overrides", section: overridesSpeed, order: 10 },
    filament_overhang_1_4_speed: { tab: "overrides", section: overridesSpeed, order: 20 },
    filament_overhang_2_4_speed: { tab: "overrides", section: overridesSpeed, order: 30 },
    filament_overhang_3_4_speed: { tab: "overrides", section: overridesSpeed, order: 40 },
    filament_overhang_4_4_speed: { tab: "overrides", section: overridesSpeed, order: 50 },
    filament_bridge_speed: { tab: "overrides", section: overridesSpeed, order: 60 },
    circle_compensation_speed: { tab: "overrides", section: overridesSpeed, order: 70 },
    pressure_advance: { tab: "overrides", section: overridesSpeed, order: 80 },

    filament_start_gcode: { tab: "advanced", section: advancedStart, order: 10 },
    filament_end_gcode: { tab: "advanced", section: advancedEnd, order: 10 },

    filament_prime_volume: { tab: "multi", section: multiPurge, order: 10 },
    filament_minimal_purge_on_wipe_tower: { tab: "multi", section: multiPurge, order: 20 },
    filament_ramming_volumetric_speed: { tab: "multi", section: multiPurge, order: 30 },
    filament_ramming_travel_time: { tab: "multi", section: multiPurge, order: 40 },
    filament_notes: { tab: "notes", section: "注释", order: 10 }
  };

  return map[key] ?? null;
}

function inferPlacement(key: string): { tab: TabId; section: string; order: number } {
  if (key.includes("notes")) return { tab: "notes", section: "注释", order: 1000 };
  if (key.includes("gcode")) return { tab: "advanced", section: "耗材丝 G-code", order: 1000 };
  if (key.includes("cool") || key.includes("fan")) return { tab: "cooling", section: "其他", order: 2000 };
  if (key.includes("purge") || key.includes("prime") || key.includes("ramming") || key.includes("wipe") || key.includes("tower")) return { tab: "multi", section: "其他", order: 2000 };
  if (key.includes("retract") || key.includes("deretraction") || key.includes("z_hop")) return { tab: "overrides", section: "回抽", order: 2000 };
  if (key.startsWith("filament_") || key.startsWith("nozzle_") || key.includes("plate_temp") || key.includes("temperature")) return { tab: "filament", section: "其他", order: 2000 };
  return { tab: "advanced", section: "其他", order: 5000 };
}

export type PresetSummary = {
  name: string;
  vendor: string;
  type: string;
  filamentId: string;
  printers: string[];
  diameter: string;
  density: string;
  cost: string;
  flowRatio: string;
  maxVolumetricSpeed: string;
  nozzleTemp: string;
  nozzleTempInitial: string;
  bedTemp: string;
  bedTempInitial: string;
};

function getBedTemp(json: Record<string, unknown>): { temp: string; initial: string } {
  const candidates: Array<{ tempKey: string; initialKey: string }> = [
    { tempKey: "textured_plate_temp", initialKey: "textured_plate_temp_initial_layer" },
    { tempKey: "hot_plate_temp", initialKey: "hot_plate_temp_initial_layer" },
    { tempKey: "cool_plate_temp", initialKey: "cool_plate_temp_initial_layer" },
    { tempKey: "eng_plate_temp", initialKey: "eng_plate_temp_initial_layer" },
    { tempKey: "supertack_plate_temp", initialKey: "supertack_plate_temp_initial_layer" }
  ];

  for (const c of candidates) {
    const t = firstString(json[c.tempKey]);
    const i = firstString(json[c.initialKey]);
    if ((t && t !== "0") || (i && i !== "0")) return { temp: t, initial: i };
  }

  return { temp: "", initial: "" };
}

export function buildPresetModel(json: Record<string, unknown>): {
  summary: PresetSummary;
  tabs: PresetTab[];
} {
  const printers = asStringArray(json["compatible_printers"]);
  const bed = getBedTemp(json);

  const summary: PresetSummary = {
    name: firstString(json["name"]) || firstString(json["filament_settings_id"]),
    vendor: firstString(json["filament_vendor"]),
    type: firstString(json["filament_type"]),
    filamentId: typeof json["filament_id"] === "string" ? json["filament_id"] : "",
    printers,
    diameter: firstString(json["filament_diameter"]),
    density: firstString(json["filament_density"]),
    cost: firstString(json["filament_cost"]),
    flowRatio: firstString(json["filament_flow_ratio"]),
    maxVolumetricSpeed: firstString(json["filament_max_volumetric_speed"]),
    nozzleTemp: firstString(json["nozzle_temperature"]),
    nozzleTempInitial: firstString(json["nozzle_temperature_initial_layer"]),
    bedTemp: bed.temp,
    bedTempInitial: bed.initial
  };

  const pairMap: Record<string, { rightKey: string; leftLabel: string; rightLabel: string }> = {
    nozzle_temperature_initial_layer: { rightKey: "nozzle_temperature", leftLabel: "首层", rightLabel: "其它层" },
    textured_plate_temp_initial_layer: { rightKey: "textured_plate_temp", leftLabel: "首层", rightLabel: "其它层" },
    hot_plate_temp_initial_layer: { rightKey: "hot_plate_temp", leftLabel: "首层", rightLabel: "其它层" },
    cool_plate_temp_initial_layer: { rightKey: "cool_plate_temp", leftLabel: "首层", rightLabel: "其它层" },
    eng_plate_temp_initial_layer: { rightKey: "eng_plate_temp", leftLabel: "首层", rightLabel: "其它层" },
    supertack_plate_temp_initial_layer: { rightKey: "supertack_plate_temp", leftLabel: "首层", rightLabel: "其它层" },
    filament_flush_temp_initial_layer: { rightKey: "filament_flush_temp", leftLabel: "首层", rightLabel: "其它层" },
    nozzle_temperature_range_low: { rightKey: "nozzle_temperature_range_high", leftLabel: "最小", rightLabel: "最大" },
    filament_prime_volume: { rightKey: "filament_prime_volume_nc", leftLabel: "耗材丝更换", rightLabel: "热端更换" },
    filament_change_length: { rightKey: "filament_change_length_nc", leftLabel: "挤出机更换", rightLabel: "热端更换" },
    filament_ramming_travel_time: { rightKey: "filament_ramming_travel_time_nc", leftLabel: "挤出机更换", rightLabel: "热端更换" },
    filament_pre_cooling_temperature: { rightKey: "filament_pre_cooling_temperature_nc", leftLabel: "挤出机更换", rightLabel: "热端更换" },
    filament_ramming_volumetric_speed: { rightKey: "filament_ramming_volumetric_speed_nc", leftLabel: "挤出机更换", rightLabel: "热端更换" }
  };

  const skip = new Set<string>();

  // Pre-populate skip set with right-side keys of pairs that exist in json
  // This prevents them from being added as standalone fields before their left-side pair is processed
  for (const leftKey in pairMap) {
    if (Object.prototype.hasOwnProperty.call(pairMap, leftKey)) {
      const p = pairMap[leftKey];
      if (leftKey in json && p.rightKey in json) {
        skip.add(p.rightKey);
      }
    }
  }

  const keys = Object.keys(json);
  const fields: PresetField[] = [];

  for (const key of keys) {
    if (skip.has(key)) continue;
    const known = sectionForKnownKey(key);
    const placement = known ?? inferPlacement(key);
    const v = json[key];
    const kind = kindForKey(key, v);
    const base: PresetField = {
      key,
      label: labelForKey(key),
      value: formatValue(v),
      tab: placement.tab,
      section: placement.section,
      kind,
      unit: unitForKey(key),
      order: placement.order
    };

    const pair = pairMap[key];
    if (pair && pair.rightKey in json) {
      const rightValue = formatValue(json[pair.rightKey]);
      base.pair = { rightKey: pair.rightKey, leftLabel: pair.leftLabel, rightLabel: pair.rightLabel, rightValue };
      skip.add(pair.rightKey);
    }

    fields.push(base);
  }

  const tabOrder: Array<{ id: TabId; label: string }> = [
    { id: "filament", label: "耗材丝" },
    { id: "cooling", label: "冷却模式" },
    { id: "overrides", label: "参数覆盖" },
    { id: "advanced", label: "高级" },
    { id: "notes", label: "注释" },
    { id: "multi", label: "多材料" }
  ];

  const tabs: PresetTab[] = [];
  for (const t of tabOrder) {
    const tabFields = fields.filter((f) => f.tab === t.id);
    if (tabFields.length === 0) continue;

    const sectionOrder: Record<TabId, string[]> = {
      filament: ["基础信息", "材料属性", "体积速度限制", "打印温度", "材料斜拼接参数", "其他"],
      cooling: ["特定层冷却", "零件冷却风扇", "辅助部件冷却风扇", "其他"],
      overrides: ["回抽", "速度", "其他"],
      advanced: ["耗材丝起始 G-code", "耗材丝结束 G-code", "其他"],
      notes: ["注释", "其他"],
      multi: ["冲刷/置换", "回抽/换料", "其他"]
    };

    const sectionMap = new Map<string, PresetField[]>();
    for (const f of tabFields) {
      const list = sectionMap.get(f.section) ?? [];
      list.push(f);
      sectionMap.set(f.section, list);
    }

    const sections = [...sectionMap.entries()]
      .map(([id, list]) => {
        const sorted = [...list].sort((a, b) => (a.order - b.order) || a.key.localeCompare(b.key, "en", { numeric: true }));
        return { id, label: id, fields: sorted };
      })
      .sort((a, b) => {
        const order = sectionOrder[t.id] ?? [];
        const ai = order.indexOf(a.id);
        const bi = order.indexOf(b.id);
        const ao = ai === -1 ? 9999 : ai;
        const bo = bi === -1 ? 9999 : bi;
        return ao - bo || a.label.localeCompare(b.label, "zh-Hans-CN", { numeric: true });
      });

    tabs.push({ id: t.id, label: t.label, sections });
  }

  return { summary, tabs };
}

export function jsonToRecord(v: unknown): Record<string, unknown> {
  if (v && typeof v === "object" && !Array.isArray(v)) return v as Record<string, unknown>;
  return {};
}
