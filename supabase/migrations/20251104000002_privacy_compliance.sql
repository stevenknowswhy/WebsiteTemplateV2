-- Privacy Compliance Tables for GDPR/CCPA

-- DSAR (Data Subject Access Request) Management
CREATE TABLE IF NOT EXISTS public.dsar_requests (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  request_type TEXT NOT NULL CHECK (request_type IN ('access', 'deletion', 'rectification', 'portability')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  request_data JSONB,
  response JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User Consent Tracking
CREATE TABLE IF NOT EXISTS public.user_consent (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  consent_type TEXT NOT NULL CHECK (consent_type IN ('analytics', 'marketing', 'essential', 'personalization')),
  version TEXT NOT NULL DEFAULT '1.0',
  granted BOOLEAN NOT NULL DEFAULT false,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Privacy Preferences
CREATE TABLE IF NOT EXISTS public.privacy_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  analytics BOOLEAN NOT NULL DEFAULT false,
  marketing BOOLEAN NOT NULL DEFAULT false,
  personalization BOOLEAN NOT NULL DEFAULT false,
  data_retention TEXT NOT NULL DEFAULT '90days' CHECK (data_retention IN ('30days', '90days', '1year', 'indefinite')),
  last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Contact Form Submissions (for DSAR compliance)
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS Policies for Privacy Tables

-- DSAR Requests
ALTER TABLE public.dsar_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own DSAR requests" ON public.dsar_requests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own DSAR requests" ON public.dsar_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all DSAR requests" ON public.dsar_requests
  FOR ALL USING (auth.role() = 'service_role');

-- User Consent
ALTER TABLE public.user_consent ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own consent records" ON public.user_consent
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own consent" ON public.user_consent
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "System can create consent records" ON public.user_consent
  FOR INSERT WITH CHECK (auth.role() = 'service_role' OR auth.uid() = user_id);

-- Privacy Preferences
ALTER TABLE public.privacy_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own privacy preferences" ON public.privacy_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own privacy preferences" ON public.privacy_preferences
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own privacy preferences" ON public.privacy_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Contact Submissions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own contact submissions" ON public.contact_submissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can submit contact forms" ON public.contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all contact submissions" ON public.contact_submissions
  FOR ALL USING (auth.role() = 'service_role');

-- Triggers for Audit Trail

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_dsar_requests_updated_at
  BEFORE UPDATE ON public.dsar_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_privacy_preferences_updated_at
  BEFORE UPDATE ON public.privacy_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_dsar_requests_user_id ON public.dsar_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_dsar_requests_status ON public.dsar_requests(status);
CREATE INDEX IF NOT EXISTS idx_dsar_requests_requested_at ON public.dsar_requests(requested_at);
CREATE INDEX IF NOT EXISTS idx_user_consent_user_id ON public.user_consent(user_id);
CREATE INDEX IF NOT EXISTS idx_user_consent_type ON public.user_consent(consent_type);
CREATE INDEX IF NOT EXISTS idx_user_consent_timestamp ON public.user_consent(timestamp);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_user_id ON public.contact_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_submitted_at ON public.contact_submissions(submitted_at);

-- Grant necessary permissions
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON public.dsar_requests TO authenticated;
GRANT ALL ON public.user_consent TO authenticated;
GRANT ALL ON public.privacy_preferences TO authenticated;
GRANT SELECT, INSERT ON public.contact_submissions TO authenticated;
GRANT ALL ON public.contact_submissions TO service_role;