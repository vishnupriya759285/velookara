
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, Users, FileText, CreditCard, ExternalLink } from 'lucide-react';

export default function OldAgePension() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
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
              <div className="text-6xl mb-4">👵</div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Indira Gandhi National Old Age Pension (NOAP)
              </h1>
              <p className="text-xl text-blue-600 font-semibold">₹1,600 per month</p>
              <p className="text-gray-600 mt-2">Ensuring dignity and security for our elderly citizens</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  About the Scheme
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  The Indira Gandhi National Old Age Pension Scheme is a flagship program of the Government of India, 
                  aimed at providing financial security to elderly citizens who have no means of subsistence or little 
                  support from their families. This scheme ensures that senior citizens can live their remaining years 
                  with dignity and basic financial security.
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
                    Central Government: ₹200 + State Government: ₹1,400
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
                  <Users className="h-5 w-5 mr-2 text-indigo-600" />
                  Eligibility Criteria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Age: 60 years or above</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Must be a resident of Kerala</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Household income should not exceed poverty line</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Should not be receiving any other pension</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Must have little or no family support</span>
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
                    <span>Residence certificate</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Income certificate</span>
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
                    <span>Passport size photographs</span>
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
                  <h3 className="text-lg font-semibold mb-3 text-blue-600">Online Application</h3>
                  <p className="text-gray-600 mb-4">
                    Apply online through the Kerala State Social Security Pension Portal
                  </p>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <a href="https://welfarepension.lsgkerala.gov.in" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Apply Online
                    </a>
                  </Button>
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-3 text-green-600">Visit Local Office</h3>
                  <p className="text-gray-600 mb-4">
                    Apply in person at your local Grama Panchayat or Municipal Office
                  </p>
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    Find Nearest Office
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Applications are processed within 30 days. 
                  Life certificate must be submitted annually to continue receiving benefits.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Links */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">Need more information?</p>
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