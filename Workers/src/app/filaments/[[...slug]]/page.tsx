
import FilamentsClient from "./FilamentsClient";
import { getFilamentIndex } from "@/lib/filaments";
import { toSegment } from "@/lib/segments";

export function generateStaticParams() {
  const params: Array<{ slug: string[] }> = [{ slug: [] }];
  
  try {
    const index = getFilamentIndex();
    
    // Generate params for each vendor
    for (const vendor of index.vendors) {
      params.push({ slug: [toSegment(vendor)] });
      
      const types = index.typesByVendor.get(vendor) ?? [];
      for (const type of types) {
        params.push({ slug: [toSegment(vendor), toSegment(type)] });
        
        const seriesList = index.seriesByVendorType.get(`${vendor}|||${type}`) ?? [];
        for (const series of seriesList) {
          params.push({ slug: [toSegment(vendor), toSegment(type), toSegment(series)] });
          
          const profiles = index.profilesByVendorTypeSeries.get(`${vendor}|||${type}|||${series}`) ?? [];
          for (const profile of profiles) {
            params.push({ 
              slug: [toSegment(vendor), toSegment(type), toSegment(series), toSegment(profile.displayName)] 
            });
          }
        }
      }
    }
  } catch (error) {
    console.error("Error generating static params:", error);
  }
  
  return params;
}

export default function Page() {
  return <FilamentsClient />;
}
