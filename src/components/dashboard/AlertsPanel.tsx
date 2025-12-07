import { motion } from "framer-motion";
import { Bell, Clock, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "Invoice #1234 Overdue",
    description: "Payment from ABC Corp is 5 days overdue",
    time: "2 minutes ago",
    icon: Clock,
  },
  {
    id: 2,
    type: "error",
    title: "Budget Alert",
    description: "Highway Bridge Project exceeded budget threshold",
    time: "1 hour ago",
    icon: AlertCircle,
  },
  {
    id: 3,
    type: "success",
    title: "Payment Received",
    description: "$45,000 received from XYZ Industries",
    time: "3 hours ago",
    icon: CheckCircle2,
  },
  {
    id: 4,
    type: "error",
    title: "Project Risk",
    description: "Office Complex Phase 2 shows progress deviation",
    time: "5 hours ago",
    icon: XCircle,
  },
  {
    id: 5,
    type: "info",
    title: "Vendor Update",
    description: "New vendor registration pending approval",
    time: "1 day ago",
    icon: Bell,
  },
];

const getAlertStyle = (type: string) => {
  switch (type) {
    case "error":
      return { variant: "destructive" as const, iconClass: "text-destructive" };
    case "warning":
      return { variant: "warning" as const, iconClass: "text-warning" };
    case "success":
      return { variant: "success" as const, iconClass: "text-success" };
    default:
      return { variant: "info" as const, iconClass: "text-info" };
  }
};

export function AlertsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass rounded-xl p-6 h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-destructive/10">
            <Bell className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h3 className="text-lg font-display font-semibold">Alerts & Notifications</h3>
            <p className="text-sm text-muted-foreground">{alerts.length} active alerts</p>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[320px] pr-4">
        <div className="space-y-3">
          {alerts.map((alert) => {
            const style = getAlertStyle(alert.type);
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
              >
                <div className={`p-1.5 rounded-md bg-secondary ${style.iconClass}`}>
                  <alert.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-medium truncate">{alert.title}</h4>
                    <StatusBadge variant={style.variant} dot={false} className="text-[10px] px-1.5 py-0.5">
                      {alert.type}
                    </StatusBadge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{alert.description}</p>
                  <span className="text-xs text-muted-foreground/70">{alert.time}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>
    </motion.div>
  );
}
