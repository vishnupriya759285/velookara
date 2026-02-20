import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 to-gray-50 flex items-center justify-center p-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="shadow-2xl">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <div className="text-9xl mb-4">404</div>
              <h1 className="text-3xl md:text-4xl mb-4 text-gray-800">Page Not Found</h1>
              <p className="text-lg text-gray-600 mb-8">
                Oops! The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                  <Home className="mr-2 h-5 w-5" />
                  Go to Home
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => window.history.back()}
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t">
              <h3 className="mb-4 text-gray-700">Quick Links</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/notices">
                  <Button variant="ghost" size="sm">Notice Board</Button>
                </Link>
                <Link to="/stray-dog-report">
                  <Button variant="ghost" size="sm">Stray Dog Report</Button>
                </Link>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="ghost" size="sm">Register</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
