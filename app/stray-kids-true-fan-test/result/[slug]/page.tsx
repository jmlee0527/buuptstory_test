import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { StrayKidsFanQuizResult } from "@/components/test/StrayKidsFanQuizResult";
import { JsonLd } from "@/components/seo/JsonLd";
import { getStrayKidsGradeBySlug, strayKidsGrades } from "@/data/stray-kids-fan";
import { calculateStrayKidsResult, parseStrayKidsAnswers } from "@/lib/stray-kids-fan-engine";
import { absoluteUrl, createMetadata } from "@/lib/site";
type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ r?: string }> };
export function generateStaticParams() { return strayKidsGrades.map((grade) => ({ slug: grade.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const grade = getStrayKidsGradeBySlug(slug); return grade ? { ...createMetadata({ title: `${grade.name} | 스트레이 키즈 팬 퀴즈 결과`, description: `${grade.headline} 스트레이 키즈 멤버·앨범·노래 퀴즈로 나의 STAY 팬심을 확인해 보세요.`, path: `/stray-kids-true-fan-test/result/${slug}`, ogImage: false }), robots: { index: false, follow: true } } : {}; }
export default async function Page({ params, searchParams }: Props) { const { slug } = await params; const { r } = await searchParams; const grade = getStrayKidsGradeBySlug(slug); if (!grade) notFound(); const answers = parseStrayKidsAnswers(r); if (answers) { const actual = calculateStrayKidsResult(answers); if (actual.grade.slug !== slug) redirect(`/stray-kids-true-fan-test/result/${actual.grade.slug}?r=${r}`); } return <><StrayKidsFanQuizResult answers={answers} /><JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: `스트레이 키즈 팬 퀴즈 결과: ${grade.name}`, description: grade.description, url: absoluteUrl(`/stray-kids-true-fan-test/result/${slug}`), inLanguage: "ko-KR", isAccessibleForFree: true }} /></>; }
