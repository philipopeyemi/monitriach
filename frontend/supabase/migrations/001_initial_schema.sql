-- Migration: 001_initial_schema.sql
-- Description: Enables extensions and core helper functions

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
