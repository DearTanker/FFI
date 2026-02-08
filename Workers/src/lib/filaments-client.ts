import { FilamentProfileSummary } from "./filaments";

export type ClientIndex = {
  vendors: string[];
  typesByVendor: Map<string, string[]>;
  seriesByVendorType: Map<string, string[]>;
  profilesByVendorTypeSeries: Map<string, FilamentProfileSummary[]>;
};

let indexCache: ClientIndex | null = null;

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

async function fetchTreeViaWorker(): Promise<GitHubTreeResponse> {
  const res = await fetch("/api/github/tree");
  const contentType = res.headers.get("content-type") ?? "";

  if (!res.ok) {
    console.error("Failed to fetch tree via worker:", res.status, res.statusText);
    const errBody = await res.json().catch(() => ({}));
    if (errBody && (errBody as any).details) {
      try {
        const detailsJson = JSON.parse((errBody as any).details as string);
        if (detailsJson.message && typeof detailsJson.message === "string") {
          if (detailsJson.message.includes("API rate limit exceeded")) {
            throw new Error("GitHub API rate limit exceeded. Please try again later or configure a GITHUB_TOKEN in the Worker.");
          }
          throw new Error(`GitHub API Error: ${detailsJson.message}`);
        }
      } catch {
        throw new Error(`Failed to fetch tree via worker: ${(errBody as any).details || res.statusText}`);
      }
    }
    throw new Error(`Failed to fetch tree via worker: ${res.statusText}`);
  }

  if (!contentType.includes("application/json")) {
    throw new Error("Worker did not return JSON for /api/github/tree, falling back to GitHub API directly.");
  }

  return res.json();
}

async function fetchTreeDirectFromGitHub(): Promise<GitHubTreeResponse> {
  const ghUrl = "https://api.github.com/repos/DearTanker/FFI/git/trees/main?recursive=1";
  const res = await fetch(ghUrl, {
    headers: {
      "User-Agent": "FDM-Filament-Info-Frontend",
      "Accept": "application/vnd.github+json"
    }
  });

  if (!res.ok) {
    let message = res.statusText;
    try {
      const body = await res.json();
      if (body && typeof body.message === "string") {
        message = body.message;
      }
    } catch {
    }
    throw new Error(`Failed to fetch tree directly from GitHub: ${message}`);
  }

  return res.json();
}

export async function fetchFilamentIndex(): Promise<ClientIndex> {
  if (indexCache) return indexCache;

  let treeData: GitHubTreeResponse;

  try {
    treeData = await fetchTreeViaWorker();
  } catch (e) {
    console.error(e);
    treeData = await fetchTreeDirectFromGitHub();
  }

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
      profilesByVendorTypeSeries
  };
  
  return indexCache;
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
