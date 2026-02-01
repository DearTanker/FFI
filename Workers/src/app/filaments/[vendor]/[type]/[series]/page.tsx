import { Breadcrumb } from "@/components/Breadcrumb";
import { FilamentsShell } from "@/components/FilamentsShell";
import { ProfileListClient } from "@/components/ProfileListClient";
import { StaticLink } from "@/components/StaticLink";
import { fromSegment, listProfiles, listSeries, listTypes, listVendors, toSegment } from "@/lib/filaments";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { vendor: string; type: string; series: string }[] = [];
  for (const vendor of listVendors()) {
    for (const type of listTypes(vendor)) {
      for (const series of listSeries(vendor, type)) {
        params.push({ vendor: toSegment(vendor), type: toSegment(type), series: toSegment(series) });
      }
    }
  }
  return params;
}

export default function SeriesPage({ params }: { params: { vendor: string; type: string; series: string } }) {
  const vendor = fromSegment(params.vendor);
  const type = fromSegment(params.type);
  const series = fromSegment(params.series);
  const profiles = listProfiles(vendor, type, series);

  const items = profiles.map((p) => {
    const href = `/filaments/${toSegment(vendor)}/${toSegment(type)}/${toSegment(series)}/${toSegment(p.fileName)}`;
    const subtitle = p.compatiblePrinters.length > 0 ? p.compatiblePrinters.join(" · ") : p.fileName;
    return { href, title: p.displayName, subtitle, tags: p.compatiblePrinters };
  });

  return (
    <FilamentsShell vendor={vendor} type={type} series={series}>
      <Breadcrumb vendor={vendor} type={type} series={series} />

      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <div className="text-xl font-semibold text-zinc-50">{series}</div>
          <div className="mt-1 text-sm text-zinc-400">耗材丝设置</div>
        </div>
        <div className="text-xs text-zinc-500">共 {profiles.length} 个配置</div>
      </div>

      <div className="mt-6">
        <ProfileListClient items={items} />
      </div>

      {profiles.length > 0 ? (
        <div className="mt-4 text-xs text-zinc-500">
          <StaticLink href={items[0]!.href} className="text-emerald-400 hover:text-emerald-300">
            打开第一个配置
          </StaticLink>
        </div>
      ) : null}
    </FilamentsShell>
  );
}

