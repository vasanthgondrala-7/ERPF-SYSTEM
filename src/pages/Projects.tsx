import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { Building2, Plus, Search, MoreHorizontal, MapPin, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/status-badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const projectsData = [
  { id: 1, name: "Highway Bridge Project", location: "Downtown Metro", budget: 500000, spent: 420000, progress: 55, status: "active", startDate: "2024-01-15", endDate: "2024-12-30" },
  { id: 2, name: "Office Complex Phase 2", location: "Business District", budget: 1200000, spent: 680000, progress: 60, status: "active", startDate: "2024-02-01", endDate: "2025-03-15" },
  { id: 3, name: "Residential Tower A", location: "Suburban Heights", budget: 800000, spent: 380000, progress: 48, status: "active", startDate: "2024-03-10", endDate: "2025-01-20" },
  { id: 4, name: "Shopping Mall Renovation", location: "Central Plaza", budget: 350000, spent: 340000, progress: 95, status: "completed", startDate: "2023-08-01", endDate: "2024-11-30" },
  { id: 5, name: "Industrial Warehouse", location: "Port Area", budget: 600000, spent: 150000, progress: 25, status: "active", startDate: "2024-06-15", endDate: "2025-06-15" },
  { id: 6, name: "Hospital Wing Extension", location: "Medical Center", budget: 2500000, spent: 0, progress: 0, status: "planning", startDate: "2025-01-01", endDate: "2026-06-30" },
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projectsData.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active": return "success";
      case "completed": return "info";
      case "planning": return "warning";
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
              <Building2 className="w-8 h-8 text-primary" />
              Projects
            </h1>
            <p className="text-muted-foreground">Manage construction projects and track progress</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search projects..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="glass rounded-xl p-6 hover:border-primary/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display font-semibold text-lg mb-1">{project.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    {project.location}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Project</DropdownMenuItem>
                    <DropdownMenuItem>View Invoices</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <StatusBadge variant={getStatusVariant(project.status)}>{project.status}</StatusBadge>
                  <span className="text-2xl font-display font-bold">{project.progress}%</span>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span>${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Start:</span>
                    <span>{project.startDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">End:</span>
                    <span>{project.endDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Budget Usage:</span>
                  <span className={`font-semibold ${(project.spent / project.budget) > 0.8 ? "text-destructive" : "text-success"}`}>
                    {Math.round((project.spent / project.budget) * 100)}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Projects;
