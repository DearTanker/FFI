"use client";

import { useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FilamentsShell } from "@/components/FilamentsShell";
import { StaticLink } from "@/components/StaticLink";
import { Icon } from "@/components/Icon";
import { useFilamentContext } from "@/context/FilamentContext";
import { getVendors, getTypes, getSeries, getProfiles, fetchProfileContent } from "@/lib/filaments-client";
import { toSegment, fromSegment } from "@/lib/segments";
import { FilamentProfileSummary } from "@/lib/filaments";
import { PresetDetailsClient } from "@/components/PresetDetailsClient";
import { ProfileSidebarClient } from "@/components/ProfileSidebarClient";
import { OrcaFilamentDetails } from "@/components/OrcaFilamentDetails";
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
  const [detailsView, setDetailsView] = useState<'orca' | 'legacy'>('orca'); // 选择显示视图
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
  // 显示品牌页面时（仅有品牌名，无类型、系列）
  if (vendor && !type && !series) {
    const vendorTypes = getTypes(index, vendor);
    const selectedType = navState.selectedType || vendorTypes[0];
    const vendorSeriesList = selectedType ? getSeries(index, vendor, selectedType) : [];
    const selectedSeries = navState.selectedSeries || vendorSeriesList[0];
    const profiles = vendor && selectedType && selectedSeries 
      ? getProfiles(index, vendor, selectedType, selectedSeries)
      : [];

    return (
      <FilamentsShell vendor={vendor}>
        <Breadcrumb vendor={vendor} />
        
        <div className="mt-8">
          <h1 className="text-3xl font-bold text-zinc-50">{vendor}</h1>
          <p className="mt-2 text-zinc-400">选择下方的类型和系列查看耗材配置</p>
        </div>

        <div className="mt-8 flex gap-6">
          {/* 二级菜单（类型 + 系列选择）*/}
          <nav className="w-80 shrink-0 px-2 py-2 text-sm flex flex-col gap-6">
            {/* 类型选择菜单 */}
            <div className="sticky top-6">
              <div className="px-2 py-1 text-xs font-medium text-zinc-400">类型</div>
              <div className="space-y-1">
                {vendorTypes.length > 0 ? (
                  vendorTypes.map(t => (
                    <button
                      key={t}
                      onClick={() => {
                        const newSeriesList = getSeries(index, vendor, t);
                        const newSeries = newSeriesList[0];
                        setNavState({
                          selectedVendor: vendor,
                          selectedType: t,
                          selectedSeries: newSeries,
                        });
                      }}
                      className={`flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-zinc-800/60 w-full text-left ${
                        t === selectedType
                          ? 'bg-zinc-800/80 text-zinc-50'
                          : 'text-zinc-200'
                      }`}
                    >
                      <span className="truncate">{t}</span>
                    </button>
                  ))
                ) : (
                  <div className="text-xs text-zinc-500 px-2 py-1.5">暂无可用类型</div>
                )}
              </div>
            </div>

            {/* 系列选择菜单 */}
            <div>
              <div className="px-2 py-1 text-xs font-medium text-zinc-400">系列</div>
              <div className="space-y-1">
                {selectedType ? (
                  vendorSeriesList.length > 0 ? (
                    vendorSeriesList.map(s => (
                      <button
                        key={s}
                        onClick={() => {
                          setNavState({
                            selectedVendor: vendor,
                            selectedType: selectedType,
                            selectedSeries: s,
                          });
                        }}
                        className={`flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-zinc-800/60 w-full text-left ${
                          s === selectedSeries
                            ? 'bg-zinc-800/80 text-zinc-50'
                            : 'text-zinc-200'
                        }`}
                      >
                        <span className="truncate">{s}</span>
                      </button>
                    ))
                  ) : (
                    <div className="text-xs text-zinc-500 px-2 py-1.5">暂无可用系列</div>
                  )
                ) : (
                  <div className="text-xs text-zinc-500 px-2 py-1.5">请先选择类型</div>
                )}
              </div>
            </div>
          </nav>

          {/* 内容区域 */}
          <div className="flex-1 min-w-0">
            {!selectedType ? (
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-8 text-center">
                <p className="text-zinc-400">请先选择耗材类型</p>
              </div>
            ) : !selectedSeries ? (
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-8 text-center">
                <p className="text-zinc-400">请选择耗材系列</p>
              </div>
            ) : profiles.length > 0 ? (
              <>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-zinc-50 mb-1">
                    {vendor} • {selectedType} • {selectedSeries}
                  </h2>
                  <p className="text-xs text-zinc-400">共 {profiles.length} 个配置</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {profiles.map(p => (
                    <StaticLink
                      key={p.fileName}
                      href={`/filaments/${toSegment(vendor)}/${toSegment(selectedType)}/${toSegment(selectedSeries)}/${toSegment(p.displayName)}`}
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
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-8 text-center">
                <p className="text-zinc-400">暂无该系列的配置</p>
              </div>
            )}
          </div>
        </div>
      </FilamentsShell>
    );
  }

  if (file && vendor && type && series) {
    const profiles = getProfiles(index, vendor, type, series);
    const currentProfile = profiles.find(p => p.displayName === file);
    const presetModel = profileData ? buildPresetModel(jsonToRecord(profileData)) : null;
    
    return (
      <FilamentsShell vendor={vendor} type={type} series={series}>
        <Breadcrumb vendor={vendor} type={type} series={series} profileLabel={file} />
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* 左侧边栏 */}
          <div className="md:col-span-1">
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
          <div className="md:col-span-2">
            {profileLoading ? (
              <div className="text-zinc-500">Loading profile...</div>
            ) : profileData ? (
              <>
                {/* View Toggle Buttons */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setDetailsView('orca')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      detailsView === 'orca'
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    }`}
                  >
                    🎯 OrcaSlicer 结构
                  </button>
                  <button
                    onClick={() => setDetailsView('legacy')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      detailsView === 'legacy'
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    }`}
                  >
                    📋 原始视图
                  </button>
                </div>

                {/* Display Contents Based on View */}
                {detailsView === 'orca' ? (
                  <OrcaFilamentDetails data={jsonToRecord(profileData)} rawData={profileData} />
                ) : presetModel ? (
                  <PresetDetailsClient
                    summary={presetModel.summary}
                    tabs={presetModel.tabs}
                  />
                ) : (
                  <div className="text-zinc-500">Unable to parse preset</div>
                )}
              </>
            ) : (
              <div className="text-zinc-500">Profile not found</div>
            )}
          </div>
        </div>
      </FilamentsShell>
    );
  }

  // 主导航视图 - 三级导航方案
  const vendors = getVendors(index);
  const selectedVendor = navState.selectedVendor;
  const types = selectedVendor ? getTypes(index, selectedVendor) : [];
  const selectedType = navState.selectedType;
  const seriesList = selectedVendor && selectedType ? getSeries(index, selectedVendor, selectedType) : [];
  const selectedSeries = navState.selectedSeries;
  const profiles = selectedVendor && selectedType && selectedSeries 
    ? getProfiles(index, selectedVendor, selectedType, selectedSeries)
    : [];

  return (
    <FilamentsShell vendor={selectedVendor} type={selectedType} series={selectedSeries}>
      <Breadcrumb vendor={vendor} type={type} series={series} />
      <div className="mt-4 flex gap-6">
        {/* 第二列：导航菜单（类型选择 + 系列选择）*/}
        <nav className="w-80 shrink-0 px-2 py-2 text-sm flex flex-col gap-6">
          {/* 类型选择菜单 */}
          <div className="sticky top-6">
            <div className="px-2 py-1 text-xs font-medium text-zinc-400 flex items-center gap-2">
              <Icon name="filament" size={14} alt="Material Type" />
              <span>材料类型</span>
            </div>
            <div className="space-y-1">
              {selectedVendor ? (
                types.length > 0 ? (
                  types.map(t => (
                    <button
                      key={t}
                      onClick={() => {
                        const newSeriesList = getSeries(index, selectedVendor, t);
                        const newSeries = newSeriesList[0];
                        setNavState({
                          selectedVendor: selectedVendor,
                          selectedType: t,
                          selectedSeries: newSeries,
                        });
                      }}
                      className={`flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-zinc-800/60 w-full text-left ${
                        t === selectedType
                          ? 'bg-zinc-800/80 text-zinc-50'
                          : 'text-zinc-200'
                      }`}
                    >
                      <span className="truncate">{t}</span>
                    </button>
                  ))
                ) : (
                  <div className="text-xs text-zinc-500 px-2 py-1.5">暂无可用类型</div>
                )
              ) : (
                <div className="text-xs text-zinc-500 px-2 py-1.5">请先选择品牌</div>
              )}
            </div>
          </div>

          {/* 系列选择菜单 */}
          <div>
            <div className="px-2 py-1 text-xs font-medium text-zinc-400 flex items-center gap-2">
              <Icon name="cooling" size={14} alt="Product Series" />
              <span>产品系列</span>
            </div>
            <div className="space-y-1">
              {selectedType ? (
                seriesList.length > 0 ? (
                  seriesList.map(s => (
                    <button
                      key={s}
                      onClick={() => {
                        setNavState({
                          selectedVendor: selectedVendor,
                          selectedType: selectedType,
                          selectedSeries: s,
                        });
                      }}
                      className={`flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-zinc-800/60 w-full text-left ${
                        s === selectedSeries
                          ? 'bg-zinc-800/80 text-zinc-50'
                          : 'text-zinc-200'
                      }`}
                    >
                      <span className="truncate">{s}</span>
                    </button>
                  ))
                ) : (
                  <div className="text-xs text-zinc-500 px-2 py-1.5">暂无可用系列</div>
                )
              ) : (
                <div className="text-xs text-zinc-500 px-2 py-1.5">请先选择类型</div>
              )}
            </div>
          </div>
        </nav>

        {/* 第三列：内容区域 */}
        <div className="flex-1 min-w-0">
          {!selectedVendor ? (
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-8 text-center">
              <p className="text-zinc-400">请先在左侧菜单选择品牌</p>
            </div>
          ) : !selectedType ? (
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-8 text-center">
              <p className="text-zinc-400">请在上方选择耗材类型</p>
            </div>
          ) : !selectedSeries ? (
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-8 text-center">
              <p className="text-zinc-400">请在上方选择耗材系列</p>
            </div>
          ) : profiles.length > 0 ? (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-zinc-50 mb-1">
                  {selectedVendor} • {selectedType} • {selectedSeries}
                </h2>
                <p className="text-xs text-zinc-400">共 {profiles.length} 个配置</p>
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
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-8 text-center">
              <p className="text-zinc-400">暂无该系列的配置</p>
            </div>
          )}
        </div>
      </div>
    </FilamentsShell>
  );
}
