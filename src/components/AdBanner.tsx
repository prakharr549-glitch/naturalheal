import { Card } from "./ui/card";

export default function AdBanner() {
  return (
    <aside className="py-4">
      <div className="container mx-auto">
        <Card className="h-20 flex items-center justify-center bg-card/50 border-dashed">
          <p className="text-muted-foreground text-sm">AdMob Banner</p>
        </Card>
      </div>
    </aside>
  );
}
