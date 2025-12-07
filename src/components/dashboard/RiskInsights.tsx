import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const projects = [
  {
    id: 1,
    name: "Highway Bridge Project",
    riskScore: 78,
    riskLevel: "High",
    budget: 500000,
    spent: 420000,
    progress: 55,
  },
  {
    id: 2,
    name: "Office Complex Phase 2",
    riskScore: 45,
    riskLevel: "Medium",
    budget: 1200000,
    spent: 680000,
    progress: 60,
  },
  {
    id: 3,
    name: "Residential Tower A",
    riskScore: 22,
    riskLevel: "Low",
    budget: 800000,
    spent: 380000,
    progress: 48,
  },
];

const getRiskVariant = (level: string) => {
  switch (level) {
    case "High":
      return "destructive";
    case "Medium":
      return "warning";
    case "Low":
      return "success";
    default:
      return "default";
  }
};

export function RiskInsights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-warning/10">
            <AlertTriangle className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-display font-semibold">AI Risk Insights</h3>
            <p className="text-sm text-muted-foreground">Project health analysis</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          View All <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <h4 className="font-medium text-sm">{project.name}</h4>
                <StatusBadge variant={getRiskVariant(project.riskLevel)}>
                  {project.riskLevel} Risk
                </StatusBadge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-display font-bold">{project.riskScore}</span>
                <span className="text-xs text-muted-foreground">/ 100</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-muted-foreground">Budget Usage</span>
                  <span className="font-medium">
                    {Math.round((project.spent / project.budget) * 100)}%
                  </span>
                </div>
                <Progress
                  value={(project.spent / project.budget) * 100}
                  className="h-1.5"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-1.5" />
              </div>
            </div>

            {project.riskLevel === "High" && (
              <div className="mt-3 p-2 rounded bg-destructive/10 text-destructive text-xs flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Budget usage exceeds progress by {Math.round((project.spent / project.budget) * 100 - project.progress)}%
              </div>
            )}
            {project.riskLevel === "Low" && (
              <div className="mt-3 p-2 rounded bg-success/10 text-success text-xs flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Project on track - budget aligned with progress
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
