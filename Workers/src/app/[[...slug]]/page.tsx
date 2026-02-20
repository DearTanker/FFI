
import type { Metadata } from "next";
import FilamentsClient from "./FilamentsClient";
import { getFilamentIndex } from "@/lib/filaments";
import { toSegment, fromSegment } from "@/lib/segments";

const SITE_SUFFIX = "FDM Filaments Info";

export function generateMetadata({ params }: { params: { slug?: string[] } }): Metadata {
  const slug = params.slug ?? [];
  const vendor = slug[0] ? fromSegment(slug[0]) : undefined;
  const type = slug[1] ? fromSegment(slug[1]) : undefined;
  const series = slug[2] ? fromSegment(slug[2]) : undefined;
  const file = slug[3] ? fromSegment(slug[3]) : undefined;

  let title: string;
  if (file && vendor) {
    // 耗材丝设置页 - 从 displayName 提取 @ 后面的打印机型号
    const atIdx = file.indexOf('@');
    const printerModel = atIdx >= 0 ? file.substring(atIdx + 1).trim() : file;
    title = `${vendor}·${type}·${series}·${printerModel} - ${SITE_SUFFIX}`;
  } else if (series && vendor) {
    // 耗材系列页
    title = `${vendor}·${type}·${series} - ${SITE_SUFFIX}`;
  } else if (type && vendor) {
    // 耗材类型页
    title = `${vendor}·${type} - ${SITE_SUFFIX}`;
  } else if (vendor) {
    // 耗材品牌页
    title = `${vendor} - FDM 3D 打印耗材信息 - ${SITE_SUFFIX}`;
  } else {
    // 首页
    title = `FDM 3D 打印耗材信息 - ${SITE_SUFFIX}`;
  }

  return { title };
}

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
