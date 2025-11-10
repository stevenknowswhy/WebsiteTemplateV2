/**
 * Database Types
 * Auto-generated types for Supabase database schema
 */

// Original Enums
export type MembershipTier = 'free' | 'pro' | 'enterprise';

export type SubscriptionStatus =
  | 'active'
  | 'canceled'
  | 'past_due'
  | 'trialing'
  | 'incomplete'
  | 'incomplete_expired'
  | 'unpaid';

// Analytics and Node Management Enums
export type NodeType =
  | 'hello_smart_node'      // Public Wi-Fi and community hubs
  | 'city_safe_node'        // Emergency communication infrastructure
  | 'edge_infrastructure'   // Distributed computing nodes
  | 'transit_node'          // Public transportation connectivity
  | 'park_node';            // Parks and public spaces connectivity

export type NodeStatus =
  | 'active'               // Online and functioning normally
  | 'inactive'             // Offline or decommissioned
  | 'maintenance'          // Scheduled maintenance
  | 'degraded'             // Operating with reduced functionality
  | 'error'                // Critical error or failure
  | 'pending_install'      // Awaiting installation
  | 'testing';             // In testing phase

export type AlertSeverity =
  | 'critical'             // Immediate attention required
  | 'high'                 // Urgent attention needed
  | 'medium'               // Attention required
  | 'low'                  // Informational
  | 'info';                // System information

export type ConnectionType =
  | 'fiber'                // Fiber optic connection
  | 'cable'                // Cable broadband
  | 'dsl'                  // DSL connection
  | 'wireless'             // Wireless/cellular
  | 'satellite'            // Satellite connection
  | 'mesh';                // Mesh network topology

// Table: profiles
export interface Profile {
  id: string; // UUID - references auth.users(id)
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  membership_tier: MembershipTier;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface ProfileInsert {
  id: string;
  email: string;
  full_name?: string | null;
  avatar_url?: string | null;
  membership_tier?: MembershipTier;
}

export interface ProfileUpdate {
  email?: string;
  full_name?: string | null;
  avatar_url?: string | null;
  membership_tier?: MembershipTier;
}

// Table: subscriptions
export interface Subscription {
  id: string; // UUID
  user_id: string; // UUID - references profiles(id)

  // Stripe identifiers
  stripe_customer_id: string;
  stripe_subscription_id: string | null;
  stripe_price_id: string | null;
  stripe_product_id: string | null;

  // Subscription details
  status: SubscriptionStatus;
  membership_tier: MembershipTier;

  // Billing period
  current_period_start: string | null; // ISO timestamp
  current_period_end: string | null; // ISO timestamp
  cancel_at_period_end: boolean;
  canceled_at: string | null; // ISO timestamp

  // Trial information
  trial_start: string | null; // ISO timestamp
  trial_end: string | null; // ISO timestamp

  // Timestamps
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface SubscriptionInsert {
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id?: string | null;
  stripe_price_id?: string | null;
  stripe_product_id?: string | null;
  status: SubscriptionStatus;
  membership_tier: MembershipTier;
  current_period_start?: string | null;
  current_period_end?: string | null;
  cancel_at_period_end?: boolean;
  canceled_at?: string | null;
  trial_start?: string | null;
  trial_end?: string | null;
}

export interface SubscriptionUpdate {
  stripe_subscription_id?: string | null;
  stripe_price_id?: string | null;
  stripe_product_id?: string | null;
  status?: SubscriptionStatus;
  membership_tier?: MembershipTier;
  current_period_start?: string | null;
  current_period_end?: string | null;
  cancel_at_period_end?: boolean;
  canceled_at?: string | null;
  trial_start?: string | null;
  trial_end?: string | null;
}

// ============================================================================
// ANALYTICS AND NODE MANAGEMENT INTERFACES
// ============================================================================

// Table: cities
export interface City {
  id: string; // UUID
  name: string;
  state_province: string;
  country: string; // Default 'USA'
  population: number | null;
  contact_email: string | null;
  partnership_start_date: string | null; // Date
  partnership_status: string; // Default 'active'
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface CityInsert {
  name: string;
  state_province: string;
  country?: string;
  population?: number | null;
  contact_email?: string | null;
  partnership_start_date?: string | null;
  partnership_status?: string;
}

export interface CityUpdate {
  name?: string;
  state_province?: string;
  country?: string;
  population?: number | null;
  contact_email?: string | null;
  partnership_start_date?: string | null;
  partnership_status?: string;
}

// Table: partners
export interface Partner {
  id: string; // UUID
  city_id: string | null; // UUID - references cities(id)
  organization_name: string;
  partner_type: string; // 'building_owner', 'city_department', 'nonprofit', 'business'
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  address: string | null;
  status: string; // Default 'pending'
  partnership_date: string | null; // Date
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface PartnerInsert {
  city_id?: string | null;
  organization_name: string;
  partner_type: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string | null;
  address?: string | null;
  status?: string;
  partnership_date?: string | null;
}

export interface PartnerUpdate {
  city_id?: string | null;
  organization_name?: string;
  partner_type?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string | null;
  address?: string | null;
  status?: string;
  partnership_date?: string | null;
}

// Table: nodes
export interface Node {
  id: string; // UUID
  node_id: string; // Unique physical node identifier
  partner_id: string | null; // UUID - references partners(id)
  city_id: string | null; // UUID - references cities(id)
  node_type: NodeType;
  status: NodeStatus;

  // Physical location
  location_name: string | null;
  address: string;
  latitude: number | null;
  longitude: number | null;
  floor_number: string | null;
  coordinates_json: object | null; // JSONB

  // Network information
  connection_type: ConnectionType | null;
  ip_address: string | null; // INET
  mac_address: string | null;
  bandwidth_mbps: number | null;

  // Hardware information
  manufacturer: string | null;
  model: string | null;
  serial_number: string | null;
  firmware_version: string | null;
  install_date: string | null; // ISO timestamp
  last_maintenance_date: string | null; // ISO timestamp

  // Configuration
  configuration: object; // JSONB
  metadata: object; // JSONB

  // Timestamps
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface NodeInsert {
  node_id: string;
  partner_id?: string | null;
  city_id?: string | null;
  node_type: NodeType;
  status?: NodeStatus;
  location_name?: string | null;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  floor_number?: string | null;
  coordinates_json?: object | null;
  connection_type?: ConnectionType | null;
  ip_address?: string | null;
  mac_address?: string | null;
  bandwidth_mbps?: number | null;
  manufacturer?: string | null;
  model?: string | null;
  serial_number?: string | null;
  firmware_version?: string | null;
  install_date?: string | null;
  last_maintenance_date?: string | null;
  configuration?: object;
  metadata?: object;
}

export interface NodeUpdate {
  partner_id?: string | null;
  city_id?: string | null;
  node_type?: NodeType;
  status?: NodeStatus;
  location_name?: string | null;
  address?: string;
  latitude?: number | null;
  longitude?: number | null;
  floor_number?: string | null;
  coordinates_json?: object | null;
  connection_type?: ConnectionType | null;
  ip_address?: string | null;
  mac_address?: string | null;
  bandwidth_mbps?: number | null;
  manufacturer?: string | null;
  model?: string | null;
  serial_number?: string | null;
  firmware_version?: string | null;
  install_date?: string | null;
  last_maintenance_date?: string | null;
  configuration?: object;
  metadata?: object;
}

// Table: node_telemetry
export interface NodeTelemetry {
  id: string; // UUID
  node_id: string; // UUID - references nodes(id)
  recorded_at: string; // ISO timestamp

  // Network performance metrics
  network_status: boolean; // Online/offline status
  uptime_seconds: number; // Cumulative uptime
  downtime_seconds: number; // Cumulative downtime
  network_latency_ms: number | null; // Ping latency
  download_speed_mbps: number | null;
  upload_speed_mbps: number | null;
  packet_loss_percent: number | null;

  // System health metrics
  cpu_usage_percent: number | null;
  memory_usage_percent: number | null;
  disk_usage_percent: number | null;
  temperature_celsius: number | null;

  // Power and environmental metrics
  power_usage_watts: number | null;
  battery_level_percent: number | null;
  external_power_connected: boolean;

  // Service-specific metrics
  wifi_users_connected: number | null;
  data_transferred_mb: number | null;
  emergency_calls_made: number | null;

  // Error information
  error_count: number | null;
  last_error_message: string | null;
  last_error_code: string | null;

  // Additional metrics
  custom_metrics: object; // JSONB

  // Timestamp
  created_at: string; // ISO timestamp
}

export interface NodeTelemetryInsert {
  node_id: string;
  recorded_at?: string;
  network_status?: boolean;
  uptime_seconds?: number;
  downtime_seconds?: number;
  network_latency_ms?: number | null;
  download_speed_mbps?: number | null;
  upload_speed_mbps?: number | null;
  packet_loss_percent?: number | null;
  cpu_usage_percent?: number | null;
  memory_usage_percent?: number | null;
  disk_usage_percent?: number | null;
  temperature_celsius?: number | null;
  power_usage_watts?: number | null;
  battery_level_percent?: number | null;
  external_power_connected?: boolean;
  wifi_users_connected?: number | null;
  data_transferred_mb?: number | null;
  emergency_calls_made?: number | null;
  error_count?: number | null;
  last_error_message?: string | null;
  last_error_code?: string | null;
  custom_metrics?: object;
}

// Table: node_metrics_daily
export interface NodeMetricsDaily {
  id: string; // UUID
  node_id: string; // UUID - references nodes(id)
  date: string; // Date

  // Aggregated network metrics
  avg_uptime_percentage: number | null;
  total_downtime_minutes: number | null;
  avg_latency_ms: number | null;
  max_latency_ms: number | null;
  min_latency_ms: number | null;
  avg_download_speed_mbps: number | null;
  avg_upload_speed_mbps: number | null;

  // Aggregated usage metrics
  total_data_transferred_gb: number | null;
  peak_concurrent_users: number | null;
  total_wifi_sessions: number | null;
  avg_session_duration_minutes: number | null;

  // Aggregated system metrics
  avg_cpu_usage_percent: number | null;
  avg_memory_usage_percent: number | null;
  max_temperature_celsius: number | null;
  avg_power_usage_watts: number | null;

  // Error and reliability metrics
  total_errors: number | null;
  uptime_percentage: number | null;
  reliability_score: number | null; // 0-100

  // Timestamp
  created_at: string; // ISO timestamp
}

export interface NodeMetricsDailyInsert {
  node_id: string;
  date: string;
  avg_uptime_percentage?: number | null;
  total_downtime_minutes?: number | null;
  avg_latency_ms?: number | null;
  max_latency_ms?: number | null;
  min_latency_ms?: number | null;
  avg_download_speed_mbps?: number | null;
  avg_upload_speed_mbps?: number | null;
  total_data_transferred_gb?: number | null;
  peak_concurrent_users?: number | null;
  total_wifi_sessions?: number | null;
  avg_session_duration_minutes?: number | null;
  avg_cpu_usage_percent?: number | null;
  avg_memory_usage_percent?: number | null;
  max_temperature_celsius?: number | null;
  avg_power_usage_watts?: number | null;
  total_errors?: number | null;
  uptime_percentage?: number | null;
  reliability_score?: number | null;
}

export interface NodeMetricsDailyUpdate {
  avg_uptime_percentage?: number | null;
  total_downtime_minutes?: number | null;
  avg_latency_ms?: number | null;
  max_latency_ms?: number | null;
  min_latency_ms?: number | null;
  avg_download_speed_mbps?: number | null;
  avg_upload_speed_mbps?: number | null;
  total_data_transferred_gb?: number | null;
  peak_concurrent_users?: number | null;
  total_wifi_sessions?: number | null;
  avg_session_duration_minutes?: number | null;
  avg_cpu_usage_percent?: number | null;
  avg_memory_usage_percent?: number | null;
  max_temperature_celsius?: number | null;
  avg_power_usage_watts?: number | null;
  total_errors?: number | null;
  uptime_percentage?: number | null;
  reliability_score?: number | null;
}

// Table: node_alerts
export interface NodeAlert {
  id: string; // UUID
  node_id: string; // UUID - references nodes(id)

  // Alert information
  alert_type: string; // 'offline', 'high_latency', 'error', 'maintenance_due', etc.
  severity: AlertSeverity;
  title: string;
  message: string;

  // Alert lifecycle
  status: string; // 'open', 'acknowledged', 'resolved', 'false_positive'
  triggered_at: string; // ISO timestamp
  acknowledged_at: string | null; // ISO timestamp
  acknowledged_by: string | null; // UUID - references profiles(id)
  resolved_at: string | null; // ISO timestamp
  resolved_by: string | null; // UUID - references profiles(id)

  // Alert details
  alert_data: object; // JSONB
  affected_services: string[]; // Array of strings

  // Timestamps
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface NodeAlertInsert {
  node_id: string;
  alert_type: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  status?: string;
  triggered_at?: string;
  acknowledged_at?: string | null;
  acknowledged_by?: string | null;
  resolved_at?: string | null;
  resolved_by?: string | null;
  alert_data?: object;
  affected_services?: string[];
}

export interface NodeAlertUpdate {
  alert_type?: string;
  severity?: AlertSeverity;
  title?: string;
  message?: string;
  status?: string;
  acknowledged_at?: string | null;
  acknowledged_by?: string | null;
  resolved_at?: string | null;
  resolved_by?: string | null;
  alert_data?: object;
  affected_services?: string[];
}

// Table: node_sessions
export interface NodeSession {
  id: string; // UUID
  node_id: string; // UUID - references nodes(id)

  // Session information
  session_start: string; // ISO timestamp
  session_end: string | null; // ISO timestamp
  duration_minutes: number | null; // Generated column

  // User/device information (anonymized)
  device_type: string | null; // 'mobile', 'laptop', 'tablet', 'other'
  connection_type: string | null; // 'wifi', 'ethernet', 'other'
  anonymized_device_id: string | null; // Hashed device identifier

  // Usage metrics
  data_downloaded_mb: number | null;
  data_uploaded_mb: number | null;

  // Quality of experience metrics
  signal_strength_dbm: number | null;
  connection_quality_rating: number | null; // 1-5 rating

  // Status
  status: string; // 'active', 'completed', 'error'

  // Timestamps
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface NodeSessionInsert {
  node_id: string;
  session_start?: string;
  session_end?: string | null;
  device_type?: string | null;
  connection_type?: string | null;
  anonymized_device_id?: string | null;
  data_downloaded_mb?: number | null;
  data_uploaded_mb?: number | null;
  signal_strength_dbm?: number | null;
  connection_quality_rating?: number | null;
  status?: string;
}

export interface NodeSessionUpdate {
  session_end?: string | null;
  device_type?: string | null;
  connection_type?: string | null;
  anonymized_device_id?: string | null;
  data_downloaded_mb?: number | null;
  data_uploaded_mb?: number | null;
  signal_strength_dbm?: number | null;
  connection_quality_rating?: number | null;
  status?: string;
}

// Table: impact_metrics
export interface ImpactMetrics {
  id: string; // UUID
  node_id: string; // UUID - references nodes(id)

  // Date tracking
  date: string; // Date

  // Environmental impact
  co2_saved_kg: number | null; // CO2 emissions avoided
  energy_generated_kwh: number | null; // Clean energy generated
  energy_consumed_kwh: number | null; // Energy consumed

  // Community impact
  digital_equity_hours: number | null; // Hours of internet access provided
  community_served_count: number | null; // Estimated number of people served
  underserved_population_reached: number | null; // Underserved community members

  // Economic impact
  revenue_sharing_amount: number | null; // Amount shared with partners
  community_benefit_value: number | null; // Estimated community value

  // Infrastructure metrics
  public_wifi_sessions: number | null;
  emergency_communications_count: number | null;
  city_service_transactions: number | null;

  // Metadata
  calculation_method: string | null; // How metrics were calculated
  verification_status: string; // 'estimated', 'measured', 'verified'

  // Timestamps
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface ImpactMetricsInsert {
  node_id: string;
  date: string;
  co2_saved_kg?: number | null;
  energy_generated_kwh?: number | null;
  energy_consumed_kwh?: number | null;
  digital_equity_hours?: number | null;
  community_served_count?: number | null;
  underserved_population_reached?: number | null;
  revenue_sharing_amount?: number | null;
  community_benefit_value?: number | null;
  public_wifi_sessions?: number | null;
  emergency_communications_count?: number | null;
  city_service_transactions?: number | null;
  calculation_method?: string | null;
  verification_status?: string;
}

export interface ImpactMetricsUpdate {
  co2_saved_kg?: number | null;
  energy_generated_kwh?: number | null;
  energy_consumed_kwh?: number | null;
  digital_equity_hours?: number | null;
  community_served_count?: number | null;
  underserved_population_reached?: number | null;
  revenue_sharing_amount?: number | null;
  community_benefit_value?: number | null;
  public_wifi_sessions?: number | null;
  emergency_communications_count?: number | null;
  city_service_transactions?: number | null;
  calculation_method?: string | null;
  verification_status?: string;
}

// ============================================================================
// ADMIN AND TENANT MANAGEMENT INTERFACES
// ============================================================================

// Admin role types
export type AdminRole =
  | 'superadmin'        // Full system access
  | 'city_admin'        // City-level admin
  | 'operator'          // Node operations
  | 'analyst'           // Read-only analytics
  | 'partner_viewer';   // Partner read-only access

// Table: tenant_users - Multi-tenant user management
export interface TenantUser {
  id: string; // UUID
  tenant_id: string; // UUID - references tenants(id)
  user_id: string; // UUID - references profiles(id)
  role: AdminRole;
  invited_by: string; // UUID - references profiles(id)
  invited_at: string; // ISO timestamp
  accepted_at: string | null; // ISO timestamp
  status: 'pending' | 'active' | 'inactive' | 'suspended';
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface TenantUserInsert {
  tenant_id: string;
  user_id: string;
  role: AdminRole;
  invited_by: string;
  invited_at?: string;
  accepted_at?: string | null;
  status?: 'pending' | 'active' | 'inactive' | 'suspended';
}

export interface TenantUserUpdate {
  role?: AdminRole;
  accepted_at?: string | null;
  status?: 'pending' | 'active' | 'inactive' | 'suspended';
}

// Table: tenants - Multi-tenant organization management
export interface Tenant {
  id: string; // UUID
  name: string;
  slug: string; // Unique identifier for URLs
  domain: string | null; // Custom domain for tenant
  logo_url: string | null;
  settings: object; // JSONB - tenant-specific settings
  subscription_tier: MembershipTier;
  max_users: number; // Maximum allowed users
  max_nodes: number; // Maximum allowed nodes
  trial_ends_at: string | null; // ISO timestamp
  status: 'active' | 'trial' | 'suspended' | 'cancelled';
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface TenantInsert {
  name: string;
  slug: string;
  domain?: string | null;
  logo_url?: string | null;
  settings?: object;
  subscription_tier?: MembershipTier;
  max_users?: number;
  max_nodes?: number;
  trial_ends_at?: string | null;
  status?: 'active' | 'trial' | 'suspended' | 'cancelled';
}

export interface TenantUpdate {
  name?: string;
  slug?: string;
  domain?: string | null;
  logo_url?: string | null;
  settings?: object;
  subscription_tier?: MembershipTier;
  max_users?: number;
  max_nodes?: number;
  trial_ends_at?: string | null;
  status?: 'active' | 'trial' | 'suspended' | 'cancelled';
}

// Table: node_commands - Command history for nodes
export interface NodeCommand {
  id: string; // UUID
  node_id: string; // UUID - references nodes(id)
  tenant_id: string; // UUID - references tenants(id)
  command_type: string; // 'restart', 'ping', 'update_firmware', etc.
  command_data: object; // JSONB - command parameters
  status: 'pending' | 'executing' | 'completed' | 'failed' | 'timeout';
  result: object | null; // JSONB - command result
  error_message: string | null;
  executed_by: string; // UUID - references profiles(id)
  scheduled_at: string | null; // ISO timestamp
  executed_at: string | null; // ISO timestamp
  completed_at: string | null; // ISO timestamp
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface NodeCommandInsert {
  node_id: string;
  tenant_id: string;
  command_type: string;
  command_data: object;
  status?: 'pending' | 'executing' | 'completed' | 'failed' | 'timeout';
  result?: object | null;
  error_message?: string | null;
  executed_by: string;
  scheduled_at?: string | null;
  executed_at?: string | null;
  completed_at?: string | null;
}

export interface NodeCommandUpdate {
  command_type?: string;
  command_data?: object;
  status?: 'pending' | 'executing' | 'completed' | 'failed' | 'timeout';
  result?: object | null;
  error_message?: string | null;
  scheduled_at?: string | null;
  executed_at?: string | null;
  completed_at?: string | null;
}

// Table: alert_actions - Actions taken on alerts
export interface AlertAction {
  id: string; // UUID
  alert_id: string; // UUID - references node_alerts(id)
  action_type: string; // 'acknowledged', 'resolved', 'escalated', 'commented'
  action_data: object; // JSONB - action details
  note: string | null; // User notes
  performed_by: string; // UUID - references profiles(id)
  performed_at: string; // ISO timestamp
  created_at: string; // ISO timestamp
}

export interface AlertActionInsert {
  alert_id: string;
  action_type: string;
  action_data: object;
  note?: string | null;
  performed_by: string;
  performed_at?: string;
}

// Table: api_tokens - API token management
export interface ApiToken {
  id: string; // UUID
  tenant_id: string; // UUID - references tenants(id)
  name: string; // Human-readable token name
  token_hash: string; // Hashed token value
  permissions: string[]; // Array of permission strings
  last_used_at: string | null; // ISO timestamp
  expires_at: string | null; // ISO timestamp
  created_by: string; // UUID - references profiles(id)
  is_active: boolean;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface ApiTokenInsert {
  tenant_id: string;
  name: string;
  token_hash: string;
  permissions: string[];
  last_used_at?: string | null;
  expires_at?: string | null;
  created_by: string;
  is_active?: boolean;
}

export interface ApiTokenUpdate {
  name?: string;
  permissions?: string[];
  last_used_at?: string | null;
  expires_at?: string | null;
  is_active?: boolean;
}

// Table: audit_logs - Comprehensive audit logging
export interface AuditLog {
  id: string; // UUID
  tenant_id: string; // UUID - references tenants(id)
  user_id: string | null; // UUID - references profiles(id)
  action: string; // Action performed (e.g., 'create_node', 'update_user')
  resource_type: string; // Type of resource (e.g., 'node', 'user', 'alert')
  resource_id: string | null; // UUID - ID of affected resource
  details: object; // JSONB - Action details
  ip_address: string | null;
  user_agent: string | null;
  session_id: string | null;
  created_at: string; // ISO timestamp
}

export interface AuditLogInsert {
  tenant_id: string;
  user_id?: string | null;
  action: string;
  resource_type: string;
  resource_id?: string | null;
  details: object;
  ip_address?: string | null;
  user_agent?: string | null;
  session_id?: string | null;
}

// Extended Node interface with tenant support
export interface NodeWithTenant extends Node {
  tenant_id: string; // UUID - references tenants(id)
  energy_generated_kwh?: number | null; // Added for admin display
  network_status?: boolean | null; // Real-time network status
  battery_level?: number | null; // Battery level percentage
  last_seen?: string | null; // Last heartbeat
  activated_at?: string | null; // Activation timestamp
  last_restart_at?: string | null; // Last restart timestamp
  firmware_update_requested_at?: string | null; // Firmware update request
  deactivated_at?: string | null; // Deactivation timestamp
}

export interface NodeWithTenantInsert extends NodeInsert {
  tenant_id: string;
  energy_generated_kwh?: number | null;
  network_status?: boolean | null;
  battery_level?: number | null;
  last_seen?: string | null;
  activated_at?: string | null;
  last_restart_at?: string | null;
  firmware_update_requested_at?: string | null;
  deactivated_at?: string | null;
}

export interface NodeWithTenantUpdate extends NodeUpdate {
  tenant_id?: string;
  energy_generated_kwh?: number | null;
  network_status?: boolean | null;
  battery_level?: number | null;
  last_seen?: string | null;
  activated_at?: string | null;
  last_restart_at?: string | null;
  firmware_update_requested_at?: string | null;
  deactivated_at?: string | null;
}

// Database schema type for Supabase client
export interface Database {
  public: {
    Tables: {
      // Original tables
      profiles: {
        Row: Profile;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
      };
      subscriptions: {
        Row: Subscription;
        Insert: SubscriptionInsert;
        Update: SubscriptionUpdate;
      };

      // Analytics and node management tables
      cities: {
        Row: City;
        Insert: CityInsert;
        Update: CityUpdate;
      };
      partners: {
        Row: Partner;
        Insert: PartnerInsert;
        Update: PartnerUpdate;
      };
      nodes: {
        Row: NodeWithTenant;
        Insert: NodeWithTenantInsert;
        Update: NodeWithTenantUpdate;
      };
      node_telemetry: {
        Row: NodeTelemetry;
        Insert: NodeTelemetryInsert;
        Update: never; // Telemetry is append-only
      };
      node_metrics_daily: {
        Row: NodeMetricsDaily;
        Insert: NodeMetricsDailyInsert;
        Update: NodeMetricsDailyUpdate;
      };
      node_alerts: {
        Row: NodeAlert;
        Insert: NodeAlertInsert;
        Update: NodeAlertUpdate;
      };
      node_sessions: {
        Row: NodeSession;
        Insert: NodeSessionInsert;
        Update: NodeSessionUpdate;
      };
      impact_metrics: {
        Row: ImpactMetrics;
        Insert: ImpactMetricsInsert;
        Update: ImpactMetricsUpdate;
      };

      // Admin and tenant management tables
      tenants: {
        Row: Tenant;
        Insert: TenantInsert;
        Update: TenantUpdate;
      };
      tenant_users: {
        Row: TenantUser;
        Insert: TenantUserInsert;
        Update: TenantUserUpdate;
      };
      node_commands: {
        Row: NodeCommand;
        Insert: NodeCommandInsert;
        Update: NodeCommandUpdate;
      };
      alert_actions: {
        Row: AlertAction;
        Insert: AlertActionInsert;
        Update: never; // Alert actions are immutable
      };
      api_tokens: {
        Row: ApiToken;
        Insert: ApiTokenInsert;
        Update: ApiTokenUpdate;
      };
      audit_logs: {
        Row: AuditLog;
        Insert: AuditLogInsert;
        Update: never; // Audit logs are immutable
      };
    };
    Enums: {
      // Original enums
      membership_tier: MembershipTier;
      subscription_status: SubscriptionStatus;

      // Analytics and node management enums
      node_type: NodeType;
      node_status: NodeStatus;
      alert_severity: AlertSeverity;
      connection_type: ConnectionType;

      // Admin and tenant management enums
      admin_role: AdminRole;
    };
    Views: {
      node_status_overview: {
        Row: {
          id: string;
          node_id: string;
          node_type: NodeType;
          status: NodeStatus;
          location_name: string | null;
          city_id: string | null;
          city_name: string | null;
          partner_name: string | null;
          latitude: number | null;
          longitude: number | null;
          currently_online: boolean;
          last_update: string | null;
          operational_status: string;
        };
        Insert: never;
        Update: never;
      };
      daily_performance_summary: {
        Row: {
          node_id: string;
          node_identifier: string;
          node_type: NodeType;
          city_name: string | null;
          date: string;
          uptime_percentage: number | null;
          avg_latency_ms: number | null;
          total_data_transferred_gb: number | null;
          peak_concurrent_users: number | null;
          reliability_score: number | null;
          co2_saved_kg: number | null;
          digital_equity_hours: number | null;
          community_served_count: number | null;
        };
        Insert: never;
        Update: never;
      };
    };
  };
}
