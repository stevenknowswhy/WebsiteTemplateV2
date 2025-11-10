/**
 * Nodes Table Component
 * Comprehensive table with filters, search, pagination, and node management
 */

'use client';

import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/lib/auth/admin-auth-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { PermissionGuard } from '@/components/admin/PermissionGuard';
import { NodeDetail } from '@/components/admin/NodeDetail';
import { NodeStatusCard } from '@/components/admin/NodeStatusCard';
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  MapPin,
  Server,
  Wifi,
  WifiOff,
  Activity,
  Clock,
  Settings,
  Eye,
  Power,
  PowerOff,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

interface Node {
  id: string;
  node_id: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance' | 'error' | 'pending_install';
  location?: string;
  firmware_version?: string;
  last_seen?: string;
  ip_address?: string;
  network_status?: boolean;
  battery_level?: number;
  energy_generated_kwh?: number;
  alerts_count?: number;
  created_at: string;
}

interface FilterState {
  search: string;
  status: string;
  location: string;
}

export function NodesTable() {
  const { user } = useAdminAuth();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'all',
    location: 'all',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNodes, setTotalNodes] = useState(0);
  const nodesPerPage = 10;

  // Fetch nodes data
  const fetchNodes = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: nodesPerPage.toString(),
        ...filters,
      });

      const response = await fetch(`/api/admin/nodes?${params}`);
      if (!response.ok) throw new Error('Failed to fetch nodes');

      const data = await response.json();
      setNodes(data.nodes || []);
      setTotalNodes(data.total || 0);
    } catch (error) {
      console.error('Error fetching nodes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNodes();
  }, [currentPage, filters]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; icon: React.ReactNode; text: string }> = {
      active: {
        color: 'bg-green-100 text-green-800',
        icon: <CheckCircle className="h-3 w-3" />,
        text: 'Active',
      },
      inactive: {
        color: 'bg-gray-100 text-gray-800',
        icon: <PowerOff className="h-3 w-3" />,
        text: 'Inactive',
      },
      maintenance: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: <Settings className="h-3 w-3" />,
        text: 'Maintenance',
      },
      error: {
        color: 'bg-red-100 text-red-800',
        icon: <AlertTriangle className="h-3 w-3" />,
        text: 'Error',
      },
      pending_install: {
        color: 'bg-blue-100 text-blue-800',
        icon: <Clock className="h-3 w-3" />,
        text: 'Pending Install',
      },
    };

    const variant = variants[status] || variants.inactive;

    return (
      <Badge className={variant.color}>
        <span className="flex items-center gap-1">
          {variant.icon}
          {variant.text}
        </span>
      </Badge>
    );
  };

  const handleNodeAction = async (nodeId: string, action: string) => {
    try {
      const response = await fetch(`/api/admin/nodes/${nodeId}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) throw new Error('Failed to perform action');

      // Refresh nodes after action
      fetchNodes();
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
    }
  };

  const exportNodes = async () => {
    try {
      const response = await fetch('/api/admin/nodes/export');
      if (!response.ok) throw new Error('Failed to export nodes');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nodes-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting nodes:', error);
    }
  };

  const totalPages = Math.ceil(totalNodes / nodesPerPage);

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Network Nodes
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchNodes()}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <PermissionGuard permission="export_data">
                <Button variant="outline" size="sm" onClick={exportNodes}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </PermissionGuard>
            </div>
          </CardTitle>
          <CardDescription>
            Monitor and manage your Hello Smart Node deployment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search nodes by name, ID, or location..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select
                value={filters.status}
                onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="pending_install">Pending Install</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.location}
                onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="san-francisco">San Francisco</SelectItem>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="tokyo">Tokyo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nodes Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Node</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Network</TableHead>
                <TableHead>Battery</TableHead>
                <TableHead>Energy</TableHead>
                <TableHead>Alerts</TableHead>
                <TableHead>Last Seen</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <div className="flex items-center justify-center">
                      <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                      Loading nodes...
                    </div>
                  </TableCell>
                </TableRow>
              ) : nodes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                    No nodes found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                nodes.map((node) => (
                  <TableRow key={node.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <div className="font-medium">{node.name}</div>
                        <div className="text-sm text-gray-500">{node.node_id}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(node.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        {node.location || 'Unknown'}
                      </div>
                    </TableCell>
                    <TableCell>
                      {node.network_status ? (
                        <Badge variant="outline" className="text-green-600">
                          <Wifi className="h-3 w-3 mr-1" />
                          Online
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-red-600">
                          <WifiOff className="h-3 w-3 mr-1" />
                          Offline
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {node.battery_level !== undefined ? (
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                node.battery_level > 50
                                  ? 'bg-green-500'
                                  : node.battery_level > 20
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${node.battery_level}%` }}
                            />
                          </div>
                          <span className="text-sm">{node.battery_level}%</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {node.energy_generated_kwh ? (
                        <span className="font-medium">
                          {node.energy_generated_kwh.toFixed(1)} kWh
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {node.alerts_count ? (
                        <Badge variant={node.alerts_count > 0 ? 'destructive' : 'secondary'}>
                          {node.alerts_count}
                        </Badge>
                      ) : (
                        <Badge variant="secondary">0</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {node.last_seen ? (
                        <div className="text-sm">
                          {new Date(node.last_seen).toLocaleDateString()}
                          <div className="text-gray-500">
                            {new Date(node.last_seen).toLocaleTimeString()}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">Never</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedNode(node)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Node Details: {node.name}</DialogTitle>
                              <DialogDescription>
                                Comprehensive information and management for this node
                              </DialogDescription>
                            </DialogHeader>
                            {selectedNode && <NodeDetail node={selectedNode} />}
                          </DialogContent>
                        </Dialog>

                        <PermissionGuard permission="execute_node_commands">
                          {node.status === 'active' ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleNodeAction(node.id, 'deactivate')}
                              title="Deactivate Node"
                            >
                              <PowerOff className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleNodeAction(node.id, 'activate')}
                              title="Activate Node"
                            >
                              <Power className="h-4 w-4" />
                            </Button>
                          )}
                        </PermissionGuard>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-4 border-t">
              <div className="text-sm text-gray-500">
                Showing {((currentPage - 1) * nodesPerPage) + 1} to{' '}
                {Math.min(currentPage * nodesPerPage, totalNodes)} of {totalNodes} nodes
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}