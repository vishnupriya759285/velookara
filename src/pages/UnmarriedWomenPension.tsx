import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, User, FileText, CreditCard, ExternalLink } from 'lucide-react';

export default function UnmarriedWomenPension() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Link to="/notices">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Notice Board
              </Button>
            </Link>
            
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">👩‍🦳</div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Unmarried Women Pension (50+ years)
              </h1>
              <p className="text-xl text-purple-600 font-semibold">₹1,600 per month</p>
              <p className="text-gray-600 mt-2">Supporting unmarried women with financial independence</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-purple-600" />
                  About the Scheme
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  This pension scheme is designed to provide financial support to unmarried women above 
                  50 years of age who have no family income support. The scheme recognizes the challenges 
                  faced by unmarried women in their later years and provides them with a monthly pension 
                  to ensure basic financial security and independence.
                </p>
              </CardContent>
            </Card>

            {/* Monthly Benefit */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-green-600" />
                  Monthly Benefit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">₹1,600</div>
                  <p className="text-gray-600">Direct Bank Transfer</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Part of Kerala's welfare pension scheme
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Eligibility & Documents */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Eligibility */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-purple-600" />
                  Eligibility Criteria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Must be an unmarried woman</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Age: 50 years or above</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Must be a resident of Kerala</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Annual income should not exceed ₹1 lakh</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Should not be receiving other pension benefits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Must have no family income support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Required Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-orange-600" />
                  Required Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Age proof certificate</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Unmarried status certificate</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Income certificate</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Residence certificate</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Bank account details</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Aadhaar card</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Recent passport size photographs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* How to Apply */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center text-2xl">How to Apply</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-3 text-purple-600">Online Application</h3>
                  <p className="text-gray-600 mb-4">
                    Submit application through Kerala LSGD portal
                  </p>
                  <Button asChild className="bg-purple-600 hover:bg-purple-700">
                    <a href="https://lsgd.kerala.gov.in" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Apply Online
                    </a>
                  </Button>
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-3 text-green-600">Visit Local Office</h3>
                  <p className="text-gray-600 mb-4">
                    Apply at your local Grama Panchayat or Municipal Office
                  </p>
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    Find Nearest Office
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r">
                <p className="text-sm text-yellow-800">
                  <strong>Renewal Required:</strong> Annual renewal with life certificate and 
                  unmarried status verification is mandatory to continue receiving benefits.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Support Services */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Additional Support Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Healthcare</h4>
                  <p className="text-sm text-blue-600">Free medical treatment in government facilities</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Skill Development</h4>
                  <p className="text-sm text-green-600">Access to vocational training programs</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Priority Benefits</h4>
                  <p className="text-sm text-purple-600">Priority in other government schemes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">For detailed information and support</p>
            <div className="space-x-4">
              <Button variant="outline" asChild>
                <a href="https://lsgd.kerala.gov.in" target="_blank" rel="noopener noreferrer">
                  LSGD Kerala
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://ksspltd.kerala.gov.in" target="_blank" rel="noopener noreferrer">
                  KSSPLTD Portal
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}