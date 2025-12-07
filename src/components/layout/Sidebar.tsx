import { cn } from "@/lib/utils";
import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  Settings,
  Shield,
  Building2,
  Receipt,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Brain,
  ClipboardList,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "AI Insights", href: "/insights", icon: Brain },
    ],
  },
  {
    title: "Finance",
    items: [
      { name: "General Ledger", href: "/ledger", icon: BookOpen },
      { name: "Invoices", href: "/invoices", icon: Receipt },
      { name: "Accounts", href: "/accounts", icon: DollarSign },
      { name: "Cash Flow", href: "/cashflow", icon: TrendingUp },
    ],
  },
  {
    title: "Management",
    items: [
      { name: "Projects", href: "/projects", icon: Building2 },
      { name: "Vendors", href: "/vendors", icon: FileText },
      { name: "Customers", href: "/customers", icon: Users },
    ],
  },
  {
    title: "Administration",
    items: [
      { name: "Users", href: "/users", icon: Users },
      { name: "Roles", href: "/roles", icon: Shield },
      { name: "Audit Logs", href: "/audit", icon: ClipboardList },
      { name: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen bg-sidebar border-r border-sidebar-border flex flex-col sticky top-0"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-sidebar-foreground">
                  BuildERP
                </h1>
                <p className="text-xs text-muted-foreground">Construction Finance</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {collapsed && (
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center mx-auto">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {navItems.map((group) => (
          <div key={group.title} className="mb-6">
            <AnimatePresence>
              {!collapsed && (
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2"
                >
                  {group.title}
                </motion.h3>
              )}
            </AnimatePresence>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
                      collapsed && "justify-center"
                    )}
                    activeClassName="bg-sidebar-accent text-primary font-medium"
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="text-sm whitespace-nowrap"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="h-12 border-t border-sidebar-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <ChevronLeft className="w-5 h-5" />
        )}
      </button>
    </motion.aside>
  );
}
