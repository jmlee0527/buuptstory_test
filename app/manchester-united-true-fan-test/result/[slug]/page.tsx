import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ManchesterUnitedFanQuizResult } from "@/components/test/ManchesterUnitedFanQuizResult";
import { JsonLd } from "@/components/seo/JsonLd";
import { getManchesterUnitedGradeByKey, manchesterUnitedGrades } from "@/data/manchester-united-fan";
import { calculateManchesterUnitedResult, parseManchesterUnitedAnswers } from "@/lib/manchester-united-fan-engine";
import { absoluteUrl, createMetadata } from "@/lib/site";
type Props={params:Promise<{slug:string}>;searchParams:Promise<{r?:string}>};
export function generateStaticParams(){return manchesterUnitedGrades.map(grade=>({slug:grade.key}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const{slug}=await params;const grade=getManchesterUnitedGradeByKey(slug);return grade?{...createMetadata({title:`${grade.title} | 맨유 팬 퀴즈 결과`,description:`${grade.headline} 맨유 역사와 레전드 퀴즈로 나의 팬심을 확인해 보세요.`,path:`/manchester-united-true-fan-test/result/${slug}`,ogImage:false}),robots:{index:false,follow:true}}:{};}
export default async function Page({params,searchParams}:Props){const{slug}=await params;const{r}=await searchParams;const grade=getManchesterUnitedGradeByKey(slug);if(!grade)notFound();const answers=parseManchesterUnitedAnswers(r);if(answers){const actual=calculateManchesterUnitedResult(answers);if(actual.grade.key!==slug)redirect(`/manchester-united-true-fan-test/result/${actual.grade.key}?r=${r}`);}return <><ManchesterUnitedFanQuizResult answers={answers}/><JsonLd data={{"@context":"https://schema.org","@type":"WebPage",name:`맨유 팬 퀴즈 결과: ${grade.title}`,description:grade.description,url:absoluteUrl(`/manchester-united-true-fan-test/result/${slug}`),inLanguage:"ko-KR",isAccessibleForFree:true}}/></>;}
