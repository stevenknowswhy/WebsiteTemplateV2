/**
 * Quick Actions Component
 * Common admin actions for quick access
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PermissionGuard } from '@/components/admin/PermissionGuard';
import { acknowledgeAlert, resolveAlert } from '@/lib/admin/server-actions';
import { createNode } from '@/lib/admin/server-actions';
import { useFormState } from 'react-dom';
import {
  Plus,
  RefreshCw,
  Send,
  Download,
  AlertTriangle,
  CheckCircle,
  Users,
  Server,
} from 'lucide-react';

export function QuickActions() {
  const [createNodeOpen, setCreateNodeOpen] = useState(false);
  const [broadcastOpen, setBroadcastOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Common administrative tasks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Create Node */}
        <PermissionGuard permission="create_nodes">
          <Dialog open={createNodeOpen} onOpenChange={setCreateNodeOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Add New Node
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Node</DialogTitle>
                <DialogDescription>
                  Register a new Hello Smart Node in your network
                </DialogDescription>
              </DialogHeader>
              <CreateNodeForm onClose={() => setCreateNodeOpen(false)} />
            </DialogContent>
          </Dialog>
        </PermissionGuard>

        {/* Broadcast Message */}
        <PermissionGuard permission="manage_nodes">
          <Dialog open={broadcastOpen} onOpenChange={setBroadcastOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Send className="h-4 w-4 mr-2" />
                Broadcast Message
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Broadcast Message</DialogTitle>
                <DialogDescription>
                  Send a message to all active nodes
                </DialogDescription>
              </DialogHeader>
              <BroadcastMessageForm onClose={() => setBroadcastOpen(false)} />
            </DialogContent>
          </Dialog>
        </PermissionGuard>

        {/* Refresh Data */}
        <Button variant="outline" className="w-full justify-start" onClick={() => window.location.reload()}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Dashboard
        </Button>

        {/* Export Data */}
        <PermissionGuard permission="export_data">
          <Button variant="outline" className="w-full justify-start">
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
        </PermissionGuard>

        {/* Acknowledge All Critical Alerts */}
        <PermissionGuard permission="acknowledge_alerts">
          <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Acknowledge All Critical
          </Button>
        </PermissionGuard>

        {/* System Maintenance */}
        <PermissionGuard permission="system_maintenance">
          <Button variant="outline" className="w-full justify-start text-orange-600 hover:text-orange-700">
            <Server className="h-4 w-4 mr-2" />
            System Maintenance
          </Button>
        </PermissionGuard>
      </CardContent>
    </Card>
  );
}

function CreateNodeForm({ onClose }: { onClose: () => void }) {
  const [state, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    // Simple server action for demo - will be enhanced later
    const name = formData.get('name') as string;
    const location = formData.get('location') as string;

    if (!name || !location) {
      return { success: false, error: 'Name and location are required' };
    }

    // This would normally call the server action
    console.log('Creating node:', { name, location });

    return { success: true, data: { name, location } };
  }, { success: false, error: '' });

  if (state.success) {
    return (
      <div className="text-center py-6">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium">Node Created Successfully</h3>
        <p className="text-gray-600 mb-4">The new node has been added to your network.</p>
        <Button onClick={onClose}>Done</Button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nodeId">Node ID</Label>
        <Input
          id="nodeId"
          name="nodeId"
          placeholder="e.g., SF-HSN-001"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Node Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="e.g., Main Library Node"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Node Type</Label>
        <Select name="type" required>
          <SelectTrigger>
            <SelectValue placeholder="Select node type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hello_smart_node">Hello Smart Node</SelectItem>
            <SelectItem value="city_safe_node">City Safe Node</SelectItem>
            <SelectItem value="edge_infrastructure">Edge Infrastructure</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          placeholder="Full address"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            id="latitude"
            name="latitude"
            type="number"
            step="0.000001"
            placeholder="37.7749"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            id="longitude"
            name="longitude"
            type="number"
            step="0.000001"
            placeholder="-122.4194"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="connectionType">Connection Type</Label>
        <Select name="connectionType">
          <SelectTrigger>
            <SelectValue placeholder="Select connection type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fiber">Fiber</SelectItem>
            <SelectItem value="cable">Cable</SelectItem>
            <SelectItem value="dsl">DSL</SelectItem>
            <SelectItem value="wireless">Wireless</SelectItem>
            <SelectItem value="satellite">Satellite</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {state.error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
          {state.error}
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Create Node</Button>
      </div>
    </form>
  );
}

function BroadcastMessageForm({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setIsSending(true);
    try {
      // TODO: Implement broadcast functionality
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setMessage('');
      onClose();
    } catch (error) {
      console.error('Error broadcasting message:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Enter message to broadcast to all nodes..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label>Recipients</Label>
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Active Nodes</SelectItem>
            <SelectItem value="online">Online Nodes Only</SelectItem>
            <SelectItem value="error">Nodes with Errors</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSend} disabled={!message.trim() || isSending}>
          {isSending ? 'Sending...' : 'Send Broadcast'}
        </Button>
      </div>
    </div>
  );
}