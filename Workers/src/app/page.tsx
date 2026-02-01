import { StaticLink } from "@/components/StaticLink";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center p-6">
      <div className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 p-6">
        <div className="text-lg font-semibold">FFI 耗材丝设置</div>
        <div className="mt-2 text-sm text-zinc-300">
          进入耗材导航，按“耗材 → 耗材类型 → 耗材系列 → 耗材丝设置”浏览。
        </div>
        <StaticLink
          href="/filaments"
          className="mt-4 inline-flex rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-emerald-400"
        >
          打开
        </StaticLink>
      </div>
    </main>
  );
}
