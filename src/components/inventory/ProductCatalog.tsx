import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Trash2, Plus, Fish, Package, Weight, Palette } from "lucide-react";

interface ProductVariation {
  id: string;
  type: string; // size, weight, grade, processing
  value: string;
  price: number;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  basePrice: number;
  totalStock: number;
  lowStockThreshold: number;
  variations: ProductVariation[];
  image?: string;
  description: string;
}

interface ProductCatalogProps {
  searchTerm: string;
}

export const ProductCatalog = ({ searchTerm }: ProductCatalogProps) => {
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "Atlantic Salmon",
      category: "Fresh Fish",
      sku: "SAL-ATL-001",
      basePrice: 24.99,
      totalStock: 45,
      lowStockThreshold: 10,
      description: "Premium Atlantic salmon, fresh daily catch",
      variations: [
        { id: "1a", type: "size", value: "Small (1-2 lbs)", price: 22.99, stock: 15 },
        { id: "1b", type: "size", value: "Medium (2-3 lbs)", price: 24.99, stock: 20 },
        { id: "1c", type: "size", value: "Large (3-4 lbs)", price: 27.99, stock: 10 },
        { id: "1d", type: "processing", value: "Filleted", price: 29.99, stock: 8 }
      ]
    },
    {
      id: "2", 
      name: "Pacific Tuna",
      category: "Fresh Fish",
      sku: "TUN-PAC-002",
      basePrice: 32.99,
      totalStock: 28,
      lowStockThreshold: 5,
      description: "Premium yellowfin tuna, sashimi grade",
      variations: [
        { id: "2a", type: "grade", value: "Sashimi Grade", price: 42.99, stock: 12 },
        { id: "2b", type: "grade", value: "Standard", price: 32.99, stock: 16 },
        { id: "2c", type: "processing", value: "Steaks", price: 35.99, stock: 8 }
      ]
    },
    {
      id: "3",
      name: "King Crab Legs",
      category: "Shellfish",
      sku: "CRB-KNG-003", 
      basePrice: 89.99,
      totalStock: 15,
      lowStockThreshold: 3,
      description: "Alaskan king crab legs, premium quality",
      variations: [
        { id: "3a", type: "weight", value: "1 lb", price: 89.99, stock: 8 },
        { id: "3b", type: "weight", value: "2 lbs", price: 169.99, stock: 5 },
        { id: "3c", type: "processing", value: "Pre-cooked", price: 94.99, stock: 2 }
      ]
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatusColor = (stock: number, threshold: number) => {
    if (stock <= threshold) return "bg-destructive";
    if (stock <= threshold * 2) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getVariationIcon = (type: string) => {
    switch (type) {
      case "size": return Package;
      case "weight": return Weight;
      case "grade": return Fish;
      case "processing": return Palette;
      default: return Package;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow border-border">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg text-foreground">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <p className="text-xs text-muted-foreground font-mono">{product.sku}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${getStockStatusColor(
                      product.totalStock,
                      product.lowStockThreshold
                    )}`}
                  />
                  <span className="text-sm font-medium">{product.totalStock}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    ${product.basePrice.toFixed(2)}
                  </span>
                  <Badge variant="secondary">{product.variations.length} variations</Badge>
                </div>

                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setSelectedProduct(product)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                          <Fish className="h-5 w-5 text-primary" />
                          <span>{selectedProduct?.name}</span>
                        </DialogTitle>
                      </DialogHeader>
                      {selectedProduct && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="font-semibold mb-3">Product Information</h3>
                              <div className="space-y-2 text-sm">
                                <div><strong>Category:</strong> {selectedProduct.category}</div>
                                <div><strong>SKU:</strong> {selectedProduct.sku}</div>
                                <div><strong>Base Price:</strong> ${selectedProduct.basePrice.toFixed(2)}</div>
                                <div><strong>Total Stock:</strong> {selectedProduct.totalStock}</div>
                                <div><strong>Low Stock Alert:</strong> {selectedProduct.lowStockThreshold}</div>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-3">Description</h3>
                              <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold mb-3">Product Variations</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {selectedProduct.variations.map((variation) => {
                                const Icon = getVariationIcon(variation.type);
                                return (
                                  <Card key={variation.id} className="p-4">
                                    <div className="flex items-start justify-between">
                                      <div className="flex items-center space-x-2">
                                        <Icon className="h-4 w-4 text-primary" />
                                        <div>
                                          <p className="font-medium text-sm">{variation.value}</p>
                                          <p className="text-xs text-muted-foreground capitalize">{variation.type}</p>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <p className="font-semibold text-primary">${variation.price.toFixed(2)}</p>
                                        <p className="text-xs text-muted-foreground">Stock: {variation.stock}</p>
                                      </div>
                                    </div>
                                  </Card>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="p-12 text-center">
          <Fish className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria</p>
        </Card>
      )}
    </div>
  );
};