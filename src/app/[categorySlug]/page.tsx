import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getCategoryBySlug } from '@/lib/remedies';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Leaf } from 'lucide-react';
import Header from '@/components/Header';
import AdBanner from '@/components/AdBanner';

type Props = {
  params: {
    categorySlug: string;
  };
};

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.categorySlug);

  if (!category) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button asChild variant="ghost">
            <Link href="/">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Link>
          </Button>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-center font-headline text-primary">{category.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.remedies.map((remedy) => (
            <Link href={`/${category.slug}/${remedy.slug}`} key={remedy.id} className="block">
              <Card className="h-full hover:bg-card/80 hover:border-primary transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline">
                    <Leaf className="w-5 h-5 text-accent" />
                    {remedy.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <AdBanner />
    </div>
  );
}

export async function generateStaticParams() {
    const { getCategories } = await import('@/lib/remedies');
    const categories = getCategories();

    return categories.map(category => ({
        categorySlug: category.slug,
    }));
}
