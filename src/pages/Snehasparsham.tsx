import React from 'react';
import { ArrowLeft, Heart, FileText, Calendar, ExternalLink, Phone, Mail, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useNavigate } from 'react-router-dom';

const Snehasparsham: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/notice-board')}
            className="mb-4 text-blue-700 hover:text-blue-900 hover:bg-blue-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Notice Board
          </Button>
          <h1 className="text-3xl font-bold text-blue-800 mb-2">
            Snehasparsham - Social Support Scheme
          </h1>
          <p className="text-blue-600">
            Comprehensive social support and rehabilitation program for vulnerable families
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Overview */}
            <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Scheme Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed">
                  Snehasparsham is a comprehensive social support scheme designed to assist vulnerable 
                  families and individuals who lack adequate family support. The program provides 
                  financial assistance, counseling services, skill development, and social rehabilitation 
                  to help beneficiaries achieve self-reliance and dignity.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">₹5,000</div>
                    <div className="text-sm text-blue-700">Monthly Support</div>
                  </div>
                  <div className="text-center p-3 bg-indigo-50 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600">ALL</div>
                    <div className="text-sm text-indigo-700">Age Groups</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Eligibility Criteria */}
            <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-blue-800">Eligibility Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Badge className="mr-3 mt-1 bg-blue-100 text-blue-800 border-blue-300">✓</Badge>
                    <span>Must be a resident of Kerala for at least 5 years</span>
                  </li>
                  <li className="flex items-start">
                    <Badge className="mr-3 mt-1 bg-blue-100 text-blue-800 border-blue-300">✓</Badge>
                    <span>Individuals or families without adequate family support</span>
                  </li>
                  <li className="flex items-start">
                    <Badge className="mr-3 mt-1 bg-blue-100 text-blue-800 border-blue-300">✓</Badge>
                    <span>Annual family income below ₹1,50,000</span>
                  </li>
                  <li className="flex items-start">
                    <Badge className="mr-3 mt-1 bg-blue-100 text-blue-800 border-blue-300">✓</Badge>
                    <span>Vulnerable groups: elderly alone, persons with disabilities, orphans</span>
                  </li>
                  <li className="flex items-start">
                    <Badge className="mr-3 mt-1 bg-blue-100 text-blue-800 border-blue-300">✓</Badge>
                    <span>Homeless or inadequate housing conditions</span>
                  </li>
                  <li className="flex items-start">
                    <Badge className="mr-3 mt-1 bg-blue-100 text-blue-800 border-blue-300">✓</Badge>
                    <span>Willingness to participate in rehabilitation programs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Services & Benefits */}
            <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-blue-800">Services & Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Badge className="mr-2 bg-blue-200 text-blue-800">♥</Badge>
                    <span className="text-sm">Monthly Financial Support</span>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Badge className="mr-2 bg-blue-200 text-blue-800">♥</Badge>
                    <span className="text-sm">Counseling Services</span>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Badge className="mr-2 bg-blue-200 text-blue-800">♥</Badge>
                    <span className="text-sm">Skill Development Training</span>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Badge className="mr-2 bg-blue-200 text-blue-800">♥</Badge>
                    <span className="text-sm">Housing Assistance</span>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Badge className="mr-2 bg-blue-200 text-blue-800">♥</Badge>
                    <span className="text-sm">Healthcare Support</span>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Badge className="mr-2 bg-blue-200 text-blue-800">♥</Badge>
                    <span className="text-sm">Legal Aid Services</span>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Badge className="mr-2 bg-blue-200 text-blue-800">♥</Badge>
                    <span className="text-sm">Employment Assistance</span>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Badge className="mr-2 bg-blue-200 text-blue-800">♥</Badge>
                    <span className="text-sm">Social Integration Programs</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Required Documents */}
            <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <FileText className="mr-2 h-5 w-5" />
                  Required Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Badge className="mr-2 bg-blue-200 text-blue-800">1</Badge>
                    <span className="text-sm">Aadhaar Card</span>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Badge className="mr-2 bg-blue-200 text-blue-800">2</Badge>
                    <span className="text-sm">Residence Certificate</span>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Badge className="mr-2 bg-blue-200 text-blue-800">3</Badge>
                    <span className="text-sm">Income Certificate</span>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Badge className="mr-2 bg-blue-200 text-blue-800">4</Badge>
                    <span className="text-sm">Family Status Declaration</span>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Badge className="mr-2 bg-blue-200 text-blue-800">5</Badge>
                    <span className="text-sm">Bank Account Details</span>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Badge className="mr-2 bg-blue-200 text-blue-800">6</Badge>
                    <span className="text-sm">Medical Certificate (if applicable)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Process */}
            <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Calendar className="mr-2 h-5 w-5" />
                  Application Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Visit Social Welfare Office</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Contact your local Social Welfare Officer or visit the district Social Welfare office.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Submit Application</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Fill the application form and submit with all required documents and supporting proof.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Assessment & Verification</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Social workers will conduct home visits and assess your situation and needs.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Enrollment & Services</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Once approved, you'll be enrolled and receive personalized support services.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-blue-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                  <a href="https://socialwelfare.kerala.gov.in" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Apply Online
                  </a>
                </Button>
                <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-50">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Form
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-blue-800">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <Phone className="mr-2 h-4 w-4 text-blue-600" />
                  <span>0471-2325678</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="mr-2 h-4 w-4 text-blue-600" />
                  <span>snehasparsham@kerala.gov.in</span>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Support */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center">
                  <Heart className="mr-2 h-4 w-4" />
                  Emergency Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-700 mb-3">
                  24/7 helpline for urgent assistance
                </p>
                <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                  <Phone className="mr-2 h-3 w-3" />
                  Call: 1077
                </Button>
              </CardContent>
            </Card>

            {/* Important Notice */}
            <Alert className="border-orange-200 bg-orange-50">
              <AlertDescription className="text-orange-800">
                <strong>Note:</strong> This scheme provides holistic support including 
                financial assistance, counseling, and skill development for long-term rehabilitation.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Snehasparsham;