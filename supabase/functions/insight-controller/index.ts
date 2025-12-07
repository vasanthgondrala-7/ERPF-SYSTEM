import "https://deno.land/x/xhr@0.1.0/mod.ts";
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

    // Fetch data for analysis
    const [projectsResult, transactionsResult, invoicesResult] = await Promise.all([
      supabase.from('projects').select('*'),
      supabase.from('transactions').select('*').order('date', { ascending: false }).limit(100),
      supabase.from('invoices').select('*'),
    ]);

    const projects = projectsResult.data || [];
    const transactions = transactionsResult.data || [];
    const invoices = invoicesResult.data || [];

    console.log('Data fetched - Projects:', projects.length, 'Transactions:', transactions.length, 'Invoices:', invoices.length);

    // Generate insights based on data analysis
    const insights = generateInsights(projects, transactions, invoices);

    console.log('Insights generated:', insights.length);

    return new Response(
      JSON.stringify({ 
        insights,
        summary: {
          totalProjects: projects.length,
          totalTransactions: transactions.length,
          totalInvoices: invoices.length,
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in insight-controller:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function generateInsights(projects: any[], transactions: any[], invoices: any[]) {
  const insights: { type: string; title: string; description: string; severity: string }[] = [];

  // Project budget analysis
  const overBudgetProjects = projects.filter(p => p.spent > p.budget);
  if (overBudgetProjects.length > 0) {
    insights.push({
      type: 'budget_warning',
      title: 'Projects Over Budget',
      description: `${overBudgetProjects.length} project(s) have exceeded their allocated budget. Consider reviewing resource allocation.`,
      severity: 'high',
    });
  }

  // Cash flow analysis
  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0);
  const cashFlow = income - expenses;

  if (cashFlow < 0) {
    insights.push({
      type: 'cash_flow_warning',
      title: 'Negative Cash Flow',
      description: `Current cash flow is negative (${cashFlow.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}). Review expenses and accelerate receivables collection.`,
      severity: 'high',
    });
  } else if (cashFlow > 0) {
    insights.push({
      type: 'cash_flow_positive',
      title: 'Positive Cash Flow',
      description: `Healthy cash position with ${cashFlow.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} positive flow. Consider reinvestment opportunities.`,
      severity: 'low',
    });
  }

  // Invoice analysis
  const overdueInvoices = invoices.filter(i => 
    i.status === 'pending' && new Date(i.due_date) < new Date()
  );
  if (overdueInvoices.length > 0) {
    const overdueAmount = overdueInvoices.reduce((sum, i) => sum + Number(i.amount), 0);
    insights.push({
      type: 'invoice_overdue',
      title: 'Overdue Invoices',
      description: `${overdueInvoices.length} invoice(s) totaling ${overdueAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} are past due. Prioritize collection efforts.`,
      severity: 'medium',
    });
  }

  // Project progress analysis
  const slowProjects = projects.filter(p => {
    if (!p.start_date || !p.end_date) return false;
    const start = new Date(p.start_date).getTime();
    const end = new Date(p.end_date).getTime();
    const now = Date.now();
    const expectedProgress = Math.min(100, ((now - start) / (end - start)) * 100);
    return p.progress < expectedProgress - 20; // More than 20% behind schedule
  });

  if (slowProjects.length > 0) {
    insights.push({
      type: 'project_delay',
      title: 'Projects Behind Schedule',
      description: `${slowProjects.length} project(s) are significantly behind schedule. Review timelines and resource allocation.`,
      severity: 'medium',
    });
  }

  // Add general recommendation if data is sparse
  if (projects.length === 0 && transactions.length === 0) {
    insights.push({
      type: 'getting_started',
      title: 'Get Started',
      description: 'Add projects and transactions to start receiving AI-powered insights and recommendations.',
      severity: 'info',
    });
  }

  return insights;
}
