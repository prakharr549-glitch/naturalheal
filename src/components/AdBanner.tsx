import { Card } from "./ui/card";

export default function AdBanner() {
  // TODO: Replace this with your actual AdMob banner implementation.
  // You will need to integrate the Google Mobile Ads SDK for this.
  const isAdLoaded = false; // Simulate ad state

  return (
    <aside className="py-4">
      <div className="container mx-auto">
        <Card className="h-20 flex items-center justify-center bg-card/50 border-dashed">
          {isAdLoaded ? (
            <div>{/* Your Ad Component Here */}</div>
          ) : (
            <p className="text-muted-foreground text-sm">AdMob Banner Placeholder</p>
          )}
        </Card>
      </div>
    </aside>
  );
}
