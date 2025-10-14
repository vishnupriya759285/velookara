import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { LogIn, MapPin, AlertCircle, CheckCircle, Users, Shield } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate(user?.role === 'admin' ? '/admin' : '/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Info */}
        <div className="text-center md:text-left space-y-6 order-2 md:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Velookara Panchayat Portal</span>
          </div>
          <h1 className="text-4xl md:text-5xl text-gray-800">
            Welcome Back!
          </h1>
          <p className="text-xl text-gray-600">
            Login to access your account and continue making a difference in your community.
          </p>
          
          <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
            <h3 className="text-lg text-gray-800">Why Citizens Choose Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="text-gray-800 mb-1">Quick Issue Resolution</div>
                  <div className="text-sm text-gray-600">Average response time of 48 hours</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="text-gray-800 mb-1">Community Impact</div>
                  <div className="text-sm text-gray-600">Join 500+ active community members</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <div className="text-gray-800 mb-1">Transparent Governance</div>
                  <div className="text-sm text-gray-600">Real-time updates on all issues</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="text-3xl">🎯</div>
              <div className="text-left">
                <div className="text-gray-800 mb-1">"This platform has made it so easy to get our local issues resolved. Highly responsive!"</div>
                <div className="text-sm text-gray-600">- Community Member, Kadupaserry</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="shadow-2xl order-1 md:order-2">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <LogIn className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Login to Your Account</CardTitle>
            <CardDescription>
              Enter your credentials to access the platform
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
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-600 mb-3">
                  Don't have an account?
                </p>
                <Link 
                  to="/register" 
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-all hover:shadow-md"
                >
                  Register here
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
