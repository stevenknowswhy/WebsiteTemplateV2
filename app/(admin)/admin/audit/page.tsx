/**
 * Admin Audit Log Page
 * Comprehensive audit log viewer with search, filtering, and export capabilities
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Activity,
  Search,
  Download,
  Filter,
  Calendar,
  User,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  Users,
  AlertCircle,
  CheckCircle,
  XCircle,
  Settings,
  Key,
  Webhook,
  Clock,
  Globe,
  Smartphone,
  MoreHorizontal
} from 'lucide-react';

// Types
interface AuditLog {
  id: string;
  action: string;
  resourceType: string;
  resourceId: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
  };
  createdAt: string;
}

interface AuditStats {
  filters: {
    actions: string[];
    resourceTypes: string[];
    topUsers: Array<{
      userId: string;
      email: string;
      fullName: string;
      count: number;
    }>;
  };
  statistics: {
    totalLogs: number;
    todayLogs: number;
    actionDistribution: Array<{
      action: string;
      count: number;
    }>;
    dailyActivity: Array<{
      date: string;
      count: number;
    }>;
  };
}

const ACTION_ICONS: Record<string, any> = {
  'create': CheckCircle,
  'update': Settings,
  'delete': XCircle,
  'login': User,
  'logout': User,
  'acknowledge_alert': AlertCircle,
  'resolve_alert': CheckCircle,
  'invite_user': Users,
  'create_token': Key,
  'create_webhook': Webhook,
};

const RESOURCE_COLORS: Record<string, string> = {
  'user': 'bg-blue-100 text-blue-800',
  'node': 'bg-green-100 text-green-800',
  'alert': 'bg-yellow-100 text-yellow-800',
  'token': 'bg-purple-100 text-purple-800',
  'webhook': 'bg-pink-100 text-pink-800',
  'tenant': 'bg-gray-100 text-gray-800',
};

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [stats, setStats] = useState<AuditStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 50;

  // Filters
  const [search, setSearch] = useState('');
  const [action, setAction] = useState('all');
  const [resourceType, setResourceType] = useState('all');
  const [userId, setUserId] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // UI States
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [exporting, setExporting] = useState(false);

  // Load data
  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    loadLogs();
  }, [page, search, action, resourceType, userId, dateFrom, dateTo]);

  const loadStats = async () => {
    try {
      const response = await fetch('/api/admin/audit/stats');
      if (!response.ok) throw new Error('Failed to load statistics');
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Failed to load statistics:', err);
    }
  };

  const loadLogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search,
        action,
        resourceType,
        userId,
        dateFrom,
        dateTo,
      });

      const response = await fetch(`/api/admin/audit?${params}`);
      if (!response.ok) throw new Error('Failed to load audit logs');
      const data = await response.json();
      setLogs(data.logs);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load audit logs');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const response = await fetch('/api/admin/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          format: 'csv',
          filters: {
            search,
            action,
            resourceType,
            userId,
            dateFrom,
            dateTo,
          },
        }),
      });

      if (!response.ok) throw new Error('Failed to export audit logs');

      // Create download link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = response.headers.get('Content-Disposition')?.split('filename=')[1]?.replace(/"/g, '') || 'audit-logs.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to export audit logs');
    } finally {
      setExporting(false);
    }
  };

  const handleClearFilters = () => {
    setSearch('');
    setAction('all');
    setResourceType('all');
    setUserId('');
    setDateFrom('');
    setDateTo('');
    setPage(1);
  };

  const getActionIcon = (action: string) => {
    const IconComponent = ACTION_ICONS[action] || Activity;
    return <IconComponent className="h-4 w-4" />;
  };

  const getUserAgentIcon = (userAgent: string) => {
    if (userAgent.toLowerCase().includes('mobile')) {
      return <Smartphone className="h-4 w-4" />;
    }
    return <Globe className="h-4 w-4" />;
  };

  const formatDetails = (details: Record<string, any>) => {
    return Object.entries(details).map(([key, value]) => (
      <div key={key} className="text-sm">
        <span className="font-medium">{key}:</span>{' '}
        <span className="text-muted-foreground">
          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
        </span>
      </div>
    ));
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Audit Log</h1>
          <p className="text-muted-foreground">
            Monitor and search system activity and security events
          </p>
        </div>
        <Button onClick={handleExport} disabled={exporting || logs.length === 0}>
          <Download className="h-4 w-4 mr-2" />
          {exporting ? 'Exporting...' : 'Export CSV'}
        </Button>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.statistics.totalLogs.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Logs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.statistics.todayLogs.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Today's Activity</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.filters.topUsers.length}</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {stats.statistics.dailyActivity.reduce((sum, day) => sum + day.count, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Last 7 Days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Filters</CardTitle>
              <CardDescription>
                Refine audit log results using the filters below
              </CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </Button>
          </div>
        </CardHeader>
        {showFilters && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  placeholder="Search logs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="action">Action</Label>
                <Select value={action} onValueChange={setAction}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="All actions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    {stats?.filters.actions.map((act) => (
                      <SelectItem key={act} value={act}>
                        <div className="flex items-center gap-2">
                          {getActionIcon(act)}
                          {act.replace('_', ' ').toUpperCase()}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="resourceType">Resource Type</Label>
                <Select value={resourceType} onValueChange={setResourceType}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {stats?.filters.resourceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="userId">User</Label>
                <Select value={userId} onValueChange={setUserId}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="All users" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Users</SelectItem>
                    {stats?.filters.topUsers.map((user) => (
                      <SelectItem key={user.userId} value={user.userId}>
                        {user.fullName} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dateFrom">Date From</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="dateTo">Date To</Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleClearFilters}>
                Clear Filters
              </Button>
              <div className="text-sm text-muted-foreground self-center">
                Showing {logs.length} of {total.toLocaleString()} logs
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Device</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      <span className="ml-2">Loading audit logs...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : logs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No audit logs found matching the current filters
                  </TableCell>
                </TableRow>
              ) : (
                logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(log.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(log.createdAt).toLocaleTimeString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-sm">{log.user.fullName}</div>
                          <div className="text-xs text-muted-foreground">{log.user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getActionIcon(log.action)}
                        <span className="text-sm">
                          {log.action.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={RESOURCE_COLORS[log.resourceType] || 'bg-gray-100 text-gray-800'}
                      >
                        {log.resourceType.charAt(0).toUpperCase() + log.resourceType.slice(1)}
                      </Badge>
                      {log.resourceId && (
                        <div className="text-xs text-muted-foreground mt-1">
                          ID: {log.resourceId}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate text-sm">
                        {Object.keys(log.details).length > 0
                          ? Object.keys(log.details).slice(0, 2).join(', ')
                          : 'No details'}
                        {Object.keys(log.details).length > 2 && '...'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-mono">{log.ipAddress}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getUserAgentIcon(log.userAgent)}
                        <span className="text-sm text-muted-foreground">
                          {log.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedLog(log)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Log Details Dialog */}
      {selectedLog && (
        <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Audit Log Details</DialogTitle>
              <DialogDescription>
                Complete information about this audit event
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Timestamp</Label>
                  <p className="text-sm mt-1">
                    {new Date(selectedLog.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label>User</Label>
                  <p className="text-sm mt-1">
                    {selectedLog.user.fullName} ({selectedLog.user.email})
                  </p>
                </div>
                <div>
                  <Label>Action</Label>
                  <p className="text-sm mt-1 flex items-center gap-2">
                    {getActionIcon(selectedLog.action)}
                    {selectedLog.action.replace('_', ' ').toUpperCase()}
                  </p>
                </div>
                <div>
                  <Label>Resource</Label>
                  <p className="text-sm mt-1">
                    <Badge
                      variant="secondary"
                      className={RESOURCE_COLORS[selectedLog.resourceType] || 'bg-gray-100 text-gray-800'}
                    >
                      {selectedLog.resourceType}
                    </Badge>
                    {selectedLog.resourceId && (
                      <span className="ml-2 text-muted-foreground">
                        ID: {selectedLog.resourceId}
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <Label>IP Address</Label>
                  <p className="text-sm mt-1 font-mono">{selectedLog.ipAddress}</p>
                </div>
                <div>
                  <Label>User Agent</Label>
                  <p className="text-sm mt-1 truncate" title={selectedLog.userAgent}>
                    {selectedLog.userAgent}
                  </p>
                </div>
              </div>
              {Object.keys(selectedLog.details).length > 0 && (
                <div>
                  <Label>Details</Label>
                  <div className="mt-1 p-3 bg-muted rounded-md">
                    {formatDetails(selectedLog.details)}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}