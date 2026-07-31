const https = require('https');

const SUPABASE_URL = "https://oayjeoljiwkzbvxfzuxy.supabase.co";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9heWplb2xqaXdremJ2eGZ6dXh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTQ5Mzc3OCwiZXhwIjoyMTAxMDY5Nzc4fQ.ZqV_3VosQJQ4wipFgwy_933OSPRYoie_XxyEX39dzHE";

function verifyTable(table) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${SUPABASE_URL}/rest/v1/${table}?select=*&limit=1`);
    const req = https.request(url, {
      method: 'GET',
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ table, status: res.statusCode, ok: res.statusCode === 200 });
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function verifyTablesExist() {
  const tables = [
    'company_research_jobs',
    'buying_signals',
    'pain_points',
    'icp_match_scores',
    'offer_recommendations',
    'executive_timeline_events',
    'business_memory'
  ];

  console.log("🔍 Checking Revenue Intelligence Engine tables in Supabase...");
  for (const t of tables) {
    const res = await verifyTable(t);
    console.log(`   Table '${t}': Status HTTP ${res.status} ${res.ok ? '✅ EXISTS' : '⚠️ NEED DDL EXECUTION'}`);
  }
}

verifyTablesExist();
