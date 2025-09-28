import Link from "next/link";
import Search from "./Search";
import Image from "next/image";

export default function Header() {
  return (
    <header className="py-6 px-4 border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
      <div className="container mx-auto flex justify-between items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://firebasestudio-hosting.web.app/projects/remedies-app/logo.png"
            alt="Natural Heal for Remedies Logo"
            width={150}
            height={40}
            className="object-contain"
            priority
          />
        </Link>
        <div className="w-full max-w-sm">
          <Search />
        </div>
      </div>
    </header>
  );
}
