import { FilamentProfileSummary } from "./filaments";

export type BrandLink = {
  label: string;
  url: string;
};

export type BrandConfig = {
  displayName: string;
  links?: BrandLink[];
};

export type BrandsMap = Record<string, BrandConfig>;

export type ClientIndex = {
  vendors: string[];
  typesByVendor: Map<string, string[]>;
  seriesByVendorType: Map<string, string[]>;
  profilesByVendorTypeSeries: Map<string, FilamentProfileSummary[]>;
  brands: BrandsMap;
};

let indexCache: ClientIndex | null = null;

/** 清除客户端索引缓存，下次 fetchFilamentIndex 将重新请求 */
export function clearIndexCache(): void {
  indexCache = null;
}

type GitHubTreeNode = {
  path: string;
  mode: string;
  type: "blob" | "tree";
  sha: string;
  size?: number;
  url: string;
};

type GitHubTreeResponse = {
  sha: string;
  url: string;
  tree: GitHubTreeNode[];
  truncated: boolean;
};

export async function fetchFilamentIndex(): Promise<ClientIndex> {
  if (indexCache) return indexCache;

  // Fetch from our API proxy (bust=timestamp bypasses Cloudflare edge cache)
  const res = await fetch(`/api/github/tree?bust=${Date.now()}`);
  if (!res.ok) {
      console.error("Failed to fetch tree:", res.status, res.statusText);
      const errBody = await res.json().catch(() => ({}));
      if (errBody.details) {
         try {
            const detailsJson = JSON.parse(errBody.details);
            if (detailsJson.message && detailsJson.message.includes("API rate limit exceeded")) {
                throw new Error("GitHub API rate limit exceeded. Please try again later or configure a GITHUB_TOKEN.");
            }
            throw new Error(`GitHub API Error: ${detailsJson.message || errBody.details}`);
         } catch (e) {
            throw new Error(`Failed to fetch tree: ${errBody.details || res.statusText}`);
         }
      }
      throw new Error(`Failed to fetch tree: ${res.statusText}`);
  }
  
  const treeData: GitHubTreeResponse = await res.json();

  const vendors = new Set<string>();
  const typesByVendor = new Map<string, Set<string>>();
  const seriesByVendorType = new Map<string, Set<string>>();
  const profilesByVendorTypeSeries = new Map<string, FilamentProfileSummary[]>();

  for (const node of treeData.tree) {
    // Look for Filaments/Vendor/Type/Series/File.json
    if (!node.path.startsWith("Filaments/") || node.type !== "blob") continue;
    if (!node.path.endsWith(".json")) continue;

    const parts = node.path.split("/");
    // parts[0] is "Filaments"
    if (parts.length < 5) continue; 

    const vendor = parts[1];
    const type = parts[2];
    const series = parts[3];
    const fileName = parts[4];

    vendors.add(vendor);

    if (!typesByVendor.has(vendor)) typesByVendor.set(vendor, new Set());
    typesByVendor.get(vendor)!.add(type);

    const vendorTypeKey = `${vendor}|||${type}`;
    if (!seriesByVendorType.has(vendorTypeKey)) seriesByVendorType.set(vendorTypeKey, new Set());
    seriesByVendorType.get(vendorTypeKey)!.add(series);

    const key = `${vendor}|||${type}|||${series}`;
    if (!profilesByVendorTypeSeries.has(key)) profilesByVendorTypeSeries.set(key, []);
    
    // Use filename as displayName initially. Real content fetching happens later if needed.
    const displayName = fileName.replace(".json", "");
    
    profilesByVendorTypeSeries.get(key)!.push({
        vendor, type, series, fileName, displayName, compatiblePrinters: [] 
    });
  }

  // Sort helper
  const sorter = (a: string, b: string) => a.localeCompare(b, "zh-Hans-CN", { numeric: true });

  const sortedVendors = Array.from(vendors).sort(sorter);
  
  const sortedTypesByVendor = new Map<string, string[]>();
  typesByVendor.forEach((set, v) => {
      sortedTypesByVendor.set(v, Array.from(set).sort(sorter));
  });

  const sortedSeriesByVendorType = new Map<string, string[]>();
  seriesByVendorType.forEach((set, k) => {
      sortedSeriesByVendorType.set(k, Array.from(set).sort(sorter));
  });
  
  // Sort profiles by displayName
  profilesByVendorTypeSeries.forEach((list) => {
      list.sort((a, b) => sorter(a.displayName, b.displayName));
  });

  indexCache = {
      vendors: sortedVendors,
      typesByVendor: sortedTypesByVendor,
      seriesByVendorType: sortedSeriesByVendorType,
      profilesByVendorTypeSeries,
      brands: await fetchBrandsConfig()
  };
  
  return indexCache;
}

async function fetchBrandsConfig(): Promise<BrandsMap> {
  try {
    const res = await fetch(`/api/github/content?path=${encodeURIComponent("Filaments/_brands.json")}`);
    if (!res.ok) return {};
    return await res.json();
  } catch {
    return {};
  }
}

export async function fetchProfileContent(path: string): Promise<Record<string, unknown>> {
    const res = await fetch(`/api/github/content?path=${encodeURIComponent(path)}`);
    if (!res.ok) throw new Error("Failed to fetch profile content");
    return res.json();
}

// Helper functions for Client Components
export function getVendors(index: ClientIndex): string[] {
  return index.vendors;
}

export function getTypes(index: ClientIndex, vendor: string): string[] {
  return index.typesByVendor.get(vendor) ?? [];
}

export function getSeries(index: ClientIndex, vendor: string, type: string): string[] {
  return index.seriesByVendorType.get(`${vendor}|||${type}`) ?? [];
}

export function getProfiles(index: ClientIndex, vendor: string, type: string, series: string): FilamentProfileSummary[] {
  return index.profilesByVendorTypeSeries.get(`${vendor}|||${type}|||${series}`) ?? [];
}

export function getBrandDisplayName(index: ClientIndex, vendor: string): string {
  return index.brands[vendor]?.displayName || vendor;
}

export function getBrandConfig(index: ClientIndex, vendor: string): BrandConfig | undefined {
  return index.brands[vendor];
}
