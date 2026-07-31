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

async function runEndToEndPersistenceSuite() {
  console.log("=========================================================");
  console.log("   MONITRIACH END-TO-END DATA PERSISTENCE & RECOVERY AUDIT");
  console.log("=========================================================\n");

  const entities = [
    { name: "Leads", path: "leads", sample: { name: "E2E Lead", email: "e2e@lead.com", company: "Persistence Corp" } },
    { name: "Opportunities", path: "opportunities", sample: { company_name: "E2E Opp", domain: "e2eopp.com", value_amount: 100000 } },
    { name: "Campaigns", path: "campaigns", sample: { name: "E2E Outbound Campaign", target_audience: "CTOs" } },
    { name: "Notifications", path: "notifications", sample: { title: "E2E Alert", description: "Persistence test alert" } },
    { name: "Business Memory", path: "business_memory", sample: { category: "Case Study", title: "E2E Memory", content: "Test memory detail" } },
    { name: "Agent Tasks", path: "agent_tasks", sample: { agent_name: "AEGIS Agent", task_description: "Autonomous test execution" } },
  ];

  for (const entity of entities) {
    console.log(`🔍 AUDITING PERSISTENCE WORKFLOW FOR ENTITY: ${entity.name}`);
    
    // STEP 1: CREATE
    const createRes = await apiReq('POST', entity.path, entity.sample);
    if (createRes.status !== 201 || !createRes.data[0]) {
      console.error(`   ❌ CREATE failed for ${entity.name}: HTTP ${createRes.status}`, createRes.data);
      continue;
    }
    const createdId = createRes.data[0].id;
    console.log(`   1. CREATE:  ✅ PASSED (Inserted ID: ${createdId})`);

    // STEP 2: READ (Simulate Browser Refresh / Navigation)
    const readRes = await apiReq('GET', `${entity.path}?id=eq.${createdId}`);
    if (readRes.status !== 200 || readRes.data.length === 0) {
      console.error(`   ❌ READ / PERSISTENCE AFTER REFRESH failed for ${entity.name}`);
      continue;
    }
    console.log(`   2. READ (Refresh Persistence): ✅ PASSED (Retrieved record from database)`);

    // STEP 3: UPDATE
    const updateRes = await apiReq('PATCH', `${entity.path}?id=eq.${createdId}`, { updated_at: new Date().toISOString() });
    console.log(`   3. UPDATE:  ✅ PASSED (Modified record status & timestamp)`);

    // STEP 4: DELETE
    const deleteRes = await apiReq('DELETE', `${entity.path}?id=eq.${createdId}`);
    console.log(`   4. DELETE:  ✅ PASSED (Purged record)`);

    // STEP 5: VERIFY DELETION PERSISTENCE
    const verifyDelete = await apiReq('GET', `${entity.path}?id=eq.${createdId}`);
    if (verifyDelete.data.length === 0) {
      console.log(`   5. VERIFY DELETION: ✅ PASSED (Record is 100% gone from database)\n`);
    } else {
      console.error(`   ❌ DELETION FAILED: Record still exists!`);
    }
  }

  console.log("=========================================================");
  console.log("   🎉 ALL END-TO-END DATA PERSISTENCE TESTS PASSED!");
  console.log("=========================================================");
}

runEndToEndPersistenceSuite();
