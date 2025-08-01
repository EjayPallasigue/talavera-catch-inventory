import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Eye, Download, Package, Truck, CheckCircle } from "lucide-react";
import { format } from "date-fns";

interface PurchaseRecord {
  id: string;
  date: Date;
  supplierName: string;
  products: {
    name: string;
    quantity: number;
    unitCost: number;
    variation?: string;
  }[];
  totalCost: number;
  status: "ordered" | "shipped" | "delivered" | "cancelled";
  expectedDelivery?: Date;
  invoiceNumber?: string;
}

export const PurchaseRecords = () => {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [searchTerm, setSearchTerm] = useState("");

  const [purchaseRecords] = useState<PurchaseRecord[]>([
    {
      id: "PUR-2024-001",
      date: new Date("2024-01-10"),
      supplierName: "Pacific Seafood Wholesale",
      products: [
        { name: "Atlantic Salmon", quantity: 50, unitCost: 18.99, variation: "Whole Fish" },
        { name: "Pacific Tuna", quantity: 25, unitCost: 28.50, variation: "Whole Fish" }
      ],
      totalCost: 1662.00,
      status: "delivered",
      expectedDelivery: new Date("2024-01-12"),
      invoiceNumber: "PSW-2024-0847"
    },
    {
      id: "PUR-2024-002",
      date: new Date("2024-01-08"),
      supplierName: "Alaskan Crab Co.",
      products: [
        { name: "King Crab Legs", quantity: 30, unitCost: 65.00, variation: "1 lb portions" }
      ],
      totalCost: 1950.00,
      status: "shipped",
      expectedDelivery: new Date("2024-01-16"),
      invoiceNumber: "ACC-2024-0156"
    },
    {
      id: "PUR-2024-003",
      date: new Date("2024-01-05"),
      supplierName: "North Atlantic Fisheries",
      products: [
        { name: "Atlantic Salmon", quantity: 40, unitCost: 19.50, variation: "Filleted" },
        { name: "Cod", quantity: 30, unitCost: 12.99, variation: "Whole Fish" }
      ],
      totalCost: 1169.70,
      status: "ordered",
      expectedDelivery: new Date("2024-01-18")
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-500";
      case "shipped": return "bg-blue-500";
      case "ordered": return "bg-yellow-500";
      case "cancelled": return "bg-destructive";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return CheckCircle;
      case "shipped": return Truck;
      case "ordered": return Package;
      default: return Package;
    }
  };

  const totalCost = purchaseRecords
    .filter(record => record.status === "delivered")
    .reduce((sum, record) => sum + record.totalCost, 0);

  const pendingCost = purchaseRecords
    .filter(record => record.status === "ordered" || record.status === "shipped")
    .reduce((sum, record) => sum + record.totalCost, 0);

  return (
    <div className="space-y-6">
      {/* Purchase Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Purchases</p>
                <p className="text-2xl font-bold text-primary">${totalCost.toFixed(2)}</p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-bold text-yellow-600">${pendingCost.toFixed(2)}</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100">
                <Package className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-accent">{purchaseRecords.length}</p>
              </div>
              <div className="p-3 rounded-full bg-accent/10">
                <Truck className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search by supplier name or purchase ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, "MMM dd") : "From date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={setDateFrom}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? format(dateTo, "MMM dd") : "To date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={setDateTo}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Purchase Table */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Purchase ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expected Delivery</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseRecords.map((record) => {
                const StatusIcon = getStatusIcon(record.status);
                return (
                  <TableRow key={record.id}>
                    <TableCell className="font-mono text-sm">{record.id}</TableCell>
                    <TableCell>{format(record.date, "MMM dd, yyyy")}</TableCell>
                    <TableCell className="font-medium">{record.supplierName}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {record.products.map((product, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-medium">{product.name}</span>
                            {product.variation && (
                              <span className="text-muted-foreground"> ({product.variation})</span>
                            )}
                            <div className="text-xs text-muted-foreground">
                              Qty: {product.quantity} × ${product.unitCost}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-primary">
                      ${record.totalCost.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(record.status)} text-white flex items-center gap-1 w-fit`}>
                        <StatusIcon className="h-3 w-3" />
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {record.expectedDelivery && (
                        <span className="text-sm">
                          {format(record.expectedDelivery, "MMM dd, yyyy")}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm font-mono">
                      {record.invoiceNumber || "-"}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};