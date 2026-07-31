const fs = require('fs');
const path = require('path');
const https = require('https');

const SUPABASE_URL = "https://oayjeoljiwkzbvxfzuxy.supabase.co";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9heWplb2xqaXdremJ2eGZ6dXh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTQ5Mzc3OCwiZXhwIjoyMTAxMDY5Nzc4fQ.ZqV_3VosQJQ4wipFgwy_933OSPRYoie_XxyEX39dzHE";
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9heWplb2xqaXdremJ2eGZ6dXh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0OTM3NzgsImV4cCI6MjEwMTA2OTc3OH0.JT3JxC95sXJGDeFp-_vXWUkf8_EHuBErfN42oM8HUio";

async function verifyLiveSupabaseConnection() {
  console.log("=== VERIFYING LIVE SUPABASE PROJECT CONNECTIVITY ===");
  console.log("Project URL:", SUPABASE_URL);

  const req = https.request(`${SUPABASE_URL}/rest/v1/`, {
    method: 'GET',
    headers: {
      'apikey': ANON_KEY,
      'Authorization': `Bearer ${ANON_KEY}`
    }
  }, (res) => {
    console.log(`Supabase REST Endpoint Health Status: HTTP ${res.statusCode} ${res.statusMessage}`);
  });

  req.on('error', (e) => {
    console.error("Connection Error:", e.message);
  });
  req.end();
}

verifyLiveSupabaseConnection();
