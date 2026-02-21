import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { UserPlus, MapPin, AlertCircle, MessageSquare, Bell, TrendingUp } from 'lucide-react';
import { usePanchayat } from '../lib/PanchayatContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const { register, user } = useAuth();
  const { displayName, isSelected } = usePanchayat();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const result = await register(name, email, password, phone);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Info */}
        <div className="text-center md:text-left space-y-6 order-2 md:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{displayName}</span>
          </div>
          <h1 className="text-4xl md:text-5xl text-gray-800">
            Join Our Community
          </h1>
          <p className="text-xl text-gray-600">
            Register now to report issues, track progress, and stay updated with official notices from your panchayat.
          </p>
          
          <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
            <h3 className="text-lg text-gray-800">Platform Benefits</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="text-gray-800 mb-1">Voice Your Concerns</div>
                  <div className="text-sm text-gray-600">Report & track local issues easily</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Bell className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="text-gray-800 mb-1">Stay Informed</div>
                  <div className="text-sm text-gray-600">Get real-time updates & notices</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <div className="text-gray-800 mb-1">Drive Change</div>
                  <div className="text-sm text-gray-600">Be part of community development</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 shadow-lg border-2 border-green-200">
            <div className="text-center">
              <div className="text-4xl mb-3">🌟</div>
              <div className="text-gray-800 mb-2">Join 500+ Citizens</div>
              <div className="text-sm text-gray-600">Making {isSelected ? displayName.replace(' Panchayat', '') : 'Kerala'} a better place to live</div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <Card className="shadow-2xl order-1 md:order-2">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <UserPlus className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Create Your Account</CardTitle>
            <CardDescription>
              Fill in your details to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password (min. 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                <UserPlus className="mr-2 h-4 w-4" />
                Register
              </Button>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-600 mb-3">
                  Already have an account?
                </p>
                <Link 
                  to="/login" 
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-all hover:shadow-md"
                >
                  Login here
                  <span className="text-green-600">→</span>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
