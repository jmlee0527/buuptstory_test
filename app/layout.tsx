import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { adsenseClientId } from "@/lib/adsense";
import { FeedbackReportButton } from "@/components/feedback/FeedbackReportButton";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import { SkipLink } from "@/components/i18n/SkipLink";

const googleTagManagerId = "GTM-N355VCGN";
const googleAnalyticsId = "G-QPDN3ZJ32G";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | 팬 퀴즈·성격·심리 테스트`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: `${siteConfig.name} 편집팀`, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  appleWebApp: { capable: true, title: siteConfig.name, statusBarStyle: "default" },
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website", locale: "ko_KR", url: siteConfig.url, siteName: siteConfig.name,
    title: `${siteConfig.name} | 팬 퀴즈·성격·심리 테스트`, description: siteConfig.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: { card: "summary_large_image", title: `${siteConfig.name} | 팬 퀴즈·성격·심리 테스트`, description: siteConfig.description, images: ["/opengraph-image"] },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.svg",
  },
  verification: {
    other: {
      "naver-site-verification": "97146937e1ed5736dc54af00fd6868844bcfe1de",
    },
  },
  other: {
    "google-adsense-account": adsenseClientId,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  category: "business",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#7C3AED", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${googleTagManagerId}');`}
        </Script>
      </head>
      <body className="min-h-screen antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script
          id="adsense-script"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics-config" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}');`}
        </Script>
        <LanguageProvider>
          <SkipLink />
          <JsonLd data={{
            "@context":"https://schema.org", "@type":"Organization", "@id":absoluteUrl("/#organization"),
            name:siteConfig.name, alternateName:[siteConfig.englishName, "미미 테스트", "memetest.co.kr"], url:siteConfig.url,
            logo:absoluteUrl("/icon.svg"), description:siteConfig.description,
          }} />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <FeedbackReportButton />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
