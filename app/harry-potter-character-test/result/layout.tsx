import { ResultDiscovery } from "@/components/discovery/ResultDiscovery";
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}<ResultDiscovery currentTestSlug="harry-potter-character-test" /></>; }
