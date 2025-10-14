import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Calendar,
  Droplets,
  Construction,
  Heart,
  Zap,
  Trash2,
  TreeDeciduous,
} from 'lucide-react';

export default function MyIssues() {
  const { user, issues } = useAuth();
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'resolved'>('all');

  const myIssues = issues.filter((issue) => issue.reported_by === user?.id);

  const filteredIssues = filter === 'all' 
    ? myIssues 
    : myIssues.filter((issue) => issue.status === filter);

  const stats = {
    total: myIssues.length,
    pending: myIssues.filter((i) => i.status === 'pending').length,
    inProgress: myIssues.filter((i) => i.status === 'in-progress').length,
    resolved: myIssues.filter((i) => i.status === 'resolved').length,
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'in-progress':
        return <AlertCircle className="h-4 w-4" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in-progress':
        return 'In Progress';
      case 'resolved':
        return 'Resolved';
      case 'closed':
        return 'Closed';
      default:
        return status;
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
        return <Trash2 className="h-4 w-4" />;
      case 'Environment':
        return <TreeDeciduous className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 to-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl mb-2">My Issues</h1>
              <p className="text-lg text-gray-600">
                Track the status of your submitted issues
              </p>
            </div>
            <Link to="/post-issue">
              <Button className="bg-green-600 hover:bg-green-700">
                <FileText className="mr-2 h-4 w-4" />
                Post New Issue
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setFilter('all')}>
              <CardContent className="p-4 text-center">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                <div className="text-2xl">{stats.total}</div>
                <div className="text-xs text-gray-600">Total Issues</div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setFilter('pending')}>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                <div className="text-2xl">{stats.pending}</div>
                <div className="text-xs text-gray-600">Pending</div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setFilter('in-progress')}>
              <CardContent className="p-4 text-center">
                <AlertCircle className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl">{stats.inProgress}</div>
                <div className="text-xs text-gray-600">In Progress</div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setFilter('resolved')}>
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl">{stats.resolved}</div>
                <div className="text-xs text-gray-600">Resolved</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filter Tabs */}
        <Tabs value={filter} onValueChange={(value) => setFilter(value as any)} className="mb-6">
          <TabsList className="grid w-full md:w-auto grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Issues List */}
        {filteredIssues.length === 0 ? (
          <Card className="shadow-lg">
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl mb-2 text-gray-600">No Issues Found</h3>
              <p className="text-gray-500 mb-6">
                {filter === 'all' 
                  ? "You haven't submitted any issues yet." 
                  : `You don't have any ${filter.toLowerCase()} issues.`}
              </p>
              <Link to="/post-issue">
                <Button className="bg-green-600 hover:bg-green-700">
                  <FileText className="mr-2 h-4 w-4" />
                  Submit Your First Issue
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredIssues.map((issue) => (
              <Card key={issue.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="gap-1">
                          {getCategoryIcon(issue.category)}
                          {issue.category}
                        </Badge>
                        <Badge className={getStatusColor(issue.status)}>
                          {getStatusIcon(issue.status)}
                          <span className="ml-1">{getStatusLabel(issue.status)}</span>
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{issue.title}</CardTitle>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div className="flex items-center gap-1 justify-end">
                        <Calendar className="h-3 w-3" />
                        {new Date(issue.created_at).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm text-gray-600 mb-1">Description</h4>
                    <p className="text-gray-700">{issue.description}</p>
                  </div>

                  {issue.location && (
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Location:</span> {issue.location}
                    </div>
                  )}

                  {issue.priority && (
                    <div className="text-sm">
                      <span className="font-semibold">Priority:</span>{' '}
                      <Badge variant="outline" className={
                        issue.priority === 'critical' ? 'border-red-500 text-red-700' :
                        issue.priority === 'high' ? 'border-orange-500 text-orange-700' :
                        issue.priority === 'medium' ? 'border-yellow-500 text-yellow-700' :
                        'border-gray-500 text-gray-700'
                      }>
                        {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
                      </Badge>
                    </div>
                  )}

                  {issue.status === 'pending' && (
                    <Alert>
                      <Clock className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        Your issue is pending review. Our team will respond soon.
                      </AlertDescription>
                    </Alert>
                  )}

                  {issue.status === 'resolved' && (
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-sm text-green-800">
                        This issue has been resolved. Thank you for your patience!
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
