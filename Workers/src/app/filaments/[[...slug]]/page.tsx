
import FilamentsClient from "./FilamentsClient";

export function generateStaticParams() {
  return [{ slug: [] }];
}

export default function Page() {
  return <FilamentsClient />;
}
