import React from 'react';
import { ArrowLeft, Users, FileText, Calendar, ExternalLink, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useNavigate } from 'react-router-dom';

const AgriculturePension: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/notice-board')}
            className="mb-4 text-green-700 hover:text-green-900 hover:bg-green-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Notice Board
          </Button>
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Kerala Agricultural Workers Pension Scheme
          </h1>
          <p className="text-green-600">
            Financial support for agricultural workers in their old age
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Overview */}
            <Card className="border-green-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Scheme Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed">
                  The Kerala Agricultural Workers Pension Scheme provides monthly pension to agricultural 
                  workers who have dedicated their lives to farming and related activities. This scheme 
                  ensures financial security for those who have contributed to Kerala's agricultural sector.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">₹1,600</div>
                    <div className="text-sm text-green-700">Monthly Pension</div>
                  </div>
                  <div className="text-center p-3 bg-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">60+</div>
                    <div className="text-sm text-emerald-700">Age Requirement</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Eligibility Criteria */}
            <Card className="border-green-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-800">Eligibility Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Badge className="mr-3 mt-1 bg-green-100 text-green-800 border-green-300">✓</Badge>
                    <span>Must be a resident of Kerala</span>
                  </li>
                  <li className="flex items-start">
                    <Badge className="mr-3 mt-1 bg-green-100 text-green-800 border-green-300">✓</Badge>
                    <span>Age should be 60 years or above</span>
                  </li>
                  <li className="flex items-start">
                    <Badge className="mr-3 mt-1 bg-green-100 text-green-800 border-green-300">✓</Badge>
                    <span>Must have worked as an agricultural worker for at least 10 years</span>
                  </li>
                  <li className="flex items-start">
                    <Badge className="mr-3 mt-1 bg-green-100 text-green-800 border-green-300">✓</Badge>
                    <span>Annual family income should not exceed ₹1,00,000</span>
                  </li>
                  <li className="flex items-start">
                    <Badge className="mr-3 mt-1 bg-green-100 text-green-800 border-green-300">✓</Badge>
                    <span>Should not be receiving pension from any other government scheme</span>
                  </li>
                  <li className="flex items-start">
                    <Badge className="mr-3 mt-1 bg-green-100 text-green-800 border-green-300">✓</Badge>
                    <span>Must be registered with the Agricultural Workers Welfare Board</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Required Documents */}
            <Card className="border-green-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <FileText className="mr-2 h-5 w-5" />
                  Required Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <Badge className="mr-2 bg-green-200 text-green-800">1</Badge>
                    <span className="text-sm">Aadhaar Card</span>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <Badge className="mr-2 bg-green-200 text-green-800">2</Badge>
                    <span className="text-sm">Age Proof Certificate</span>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <Badge className="mr-2 bg-green-200 text-green-800">3</Badge>
                    <span className="text-sm">Income Certificate</span>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <Badge className="mr-2 bg-green-200 text-green-800">4</Badge>
                    <span className="text-sm">Work Experience Certificate</span>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <Badge className="mr-2 bg-green-200 text-green-800">5</Badge>
                    <span className="text-sm">Bank Passbook Copy</span>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <Badge className="mr-2 bg-green-200 text-green-800">6</Badge>
                    <span className="text-sm">Welfare Board Registration</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Process */}
            <Card className="border-green-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <Calendar className="mr-2 h-5 w-5" />
                  Application Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Visit the nearest Agricultural Office</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Contact your local Agricultural Extension Officer or visit the district Agricultural Office.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Submit Application Form</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Fill out the application form with all required documents and submit to the concerned officer.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Verification Process</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Officials will verify your documents and work history with the Agricultural Welfare Board.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Approval & Pension Start</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Once approved, pension will be credited directly to your bank account monthly.
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
            <Card className="border-green-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                  <a href="https://agriculture.kerala.gov.in" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Apply Online
                  </a>
                </Button>
                <Button variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-50">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Form
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-green-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-800">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <Phone className="mr-2 h-4 w-4 text-green-600" />
                  <span>0471-2301234</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="mr-2 h-4 w-4 text-green-600" />
                  <span>agriculture@kerala.gov.in</span>
                </div>
              </CardContent>
            </Card>

            {/* Important Notice */}
            <Alert className="border-orange-200 bg-orange-50">
              <AlertDescription className="text-orange-800">
                <strong>Note:</strong> Applications are processed throughout the year. 
                Ensure all documents are complete to avoid delays.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgriculturePension;