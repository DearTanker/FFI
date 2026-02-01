import { Breadcrumb } from "@/components/Breadcrumb";
import { FilamentsShell } from "@/components/FilamentsShell";
import { StaticLink } from "@/components/StaticLink";
import { fromSegment, listTypes, listVendors, toSegment } from "@/lib/filaments";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return listVendors().map((vendor) => ({ vendor: toSegment(vendor) }));
}

export default function VendorPage({ params }: { params: { vendor: string } }) {
  const vendor = fromSegment(params.vendor);
  const types = listTypes(vendor);

  return (
    <FilamentsShell vendor={vendor}>
      <Breadcrumb vendor={vendor} />

      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <div className="text-xl font-semibold text-zinc-50">{vendor}</div>
          <div className="mt-1 text-sm text-zinc-400">选择耗材类型</div>
        </div>
        <div className="text-xs text-zinc-500">共 {types.length} 个类型</div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {types.map((t) => (
          <StaticLink
            key={t}
            href={`/filaments/${toSegment(vendor)}/${toSegment(t)}`}
            className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 hover:border-zinc-700 hover:bg-zinc-900/70"
          >
            <div className="text-sm font-medium text-zinc-50">{t}</div>
            <div className="mt-1 text-xs text-zinc-400">查看耗材系列</div>
          </StaticLink>
        ))}
      </div>
    </FilamentsShell>
  );
}
