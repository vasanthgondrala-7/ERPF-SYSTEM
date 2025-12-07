import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { ClipboardList, Search, Filter, Calendar, User, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { useState } from "react";

const auditLogs = [
  { id: 1, user: "John Smith", action: "Created Invoice", resource: "INV-006", timestamp: "2024-12-06 14:32:15", ip: "192.168.1.105", status: "success" },
  { id: 2, user: "Sarah Johnson", action: "Updated Budget", resource: "Highway Bridge Project", timestamp: "2024-12-06 13:45:22", ip: "192.168.1.108", status: "success" },
  { id: 3, user: "Michael Brown", action: "Login", resource: "System", timestamp: "2024-12-06 12:15:00", ip: "192.168.1.112", status: "success" },
  { id: 4, user: "Emily Davis", action: "Deleted Vendor", resource: "Steel Supplies Co", timestamp: "2024-12-06 11:30:45", ip: "192.168.1.115", status: "warning" },
  { id: 5, user: "John Smith", action: "Modified User Role", resource: "Sarah Johnson", timestamp: "2024-12-06 10:20:33", ip: "192.168.1.105", status: "success" },
  { id: 6, user: "Robert Wilson", action: "Failed Login", resource: "System", timestamp: "2024-12-06 09:15:00", ip: "192.168.1.120", status: "error" },
  { id: 7, user: "Sarah Johnson", action: "Approved Payment", resource: "PO-5680", timestamp: "2024-12-05 16:45:12", ip: "192.168.1.108", status: "success" },
  { id: 8, user: "Michael Brown", action: "Created Project", resource: "Residential Tower B", timestamp: "2024-12-05 15:30:00", ip: "192.168.1.112", status: "success" },
];

const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "success": return "success";
      case "warning": return "warning";
      case "error": return "destructive";
      default: return "default";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-display font-bold flex items-center gap-3">
            <ClipboardList className="w-8 h-8 text-primary" />
            Audit Logs
          </h1>
          <p className="text-muted-foreground">Track system activities and user actions</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            Date Range
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Logs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-xl overflow-hidden"
        >
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6">Timestamp</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6">User</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6">Action</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6">Resource</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6">IP Address</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="border-t border-border/50 hover:bg-secondary/30 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{log.timestamp}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{log.user}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-primary" />
                      <span>{log.action}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">{log.resource}</td>
                  <td className="py-4 px-6 font-mono text-sm text-muted-foreground">{log.ip}</td>
                  <td className="py-4 px-6">
                    <StatusBadge variant={getStatusVariant(log.status)}>{log.status}</StatusBadge>
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

export default AuditLogs;
