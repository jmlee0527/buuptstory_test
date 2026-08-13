import type { MetadataRoute } from "next";
import { tests } from "@/data/tests";
import { absoluteUrl } from "@/lib/site";
import { articleCategories, articles } from "@/data/articles";
import { getDiscoveryMetadata } from "@/data/test-discovery";

type SitemapEntry = MetadataRoute.Sitemap[number];

/**
 * 검색 결과, API, 테스트 진행 쿼리, 개인별 결과 URL은 사이트맵에 넣지 않습니다.
 * 테스트 데이터가 단일 기준이므로 새 테스트를 등록하면 대표 랜딩 URL도 자동 반영됩니다.
 *
 * 테스트에는 신뢰할 수 있는 공개/수정일 필드가 아직 없으므로 임의의 lastModified를
 * 만들지 않습니다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const coreRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/tests"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/categories"), changeFrequency: "weekly", priority: 0.85 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/articles"), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/editorial-policy"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.4 },
    { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms"), changeFrequency: "yearly", priority: 0.3 },
  ];

  const testRoutes: MetadataRoute.Sitemap = tests.map((test) => {
    const createdAt = getDiscoveryMetadata(test).createdAt;
    return {
      url: absoluteUrl(test.href ?? `/tests/${test.slug}`),
      ...(createdAt ? { lastModified: new Date(createdAt) } : {}),
      changeFrequency: test.type === "fortune" ? "daily" : test.category === "팬 퀴즈" ? "weekly" : "monthly",
      priority: test.category === "팬 퀴즈" ? 0.85 : 0.8,
    };
  });

  const categoryRoutes: MetadataRoute.Sitemap = [
    ...new Set(tests.map((test) => test.category)),
  ].map((category) => ({
    url: absoluteUrl(`/category/${encodeURIComponent(category)}`),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(`/articles/${article.slug}`),
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const articleCategoryRoutes: MetadataRoute.Sitemap = articleCategories.map((category) => ({
    url: absoluteUrl(`/articles/category/${category.slug}`),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const uniqueRoutes = new Map<string, SitemapEntry>();
  for (const route of [...coreRoutes, ...testRoutes, ...categoryRoutes, ...articleRoutes, ...articleCategoryRoutes]) {
    uniqueRoutes.set(route.url, route);
  }

  return [...uniqueRoutes.values()];
}
