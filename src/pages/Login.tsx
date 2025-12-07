import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock login - In production, this would call your backend API
    if (email && password) {
      localStorage.setItem("token", "mock-jwt-token");
      localStorage.setItem("user", JSON.stringify({ email, role: "admin" }));
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      navigate("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again.",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, hsl(222 47% 8%), hsl(222 47% 12%))",
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, hsl(173 80% 40% / 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, hsl(199 89% 48% / 0.1) 0%, transparent 50%)`
          }} />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-16 w-full">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center animate-glow">
              <Building2 className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl">BuildERP</h1>
              <p className="text-muted-foreground">Construction Finance System</p>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-6">
            <div className="glass rounded-xl p-6 max-w-md">
              <h3 className="font-display font-semibold text-lg mb-2 gradient-text">
                AI-Powered Insights
              </h3>
              <p className="text-muted-foreground text-sm">
                Get predictive risk scores, cash flow forecasts, and project health analysis
                powered by intelligent algorithms.
              </p>
            </div>

            <div className="glass rounded-xl p-6 max-w-md">
              <h3 className="font-display font-semibold text-lg mb-2 gradient-text">
                Complete Financial Control
              </h3>
              <p className="text-muted-foreground text-sm">
                Manage your general ledger, invoices, accounts receivable/payable, and
                multi-currency transactions in one place.
              </p>
            </div>

            <div className="glass rounded-xl p-6 max-w-md">
              <h3 className="font-display font-semibold text-lg mb-2 gradient-text">
                Real-time Project Tracking
              </h3>
              <p className="text-muted-foreground text-sm">
                Monitor construction projects, budgets, and timelines with live updates
                and automated alerts.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Panel - Login Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex items-center justify-center p-8"
      >
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="font-display font-bold text-xl">BuildERP</h1>
          </div>

          <div className="space-y-2 mb-8">
            <h2 className="text-3xl font-display font-bold">Welcome back</h2>
            <p className="text-muted-foreground">
              Sign in to access your construction finance dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Demo Credentials
                </span>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-secondary/50 text-sm">
              <p className="text-muted-foreground mb-2">Use any email and password to login:</p>
              <p><span className="text-muted-foreground">Email:</span> admin@builderp.com</p>
              <p><span className="text-muted-foreground">Password:</span> any password</p>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a href="/register" className="text-primary hover:text-primary/80 font-medium">
              Sign up for free
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
