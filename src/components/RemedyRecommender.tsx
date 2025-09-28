"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Loader2, Bot } from "lucide-react";
import { getRecommendation } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const FormSchema = z.object({
  ingredients: z.string().min(3, {
    message: "Please list at least one ingredient.",
  }),
});

type RemedyRecommenderProps = {
  ailment: string;
  originalRemedy: string;
};

export default function RemedyRecommender({ ailment, originalRemedy }: RemedyRecommenderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ingredients: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setRecommendation(null);
    const result = await getRecommendation({
      ailment,
      originalRemedy,
      availableIngredients: data.ingredients,
    });
    setIsLoading(false);
    
    if (result.success && result.recommendation) {
      setRecommendation(result.recommendation);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "An unknown error occurred.",
      });
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset state when dialog closes
      form.reset();
      setRecommendation(null);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full text-accent border-accent hover:bg-accent/10 hover:text-accent">
          <Wand2 className="mr-2 h-4 w-4" />
          Find an alternative with ingredients I have
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-primary">AI Remedy Recommender</DialogTitle>
          <DialogDescription>
            Don't have all the ingredients for '{originalRemedy}'? List what you have, and our AI will suggest an alternative.
          </DialogDescription>
        </DialogHeader>
        
        {!recommendation && (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                control={form.control}
                name="ingredients"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Available Ingredients</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="e.g., honey, ginger, lemon"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <DialogFooter>
                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Getting recommendation...
                            </>
                        ) : (
                            "Get Recommendation"
                        )}
                    </Button>
                </DialogFooter>
            </form>
            </Form>
        )}

        {recommendation && (
          <div className="mt-4">
             <Card className="bg-card/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-accent">
                        <Bot />
                        AI Recommendation
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{recommendation}</p>
                </CardContent>
            </Card>
            <DialogFooter className="mt-4">
              <Button onClick={() => setRecommendation(null)} variant="secondary">
                Try again
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
