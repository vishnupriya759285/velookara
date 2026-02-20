import { useState, useEffect, useCallback } from 'react';
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
import { QRCodeCanvas } from 'qrcode.react';
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
  ExternalLink,
  Link as LinkIcon,
  MessageCircle,
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
  const [showRegistrations, setShowRegistrations] = useState(false);
  const [showQRFor, setShowQRFor] = useState<string | null>(null);

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
        toast.success('Event created! Share the registration link with your ward groups.');
        setIsCreateOpen(false);
        resetForm();
        fetchEvents();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create event');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event and all its registrations?')) return;
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
    toast.success('Registration link copied to clipboard!');
  };

  const shareToWhatsApp = (event: EventData) => {
    const url = getRegistrationUrl(event.id);
    const date = formatDate(event.event_date);
    const text = [
      `📢 *${event.title}*`,
      '',
      `📅 ${date}`,
      `📍 ${event.venue}, ${event.panchayat}`,
      event.ward ? `🏘️ ${event.ward}` : '',
      '',
      event.description.substring(0, 200),
      '',
      `👉 *Register here:*`,
      url,
      '',
      `No login needed — just fill the form!`,
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const downloadQR = useCallback((eventId: string, eventTitle: string) => {
    const canvas = document.getElementById(`qr-canvas-${eventId}`) as HTMLCanvasElement;
    if (!canvas) {
      toast.error('Please show the QR code first, then download.');
      return;
    }
    // Create a higher-res canvas for download with title
    const dlCanvas = document.createElement('canvas');
    const size = 500;
    dlCanvas.width = size;
    dlCanvas.height = size + 60;
    const ctx = dlCanvas.getContext('2d');
    if (!ctx) return;

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, dlCanvas.width, dlCanvas.height);

    // Draw QR code
    ctx.drawImage(canvas, 25, 10, size - 50, size - 50);

    // Event title
    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'bold 16px Arial, sans-serif';
    ctx.textAlign = 'center';
    const label = eventTitle.length > 40 ? eventTitle.substring(0, 37) + '...' : eventTitle;
    ctx.fillText(label, size / 2, size - 15);

    // Subtitle
    ctx.fillStyle = '#666666';
    ctx.font = '13px Arial, sans-serif';
    ctx.fillText('Scan to Register', size / 2, size + 5);

    const link = document.createElement('a');
    link.download = `${eventTitle.replace(/[^a-zA-Z0-9]/g, '_')}_QR.png`;
    link.href = dlCanvas.toDataURL('image/png');
    link.click();
    toast.success('QR code image downloaded!');
  }, []);

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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Event Management</h1>
            <p className="text-gray-600">Create events, generate QR codes & share registration forms in ward groups</p>
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
                <DialogDescription>Fill in the event details. A QR code and shareable registration form link will be generated automatically.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Health Camp 2026" required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the event details, what to bring, who can attend..." rows={3} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventDate">Start Date & Time *</Label>
                    <Input id="eventDate" type="datetime-local" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventEndDate">End Date & Time</Label>
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
              <p className="text-gray-500 mb-4">Create your first event to get a registration form link and QR code to share in ward groups.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {events.map((event) => {
              const regUrl = getRegistrationUrl(event.id);
              const qrVisible = showQRFor === event.id;
              return (
                <Card key={event.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      {/* Left: Event Info */}
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
                            {event.panchayat}, {event.district}{event.ward && ` (${event.ward})`}
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-purple-600" />
                            {event.registration_count} registrations ({event.total_attendees} attendees)
                          </div>
                        </div>

                        {/* ===== Registration Form Link (always visible) ===== */}
                        <div className="mt-5 p-4 bg-green-50 border border-green-200 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <LinkIcon className="h-4 w-4 text-green-700" />
                            <span className="text-sm font-bold text-green-800">📋 Registration Form Link</span>
                          </div>
                          <div className="flex items-stretch gap-2">
                            <div className="flex-1 bg-white border border-green-300 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-gray-700 font-mono truncate select-all cursor-text" title={regUrl}>
                              {regUrl}
                            </div>
                            <Button size="sm" className="shrink-0 bg-green-600 hover:bg-green-700 h-auto" onClick={() => copyLink(event.id)}>
                              <Copy className="h-4 w-4 mr-1" /> Copy
                            </Button>
                          </div>
                          <p className="text-xs text-green-600 mt-2">
                            Anyone with this link can register — no login required. Share in WhatsApp ward groups!
                          </p>
                        </div>

                        {/* ===== Share & Action Buttons ===== */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          <Button size="sm" className="bg-[#25D366] hover:bg-[#1da851] text-white" onClick={() => shareToWhatsApp(event)}>
                            <MessageCircle className="h-4 w-4 mr-1" /> Share on WhatsApp
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => window.open(regUrl, '_blank')}>
                            <ExternalLink className="h-4 w-4 mr-1" /> Preview Form
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setShowQRFor(qrVisible ? null : event.id)}>
                            <QrCode className="h-4 w-4 mr-1" /> {qrVisible ? 'Hide QR Code' : 'Show QR Code'}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => viewRegistrations(event)}>
                            <Eye className="h-4 w-4 mr-1" /> View Registrations ({event.registration_count})
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(event.id)}>
                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                          </Button>
                        </div>
                      </div>

                      {/* Right: QR Code Panel */}
                      {qrVisible && (
                        <div className="bg-gradient-to-b from-green-50 to-white p-6 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l min-w-[280px]">
                          <div className="flex items-center gap-2 mb-3">
                            <QrCode className="h-5 w-5 text-green-700" />
                            <span className="text-sm font-bold text-green-800">Scan to Register</span>
                          </div>
                          <div className="bg-white p-4 rounded-xl shadow-md border-2 border-green-100">
                            <QRCodeCanvas
                              id={`qr-canvas-${event.id}`}
                              value={regUrl}
                              size={200}
                              level="H"
                              includeMargin={true}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-3 text-center max-w-[220px]">
                            Point any phone camera at the QR code to open the registration form
                          </p>
                          <div className="flex gap-2 mt-3">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => downloadQR(event.id, event.title)}
                            >
                              <Download className="h-4 w-4 mr-1" /> Download QR Image
                            </Button>
                          </div>
                          <div className="mt-3 text-center">
                            <p className="text-[11px] text-gray-400 break-all max-w-[220px]">{regUrl}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Registrations Dialog */}
        <Dialog open={showRegistrations} onOpenChange={setShowRegistrations}>
          <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Registrations — {selectedEvent?.title}</DialogTitle>
              <DialogDescription>
                {registrations.length} registration{registrations.length !== 1 ? 's' : ''}, {registrations.reduce((sum, r) => sum + r.num_attendees, 0)} total attendees
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              {registrations.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500 mb-2">No registrations yet</p>
                  <p className="text-sm text-gray-400">Share the form link or QR code in your ward WhatsApp groups to get registrations.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {registrations.map((reg, idx) => (
                    <Card key={reg.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <div className="font-medium">{idx + 1}. {reg.name}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-3 mt-1 flex-wrap">
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
