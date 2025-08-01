import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout, Palette } from "lucide-react";
import { ThemeSelector } from "./ThemeSelector";
import { LayoutVariant1 } from "./LayoutVariant1";
import { LayoutVariant2 } from "./LayoutVariant2";
import { LayoutVariant3 } from "./LayoutVariant3";

export const DesignSelector = () => {
  const [selectedLayout, setSelectedLayout] = useState<"selector" | "variant1" | "variant2" | "variant3">("selector");

  const layouts = [
    {
      id: "variant1" as const,
      name: "Classic Layout",
      description: "Traditional top header with horizontal stats grid",
      preview: "Traditional dashboard with header navigation"
    },
    {
      id: "variant2" as const,
      name: "Hero Layout",
      description: "Centered hero section with large stats cards",
      preview: "Modern layout with prominent hero section"
    },
    {
      id: "variant3" as const,
      name: "Sidebar Layout",
      description: "Professional sidebar with vertical stats overview",
      preview: "Sidebar navigation with compact statistics"
    }
  ];

  if (selectedLayout === "variant1") return <LayoutVariant1 />;
  if (selectedLayout === "variant2") return <LayoutVariant2 />;
  if (selectedLayout === "variant3") return <LayoutVariant3 />;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">NC Talavera Seafoods</h1>
          <p className="text-xl text-muted-foreground">Choose Your Preferred Design</p>
        </div>

        <ThemeSelector />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="h-5 w-5" />
              Select Layout Style
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {layouts.map((layout) => (
                <div
                  key={layout.id}
                  className="p-6 border rounded-lg cursor-pointer transition-all hover:shadow-lg hover:border-primary"
                  onClick={() => setSelectedLayout(layout.id)}
                >
                  <div className="h-32 bg-gradient-to-br from-muted to-muted-foreground/20 rounded mb-4 flex items-center justify-center">
                    <span className="text-sm text-muted-foreground text-center px-4">{layout.preview}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{layout.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{layout.description}</p>
                  <Button className="w-full" size="lg">
                    Try This Layout
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            Each layout contains the same powerful inventory management features with different visual presentation
          </p>
        </div>
      </div>
    </div>
  );
};