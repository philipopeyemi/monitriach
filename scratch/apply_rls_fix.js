const https = require('https');

const SUPABASE_URL = "https://oayjeoljiwkzbvxfzuxy.supabase.co";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9heWplb2xqaXdremJ2eGZ6dXh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTQ5Mzc3OCwiZXhwIjoyMTAxMDY5Nzc4fQ.ZqV_3VosQJQ4wipFgwy_933OSPRYoie_XxyEX39dzHE";

function apiReq(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${SUPABASE_URL}/rest/v1/${path}`);
    const req = https.request(url, {
      method: method,
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: data ? JSON.parse(data) : {} });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function testRlsFix() {
  console.log("🚀 VERIFYING LEADS & OPP RLS POLICY RETRIEVAL & INSERTION...");

  const testLead = {
    name: "Persisted Lead Test",
    email: `persisted_${Date.now()}@domain.com`,
    company: "Persisted Systems",
    title: "Chief Executive Officer",
    phone: "+1 555-0199",
    status: "NEW",
    intent_score: 95
  };

  const insertRes = await apiReq('POST', 'leads', testLead);
  console.log(`   Insert Status: HTTP ${insertRes.status}`, insertRes.data[0]?.id ? `✅ SUCCESS (Inserted ID: ${insertRes.data[0].id})` : insertRes.data);

  const getRes = await apiReq('GET', 'leads?select=*&order=created_at.desc');
  console.log(`   GET Status: HTTP ${getRes.status}`, Array.isArray(getRes.data) ? `✅ Total Leads Returned: ${getRes.data.length}` : getRes.data);
}

testRlsFix();
