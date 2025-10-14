import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import {
  LayoutDashboard,
  MessageSquare,
  Bell,
  Clock,
  CheckCircle,
  TrendingUp,
  Edit,
  Trash2,
  Plus,
  Calendar,
  User,
  Droplets,
  Construction,
  Heart,
  Zap,
  Trash2 as WasteIcon,
  TreeDeciduous,
  FileText,
} from 'lucide-react';

export default function AdminDashboard() {
  const { issues, updateIssue, notices, addNotice, deleteNotice } = useAuth();
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [issueFilter, setIssueFilter] = useState<'all' | 'pending' | 'in-progress' | 'resolved'>('all');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNoticeDialogOpen, setIsNoticeDialogOpen] = useState(false);
  
  // Issue update form
  const [updateStatus, setUpdateStatus] = useState('');
  
  // Notice form
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticePriority, setNoticePriority] = useState('normal');

  const filteredIssues = issueFilter === 'all' 
    ? issues 
    : issues.filter((issue) => issue.status === issueFilter);

  const stats = {
    totalIssues: issues.length,
    pending: issues.filter((i) => i.status === 'pending').length,
    inProgress: issues.filter((i) => i.status === 'in-progress').length,
    resolved: issues.filter((i) => i.status === 'resolved').length,
    totalNotices: notices.length,
  };

  const handleEditIssue = (issue: any) => {
    setSelectedIssue(issue);
    setUpdateStatus(issue.status);
    setIsEditDialogOpen(true);
  };

  const handleUpdateIssue = async () => {
    if (!selectedIssue) return;

    await updateIssue(selectedIssue.id, {
      status: updateStatus as any,
    });

    setIsEditDialogOpen(false);
    setSelectedIssue(null);
    setUpdateStatus('');
  };

  const handleAddNotice = async () => {
    if (!noticeTitle || !noticeContent) {
      return;
    }

    await addNotice({
      title: noticeTitle,
      content: noticeContent,
      priority: noticePriority as any,
    });

    setIsNoticeDialogOpen(false);
    setNoticeTitle('');
    setNoticeContent('');
    setNoticePriority('normal');
  };

  const handleDeleteNotice = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      await deleteNotice(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'resolved':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'closed':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Water':
        return <Droplets className="h-4 w-4" />;
      case 'Roads':
        return <Construction className="h-4 w-4" />;
      case 'Health':
        return <Heart className="h-4 w-4" />;
      case 'Electricity':
        return <Zap className="h-4 w-4" />;
      case 'Waste Management':
        return <WasteIcon className="h-4 w-4" />;
      case 'Environment':
        return <TreeDeciduous className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getNoticePriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'normal':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'low':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-300';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'High Priority';
      case 'normal':
        return 'Normal';
      case 'low':
        return 'Low Priority';
      default:
        return 'Normal';
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 to-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-green-600 text-white rounded-xl">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-4xl">Admin Dashboard</h1>
              <p className="text-gray-600">Manage issues and notices for Velookara Panchayat</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="shadow-lg border-blue-200">
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl">{stats.totalIssues}</div>
              <div className="text-xs text-gray-600">Total Issues</div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-yellow-200">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
              <div className="text-2xl">{stats.pending}</div>
              <div className="text-xs text-gray-600">Pending</div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-orange-200">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl">{stats.inProgress}</div>
              <div className="text-xs text-gray-600">In Progress</div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-green-200">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl">{stats.resolved}</div>
              <div className="text-xs text-gray-600">Resolved</div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-purple-200">
            <CardContent className="p-4 text-center">
              <Bell className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl">{stats.totalNotices}</div>
              <div className="text-xs text-gray-600">Active Notices</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="issues" className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="issues">
              <MessageSquare className="h-4 w-4 mr-2" />
              Issues Management
            </TabsTrigger>
            <TabsTrigger value="notices">
              <Bell className="h-4 w-4 mr-2" />
              Notices Management
            </TabsTrigger>
          </TabsList>

          {/* Issues Tab */}
          <TabsContent value="issues" className="space-y-6">
            {/* Filter */}
            <Card className="shadow-lg">
              <CardContent className="p-4">
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={issueFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setIssueFilter('all')}
                    className={issueFilter === 'all' ? 'bg-green-600 hover:bg-green-700' : ''}
                  >
                    All Issues
                  </Button>
                  <Button
                    variant={issueFilter === 'pending' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setIssueFilter('pending')}
                    className={issueFilter === 'pending' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
                  >
                    Pending
                  </Button>
                  <Button
                    variant={issueFilter === 'in-progress' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setIssueFilter('in-progress')}
                    className={issueFilter === 'in-progress' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                  >
                    In Progress
                  </Button>
                  <Button
                    variant={issueFilter === 'resolved' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setIssueFilter('resolved')}
                    className={issueFilter === 'resolved' ? 'bg-green-600 hover:bg-green-700' : ''}
                  >
                    Resolved
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Issues List */}
            <div className="space-y-4">
              {filteredIssues.map((issue) => (
                <Card key={issue.id} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge variant="outline" className="gap-1">
                            {getCategoryIcon(issue.category)}
                            {issue.category}
                          </Badge>
                          <Badge className={getStatusColor(issue.status)}>
                            {issue.status}
                          </Badge>
                          <Badge variant="outline" className="gap-1">
                            <User className="h-3 w-3" />
                            {issue.reporter_name || 'Unknown'}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl">{issue.title}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditIssue(issue)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Update
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="text-sm text-gray-600 mb-1">Description</h4>
                      <p className="text-gray-700">{issue.description}</p>
                    </div>

                    {issue.location && (
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold">Location:</span> {issue.location}
                      </div>
                    )}

                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Submitted on {new Date(issue.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Notices Tab */}
          <TabsContent value="notices" className="space-y-6">
            <div className="flex justify-end">
              <Dialog open={isNoticeDialogOpen} onOpenChange={setIsNoticeDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Notice
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Post New Notice</DialogTitle>
                    <DialogDescription>
                      Create a new notice for all citizens
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="notice-title">Notice Title</Label>
                      <Input
                        id="notice-title"
                        placeholder="Enter notice title"
                        value={noticeTitle}
                        onChange={(e) => setNoticeTitle(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notice-content">Notice Content</Label>
                      <Textarea
                        id="notice-content"
                        placeholder="Enter detailed notice content..."
                        value={noticeContent}
                        onChange={(e) => setNoticeContent(e.target.value)}
                        rows={6}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notice-priority">Priority</Label>
                      <Select value={noticePriority} onValueChange={setNoticePriority}>
                        <SelectTrigger id="notice-priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => setIsNoticeDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddNotice} className="bg-green-600 hover:bg-green-700">
                        Post Notice
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Notices List */}
            <div className="space-y-4">
              {notices.map((notice) => (
                <Card key={notice.id} className="shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <Badge className={getNoticePriorityColor(notice.priority)} >
                          {getPriorityLabel(notice.priority)}
                        </Badge>
                        <CardTitle className="text-xl mt-2">{notice.title}</CardTitle>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteNotice(notice.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-gray-700 whitespace-pre-line">{notice.content}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {notice.created_by_name || 'Admin'}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(notice.created_at).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Issue Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Update Issue</DialogTitle>
            <DialogDescription>
              Update the status and add a response to this issue
            </DialogDescription>
          </DialogHeader>
          {selectedIssue && (
            <div className="space-y-4 py-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="mb-1">{selectedIssue.title}</h4>
                <p className="text-sm text-gray-600">{selectedIssue.description}</p>
                <div className="mt-2 space-y-1 text-xs text-gray-500">
                  <div>Submitted by: {selectedIssue.reporter_name || 'Unknown'}</div>
                  {selectedIssue.location && <div>Location: {selectedIssue.location}</div>}
                  <div>Category: {selectedIssue.category}</div>
                  <div>Priority: {selectedIssue.priority}</div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="update-status">Status</Label>
                <Select value={updateStatus} onValueChange={setUpdateStatus}>
                  <SelectTrigger id="update-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateIssue} className="bg-green-600 hover:bg-green-700">
                  Update Issue
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
