"use client";

import { useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FilamentsShell } from "@/components/FilamentsShell";
import { StaticLink } from "@/components/StaticLink";
import { useFilamentContext } from "@/context/FilamentContext";
import { getVendors, getTypes, getSeries, getProfiles, fetchProfileContent } from "@/lib/filaments-client";
import { toSegment, fromSegment } from "@/lib/segments";
import { FilamentProfileSummary } from "@/lib/filaments";
import { PresetDetailsClient } from "@/components/PresetDetailsClient";
import { ProfileSidebarClient } from "@/components/ProfileSidebarClient";
import { buildPresetModel, jsonToRecord } from "@/lib/filamentPreset";

type NavState = {
  selectedVendor?: string;
  selectedType?: string;
  selectedSeries?: string;
};

export default function FilamentsClient() {
  const { index, loading, error } = useFilamentContext();
  const pathname = usePathname();

  let slug: string[] = [];
  if (pathname && pathname.startsWith("/filaments")) {
    slug = pathname.replace(/^\/filaments\/?/, "").split("/").filter(Boolean);
  }

  const vendor = slug[0] ? fromSegment(slug[0]) : undefined;
  const type = slug[1] ? fromSegment(slug[1]) : undefined;
  const series = slug[2] ? fromSegment(slug[2]) : undefined;
  const file = slug[3] ? fromSegment(slug[3]) : undefined;

  const [profileData, setProfileData] = useState<Record<string, unknown> | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [navState, setNavState] = useState<NavState>({
    selectedVendor: vendor,
    selectedType: type,
    selectedSeries: series,
  });

  useEffect(() => {
    setNavState({
      selectedVendor: vendor,
      selectedType: type,
      selectedSeries: series,
    });
  }, [vendor, type, series]);

  useEffect(() => {
    if (file && vendor && type && series && index) {
      setProfileLoading(true);
      const profiles = getProfiles(index, vendor, type, series);
      const p = profiles.find(p => p.displayName === file);
      if (p) {
        fetchProfileContent(`Filaments/${vendor}/${type}/${series}/${p.fileName}`)
          .then(data => {
            setProfileData(data);
            setProfileLoading(false);
          })
          .catch(e => {
            console.error(e);
            setProfileLoading(false);
          });
      } else {
        setProfileLoading(false);
      }
    }
  }, [file, vendor, type, series, index]);

  if (error) {
    return (
      <FilamentsShell>
        <Breadcrumb />
        <div className="mt-8 rounded-md bg-red-900/20 p-4 text-red-200 border border-red-900/50">
          <h3 className="font-semibold">无法加载耗材数据</h3>
          <p className="mt-1 text-sm text-red-300/80">{error.message}</p>
        </div>
      </FilamentsShell>
    );
  }

  if (loading || !index) {
    return (
      <FilamentsShell>
        <Breadcrumb />
        <div className="mt-8 text-zinc-500">Loading filaments...</div>
      </FilamentsShell>
    );
  }

  // 当显示profile详情时
  if (file && vendor && type && series) {
    const profiles = getProfiles(index, vendor, type, series);
    const currentProfile = profiles.find(p => p.displayName === file);
    const presetModel = profileData ? buildPresetModel(jsonToRecord(profileData)) : null;
    
    return (
      <FilamentsShell>
        <Breadcrumb vendor={vendor} type={type} series={series} profileLabel={file} />
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* 左侧边栏 */}
          <div className="lg:col-span-1">
            {profileLoading || !presetModel ? (
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
                <div className="text-sm text-zinc-500">Loading...</div>
              </div>
            ) : (
              <ProfileSidebarClient
                vendor={vendor}
                type={type}
                series={series}
                fileName={currentProfile?.fileName || file}
                profiles={profiles}
              />
            )}
          </div>

          {/* 右侧主内容 */}
          <div className="lg:col-span-3">
            {profileLoading ? (
              <div className="text-zinc-500">Loading profile...</div>
            ) : presetModel ? (
              <PresetDetailsClient
                summary={presetModel.summary}
                tabs={presetModel.tabs}
              />
            ) : (
              <div className="text-zinc-500">Profile not found</div>
            )}
          </div>
        </div>
      </FilamentsShell>
    );
  }

  // 主导航视图 - 显示品牌、类型、系列的菜单
  const vendors = getVendors(index);
  const selectedVendor = navState.selectedVendor || vendors[0];
  const types = selectedVendor ? getTypes(index, selectedVendor) : [];
  const selectedType = navState.selectedType || types[0];
  const seriesList = selectedVendor && selectedType ? getSeries(index, selectedVendor, selectedType) : [];
  const selectedSeries = navState.selectedSeries || seriesList[0];
  const profiles = selectedVendor && selectedType && selectedSeries 
    ? getProfiles(index, selectedVendor, selectedType, selectedSeries)
    : [];

  return (
    <FilamentsShell>
      <Breadcrumb />
      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <div className="text-xl font-semibold text-zinc-50">耗材</div>
          <div className="mt-1 text-sm text-zinc-400">按品牌、类型、系列浏览耗材丝配置</div>
        </div>
      </div>

      {/* 二级菜单 + 内容区域 */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* 左侧导航菜单 */}
        <LeftNavMenu 
          index={index} 
          navState={navState}
          setNavState={setNavState}
        />
        
        {/* 右侧内容 */}
        <div className="lg:col-span-3">
          {selectedSeries && profiles.length > 0 ? (
            <>
              <div className="mb-6">
                <div className="text-lg font-semibold text-zinc-50">{selectedSeries}</div>
                <div className="mt-1 text-sm text-zinc-400">
                  {selectedVendor} • {selectedType}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {profiles.map(p => (
                  <StaticLink
                    key={p.fileName}
                    href={`/filaments/${toSegment(selectedVendor)}/${toSegment(selectedType)}/${toSegment(selectedSeries)}/${toSegment(p.displayName)}`}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 hover:border-zinc-700 hover:bg-zinc-900/70 transition-colors"
                  >
                    <div className="text-sm font-medium text-zinc-50">{p.displayName}</div>
                    {p.compatiblePrinters.length > 0 && (
                      <div className="mt-1 text-xs text-zinc-400">
                        {p.compatiblePrinters.join(", ")}
                      </div>
                    )}
                  </StaticLink>
                ))}
              </div>
            </>
          ) : (
            <div className="text-zinc-500">选择品牌、类型和系列以查看耗材配置</div>
          )}
        </div>
      </div>
    </FilamentsShell>
  );
}

interface LeftNavMenuProps {
  index: any;
  navState: NavState;
  setNavState: (state: NavState) => void;
  currentVendor?: string;
  currentType?: string;
  currentSeries?: string;
}

function LeftNavMenu({ index, navState, setNavState, currentVendor, currentType, currentSeries }: LeftNavMenuProps) {
  const vendors = getVendors(index);
  const activeVendor = currentVendor || navState.selectedVendor || vendors[0];
  const types = activeVendor ? getTypes(index, activeVendor) : [];
  const activeType = currentType || navState.selectedType || types[0];
  const seriesList = activeVendor && activeType ? getSeries(index, activeVendor, activeType) : [];
  const activeSeries = currentSeries || navState.selectedSeries || seriesList[0];

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-6 space-y-6">
        {/* 耗材类型菜单 */}
        {activeVendor && (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
            <div className="text-sm font-semibold text-zinc-200 mb-3">类型</div>
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {types.map(t => (
                <button
                  key={t}
                  onClick={() => {
                    const newSeriesList = getSeries(index, activeVendor, t);
                    const newSeries = newSeriesList[0];
                    setNavState({
                      selectedVendor: activeVendor,
                      selectedType: t,
                      selectedSeries: newSeries,
                    });
                  }}
                  className={`block w-full text-left px-3 py-2 rounded text-xs transition-colors ${
                    t === activeType
                      ? "bg-emerald-500/20 text-emerald-300 font-medium"
                      : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 系列菜单 */}
        {activeType && (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
            <div className="text-sm font-semibold text-zinc-200 mb-3">系列</div>
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {seriesList.map(s => (
                <button
                  key={s}
                  onClick={() => {
                    setNavState({
                      selectedVendor: activeVendor,
                      selectedType: activeType,
                      selectedSeries: s,
                    });
                  }}
                  className={`block w-full text-left px-3 py-2 rounded text-xs transition-colors ${
                    s === activeSeries
                      ? "bg-emerald-500/20 text-emerald-300 font-medium"
                      : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface ProfileDetailsViewProps {
  data: Record<string, unknown>;
}

function ProfileDetailsView({ data }: ProfileDetailsViewProps) {
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
    if (typeof val === 'string') return val;
    if (typeof val === 'number') return String(val);
    return '';
  };

  const hasBasicInfo = !!(filamentSettingsId || filamentDiameter || filamentDensity || filamentCost);
  const hasTemperature = !!(nozzleTemperature || bedTemperature || firstLayerTemperature);
  const hasSpeed = !!(printSpeed || firstLayerSpeed || externalPerimeterSpeed);
  const hasCompatiblePrinters = !!(compatiblePrinters && Array.isArray(compatiblePrinters) && compatiblePrinters.length > 0);
  
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
                <span className="text-zinc-200">￥{formatValue(filamentCost)}</span>
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
              <span key={idx} className="inline-block bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded text-xs">
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
