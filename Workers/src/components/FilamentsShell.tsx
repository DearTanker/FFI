import { FilamentNav } from "@/components/FilamentNav";

export function FilamentsShell(props: { vendor?: string; type?: string; series?: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <FilamentNav vendor={props.vendor} type={props.type} series={props.series} />
      <main className="flex-1 p-4 sm:p-6 overflow-auto md:ml-[320px] max-w-full">
        <div className="mx-auto max-w-7xl">{props.children}</div>
      </main>
    </div>
  );
}

