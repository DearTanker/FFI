"use client";

import { useState } from "react";

interface ProfileDetailsViewProps {
  data: Record<string, unknown>;
}

export function ProfileDetailsView({ data }: ProfileDetailsViewProps) {
  const [showRawJson, setShowRawJson] = useState(false);

  // 提取关键信息
  const filamentSettingsId = data["filament_settings_id"];
  const compatiblePrinters = data["compatible_printers"] as unknown[];
  const filamentDiameter = data["filament_diameter"];
  const filamentDensity = data["filament_density"];
  const filamentCost = data["filament_cost"];

  // 温度相关
  const nozzleTemperature = data["nozzle_temperature"];
  const bedTemperature = data["bed_temperature"];
  const firstLayerTemperature = data["first_layer_nozzle_temperature"];

  // 打印速度相关
  const printSpeed = data["print_speed"];
  const firstLayerSpeed = data["first_layer_speed"];
  const externalPerimeterSpeed = data["external_perimeter_speed"];

  const formatValue = (val: unknown): string => {
    if (typeof val === "string") return val;
    if (typeof val === "number") return String(val);
    return "";
  };

  const hasBasicInfo = !!(
    filamentSettingsId ||
    filamentDiameter ||
    filamentDensity ||
    filamentCost
  );
  const hasTemperature = !!(
    nozzleTemperature ||
    bedTemperature ||
    firstLayerTemperature
  );
  const hasSpeed = !!(
    printSpeed ||
    firstLayerSpeed ||
    externalPerimeterSpeed
  );
  const hasCompatiblePrinters = !!(
    compatiblePrinters &&
    Array.isArray(compatiblePrinters) &&
    compatiblePrinters.length > 0
  );

  return (
    <div className="space-y-6">
      {/* 基本信息卡片 */}
      {hasBasicInfo ? (
        <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
          <h3 className="text-sm font-semibold text-zinc-200 mb-3">基本信息</h3>
          <div className="space-y-2 text-sm">
            {Boolean(filamentSettingsId) ? (
              <div className="flex justify-between">
                <span className="text-zinc-400">配置ID:</span>
                <span className="text-zinc-200">{formatValue(filamentSettingsId)}</span>
              </div>
            ) : null}
            {Boolean(filamentDiameter) ? (
              <div className="flex justify-between">
                <span className="text-zinc-400">丝径:</span>
                <span className="text-zinc-200">{formatValue(filamentDiameter)} mm</span>
              </div>
            ) : null}
            {Boolean(filamentDensity) ? (
              <div className="flex justify-between">
                <span className="text-zinc-400">密度:</span>
                <span className="text-zinc-200">{formatValue(filamentDensity)} g/cm³</span>
              </div>
            ) : null}
            {Boolean(filamentCost) ? (
              <div className="flex justify-between">
                <span className="text-zinc-400">成本:</span>
                <span className="text-zinc-200">{formatValue(filamentCost)}</span>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* 温度设置 */}
      {hasTemperature ? (
        <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
          <h3 className="text-sm font-semibold text-zinc-200 mb-3">温度设置</h3>
          <div className="space-y-2 text-sm">
            {Boolean(nozzleTemperature) ? (
              <div className="flex justify-between">
                <span className="text-zinc-400">喷嘴温度:</span>
                <span className="text-zinc-200">{formatValue(nozzleTemperature)}°C</span>
              </div>
            ) : null}
            {Boolean(firstLayerTemperature) ? (
              <div className="flex justify-between">
                <span className="text-zinc-400">首层喷嘴温度:</span>
                <span className="text-zinc-200">{formatValue(firstLayerTemperature)}°C</span>
              </div>
            ) : null}
            {Boolean(bedTemperature) ? (
              <div className="flex justify-between">
                <span className="text-zinc-400">热床温度:</span>
                <span className="text-zinc-200">{formatValue(bedTemperature)}°C</span>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* 打印速度 */}
      {hasSpeed ? (
        <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
          <h3 className="text-sm font-semibold text-zinc-200 mb-3">打印速度</h3>
          <div className="space-y-2 text-sm">
            {Boolean(printSpeed) ? (
              <div className="flex justify-between">
                <span className="text-zinc-400">打印速度:</span>
                <span className="text-zinc-200">{formatValue(printSpeed)} mm/s</span>
              </div>
            ) : null}
            {Boolean(firstLayerSpeed) ? (
              <div className="flex justify-between">
                <span className="text-zinc-400">首层速度:</span>
                <span className="text-zinc-200">{formatValue(firstLayerSpeed)} mm/s</span>
              </div>
            ) : null}
            {Boolean(externalPerimeterSpeed) ? (
              <div className="flex justify-between">
                <span className="text-zinc-400">外周速度:</span>
                <span className="text-zinc-200">{formatValue(externalPerimeterSpeed)} mm/s</span>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* 兼容打印机 */}
      {hasCompatiblePrinters ? (
        <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
          <h3 className="text-sm font-semibold text-zinc-200 mb-3">兼容打印机</h3>
          <div className="flex flex-wrap gap-2">
            {(compatiblePrinters as unknown[]).map((printer, idx) => (
              <span
                key={idx}
                className="inline-block bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded text-xs"
              >
                {formatValue(printer)}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {/* 原始JSON展开 */}
      <button
        onClick={() => setShowRawJson(!showRawJson)}
        className="w-full px-4 py-2 text-xs text-zinc-400 hover:text-zinc-300 border border-zinc-700 rounded hover:border-zinc-600 transition-colors"
      >
        {showRawJson ? "隐藏原始JSON" : "显示原始JSON"}
      </button>

      {showRawJson && (
        <div className="rounded-lg bg-zinc-950 p-4 overflow-auto max-h-96 border border-zinc-800">
          <pre className="text-xs text-zinc-400 font-mono">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
