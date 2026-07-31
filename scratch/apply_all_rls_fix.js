const https = require('https');

const SUPABASE_URL = "https://oayjeoljiwkzbvxfzuxy.supabase.co";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9heWplb2xqaXdremJ2eGZ6dXh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTQ5Mzc3OCwiZXhwIjoyMTAxMDY5Nzc4fQ.ZqV_3VosQJQ4wipFgwy_933OSPRYoie_XxyEX39dzHE";

const tables = ['leads', 'campaigns', 'opportunities', 'business_brain', 'intelligence_signals', 'inbox_messages', 'notifications', 'onboarding_workspaces', 'workspace_settings', 'profiles'];

function executeQuery(sql) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`);
    const body = JSON.stringify({ query: sql });
    
    const req = https.request(url, {
      method: 'POST',
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function applyRLSFixes() {
  console.log("⚡ APPLYING RLS FIXES FOR ALL MONITRIACH TABLES...");
  
  for (const table of tables) {
    const sql = `
      ALTER TABLE IF EXISTS ${table} ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Allow public select ${table}" ON ${table};
      DROP POLICY IF EXISTS "Allow public insert ${table}" ON ${table};
      DROP POLICY IF EXISTS "Allow public update ${table}" ON ${table};
      DROP POLICY IF EXISTS "Allow public delete ${table}" ON ${table};

      CREATE POLICY "Allow public select ${table}" ON ${table} FOR SELECT USING (true);
      CREATE POLICY "Allow public insert ${table}" ON ${table} FOR INSERT WITH CHECK (true);
      CREATE POLICY "Allow public update ${table}" ON ${table} FOR UPDATE USING (true);
      CREATE POLICY "Allow public delete ${table}" ON ${table} FOR DELETE USING (true);
    `;
    const res = await executeQuery(sql);
    console.log(`   Table ${table}: Status ${res.status}`);
  }
}

applyRLSFixes();
