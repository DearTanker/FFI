import { Breadcrumb } from "@/components/Breadcrumb";
import { FilamentsShell } from "@/components/FilamentsShell";
import { StaticLink } from "@/components/StaticLink";
import { listVendors, toSegment } from "@/lib/filaments";

export const dynamic = "force-static";
export const dynamicParams = false;

export default function FilamentsHomePage() {
  const vendors = listVendors();

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
