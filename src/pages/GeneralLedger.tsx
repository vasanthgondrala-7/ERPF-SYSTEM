import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { BookOpen, Plus, Search, ChevronRight, FileText, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";

const chartOfAccounts = [
  {
    category: "Assets",
    accounts: [
      { code: "1000", name: "Cash", balance: 245000, type: "Debit" },
      { code: "1100", name: "Accounts Receivable", balance: 328000, type: "Debit" },
      { code: "1200", name: "Inventory", balance: 156000, type: "Debit" },
      { code: "1300", name: "Equipment", balance: 890000, type: "Debit" },
    ],
  },
  {
    category: "Liabilities",
    accounts: [
      { code: "2000", name: "Accounts Payable", balance: 198000, type: "Credit" },
      { code: "2100", name: "Short-term Loans", balance: 150000, type: "Credit" },
      { code: "2200", name: "Accrued Expenses", balance: 45000, type: "Credit" },
    ],
  },
  {
    category: "Equity",
    accounts: [
      { code: "3000", name: "Owner's Equity", balance: 500000, type: "Credit" },
      { code: "3100", name: "Retained Earnings", balance: 326000, type: "Credit" },
    ],
  },
  {
    category: "Revenue",
    accounts: [
      { code: "4000", name: "Service Revenue", balance: 1250000, type: "Credit" },
      { code: "4100", name: "Project Revenue", balance: 890000, type: "Credit" },
    ],
  },
  {
    category: "Expenses",
    accounts: [
      { code: "5000", name: "Salaries Expense", balance: 420000, type: "Debit" },
      { code: "5100", name: "Rent Expense", balance: 96000, type: "Debit" },
      { code: "5200", name: "Utilities Expense", balance: 24000, type: "Debit" },
      { code: "5300", name: "Materials Expense", balance: 380000, type: "Debit" },
    ],
  },
];

const GeneralLedger = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Assets", "Liabilities"]);
  const { toast } = useToast();

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleAddEntry = () => {
    toast({ title: "Journal entry created successfully" });
    setIsDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              General Ledger
            </h1>
            <p className="text-muted-foreground">Chart of accounts and journal entries</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <FileText className="w-4 h-4" />
              Financial Statements
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Journal Entry
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Journal Entry</DialogTitle>
                  <DialogDescription>Create a new journal entry</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                  </div>
                  <div className="space-y-2">
                    <Label>Debit Account</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select account" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1000">1000 - Cash</SelectItem>
                        <SelectItem value="1100">1100 - Accounts Receivable</SelectItem>
                        <SelectItem value="1200">1200 - Inventory</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Credit Account</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select account" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4000">4000 - Service Revenue</SelectItem>
                        <SelectItem value="4100">4100 - Project Revenue</SelectItem>
                        <SelectItem value="2000">2000 - Accounts Payable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <Input type="number" placeholder="Enter amount" />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input placeholder="Enter description" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddEntry}>Create Entry</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search accounts..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        {/* Chart of Accounts */}
        <div className="space-y-4">
          {chartOfAccounts.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: groupIndex * 0.1 }}
              className="glass rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleCategory(group.category)}
                className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ChevronRight className={`w-5 h-5 transition-transform ${expandedCategories.includes(group.category) ? "rotate-90" : ""}`} />
                  <h3 className="font-display font-semibold text-lg">{group.category}</h3>
                  <span className="text-sm text-muted-foreground">({group.accounts.length} accounts)</span>
                </div>
                <span className="text-lg font-semibold">
                  ${group.accounts.reduce((sum, acc) => sum + acc.balance, 0).toLocaleString()}
                </span>
              </button>

              {expandedCategories.includes(group.category) && (
                <div className="border-t border-border">
                  <table className="w-full">
                    <thead className="bg-secondary/30">
                      <tr>
                        <th className="text-left text-xs font-medium text-muted-foreground uppercase py-3 px-6">Code</th>
                        <th className="text-left text-xs font-medium text-muted-foreground uppercase py-3 px-6">Account Name</th>
                        <th className="text-left text-xs font-medium text-muted-foreground uppercase py-3 px-6">Type</th>
                        <th className="text-right text-xs font-medium text-muted-foreground uppercase py-3 px-6">Balance</th>
                        <th className="text-center text-xs font-medium text-muted-foreground uppercase py-3 px-6">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.accounts.map((account) => (
                        <tr key={account.code} className="border-t border-border/50 hover:bg-secondary/20 transition-colors">
                          <td className="py-3 px-6 font-mono text-sm">{account.code}</td>
                          <td className="py-3 px-6 font-medium">{account.name}</td>
                          <td className="py-3 px-6 text-muted-foreground">{account.type}</td>
                          <td className="py-3 px-6 text-right font-semibold">${account.balance.toLocaleString()}</td>
                          <td className="py-3 px-6 text-center">
                            <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GeneralLedger;
