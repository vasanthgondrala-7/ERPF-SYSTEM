import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { Brain, TrendingUp, AlertTriangle, Target, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import { KpiCard } from "@/components/ui/kpi-card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const forecastData = [
  { month: "Jul", actual: 67000, forecast: null },
  { month: "Aug", actual: 72000, forecast: null },
  { month: "Sep", actual: 68000, forecast: null },
  { month: "Oct", actual: 75000, forecast: null },
  { month: "Nov", actual: 82000, forecast: null },
  { month: "Dec", actual: 78000, forecast: null },
  { month: "Jan", actual: null, forecast: 85000 },
  { month: "Feb", actual: null, forecast: 88000 },
  { month: "Mar", actual: null, forecast: 92000 },
];

const projectInsights = [
  {
    id: 1,
    name: "Highway Bridge Project",
    riskScore: 78,
    riskLevel: "High",
    planned: 70,
    actual: 55,
    insight: "Progress 15% behind schedule. Budget usage 84% with only 55% completion.",
    recommendation: "Consider resource reallocation or timeline extension.",
  },
  {
    id: 2,
    name: "Office Complex Phase 2",
    riskScore: 45,
    riskLevel: "Medium",
    planned: 60,
    actual: 60,
    insight: "On track but Q2 expenses exceeded estimates by 13%.",
    recommendation: "Monitor upcoming milestones closely.",
  },
  {
    id: 3,
    name: "Residential Tower A",
    riskScore: 22,
    riskLevel: "Low",
    planned: 50,
    actual: 48,
    insight: "Healthy project status. Budget aligned with progress.",
    recommendation: "Maintain current pace and resource allocation.",
  },
];

const Insights = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold flex items-center gap-3">
              <Brain className="w-8 h-8 text-primary" />
              AI Insights
            </h1>
            <p className="text-muted-foreground">
              Predictive analytics and intelligent recommendations for your projects
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh Analysis
          </Button>
        </div>

        {/* KPI Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KpiCard
            title="Average Risk Score"
            value="48"
            change="Medium overall risk"
            changeType="neutral"
            icon={AlertTriangle}
            delay={0}
          />
          <KpiCard
            title="Projects At Risk"
            value="3"
            change="Out of 24 active projects"
            changeType="negative"
            icon={Target}
            delay={0.1}
          />
          <KpiCard
            title="Forecasted Growth"
            value="+18%"
            change="Next quarter projection"
            changeType="positive"
            icon={TrendingUp}
            delay={0.2}
          />
        </div>

        {/* Cash Flow Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-display font-semibold">Cash Flow Forecast</h3>
              <p className="text-sm text-muted-foreground">
                6 months historical data + 3 months AI projection
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-warning" />
                <span className="text-muted-foreground">Forecast</span>
              </div>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(173, 80%, 40%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(173, 80%, 40%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222, 47%, 10%)",
                    border: "1px solid hsl(222, 30%, 18%)",
                    borderRadius: "8px",
                    color: "hsl(210, 40%, 98%)",
                  }}
                  formatter={(value: number) => [`$${value?.toLocaleString() || "N/A"}`, ""]}
                />
                <Area type="monotone" dataKey="actual" stroke="hsl(173, 80%, 40%)" strokeWidth={2} fill="url(#actualGradient)" />
                <Area type="monotone" dataKey="forecast" stroke="hsl(38, 92%, 50%)" strokeWidth={2} strokeDasharray="5 5" fill="url(#forecastGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Project Health Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-display font-semibold">Project Health Analysis</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered risk assessment and recommendations
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-4">
            {projectInsights.map((project) => (
              <div key={project.id} className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{project.name}</h4>
                    <StatusBadge
                      variant={
                        project.riskLevel === "High" ? "destructive" :
                        project.riskLevel === "Medium" ? "warning" : "success"
                      }
                    >
                      {project.riskLevel} Risk
                    </StatusBadge>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-display font-bold">{project.riskScore}</span>
                    <span className="text-sm text-muted-foreground">/100</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Planned Progress</span>
                      <span>{project.planned}%</span>
                    </div>
                    <Progress value={project.planned} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Actual Progress</span>
                      <span className={project.actual < project.planned ? "text-destructive" : "text-success"}>
                        {project.actual}%
                      </span>
                    </div>
                    <Progress value={project.actual} className="h-2" />
                  </div>
                </div>

                <div className="p-3 rounded bg-background/50">
                  <p className="text-sm mb-2"><strong>Insight:</strong> {project.insight}</p>
                  <p className="text-sm text-primary"><strong>Recommendation:</strong> {project.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Insights;
