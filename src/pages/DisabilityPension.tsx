import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, UserCheck, FileText, CreditCard, ExternalLink, Heart } from 'lucide-react';

export default function DisabilityPension() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8">
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
              <div className="text-6xl mb-4">♿</div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Disability Pension Scheme
              </h1>
              <p className="text-xl text-purple-600 font-semibold">₹1,600 per month</p>
              <p className="text-gray-600 mt-2">Supporting individuals with disabilities with dignity and care</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserCheck className="h-5 w-5 mr-2 text-purple-600" />
                  About the Scheme
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  The Disability Pension Scheme provides financial assistance to individuals with physical 
                  or mental disabilities who are unable to earn a livelihood. This scheme aims to ensure 
                  that persons with disabilities can live with dignity and have access to basic necessities. 
                  The pension helps cover medical expenses, daily living costs, and provides social security.
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
                    Higher amounts for severe disabilities (≥80%)
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
                  <UserCheck className="h-5 w-5 mr-2 text-purple-600" />
                  Eligibility Criteria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Disability of 80% or more (for NSAP category)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Physical or mental disability as per state criteria</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Must be a resident of Kerala</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Belongs to poor household (BPL)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Should not be receiving other pensions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Age criteria may apply (varies by category)</span>
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
                    <span>Disability certificate from authorized medical board</span>
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
                    <span>Medical certificate detailing disability</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Disability Categories */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Types of Disabilities Covered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-purple-600">Physical Disabilities</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Locomotor disabilities</li>
                    <li>• Visual impairment (blindness/low vision)</li>
                    <li>• Hearing impairment (deaf/hard of hearing)</li>
                    <li>• Speech and language disabilities</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-600">Intellectual & Mental Disabilities</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Intellectual disabilities</li>
                    <li>• Mental illness</li>
                    <li>• Autism spectrum disorders</li>
                    <li>• Cerebral palsy</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

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
                    Apply through Kerala State Social Security Portal
                  </p>
                  <Button asChild className="bg-purple-600 hover:bg-purple-700">
                    <a href="https://welfarepension.lsgkerala.gov.in" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Apply Online
                    </a>
                  </Button>
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-3 text-green-600">Visit Local Office</h3>
                  <p className="text-gray-600 mb-4">
                    Submit at Panchayat/Municipal Office with documents
                  </p>
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    Find Nearest Office
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r">
                <p className="text-sm text-blue-800">
                  <strong>Medical Assessment:</strong> Disability certificate must be obtained from 
                  authorized government medical board. Regular medical reviews may be required.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Benefits */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-600" />
                Additional Benefits & Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Healthcare</h4>
                  <p className="text-sm text-blue-600">Free medical treatment and rehabilitation services</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Education</h4>
                  <p className="text-sm text-green-600">Free education and scholarship opportunities</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Employment</h4>
                  <p className="text-sm text-purple-600">Job reservations and skill development programs</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Transport</h4>
                  <p className="text-sm text-yellow-600">Concessions in public transportation</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">Housing</h4>
                  <p className="text-sm text-red-600">Priority in housing schemes and accessibility features</p>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 mb-2">Equipment</h4>
                  <p className="text-sm text-indigo-600">Assistive devices and mobility aids</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">For assistance and detailed information</p>
            <div className="space-x-4">
              <Button variant="outline" asChild>
                <a href="https://welfarepension.lsgkerala.gov.in" target="_blank" rel="noopener noreferrer">
                  Welfare Pension Portal
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://ksspltd.kerala.gov.in" target="_blank" rel="noopener noreferrer">
                  KSSPLTD Portal
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://socialjustice.kerala.gov.in" target="_blank" rel="noopener noreferrer">
                  Social Justice Department
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}