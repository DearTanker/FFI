"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FilamentsShell } from "@/components/FilamentsShell";
import { StaticLink } from "@/components/StaticLink";
import { useFilamentContext } from "@/context/FilamentContext";
import { getVendors, getTypes, getSeries, getProfiles, fetchProfileContent } from "@/lib/filaments-client";
import { toSegment, fromSegment } from "@/lib/segments";
import { FilamentProfileSummary } from "@/lib/filaments";
import { ProfileDetailsView } from "@/components/ProfileDetailsView";

export default function FilamentsClient() {
  const { index, loading, error } = useFilamentContext();
  const params = useParams();
  const slug = (params.slug as string[]) || [];
  
  const vendor = slug[0] ? fromSegment(slug[0]) : undefined;
  const type = slug[1] ? fromSegment(slug[1]) : undefined;
  const series = slug[2] ? fromSegment(slug[2]) : undefined;
  const file = slug[3] ? fromSegment(slug[3]) : undefined;

  const [profileData, setProfileData] = useState<Record<string, unknown> | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

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

  if (file) {
      return (
          <FilamentsShell vendor={vendor} type={type} series={series}>
              <Breadcrumb vendor={vendor} type={type} series={series} profileLabel={file} />
              <div className="mt-6">
                  {profileLoading ? (
                      <div>Loading profile...</div>
                  ) : profileData ? (
                      <ProfileDetailsView data={profileData} />
                  ) : (
                      <div>Profile not found</div>
                  )}
              </div>
          </FilamentsShell>
      );
  }

  if (series) {
      const profiles = getProfiles(index, vendor!, type!, series);
      return (
        <FilamentsShell vendor={vendor} type={type} series={series}>
          <Breadcrumb vendor={vendor} type={type} series={series} />
           <div className="mt-4">
              <div className="text-xl font-semibold text-zinc-50">{series}</div>
              <div className="mt-1 text-sm text-zinc-400">选择具体的耗材配置</div>
           </div>
           <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
             {profiles.map(p => (
                 <StaticLink
                    key={p.fileName}
                    href={`/filaments/${toSegment(vendor!)}/${toSegment(type!)}/${toSegment(series)}/${toSegment(p.displayName)}`}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 hover:border-zinc-700 hover:bg-zinc-900/70"
                 >
                     <div className="text-sm font-medium text-zinc-50">{p.displayName}</div>
                     <div className="mt-1 text-xs text-zinc-400">
                        {p.compatiblePrinters.join(", ")}
                     </div>
                 </StaticLink>
             ))}
           </div>
        </FilamentsShell>
      );
  }

  if (type) {
      const seriesList = getSeries(index, vendor!, type);
      return (
          <FilamentsShell vendor={vendor} type={type}>
              <Breadcrumb vendor={vendor} type={type} />
              <div className="mt-4">
                  <div className="text-xl font-semibold text-zinc-50">{type}</div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {seriesList.map(s => (
                      <StaticLink
                          key={s}
                          href={`/filaments/${toSegment(vendor!)}/${toSegment(type)}/${toSegment(s)}`}
                          className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 hover:border-zinc-700 hover:bg-zinc-900/70"
                      >
                          <div className="text-sm font-medium text-zinc-50">{s}</div>
                      </StaticLink>
                  ))}
              </div>
          </FilamentsShell>
      );
  }

  if (vendor) {
      const types = getTypes(index, vendor);
      return (
          <FilamentsShell vendor={vendor}>
              <Breadcrumb vendor={vendor} />
              <div className="mt-4">
                  <div className="text-xl font-semibold text-zinc-50">{vendor}</div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {types.map(t => (
                      <StaticLink
                          key={t}
                          href={`/filaments/${toSegment(vendor)}/${toSegment(t)}`}
                          className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 hover:border-zinc-700 hover:bg-zinc-900/70"
                      >
                          <div className="text-sm font-medium text-zinc-50">{t}</div>
                      </StaticLink>
                  ))}
              </div>
          </FilamentsShell>
      );
  }

  const vendors = getVendors(index);
  return (
      <FilamentsShell>
          <Breadcrumb />
          <div className="mt-4 flex items-end justify-between gap-4">
            <div>
              <div className="text-xl font-semibold text-zinc-50">耗材</div>
              <div className="mt-1 text-sm text-zinc-400">按品牌浏览耗材丝配置</div>
            </div>
            <div className="text-xs text-zinc-500">共 {vendors.length} 个品牌</div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {vendors.map((v) => (
              <StaticLink
                key={v}
                href={`/filaments/${toSegment(v)}`}
                className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 hover:border-zinc-700 hover:bg-zinc-900/70"
              >
                <div className="text-sm font-medium text-zinc-50">{v}</div>
                <div className="mt-1 text-xs text-zinc-400">查看耗材类型</div>
              </StaticLink>
            ))}
          </div>
      </FilamentsShell>
  );
}
