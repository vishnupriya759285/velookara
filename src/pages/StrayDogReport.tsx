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
import { Heart, AlertCircle, CheckCircle, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function StrayDogReport() {
  const [location, setLocation] = useState('');
  const [numberOfDogs, setNumberOfDogs] = useState('');
  const [severity, setSeverity] = useState('');
  const [description, setDescription] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!location || !numberOfDogs || !severity || !description || !contactName || !contactPhone) {
      setError('Please fill in all required fields');
      return;
    }

    if (contactPhone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    // Store the report in localStorage
    const reports = JSON.parse(localStorage.getItem('strayDogReports') || '[]');
    const newReport = {
      id: reports.length + 1,
      location,
      numberOfDogs: parseInt(numberOfDogs),
      severity,
      description,
      contactName,
      contactPhone,
      reportedBy: user?.name || 'Anonymous',
      reportedAt: new Date().toISOString(),
      status: 'Pending',
    };
    
    reports.push(newReport);
    localStorage.setItem('strayDogReports', JSON.stringify(reports));

    toast.success('Report submitted successfully!', {
      description: 'Local animal welfare NGOs will be notified.',
    });
    
    navigate('/notices');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 to-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full mb-4">
            <Heart className="h-4 w-4" />
            <span className="text-sm">Animal Welfare Report</span>
          </div>
          <h1 className="text-4xl mb-3">Report Stray Dog Issues</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help us ensure the safety of both community members and stray animals. Your report will be forwarded to local NGOs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Form */}
          <Card className="md:col-span-2 shadow-lg">
            <CardHeader>
              <CardTitle>Report Details</CardTitle>
              <CardDescription>
                Provide information about the stray dog situation in your area
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
                  <Label htmlFor="location">Location / Area *</Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="e.g., Near Temple Junction, Ward 5"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="numberOfDogs">Number of Dogs *</Label>
                    <Input
                      id="numberOfDogs"
                      type="number"
                      min="1"
                      placeholder="e.g., 3"
                      value={numberOfDogs}
                      onChange={(e) => setNumberOfDogs(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="severity">Severity Level *</Label>
                    <Select value={severity} onValueChange={setSeverity}>
                      <SelectTrigger id="severity">
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low - Harmless/Friendly</SelectItem>
                        <SelectItem value="Medium">Medium - Barking/Chasing</SelectItem>
                        <SelectItem value="High">High - Aggressive Behavior</SelectItem>
                        <SelectItem value="Injured">Injured Animal Needs Help</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the situation, behavior of dogs, any incidents, time of day when most active, etc..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    required
                  />
                </div>

                <div className="border-t pt-6 space-y-4">
                  <h3 className="font-medium">Your Contact Information</h3>
                  <p className="text-sm text-gray-600">
                    NGOs may contact you for more details or to coordinate assistance
                  </p>

                  <div className="space-y-2">
                    <Label htmlFor="contactName">Your Name *</Label>
                    <Input
                      id="contactName"
                      type="text"
                      placeholder="Enter your name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone Number *</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Submit Report to NGOs
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/notices')}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* NGO Contact Info & Guidelines */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Provide exact location and landmarks</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Mention if dogs are injured or sick</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Note aggressive behavior or incidents</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Keep your phone accessible for NGO contact</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg">Animal Welfare NGOs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-3">
                  <div>
                    <div className="font-medium text-blue-900 mb-1">Kerala Animal Welfare Board</div>
                    <div className="flex items-center gap-1 text-blue-700">
                      <Phone className="h-3 w-3" />
                      <span>+91 471 XXX XXXX</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-900 mb-1">Humane Society International</div>
                    <div className="flex items-center gap-1 text-blue-700">
                      <Phone className="h-3 w-3" />
                      <span>+91 484 XXX XXXX</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-900 mb-1">People For Animals - Thrissur</div>
                    <div className="flex items-center gap-1 text-blue-700">
                      <Phone className="h-3 w-3" />
                      <span>+91 487 XXX XXXX</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="text-sm text-red-900 space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="mb-1">For dog bite emergencies:</p>
                      <p className="font-medium">Call: 108 (Ambulance)</p>
                      <p className="text-xs mt-1">Get immediate medical attention and anti-rabies vaccination</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Info Section */}
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Heart className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-green-900">
                <p className="mb-2">
                  <span className="font-medium">About this service:</span> This reporting system helps coordinate efforts between 
                  the panchayat and local animal welfare NGOs. Reports are forwarded to relevant organizations for:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Anti-rabies vaccination drives</li>
                  <li>Animal birth control (ABC) programs</li>
                  <li>Treatment of injured or sick animals</li>
                  <li>Relocation of aggressive dogs when necessary</li>
                  <li>Public awareness about coexisting with stray animals</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
