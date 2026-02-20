import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { PanchayatProvider } from './lib/PanchayatContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostIssue from './pages/PostIssue';
import MyIssues from './pages/MyIssues';
import NoticeBoard from './pages/NoticeBoard';
import AdminDashboard from './pages/AdminDashboard';
import StrayDogReport from './pages/StrayDogReport';
import EventManagement from './pages/EventManagement';
import EventRegistration from './pages/EventRegistration';
import EventsList from './pages/EventsList';
import NotFound from './pages/NotFound';
import OldAgePension from './pages/OldAgePension';
import WidowPension from './pages/WidowPension';
import UnmarriedWomenPension from './pages/UnmarriedWomenPension';
import DisabilityPension from './pages/DisabilityPension';
import AgriculturePension from './pages/AgriculturePension';
import Vayomithram from './pages/Vayomithram';
import Snehasparsham from './pages/Snehasparsham';
import { Toaster } from './components/ui/sonner';

function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notices" element={<NoticeBoard />} />
          <Route path="/notices/oldage" element={<OldAgePension />} />
          <Route path="/notices/widow" element={<WidowPension />} />
          <Route path="/notices/unmarried" element={<UnmarriedWomenPension />} />
          <Route path="/notices/disability" element={<DisabilityPension />} />
          <Route path="/notices/agriculture" element={<AgriculturePension />} />
          <Route path="/notices/vayomithram" element={<Vayomithram />} />
          <Route path="/notices/snehasparsham" element={<Snehasparsham />} />
          <Route path="/stray-dog-report" element={<StrayDogReport />} />
          <Route path="/events" element={<EventsList />} />
          <Route path="/events/:id/register" element={<EventRegistration />} />
          <Route 
            path="/admin/events" 
            element={
              <ProtectedRoute adminOnly>
                <EventManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/post-issue" 
            element={
              <ProtectedRoute>
                <PostIssue />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-issues" 
            element={
              <ProtectedRoute>
                <MyIssues />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <PanchayatProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </PanchayatProvider>
    </Router>
  );
}
