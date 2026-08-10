import Link from "next/link";
import type { ArticleBlock } from "@/data/articles";

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return <div className="article-prose">{blocks.map((block, index) => {
    if (block.type === "h2") return <h2 key={index}>{block.text}</h2>;
    if (block.type === "h3") return <h3 key={index}>{block.text}</h3>;
    if (block.type === "paragraph") return <p key={index}>{block.text}</p>;
    if (block.type === "list") return <ul key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
    if (block.type === "blockquote") return <blockquote key={index}>{block.text}</blockquote>;
    if (block.type === "table") return <div key={index} className="my-7 overflow-x-auto"><table><thead><tr>{block.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
    if (block.type === "cta") return <aside key={index} className="my-9 rounded-2xl bg-blue-50 p-6"><h2 className="!mt-0 !text-xl">{block.title}</h2><p>{block.description}</p><Link href={block.href} className="mt-3 inline-flex min-h-12 items-center rounded-xl bg-primary px-5 text-sm font-black text-white hover:bg-blue-700">{block.label}</Link></aside>;
    if (block.type === "sources") return <section key={index} className="article-sources" aria-labelledby={`article-sources-${index}`}><h2 id={`article-sources-${index}`}>참고 자료</h2><ul>{block.items.map((item) => <li key={item.url}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a><span>{item.publisher} · 확인 {item.accessedAt.replaceAll("-", ".")}</span></li>)}</ul></section>;
    return <section key={index} className="my-10 border-t border-slate-200 pt-8"><h2 className="!mt-0">자주 묻는 질문</h2><div className="mt-5 space-y-5">{block.items.map((item) => <div key={item.question}><h3 className="!mt-0 text-base">{item.question}</h3><p className="!mt-2">{item.answer}</p></div>)}</div></section>;
  })}</div>;
}
