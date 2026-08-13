import { ResultDiscovery } from "@/components/discovery/ResultDiscovery";
import { tests } from "@/data/tests";
import { findTestByResultSlug } from "@/lib/test-discovery";

export default async function GenericResultLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const current = findTestByResultSlug(tests, slug);
  return <>{children}{current && <ResultDiscovery currentTestSlug={current.slug} />}</>;
}
