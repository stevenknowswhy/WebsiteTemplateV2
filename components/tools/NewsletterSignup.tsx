"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  CheckCircle,
  Globe,
  Building2,
  Users,
  TrendingUp,
  Bell,
  ExternalLink,
  Sparkles
} from "lucide-react";

// TODO: Phase 2 Enhancement - Integrate with actual CRM/email marketing platform
// TODO: Add A/B testing for newsletter signup forms
// TODO: Implement preference center with customizable content delivery
// TODO: Add lead scoring and segmentation based on interests
// TODO: Connect to marketing automation workflows
// TODO: Implement progressive profiling for lead enrichment
// TODO: Add referral program integration
// TODO: Connect to analytics for conversion tracking

interface NewsletterData {
  email: string;
  firstName: string;
  interests: string[];
  role: string;
  organization?: string;
  frequency: "daily" | "weekly" | "monthly";
}

const interestOptions = [
  { id: "smart-cities", label: "Smart City Infrastructure", icon: <Building2 className="h-4 w-4" />, description: "IoT deployment and urban innovation" },
  { id: "revenue-sharing", label: "Revenue Sharing Models", icon: <TrendingUp className="h-4 w-4" />, description: "Public-private partnerships and ROI" },
  { id: "sustainability", label: "Sustainability Impact", icon: <Globe className="h-4 w-4" />, description: "Environmental benefits and clean energy" },
  { id: "public-safety", label: "Public Safety", icon: <Users className="h-4 w-4" />, description: "Emergency response and community security" },
  { id: "technology", label: "Technology Updates", icon: <Sparkles className="h-4 w-4" />, description: "Product releases and technical innovations" },
  { id: "policy", label: "Policy & Governance", icon: <Building2 className="h-4 w-4" />, description: "PBC initiatives and regulatory updates" }
];

const roleOptions = [
  "City Official",
  "Property Owner/Manager",
  "Investor",
  "Technology Partner",
  "Community Member",
  "Student/Researcher",
  "Media/Press",
  "Other"
];

export default function NewsletterSignup() {
  const [formData, setFormData] = useState<NewsletterData>({
    email: "",
    firstName: "",
    interests: [],
    role: "",
    organization: "",
    frequency: "weekly"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // TODO: Implement actual form submission to CRM/email platform
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validate form
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (formData.interests.length === 0) newErrors.interests = "Please select at least one interest";
    if (!formData.role) newErrors.role = "Please select your role";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // TODO: Replace with actual API call to CRM
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSuccess(true);
    setIsSubmitting(false);

    // TODO: Send tracking events to analytics
    console.log("Newsletter signup:", formData);
  };

  const handleInterestToggle = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  if (isSuccess) {
    return (
      <Card className="p-6 text-center">
        <div className="space-y-4">
          <div className="size-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <div className="text-xl font-semibold mb-2">Welcome to the Forhem Network!</div>
            <p className="text-muted-foreground mb-4">
              You're now subscribed to receive updates about smart city innovation and public benefit initiatives.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Check your email for a confirmation message.</p>
              <p>You can update your preferences at any time.</p>
            </div>
          </div>
          <Button
            onClick={() => setIsSuccess(false)}
            variant="outline"
            className="mt-4"
          >
            Subscribe Another Email
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-blue-600" />
            <span>Stay Connected with Smart City Innovation</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Get the latest insights on public benefit technology, revenue sharing models, and community impact.
          </p>
        </CardHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Name *</label>
              <Input
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                placeholder="Enter your first name"
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Your Role *</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-md bg-background ${
                errors.role ? "border-red-500" : ""
              }`}
            >
              <option value="">Select your role</option>
              {roleOptions.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            {errors.role && (
              <p className="text-xs text-red-500 mt-1">{errors.role}</p>
            )}
          </div>

          {/* Organization (Optional) */}
          <div>
            <label className="block text-sm font-medium mb-2">Organization (Optional)</label>
            <Input
              value={formData.organization}
              onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
              placeholder="Company, city, or organization name"
            />
          </div>

          {/* Interest Areas */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Areas of Interest * (Select all that apply)
            </label>
            <div className="grid md:grid-cols-2 gap-3">
              {interestOptions.map((interest) => (
                <div
                  key={interest.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.interests.includes(interest.id)
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                      : "border-border hover:bg-muted"
                  }`}
                  onClick={() => handleInterestToggle(interest.id)}
                >
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={formData.interests.includes(interest.id)}
                      onChange={() => handleInterestToggle(interest.id)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-blue-600">{interest.icon}</span>
                        <span className="text-sm font-medium">{interest.label}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{interest.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {errors.interests && (
              <p className="text-xs text-red-500 mt-1">{errors.interests}</p>
            )}
          </div>

          {/* Frequency Preference */}
          <div>
            <label className="block text-sm font-medium mb-3">Email Frequency</label>
            <div className="flex space-x-4">
              {[
                { value: "daily", label: "Daily" },
                { value: "weekly", label: "Weekly" },
                { value: "monthly", label: "Monthly" }
              ].map((freq) => (
                <label key={freq.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="frequency"
                    value={freq.value}
                    checked={formData.frequency === freq.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value as any }))}
                    className="text-blue-600"
                  />
                  <span className="text-sm">{freq.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Privacy and Terms */}
          <div className="border-t pt-4">
            <div className="flex items-start space-x-2">
              <Checkbox id="privacy" required />
              <label htmlFor="privacy" className="text-sm text-muted-foreground">
                I agree to receive email communications from Forhem PBC and understand I can unsubscribe at any time.
                Your privacy is important to us - read our{" "}
                <a href="/privacy" className="text-blue-600 hover:underline">privacy policy</a>.
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Subscribing...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Subscribe to Newsletter
              </>
            )}
          </Button>
        </form>
      </Card>

      {/* Additional Resources */}
      <Card className="p-4">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Bell className="h-4 w-4" />
            <span>Want more specific updates?</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
              <ExternalLink className="h-3 w-3 mr-1" />
              City Updates
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
              <ExternalLink className="h-3 w-3 mr-1" />
              Investor Briefings
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
              <ExternalLink className="h-3 w-3 mr-1" />
              Partner News
            </Badge>
          </div>
        </div>
      </Card>

      {/* TODO: Add advanced features */}
      {/*
        - Progressive profiling forms
        - Lead nurturing workflow integration
        - A/B testing for signup forms
        - Social proof and testimonials
        - Referral program integration
        - Preference center portal
        - Email preview and customization
        - Integration with marketing automation
      */}
    </div>
  );
}