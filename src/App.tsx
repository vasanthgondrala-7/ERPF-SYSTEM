import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import Invoices from "./pages/Invoices";
import Users from "./pages/Users";
import AuditLogs from "./pages/AuditLogs";
import GeneralLedger from "./pages/GeneralLedger";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/users" element={<Users />} />
          <Route path="/audit" element={<AuditLogs />} />
          <Route path="/ledger" element={<GeneralLedger />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/accounts" element={<Navigate to="/ledger" replace />} />
          <Route path="/cashflow" element={<Navigate to="/dashboard" replace />} />
          <Route path="/vendors" element={<Navigate to="/invoices" replace />} />
          <Route path="/customers" element={<Navigate to="/invoices" replace />} />
          <Route path="/roles" element={<Navigate to="/users" replace />} />
          <Route path="/settings" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
