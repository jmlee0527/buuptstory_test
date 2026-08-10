import type { Metadata } from "next";

// 검색엔진용 URL은 배포 환경변수의 오래된 값에 영향받지 않도록 단일 도메인으로 고정합니다.
export const canonicalSiteUrl = "https://www.memetest.co.kr";

export const siteConfig = {
  name: "미미테스트",
  tagline: "나를 발견하는 순간",
  englishName: "Mimi Test",
  url: canonicalSiteUrl,
  description:
    "미미테스트는 재미있고 빠른 테스트로 나의 성향, 재능, 직장 스타일, 연애관과 가능성을 발견하는 종합 테스트 플랫폼입니다.",
  keywords: [
    "무료 테스트",
    "성향 테스트",
    "심리 테스트",
    "연애 테스트",
    "직장인 테스트",
    "부업 테스트",
    "미미테스트",
  ],
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function normalizeOfficialBrand(text: string) {
  return text
    .replace(/미미\s+테스트/g, siteConfig.name)
    .replace(/\bMimi\s*Test\b/gi, siteConfig.name)
    .replace(/\bMimiTest\b/g, siteConfig.name);
}

function stripSiteNameSuffix(title: string) {
  let normalized = normalizeOfficialBrand(title).trim();
  const suffixPattern = new RegExp(`\\s*(?:[|｜\\-–—:]\\s*)${siteConfig.name}\\s*$`);
  while (suffixPattern.test(normalized)) {
    normalized = normalized.replace(suffixPattern, "").trim();
  }
  return normalized;
}

function withSiteNameTitle(title: string) {
  const baseTitle = stripSiteNameSuffix(title);
  return baseTitle === siteConfig.name ? siteConfig.name : `${baseTitle} | ${siteConfig.name}`;
}

function withSiteNameDescription(description: string) {
  const normalized = normalizeOfficialBrand(description).trim();
  return normalized.includes(siteConfig.name) ? normalized : `${normalized} 미미테스트에서 확인해 보세요.`;
}

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  /** true면 레이아웃 title template(`%s | 사이트명`)을 적용하지 않고 title을 그대로 사용합니다. */
  absoluteTitle?: boolean;
  /** false면 og:image를 설정하지 않습니다. 라우트에 opengraph-image.tsx 파일 컨벤션이 있을 때 사용합니다. */
  ogImage?: boolean;
  /** 페이지별 대표 이미지 경로. */
  ogImagePath?: string;
};

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  absoluteTitle = false,
  ogImage = true,
  ogImagePath,
}: MetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const metadataTitle = absoluteTitle ? normalizeOfficialBrand(title) : stripSiteNameSuffix(title);
  const brandedTitle = absoluteTitle ? metadataTitle : withSiteNameTitle(title);
  const metadataDescription = withSiteNameDescription(description);
  const isResultPage = /\/result\/[^/]+\/?$/.test(path) || /^\/(enneagram|color-personality-test)\/[^/]+\/?$/.test(path);
  const socialImage = absoluteUrl(ogImagePath ?? "/opengraph-image");
  return {
    title: absoluteTitle ? { absolute: metadataTitle } : metadataTitle,
    description: metadataDescription,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: { canonical },
    openGraph: {
      type,
      locale: "ko_KR",
      siteName: siteConfig.name,
      title: brandedTitle,
      description: metadataDescription,
      url: canonical,
      ...(ogImage ? { images: [{ url: socialImage, width: 1200, height: 630, alt: brandedTitle }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description: metadataDescription,
      ...(ogImage ? { images: [socialImage] } : {}),
    },
    robots: {
      index: !isResultPage,
      follow: true,
      googleBot: { index: !isResultPage, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
  };
}
