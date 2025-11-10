-- Forhem Analytics Schema Migration
-- Real-time node telemetry, uptime, and performance tracking
-- Created: 2025-11-08

-- ============================================================================
-- ENUMS FOR NODE OPERATIONS
-- ============================================================================

-- Node types for different Forhem infrastructure
CREATE TYPE node_type AS ENUM (
    'hello_smart_node',      -- Public Wi-Fi and community hubs
    'city_safe_node',        -- Emergency communication infrastructure
    'edge_infrastructure',   -- Distributed computing nodes
    'transit_node',          -- Public transportation connectivity
    'park_node'              -- Parks and public spaces connectivity
);

-- Node operational status
CREATE TYPE node_status AS ENUM (
    'active',               -- Online and functioning normally
    'inactive',             -- Offline or decommissioned
    'maintenance',          -- Scheduled maintenance
    'degraded',             -- Operating with reduced functionality
    'error',                -- Critical error or failure
    'pending_install',      -- Awaiting installation
    'testing'               -- In testing phase
);

-- Alert severity levels
CREATE TYPE alert_severity AS ENUM (
    'critical',             -- Immediate attention required
    'high',                 -- Urgent attention needed
    'medium',               -- Attention required
    'low',                  -- Informational
    'info'                  -- System information
);

-- Network connection types
CREATE TYPE connection_type AS ENUM (
    'fiber',                -- Fiber optic connection
    'cable',                -- Cable broadband
    'dsl',                  -- DSL connection
    'wireless',             -- Wireless/cellular
    'satellite',            -- Satellite connection
    'mesh'                  -- Mesh network topology
);

-- ============================================================================
-- CORE TABLES FOR NODE MANAGEMENT
-- ============================================================================

-- Cities and municipalities that Forhem partners with
CREATE TABLE public.cities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    state_province TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'USA',
    population INTEGER,
    contact_email TEXT,
    partnership_start_date DATE,
    partnership_status TEXT DEFAULT 'active', -- active, pending, inactive
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Partners (building owners, organizations, city departments)
CREATE TABLE public.partners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    city_id UUID REFERENCES public.cities(id) ON DELETE SET NULL,
    organization_name TEXT NOT NULL,
    partner_type TEXT NOT NULL, -- 'building_owner', 'city_department', 'nonprofit', 'business'
    contact_name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    address TEXT,
    status TEXT DEFAULT 'pending', -- pending, approved, active, inactive
    partnership_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Physical node deployments
CREATE TABLE public.nodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    node_id TEXT UNIQUE NOT NULL, -- Physical node identifier (e.g., "SF-HSN-001")
    partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE,
    city_id UUID REFERENCES public.cities(id) ON DELETE CASCADE,
    node_type node_type NOT NULL,
    status node_status DEFAULT 'pending_install',

    -- Physical location
    location_name TEXT, -- e.g., "Main Library", "City Hall"
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    floor_number TEXT,
    coordinates_json JSONB, -- Additional location data

    -- Network information
    connection_type connection_type,
    ip_address INET,
    mac_address TEXT,
    bandwidth_mbps INTEGER,

    -- Hardware information
    manufacturer TEXT,
    model TEXT,
    serial_number TEXT,
    firmware_version TEXT,
    install_date TIMESTAMPTZ,
    last_maintenance_date TIMESTAMPTZ,

    -- Configuration and settings
    configuration JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}', -- Additional flexible data

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- TELEMETRY AND PERFORMANCE DATA
-- ============================================================================

-- Real-time telemetry data from nodes
CREATE TABLE public.node_telemetry (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    node_id UUID REFERENCES public.nodes(id) ON DELETE CASCADE,

    -- Timestamp for this reading
    recorded_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    -- Network performance metrics
    network_status BOOLEAN DEFAULT true, -- Online/offline status
    uptime_seconds BIGINT DEFAULT 0, -- Cumulative uptime in seconds
    downtime_seconds BIGINT DEFAULT 0, -- Cumulative downtime in seconds
    network_latency_ms DECIMAL(8, 2), -- Ping latency in milliseconds
    download_speed_mbps DECIMAL(8, 2),
    upload_speed_mbps DECIMAL(8, 2),
    packet_loss_percent DECIMAL(5, 2) DEFAULT 0,

    -- System health metrics
    cpu_usage_percent DECIMAL(5, 2) DEFAULT 0,
    memory_usage_percent DECIMAL(5, 2) DEFAULT 0,
    disk_usage_percent DECIMAL(5, 2) DEFAULT 0,
    temperature_celsius DECIMAL(5, 2),

    -- Power and environmental metrics
    power_usage_watts DECIMAL(8, 2),
    battery_level_percent DECIMAL(5, 2),
    external_power_connected BOOLEAN DEFAULT true,

    -- Service-specific metrics
    wifi_users_connected INTEGER DEFAULT 0,
    data_transferred_mb DECIMAL(12, 2) DEFAULT 0,
    emergency_calls_made INTEGER DEFAULT 0,

    -- Error and status information
    error_count INTEGER DEFAULT 0,
    last_error_message TEXT,
    last_error_code TEXT,

    -- Additional flexible metrics
    custom_metrics JSONB DEFAULT '{}',

    -- Partitioning by month for performance (handled by triggers)
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Daily aggregated metrics for performance optimization
CREATE TABLE public.node_metrics_daily (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    node_id UUID REFERENCES public.nodes(id) ON DELETE CASCADE,
    date DATE NOT NULL,

    -- Aggregated network metrics
    avg_uptime_percentage DECIMAL(5, 2),
    total_downtime_minutes INTEGER,
    avg_latency_ms DECIMAL(8, 2),
    max_latency_ms DECIMAL(8, 2),
    min_latency_ms DECIMAL(8, 2),
    avg_download_speed_mbps DECIMAL(8, 2),
    avg_upload_speed_mbps DECIMAL(8, 2),

    -- Aggregated usage metrics
    total_data_transferred_gb DECIMAL(12, 2),
    peak_concurrent_users INTEGER,
    total_wifi_sessions INTEGER,
    avg_session_duration_minutes INTEGER,

    -- Aggregated system metrics
    avg_cpu_usage_percent DECIMAL(5, 2),
    avg_memory_usage_percent DECIMAL(5, 2),
    max_temperature_celsius DECIMAL(5, 2),
    avg_power_usage_watts DECIMAL(8, 2),

    -- Error and reliability metrics
    total_errors INTEGER,
    uptime_percentage DECIMAL(5, 2),
    reliability_score DECIMAL(5, 2), -- 0-100 reliability score

    -- Created timestamp
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    -- Unique constraint
    UNIQUE(node_id, date)
);

-- ============================================================================
-- ALERTS AND INCIDENTS
-- ============================================================================

-- System alerts and notifications
CREATE TABLE public.node_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    node_id UUID REFERENCES public.nodes(id) ON DELETE CASCADE,

    -- Alert information
    alert_type TEXT NOT NULL, -- 'offline', 'high_latency', 'error', 'maintenance_due', etc.
    severity alert_severity NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,

    -- Alert lifecycle
    status TEXT DEFAULT 'open', -- open, acknowledged, resolved, false_positive
    triggered_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    acknowledged_at TIMESTAMPTZ,
    acknowledged_by UUID REFERENCES public.profiles(id),
    resolved_at TIMESTAMPTZ,
    resolved_by UUID REFERENCES public.profiles(id),

    -- Alert details
    alert_data JSONB DEFAULT '{}', -- Additional alert-specific data
    affected_services TEXT[], -- List of affected services

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- USER SESSIONS AND ENGAGEMENT
-- ============================================================================

-- User sessions on nodes (Wi-Fi connections, etc.)
CREATE TABLE public.node_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    node_id UUID REFERENCES public.nodes(id) ON DELETE CASCADE,

    -- Session information
    session_start TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    session_end TIMESTAMPTZ,
    duration_minutes INTEGER GENERATED ALWAYS AS (
        CASE
            WHEN session_end IS NOT NULL THEN
                EXTRACT(EPOCH FROM (session_end - session_start)) / 60
            ELSE NULL
        END
    ) STORED,

    -- User/device information (anonymized for privacy)
    device_type TEXT, -- 'mobile', 'laptop', 'tablet', 'other'
    connection_type TEXT, -- 'wifi', 'ethernet', 'other'
    anonymized_device_id TEXT, -- Hashed device identifier

    -- Usage metrics
    data_downloaded_mb DECIMAL(10, 2) DEFAULT 0,
    data_uploaded_mb DECIMAL(10, 2) DEFAULT 0,

    -- Quality of experience metrics
    signal_strength_dbm INTEGER,
    connection_quality_rating INTEGER, -- 1-5 user rating

    -- Status
    status TEXT DEFAULT 'active', -- active, completed, error

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- IMPACT AND SUSTAINABILITY METRICS
-- ============================================================================

-- Environmental and community impact tracking
CREATE TABLE public.impact_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    node_id UUID REFERENCES public.nodes(id) ON DELETE CASCADE,

    -- Date tracking
    date DATE NOT NULL,

    -- Environmental impact
    co2_saved_kg DECIMAL(10, 2), -- CO2 emissions avoided
    energy_generated_kwh DECIMAL(10, 2), -- Clean energy generated
    energy_consumed_kwh DECIMAL(10, 2), -- Energy consumed

    -- Community impact
    digital_equity_hours INTEGER, -- Hours of internet access provided
    community_served_count INTEGER, -- Estimated number of people served
    underserved_population_reached INTEGER, -- Underserved community members

    -- Economic impact
    revenue_sharing_amount DECIMAL(12, 2), -- Amount shared with partners
    community_benefit_value DECIMAL(12, 2), -- Estimated community value

    -- Infrastructure metrics
    public_wifi_sessions INTEGER,
    emergency_communications_count INTEGER,
    city_service_transactions INTEGER,

    -- Metadata
    calculation_method TEXT, -- How metrics were calculated
    verification_status TEXT DEFAULT 'estimated', -- 'estimated', 'measured', 'verified'

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    -- Unique constraint
    UNIQUE(node_id, date)
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Cities indexes
CREATE INDEX idx_cities_name ON public.cities(name);
CREATE INDEX idx_cities_state_province ON public.cities(state_province);
CREATE INDEX idx_cities_partnership_status ON public.cities(partnership_status);

-- Partners indexes
CREATE INDEX idx_partners_city_id ON public.partners(city_id);
CREATE INDEX idx_partners_type ON public.partners(partner_type);
CREATE INDEX idx_partners_status ON public.partners(status);
CREATE INDEX idx_partners_email ON public.partners(contact_email);

-- Nodes indexes
CREATE INDEX idx_nodes_partner_id ON public.nodes(partner_id);
CREATE INDEX idx_nodes_city_id ON public.nodes(city_id);
CREATE INDEX idx_nodes_type ON public.nodes(node_type);
CREATE INDEX idx_nodes_status ON public.nodes(status);
CREATE INDEX idx_nodes_location ON public.nodes USING GIST(ST_Point(longitude, latitude));
CREATE INDEX idx_nodes_install_date ON public.nodes(install_date);
CREATE INDEX idx_nodes_node_id_unique ON public.nodes(node_id);

-- Node telemetry indexes (partitioned by time)
CREATE INDEX idx_node_telemetry_node_id ON public.node_telemetry(node_id);
CREATE INDEX idx_node_telemetry_recorded_at ON public.node_telemetry(recorded_at DESC);
CREATE INDEX idx_node_telemetry_status ON public.node_telemetry(network_status);
CREATE INDEX idx_node_telemetry_node_time ON public.node_telemetry(node_id, recorded_at DESC);

-- Daily metrics indexes
CREATE INDEX idx_node_metrics_daily_node_id ON public.node_metrics_daily(node_id);
CREATE INDEX idx_node_metrics_daily_date ON public.node_metrics_daily(date DESC);
CREATE INDEX idx_node_metrics_daily_uptime ON public.node_metrics_daily(uptime_percentage);

-- Alerts indexes
CREATE INDEX idx_node_alerts_node_id ON public.node_alerts(node_id);
CREATE INDEX idx_node_alerts_severity ON public.node_alerts(severity);
CREATE INDEX idx_node_alerts_status ON public.node_alerts(status);
CREATE INDEX idx_node_alerts_triggered_at ON public.node_alerts(triggered_at DESC);

-- Sessions indexes
CREATE INDEX idx_node_sessions_node_id ON public.node_sessions(node_id);
CREATE INDEX idx_node_sessions_start ON public.node_sessions(session_start DESC);
CREATE INDEX idx_node_sessions_status ON public.node_sessions(status);

-- Impact metrics indexes
CREATE INDEX idx_impact_metrics_node_id ON public.impact_metrics(node_id);
CREATE INDEX idx_impact_metrics_date ON public.impact_metrics(date DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all new tables
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.node_telemetry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.node_metrics_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.node_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.node_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_metrics ENABLE ROW LEVEL SECURITY;

-- Cities policies - public read access for transparency
CREATE POLICY "Cities are publicly viewable" ON public.cities
    FOR SELECT USING (true);

-- Partners policies - restricted access
CREATE POLICY "Partners can view their own data" ON public.partners
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.nodes n
            WHERE n.partner_id = partners.id
            AND EXISTS (
                SELECT 1 FROM public.profiles p
                WHERE p.id = auth.uid()
            )
        )
    );

-- Nodes policies - tiered access
CREATE POLICY "Nodes are publicly viewable (basic info)" ON public.nodes
    FOR SELECT USING (
        true -- Basic location and status info is public
    );

-- Node telemetry policies - tiered access
CREATE POLICY "Telemetry data accessible by authenticated users" ON public.node_telemetry
    FOR SELECT USING (
        auth.role() = 'authenticated'
    );

-- Admin-only policies (service role can manage all)
CREATE POLICY "Service role can manage all data" ON public.node_alerts
    FOR ALL USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role can manage all data" ON public.node_sessions
    FOR ALL USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role can manage all data" ON public.impact_metrics
    FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- ============================================================================
-- TRIGGERS AND FUNCTIONS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to aggregate telemetry into daily metrics
CREATE OR REPLACE FUNCTION public.aggregate_daily_metrics()
RETURNS TRIGGER AS $$
BEGIN
    -- Upsert daily aggregated metrics
    INSERT INTO public.node_metrics_daily (
        node_id,
        date,
        avg_uptime_percentage,
        total_downtime_minutes,
        avg_latency_ms,
        total_data_transferred_gb,
        avg_cpu_usage_percent,
        uptime_percentage
    )
    SELECT
        NEW.node_id,
        NEW.recorded_at::DATE,
        CASE
            WHEN NEW.network_status THEN 100
            ELSE 0
        END, -- Simplified for now
        CASE
            WHEN NEW.network_status THEN 0
            ELSE 1440 -- 24 hours in minutes
        END,
        NEW.network_latency_ms,
        COALESCE(NEW.data_transferred_mb, 0) / 1024, -- Convert to GB
        NEW.cpu_usage_percent,
        CASE
            WHEN NEW.network_status THEN 100
            ELSE 0
        END
    ON CONFLICT (node_id, date) DO UPDATE SET
        avg_uptime_percentage = EXCLUDED.avg_uptime_percentage,
        total_downtime_minutes = EXCLUDED.total_downtime_minutes,
        avg_latency_ms = (node_metrics_daily.avg_latency_ms + EXCLUDED.avg_latency_ms) / 2,
        total_data_transferred_gb = node_metrics_daily.total_data_transferred_gb + EXCLUDED.total_data_transferred_gb,
        avg_cpu_usage_percent = (node_metrics_daily.avg_cpu_usage_percent + EXCLUDED.avg_cpu_usage_percent) / 2,
        uptime_percentage = (node_metrics_daily.uptime_percentage + EXCLUDED.uptime_percentage) / 2;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER on_cities_updated BEFORE UPDATE ON public.cities
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_partners_updated BEFORE UPDATE ON public.partners
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_nodes_updated BEFORE UPDATE ON public.nodes
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_node_alerts_updated BEFORE UPDATE ON public.node_alerts
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_node_sessions_updated BEFORE UPDATE ON public.node_sessions
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_impact_metrics_updated BEFORE UPDATE ON public.impact_metrics
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create trigger for telemetry aggregation
CREATE TRIGGER on_node_telemetry_insert AFTER INSERT ON public.node_telemetry
    FOR EACH ROW EXECUTE FUNCTION public.aggregate_daily_metrics();

-- ============================================================================
-- VIEWS FOR COMMON QUERIES
-- ============================================================================

-- Node status overview view
CREATE OR REPLACE VIEW public.node_status_overview AS
SELECT
    n.id,
    n.node_id,
    n.node_type,
    n.status,
    n.location_name,
    n.city_id,
    c.name as city_name,
    p.organization_name as partner_name,
    n.latitude,
    n.longitude,
    COALESCE(nt.network_status, false) as currently_online,
    COALESCE(nt.recorded_at, n.updated_at) as last_update,
    CASE
        WHEN nt.network_status THEN 'online'
        WHEN n.status = 'maintenance' THEN 'maintenance'
        WHEN n.status = 'error' THEN 'error'
        ELSE 'offline'
    END as operational_status
FROM public.nodes n
LEFT JOIN public.cities c ON n.city_id = c.id
LEFT JOIN public.partners p ON n.partner_id = p.id
LEFT JOIN LATERAL (
    SELECT network_status, recorded_at
    FROM public.node_telemetry nt2
    WHERE nt2.node_id = n.id
    ORDER BY nt2.recorded_at DESC
    LIMIT 1
) nt ON true;

-- Daily performance summary view
CREATE OR REPLACE VIEW public.daily_performance_summary AS
SELECT
    n.id as node_id,
    n.node_id as node_identifier,
    n.node_type,
    c.name as city_name,
    mnd.date,
    mnd.uptime_percentage,
    mnd.avg_latency_ms,
    mnd.total_data_transferred_gb,
    mnd.peak_concurrent_users,
    mnd.reliability_score,
    im.co2_saved_kg,
    im.digital_equity_hours,
    im.community_served_count
FROM public.node_metrics_daily mnd
JOIN public.nodes n ON mnd.node_id = n.id
JOIN public.cities c ON n.city_id = c.id
LEFT JOIN public.impact_metrics im ON im.node_id = n.id AND im.date = mnd.date
ORDER BY mnd.date DESC, n.node_id;

-- ============================================================================
-- GRANTS
-- ============================================================================

-- Grant access to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Grant access to service role (for webhooks and system operations)
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- Grant access to anonymous users (public transparency data)
GRANT SELECT ON public.cities TO anonymous;
GRANT SELECT ON public.node_status_overview TO anonymous;
GRANT SELECT ON public.daily_performance_summary TO anonymous;

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE public.cities IS 'Cities and municipalities partnered with Forhem for smart infrastructure deployment';
COMMENT ON TABLE public.partners IS 'Organizations and building owners who host Forhem nodes';
COMMENT ON TABLE public.nodes IS 'Physical infrastructure nodes deployed across partner locations';
COMMENT ON TABLE public.node_telemetry IS 'Real-time performance and health data from deployed nodes';
COMMENT ON TABLE public.node_metrics_daily IS 'Daily aggregated metrics for performance optimization and analytics';
COMMENT ON TABLE public.node_alerts IS 'System alerts and notifications requiring attention';
COMMENT ON TABLE public.node_sessions IS 'User sessions and engagement metrics for privacy-first analytics';
COMMENT ON TABLE public.impact_metrics IS 'Environmental and community impact tracking for PBC transparency';

COMMENT ON VIEW public.node_status_overview IS 'Real-time overview of all node statuses for operational monitoring';
COMMENT ON VIEW public.daily_performance_summary IS 'Daily performance metrics combined with impact data for analytics';

-- ============================================================================
-- ADMIN TELEMETRY AND ANALYTICS
-- ============================================================================

-- Create telemetry_events table for admin panel tracking
CREATE TABLE IF NOT EXISTS telemetry_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,

    -- Event classification
    event_type TEXT NOT NULL CHECK (event_type != ''),
    resource_type TEXT NOT NULL CHECK (resource_type != ''),
    resource_id TEXT,

    -- Event details
    severity TEXT NOT NULL DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'error', 'critical')),
    message TEXT NOT NULL CHECK (message != ''),
    metadata JSONB DEFAULT '{}',

    -- Performance metrics
    duration INTEGER, -- in milliseconds

    -- System context
    ip_address INET,
    user_agent TEXT,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create telemetry_alerts table for admin panel alerting
CREATE TABLE IF NOT EXISTS telemetry_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,

    -- Alert classification
    alert_type TEXT NOT NULL CHECK (alert_type != ''),
    severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    title TEXT NOT NULL CHECK (title != ''),
    description TEXT,
    source TEXT NOT NULL DEFAULT 'system' CHECK (source != ''),
    metadata JSONB DEFAULT '{}',

    -- Alert lifecycle
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'acknowledged', 'resolved')),
    acknowledged_by UUID REFERENCES users(id) ON DELETE SET NULL,
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    resolved_by UUID REFERENCES users(id) ON DELETE SET NULL,
    resolved_at TIMESTAMP WITH TIME ZONE,

    -- System context
    ip_address INET,
    user_agent TEXT,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for telemetry_events
CREATE INDEX IF NOT EXISTS idx_telemetry_events_tenant_created ON telemetry_events(tenant_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_telemetry_events_user_created ON telemetry_events(user_id, created_at DESC) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_telemetry_events_type_severity ON telemetry_events(event_type, severity);
CREATE INDEX IF NOT EXISTS idx_telemetry_events_resource ON telemetry_events(resource_type, resource_id) WHERE resource_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_telemetry_events_severity_created ON telemetry_events(severity, created_at DESC);

-- Add indexes for telemetry_alerts
CREATE INDEX IF NOT EXISTS idx_telemetry_alerts_tenant_status ON telemetry_alerts(tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_telemetry_alerts_severity_status ON telemetry_alerts(severity, status);
CREATE INDEX IF NOT EXISTS idx_telemetry_alerts_type_created ON telemetry_alerts(alert_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_telemetry_alerts_user_created ON telemetry_alerts(user_id, created_at DESC) WHERE user_id IS NOT NULL;

-- Enable Row Level Security for admin telemetry tables
ALTER TABLE telemetry_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE telemetry_alerts ENABLE ROW LEVEL SECURITY;

-- RLS policies for telemetry_events
CREATE POLICY "Users can view telemetry events for their tenant" ON telemetry_events
    FOR SELECT USING (
        auth.uid() = user_id OR
        EXISTS (
            SELECT 1 FROM user_tenant_roles
            WHERE user_id = auth.uid()
            AND tenant_id = telemetry_events.tenant_id
            AND role IN ('admin', 'operator', 'viewer')
        )
    );

CREATE POLICY "System can insert telemetry events" ON telemetry_events
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update telemetry events for their tenant" ON telemetry_events
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_tenant_roles
            WHERE user_id = auth.uid()
            AND tenant_id = telemetry_events.tenant_id
            AND role IN ('admin')
        )
    );

-- RLS policies for telemetry_alerts
CREATE POLICY "Users can view telemetry alerts for their tenant" ON telemetry_alerts
    FOR SELECT USING (
        auth.uid() = user_id OR
        EXISTS (
            SELECT 1 FROM user_tenant_roles
            WHERE user_id = auth.uid()
            AND tenant_id = telemetry_alerts.tenant_id
            AND role IN ('admin', 'operator', 'viewer')
        )
    );

CREATE POLICY "Admins can insert telemetry alerts for their tenant" ON telemetry_alerts
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_tenant_roles
            WHERE user_id = auth.uid()
            AND tenant_id = telemetry_alerts.tenant_id
            AND role IN ('admin', 'operator')
        )
    );

CREATE POLICY "Admins can update telemetry alerts for their tenant" ON telemetry_alerts
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_tenant_roles
            WHERE user_id = auth.uid()
            AND tenant_id = telemetry_alerts.tenant_id
            AND role IN ('admin', 'operator')
        )
    );

-- Create triggers for updated_at on admin telemetry tables
CREATE TRIGGER update_telemetry_events_updated_at
    BEFORE UPDATE ON telemetry_events
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_telemetry_alerts_updated_at
    BEFORE UPDATE ON telemetry_alerts
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Add comments for admin telemetry tables
COMMENT ON TABLE telemetry_events IS 'Comprehensive telemetry event tracking for admin panel system monitoring and analytics';
COMMENT ON TABLE telemetry_alerts IS 'System alerts and anomaly detection for admin panel proactive monitoring';

COMMENT ON COLUMN telemetry_events.event_type IS 'Type of event (e.g., user.login, node.online, api.request)';
COMMENT ON COLUMN telemetry_events.resource_type IS 'Type of resource associated with the event';
COMMENT ON COLUMN telemetry_events.resource_id IS 'ID of the specific resource';
COMMENT ON COLUMN telemetry_events.severity IS 'Event severity level: info, warning, error, critical';
COMMENT ON COLUMN telemetry_events.duration IS 'Event duration in milliseconds for performance tracking';

COMMENT ON COLUMN telemetry_alerts.alert_type IS 'Type of alert (e.g., anomaly, threshold, security_breach)';
COMMENT ON COLUMN telemetry_alerts.severity IS 'Alert severity: low, medium, high, critical';
COMMENT ON COLUMN telemetry_alerts.status IS 'Alert lifecycle status: active, acknowledged, resolved';

-- Grant necessary permissions for admin telemetry
GRANT SELECT, INSERT ON telemetry_events TO authenticated;
GRANT SELECT, INSERT, UPDATE ON telemetry_alerts TO authenticated;

-- ============================================================================
-- SAMPLE DATA INSERTION (Optional - for development)
-- ============================================================================

-- This section would be populated with sample data for development
-- Keeping it commented out for production deployment

/*
-- Sample city
INSERT INTO public.cities (name, state_province, population, contact_email) VALUES
('San Francisco', 'California', 873965, 'smartcity@sf.gov');

-- Sample partner
INSERT INTO public.partners (city_id, organization_name, partner_type, contact_name, contact_email, address, status) VALUES
((SELECT id FROM public.cities WHERE name = 'San Francisco'), 'SF Public Library', 'city_department', 'Jane Doe', 'jane.doe@sfpl.org', '100 Larkin St, San Francisco, CA', 'approved');

-- Sample node
INSERT INTO public.nodes (node_id, partner_id, city_id, node_type, status, location_name, address, latitude, longitude, connection_type, install_date) VALUES
('SF-HSN-001', (SELECT id FROM public.partners WHERE organization_name = 'SF Public Library'), (SELECT id FROM public.cities WHERE name = 'San Francisco'), 'hello_smart_node', 'active', 'Main Library', '100 Larkin St, San Francisco, CA', 37.7749, -122.4194, 'fiber', NOW());
*/