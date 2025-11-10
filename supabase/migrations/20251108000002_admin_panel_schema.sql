-- Admin Panel v1 Database Schema
-- Multi-tenant admin interface with RBAC and audit logging
-- Created: 2025-11-08
-- Depends on: analytics schema (20251108000001_analytics_schema.sql)

-- ============================================================================
-- ENUMS FOR ADMIN OPERATIONS
-- ============================================================================

-- User roles for RBAC
CREATE TYPE admin_role AS ENUM (
    'superadmin',          -- Forhem internal: global access
    'city_admin',          -- City operations: read/write within tenant
    'operator',            -- Node operations: no user management
    'analyst',             -- Read-only: dashboards and logs
    'partner_viewer'       -- Partner-limited: read their assets only
);

-- Audit log actions
CREATE TYPE audit_action AS ENUM (
    'create', 'update', 'delete', 'login', 'logout',
    'view', 'export', 'acknowledge', 'resolve', 'invite',
    'activate', 'deactivate', 'rotate', 'configure'
);

-- Webhook event types
CREATE TYPE webhook_event AS ENUM (
    'node.alert', 'node.offline', 'node.online', 'user.invited',
    'alert.acknowledged', 'alert.resolved', 'system.maintenance'
);

-- ============================================================================
-- TENANT MANAGEMENT
-- ============================================================================

-- Tenant organizations (cities, partners, internal)
CREATE TABLE public.tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL, -- URL-friendly identifier
    type TEXT NOT NULL, -- 'city', 'partner', 'internal'
    status TEXT DEFAULT 'active', -- 'active', 'suspended', 'pending'

    -- Configuration
    settings JSONB DEFAULT '{}', -- Tenant-specific settings
    metadata JSONB DEFAULT '{}', -- Additional flexible data

    -- Contact information
    contact_email TEXT,
    contact_phone TEXT,
    billing_email TEXT,

    -- Subscription and limits
    max_nodes INTEGER DEFAULT 100,
    max_users INTEGER DEFAULT 10,
    subscription_tier TEXT DEFAULT 'basic', -- 'basic', 'pro', 'enterprise'

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- User-tenant relationships with roles
CREATE TABLE public.tenant_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role admin_role NOT NULL,
    status TEXT DEFAULT 'active', -- 'active', 'inactive', 'pending'

    -- Context and permissions
    permissions JSONB DEFAULT '{}', -- Additional role permissions
    invited_by UUID REFERENCES public.profiles(id),
    invited_at TIMESTAMPTZ,
    accepted_at TIMESTAMPTZ,

    -- Session management
    last_login_at TIMESTAMPTZ,
    last_login_ip INET,
    login_count INTEGER DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    -- Constraints
    UNIQUE(tenant_id, user_id)
);

-- ============================================================================
-- NODE MANAGEMENT (EXTENDED FROM ANALYTICS)
-- ============================================================================

-- Extend existing nodes table with tenant relationships
-- Note: We'll add tenant_id to the existing nodes table via ALTER TABLE

-- Node commands and remote operations
CREATE TABLE public.node_commands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    node_id UUID NOT NULL REFERENCES public.nodes(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,

    -- Command information
    command_type TEXT NOT NULL, -- 'reboot', 'update_firmware', 'restart_service', 'configure'
    command_data JSONB DEFAULT '{}', -- Command parameters

    -- Execution tracking
    status TEXT DEFAULT 'pending', -- 'pending', 'executing', 'completed', 'failed', 'timeout'
    sent_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    executed_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,

    -- Results and feedback
    response_data JSONB DEFAULT '{}', -- Command response
    error_message TEXT,
    error_code TEXT,

    -- Audit information
    executed_by UUID REFERENCES public.profiles(id),

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- ALERT MANAGEMENT (EXTENDED FROM ANALYTICS)
-- ============================================================================

-- Extend existing node_alerts with tenant relationships
-- We'll add tenant_id to node_alerts via ALTER TABLE

-- Alert acknowledgments and resolutions (enhanced tracking)
CREATE TABLE public.alert_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    alert_id UUID NOT NULL REFERENCES public.node_alerts(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,

    -- Action information
    action_type TEXT NOT NULL, -- 'acknowledged', 'resolved', 'escalated', 'false_positive'
    action_note TEXT, -- Optional notes about the action

    -- SLA tracking
    sla_minutes INTEGER, -- Time to respond/resolve within SLA
    breach_reason TEXT, -- If SLA was breached

    -- Audit information
    performed_by UUID NOT NULL REFERENCES public.profiles(id),
    performed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    ip_address INET,
    user_agent TEXT,

    -- Previous state for rollback
    previous_status TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- API TOKEN MANAGEMENT
-- ============================================================================

-- API tokens for programmatic access
CREATE TABLE public.api_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- Human-readable token name

    -- Security
    token_hash TEXT NOT NULL UNIQUE, -- Hashed token value
    token_prefix TEXT NOT NULL, -- First few characters for identification
    secret_key TEXT, -- For webhook signing (encrypted)

    -- Permissions and scope
    permissions JSONB DEFAULT '{}', -- What this token can access
    allowed_ips INET[], -- IP whitelist
    rate_limit INTEGER DEFAULT 1000, -- Requests per hour

    -- Lifecycle
    status TEXT DEFAULT 'active', -- 'active', 'revoked', 'expired'
    expires_at TIMESTAMPTZ,
    last_used_at TIMESTAMPTZ,
    last_used_ip INET,
    usage_count INTEGER DEFAULT 0,

    -- Audit information
    created_by UUID NOT NULL REFERENCES public.profiles(id),
    revoked_by UUID REFERENCES public.profiles(id),
    revoked_at TIMESTAMPTZ,
    revoke_reason TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- WEBHOOK MANAGEMENT
-- ============================================================================

-- Webhook endpoints for notifications
CREATE TABLE public.webhooks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    url TEXT NOT NULL,

    -- Configuration
    secret TEXT NOT NULL, -- HMAC secret for signature verification
    event_types webhook_event[] NOT NULL, -- Which events trigger this webhook

    -- Delivery settings
    active BOOLEAN DEFAULT true,
    retry_attempts INTEGER DEFAULT 3,
    timeout_seconds INTEGER DEFAULT 30,

    -- Security
    allowed_ips INET[], -- IP whitelist for incoming validation
    verify_ssl BOOLEAN DEFAULT true,

    -- Status and monitoring
    status TEXT DEFAULT 'active', -- 'active', 'paused', 'failed'
    last_success_at TIMESTAMPTZ,
    last_failure_at TIMESTAMPTZ,
    failure_count INTEGER DEFAULT 0,
    last_error TEXT,

    -- Audit information
    created_by UUID NOT NULL REFERENCES public.profiles(id),

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Webhook delivery logs
CREATE TABLE public.webhook_deliveries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    webhook_id UUID NOT NULL REFERENCES public.webhooks(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,

    -- Event information
    event_type webhook_event NOT NULL,
    event_data JSONB NOT NULL,

    -- Delivery tracking
    delivery_status TEXT DEFAULT 'pending', -- 'pending', 'delivered', 'failed', 'retrying'
    attempts INTEGER DEFAULT 0,
    max_attempts INTEGER DEFAULT 3,

    -- Timing
    scheduled_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    delivered_at TIMESTAMPTZ,
    next_retry_at TIMESTAMPTZ,

    -- HTTP details
    http_status INTEGER,
    response_body TEXT,
    response_headers JSONB,
    duration_ms INTEGER,

    -- Error information
    error_message TEXT,
    error_type TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- COMPREHENSIVE AUDIT LOG
-- ============================================================================

-- Comprehensive audit logging for all admin actions
CREATE TABLE public.audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,

    -- Action information
    action audit_action NOT NULL,
    target_type TEXT NOT NULL, -- 'user', 'node', 'alert', 'tenant', etc.
    target_id UUID, -- ID of the target record
    target_name TEXT, -- Human-readable target name

    -- Actor information
    actor_id UUID REFERENCES public.profiles(id),
    actor_email TEXT, -- Redundant but preserved for audit trail
    actor_role admin_role,

    -- Change tracking
    old_values JSONB, -- Previous state (for updates/deletes)
    new_values JSONB, -- New state (for creates/updates)
    changed_fields TEXT[], -- List of changed field names

    -- Request context
    ip_address INET,
    user_agent TEXT,
    session_id TEXT,
    request_id TEXT, -- For request tracing

    -- System context
    api_token_id UUID REFERENCES public.api_tokens(id), -- If action via API token
    webhook_id UUID REFERENCES public.webhooks(id), -- If action via webhook

    -- Metadata
    metadata JSONB DEFAULT '{}', -- Additional context
    correlation_id TEXT, -- For linking related actions

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- TABLE ALTERATIONS (ADDING TENANT_ID TO EXISTING TABLES)
-- ============================================================================

-- Add tenant_id to existing tables
ALTER TABLE public.nodes ADD COLUMN tenant_id UUID REFERENCES public.tenants(id);
ALTER TABLE public.node_alerts ADD COLUMN tenant_id UUID REFERENCES public.tenants(id);

-- Create indexes for new tenant columns
CREATE INDEX idx_nodes_tenant_id ON public.nodes(tenant_id);
CREATE INDEX idx_node_alerts_tenant_id ON public.node_alerts(tenant_id);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Tenant indexes
CREATE INDEX idx_tenants_slug ON public.tenants(slug);
CREATE INDEX idx_tenants_type ON public.tenants(type);
CREATE INDEX idx_tenants_status ON public.tenants(status);

-- Tenant users indexes
CREATE INDEX idx_tenant_users_tenant_id ON public.tenant_users(tenant_id);
CREATE INDEX idx_tenant_users_user_id ON public.tenant_users(user_id);
CREATE INDEX idx_tenant_users_role ON public.tenant_users(role);
CREATE INDEX idx_tenant_users_status ON public.tenant_users(status);

-- Node commands indexes
CREATE INDEX idx_node_commands_node_id ON public.node_commands(node_id);
CREATE INDEX idx_node_commands_tenant_id ON public.node_commands(tenant_id);
CREATE INDEX idx_node_commands_status ON public.node_commands(status);
CREATE INDEX idx_node_commands_created_at ON public.node_commands(created_at DESC);

-- Alert actions indexes
CREATE INDEX idx_alert_actions_alert_id ON public.alert_actions(alert_id);
CREATE INDEX idx_alert_actions_tenant_id ON public.alert_actions(tenant_id);
CREATE INDEX idx_alert_actions_performed_by ON public.alert_actions(performed_by);
CREATE INDEX idx_alert_actions_performed_at ON public.alert_actions(performed_at DESC);

-- API tokens indexes
CREATE INDEX idx_api_tokens_tenant_id ON public.api_tokens(tenant_id);
CREATE INDEX idx_api_tokens_hash ON public.api_tokens(token_hash);
CREATE INDEX idx_api_tokens_prefix ON public.api_tokens(token_prefix);
CREATE INDEX idx_api_tokens_status ON public.api_tokens(status);
CREATE INDEX idx_api_tokens_expires_at ON public.api_tokens(expires_at);

-- Webhooks indexes
CREATE INDEX idx_webhooks_tenant_id ON public.webhooks(tenant_id);
CREATE INDEX idx_webhooks_active ON public.webhooks(active);
CREATE INDEX idx_webhooks_status ON public.webhooks(status);

-- Webhook deliveries indexes
CREATE INDEX idx_webhook_deliveries_webhook_id ON public.webhook_deliveries(webhook_id);
CREATE INDEX idx_webhook_deliveries_tenant_id ON public.webhook_deliveries(tenant_id);
CREATE INDEX idx_webhook_deliveries_status ON public.webhook_deliveries(delivery_status);
CREATE INDEX idx_webhook_deliveries_scheduled_at ON public.webhook_deliveries(scheduled_at DESC);

-- Audit log indexes
CREATE INDEX idx_audit_log_tenant_id ON public.audit_log(tenant_id);
CREATE INDEX idx_audit_log_actor_id ON public.audit_log(actor_id);
CREATE INDEX idx_audit_log_action ON public.audit_log(action);
CREATE INDEX idx_audit_log_target_type ON public.audit_log(target_type);
CREATE INDEX idx_audit_log_created_at ON public.audit_log(created_at DESC);
CREATE INDEX idx_audit_log_correlation_id ON public.audit_log(correlation_id);

-- Composite indexes for common queries
CREATE INDEX idx_tenant_users_tenant_role ON public.tenant_users(tenant_id, role);
CREATE INDEX idx_audit_log_tenant_action ON public.audit_log(tenant_id, action);
CREATE INDEX idx_nodes_tenant_status ON public.nodes(tenant_id, status);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all admin tables
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.node_commands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alert_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Tenants policies
CREATE POLICY "Tenants viewable by tenant users" ON public.tenants
    FOR SELECT USING (
        id IN (
            SELECT tenant_id FROM public.tenant_users
            WHERE user_id = auth.uid() AND status = 'active'
        )
        OR id = COALESCE(
            (SELECT tenant_id FROM public.tenant_users
             WHERE user_id = auth.uid() AND status = 'active' LIMIT 1),
            '00000000-0000-0000-0000-000000000000'::uuid
        )
    );

-- Tenant users policies
CREATE POLICY "Tenant users manageable within tenant" ON public.tenant_users
    FOR ALL USING (
        tenant_id IN (
            SELECT tenant_id FROM public.tenant_users
            WHERE user_id = auth.uid() AND status = 'active'
            AND role IN ('superadmin', 'city_admin')
        )
        OR user_id = auth.uid() -- Users can view their own membership
    );

-- Node commands policies
CREATE POLICY "Node commands accessible by tenant" ON public.node_commands
    FOR ALL USING (
        tenant_id IN (
            SELECT tenant_id FROM public.tenant_users
            WHERE user_id = auth.uid() AND status = 'active'
        )
    );

-- Alert actions policies
CREATE POLICY "Alert actions accessible by tenant" ON public.alert_actions
    FOR ALL USING (
        tenant_id IN (
            SELECT tenant_id FROM public.tenant_users
            WHERE user_id = auth.uid() AND status = 'active'
        )
    );

-- API tokens policies
CREATE POLICY "API tokens manageable by tenant admins" ON public.api_tokens
    FOR ALL USING (
        tenant_id IN (
            SELECT tenant_id FROM public.tenant_users
            WHERE user_id = auth.uid() AND status = 'active'
            AND role IN ('superadmin', 'city_admin')
        )
    );

-- Webhooks policies
CREATE POLICY "Webhooks manageable by tenant admins" ON public.webhooks
    FOR ALL USING (
        tenant_id IN (
            SELECT tenant_id FROM public.tenant_users
            WHERE user_id = auth.uid() AND status = 'active'
            AND role IN ('superadmin', 'city_admin')
        )
    );

-- Webhook deliveries policies
CREATE POLICY "Webhook deliveries viewable by tenant" ON public.webhook_deliveries
    FOR SELECT USING (
        tenant_id IN (
            SELECT tenant_id FROM public.tenant_users
            WHERE user_id = auth.uid() AND status = 'active'
        )
    );

-- Audit log policies (append-only, viewable by tenant)
CREATE POLICY "Audit log viewable by tenant users" ON public.audit_log
    FOR SELECT USING (
        tenant_id IN (
            SELECT tenant_id FROM public.tenant_users
            WHERE user_id = auth.uid() AND status = 'active'
        )
        OR actor_id = auth.uid() -- Users can see their own actions
    );

CREATE POLICY "Audit log append-only by system" ON public.audit_log
    FOR INSERT WITH CHECK (true); -- System inserts, RLS handled by application

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to get current user's tenant and role
CREATE OR REPLACE FUNCTION public.current_user_context()
RETURNS TABLE(tenant_id UUID, role admin_role) AS $$
BEGIN
    RETURN QUERY
    SELECT tu.tenant_id, tu.role
    FROM public.tenant_users tu
    WHERE tu.user_id = auth.uid()
    AND tu.status = 'active'
    LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log audit events automatically
CREATE OR REPLACE FUNCTION public.log_audit_event()
RETURNS TRIGGER AS $$
DECLARE
    user_context RECORD;
    old_data JSONB;
    new_data JSONB;
    changed_fields TEXT[];
BEGIN
    -- Get current user context
    SELECT * INTO user_context FROM public.current_user_context() LIMIT 1;

    -- Handle different operation types
    IF TG_OP = 'INSERT' THEN
        old_data := NULL;
        new_data := to_jsonb(NEW);

        -- Log the audit entry
        INSERT INTO public.audit_log (
            tenant_id,
            action,
            target_type,
            target_id,
            target_name,
            actor_id,
            actor_email,
            actor_role,
            old_values,
            new_values,
            changed_fields,
            ip_address,
            user_agent
        ) VALUES (
            COALESCE(user_context.tenant_id,
                CASE
                    WHEN TG_TABLE_NAME = 'tenants' THEN NEW.id::UUID
                    WHEN TG_TABLE_NAME = 'tenant_users' THEN NEW.tenant_id
                    WHEN TG_TABLE_NAME = 'node_commands' THEN NEW.tenant_id
                    WHEN TG_TABLE_NAME = 'alert_actions' THEN NEW.tenant_id
                    WHEN TG_TABLE_NAME = 'api_tokens' THEN NEW.tenant_id
                    WHEN TG_TABLE_NAME = 'webhooks' THEN NEW.tenant_id
                    ELSE NULL
                END
            ),
            'create',
            TG_TABLE_NAME,
            COALESCE(NEW.id, NEW.tenant_id, NEW.user_id),
            COALESCE(NEW.name, NEW.email, NEW.command_type::TEXT, NEW.action_type::TEXT),
            user_context.tenant_id IS NOT NULL ? auth.uid() : NULL,
            (SELECT email FROM public.profiles WHERE id = auth.uid()),
            user_context.role,
            old_data,
            new_data,
            NULL, -- All fields are new
            inet_client_addr(),
            current_setting('request.headers', true)::JSONB->>'user-agent'
        );

        RETURN NEW;

    ELSIF TG_OP = 'UPDATE' THEN
        old_data := to_jsonb(OLD);
        new_data := to_jsonb(NEW);

        -- Calculate changed fields
        changed_fields := ARRAY(
            SELECT jsonb_object_keys(old_data)
            INTERSECT
            SELECT jsonb_object_keys(new_data)
        );

        -- Remove automatic fields from change tracking
        changed_fields := array_remove(changed_fields, 'updated_at');
        changed_fields := array_remove(changed_fields, 'last_used_at');
        changed_fields := array_remove(changed_fields, 'usage_count');

        -- Only log if there are meaningful changes
        IF array_length(changed_fields, 1) > 0 THEN
            INSERT INTO public.audit_log (
                tenant_id,
                action,
                target_type,
                target_id,
                target_name,
                actor_id,
                actor_email,
                actor_role,
                old_values,
                new_values,
                changed_fields,
                ip_address,
                user_agent
            ) VALUES (
                COALESCE(user_context.tenant_id,
                    CASE
                        WHEN TG_TABLE_NAME = 'tenants' THEN NEW.id::UUID
                        WHEN TG_TABLE_NAME = 'tenant_users' THEN NEW.tenant_id
                        WHEN TG_TABLE_NAME = 'node_commands' THEN NEW.tenant_id
                        WHEN TG_TABLE_NAME = 'alert_actions' THEN NEW.tenant_id
                        WHEN TG_TABLE_NAME = 'api_tokens' THEN NEW.tenant_id
                        WHEN TG_TABLE_NAME = 'webhooks' THEN NEW.tenant_id
                        ELSE NULL
                    END
                ),
                'update',
                TG_TABLE_NAME,
                COALESCE(NEW.id, NEW.tenant_id, NEW.user_id),
                COALESCE(NEW.name, NEW.email, NEW.command_type::TEXT, NEW.action_type::TEXT),
                user_context.tenant_id IS NOT NULL ? auth.uid() : NULL,
                (SELECT email FROM public.profiles WHERE id = auth.uid()),
                user_context.role,
                old_data,
                new_data,
                changed_fields,
                inet_client_addr(),
                current_setting('request.headers', true)::JSONB->>'user-agent'
            );
        END IF;

        RETURN NEW;

    ELSIF TG_OP = 'DELETE' THEN
        old_data := to_jsonb(OLD);
        new_data := NULL;

        INSERT INTO public.audit_log (
            tenant_id,
            action,
            target_type,
            target_id,
            target_name,
            actor_id,
            actor_email,
            actor_role,
            old_values,
            new_values,
            changed_fields,
            ip_address,
            user_agent
        ) VALUES (
            COALESCE(user_context.tenant_id,
                CASE
                    WHEN TG_TABLE_NAME = 'tenants' THEN OLD.id::UUID
                    WHEN TG_TABLE_NAME = 'tenant_users' THEN OLD.tenant_id
                    WHEN TG_TABLE_NAME = 'node_commands' THEN OLD.tenant_id
                    WHEN TG_TABLE_NAME = 'alert_actions' THEN OLD.tenant_id
                    WHEN TG_TABLE_NAME = 'api_tokens' THEN OLD.tenant_id
                    WHEN TG_TABLE_NAME = 'webhooks' THEN OLD.tenant_id
                    ELSE NULL
                END
            ),
            'delete',
            TG_TABLE_NAME,
            COALESCE(OLD.id, OLD.tenant_id, OLD.user_id),
            COALESCE(OLD.name, OLD.email, OLD.command_type::TEXT, OLD.action_type::TEXT),
            user_context.tenant_id IS NOT NULL ? auth.uid() : NULL,
            (SELECT email FROM public.profiles WHERE id = auth.uid()),
            user_context.role,
            old_data,
            new_data,
            NULL, -- All fields are deleted
            inet_client_addr(),
            current_setting('request.headers', true)::JSONB->>'user-agent'
        );

        RETURN OLD;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to validate role permissions
CREATE OR REPLACE FUNCTION public.check_role_permission(
    required_role admin_role,
    target_tenant_id UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    user_context RECORD;
BEGIN
    -- Get current user context
    SELECT * INTO user_context FROM public.current_user_context() LIMIT 1;

    -- No user context found
    IF user_context IS NULL THEN
        RETURN FALSE;
    END IF;

    -- Superadmin can access everything
    IF user_context.role = 'superadmin' THEN
        RETURN TRUE;
    END IF;

    -- Check tenant access if specified
    IF target_tenant_id IS NOT NULL AND user_context.tenant_id != target_tenant_id THEN
        RETURN FALSE;
    END IF;

    -- Role hierarchy check
    IF user_context.role = required_role THEN
        RETURN TRUE;
    END IF;

    -- City admin can do operator and analyst tasks
    IF user_context.role = 'city_admin' AND required_role IN ('operator', 'analyst') THEN
        RETURN TRUE;
    END IF;

    -- Operator can do analyst tasks
    IF user_context.role = 'operator' AND required_role = 'analyst' THEN
        RETURN TRUE;
    END IF;

    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for audit logging
CREATE TRIGGER audit_tenants
    AFTER INSERT OR UPDATE OR DELETE ON public.tenants
    FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

CREATE TRIGGER audit_tenant_users
    AFTER INSERT OR UPDATE OR DELETE ON public.tenant_users
    FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

CREATE TRIGGER audit_node_commands
    AFTER INSERT OR UPDATE OR DELETE ON public.node_commands
    FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

CREATE TRIGGER audit_alert_actions
    AFTER INSERT OR UPDATE OR DELETE ON public.alert_actions
    FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

CREATE TRIGGER audit_api_tokens
    AFTER INSERT OR UPDATE OR DELETE ON public.api_tokens
    FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

CREATE TRIGGER audit_webhooks
    AFTER INSERT OR UPDATE OR DELETE ON public.webhooks
    FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

-- Create triggers for updated_at
CREATE TRIGGER on_tenants_updated BEFORE UPDATE ON public.tenants
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_tenant_users_updated BEFORE UPDATE ON public.tenant_users
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_node_commands_updated BEFORE UPDATE ON public.node_commands
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_alert_actions_updated BEFORE UPDATE ON public.alert_actions
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_api_tokens_updated BEFORE UPDATE ON public.api_tokens
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_webhooks_updated BEFORE UPDATE ON public.webhooks
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_webhook_deliveries_updated BEFORE UPDATE ON public.webhook_deliveries
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- VIEWS FOR COMMON QUERIES
-- ============================================================================

-- Admin dashboard overview view
CREATE OR REPLACE VIEW public.admin_dashboard_overview AS
SELECT
    t.id as tenant_id,
    t.name as tenant_name,
    t.type as tenant_type,

    -- Node counts
    COUNT(DISTINCT n.id) as total_nodes,
    COUNT(DISTINCT CASE WHEN n.status = 'active' THEN n.id END) as active_nodes,
    COUNT(DISTINCT CASE WHEN n.status != 'active' THEN n.id END) as inactive_nodes,

    -- Alert counts
    COUNT(DISTINCT na.id) as total_alerts,
    COUNT(DISTINCT CASE WHEN na.status = 'open' THEN na.id END) as open_alerts,
    COUNT(DISTINCT CASE WHEN na.severity = 'critical' AND na.status = 'open' THEN na.id END) as critical_alerts,

    -- User counts
    COUNT(DISTINCT tu.user_id) as total_users,
    COUNT(DISTINCT CASE WHEN tu.status = 'active' THEN tu.user_id END) as active_users,

    -- Recent activity
    MAX(al.created_at) as last_activity,
    COUNT(DISTINCT al.id) as total_audit_events

FROM public.tenants t
LEFT JOIN public.nodes n ON n.tenant_id = t.id
LEFT JOIN public.node_alerts na ON na.tenant_id = t.id
LEFT JOIN public.tenant_users tu ON tu.tenant_id = t.id
LEFT JOIN public.audit_log al ON al.tenant_id = t.id
WHERE t.status = 'active'
GROUP BY t.id, t.name, t.type;

-- User activity summary view
CREATE OR REPLACE VIEW public.user_activity_summary AS
SELECT
    p.id as user_id,
    p.email,
    p.full_name,
    tu.tenant_id,
    t.name as tenant_name,
    tu.role,
    tu.last_login_at,
    tu.login_count,

    -- Recent activity counts
    COUNT(DISTINCT al.id) as total_actions,
    COUNT(DISTINCT CASE WHEN al.created_at > NOW() - INTERVAL '24 hours' THEN al.id END) as actions_24h,
    COUNT(DISTINCT CASE WHEN al.created_at > NOW() - INTERVAL '7 days' THEN al.id END) as actions_7d,

    -- Last action details
    MAX(al.created_at) as last_action_at,
    MAX(al.action) as last_action_type

FROM public.profiles p
JOIN public.tenant_users tu ON tu.user_id = p.id AND tu.status = 'active'
JOIN public.tenants t ON t.id = tu.tenant_id
LEFT JOIN public.audit_log al ON al.actor_id = p.id
GROUP BY p.id, p.email, p.full_name, tu.tenant_id, t.name, tu.role, tu.last_login_at, tu.login_count;

-- ============================================================================
-- GRANTS
-- ============================================================================

-- Grant access to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Grant specific permissions for admin operations
GRANT INSERT, UPDATE, DELETE ON public.tenant_users TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.node_commands TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.alert_actions TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.api_tokens TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.webhooks TO authenticated;
GRANT INSERT ON public.audit_log TO authenticated;

-- Grant access to service role (for system operations)
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE public.tenants IS 'Multi-tenant organizations with role-based access control';
COMMENT ON TABLE public.tenant_users IS 'User-tenant relationships with role assignments and permissions';
COMMENT ON TABLE public.node_commands IS 'Remote commands and operations sent to deployed nodes';
COMMENT ON TABLE public.alert_actions IS 'Detailed tracking of alert acknowledgments and resolutions';
COMMENT ON TABLE public.api_tokens IS 'API tokens for programmatic access with tenant-scoped permissions';
COMMENT ON TABLE public.webhooks IS 'Webhook endpoints for real-time notifications and integrations';
COMMENT ON TABLE public.webhook_deliveries IS 'Delivery tracking and retry logic for webhook notifications';
COMMENT ON TABLE public.audit_log IS 'Comprehensive audit trail of all admin actions with change tracking';

COMMENT ON FUNCTION public.current_user_context() IS 'Returns current user''s tenant and role context';
COMMENT ON FUNCTION public.check_role_permission() IS 'Validates if current user has required role permissions';
COMMENT ON FUNCTION public.log_audit_event() IS 'Automatically logs all data changes to audit trail';

COMMENT ON VIEW public.admin_dashboard_overview IS 'KPI overview for admin dashboards with tenant-scoped metrics';
COMMENT ON VIEW public.user_activity_summary IS 'User activity and login tracking for admin monitoring';

-- ============================================================================
-- SAMPLE DATA INSERTION (Optional - for development)
-- ============================================================================

-- This section would be populated with sample data for development
-- Keeping it commented out for production deployment

/*
-- Sample tenant
INSERT INTO public.tenants (name, slug, type, contact_email) VALUES
('Forhem Internal', 'forhem-internal', 'internal', 'admin@forhem.com'),
('San Francisco', 'san-francisco', 'city', 'smartcity@sf.gov');

-- Sample tenant user (superadmin)
INSERT INTO public.tenant_users (tenant_id, user_id, role, invited_by) VALUES
(
    (SELECT id FROM public.tenants WHERE slug = 'forhem-internal'),
    (SELECT id FROM public.profiles WHERE email = 'admin@forhem.com' LIMIT 1),
    'superadmin',
    (SELECT id FROM public.profiles WHERE email = 'admin@forhem.com' LIMIT 1)
);
*/