import Link from "next/link";
import Search from "./Search";

export default function Header() {
  return (
    <header className="py-6 px-4 border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
      <div className="container mx-auto flex justify-between items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-primary">Natural Heal for Remedies</h1>
        </Link>
        <div className="w-full max-w-sm">
          <Search />
        </div>
      </div>
    </header>
  );
}
