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

export const LayoutVariant2 = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    { title: "Total Products", value: "247", change: "+12%", icon: Fish, color: "bg-gradient-to-br from-primary to-primary-glow" },
    { title: "Low Stock Items", value: "8", change: "-2", icon: Package, color: "bg-gradient-to-br from-destructive to-orange-500" },
    { title: "Monthly Sales", value: "$45,672", change: "+18%", icon: TrendingUp, color: "bg-gradient-to-br from-accent to-cyan-400" },
    { title: "Active Orders", value: "23", change: "+5", icon: ShoppingCart, color: "bg-gradient-to-br from-secondary to-blue-300" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Variant 2: Centered Hero Section */}
      <div className="bg-gradient-to-br from-primary to-primary-glow text-white">
        <div className="container mx-auto px-6 py-12 text-center">
          <img src="/lovable-uploads/85999b6d-54f3-48eb-aa3f-eb0802e5d23b.png" alt="NC Talavera Seafoods" className="h-16 w-auto mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">NC Talavera Seafoods</h1>
          <p className="text-xl opacity-90 mb-6">Inventory Management System</p>
          <Button size="lg" variant="secondary" className="shadow-lg">
            <Plus className="mr-2 h-5 w-5" />
            Add New Product
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats in 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <div className="flex items-center space-x-6">
                  <div className={`p-4 rounded-xl ${stat.color} shadow-lg`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-medium text-muted-foreground">{stat.title}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      <Badge variant="secondary" className="text-sm">{stat.change}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search with enhanced styling */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Search & Filter Products</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input placeholder="Search products, categories, or SKU..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-12 h-12 text-lg" />
              </div>
              <Button variant="outline" size="lg">Advanced Filter</Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Tabs */}
        <Tabs defaultValue="catalog" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 h-14 text-lg">
            <TabsTrigger value="catalog" className="text-lg">Product Catalog</TabsTrigger>
            <TabsTrigger value="sales" className="text-lg">Sales Records</TabsTrigger>
            <TabsTrigger value="purchases" className="text-lg">Purchase Records</TabsTrigger>
          </TabsList>
          <TabsContent value="catalog"><ProductCatalog searchTerm={searchTerm} /></TabsContent>
          <TabsContent value="sales"><SalesRecords /></TabsContent>
          <TabsContent value="purchases"><PurchaseRecords /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};