'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Loader2, CheckCircle, XCircle, AlertTriangle, Send, Shield, Target, Play, Copy } from 'lucide-react';

interface WebhookTestResult {
  success: boolean;
  statusCode: number;
  statusText: string;
  responseHeaders: Record<string, string>;
  responseBody: string;
  responseTime: number;
  error?: string;
}

interface WebhookSecurityValidation {
  acceptsPost: boolean;
  validatesSignature: boolean;
  returnsCorrectStatus: boolean;
  usesHttps: boolean;
  hasReasonableTimeout: boolean;
  issues: string[];
  score: number;
}

interface WebhookTestSuite {
  endpointUrl: string;
  securityValidation: WebhookSecurityValidation;
  deliveryTests: Array<{
    eventType: string;
    result: WebhookTestResult;
  }>;
  summary: {
    totalTests: number;
    passedTests: number;
    failedTests: number;
    overallScore: number;
  };
}

const WebhookTestInterface: React.FC = () => {
  const [url, setUrl] = useState('');
  const [secret, setSecret] = useState('');
  const [testType, setTestType] = useState<'basic' | 'security' | 'comprehensive' | 'custom'>('basic');
  const [eventType, setEventType] = useState('webhook.test');
  const [customPayload, setCustomPayload] = useState('');
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const eventTypes = [
    'webhook.test',
    'node.alert',
    'node.offline',
    'node.online',
    'user.invited',
    'alert.acknowledged',
    'alert.resolved',
    'system.maintenance',
  ];

  const generateTestPayload = (type: string) => {
    switch (type) {
      case 'node.alert':
        return {
          nodeId: 'test-node-123',
          alertType: 'offline',
          severity: 'high',
          message: 'Test node went offline',
          timestamp: new Date().toISOString(),
        };
      case 'node.online':
        return {
          nodeId: 'test-node-123',
          status: 'online',
          lastSeen: new Date().toISOString(),
          location: 'Test Location',
        };
      case 'user.invited':
        return {
          userId: 'test-user-456',
          email: 'test@example.com',
          role: 'admin',
          invitedBy: 'admin@example.com',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        };
      default:
        return {
          message: 'Test webhook from Forhem Admin Panel',
          timestamp: new Date().toISOString(),
          test: true,
        };
    }
  };

  const runTest = async () => {
    if (!url || !secret) {
      return;
    }

    setIsLoading(true);
    setTestResult(null);

    try {
      const response = await fetch('/api/admin/webhooks/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          secret,
          testType,
          eventType,
          testData: testType !== 'custom' ? generateTestPayload(eventType) : undefined,
          customPayload: testType === 'custom' ? (customPayload ? JSON.parse(customPayload) : undefined) : undefined,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setTestResult(result);
      } else {
        setTestResult({
          error: result.error || 'Test failed',
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      setTestResult({
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatResponseTime = (ms: number) => {
    if (ms < 1000) {
      return `${ms}ms`;
    }
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number): 'default' | 'secondary' | 'destructive' | 'outline' => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Webhook Test Interface</h2>
        <p className="text-muted-foreground">Test and validate your webhook endpoints</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Webhook Configuration</CardTitle>
          <CardDescription>
            Enter the webhook URL and secret to run tests
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input
                id="webhook-url"
                type="url"
                placeholder="https://your-endpoint.com/webhook"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="webhook-secret">Webhook Secret</Label>
              <Input
                id="webhook-secret"
                type="password"
                placeholder="Enter webhook secret"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="show-advanced"
              checked={showAdvanced}
              onCheckedChange={setShowAdvanced}
            />
            <Label htmlFor="show-advanced">Show advanced options</Label>
          </div>

          {showAdvanced && (
            <div className="space-y-4 pt-4 border-t">
              <div>
                <Label htmlFor="test-type">Test Type</Label>
                <Select value={testType} onValueChange={(value: any) => setTestType(value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic Connectivity</SelectItem>
                    <SelectItem value="security">Security Validation</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive Test Suite</SelectItem>
                    <SelectItem value="custom">Custom Payload</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {testType !== 'security' && (
                <div>
                  <Label htmlFor="event-type">Event Type</Label>
                  <Select value={eventType} onValueChange={setEventType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {testType === 'custom' && (
                <div>
                  <Label htmlFor="custom-payload">Custom Payload (JSON)</Label>
                  <Textarea
                    id="custom-payload"
                    placeholder='{"message": "Custom test payload", "data": {}}'
                    value={customPayload}
                    onChange={(e) => setCustomPayload(e.target.value)}
                    className="mt-1 font-mono"
                    rows={6}
                  />
                </div>
              )}
            </div>
          )}

          <Button
            onClick={runTest}
            disabled={!url || !secret || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running Test...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Run Test
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {testResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Test Results
              <Badge variant={testResult.error ? 'destructive' : 'default'}>
                {testResult.error ? 'Failed' : 'Success'}
              </Badge>
            </CardTitle>
            <CardDescription>
              Test completed at {new Date(testResult.timestamp).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {testResult.error ? (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Test Failed</AlertTitle>
                <AlertDescription>{testResult.error}</AlertDescription>
              </Alert>
            ) : (
              <Tabs defaultValue="basic" className="w-full">
                <TabsList>
                  <TabsTrigger value="basic" className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Basic Test
                  </TabsTrigger>
                  {testResult.testType === 'security' && (
                    <TabsTrigger value="security" className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Security
                    </TabsTrigger>
                  )}
                  {testResult.testType === 'comprehensive' && (
                    <TabsTrigger value="comprehensive" className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Suite Results
                    </TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  {testResult.result && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          {testResult.result.success ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                          <span className="font-medium">Status:</span>
                          <span>{testResult.result.statusText}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Code:</span>
                          <Badge variant={testResult.result.statusCode >= 200 && testResult.result.statusCode < 300 ? 'default' : 'destructive'}>
                            {testResult.result.statusCode}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Response Time:</span>
                          <span>{formatResponseTime(testResult.result.responseTime)}</span>
                        </div>
                      </div>

                      {testResult.result.responseBody && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label>Response Body</Label>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(testResult.result.responseBody)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                          <pre className="bg-muted p-3 rounded-md text-sm overflow-auto max-h-40">
                            {testResult.result.responseBody}
                          </pre>
                        </div>
                      )}

                      {testResult.result.responseHeaders && Object.keys(testResult.result.responseHeaders).length > 0 && (
                        <div>
                          <Label>Response Headers</Label>
                          <div className="mt-1 bg-muted p-3 rounded-md text-sm">
                            {Object.entries(testResult.result.responseHeaders).map(([key, value]) => (
                              <div key={key} className="flex justify-between py-1">
                                <span className="font-medium">{key}:</span>
                                <span className="font-mono text-xs">{String(value)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </TabsContent>

                {testResult.testType === 'security' && testResult.result && (
                  <TabsContent value="security" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                        <span>HTTPS Used</span>
                        {testResult.result.usesHttps ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                        <span>Accepts POST</span>
                        {testResult.result.acceptsPost ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                        <span>Validates Signatures</span>
                        {testResult.result.validatesSignature ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                        <span>Reasonable Timeout</span>
                        {testResult.result.hasReasonableTimeout ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Security Score</Label>
                        <Badge variant={getScoreBadgeVariant(testResult.result.score)}>
                          {testResult.result.score}/100
                        </Badge>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            testResult.result.score >= 80
                              ? 'bg-green-600'
                              : testResult.result.score >= 60
                              ? 'bg-yellow-600'
                              : 'bg-red-600'
                          }`}
                          style={{ width: `${testResult.result.score}%` }}
                        />
                      </div>
                    </div>

                    {testResult.result.issues && testResult.result.issues.length > 0 && (
                      <div>
                        <Label>Security Issues</Label>
                        <div className="mt-1 space-y-2">
                          {testResult.result.issues.map((issue: string, index: number) => (
                            <Alert key={index} variant="destructive">
                              <AlertTriangle className="h-4 w-4" />
                              <AlertDescription>{issue}</AlertDescription>
                            </Alert>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>
                )}

                {testResult.testType === 'comprehensive' && testResult.result && (
                  <TabsContent value="comprehensive" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="pt-4">
                          <div className="text-2xl font-bold">{testResult.result.summary.totalTests}</div>
                          <p className="text-xs text-muted-foreground">Total Tests</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4">
                          <div className="text-2xl font-bold text-green-600">{testResult.result.summary.passedTests}</div>
                          <p className="text-xs text-muted-foreground">Passed</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4">
                          <div className="text-2xl font-bold text-red-600">{testResult.result.summary.failedTests}</div>
                          <p className="text-xs text-muted-foreground">Failed</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4">
                          <div className={`text-2xl font-bold ${getScoreColor(testResult.result.summary.overallScore)}`}>
                            {testResult.result.summary.overallScore}%
                          </div>
                          <p className="text-xs text-muted-foreground">Overall Score</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <Label>Delivery Test Results</Label>
                      <div className="mt-2 space-y-3">
                        {testResult.result.deliveryTests.map((test: any, index: number) => (
                          <Card key={index}>
                            <CardContent className="pt-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">{test.eventType}</span>
                                <div className="flex items-center gap-2">
                                  <Badge variant={test.result.success ? 'default' : 'destructive'}>
                                    {test.result.statusCode}
                                  </Badge>
                                  <span className="text-sm text-muted-foreground">
                                    {formatResponseTime(test.result.responseTime)}
                                  </span>
                                  {test.result.success ? (
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <XCircle className="h-4 w-4 text-red-600" />
                                  )}
                                </div>
                              </div>
                              {test.result.error && (
                                <p className="text-sm text-red-600">{test.result.error}</p>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WebhookTestInterface;