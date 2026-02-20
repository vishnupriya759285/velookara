import { useState, useEffect } from 'react';
import { usePanchayat } from '../lib/PanchayatContext';
import { eventsAPI } from '../lib/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../components/ui/dialog';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'sonner';
import {
  Plus,
  Calendar,
  MapPin,
  Users,
  QrCode,
  Trash2,
  Eye,
  Copy,
  Download,
  Phone,
  Mail,
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
  created_at: string;
}

interface Registration {
  id: string;
  name: string;
  email?: string;
  phone: string;
  ward?: string;
  num_attendees: number;
  registered_at: string;
}

const eventCategories = [
  { value: 'general', label: 'General' },
  { value: 'health', label: 'Health Camp' },
  { value: 'education', label: 'Education' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'sports', label: 'Sports' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'awareness', label: 'Awareness Program' },
  { value: 'other', label: 'Other' },
];

export default function EventManagement() {
  const { selectedDistrict, selectedPanchayat } = usePanchayat();
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [showQR, setShowQR] = useState<string | null>(null);
  const [showRegistrations, setShowRegistrations] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [venue, setVenue] = useState('');
  const [district, setDistrict] = useState(selectedDistrict || '');
  const [panchayat, setPanchayat] = useState(selectedPanchayat || '');
  const [ward, setWard] = useState('');
  const [category, setCategory] = useState('general');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventsAPI.getAll();
      if (response.data.success) {
        setEvents(response.data.events || []);
      }
    } catch (error) {
      console.error('Fetch events error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await eventsAPI.create({
        title,
        description,
        event_date: eventDate,
        event_end_date: eventEndDate || undefined,
        venue,
        district: district || selectedDistrict,
        panchayat: panchayat || selectedPanchayat,
        ward: ward || undefined,
        category,
        max_participants: maxParticipants ? parseInt(maxParticipants) : undefined,
        contact_phone: contactPhone || undefined,
        contact_email: contactEmail || undefined,
      });
      if (response.data.success) {
        toast.success('Event created successfully!');
        setIsCreateOpen(false);
        resetForm();
        fetchEvents();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create event');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      const response = await eventsAPI.delete(id);
      if (response.data.success) {
        toast.success('Event deleted');
        fetchEvents();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete event');
    }
  };

  const viewRegistrations = async (event: EventData) => {
    try {
      const response = await eventsAPI.getRegistrations(event.id);
      if (response.data.success) {
        setRegistrations(response.data.registrations || []);
        setSelectedEvent(event);
        setShowRegistrations(true);
      }
    } catch (error: any) {
      toast.error('Failed to load registrations');
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setEventDate('');
    setEventEndDate('');
    setVenue('');
    setDistrict(selectedDistrict || '');
    setPanchayat(selectedPanchayat || '');
    setWard('');
    setCategory('general');
    setMaxParticipants('');
    setContactPhone('');
    setContactEmail('');
  };

  const getRegistrationUrl = (eventId: string) => {
    return `${window.location.origin}/events/${eventId}/register`;
  };

  const copyLink = (eventId: string) => {
    navigator.clipboard.writeText(getRegistrationUrl(eventId));
    toast.success('Registration link copied!');
  };

  const downloadQR = (eventId: string, eventTitle: string) => {
    const svg = document.getElementById(`qr-${eventId}`);
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = 400;
      canvas.height = 400;
      ctx?.drawImage(img, 0, 0, 400, 400);
      const link = document.createElement('a');
      link.download = `${eventTitle.replace(/\s+/g, '_')}_QR.png`;
      link.href = canvas.toDataURL();
      link.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Event Management</h1>
            <p className="text-gray-600">Create events, generate QR codes, and manage registrations</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>Fill in the event details. A QR code will be generated automatically for registration.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Health Camp 2026" required />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the event details..." rows={3} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eventDate">Event Start Date & Time *</Label>
                    <Input id="eventDate" type="datetime-local" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eventEndDate">Event End Date & Time</Label>
                    <Input id="eventEndDate" type="datetime-local" value={eventEndDate} onChange={(e) => setEventEndDate(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venue">Venue *</Label>
                    <Input id="venue" value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="e.g., Panchayat Community Hall" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {eventCategories.map(c => (
                          <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="district">District *</Label>
                    <Input id="district" value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="e.g., Thrissur" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="panchayat">Panchayat *</Label>
                    <Input id="panchayat" value={panchayat} onChange={(e) => setPanchayat(e.target.value)} placeholder="e.g., Velookara" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ward">Ward (Optional)</Label>
                    <Input id="ward" value={ward} onChange={(e) => setWard(e.target.value)} placeholder="e.g., Ward 5" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxParticipants">Max Participants</Label>
                    <Input id="maxParticipants" type="number" value={maxParticipants} onChange={(e) => setMaxParticipants(e.target.value)} placeholder="Leave empty for unlimited" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input id="contactPhone" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input id="contactEmail" type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="organizer@email.com" />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" /> Create Event
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Events List */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading events...</div>
        ) : events.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Events Yet</h3>
              <p className="text-gray-500 mb-4">Create your first event to generate QR codes for registration.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Event Info */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold">{event.title}</h3>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <Badge variant="secondary" className="capitalize">{event.category}</Badge>
                            <Badge variant={event.is_active ? 'default' : 'destructive'}>
                              {event.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                            {event.max_participants && (
                              <Badge variant="outline">
                                <Users className="h-3 w-3 mr-1" />
                                {event.total_attendees}/{event.max_participants}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-green-600" />
                          {formatDate(event.event_date)}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-green-600" />
                          {event.venue}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-blue-600" />
                          {event.panchayat}, {event.district}
                          {event.ward && ` (${event.ward})`}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-purple-600" />
                          {event.registration_count} registrations ({event.total_attendees} attendees)
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <Button size="sm" variant="outline" onClick={() => setShowQR(showQR === event.id ? null : event.id)}>
                          <QrCode className="h-4 w-4 mr-1" /> QR Code
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => copyLink(event.id)}>
                          <Copy className="h-4 w-4 mr-1" /> Copy Link
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => viewRegistrations(event)}>
                          <Eye className="h-4 w-4 mr-1" /> Registrations
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(event.id)}>
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </div>

                    {/* QR Code Panel */}
                    {showQR === event.id && (
                      <div className="bg-gray-50 p-6 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l min-w-[250px]">
                        <p className="text-xs text-gray-500 mb-3 text-center">Scan to register</p>
                        <div className="bg-white p-4 rounded-xl shadow-sm">
                          <QRCodeSVG
                            id={`qr-${event.id}`}
                            value={getRegistrationUrl(event.id)}
                            size={180}
                            level="H"
                            includeMargin
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-center max-w-[200px] break-all">
                          {getRegistrationUrl(event.id)}
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-3"
                          onClick={() => downloadQR(event.id, event.title)}
                        >
                          <Download className="h-4 w-4 mr-1" /> Download QR
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Registrations Dialog */}
        <Dialog open={showRegistrations} onOpenChange={setShowRegistrations}>
          <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Registrations - {selectedEvent?.title}</DialogTitle>
              <DialogDescription>
                {registrations.length} registrations, {registrations.reduce((sum, r) => sum + r.num_attendees, 0)} total attendees
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              {registrations.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No registrations yet.</p>
              ) : (
                <div className="space-y-3">
                  {registrations.map((reg, idx) => (
                    <Card key={reg.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <div className="font-medium">{idx + 1}. {reg.name}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {reg.phone}</span>
                            {reg.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {reg.email}</span>}
                            {reg.ward && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {reg.ward}</span>}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">{reg.num_attendees} {reg.num_attendees === 1 ? 'person' : 'people'}</Badge>
                          <div className="text-xs text-gray-400 mt-1">
                            {new Date(reg.registered_at).toLocaleDateString('en-IN')}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
