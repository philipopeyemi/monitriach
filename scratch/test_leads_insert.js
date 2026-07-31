const https = require('https');

const SUPABASE_URL = "https://oayjeoljiwkzbvxfzuxy.supabase.co";
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9heWplb2xqaXdremJ2eGZ6dXh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0OTM3NzgsImV4cCI6MjEwMTA2OTc3OH0.JT3JxC95sXJGDeFp-_vXWUkf8_EHuBErfN42oM8HUio";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9heWplb2xqaXdremJ2eGZ6dXh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTQ5Mzc3OCwiZXhwIjoyMTAxMDY5Nzc4fQ.ZqV_3VosQJQ4wipFgwy_933OSPRYoie_XxyEX39dzHE";

function apiReq(key, method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${SUPABASE_URL}/rest/v1/${path}`);
    const req = https.request(url, {
      method: method,
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
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

async function testLeadsInsert() {
  console.log("🔍 TESTING LEADS INSERTION & PERSISTENCE...");

  // 1. Try insert with ANON key
  const testLead = {
    name: "CSV Persistence Test Lead",
    email: `csv_test_${Date.now()}@example.com`,
    company: "CSV Corp",
    title: "Head of Growth",
    phone: "+1 555-0192",
    status: "NEW",
    intent_score: 90
  };

  console.log("1. Testing insert via ANON Key...");
  const anonRes = await apiReq(ANON_KEY, 'POST', 'leads', testLead);
  console.log(`   ANON Insert Status: HTTP ${anonRes.status}`, anonRes.data);

  console.log("\n2. Testing insert via SERVICE Key...");
  const serviceRes = await apiReq(SERVICE_KEY, 'POST', 'leads', testLead);
  console.log(`   SERVICE Insert Status: HTTP ${serviceRes.status}`, serviceRes.data);

  console.log("\n3. Testing GET leads via ANON Key...");
  const getRes = await apiReq(ANON_KEY, 'GET', 'leads?select=*');
  console.log(`   ANON GET Status: HTTP ${getRes.status}`, Array.isArray(getRes.data) ? `Retrieved ${getRes.data.length} leads` : getRes.data);
}

testLeadsInsert();
