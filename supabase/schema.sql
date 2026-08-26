-- ===============================================================
-- AI SMART RAILWAY MANAGEMENT SYSTEM - SUPABASE POSTGRESQL SCHEMA
-- Developer: MOHITH S | smohith002@gmail.com
-- ===============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. RAILWAY HIERARCHY TABLES
CREATE TABLE IF NOT EXISTS railway_zones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    headquarters VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS railway_divisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    zone_id UUID REFERENCES railway_zones(id) ON DELETE CASCADE,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    headquarters VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS stations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    division_id UUID REFERENCES railway_divisions(id) ON DELETE SET NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    category VARCHAR(50) DEFAULT 'STATION',
    total_platforms INT DEFAULT 2,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS platforms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    station_id UUID REFERENCES stations(id) ON DELETE CASCADE,
    platform_number INT NOT NULL,
    status VARCHAR(30) DEFAULT 'CLEAR',
    signal_aspect VARCHAR(30) DEFAULT 'GREEN',
    occupying_train_number VARCHAR(20),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(station_id, platform_number)
);

-- 2. RBAC & PROFILES TABLES
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE, -- Links to auth.users if Supabase Auth is enabled
    employee_id VARCHAR(50) UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(30),
    role VARCHAR(50) NOT NULL,
    zone_code VARCHAR(10),
    division_code VARCHAR(10),
    station_code VARCHAR(10),
    department VARCHAR(100),
    medical_category VARCHAR(10) DEFAULT 'A-1',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TRAIN & TELEMETRY TABLES
CREATE TABLE IF NOT EXISTS trains (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    train_number VARCHAR(20) UNIQUE NOT NULL,
    train_name VARCHAR(150) NOT NULL,
    train_type VARCHAR(50) NOT NULL,
    origin_station VARCHAR(10) NOT NULL,
    destination_station VARCHAR(10) NOT NULL,
    zone VARCHAR(10),
    division VARCHAR(10),
    rake_type VARCHAR(50),
    loco_number VARCHAR(50),
    total_coaches INT DEFAULT 16,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS train_positions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    train_id UUID REFERENCES trains(id) ON DELETE CASCADE,
    train_number VARCHAR(20) NOT NULL,
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    speed_kmph DECIMAL(6, 2) NOT NULL DEFAULT 0.0,
    heading_degrees DECIMAL(5, 2) NOT NULL DEFAULT 0.0,
    status VARCHAR(50) NOT NULL DEFAULT 'ON_TIME',
    next_station_code VARCHAR(10),
    previous_station_code VARCHAR(10),
    delay_minutes INT DEFAULT 0,
    source VARCHAR(100) NOT NULL,
    received_at TIMESTAMPTZ DEFAULT NOW(),
    provider_timestamp TIMESTAMPTZ NOT NULL,
    data_quality VARCHAR(30) DEFAULT 'EXCELLENT',
    current_track_section VARCHAR(100),
    signal_aspect VARCHAR(30) DEFAULT 'GREEN',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_train_pos_train_number ON train_positions(train_number);
CREATE INDEX IF NOT EXISTS idx_train_pos_provider_ts ON train_positions(provider_timestamp DESC);

CREATE TABLE IF NOT EXISTS train_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    train_id UUID REFERENCES trains(id) ON DELETE CASCADE,
    station_code VARCHAR(10) NOT NULL,
    station_name VARCHAR(100) NOT NULL,
    scheduled_arrival TIME,
    scheduled_departure TIME,
    platform VARCHAR(10),
    distance_km INT NOT NULL,
    halt_minutes INT DEFAULT 2,
    day_count INT DEFAULT 1,
    stop_sequence INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. STAFF ATTENDANCE TABLE
CREATE TABLE IF NOT EXISTS attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    employee_id VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PRESENT',
    sign_in_time TIMESTAMPTZ,
    sign_out_time TIMESTAMPTZ,
    duty_start_time TIMESTAMPTZ,
    duty_end_time TIMESTAMPTZ,
    station_code VARCHAR(10),
    geofence_verified BOOLEAN DEFAULT TRUE,
    remarks TEXT,
    is_corrected BOOLEAN DEFAULT FALSE,
    corrected_by VARCHAR(150),
    corrected_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(employee_id, date)
);

-- 5. DUTY & ROSTER MANAGEMENT TABLES
CREATE TABLE IF NOT EXISTS duties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    employee_id VARCHAR(50) NOT NULL,
    duty_type VARCHAR(50) NOT NULL,
    train_number VARCHAR(20),
    station_code VARCHAR(10),
    section_code VARCHAR(50),
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    reporting_location VARCHAR(150) NOT NULL,
    status VARCHAR(30) DEFAULT 'SCHEDULED',
    assigned_by VARCHAR(150) NOT NULL,
    instructions TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS duty_changes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    duty_id UUID REFERENCES duties(id) ON DELETE CASCADE,
    train_number VARCHAR(20),
    role VARCHAR(50) NOT NULL,
    original_staff_id VARCHAR(50) NOT NULL,
    original_staff_name VARCHAR(150) NOT NULL,
    replacement_staff_id VARCHAR(50) NOT NULL,
    replacement_staff_name VARCHAR(150) NOT NULL,
    reason TEXT NOT NULL,
    changed_by VARCHAR(150) NOT NULL,
    approval_status VARCHAR(30) DEFAULT 'APPROVED',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. EMERGENCY & INCIDENT MANAGEMENT TABLES
CREATE TABLE IF NOT EXISTS incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_number VARCHAR(50) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL,
    severity VARCHAR(30) NOT NULL DEFAULT 'MEDIUM',
    status VARCHAR(30) NOT NULL DEFAULT 'REPORTED',
    train_number VARCHAR(20),
    station_code VARCHAR(10),
    section VARCHAR(100),
    description TEXT NOT NULL,
    reported_by VARCHAR(150) NOT NULL,
    assigned_team VARCHAR(150),
    reported_at TIMESTAMPTZ DEFAULT NOW(),
    acknowledged_at TIMESTAMPTZ,
    resolved_at TIMESTAMPTZ,
    action_taken TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS operational_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    severity VARCHAR(30) DEFAULT 'INFO',
    target_audience VARCHAR(100) DEFAULT 'ALL',
    zone VARCHAR(10),
    division VARCHAR(10),
    train_number VARCHAR(20),
    station_code VARCHAR(10),
    is_active BOOLEAN DEFAULT TRUE,
    published_by VARCHAR(150) NOT NULL,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

-- 7. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(100) NOT NULL,
    user_name VARCHAR(150) NOT NULL,
    user_role VARCHAR(50) NOT NULL,
    action VARCHAR(100) NOT NULL,
    resource VARCHAR(100) NOT NULL,
    resource_id VARCHAR(100),
    previous_state JSONB,
    new_state JSONB,
    ip_address VARCHAR(50),
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 8. DATA SOURCES & HEALTH MONITOR
CREATE TABLE IF NOT EXISTS data_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    provider_type VARCHAR(50) NOT NULL,
    status VARCHAR(30) DEFAULT 'CONNECTED',
    last_successful_sync TIMESTAMPTZ DEFAULT NOW(),
    latency_ms INT DEFAULT 120,
    records_received_last_hour INT DEFAULT 0,
    error_rate_percentage DECIMAL(5,2) DEFAULT 0.0,
    circuit_breaker_open BOOLEAN DEFAULT FALSE,
    notes TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE duties ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Public read access for verified trains and stations
CREATE POLICY "Public trains read access" ON trains FOR SELECT USING (true);
CREATE POLICY "Public train positions read access" ON train_positions FOR SELECT USING (true);
CREATE POLICY "Public stations read access" ON stations FOR SELECT USING (true);
CREATE POLICY "Public alerts read access" ON operational_alerts FOR SELECT USING (is_active = true);

-- Staff self access policy
CREATE POLICY "Staff can view own attendance" ON attendance FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Staff can view own duties" ON duties FOR SELECT USING (auth.uid() = profile_id);

-- Enable Supabase Realtime for operational tables
ALTER PUBLICATION supabase_realtime ADD TABLE train_positions;
ALTER PUBLICATION supabase_realtime ADD TABLE attendance;
ALTER PUBLICATION supabase_realtime ADD TABLE duties;
ALTER PUBLICATION supabase_realtime ADD TABLE incidents;
ALTER PUBLICATION supabase_realtime ADD TABLE operational_alerts;
