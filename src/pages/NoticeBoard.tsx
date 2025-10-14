import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  Bell,
  Calendar,
  User,
  Search,
  Filter,
  Heart,
  Megaphone,
  FileText,
  PawPrint,
} from 'lucide-react';

export default function NoticeBoard() {
  const { notices } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = ['all', 'General', 'Health', 'Government Scheme', 'Event'];

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = 
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || notice.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Health':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'Government Scheme':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'Event':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      default:
        return 'bg-green-100 text-green-700 border-green-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Health':
        return <Heart className="h-3 w-3" />;
      case 'Government Scheme':
        return <FileText className="h-3 w-3" />;
      case 'Event':
        return <Megaphone className="h-3 w-3" />;
      default:
        return <Bell className="h-3 w-3" />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
              <Bell className="h-4 w-4" />
              <span className="text-sm">Official Notices</span>
            </div>
            <h1 className="text-4xl md:text-5xl mb-4">Notice Board</h1>
            <p className="text-xl text-green-50">
              Stay informed with the latest announcements, events, and government schemes from Velookara Panchayat
            </p>
          </div>
        </div>
      </div>

      {/* Stray Dog Report Banner */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white border-red-200 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="flex-shrink-0 p-4 bg-red-100 rounded-full">
                    <PawPrint className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl mb-2 text-gray-900">Report Stray Dog Issues</h3>
                    <p className="text-gray-600">
                      Help ensure community safety and animal welfare. Report stray dog concerns to local NGOs.
                    </p>
                  </div>
                  <Link to="/stray-dog-report">
                    <Button size="lg" className="bg-red-600 hover:bg-red-700">
                      <Heart className="mr-2 h-5 w-5" />
                      Report Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="shadow-lg">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search notices..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      variant={categoryFilter === cat ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCategoryFilter(cat)}
                      className={categoryFilter === cat ? 'bg-green-600 hover:bg-green-700' : ''}
                    >
                      {cat === 'all' ? <Filter className="h-3 w-3 mr-1" /> : null}
                      {cat === 'all' ? 'All' : cat}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notices Grid */}
        <div className="max-w-4xl mx-auto">
          {filteredNotices.length === 0 ? (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Bell className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl mb-2 text-gray-600">No Notices Found</h3>
                <p className="text-gray-500">
                  {searchQuery || categoryFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'There are no notices available at the moment.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredNotices.map((notice) => (
                <Card key={notice.id} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getCategoryColor(notice.category)}>
                            {getCategoryIcon(notice.category)}
                            <span className="ml-1">{notice.category}</span>
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl">{notice.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 whitespace-pre-line">{notice.message}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>Posted by: {notice.postedBy}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(notice.datePosted).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        {filteredNotices.length > 0 && (
          <div className="max-w-4xl mx-auto mt-8">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Bell className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-900">
                    <p className="mb-1">
                      <span className="text-blue-900">Stay Updated:</span> Check this notice board regularly for important announcements, 
                      upcoming events, and government schemes.
                    </p>
                    <p>
                      For urgent queries, contact the panchayat office during working hours.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
