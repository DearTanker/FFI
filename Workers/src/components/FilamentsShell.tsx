import { FilamentNav } from "@/components/FilamentNav";

export function FilamentsShell(props: { vendor?: string; type?: string; series?: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <div className="mx-auto w-full max-w-7xl flex">
        <FilamentNav vendor={props.vendor} type={props.type} series={props.series} />
        <main className="flex-1 p-4 sm:p-6 overflow-auto">{props.children}</main>
      </div>
    </div>
  );
}

