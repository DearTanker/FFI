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
  // 显示品牌页面时（仅有品牌名，无类型、系列）
  if (vendor && !type && !series) {
    return (
      <FilamentsShell vendor={vendor}>
        <Breadcrumb vendor={vendor} />
        <div className="mt-8">
          <h1 className="text-3xl font-bold text-zinc-50">{vendor}</h1>
          <p className="mt-2 text-zinc-400">选择类型查看该品牌的耗材配置</p>
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
      <div className="flex gap-6">
        {/* 第二列：二级菜单（竖向）*/}
        <div className="w-72 shrink-0">
          <div className="sticky top-6 space-y-6">
            {/* 耗材类型菜单 */}
            {selectedVendor && (
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
                <div className="text-sm font-semibold text-zinc-200 mb-3">类型</div>
                <div className="space-y-1 max-h-96 overflow-y-auto">
                  {types.map(t => (
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
                      className={`block w-full text-left px-3 py-2 rounded text-xs transition-colors ${
                        t === selectedType
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

            {/* 耗材系列菜单 */}
            {selectedType && (
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
                <div className="text-sm font-semibold text-zinc-200 mb-3">系列</div>
                <div className="space-y-1 max-h-96 overflow-y-auto">
                  {seriesList.map(s => (
                    <button
                      key={s}
                      onClick={() => {
                        setNavState({
                          selectedVendor: selectedVendor,
                          selectedType: selectedType,
                          selectedSeries: s,
                        });
                      }}
                      className={`block w-full text-left px-3 py-2 rounded text-xs transition-colors ${
                        s === selectedSeries
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

        {/* 第三列：内容 */}
        <div className="flex-1 min-w-0">
          <div className="mt-8">
            {selectedSeries && profiles.length > 0 ? (
              <>
                <div className="mb-6">
                  <div className="text-lg font-semibold text-zinc-50">{selectedVendor} • {selectedType} • {selectedSeries}</div>
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
      </div>
    </FilamentsShell>
  );
}
