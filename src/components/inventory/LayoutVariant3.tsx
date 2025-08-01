import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Fish, Package, TrendingUp, ShoppingCart, Menu } from "lucide-react";
import { ProductCatalog } from "./ProductCatalog";
import { SalesRecords } from "./SalesRecords";
import { PurchaseRecords } from "./PurchaseRecords";

export const LayoutVariant3 = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    { title: "Total Products", value: "247", change: "+12%", icon: Fish, color: "bg-gradient-to-br from-primary to-primary-glow" },
    { title: "Low Stock Items", value: "8", change: "-2", icon: Package, color: "bg-gradient-to-br from-destructive to-orange-500" },
    { title: "Monthly Sales", value: "$45,672", change: "+18%", icon: TrendingUp, color: "bg-gradient-to-br from-accent to-cyan-400" },
    { title: "Active Orders", value: "23", change: "+5", icon: ShoppingCart, color: "bg-gradient-to-br from-secondary to-blue-300" }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Variant 3: Sidebar Layout */}
      <div className="w-80 bg-card border-r border-border shadow-lg">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3 mb-4">
            <img src="/lovable-uploads/85999b6d-54f3-48eb-aa3f-eb0802e5d23b.png" alt="NC Talavera Seafoods" className="h-10 w-auto" />
            <div>
              <h1 className="text-xl font-bold text-foreground">NC Talavera</h1>
              <p className="text-sm text-muted-foreground">Seafoods</p>
            </div>
          </div>
          <Button className="w-full bg-primary hover:bg-primary-glow">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Sidebar Stats - Vertical Layout */}
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Quick Overview</h3>
          {stats.map((stat, index) => (
            <Card key={index} className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${stat.color} shadow-md`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-muted-foreground truncate">{stat.title}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-lg font-bold text-foreground">{stat.value}</p>
                      <Badge variant="secondary" className="text-xs">{stat.change}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <div className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold text-foreground">Inventory Management</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Quick search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 w-64" />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <Tabs defaultValue="catalog" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="catalog">Catalog</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="purchases">Purchases</TabsTrigger>
            </TabsList>
            <TabsContent value="catalog"><ProductCatalog searchTerm={searchTerm} /></TabsContent>
            <TabsContent value="sales"><SalesRecords /></TabsContent>
            <TabsContent value="purchases"><PurchaseRecords /></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};