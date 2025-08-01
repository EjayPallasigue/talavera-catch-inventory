import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette } from "lucide-react";

export const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState("default");

  const themes = [
    {
      id: "default",
      name: "Deep Ocean",
      description: "Maritime blue theme with ocean depth",
      className: "",
      preview: "bg-gradient-to-br from-primary to-primary-glow"
    },
    {
      id: "coral",
      name: "Coral Reef",
      description: "Warm coral and seafoam theme",
      className: "theme-coral",
      preview: "bg-gradient-to-br from-primary to-primary-glow"
    },
    {
      id: "professional",
      name: "Professional Deep Sea",
      description: "Clean professional navy theme",
      className: "theme-professional",
      preview: "bg-gradient-to-br from-primary to-primary-glow"
    }
  ];

  const applyTheme = (theme: typeof themes[0]) => {
    // Remove existing theme classes
    document.documentElement.className = document.documentElement.className
      .split(' ')
      .filter(cls => !cls.startsWith('theme-'))
      .join(' ');
    
    // Apply new theme class
    if (theme.className) {
      document.documentElement.classList.add(theme.className);
    }
    
    setCurrentTheme(theme.id);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Choose Your Design Theme
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                currentTheme === theme.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => applyTheme(theme)}
            >
              <div className={`h-12 w-full rounded mb-3 ${theme.preview} ${theme.className}`}></div>
              <h3 className="font-semibold text-sm">{theme.name}</h3>
              <p className="text-xs text-muted-foreground">{theme.description}</p>
              <Button
                size="sm"
                className="w-full mt-2"
                variant={currentTheme === theme.id ? "default" : "outline"}
              >
                {currentTheme === theme.id ? "Selected" : "Select"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};