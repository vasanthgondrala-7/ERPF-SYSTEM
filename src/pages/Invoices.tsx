import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { Receipt, Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const initialInvoices = [
  { id: "INV-001", customer: "ABC Corporation", amount: 45000, dueDate: "2024-12-15", status: "pending", project: "Highway Bridge" },
  { id: "INV-002", customer: "XYZ Industries", amount: 78500, dueDate: "2024-12-10", status: "paid", project: "Office Complex" },
  { id: "INV-003", customer: "BuildMax LLC", amount: 32000, dueDate: "2024-12-01", status: "overdue", project: "Residential Tower" },
  { id: "INV-004", customer: "Metro Developers", amount: 125000, dueDate: "2024-12-20", status: "pending", project: "Highway Bridge" },
  { id: "INV-005", customer: "Summit Constructions", amount: 67500, dueDate: "2024-12-08", status: "paid", project: "Office Complex" },
];

const Invoices = () => {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    customer: "",
    amount: "",
    dueDate: "",
    project: "",
  });
  const { toast } = useToast();

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateInvoice = () => {
    if (!newInvoice.customer || !newInvoice.amount || !newInvoice.dueDate) {
      toast({ variant: "destructive", title: "Please fill all required fields" });
      return;
    }

    const invoice = {
      id: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
      customer: newInvoice.customer,
      amount: parseFloat(newInvoice.amount),
      dueDate: newInvoice.dueDate,
      status: "pending",
      project: newInvoice.project,
    };

    setInvoices([invoice, ...invoices]);
    setNewInvoice({ customer: "", amount: "", dueDate: "", project: "" });
    setIsDialogOpen(false);
    toast({ title: "Invoice created successfully" });
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "paid": return "success";
      case "pending": return "warning";
      case "overdue": return "destructive";
      default: return "default";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold flex items-center gap-3">
              <Receipt className="w-8 h-8 text-primary" />
              Invoices
            </h1>
            <p className="text-muted-foreground">Manage accounts receivable and invoicing</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Invoice
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
                <DialogDescription>Add a new invoice to the system</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Customer Name</Label>
                  <Input
                    placeholder="Enter customer name"
                    value={newInvoice.customer}
                    onChange={(e) => setNewInvoice({ ...newInvoice, customer: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Amount ($)</Label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={newInvoice.amount}
                    onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input
                    type="date"
                    value={newInvoice.dueDate}
                    onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Project</Label>
                  <Select
                    value={newInvoice.project}
                    onValueChange={(value) => setNewInvoice({ ...newInvoice, project: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Highway Bridge">Highway Bridge Project</SelectItem>
                      <SelectItem value="Office Complex">Office Complex Phase 2</SelectItem>
                      <SelectItem value="Residential Tower">Residential Tower A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateInvoice}>Create Invoice</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search invoices..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Invoice Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-xl overflow-hidden"
        >
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6">Invoice ID</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6">Customer</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6">Project</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6">Due Date</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6">Status</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6">Amount</th>
                <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice, index) => (
                <motion.tr
                  key={invoice.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-t border-border/50 hover:bg-secondary/30 transition-colors"
                >
                  <td className="py-4 px-6 font-medium">{invoice.id}</td>
                  <td className="py-4 px-6">{invoice.customer}</td>
                  <td className="py-4 px-6 text-muted-foreground">{invoice.project}</td>
                  <td className="py-4 px-6 text-muted-foreground">{invoice.dueDate}</td>
                  <td className="py-4 px-6">
                    <StatusBadge variant={getStatusVariant(invoice.status)}>
                      {invoice.status}
                    </StatusBadge>
                  </td>
                  <td className="py-4 px-6 text-right font-semibold">${invoice.amount.toLocaleString()}</td>
                  <td className="py-4 px-6 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Eye className="w-4 h-4 mr-2" />View</DropdownMenuItem>
                        <DropdownMenuItem><Edit className="w-4 h-4 mr-2" />Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive"><Trash2 className="w-4 h-4 mr-2" />Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Invoices;
