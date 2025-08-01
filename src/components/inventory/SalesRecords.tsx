import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Eye, Download, TrendingUp, DollarSign } from "lucide-react";
import { format } from "date-fns";

interface SaleRecord {
  id: string;
  date: Date;
  customerName: string;
  products: {
    name: string;
    quantity: number;
    price: number;
    variation?: string;
  }[];
  totalAmount: number;
  status: "completed" | "pending" | "cancelled";
  paymentMethod: string;
}

export const SalesRecords = () => {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [searchTerm, setSearchTerm] = useState("");

  const [salesRecords] = useState<SaleRecord[]>([
    {
      id: "SAL-2024-001",
      date: new Date("2024-01-15"),
      customerName: "Ocean View Restaurant",
      products: [
        { name: "Atlantic Salmon", quantity: 10, price: 24.99, variation: "Medium (2-3 lbs)" },
        { name: "King Crab Legs", quantity: 5, price: 89.99, variation: "1 lb" }
      ],
      totalAmount: 699.85,
      status: "completed",
      paymentMethod: "Credit Card"
    },
    {
      id: "SAL-2024-002", 
      date: new Date("2024-01-14"),
      customerName: "Seafood Market Plus",
      products: [
        { name: "Pacific Tuna", quantity: 8, price: 42.99, variation: "Sashimi Grade" },
        { name: "Atlantic Salmon", quantity: 15, price: 29.99, variation: "Filleted" }
      ],
      totalAmount: 793.77,
      status: "completed",
      paymentMethod: "Bank Transfer"
    },
    {
      id: "SAL-2024-003",
      date: new Date("2024-01-13"),
      customerName: "Coastal Bistro",
      products: [
        { name: "King Crab Legs", quantity: 3, price: 169.99, variation: "2 lbs" }
      ],
      totalAmount: 509.97,
      status: "pending",
      paymentMethod: "Invoice"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "cancelled": return "bg-destructive";
      default: return "bg-gray-500";
    }
  };

  const totalSales = salesRecords
    .filter(record => record.status === "completed")
    .reduce((sum, record) => sum + record.totalAmount, 0);

  const pendingSales = salesRecords
    .filter(record => record.status === "pending")
    .reduce((sum, record) => sum + record.totalAmount, 0);

  return (
    <div className="space-y-6">
      {/* Sales Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                <p className="text-2xl font-bold text-green-600">${totalSales.toFixed(2)}</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Sales</p>
                <p className="text-2xl font-bold text-yellow-600">${pendingSales.toFixed(2)}</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-primary">{salesRecords.length}</p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <Eye className="h-6 w-6 text-primary" />
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
                placeholder="Search by customer name or order ID..."
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

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-mono text-sm">{record.id}</TableCell>
                  <TableCell>{format(record.date, "MMM dd, yyyy")}</TableCell>
                  <TableCell className="font-medium">{record.customerName}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {record.products.map((product, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-medium">{product.name}</span>
                          {product.variation && (
                            <span className="text-muted-foreground"> ({product.variation})</span>
                          )}
                          <div className="text-xs text-muted-foreground">
                            Qty: {product.quantity} × ${product.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-green-600">
                    ${record.totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(record.status)} text-white`}>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{record.paymentMethod}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};