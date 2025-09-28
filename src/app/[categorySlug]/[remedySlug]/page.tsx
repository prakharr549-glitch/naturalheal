import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getRemedyBySlugs } from '@/lib/remedies';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Header from '@/components/Header';
import AdBanner from '@/components/AdBanner';
import RemedyRecommender from '@/components/RemedyRecommender';

type Props = {
  params: {
    categorySlug: string;
    remedySlug: string;
  };
};

export default function RemedyPage({ params }: Props) {
  const data = getRemedyBySlugs(params.categorySlug, params.remedySlug);

  if (!data) {
    notFound();
  }

  const { remedy, category } = data;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Button asChild variant="ghost">
              <Link href={`/${category.slug}`}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to {category.name}
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-4xl font-bold font-headline text-primary">{remedy.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold font-headline text-accent">Ingredients</h2>
                <p className="text-lg text-foreground/90">{remedy.ingredients}</p>
              </div>
              <Separator />
              {remedy.preparation && (
                <>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold font-headline text-accent">Preparation</h2>
                    <p className="text-lg text-foreground/90">{remedy.preparation}</p>
                  </div>
                  <Separator />
                </>
              )}
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold font-headline text-accent">How to Use</h2>
                <p className="text-lg text-foreground/90">{remedy.howToUse}</p>
              </div>
              <Separator />
               <RemedyRecommender ailment={category.name} originalRemedy={remedy.name} />
            </CardContent>
          </Card>
        </div>
      </main>
      <AdBanner />
    </div>
  );
}

export async function generateStaticParams() {
    const { getAllRemedies } = await import('@/lib/remedies');
    const remedies = getAllRemedies();

    return remedies.map(remedy => ({
        categorySlug: remedy.categorySlug,
        remedySlug: remedy.slug,
    }));
}
