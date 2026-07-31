-- MONITRIACH MIGRATION 011: REPOSITORY-WIDE RLS POLICIES FOR ALL TABLES & MODULES

DO $$ 
DECLARE 
    t text;
BEGIN
    FOR t IN 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
          AND table_type = 'BASE TABLE'
    LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', t);
        EXECUTE format('DROP POLICY IF EXISTS "Allow public select %I" ON %I;', t, t);
        EXECUTE format('DROP POLICY IF EXISTS "Allow public insert %I" ON %I;', t, t);
        EXECUTE format('DROP POLICY IF EXISTS "Allow public update %I" ON %I;', t, t);
        EXECUTE format('DROP POLICY IF EXISTS "Allow public delete %I" ON %I;', t, t);

        EXECUTE format('CREATE POLICY "Allow public select %I" ON %I FOR SELECT USING (true);', t, t);
        EXECUTE format('CREATE POLICY "Allow public insert %I" ON %I FOR INSERT WITH CHECK (true);', t, t);
        EXECUTE format('CREATE POLICY "Allow public update %I" ON %I FOR UPDATE USING (true);', t, t);
        EXECUTE format('CREATE POLICY "Allow public delete %I" ON %I FOR DELETE USING (true);', t, t);
    END LOOP;
END $$;
