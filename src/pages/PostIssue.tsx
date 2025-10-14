import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Alert, AlertDescription } from '../components/ui/alert';
import { FileText, AlertCircle, CheckCircle, Droplets, Construction, Heart, Zap, Trash2, TreeDeciduous } from 'lucide-react';

export default function PostIssue() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [error, setError] = useState('');
  const { addIssue } = useAuth();
  const navigate = useNavigate();

  const categories = [
    { value: 'water', label: 'Water Supply', icon: Droplets },
    { value: 'road', label: 'Roads & Infrastructure', icon: Construction },
    { value: 'healthcare', label: 'Health Services', icon: Heart },
    { value: 'electricity', label: 'Electricity', icon: Zap },
    { value: 'sanitation', label: 'Waste Management', icon: Trash2 },
    { value: 'environment', label: 'Environment', icon: TreeDeciduous },
    { value: 'infrastructure', label: 'Infrastructure', icon: Construction },
    { value: 'education', label: 'Education', icon: FileText },
    { value: 'agriculture', label: 'Agriculture', icon: TreeDeciduous },
    { value: 'other', label: 'Other', icon: FileText },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title || !description || !category || !location) {
      setError('Please fill in all required fields');
      return;
    }

    if (title.length < 10) {
      setError('Title should be at least 10 characters long');
      return;
    }

    if (description.length < 20) {
      setError('Description should be at least 20 characters long');
      return;
    }

    const success = await addIssue({
      title,
      description,
      category,
      location,
      priority,
    });
    
    if (success) {
      navigate('/my-issues');
    } else {
      setError('Failed to submit issue. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 to-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full mb-4">
            <FileText className="h-4 w-4" />
            <span className="text-sm">Report an Issue</span>
          </div>
          <h1 className="text-4xl mb-3">Submit Your Issue</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help us improve your community by reporting issues. Provide details and our team will address them promptly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Form */}
          <Card className="md:col-span-2 shadow-lg">
            <CardHeader>
              <CardTitle>Issue Details</CardTitle>
              <CardDescription>
                Fill in the information below about the issue you're experiencing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          <div className="flex items-center gap-2">
                            <cat.icon className="h-4 w-4" />
                            {cat.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="e.g., Near temple junction, Kadupaserry"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority *</Label>
                  <Select value={priority} onValueChange={(value: any) => setPriority(value)}>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Issue Title *</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="e.g., Street light not working near temple junction"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Minimum 10 characters ({title.length}/10)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the issue in detail. Include location, how long it's been happening, and how it affects the community..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Minimum 20 characters ({description.length}/20)
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Submit Issue
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/my-issues')}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Guidelines Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Be specific about the location and nature of the issue</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Include relevant details like how long the problem has persisted</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Choose the most appropriate category</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Avoid duplicate submissions for the same issue</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="text-sm text-blue-900 space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="mb-1">For emergencies, please contact:</p>
                      <p>Emergency: 112</p>
                      <p>Panchayat Office: +91 487 XXX XXXX</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
