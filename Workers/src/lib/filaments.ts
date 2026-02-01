import fs from "node:fs";
import path from "node:path";

export type FilamentProfileSummary = {
  vendor: string;
  type: string;
  series: string;
  fileName: string;
  displayName: string;
  compatiblePrinters: string[];
};

export type FilamentProfile = FilamentProfileSummary & {
  json: Record<string, unknown>;
};

type Index = {
  vendors: string[];
  typesByVendor: Map<string, string[]>;
  seriesByVendorType: Map<string, string[]>;
  profilesByVendorTypeSeries: Map<string, FilamentProfileSummary[]>;
};

const indexCache: { value: Index | null } = { value: null };

function filamentsRootDir(): string {
  return path.join(process.cwd(), "..", "Filaments");
}

function safeReadDir(dir: string): fs.Dirent[] {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

function isJsonFileName(name: string): boolean {
  return name.toLowerCase().endsWith(".json");
}

function compareByDisplayName(a: { displayName: string }, b: { displayName: string }): number {
  return a.displayName.localeCompare(b.displayName, "zh-Hans-CN", { numeric: true });
}

function normalizeString(v: unknown): string {
  if (typeof v === "string") return v.trim();
  return "";
}

function normalizeStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(normalizeString).filter(Boolean);
  const single = normalizeString(v);
  return single ? [single] : [];
}

function readProfileSummary(absPath: string, vendor: string, type: string, series: string, fileName: string): FilamentProfileSummary {
  let displayName = fileName.replace(/\.json$/i, "");
  let compatiblePrinters: string[] = [];

  try {
    const raw = fs.readFileSync(absPath, "utf8");
    const obj = JSON.parse(raw) as Record<string, unknown>;

    const id = obj["filament_settings_id"];
    const idArr = normalizeStringArray(id);
    if (idArr.length > 0) displayName = idArr[0];

    compatiblePrinters = normalizeStringArray(obj["compatible_printers"]);
    return { vendor, type, series, fileName, displayName, compatiblePrinters };
  } catch {
    return { vendor, type, series, fileName, displayName, compatiblePrinters };
  }
}

export function getFilamentIndex(): Index {
  if (indexCache.value) return indexCache.value;

  const root = filamentsRootDir();
  const vendorDirs = safeReadDir(root).filter((d) => d.isDirectory()).map((d) => d.name);
  vendorDirs.sort((a, b) => a.localeCompare(b, "zh-Hans-CN", { numeric: true }));

  const typesByVendor = new Map<string, string[]>();
  const seriesByVendorType = new Map<string, string[]>();
  const profilesByVendorTypeSeries = new Map<string, FilamentProfileSummary[]>();

  for (const vendor of vendorDirs) {
    const vendorPath = path.join(root, vendor);
    const types = safeReadDir(vendorPath)
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort((a, b) => a.localeCompare(b, "zh-Hans-CN", { numeric: true }));

    typesByVendor.set(vendor, types);

    for (const type of types) {
      const typePath = path.join(vendorPath, type);
      const seriesList = safeReadDir(typePath)
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
        .sort((a, b) => a.localeCompare(b, "zh-Hans-CN", { numeric: true }));

      seriesByVendorType.set(`${vendor}|||${type}`, seriesList);

      for (const series of seriesList) {
        const seriesPath = path.join(typePath, series);
        const profiles: FilamentProfileSummary[] = safeReadDir(seriesPath)
          .filter((d) => d.isFile() && isJsonFileName(d.name))
          .map((d) => {
            const abs = path.join(seriesPath, d.name);
            return readProfileSummary(abs, vendor, type, series, d.name);
          })
          .sort(compareByDisplayName);

        profilesByVendorTypeSeries.set(`${vendor}|||${type}|||${series}`, profiles);
      }
    }
  }

  const built: Index = { vendors: vendorDirs, typesByVendor, seriesByVendorType, profilesByVendorTypeSeries };
  indexCache.value = built;
  return built;
}

export function listVendors(): string[] {
  return getFilamentIndex().vendors;
}

export function listTypes(vendor: string): string[] {
  return getFilamentIndex().typesByVendor.get(vendor) ?? [];
}

export function listSeries(vendor: string, type: string): string[] {
  return getFilamentIndex().seriesByVendorType.get(`${vendor}|||${type}`) ?? [];
}

export function listProfiles(vendor: string, type: string, series: string): FilamentProfileSummary[] {
  return getFilamentIndex().profilesByVendorTypeSeries.get(`${vendor}|||${type}|||${series}`) ?? [];
}

export function readProfile(vendor: string, type: string, series: string, fileName: string): FilamentProfile | null {
  const root = filamentsRootDir();
  const absPath = path.join(root, vendor, type, series, fileName);

  try {
    const raw = fs.readFileSync(absPath, "utf8");
    const json = JSON.parse(raw) as Record<string, unknown>;
    const summary = readProfileSummary(absPath, vendor, type, series, fileName);
    return { ...summary, json };
  } catch {
    return null;
  }
}


