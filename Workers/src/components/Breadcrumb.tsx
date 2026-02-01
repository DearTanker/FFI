import { toSegment } from "@/lib/segments";
import { StaticLink } from "@/components/StaticLink";

type Crumb = { label: string; href?: string };

export function Breadcrumb(props: { vendor?: string; type?: string; series?: string; profileLabel?: string }) {
  const crumbs: Crumb[] = [{ label: "耗材", href: "/filaments" }];
  if (props.vendor) crumbs.push({ label: props.vendor, href: `/filaments/${toSegment(props.vendor)}` });
  if (props.vendor && props.type) crumbs.push({ label: props.type, href: `/filaments/${toSegment(props.vendor)}/${toSegment(props.type)}` });
  if (props.vendor && props.type && props.series)
    crumbs.push({
      label: props.series,
      href: `/filaments/${toSegment(props.vendor)}/${toSegment(props.type)}/${toSegment(props.series)}`
    });
  if (props.profileLabel) crumbs.push({ label: props.profileLabel });

  return (
    <div className="text-sm text-zinc-300">
      {crumbs.map((c, idx) => {
        const sep = idx === 0 ? null : <span className="px-2 text-zinc-600">/</span>;
        const node = c.href ? (
          <StaticLink href={c.href} className="hover:text-zinc-50">
            {c.label}
          </StaticLink>
        ) : (
          <span className="text-zinc-50">{c.label}</span>
        );
        return (
          <span key={`${c.label}-${idx}`}>
            {sep}
            {node}
          </span>
        );
      })}
    </div>
  );
}
