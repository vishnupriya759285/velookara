import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventsAPI } from '../lib/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  User,
  Mail,
  Home,
} from 'lucide-react';

interface EventData {
  id: string;
  title: string;
  description: string;
  event_date: string;
  event_end_date?: string;
  venue: string;
  district: string;
  panchayat: string;
  ward?: string;
  category: string;
  max_participants?: number;
  contact_phone?: string;
  contact_email?: string;
  is_active: boolean;
  registration_count: number;
  total_attendees: number;
  creator_name: string;
}

export default function EventRegistration() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [ward, setWard] = useState('');
  const [numAttendees, setNumAttendees] = useState('1');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const response = await eventsAPI.getById(id!);
      if (response.data.success) {
        setEvent(response.data.event);
      }
    } catch (err: any) {
      setError('Event not found or no longer available.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim() || !phone.trim()) {
      setFormError('Name and phone number are required');
      return;
    }

    if (!/^[0-9]{10}$/.test(phone.replace(/\s+/g, '').replace(/^\+91/, ''))) {
      setFormError('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      setSubmitting(true);
      const response = await eventsAPI.register(id!, {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        ward: ward.trim() || undefined,
        num_attendees: parseInt(numAttendees) || 1,
      });
      if (response.data.success) {
        setSubmitted(true);
        toast.success('Registration successful!');
      }
    } catch (err: any) {
      setFormError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isFull = event?.max_participants
    ? parseInt(String(event.total_attendees)) >= event.max_participants
    : false;

  const isPast = event ? new Date(event.event_date) < new Date() : false;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Event Not Found</h2>
            <p className="text-gray-500 mb-4">{error || 'This event may have been removed or the link is invalid.'}</p>
            <Link to="/">
              <Button><Home className="mr-2 h-4 w-4" /> Go Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-1">You are registered for:</p>
            <p className="font-semibold text-lg mb-4">{event.title}</p>
            <div className="bg-green-50 rounded-lg p-4 text-sm text-left space-y-2 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-green-600" />
                <span>{formatDate(event.event_date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>{event.panchayat} Panchayat, {event.district}</span>
              </div>
            </div>
            <Link to="/">
              <Button variant="outline"><Home className="mr-2 h-4 w-4" /> Go to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Event Details Card */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-white/20 text-white capitalize">{event.category}</Badge>
              {event.ward && <Badge className="bg-white/20 text-white">{event.ward}</Badge>}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">{event.title}</h1>
            <p className="text-green-100 mt-1">{event.panchayat} Panchayat, {event.district} District</p>
          </div>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">{event.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>{formatDate(event.event_date)}</span>
              </div>
              {event.event_end_date && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span>Ends: {formatDate(event.event_end_date)}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>{event.venue}</span>
              </div>
              {event.max_participants && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-4 w-4 text-purple-600 flex-shrink-0" />
                  <span>{event.total_attendees} / {event.max_participants} registered</span>
                </div>
              )}
              {event.contact_phone && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <span>{event.contact_phone}</span>
                </div>
              )}
              {event.contact_email && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <span>{event.contact_email}</span>
                </div>
              )}
            </div>

            {event.creator_name && (
              <p className="text-xs text-gray-400 mt-4">Organized by: {event.creator_name}</p>
            )}
          </CardContent>
        </Card>

        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-green-600" />
              Register for this Event
            </CardTitle>
            <CardDescription>
              {isPast
                ? 'This event has already passed.'
                : isFull
                ? 'This event is full.'
                : !event.is_active
                ? 'Registration is closed.'
                : 'Fill in your details to register. No login required.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {(isPast || isFull || !event.is_active) ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {isPast ? 'This event has already taken place.' : isFull ? 'Maximum participants reached.' : 'Registration is closed for this event.'}
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {formError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{formError}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="regName">Full Name *</Label>
                  <Input id="regName" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="regPhone">Phone Number *</Label>
                  <Input id="regPhone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile number" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="regEmail">Email (Optional)</Label>
                  <Input id="regEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="regWard">Ward (Optional)</Label>
                    <Input id="regWard" value={ward} onChange={(e) => setWard(e.target.value)} placeholder="e.g., Ward 5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regAttendees">Number of Attendees</Label>
                    <Input id="regAttendees" type="number" min="1" max="10" value={numAttendees} onChange={(e) => setNumAttendees(e.target.value)} />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={submitting}>
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Registering...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Register Now
                    </span>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
