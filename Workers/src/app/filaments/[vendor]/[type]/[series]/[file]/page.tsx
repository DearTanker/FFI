import { Breadcrumb } from "@/components/Breadcrumb";
import { FilamentsShell } from "@/components/FilamentsShell";
import { PresetDetailsClient } from "@/components/PresetDetailsClient";
import { ProfileSidebarClient } from "@/components/ProfileSidebarClient";
import { fromSegment, listProfiles, listSeries, listTypes, listVendors, readProfile, toSegment } from "@/lib/filaments";
import { buildPresetModel, jsonToRecord } from "@/lib/filamentPreset";

// export const dynamic = "force-static";
// export const dynamicParams = false;
export const dynamicParams = true;

export async function generateStaticParams() {
  const params: { vendor: string; type: string; series: string; file: string }[] = [];
  for (const vendor of listVendors()) {
    for (const type of listTypes(vendor)) {
      for (const series of listSeries(vendor, type)) {
        for (const p of listProfiles(vendor, type, series)) {
          params.push({ vendor: toSegment(vendor), type: toSegment(type), series: toSegment(series), file: toSegment(p.fileName) });
        }
      }
    }
  }
  return params;
}

export default function ProfilePage({
  params
}: {
  params: { vendor: string; type: string; series: string; file: string };
}) {
  const vendor = fromSegment(params.vendor);
  const type = fromSegment(params.type);
  const series = fromSegment(params.series);
  const fileName = fromSegment(params.file);

  const profiles = listProfiles(vendor, type, series);
  const profile = readProfile(vendor, type, series, fileName);
  const title = profile?.displayName ?? fileName.replace(/\.json$/i, "");
  const model = profile ? buildPresetModel(jsonToRecord(profile.json)) : null;

  return (
    <FilamentsShell vendor={vendor} type={type} series={series}>
      <Breadcrumb vendor={vendor} type={type} series={series} profileLabel={title} />

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="truncate text-xl font-semibold text-zinc-50">{title}</div>
          <div className="mt-1 text-sm text-zinc-400">
            {vendor} · {type} · {series}
          </div>
        </div>
        <div className="text-xs text-zinc-500">{fileName}</div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[420px,1fr]">
        <ProfileSidebarClient
          vendor={toSegment(vendor)}
          type={toSegment(type)}
          series={toSegment(series)}
          fileName={toSegment(fileName)}
          profiles={profiles.map((p) => ({
            fileName: toSegment(p.fileName),
            displayName: p.displayName,
            compatiblePrinters: p.compatiblePrinters
          }))}
        />

        <div>
          {model ? <PresetDetailsClient summary={model.summary} tabs={model.tabs} /> : <div className="text-sm text-zinc-400">未找到配置</div>}
        </div>
      </div>
    </FilamentsShell>
  );
}

