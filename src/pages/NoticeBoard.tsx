import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import {
  Bell,
  User,
  Search,
  Heart,
  PawPrint,
  ArrowRight,
  Users,

  Wheat,
  UserCheck,
  Stethoscope,
  HandHeart,
  IndianRupee
} from 'lucide-react';

// Kerala welfare schemes data structure
const keralaWelfareSchemes = [
  {
    id: 'oldage',
    title: '👵 Indira Gandhi National Old Age Pension (NOAP)',
    shortDesc: '₹1,600/month for citizens aged 60+ without family support',
    icon: <Users className="h-6 w-6" />,
    colorTheme: 'blue',
    amount: '₹1,600/month',
    category: 'Elderly Care',
    route: '/notices/oldage'
  },
  {
    id: 'widow',
    title: '💔 Widow Pension',
    shortDesc: '₹1,600/month for widows below the poverty line',
    icon: <Heart className="h-6 w-6" />,
    colorTheme: 'pink',
    amount: '₹1,600/month',
    category: 'Women Support',
    route: '/notices/widow'
  },
  {
    id: 'unmarried',
    title: '👩‍🦳 Unmarried Women Pension (50+ years)',
    shortDesc: 'For women above 50 with no family income support',
    icon: <User className="h-6 w-6" />,
    colorTheme: 'purple',
    amount: '₹1,600/month',
    category: 'Women Support',
    route: '/notices/unmarried'
  },
  {
    id: 'disability',
    title: '♿ Disability Pension',
    shortDesc: '₹1,600/month for physically/mentally challenged individuals',
    icon: <UserCheck className="h-6 w-6" />,
    colorTheme: 'purple',
    amount: '₹1,600/month',
    category: 'Disability Support',
    route: '/notices/disability'
  },
  {
    id: 'agriculture',
    title: '🌾 Agricultural Labour Pension',
    shortDesc: '₹1,600/month for aged agricultural labourers in Kerala',
    icon: <Wheat className="h-6 w-6" />,
    colorTheme: 'green',
    amount: '₹1,600/month',
    category: 'Agriculture',
    route: '/notices/agriculture'
  },
  {
    id: 'vayomithram',
    title: '🏥 Vayomithram Project',
    shortDesc: 'Health services and home care for senior citizens (65+)',
    icon: <Stethoscope className="h-6 w-6" />,
    colorTheme: 'mint',
    amount: 'Free Services',
    category: 'Healthcare',
    route: '/notices/vayomithram'
  },
  {
    id: 'snehasparsham',
    title: '💖 Snehasparsham Scheme',
    shortDesc: 'Monthly support for unwed mothers and women without family help',
    icon: <HandHeart className="h-6 w-6" />,
    colorTheme: 'pink',
    amount: '₹1,000-₹2,000',
    category: 'Women Support',
    route: '/notices/snehasparsham'
  }
];export default function NoticeBoard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSchemes = keralaWelfareSchemes.filter((scheme) =>
    scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSchemeCardColor = (colorTheme: string) => {
    switch (colorTheme) {
      case 'blue':
        return 'from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-150';
      case 'pink': 
        return 'from-pink-50 to-pink-100 border-pink-200 hover:from-pink-100 hover:to-pink-150';
      case 'purple':
        return 'from-purple-50 to-purple-100 border-purple-200 hover:from-purple-100 hover:to-purple-150';
      case 'green':
        return 'from-green-50 to-green-100 border-green-200 hover:from-green-100 hover:to-green-150';
      case 'mint':
        return 'from-emerald-50 to-teal-100 border-teal-200 hover:from-emerald-100 hover:to-teal-150';
      default:
        return 'from-gray-50 to-gray-100 border-gray-200 hover:from-gray-100 hover:to-gray-150';
    }
  };



  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
              <Bell className="h-4 w-4" />
              <span className="text-sm">Kerala Government Schemes</span>
            </div>
            <h1 className="text-4xl md:text-5xl mb-4">🌿 Kerala Welfare & Pension Schemes</h1>
            <p className="text-xl text-green-50">
              Empowering the elderly and vulnerable with dignity and care
            </p>
          </div>
        </div>
      </div>

      {/* Stray Dog Report Banner */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto">
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
        {/* Search */}
        <div className="max-w-6xl mx-auto mb-8">
          <Card className="shadow-lg">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search welfare schemes and notices..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="text-sm text-gray-600">
                  {filteredSchemes.length} welfare schemes available
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kerala Welfare Schemes Grid */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="mb-6">
            <h2 className="text-2xl mb-3 text-gray-800">🏛️ Kerala Government Welfare Schemes</h2>
            <p className="text-gray-600">Click on any scheme to view detailed information and application process</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme) => (
              <Card 
                key={scheme.id} 
                className={`shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br ${getSchemeCardColor(scheme.colorTheme)} border-2`}
                onClick={() => {
                  if (scheme.route) {
                    navigate(scheme.route);
                  }
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      scheme.colorTheme === 'blue' ? 'bg-blue-200' : 
                      scheme.colorTheme === 'pink' ? 'bg-pink-200' : 
                      scheme.colorTheme === 'purple' ? 'bg-purple-200' : 
                      scheme.colorTheme === 'green' ? 'bg-green-200' :
                      scheme.colorTheme === 'mint' ? 'bg-teal-200' :
                      'bg-gray-200'
                    }`}>
                      {scheme.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight">{scheme.title}</CardTitle>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {scheme.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">{scheme.shortDesc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-green-700 font-semibold">
                      <IndianRupee className="h-4 w-4" />
                      <span className="text-sm">{scheme.amount}</span>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs hover:bg-white/50">
                      Know More <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="max-w-6xl mx-auto mt-12">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Bell className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-900">
                  <p className="mb-2">
                    <span className="font-semibold">Application Process:</span> All schemes can be applied through local 
                    Panchayat offices or online via the Kerala Welfare Portal.
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Required Documents:</span> Aadhaar card, income certificate, 
                    residence proof, bank account details, and scheme-specific documents.
                  </p>
                  <p>
                    <span className="font-semibold">Contact:</span> For queries, contact your local Panchayat office 
                    during working hours (9:30 AM - 5:30 PM).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
