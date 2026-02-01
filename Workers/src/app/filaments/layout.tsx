import { FilamentProvider } from "@/context/FilamentContext";

export default function FilamentsLayout({ children }: { children: React.ReactNode }) {
  return <FilamentProvider>{children}</FilamentProvider>;
}
