const https = require('https');
const fs = require('fs');

const SUPABASE_URL = "https://oayjeoljiwkzbvxfzuxy.supabase.co";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9heWplb2xqaXdremJ2eGZ6dXh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTQ5Mzc3OCwiZXhwIjoyMTAxMDY5Nzc4fQ.ZqV_3VosQJQ4wipFgwy_933OSPRYoie_XxyEX39dzHE";

const sqlContent = fs.readFileSync('C:\\Users\\Hp\\.gemini\\antigravity\\scratch\\monitriach\\frontend\\supabase\\migrations\\009_revenue_intelligence.sql', 'utf8');

function executeSqlViaPgMeta(sql) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${SUPABASE_URL}/pg/query`);
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
      res.on('end', () => {
        resolve({ status: res.statusCode, data });
      });
    });
    req.on('error', reject);
    req.write(JSON.stringify({ query: sql }));
    req.end();
  });
}

async function runSqlMigration() {
  console.log("🚀 Executing 009_revenue_intelligence.sql DDL Migration on Supabase...");
  try {
    const res = await executeSqlViaPgMeta(sqlContent);
    console.log(`   Result: HTTP ${res.status}`, res.data.substring(0, 200));
  } catch (err) {
    console.error("   Error:", err.message);
  }
}

runSqlMigration();
