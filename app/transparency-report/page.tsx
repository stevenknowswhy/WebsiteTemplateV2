import { BarChart3, Users, Shield, Leaf, TrendingUp, Award, Target, Globe, Mail, CheckCircle, Calendar, MapPin, Wifi, DollarSign, Zap, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContactForm from '@/components/ContactForm';

export const metadata = { title: "Transparency Report" };

export default function TransparencyReportPage() {
  return (
    <main id="main-content" className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/50/10 rounded-full mb-4">
            <BarChart3 className="h-8 w-8 text-emerald-600 dark:text-emerald-400 dark:text-emerald-400" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Transparency Report 2024</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            As a Public Benefit Corporation, Forhem is committed to transparency and accountability.
            This report provides comprehensive insight into our operations, governance, and community impact.
          </p>
          <div className="mt-6">
            <Badge variant="secondary" className="bg-emerald-500/50/10 text-emerald-600 dark:text-emerald-400 dark:text-emerald-400 border-emerald-500/20">
              <CheckCircle className="w-3 h-3 mr-1" />
              PBC Committed
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 dark:text-blue-400 border-blue-500/20 ml-2">
              <Calendar className="w-3 h-3 mr-1" />
              Annual Report
            </Badge>
            <Badge variant="secondary" className="bg-purple-500/50/10 text-purple-600 dark:text-purple-400 dark:text-purple-400 border-purple-500/20 ml-2">
              <Award className="w-3 h-3 mr-1" />
              Impact Focused
            </Badge>
          </div>
        </div>

        {/* Mission Statement */}
        <Card className="border-0 shadow-sm mb-12 bg-gradient-to-r from-emerald-500/5 to-blue-500/5">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              Forhem's mission is to create privacy-first smart city infrastructure that benefits communities
              while protecting individual rights and promoting digital equity for all.
            </p>
          </CardContent>
        </Card>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">2</h3>
              <p className="text-sm text-muted-foreground">Cities Served</p>
              <p className="text-xs text-muted-foreground/70 mt-1">San Francisco & Oakland</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Wifi className="h-6 w-6 text-green-600 dark:text-green-400 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">15+</h3>
              <p className="text-sm text-muted-foreground">Nodes Deployed</p>
              <p className="text-xs text-muted-foreground/70 mt-1">Infrastructure units</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/50/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">10K+</h3>
              <p className="text-sm text-muted-foreground">Monthly Users</p>
              <p className="text-xs text-muted-foreground/70 mt-1">Free Wi-Fi sessions</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="h-6 w-6 text-orange-600 dark:text-orange-400 dark:text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">$25K</h3>
              <p className="text-sm text-muted-foreground">Revenue Shared</p>
              <p className="text-xs text-muted-foreground/70 mt-1">Community benefits 2024</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Tabs defaultValue="commitments" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="commitments">Commitments</TabsTrigger>
                <TabsTrigger value="impact">2024 Impact</TabsTrigger>
                <TabsTrigger value="governance">Governance</TabsTrigger>
                <TabsTrigger value="goals">2025 Goals</TabsTrigger>
              </TabsList>

              <TabsContent value="commitments" className="space-y-6">
                <div className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        Privacy by Design
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 dark:text-green-400 flex-shrink-0" />
                          <span className="text-muted-foreground">User privacy prioritized in all product development</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 dark:text-green-400 flex-shrink-0" />
                          <span className="text-muted-foreground">No personal data sold to third parties</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 dark:text-green-400 flex-shrink-0" />
                          <span className="text-muted-foreground">Privacy-first architecture in all deployments</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 dark:text-green-400 flex-shrink-0" />
                          <span className="text-muted-foreground">Regular privacy audits and assessments</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                        Digital Equity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <span className="text-muted-foreground">Free Wi-Fi access in underserved communities</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <span className="text-muted-foreground">Revenue sharing with host cities and communities</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <span className="text-muted-foreground">Local job opportunities through infrastructure deployment</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <span className="text-muted-foreground">Supporting digital literacy programs</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Leaf className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        Environmental Responsibility
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <span className="text-muted-foreground">Solar-powered infrastructure to reduce carbon footprint</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <span className="text-muted-foreground">Sustainable materials in node construction</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <span className="text-muted-foreground">Energy-efficient edge computing deployment</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <span className="text-muted-foreground">Regular environmental impact assessments</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="impact" className="space-y-6">
                <div className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        2024 Impact Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-foreground">Network Uptime</h4>
                            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">99.9%</span>
                          </div>
                          <Progress value={99.9} className="h-2" />
                          <p className="text-xs text-muted-foreground/70 mt-1">Industry-leading reliability</p>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-foreground">Response Time</h4>
                            <span className="text-sm font-semibold text-green-600 dark:text-green-400">&lt;50ms</span>
                          </div>
                          <Progress value={95} className="h-2" />
                          <p className="text-xs text-muted-foreground/70 mt-1">Average local service response</p>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-foreground">Security Score</h4>
                            <span className="text-sm font-semibold text-green-600 dark:text-green-400">100%</span>
                          </div>
                          <Progress value={100} className="h-2" />
                          <p className="text-xs text-muted-foreground/70 mt-1">Zero confirmed breaches</p>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-foreground">Community Satisfaction</h4>
                            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">94%</span>
                          </div>
                          <Progress value={94} className="h-2" />
                          <p className="text-xs text-muted-foreground/70 mt-1">Based on user feedback</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Wifi className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          Community Benefits
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Cities Served</span>
                            <span className="font-semibold">2</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Nodes Deployed</span>
                            <span className="font-semibold">15+</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Monthly Users</span>
                            <span className="font-semibold">10,000+</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Revenue Shared</span>
                            <span className="font-semibold">$25,000</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
                          Technical Performance
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Uptime</span>
                            <span className="font-semibold">99.9%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Avg Response</span>
                            <span className="font-semibold">&lt;50ms</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Data Processed</span>
                            <span className="font-semibold">1TB+/mo</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Security Incidents</span>
                            <span className="font-semibold">0</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="governance" className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      Governance & Oversight
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert className="border-purple-500/20 bg-purple-500/5">
                      <Award className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <AlertDescription className="text-purple-800 dark:text-purple-200">
                        <strong>PBC Commitment:</strong> Our Board of Directors includes public benefit experts ensuring
                        we remain true to our mission while maintaining sustainable business operations.
                      </AlertDescription>
                    </Alert>

                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Stakeholder Engagement</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-foreground">Monthly Community Meetings</h4>
                            <p className="text-sm text-muted-foreground">Regular engagement in deployment areas</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-foreground">Annual Impact Assessment</h4>
                            <p className="text-sm text-muted-foreground">Comprehensive public benefit evaluation</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <Users className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-foreground">Stakeholder Surveys</h4>
                            <p className="text-sm text-muted-foreground">Regular feedback and improvement sessions</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <Mail className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-foreground">Open Communication</h4>
                            <p className="text-sm text-muted-foreground">Multiple channels for community concerns</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="goals" className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      2025 Strategic Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Alert className="border-emerald-500/20 bg-emerald-500/5">
                        <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <AlertDescription className="text-emerald-600 dark:text-emerald-400 dark:text-emerald-200">
                          <strong>Growth Trajectory:</strong> Building on our 2024 success to expand impact and reach more communities.
                        </AlertDescription>
                      </Alert>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border border-border rounded-lg">
                          <h4 className="font-semibold text-foreground mb-2">🌍 Geographic Expansion</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Expand to 5 additional cities</li>
                            <li>• Deploy 50+ new infrastructure nodes</li>
                            <li>• Establish regional partnerships</li>
                          </ul>
                        </div>
                        <div className="p-4 border border-border rounded-lg">
                          <h4 className="font-semibold text-foreground mb-2">👥 User Growth</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Achieve 100,000+ monthly active users</li>
                            <li>• Increase user satisfaction to 96%</li>
                            <li>• Expand service offerings</li>
                          </ul>
                        </div>
                        <div className="p-4 border border-border rounded-lg">
                          <h4 className="font-semibold text-foreground mb-2">💰 Economic Impact</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Increase revenue sharing to $100,000+</li>
                            <li>• Create 25+ local jobs</li>
                            <li>• Support local business development</li>
                          </ul>
                        </div>
                        <div className="p-4 border border-border rounded-lg">
                          <h4 className="font-semibold text-foreground mb-2">🎓 Community Programs</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Launch digital literacy training</li>
                            <li>• Establish tech education partnerships</li>
                            <li>• Create community learning hubs</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Contact Form Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <ContactForm />

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="font-semibold text-foreground">Report Inquiries</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-foreground">Transparency Questions</p>
                      <p className="text-muted-foreground">transparency@forhem.com</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Community Feedback</p>
                      <p className="text-muted-foreground">community@forhem.com</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Impact Inquiries</p>
                      <p className="text-muted-foreground">impact@forhem.com</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Response Time</p>
                      <p className="text-muted-foreground">Within 48 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">Related Documents</h3>
                  <div className="space-y-2 text-sm">
                    <a href="/privacy-policy" className="block text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:text-emerald-400 dark:text-emerald-200">
                      → Privacy Policy
                    </a>
                    <a href="/terms" className="block text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:text-emerald-400 dark:text-emerald-200">
                      → Terms of Service
                    </a>
                    <a href="/pbc-charter" className="block text-emerald-600 dark:text-emerald-400 hover:text-emerald-600 dark:text-emerald-400 dark:text-emerald-200">
                      → PBC Charter
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground/70 pt-8 border-t border-border">
          <p className="mb-2">
            <strong>Last updated:</strong> {new Date().toISOString().slice(0,10)}
          </p>
          <p className="mb-2">
            This transparency report will be updated annually to reflect our ongoing commitment to our
            public benefit mission and community impact.
          </p>
          <p className="text-xs">
            <em>Join us in building a more connected, equitable, and sustainable future for all communities.</em>
          </p>
        </div>
      </div>
    </main>
  );
}