"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getAllRemedies, type Remedy } from "@/lib/remedies";
import { cn } from "@/lib/utils";

type FullRemedy = Remedy & { categorySlug: string; categoryName: string };

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FullRemedy[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const allRemedies = getAllRemedies();

  useEffect(() => {
    if (query.length > 1) {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = allRemedies.filter(
        (remedy) =>
          remedy.name.toLowerCase().includes(lowerCaseQuery) ||
          remedy.ingredients.toLowerCase().includes(lowerCaseQuery) ||
          remedy.categoryName.toLowerCase().includes(lowerCaseQuery)
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSelect = (remedy: FullRemedy) => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    router.push(`/${remedy.categorySlug}/${remedy.slug}`);
  };
  
  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search for an ailment..."
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 1 && setIsOpen(true)}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        {results.length > 0 ? (
          <div className="max-h-96 overflow-y-auto">
            {results.map((remedy) => (
              <div
                key={remedy.id}
                onClick={() => handleSelect(remedy)}
                className="cursor-pointer p-3 hover:bg-muted"
              >
                <p className="font-semibold">{remedy.name}</p>
                <p className="text-sm text-muted-foreground">{remedy.categoryName}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="p-4 text-center text-sm text-muted-foreground">No results found.</p>
        )}
      </PopoverContent>
    </Popover>
  );
}
