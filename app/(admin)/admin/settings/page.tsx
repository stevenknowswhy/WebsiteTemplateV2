/**
 * Admin Settings Page
 * Multi-tab interface for tenant settings, API tokens, and webhooks management
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import {
  Settings,
  Key,
  Webhook,
  Plus,
  MoreHorizontal,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  RefreshCw,
  Play,
  Pause,
  Edit,
  ExternalLink
} from 'lucide-react';

// Types
interface Tenant {
  id: string;
  name: string;
  domain: string | null;
  settings: Record<string, any>;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

interface ApiToken {
  id: string;
  name: string;
  description: string | null;
  permissions: Record<string, boolean>;
  allowedIps: string[];
  rateLimit: number;
  lastUsedAt: string | null;
  expiresAt: string | null;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  tokenPreview: string | null;
}

interface Webhook {
  id: string;
  name: string;
  url: string;
  eventTypes: string[];
  retryAttempts: number;
  timeoutSeconds: number;
  lastTriggeredAt: string | null;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  hasSecret: boolean;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [tokens, setTokens] = useState<ApiToken[]>([]);
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dialog states
  const [showTokenDialog, setShowTokenDialog] = useState(false);
  const [showWebhookDialog, setShowWebhookDialog] = useState(false);
  const [newToken, setNewToken] = useState<{ name: string; description: string; token: string } | null>(null);
  const [showTokenValue, setShowTokenValue] = useState<{ [key: string]: boolean }>({});

  // Form states
  const [tenantForm, setTenantForm] = useState({
    name: '',
    domain: '',
  });
  const [tokenForm, setTokenForm] = useState({
    name: '',
    description: '',
    permissions: {} as Record<string, boolean>,
    allowedIps: '',
    rateLimit: '1000',
    expiresAt: '',
  });
  const [webhookForm, setWebhookForm] = useState({
    name: '',
    url: '',
    secret: '',
    eventTypes: [] as string[],
    retryAttempts: '3',
    timeoutSeconds: '30',
  });

  // Load data
  useEffect(() => {
    loadSettings();
    loadTokens();
    loadWebhooks();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (!response.ok) throw new Error('Failed to load settings');
      const data = await response.json();
      setTenant(data.tenant);
      setTenantForm({
        name: data.tenant.name,
        domain: data.tenant.domain || '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load settings');
    }
  };

  const loadTokens = async () => {
    try {
      const response = await fetch('/api/admin/settings/tokens');
      if (!response.ok) throw new Error('Failed to load tokens');
      const data = await response.json();
      setTokens(data.tokens);
    } catch (err) {
      console.error('Failed to load tokens:', err);
    }
  };

  const loadWebhooks = async () => {
    try {
      const response = await fetch('/api/admin/settings/webhooks');
      if (!response.ok) throw new Error('Failed to load webhooks');
      const data = await response.json();
      setWebhooks(data.webhooks);
    } catch (err) {
      console.error('Failed to load webhooks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle tenant settings update
  const handleTenantUpdate = async () => {
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tenantForm),
      });

      if (!response.ok) throw new Error('Failed to update settings');
      await loadSettings();
      alert('Settings updated successfully');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update settings');
    }
  };

  // Handle API token creation
  const handleTokenCreate = async () => {
    try {
      const response = await fetch('/api/admin/settings/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: tokenForm.name,
          description: tokenForm.description,
          permissions: tokenForm.permissions,
          allowedIps: tokenForm.allowedIps ? tokenForm.allowedIps.split(',').map(ip => ip.trim()) : [],
          rateLimit: parseInt(tokenForm.rateLimit),
          expiresAt: tokenForm.expiresAt || null,
        }),
      });

      if (!response.ok) throw new Error('Failed to create token');

      const data = await response.json();
      setNewToken({
        name: data.token.name,
        description: tokenForm.description,
        token: data.token.token,
      });
      setShowTokenDialog(false);
      setTokenForm({
        name: '',
        description: '',
        permissions: {},
        allowedIps: '',
        rateLimit: '1000',
        expiresAt: '',
      });
      await loadTokens();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create token');
    }
  };

  // Handle webhook creation
  const handleWebhookCreate = async () => {
    try {
      const response = await fetch('/api/admin/settings/webhooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookForm),
      });

      if (!response.ok) throw new Error('Failed to create webhook');

      setShowWebhookDialog(false);
      setWebhookForm({
        name: '',
        url: '',
        secret: '',
        eventTypes: [],
        retryAttempts: '3',
        timeoutSeconds: '30',
      });
      await loadWebhooks();
      alert('Webhook created successfully');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create webhook');
    }
  };

  // Handle token action
  const handleTokenAction = async (tokenId: string, action: string) => {
    try {
      const response = await fetch(`/api/admin/settings/tokens/${tokenId}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) throw new Error(`Failed to ${action} token`);
      await loadTokens();
    } catch (err) {
      alert(err instanceof Error ? err.message : `Failed to ${action} token`);
    }
  };

  // Handle webhook action
  const handleWebhookAction = async (webhookId: string, action: string) => {
    try {
      const response = await fetch(`/api/admin/settings/webhooks/${webhookId}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) throw new Error(`Failed to ${action} webhook`);

      if (action === 'test') {
        const data = await response.json();
        alert(`Test webhook sent! Status: ${data.result.status} ${data.result.statusText}`);
      } else {
        await loadWebhooks();
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : `Failed to ${action} webhook`);
    }
  };

  // Copy to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (err) {
      alert('Failed to copy to clipboard');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your tenant settings, API tokens, and webhooks
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="tokens" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            API Tokens
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center gap-2">
            <Webhook className="h-4 w-4" />
            Webhooks
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tenant Settings</CardTitle>
              <CardDescription>
                Update your organization's basic information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Organization Name</Label>
                  <Input
                    id="name"
                    value={tenantForm.name}
                    onChange={(e) => setTenantForm({ ...tenantForm, name: e.target.value })}
                    placeholder="Your organization name"
                  />
                </div>
                <div>
                  <Label htmlFor="domain">Domain (Optional)</Label>
                  <Input
                    id="domain"
                    value={tenantForm.domain}
                    onChange={(e) => setTenantForm({ ...tenantForm, domain: e.target.value })}
                    placeholder="your-domain.com"
                  />
                </div>
              </div>
              <Button onClick={handleTenantUpdate} className="mt-4">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Tokens */}
        <TabsContent value="tokens" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">API Tokens</h2>
              <p className="text-muted-foreground">
                Manage API tokens for external integrations
              </p>
            </div>
            <Dialog open={showTokenDialog} onOpenChange={setShowTokenDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Token
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create API Token</DialogTitle>
                  <DialogDescription>
                    Create a new API token for external integrations
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="token-name">Token Name</Label>
                    <Input
                      id="token-name"
                      value={tokenForm.name}
                      onChange={(e) => setTokenForm({ ...tokenForm, name: e.target.value })}
                      placeholder="e.g., Production API Token"
                    />
                  </div>
                  <div>
                    <Label htmlFor="token-description">Description (Optional)</Label>
                    <Textarea
                      id="token-description"
                      value={tokenForm.description}
                      onChange={(e) => setTokenForm({ ...tokenForm, description: e.target.value })}
                      placeholder="Describe the purpose of this token"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rate-limit">Rate Limit (requests/hour)</Label>
                    <Input
                      id="rate-limit"
                      type="number"
                      value={tokenForm.rateLimit}
                      onChange={(e) => setTokenForm({ ...tokenForm, rateLimit: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowTokenDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleTokenCreate}>
                    Create Token
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tokens.map((token) => (
                    <TableRow key={token.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{token.name}</div>
                          {token.description && (
                            <div className="text-sm text-muted-foreground">
                              {token.description}
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground font-mono mt-1">
                            {showTokenValue[token.id] ? token.tokenPreview : `${token.tokenPreview}...`}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 ml-2"
                              onClick={() => {
                                setShowTokenValue({
                                  ...showTokenValue,
                                  [token.id]: !showTokenValue[token.id],
                                });
                              }}
                            >
                              {showTokenValue[token.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 ml-1"
                              onClick={() => copyToClipboard(token.tokenPreview || '')}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={token.isActive ? 'default' : 'secondary'}>
                          {token.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {token.lastUsedAt
                          ? new Date(token.lastUsedAt).toLocaleDateString()
                          : 'Never'}
                      </TableCell>
                      <TableCell>
                        {new Date(token.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {token.isActive ? (
                              <DropdownMenuItem onClick={() => handleTokenAction(token.id, 'revoke')}>
                                <Pause className="h-4 w-4 mr-2" />
                                Revoke Token
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => handleTokenAction(token.id, 'reactivate')}>
                                <Play className="h-4 w-4 mr-2" />
                                Reactivate Token
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Token
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {tokens.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No API tokens created yet
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Webhooks */}
        <TabsContent value="webhooks" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Webhooks</h2>
              <p className="text-muted-foreground">
                Configure webhooks to receive real-time event notifications
              </p>
            </div>
            <Dialog open={showWebhookDialog} onOpenChange={setShowWebhookDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Webhook
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Webhook</DialogTitle>
                  <DialogDescription>
                    Set up a new webhook to receive event notifications
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="webhook-name">Webhook Name</Label>
                    <Input
                      id="webhook-name"
                      value={webhookForm.name}
                      onChange={(e) => setWebhookForm({ ...webhookForm, name: e.target.value })}
                      placeholder="e.g., Slack Notifications"
                    />
                  </div>
                  <div>
                    <Label htmlFor="webhook-url">Endpoint URL</Label>
                    <Input
                      id="webhook-url"
                      type="url"
                      value={webhookForm.url}
                      onChange={(e) => setWebhookForm({ ...webhookForm, url: e.target.value })}
                      placeholder="https://your-webhook-endpoint.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="webhook-secret">Secret</Label>
                    <Input
                      id="webhook-secret"
                      type="password"
                      value={webhookForm.secret}
                      onChange={(e) => setWebhookForm({ ...webhookForm, secret: e.target.value })}
                      placeholder="Webhook signing secret"
                    />
                  </div>
                  <div>
                    <Label>Event Types</Label>
                    <div className="space-y-2 mt-2">
                      {[
                        'node.alert',
                        'node.offline',
                        'node.online',
                        'user.invited',
                        'alert.acknowledged',
                        'alert.resolved',
                        'system.maintenance',
                      ].map((eventType) => (
                        <div key={eventType} className="flex items-center space-x-2">
                          <Switch
                            id={eventType}
                            checked={webhookForm.eventTypes.includes(eventType)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setWebhookForm({
                                  ...webhookForm,
                                  eventTypes: [...webhookForm.eventTypes, eventType],
                                });
                              } else {
                                setWebhookForm({
                                  ...webhookForm,
                                  eventTypes: webhookForm.eventTypes.filter(t => t !== eventType),
                                });
                              }
                            }}
                          />
                          <Label htmlFor={eventType} className="text-sm">
                            {eventType.replace('.', ' ').toUpperCase()}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowWebhookDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleWebhookCreate}>
                    Create Webhook
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Events</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Triggered</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {webhooks.map((webhook) => (
                    <TableRow key={webhook.id}>
                      <TableCell>
                        <div className="font-medium">{webhook.name}</div>
                        {webhook.hasSecret && (
                          <Badge variant="outline" className="text-xs mt-1">
                            Secured
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm truncate max-w-[200px]">{webhook.url}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => window.open(webhook.url, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {webhook.eventTypes.slice(0, 2).map((eventType) => (
                            <Badge key={eventType} variant="secondary" className="text-xs">
                              {eventType.split('.')[0]}
                            </Badge>
                          ))}
                          {webhook.eventTypes.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{webhook.eventTypes.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={webhook.isActive ? 'default' : 'secondary'}>
                          {webhook.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {webhook.lastTriggeredAt
                          ? new Date(webhook.lastTriggeredAt).toLocaleDateString()
                          : 'Never'}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleWebhookAction(webhook.id, 'test')}>
                              <Play className="h-4 w-4 mr-2" />
                              Test Webhook
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleWebhookAction(webhook.id, 'edit')}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {webhook.isActive ? (
                              <DropdownMenuItem onClick={() => handleWebhookAction(webhook.id, 'disable')}>
                                <Pause className="h-4 w-4 mr-2" />
                                Disable
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => handleWebhookAction(webhook.id, 'enable')}>
                                <Play className="h-4 w-4 mr-2" />
                                Enable
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {webhooks.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No webhooks configured yet
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Token Dialog */}
      {newToken && (
        <Dialog open={!!newToken} onOpenChange={() => setNewToken(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>API Token Created</DialogTitle>
              <DialogDescription>
                Your API token has been created. Copy it now as it won't be shown again.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Token Name</Label>
                <p className="font-medium">{newToken.name}</p>
              </div>
              <div>
                <Label>API Token</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    value={newToken.token}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(newToken.token)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Keep this token secure and never share it publicly.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setNewToken(null)}>
                I've saved my token
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}