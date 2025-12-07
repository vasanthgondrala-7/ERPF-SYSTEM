import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KpiCard } from "@/components/ui/kpi-card";
import { CashFlowChart } from "@/components/dashboard/CashFlowChart";
import { RiskInsights } from "@/components/dashboard/RiskInsights";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { BudgetChart } from "@/components/dashboard/BudgetChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import {
  DollarSign,
  FileText,
  Building2,
  TrendingUp,
} from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-display font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your construction finance overview.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Total Revenue"
            value="$1.2M"
            change="+12.5% from last month"
            changeType="positive"
            icon={DollarSign}
            delay={0}
          />
          <KpiCard
            title="Active Projects"
            value="24"
            change="+3 new this month"
            changeType="positive"
            icon={Building2}
            delay={0.1}
          />
          <KpiCard
            title="Pending Invoices"
            value="$328K"
            change="18 invoices"
            changeType="neutral"
            icon={FileText}
            delay={0.2}
          />
          <KpiCard
            title="Net Cash Flow"
            value="$89K"
            change="+8.2% from last month"
            changeType="positive"
            icon={TrendingUp}
            delay={0.3}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CashFlowChart />
          </div>
          <div>
            <AlertsPanel />
          </div>
        </div>

        {/* Risk & Budget Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RiskInsights />
          <BudgetChart />
        </div>

        {/* Recent Transactions */}
        <RecentTransactions />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
