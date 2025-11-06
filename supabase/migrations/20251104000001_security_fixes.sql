-- =============================================================================
-- Critical Security Fixes - 48-Hour Hotfix
-- =============================================================================
-- Fix PRIV-003: Public PII exposure via RLS
-- Fix PRIV-001: Inconsistent DSR authentication
-- =============================================================================

-- Step 1: Lock down user profiles to owner-only access
-- This is a CRITICAL security fix to prevent PII leakage

-- First, drop the dangerously permissive policy
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- Ensure only users can view their own profiles
CREATE POLICY "Users can view their own profiles"
    ON public.profiles
    FOR SELECT
    USING (auth.uid() = id);

-- Ensure only users can update their own profiles
CREATE POLICY "Users can update their own profiles"
    ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Step 2: Add audit trail for sensitive operations
-- Create audit log table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    table_name TEXT,
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Users can view their own audit logs
CREATE POLICY "Users can view their own audit logs"
    ON public.audit_logs
    FOR SELECT
    USING (auth.uid() = user_id);

-- System can insert audit logs (via triggers)
CREATE POLICY "System can insert audit logs"
    ON public.audit_logs
    FOR INSERT
    WITH CHECK (true);

-- Step 3: Create function for audit logging
CREATE OR REPLACE FUNCTION public.audit_profile_changes()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.audit_logs (
        user_id,
        action,
        table_name,
        record_id,
        old_values,
        new_values,
        ip_address,
        user_agent
    ) VALUES (
        auth.uid(),
        CASE
            WHEN TG_OP = 'INSERT' THEN 'PROFILE_CREATED'
            WHEN TG_OP = 'UPDATE' THEN 'PROFILE_UPDATED'
            WHEN TG_OP = 'DELETE' THEN 'PROFILE_DELETED'
            ELSE 'PROFILE_UNKNOWN'
        END,
        'profiles',
        COALESCE(NEW.id, OLD.id),
        CASE WHEN TG_OP = 'UPDATE' THEN row_to_json(OLD) ELSE NULL END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) ELSE NULL END,
        current_setting('request.headers', true)::json->>'x-forwarded-for',
        current_setting('request.headers', true)::json->>'user-agent'
    );
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 4: Add audit triggers
DROP TRIGGER IF EXISTS audit_profile_changes ON public.profiles;
CREATE TRIGGER audit_profile_changes
    AFTER INSERT OR UPDATE OR DELETE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.audit_profile_changes();

-- Step 5: Create consistent DSAR authentication function
CREATE OR REPLACE FUNCTION public.verify_dsar_access(request_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    -- Check if the requesting user matches the target user
    -- Add additional checks for admin access if needed
    RETURN request_user_id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create policy for DSAR export
CREATE POLICY "Users can export their own data"
    ON public.profiles
    FOR SELECT
    USING (public.verify_dsar_access(id));

-- Create policy for DSAR delete
CREATE POLICY "Users can delete their own data"
    ON public.profiles
    FOR DELETE
    USING (public.verify_dsar_access(id));

-- Add comments for documentation
COMMENT ON POLICY "Users can view their own profiles" ON public.profiles
    IS 'Security fix: Users can only view their own profiles';

COMMENT ON POLICY "Users can update their own profiles" ON public.profiles
    IS 'Security fix: Users can only update their own profiles';

COMMENT ON FUNCTION public.verify_dsar_access(UUID)
    IS 'Consistent DSAR authentication across all endpoints';