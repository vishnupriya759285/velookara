import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, Heart, FileText, CreditCard, ExternalLink } from 'lucide-react';

export default function WidowPension() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-8">
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
              <div className="text-6xl mb-4">💔</div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Widow Pension Scheme
              </h1>
              <p className="text-xl text-pink-600 font-semibold">₹1,600 per month</p>
              <p className="text-gray-600 mt-2">Supporting widows with dignity and financial security</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-pink-600" />
                  About the Scheme
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  The Widow Pension Scheme provides financial assistance to widows who are in distress 
                  and have no means of subsistence. This scheme aims to provide social security to 
                  widowed women and help them lead a life of dignity. The pension helps cover basic 
                  living expenses and provides a safety net for vulnerable women.
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
                    Paid monthly through state welfare pension scheme
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
                  <Heart className="h-5 w-5 mr-2 text-pink-600" />
                  Eligibility Criteria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-pink-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Must be a widow</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-pink-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Husband missing for more than 7 years (also eligible)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-pink-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Must be a resident of Kerala</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-pink-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Belongs to poor household (BPL)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-pink-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Should not be receiving other welfare pensions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-pink-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Age limit may apply (varies by district)</span>
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
                    <span>Husband's death certificate</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Marriage certificate</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Age proof certificate</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Income certificate (BPL certificate)</span>
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
                    <span>Residence certificate</span>
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
                  <h3 className="text-lg font-semibold mb-3 text-pink-600">Online Application</h3>
                  <p className="text-gray-600 mb-4">
                    Apply online through the Kerala Welfare Pension Portal
                  </p>
                  <Button asChild className="bg-pink-600 hover:bg-pink-700">
                    <a href="https://welfarepension.lsgkerala.gov.in" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Apply Online
                    </a>
                  </Button>
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-3 text-green-600">Visit Local Office</h3>
                  <p className="text-gray-600 mb-4">
                    Submit application at local Panchayat or Municipal Office
                  </p>
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    Find Nearest Office
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Must not be receiving any other welfare pension. 
                  Life certificate required annually to continue benefits.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Additional Support Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Healthcare</h4>
                  <p className="text-sm text-blue-600">Free healthcare through government hospitals</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Food Security</h4>
                  <p className="text-sm text-green-600">Access to subsidized food through PDS</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Housing</h4>
                  <p className="text-sm text-purple-600">Priority in housing schemes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">For more information and assistance</p>
            <div className="space-x-4">
              <Button variant="outline" asChild>
                <a href="https://ksspltd.kerala.gov.in" target="_blank" rel="noopener noreferrer">
                  KSSPLTD Portal
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://lsgd.kerala.gov.in" target="_blank" rel="noopener noreferrer">
                  LSGD Kerala
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}