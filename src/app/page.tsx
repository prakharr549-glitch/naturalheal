import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { getCategories } from '@/lib/remedies';
import { categoryIcons } from '@/lib/icons';
import Header from '@/components/Header';
import AdBanner from '@/components/AdBanner';

export default function Home() {
  const categories = getCategories();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section>
          <h2 className="text-3xl font-bold mb-6 text-center font-headline text-primary">Browse by Health Problem</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = categoryIcons[category.slug];
              return (
                <Link href={`/${category.slug}`} key={category.id}>
                  <Card className="hover:bg-card/80 hover:border-primary transition-colors duration-300 h-full flex flex-col justify-center">
                    <CardHeader className="flex flex-col items-center text-center gap-4">
                      {Icon && <Icon className="w-10 h-10 text-accent" />}
                      <CardTitle className="text-lg font-headline">{category.name}</CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <AdBanner />
    </div>
  );
}
