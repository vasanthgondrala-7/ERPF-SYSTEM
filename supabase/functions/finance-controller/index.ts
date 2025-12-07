import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.log('No authorization header provided');
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify user
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      console.log('Auth error:', authError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('User authenticated:', user.id);

    const url = new URL(req.url);
    const action = url.searchParams.get('action');

    console.log('Action requested:', action);

    switch (action) {
      case 'dashboard-summary': {
        // Fetch comprehensive dashboard data
        const [
          projectsResult,
          invoicesResult,
          transactionsResult,
          alertsResult,
        ] = await Promise.all([
          supabase.from('projects').select('*'),
          supabase.from('invoices').select('*'),
          supabase.from('transactions').select('*').order('date', { ascending: false }).limit(50),
          supabase.from('alerts').select('*').eq('is_read', false).limit(10),
        ]);

        const projects = projectsResult.data || [];
        const invoices = invoicesResult.data || [];
        const transactions = transactionsResult.data || [];
        const alerts = alertsResult.data || [];

        // Calculate KPIs
        const totalBudget = projects.reduce((sum, p) => sum + Number(p.budget), 0);
        const totalSpent = projects.reduce((sum, p) => sum + Number(p.spent), 0);
        const totalInvoiceAmount = invoices.reduce((sum, i) => sum + Number(i.amount), 0);
        const paidInvoices = invoices.filter(i => i.status === 'paid');
        const paidAmount = paidInvoices.reduce((sum, i) => sum + Number(i.amount), 0);
        const pendingAmount = totalInvoiceAmount - paidAmount;

        // Cash flow calculation
        const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0);
        const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0);

        const summary = {
          kpis: {
            totalBudget,
            totalSpent,
            budgetUtilization: totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0,
            totalInvoiceAmount,
            paidAmount,
            pendingAmount,
            cashFlow: income - expenses,
            activeProjects: projects.filter(p => p.status === 'active').length,
            totalProjects: projects.length,
          },
          recentTransactions: transactions.slice(0, 10),
          alerts,
        };

        console.log('Dashboard summary generated');
        return new Response(
          JSON.stringify(summary),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'cash-flow-report': {
        const { data: transactions, error } = await supabase
          .from('transactions')
          .select('*')
          .order('date', { ascending: true });

        if (error) throw error;

        // Group by month
        const monthlyData: Record<string, { income: number; expenses: number }> = {};
        
        transactions?.forEach(t => {
          const month = t.date.substring(0, 7); // YYYY-MM
          if (!monthlyData[month]) {
            monthlyData[month] = { income: 0, expenses: 0 };
          }
          if (t.type === 'income') {
            monthlyData[month].income += Number(t.amount);
          } else {
            monthlyData[month].expenses += Number(t.amount);
          }
        });

        const report = Object.entries(monthlyData).map(([month, data]) => ({
          month,
          income: data.income,
          expenses: data.expenses,
          netCashFlow: data.income - data.expenses,
        }));

        console.log('Cash flow report generated');
        return new Response(
          JSON.stringify({ report }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'budget-analysis': {
        const { data: projects, error } = await supabase
          .from('projects')
          .select('*');

        if (error) throw error;

        const analysis = projects?.map(p => ({
          id: p.id,
          name: p.name,
          budget: p.budget,
          spent: p.spent,
          remaining: p.budget - p.spent,
          utilizationPercent: p.budget > 0 ? (p.spent / p.budget) * 100 : 0,
          status: p.spent > p.budget ? 'over_budget' : p.spent > p.budget * 0.9 ? 'warning' : 'on_track',
        }));

        console.log('Budget analysis generated');
        return new Response(
          JSON.stringify({ analysis }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        console.log('Invalid action:', action);
        return new Response(
          JSON.stringify({ error: 'Invalid action. Use: dashboard-summary, cash-flow-report, or budget-analysis' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

  } catch (error) {
    console.error('Error in finance-controller:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
