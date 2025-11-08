import Section from "@/components/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, Clock, Tag, User, ArrowRight, TrendingUp, Award, FileText, MessageSquare, Shield } from "lucide-react";

export default function NewsPage() {
  // TODO: Replace with actual CMS integration
  const featuredArticle = {
    title: "Forhem PBC Secures $25M Series A to Expand Smart City Infrastructure",
    excerpt: "Major funding round will accelerate deployment of Hello Smart Nodes across 25 cities, bringing free Wi-Fi and environmental monitoring to underserved communities.",
    category: "Company News",
    date: "November 7, 2025",
    readTime: "5 min read",
    author: "Sarah Chen",
    image: "/images/news/series-a-funding.jpg",
    featured: true
  };

  const articles = [
    {
      title: "San Francisco Mission District Pilot Connects 12,000 Residents to Free Wi-Fi",
      excerpt: "Three-month pilot program demonstrates the impact of Hello Smart Nodes on digital equity and community connectivity.",
      category: "Case Studies",
      date: "November 1, 2025",
      readTime: "4 min read",
      author: "James Mitchell",
      image: "/images/news/sf-pilot.jpg"
    },
    {
      title: "Environmental Data Shows 30% Improvement in Air Quality Monitoring Coverage",
      excerpt: "New study reveals how smart node networks provide comprehensive environmental data for city planning and public health.",
      category: "Impact Report",
      date: "October 28, 2025",
      readTime: "3 min read",
      author: "Dr. Aisha Patel",
      image: "/images/news/air-quality.jpg"
    },
    {
      title: "Emergency Response Times Decrease by 40% in Seattle Pilot Program",
      excerpt: "City Safe Platform integration with emergency services demonstrates significant improvements in public safety outcomes.",
      category: "Public Safety",
      date: "October 22, 2025",
      readTime: "6 min read",
      author: "Elena Rodriguez",
      image: "/images/news/emergency-response.jpg"
    },
    {
      title: "New Research: Digital Infrastructure as Municipal Revenue Generator",
      excerpt: "University study shows how smart infrastructure can transform from cost center to revenue generator for cities.",
      category: "Research",
      date: "October 15, 2025",
      readTime: "8 min read",
      author: "Marcus Rodriguez",
      image: "/images/news/revenue-research.jpg"
    },
    {
      title: "Forhem PBC Named to Fast Company's Most Innovative Companies List",
      excerpt: "Recognition highlights our innovative approach to combining public benefit with sustainable business models.",
      category: "Awards",
      date: "October 10, 2025",
      readTime: "2 min read",
      author: "Sarah Chen",
      image: "/images/news/award.jpg"
    },
    {
      title: "Partnership with National League of Cities Expands Digital Equity Initiative",
      excerpt: "Strategic collaboration will bring smart infrastructure to 100 additional cities over the next two years.",
      category: "Partnerships",
      date: "October 5, 2025",
      readTime: "4 min read",
      author: "David Kim",
      image: "/images/news/partnership.jpg"
    }
  ];

  const categories = [
    { name: "All", icon: <FileText className="h-4 w-4" />, count: 24 },
    { name: "Company News", icon: <TrendingUp className="h-4 w-4" />, count: 8 },
    { name: "Case Studies", icon: <Award className="h-4 w-4" />, count: 6 },
    { name: "Impact Report", icon: <FileText className="h-4 w-4" />, count: 4 },
    { name: "Public Safety", icon: <Shield className="h-4 w-4" />, count: 3 },
    { name: "Research", icon: <FileText className="h-4 w-4" />, count: 2 },
    { name: "Awards", icon: <Award className="h-4 w-4" />, count: 1 },
    { name: "Partnerships", icon: <MessageSquare className="h-4 w-4" />, count: 3 }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section
        kicker="News & Insights"
        title="Stories of Impact and Innovation"
        description="Follow our journey as we transform urban infrastructure and create lasting community benefits across the country."
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-2xl p-8 mt-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                    {featuredArticle.category}
                  </span>
                  <span className="text-sm text-muted-foreground">{featuredArticle.date}</span>
                </div>
                <h1 className="text-3xl font-bold mb-4">{featuredArticle.title}</h1>
                <p className="text-lg text-muted-foreground mb-6">{featuredArticle.excerpt}</p>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{featuredArticle.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{featuredArticle.readTime}</span>
                  </div>
                </div>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Read Full Story
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
              <div className="lg:w-96">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Featured Image</span>
                  {/* TODO: Replace with actual image */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Category Filter */}
      <Section>
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              size="sm"
              className="flex items-center space-x-2"
            >
              {category.icon}
              <span>{category.name}</span>
              <span className="ml-1 px-2 py-0.5 bg-muted rounded-full text-xs">
                {category.count}
              </span>
            </Button>
          ))}
        </div>
      </Section>

      {/* Articles Grid */}
      <Section
        kicker="Latest Stories"
        title="Recent Updates and Insights"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {articles.map((article, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-muted-foreground">Article Image</span>
                  {/* TODO: Replace with actual image */}
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Newsletter Signup */}
      <Section
        kicker="Stay Connected"
        title="Get the Latest Updates Delivered to Your Inbox"
      >
        <Card className="p-8 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
          <div className="text-center max-w-2xl mx-auto">
            <MessageSquare className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Join Our Newsletter</h3>
            <p className="text-muted-foreground mb-6">
              Get weekly updates on our impact, new deployments, and insights on the future
              of urban infrastructure and digital equity.
            </p>
            {/* TODO: Replace with actual newsletter form component */}
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Newsletter signup form will be integrated here
              </p>
              <Button variant="outline" size="lg">
                Subscribe Now
              </Button>
            </div>
          </div>
        </Card>
      </Section>

      {/* Resources Section */}
      <Section
        kicker="Resources"
        title="Downloads and Media Kit"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Company Overview",
              description: "Complete company information and executive team profiles",
              icon: <FileText className="h-8 w-8 text-blue-600" />
            },
            {
              title: "Technical Specifications",
              description: "Detailed specs for Hello Smart Nodes and City Safe Platform",
              icon: <FileText className="h-8 w-8 text-green-600" />
            },
            {
              title: "Impact Reports",
              description: "Quarterly reports on community impact and environmental benefits",
              icon: <Award className="h-8 w-8 text-purple-600" />
            },
            {
              title: "Media Assets",
              description: "Logos, images, and brand guidelines for press and partners",
              icon: <FileText className="h-8 w-8 text-orange-600" />
            }
          ].map((resource, index) => (
            <Card key={index} className="p-6 text-center group hover:shadow-lg transition-all">
              <div className="flex justify-center mb-4 text-blue-600">
                {resource.icon}
              </div>
              <h4 className="font-semibold mb-2">{resource.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
              <Button variant="outline" size="sm" className="w-full">
                Download PDF
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* Press Contact */}
      <Section>
        <Card className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Press & Media Inquiries</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            For press inquiries, interview requests, or media partnerships, please contact our
            communications team for prompt assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/contact?inquiry=press">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Press Team
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/downloads/media-kit.zip">
                <FileText className="h-4 w-4 mr-2" />
                Download Media Kit
              </Link>
            </Button>
          </div>
        </Card>
      </Section>
    </div>
  );
}