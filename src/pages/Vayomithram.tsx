import React from 'react';
import { ArrowLeft, Heart, FileText, Calendar, ExternalLink, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useNavigate } from 'react-router-dom';

const Vayomithram: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/notice-board')}
            className="mb-4 text-teal-700 hover:text-teal-900 hover:bg-teal-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Notice Board
          </Button>
          <h1 className="text-3xl font-bold text-teal-800 mb-2">
            Vayomithram - Elderly Care Scheme
          </h1>
          <p className="text-teal-600">
            Comprehensive healthcare and support services for senior citizens
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Overview */}
            <Card className="border-teal-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5" />
                  Scheme Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed">
                  Vayomithram is a comprehensive elderly care scheme that provides healthcare services, 
                  social support, and assistance to senior citizens. The program includes regular health 
                  check-ups, home care services, and emergency medical support for elderly citizens.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-teal-50 rounded-lg">
                    <div className="text-2xl font-bold text-teal-600">FREE</div>
                    <div className="text-sm text-teal-700">Healthcare Services</div>
                  </div>
                  <div className="text-center p-3 bg-cyan-50 rounded-lg">
                    <div className="text-2xl font-bold text-cyan-600">60+</div>
                    <div className="text-sm text-cyan-700">Age Requirement</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Eligibility Criteria */}
            <Card className="border-teal-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-teal-800">Eligibility Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Badge className="mr-3 mt-1 bg-teal-100 text-teal-800 border-teal-300">✓</Badge>
                    <span>Must be a resident of Kerala</span>
                  </li>
                  <li className="flex items-start">
                    <Badge className="mr-3 mt-1 bg-teal-100 text-teal-800 border-teal-300">✓</Badge>
                    <span>Age should be 60 years or above</span>
                  </li>
                  <li className="flex items-start">
                    <Badge className="mr-3 mt-1 bg-teal-100 text-teal-800 border-teal-300">✓</Badge>
                    <span>Living alone or with limited family support</span>
                  </li>
                  <li className="flex items-start">
                    <Badge className="mr-3 mt-1 bg-teal-100 text-teal-800 border-teal-300">✓</Badge>
                    <span>Annual family income below ₹2,00,000</span>
                  </li>
                  <li className="flex items-start">
                    <Badge className="mr-3 mt-1 bg-teal-100 text-teal-800 border-teal-300">✓</Badge>
                    <span>No serious chronic medical conditions requiring institutional care</span>
                  </li>
                  <li className="flex items-start">
                    <Badge className="mr-3 mt-1 bg-teal-100 text-teal-800 border-teal-300">✓</Badge>
                    <span>Willing to participate in community health programs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Services Provided */}
            <Card className="border-teal-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-teal-800">Services Provided</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center p-3 bg-teal-50 rounded-lg">
                    <Badge className="mr-2 bg-teal-200 text-teal-800">♥</Badge>
                    <span className="text-sm">Regular Health Check-ups</span>
                  </div>
                  <div className="flex items-center p-3 bg-teal-50 rounded-lg">
                    <Badge className="mr-2 bg-teal-200 text-teal-800">♥</Badge>
                    <span className="text-sm">Home Care Services</span>
                  </div>
                  <div className="flex items-center p-3 bg-teal-50 rounded-lg">
                    <Badge className="mr-2 bg-teal-200 text-teal-800">♥</Badge>
                    <span className="text-sm">Emergency Medical Support</span>
                  </div>
                  <div className="flex items-center p-3 bg-teal-50 rounded-lg">
                    <Badge className="mr-2 bg-teal-200 text-teal-800">♥</Badge>
                    <span className="text-sm">Counseling Services</span>
                  </div>
                  <div className="flex items-center p-3 bg-teal-50 rounded-lg">
                    <Badge className="mr-2 bg-teal-200 text-teal-800">♥</Badge>
                    <span className="text-sm">Social Activities</span>
                  </div>
                  <div className="flex items-center p-3 bg-teal-50 rounded-lg">
                    <Badge className="mr-2 bg-teal-200 text-teal-800">♥</Badge>
                    <span className="text-sm">Nutrition Support</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Required Documents */}
            <Card className="border-teal-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-teal-800">
                  <FileText className="mr-2 h-5 w-5" />
                  Required Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center p-3 bg-teal-50 rounded-lg">
                    <Badge className="mr-2 bg-teal-200 text-teal-800">1</Badge>
                    <span className="text-sm">Aadhaar Card</span>
                  </div>
                  <div className="flex items-center p-3 bg-teal-50 rounded-lg">
                    <Badge className="mr-2 bg-teal-200 text-teal-800">2</Badge>
                    <span className="text-sm">Age Proof Certificate</span>
                  </div>
                  <div className="flex items-center p-3 bg-teal-50 rounded-lg">
                    <Badge className="mr-2 bg-teal-200 text-teal-800">3</Badge>
                    <span className="text-sm">Income Certificate</span>
                  </div>
                  <div className="flex items-center p-3 bg-teal-50 rounded-lg">
                    <Badge className="mr-2 bg-teal-200 text-teal-800">4</Badge>
                    <span className="text-sm">Medical Certificate</span>
                  </div>
                  <div className="flex items-center p-3 bg-teal-50 rounded-lg">
                    <Badge className="mr-2 bg-teal-200 text-teal-800">5</Badge>
                    <span className="text-sm">Residence Proof</span>
                  </div>
                  <div className="flex items-center p-3 bg-teal-50 rounded-lg">
                    <Badge className="mr-2 bg-teal-200 text-teal-800">6</Badge>
                    <span className="text-sm">Family Details Form</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Process */}
            <Card className="border-teal-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-teal-800">
                  <Calendar className="mr-2 h-5 w-5" />
                  Application Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Contact Local Health Center</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Visit your nearest Primary Health Center or contact the local ASHA worker.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Submit Application</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Fill the application form and submit with required documents to the health officer.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Health Assessment</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        A healthcare team will conduct an initial health assessment and home visit.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Service Enrollment</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Once approved, you'll be enrolled in the program and services will begin.
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
            <Card className="border-teal-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-teal-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-teal-600 hover:bg-teal-700" asChild>
                  <a href="https://health.kerala.gov.in" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Apply Online
                  </a>
                </Button>
                <Button variant="outline" className="w-full border-teal-300 text-teal-700 hover:bg-teal-50">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Form
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-teal-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-teal-800">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <Phone className="mr-2 h-4 w-4 text-teal-600" />
                  <span>0471-2315678</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="mr-2 h-4 w-4 text-teal-600" />
                  <span>vayomithram@kerala.gov.in</span>
                </div>
              </CardContent>
            </Card>

            {/* Important Notice */}
            <Alert className="border-orange-200 bg-orange-50">
              <AlertDescription className="text-orange-800">
                <strong>24/7 Support:</strong> Emergency medical support is available 
                round the clock for enrolled members.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vayomithram;