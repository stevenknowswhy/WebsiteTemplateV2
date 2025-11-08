"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Trophy,
  Users,
  Building2,
  Globe,
  Zap,
  TreePine,
  Shield,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";

// TODO: Phase 2 Enhancement - Connect to actual milestone data from backend
// TODO: Add interactive animations and transitions between milestones
// TODO: Implement filtering by category and date range
// TODO: Add detailed modal views for each milestone
// TODO: Integrate with video content and media galleries
// TODO: Add social sharing capabilities for milestones
// TODO: Implement future milestone projection tool
// TODO: Connect to analytics for timeline engagement tracking

interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  category: "founding" | "product" | "partnership" | "impact" | "expansion" | "funding";
  icon: React.ReactNode;
  details: {
    achievements: string[];
    metrics?: Record<string, string>;
    media?: {
      type: "image" | "video" | "document";
      url: string;
      caption: string;
    }[];
  };
  status: "completed" | "in-progress" | "planned";
}

const milestones: Milestone[] = [
  {
    id: "founding-2023",
    date: "2023-01-15",
    title: "Forhem PBC Founded",
    description: "Established as a Public Benefit Corporation with mission to democratize smart city infrastructure",
    category: "founding",
    icon: <Building2 className="h-5 w-5 text-purple-600" />,
    status: "completed",
    details: {
      achievements: [
        "PBC incorporation completed",
        "Initial seed funding secured",
        "Founding team assembled",
        "Mission and charter established"
      ],
      metrics: {
        "Initial Funding": "$2.5M",
        "Founding Team": "5 members",
        "Advisory Board": "3 members"
      }
    }
  },
  {
    id: "prototype-2023",
    date: "2023-06-20",
    title: "Hello Smart Node Prototype",
    description: "First working prototype of solar-powered connectivity node with integrated features",
    category: "product",
    icon: <Zap className="h-5 w-5 text-yellow-600" />,
    status: "completed",
    details: {
      achievements: [
        "Hardware prototype completed",
        "Solar integration tested",
        "Connectivity hub functional",
        "Environmental sensors operational"
      ],
      metrics: {
        "Power Generation": "2kW peak",
        "Battery Capacity": "10kWh",
        "Connectivity": "5G + Wi-Fi 6",
        "Sensor Suite": "8 sensors"
      }
    }
  },
  {
    id: "pilot-2023",
    date: "2023-09-10",
    title: "San Francisco Pilot Launch",
    description: "First municipal pilot program launched with City of San Francisco",
    category: "partnership",
    icon: <Users className="h-5 w-5 text-blue-600" />,
    status: "completed",
    details: {
      achievements: [
        "City partnership agreement signed",
        "3 pilot locations installed",
        "Community engagement program launched",
        "Revenue sharing model implemented"
      ],
      metrics: {
        "Pilot Locations": "3 sites",
        "Community Reach": "15,000 residents",
        "Monthly Revenue": "$8,500",
        "User Adoption": "2,300 users"
      }
    }
  },
  {
    id: "city-safe-2024",
    date: "2024-02-15",
    title: "City Safe Platform Launch",
    description: "Critical infrastructure platform launched for emergency response and public safety",
    category: "product",
    icon: <Shield className="h-5 w-5 text-green-600" />,
    status: "completed",
    details: {
      achievements: [
        "Emergency response system integrated",
        "Backup power systems deployed",
        "Security protocols hardened",
        "First responder connectivity established"
      ],
      metrics: {
        "Response Time": "< 30 seconds",
        "Uptime": "99.99%",
        "Security Rating": "Class 1",
        "Coverage Area": "2.5 sq miles"
      }
    }
  },
  {
    id: "seattle-expansion-2024",
    date: "2024-05-01",
    title: "Seattle Market Expansion",
    description: "Expanded operations to Seattle with 5 new deployment locations",
    category: "expansion",
    icon: <Globe className="h-5 w-5 text-indigo-600" />,
    status: "completed",
    details: {
      achievements: [
        "Seattle city partnership established",
        "5 commercial properties secured",
        "Installation team trained locally",
        "Community outreach program launched"
      ],
      metrics: {
        "New Locations": "5 sites",
        "Property Partners": "4 partners",
        "Projected Revenue": "$25,000/month",
        "Jobs Created": "12 local jobs"
      }
    }
  },
  {
    id: "impact-milestone-2024",
    date: "2024-08-20",
    title: "Environmental Impact Milestone",
    description: "Achieved significant environmental benefits through renewable energy deployment",
    category: "impact",
    icon: <TreePine className="h-5 w-5 text-green-500" />,
    status: "completed",
    details: {
      achievements: [
        "1M kWh clean energy generated",
        "500 tons CO2 emissions avoided",
        "Air quality monitoring network established",
        "Sustainability certification achieved"
      ],
      metrics: {
        "Clean Energy": "1,000,000 kWh",
        "CO2 Avoided": "500 tons",
        "Air Quality Sensors": "45 sensors",
        "Trees Equivalent": "23,000 trees"
      }
    }
  },
  {
    id: "series-a-2024",
    date: "2024-10-15",
    title: "Series A Funding Round",
    description: "Closed Series A funding to accelerate national expansion",
    category: "funding",
    icon: <Trophy className="h-5 w-5 text-yellow-500" />,
    status: "in-progress",
    details: {
      achievements: [
        "Term sheet signed with lead investor",
        "Due diligence process initiated",
        "Growth plan validated",
        "Expansion roadmap finalized"
      ],
      metrics: {
        "Target Funding": "$15M",
        "Lead Investors": "2 confirmed",
        "Expansion Markets": "12 cities",
        "Projected Growth": "400% YoY"
      }
    }
  },
  {
    id: "national-rollout-2025",
    date: "2025-03-01",
    title: "National Rollout Initiative",
    description: "Launch national expansion to 50+ cities across the United States",
    category: "expansion",
    icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
    status: "planned",
    details: {
      achievements: [
        "National deployment strategy finalized",
        "Regional hub network established",
        "Manufacturing partnerships secured",
        "Federal programs integration initiated"
      ],
      metrics: {
        "Target Cities": "50+ cities",
        "Projected Nodes": "1,000+ nodes",
        "Expected Jobs": "500+ jobs",
        "Annual Revenue Target": "$50M+"
      }
    }
  }
];

export default function InteractiveTimeline() {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(milestones[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const filteredMilestones = selectedCategory === "all"
    ? milestones
    : milestones.filter(m => m.category === selectedCategory);

  const categories = [
    { value: "all", label: "All Milestones", color: "bg-gray-500" },
    { value: "founding", label: "Founding", color: "bg-purple-500" },
    { value: "product", label: "Product", color: "bg-yellow-500" },
    { value: "partnership", label: "Partnerships", color: "bg-blue-500" },
    { value: "impact", label: "Impact", color: "bg-green-500" },
    { value: "expansion", label: "Expansion", color: "bg-indigo-500" },
    { value: "funding", label: "Funding", color: "bg-yellow-500" }
  ];

  // TODO: Implement smooth timeline animation
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          if (next >= filteredMilestones.length) {
            setIsPlaying(false);
            return 0;
          }
          setSelectedMilestone(filteredMilestones[next]);
          return next;
        });
      }, 3000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, filteredMilestones]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
    setSelectedMilestone(filteredMilestones[0]);
  };

  const handlePrevious = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
    setSelectedMilestone(filteredMilestones[newIndex]);
  };

  const handleNext = () => {
    const newIndex = Math.min(currentIndex + 1, filteredMilestones.length - 1);
    setCurrentIndex(newIndex);
    setSelectedMilestone(filteredMilestones[newIndex]);
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat?.color || "bg-gray-500";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold">Forhem Journey Timeline</h2>
            <Badge variant="outline" className="text-xs">
              {filteredMilestones.length} milestones
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            {/* Playback Controls */}
            <div className="flex items-center space-x-1 border rounded-md p-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-3 w-3" />
                ) : (
                  <Play className="h-3 w-3" />
                )}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleNext}
                disabled={currentIndex === filteredMilestones.length - 1}
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleReset}
              >
                <RotateCcw className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Category Filter */}
      <Card className="p-4">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
            {categories.map((category) => (
              <TabsTrigger key={category.value} value={category.value} className="text-xs">
                <div className={`size-2 rounded-full ${category.color} mr-1`}></div>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </Card>

      {/* Main Timeline and Detail View */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Timeline Visualization */}
        <Card className="lg:col-span-2 p-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>Timeline Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* TODO: Replace with actual timeline visualization component */}
            <div className="space-y-4">
              {filteredMilestones.map((milestone, index) => (
                <div
                  key={milestone.id}
                  className={`flex items-start space-x-4 p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedMilestone?.id === milestone.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                      : "border-border hover:bg-muted"
                  }`}
                  onClick={() => {
                    setSelectedMilestone(milestone);
                    setCurrentIndex(index);
                    setIsPlaying(false);
                  }}
                >
                  <div className="flex-shrink-0">
                    <div className={`size-10 rounded-full ${getCategoryColor(milestone.category)} bg-opacity-20 flex items-center justify-center`}>
                      {milestone.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold">{milestone.title}</h4>
                      <Badge
                        variant={milestone.status === "completed" ? "default" :
                                milestone.status === "in-progress" ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {milestone.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{milestone.description}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(milestone.date)}</p>
                  </div>
                  {index === currentIndex && isPlaying && (
                    <div className="animate-pulse">
                      <div className="size-2 bg-blue-600 rounded-full"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Milestone Details Panel */}
        <div className="space-y-4">
          {selectedMilestone ? (
            <Card className="p-4">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  {selectedMilestone.icon}
                  <CardTitle className="text-lg">{selectedMilestone.title}</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatDate(selectedMilestone.date)}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{selectedMilestone.description}</p>

                {/* Achievements */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Key Achievements</h4>
                  <ul className="space-y-1">
                    {selectedMilestone.details.achievements.map((achievement, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-start space-x-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics */}
                {selectedMilestone.details.metrics && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Key Metrics</h4>
                    <div className="space-y-1">
                      {Object.entries(selectedMilestone.details.metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{key}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TODO: Add media gallery */}
                {/* TODO: Add social sharing */}
                {/* TODO: Add related milestones */}
              </CardContent>
            </Card>
          ) : (
            <Card className="p-4 text-center">
              <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Select a milestone to view detailed information
              </p>
            </Card>
          )}

          {/* Timeline Statistics */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 text-sm">Journey Statistics</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Milestones:</span>
                <span>{milestones.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Completed:</span>
                <span>{milestones.filter(m => m.status === "completed").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">In Progress:</span>
                <span>{milestones.filter(m => m.status === "in-progress").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Planned:</span>
                <span>{milestones.filter(m => m.status === "planned").length}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* TODO: Add advanced features */}
      {/*
        - Interactive timeline with smooth animations
        - Milestone detail modals with rich media
        - Category filtering and date range selection
        - Social sharing for individual milestones
        - Export timeline functionality
        - Future milestone projection tool
        - Integration with project management systems
        - Collaborative milestone planning
      */}
    </div>
  );
}