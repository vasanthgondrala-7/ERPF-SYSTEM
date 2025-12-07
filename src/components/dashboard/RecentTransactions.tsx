import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, MoreHorizontal } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";

const transactions = [
  {
    id: 1,
    type: "inflow",
    description: "Payment from ABC Corp",
    amount: 45000,
    date: "Dec 5, 2024",
    status: "completed",
    invoice: "INV-1234",
  },
  {
    id: 2,
    type: "outflow",
    description: "Vendor payment - Steel Supplies",
    amount: 28500,
    date: "Dec 4, 2024",
    status: "completed",
    invoice: "PO-5678",
  },
  {
    id: 3,
    type: "inflow",
    description: "Project milestone - Tower A",
    amount: 120000,
    date: "Dec 3, 2024",
    status: "pending",
    invoice: "INV-1235",
  },
  {
    id: 4,
    type: "outflow",
    description: "Equipment rental",
    amount: 15000,
    date: "Dec 2, 2024",
    status: "completed",
    invoice: "PO-5679",
  },
  {
    id: 5,
    type: "inflow",
    description: "Payment from XYZ Industries",
    amount: 67500,
    date: "Dec 1, 2024",
    status: "completed",
    invoice: "INV-1236",
  },
];

export function RecentTransactions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="glass rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-display font-semibold">Recent Transactions</h3>
          <p className="text-sm text-muted-foreground">Latest financial activity</p>
        </div>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3">
                Transaction
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3">
                Reference
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3">
                Date
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3">
                Status
              </th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider py-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-border/50 hover:bg-secondary/50 transition-colors"
              >
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        tx.type === "inflow" ? "bg-success/10" : "bg-destructive/10"
                      }`}
                    >
                      {tx.type === "inflow" ? (
                        <ArrowDownLeft className="w-4 h-4 text-success" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{tx.description}</span>
                  </div>
                </td>
                <td className="py-4">
                  <span className="text-sm text-muted-foreground">{tx.invoice}</span>
                </td>
                <td className="py-4">
                  <span className="text-sm text-muted-foreground">{tx.date}</span>
                </td>
                <td className="py-4">
                  <StatusBadge
                    variant={tx.status === "completed" ? "success" : "warning"}
                  >
                    {tx.status}
                  </StatusBadge>
                </td>
                <td className="py-4 text-right">
                  <span
                    className={`text-sm font-semibold ${
                      tx.type === "inflow" ? "text-success" : "text-destructive"
                    }`}
                  >
                    {tx.type === "inflow" ? "+" : "-"}${tx.amount.toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
