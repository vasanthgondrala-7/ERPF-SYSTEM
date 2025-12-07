import { supabase } from '@/integrations/supabase/client';

// ============= Projects API =============
export const projectsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  create: async (project: {
    name: string;
    client: string;
    budget: number;
    start_date?: string;
    end_date?: string;
  }) => {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  update: async (id: string, updates: Partial<{
    name: string;
    client: string;
    budget: number;
    spent: number;
    progress: number;
    status: string;
    start_date: string;
    end_date: string;
  }>) => {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// ============= Invoices API =============
export const invoicesApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('invoices')
      .select('*, projects(name)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('invoices')
      .select('*, projects(name)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  create: async (invoice: {
    invoice_number: string;
    client: string;
    amount: number;
    due_date: string;
    project_id?: string;
    notes?: string;
  }) => {
    const { data, error } = await supabase
      .from('invoices')
      .insert(invoice)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  update: async (id: string, updates: Partial<{
    client: string;
    amount: number;
    due_date: string;
    status: string;
    paid_date: string;
    notes: string;
  }>) => {
    const { data, error } = await supabase
      .from('invoices')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('invoices')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// ============= Transactions API =============
export const transactionsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*, projects(name), chart_of_accounts(name, code)')
      .order('date', { ascending: false });
    if (error) throw error;
    return data;
  },

  getRecent: async (limit = 10) => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*, projects(name)')
      .order('date', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data;
  },

  create: async (transaction: {
    description: string;
    amount: number;
    type: string;
    category?: string;
    project_id?: string;
    account_id?: string;
  }) => {
    const { data, error } = await supabase
      .from('transactions')
      .insert(transaction)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

// ============= Chart of Accounts API =============
export const accountsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('chart_of_accounts')
      .select('*')
      .order('code');
    if (error) throw error;
    return data;
  },

  create: async (account: {
    code: string;
    name: string;
    type: string;
    parent_id?: string;
  }) => {
    const { data, error } = await supabase
      .from('chart_of_accounts')
      .insert(account)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

// ============= Alerts API =============
export const alertsApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  getUnread: async () => {
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .eq('is_read', false)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  markAsRead: async (id: string) => {
    const { error } = await supabase
      .from('alerts')
      .update({ is_read: true })
      .eq('id', id);
    if (error) throw error;
  },
};

// ============= Profiles API =============
export const profilesApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*, user_roles(role)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  getCurrent: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*, user_roles(role)')
      .eq('user_id', userId)
      .single();
    if (error) throw error;
    return data;
  },

  update: async (userId: string, updates: Partial<{
    full_name: string;
    department: string;
    avatar_url: string;
  }>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

// ============= Audit Logs API =============
export const auditLogsApi = {
  getAll: async (limit = 100) => {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*, profiles!audit_logs_user_id_fkey(full_name)')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data;
  },
};

// ============= AI Insights API =============
export const insightsApi = {
  generateInsights: async (data: {
    projects?: any[];
    transactions?: any[];
    invoices?: any[];
  }) => {
    const { data: result, error } = await supabase.functions.invoke('insight-controller', {
      body: data,
    });
    if (error) throw error;
    return result;
  },
};
