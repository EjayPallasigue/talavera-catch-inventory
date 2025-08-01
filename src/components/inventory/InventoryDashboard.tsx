import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Fish, Package, TrendingUp, ShoppingCart } from "lucide-react";
import { ProductCatalog } from "./ProductCatalog";
import { SalesRecords } from "./SalesRecords";
import { PurchaseRecords } from "./PurchaseRecords";

export const InventoryDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    {
      title: "Total Products",
      value: "247",
      change: "+12%",
      icon: Fish,
      color: "bg-gradient-to-br from-primary to-primary-glow"
    },
    {
      title: "Low Stock Items",
      value: "8",
      change: "-2",
      icon: Package,
      color: "bg-gradient-to-br from-destructive to-orange-500"
    },
    {
      title: "Monthly Sales",
      value: "$45,672",
      change: "+18%",
      icon: TrendingUp,
      color: "bg-gradient-to-br from-accent to-cyan-400"
    },
    {
      title: "Active Orders",
      value: "23",
      change: "+5",
      icon: ShoppingCart,
      color: "bg-gradient-to-br from-secondary to-blue-300"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/85999b6d-54f3-48eb-aa3f-eb0802e5d23b.png" 
                alt="NC Talavera Seafoods" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold text-foreground">NC Talavera Seafoods</h1>
                <p className="text-muted-foreground">Inventory Management System</p>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary-glow transition-colors">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <Badge variant="secondary" className="text-xs">
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color} shadow-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products, categories, or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="catalog" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="catalog">Product Catalog</TabsTrigger>
            <TabsTrigger value="sales">Sales Records</TabsTrigger>
            <TabsTrigger value="purchases">Purchase Records</TabsTrigger>
          </TabsList>

          <TabsContent value="catalog">
            <ProductCatalog searchTerm={searchTerm} />
          </TabsContent>

          <TabsContent value="sales">
            <SalesRecords />
          </TabsContent>

          <TabsContent value="purchases">
            <PurchaseRecords />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};