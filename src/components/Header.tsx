import Link from "next/link";
import Search from "./Search";
import { Leaf } from "lucide-react";

export default function Header() {
  return (
    <header className="py-6 px-4 border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
      <div className="container mx-auto flex justify-between items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold font-headline text-primary">
            Ayurveda Solutions
          </h1>
        </Link>
        <div className="w-full max-w-sm">
          <Search />
        </div>
      </div>
    </header>
  );
}
