import { Breadcrumb } from "@/components/Breadcrumb";
import { FilamentsShell } from "@/components/FilamentsShell";
import { StaticLink } from "@/components/StaticLink";
import { fromSegment, listSeries, listTypes, listVendors, toSegment } from "@/lib/filaments";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { vendor: string; type: string }[] = [];
  for (const vendor of listVendors()) {
    for (const type of listTypes(vendor)) {
      params.push({ vendor: toSegment(vendor), type: toSegment(type) });
    }
  }
  return params;
}

export default function TypePage({ params }: { params: { vendor: string; type: string } }) {
  const vendor = fromSegment(params.vendor);
  const type = fromSegment(params.type);
  const seriesList = listSeries(vendor, type);

  return (
    <FilamentsShell vendor={vendor} type={type}>
      <Breadcrumb vendor={vendor} type={type} />

      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <div className="text-xl font-semibold text-zinc-50">{type}</div>
          <div className="mt-1 text-sm text-zinc-400">选择耗材系列</div>
        </div>
        <div className="text-xs text-zinc-500">共 {seriesList.length} 个系列</div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {seriesList.map((s) => (
          <StaticLink
            key={s}
            href={`/filaments/${toSegment(vendor)}/${toSegment(type)}/${toSegment(s)}`}
            className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 hover:border-zinc-700 hover:bg-zinc-900/70"
          >
            <div className="text-sm font-medium text-zinc-50">{s}</div>
            <div className="mt-1 text-xs text-zinc-400">查看耗材丝设置</div>
          </StaticLink>
        ))}
      </div>
    </FilamentsShell>
  );
}
