import Section from '@/components/Section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import {
  Code,
  BookOpen,
  Download,
  ExternalLink,
  CheckCircle,
  Copy,
  Play,
  Github,
  Terminal,
  Zap
} from 'lucide-react';

export default function APIPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section kicker="Developers" title="API Reference & SDKs">
        <p className="text-xl text-muted-foreground max-w-3xl">
          Integrate DataBuildDirect services with your applications using our comprehensive REST APIs
          and SDKs. Build, deploy, and manage sovereign infrastructure programmatically.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button asChild size="lg">
            <Link href="#getting-started">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#endpoints">Browse Endpoints</Link>
          </Button>
        </div>
      </Section>

      {/* Quick Start */}
      <Section className="bg-muted/50" title="Quick Start">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Get API Key</CardTitle>
              <CardDescription>
                Generate your API key from the dashboard to authenticate requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/dashboard/api-keys">
                  Generate API Key
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Install SDK</CardTitle>
              <CardDescription>
                Choose your preferred language and install the SDK
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm font-mono bg-muted p-3 rounded">
                <div>npm install databuilddirect-js</div>
                <div className="text-muted-foreground"># or</div>
                <div>pip install databuilddirect-py</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Play className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Make First Call</CardTitle>
              <CardDescription>
                Start integrating with our APIs in minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="#examples">View Examples
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* API Endpoints Overview */}
      <Section id="endpoints" title="API Endpoints">
        <div className="space-y-6">
          <div className="text-center mb-8">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our REST API provides 50+ endpoints for managing infrastructure, monitoring,
              and deploying resources across sovereign data centers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Infrastructure Endpoints */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  Infrastructure
                </CardTitle>
                <CardDescription>
                  Manage data centers, nodes, and network resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between items-center">
                    <span className="font-mono">GET /api/v1/infrastructure</span>
                    <span className="text-xs text-muted-foreground">List</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-mono">POST /api/v1/datacenters</span>
                    <span className="text-xs text-muted-foreground">Create</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-mono">GET /api/v1/nodes/{'{id}'}</span>
                    <span className="text-xs text-muted-foreground">Get</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-mono">PUT /api/v1/networks/{'{id}'}</span>
                    <span className="text-xs text-muted-foreground">Update</span>
                  </li>
                </ul>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All 15 Endpoints
                </Button>
              </CardContent>
            </Card>

            {/* Deployment Endpoints */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Deployments
                </CardTitle>
                <CardDescription>
                  Deploy and manage applications and services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between items-center">
                    <span className="font-mono">POST /api/v1/deploy</span>
                    <span className="text-xs text-muted-foreground">Deploy</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-mono">GET /api/v1/deployments</span>
                    <span className="text-xs text-muted-foreground">List</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-mono">DELETE /api/v1/deployments/{'{id}'}</span>
                    <span className="text-xs text-muted-foreground">Delete</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-mono">POST /api/v1/scale</span>
                    <span className="text-xs text-muted-foreground">Scale</span>
                  </li>
                </ul>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All 12 Endpoints
                </Button>
              </CardContent>
            </Card>

            {/* Monitoring Endpoints */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Monitoring
                </CardTitle>
                <CardDescription>
                  Monitor performance, metrics, and health status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between items-center">
                    <span className="font-mono">GET /api/v1/metrics</span>
                    <span className="text-xs text-muted-foreground">Metrics</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-mono">GET /api/v1/health</span>
                    <span className="text-xs text-muted-foreground">Health</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-mono">GET /api/v1/logs</span>
                    <span className="text-xs text-muted-foreground">Logs</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-mono">POST /api/v1/alerts</span>
                    <span className="text-xs text-muted-foreground">Alerts</span>
                  </li>
                </ul>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All 18 Endpoints
                </Button>
              </CardContent>
            </Card>

            {/* Authentication Endpoints */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Authentication
                </CardTitle>
                <CardDescription>
                  Manage authentication and authorization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between items-center">
                    <span className="font-mono">POST /api/v1/auth/login</span>
                    <span className="text-xs text-muted-foreground">Login</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-mono">POST /api/v1/auth/refresh</span>
                    <span className="text-xs text-muted-foreground">Refresh</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-mono">GET /api/v1/auth/me</span>
                    <span className="text-xs text-muted-foreground">Profile</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-mono">POST /api/v1/api-keys</span>
                    <span className="text-xs text-muted-foreground">Create Key</span>
                  </li>
                </ul>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All 8 Endpoints
                </Button>
              </CardContent>
            </Card>

            {/* Billing Endpoints */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Billing
                </CardTitle>
                <CardDescription>
                  Manage billing, invoices, and usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between items-center">
                    <span className="font-mono">GET /api/v1/billing/usage</span>
                    <span className="text-xs text-muted-foreground">Usage</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-mono">GET /api/v1/billing/invoices</span>
                    <span className="text-xs text-muted-foreground">Invoices</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-mono">POST /api/v1/billing/upgrade</span>
                    <span className="text-xs text-muted-foreground">Upgrade</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-mono">GET /api/v1/billing/plans</span>
                    <span className="text-xs text-muted-foreground">Plans</span>
                  </li>
                </ul>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All 10 Endpoints
                </Button>
              </CardContent>
            </Card>

            {/* Webhooks Endpoints */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  Webhooks
                </CardTitle>
                <CardDescription>
                  Configure and manage webhook endpoints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between items-center">
                    <span className="font-mono">POST /api/v1/webhooks</span>
                    <span className="text-xs text-muted-foreground">Create</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-mono">GET /api/v1/webhooks</span>
                    <span className="text-xs text-muted-foreground">List</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-mono">PUT /api/v1/webhooks/{'{id}'}</span>
                    <span className="text-xs text-muted-foreground">Update</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-mono">POST /api/v1/webhooks/test</span>
                    <span className="text-xs text-muted-foreground">Test</span>
                  </li>
                </ul>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All 7 Endpoints
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* SDKs */}
      <Section id="sdks" title="Official SDKs">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="group transition-all hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>JavaScript/TypeScript</CardTitle>
              <CardDescription>
                Modern JavaScript SDK with full TypeScript support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm font-mono bg-muted p-3 rounded">
                  npm install databuilddirect-js
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>TypeScript support</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>ESM & CJS</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>React hooks</span>
                </div>
              </div>
              <Button className="w-full mt-4" asChild>
                <Link href="https://github.com/databuilddirect/js-sdk" target="_blank">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group transition-all hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Python</CardTitle>
              <CardDescription>
                Comprehensive Python SDK for infrastructure automation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm font-mono bg-muted p-3 rounded">
                  pip install databuilddirect-py
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Python 3.8+</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Async support</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Django integration</span>
                </div>
              </div>
              <Button className="w-full mt-4" asChild>
                <Link href="https://github.com/databuilddirect/python-sdk" target="_blank">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group transition-all hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Go</CardTitle>
              <CardDescription>
                High-performance Go SDK for production applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm font-mono bg-muted p-3 rounded">
                  go get github.com/databuilddirect/go-sdk
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Go 1.19+</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Context support</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>gRPC support</span>
                </div>
              </div>
              <Button className="w-full mt-4" asChild>
                <Link href="https://github.com/databuilddirect/go-sdk" target="_blank">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Examples */}
      <Section id="examples" title="Code Examples">
        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-xl font-semibold">Quick Example</h3>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Deploy a Node</CardTitle>
                <CardDescription>
                  Deploy a new sovereign infrastructure node with just a few lines of code
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">JavaScript</Button>
                    <Button size="sm" variant="outline">Python</Button>
                    <Button size="sm" variant="outline">Go</Button>
                  </div>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>
{`import { DataBuildDirect } from 'databuilddirect-js';

const client = new DataBuildDirect({
  apiKey: 'your-api-key',
  region: 'us-west-2'
});

const node = await client.nodes.deploy({
  type: 'underground',
  location: 'oregon-1',
  specs: {
    cpu: 4,
    memory: '16GB',
    storage: '500GB'
  }
});

console.log('Node deployed:', node.id);`}
                    </pre>
                  </div>
                  <div className="flex items-center gap-2">
                    <Copy className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Click to copy code</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* API Status */}
      <Section className="bg-muted/50" title="API Status & SLA">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="mb-2 text-3xl font-bold text-green-600">99.9%</div>
            <p className="text-sm text-muted-foreground">API Uptime</p>
          </div>
          <div>
            <div className="mb-2 text-3xl font-bold text-blue-600">&lt;50ms</div>
            <p className="text-sm text-muted-foreground">Avg Response Time</p>
          </div>
          <div>
            <div className="mb-2 text-3xl font-bold text-purple-600">50+</div>
            <p className="text-sm text-muted-foreground">API Endpoints</p>
          </div>
          <div>
            <div className="mb-2 text-3xl font-bold text-orange-600">24/7</div>
            <p className="text-sm text-muted-foreground">Monitoring</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg text-muted-foreground mb-4">
            Need help? Our API documentation is comprehensive and our support team is ready to assist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/docs">
                <BookOpen className="mr-2 h-5 w-5" />
                Full Documentation
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/support">
                <ExternalLink className="mr-2 h-5 w-5" />
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}