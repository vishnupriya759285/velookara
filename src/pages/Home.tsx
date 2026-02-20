import { Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { usePanchayat } from '../lib/PanchayatContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { 
  MessageSquare, 
  Bell, 
  FileText, 
  Users, 
  CheckCircle, 
  Clock,
  Droplets,
  Construction,
  Heart,
  Zap,
  Trash2,
  TreeDeciduous
} from 'lucide-react';

export default function Home() {
  const { user, issues, notices } = useAuth();
  const { displayName, displaySubtitle, isSelected } = usePanchayat();

  const stats = {
    totalIssues: issues.length,
    pending: issues.filter(i => i.status === 'pending').length,
    inProgress: issues.filter(i => i.status === 'in-progress').length,
    resolved: issues.filter(i => i.status === 'resolved').length,
    activeNotices: notices.length,
  };

  const categories = [
    { name: 'Water Supply', icon: Droplets, color: 'bg-blue-100 text-blue-600' },
    { name: 'Roads', icon: Construction, color: 'bg-orange-100 text-orange-600' },
    { name: 'Health', icon: Heart, color: 'bg-red-100 text-red-600' },
    { name: 'Electricity', icon: Zap, color: 'bg-yellow-100 text-yellow-600' },
    { name: 'Waste Management', icon: Trash2, color: 'bg-green-100 text-green-600' },
    { name: 'Environment', icon: TreeDeciduous, color: 'bg-emerald-100 text-emerald-600' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                Smart Rural Governance
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl">
                Welcome to {displayName}
              </h1>
              <p className="text-xl text-green-50">
                Empowering our community through transparent communication. Report issues, track progress, 
                and stay updated with official notices{isSelected ? ` from ${displaySubtitle}` : ' across Kerala'}.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                {user ? (
                  user.role === 'citizen' ? (
                    <>
                      <Link to="/post-issue">
                        <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
                          <FileText className="mr-2 h-5 w-5" />
                          Post an Issue
                        </Button>
                      </Link>
                      <Link to="/my-issues">
                        <Button size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20 hover:text-white transition-all shadow-lg font-semibold">
                          <MessageSquare className="mr-2 h-5 w-5" />
                          My Issues
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Link to="/admin">
                      <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
                        Go to Dashboard
                      </Button>
                    </Link>
                  )
                ) : (
                  <>
                    <Link to="/register">
                      <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
                        Get Started
                      </Button>
                    </Link>
                    <Link to="/notices">
                      <Button size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20 hover:text-white transition-all shadow-lg font-semibold">
                        <Bell className="mr-2 h-5 w-5" />
                        View Notices
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1720086302615-b8fedd50d6d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjB2aWxsYWdlJTIwcnVyYWx8ZW58MXx8fHwxNzYwMTY0ODEzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt={displayName}
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="border-green-200">
              <CardContent className="p-4 text-center">
                <div className="inline-flex p-3 rounded-full bg-blue-100 mb-2">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl">{stats.totalIssues}</div>
                <div className="text-xs text-gray-600 mt-1">Total Issues</div>
              </CardContent>
            </Card>
            <Card className="border-yellow-200">
              <CardContent className="p-4 text-center">
                <div className="inline-flex p-3 rounded-full bg-yellow-100 mb-2">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="text-2xl">{stats.pending}</div>
                <div className="text-xs text-gray-600 mt-1">Pending</div>
              </CardContent>
            </Card>
            <Card className="border-orange-200">
              <CardContent className="p-4 text-center">
                <div className="inline-flex p-3 rounded-full bg-orange-100 mb-2">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-2xl">{stats.inProgress}</div>
                <div className="text-xs text-gray-600 mt-1">In Progress</div>
              </CardContent>
            </Card>
            <Card className="border-green-200">
              <CardContent className="p-4 text-center">
                <div className="inline-flex p-3 rounded-full bg-green-100 mb-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl">{stats.resolved}</div>
                <div className="text-xs text-gray-600 mt-1">Resolved</div>
              </CardContent>
            </Card>
            <Card className="border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="inline-flex p-3 rounded-full bg-purple-100 mb-2">
                  <Bell className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-2xl">{stats.activeNotices}</div>
                <div className="text-xs text-gray-600 mt-1">Active Notices</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Issue Categories */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-3">Report Issues by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select a category below to report issues in your area. Our team will address your concerns promptly.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card key={category.name} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-4 rounded-full ${category.color} mb-3 group-hover:scale-110 transition-transform`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <div className="text-sm">{category.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-3">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Three simple steps to make your voice heard and get issues resolved in your community.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4 text-xl">
                1
              </div>
              <h3 className="mb-2">Register & Login</h3>
              <p className="text-sm text-gray-600">
                Create your account with basic details and login securely to access the platform.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4 text-xl">
                2
              </div>
              <h3 className="mb-2">Post Your Issue</h3>
              <p className="text-sm text-gray-600">
                Submit details about the problem in your area with description and optional photos.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4 text-xl">
                3
              </div>
              <h3 className="mb-2">Track Progress</h3>
              <p className="text-sm text-gray-600">
                Monitor real-time updates and responses from panchayat officers until resolution.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Notices */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl mb-2">Recent Notices</h2>
              <p className="text-gray-600">Stay updated with the latest announcements and events</p>
            </div>
            <Link to="/notices">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {notices.slice(0, 3).map((notice) => (
              <Card key={notice.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs mb-3 capitalize">
                    {notice.priority}
                  </div>
                  <h3 className="mb-2 line-clamp-2">{notice.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">{notice.content}</p>
                  <div className="text-xs text-gray-500">
                    {new Date(notice.created_at).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!user && (
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <Users className="h-16 w-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl mb-4">Join Our Community Platform</h2>
              <p className="text-xl text-green-50 mb-8">
                Be part of transparent governance. Register now to report issues and stay connected with your panchayat.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-green-700 hover:bg-white hover:text-green-700 shadow-lg">
                    Register Now
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20 hover:text-white shadow-lg font-semibold">
                    Already have an account? Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
