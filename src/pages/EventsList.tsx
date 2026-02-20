import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePanchayat } from '../lib/PanchayatContext';
import { eventsAPI } from '../lib/api';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { keralaDistricts, getPanchayatsByDistrict } from '../lib/keralaData';
import {
  Calendar,
  MapPin,
  Users,
  Filter,
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
  total_attendees: number;
  registration_count: number;
  is_active: boolean;
}

export default function EventsList() {
  const { selectedDistrict, selectedPanchayat } = usePanchayat();
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDistrict, setFilterDistrict] = useState(selectedDistrict || '');
  const [filterPanchayat, setFilterPanchayat] = useState(selectedPanchayat || '');

  const panchayatOptions = filterDistrict ? getPanchayatsByDistrict(filterDistrict) : [];

  useEffect(() => {
    fetchEvents();
  }, [filterDistrict, filterPanchayat]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (filterDistrict) params.district = filterDistrict;
      if (filterPanchayat) params.panchayat = filterPanchayat;
      const response = await eventsAPI.getAll(params);
      if (response.data.success) {
        setEvents(response.data.events || []);
      }
    } catch (error) {
      console.error('Fetch events error:', error);
    } finally {
      setLoading(false);
    }
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

  const isUpcoming = (dateStr: string) => new Date(dateStr) > new Date();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Panchayat Events & Programs</h1>
          <p className="text-gray-600">Browse upcoming events and register to participate</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Filter Events</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Select value={filterDistrict} onValueChange={(v) => { setFilterDistrict(v); setFilterPanchayat(''); }}>
                <SelectTrigger><SelectValue placeholder="All Districts" /></SelectTrigger>
                <SelectContent>
                  {keralaDistricts.map(d => (
                    <SelectItem key={d.name} value={d.name}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {filterDistrict && (
                <Select value={filterPanchayat} onValueChange={setFilterPanchayat}>
                  <SelectTrigger><SelectValue placeholder="All Panchayats" /></SelectTrigger>
                  <SelectContent>
                    {panchayatOptions.map(p => (
                      <SelectItem key={p.name} value={p.name}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {(filterDistrict || filterPanchayat) && (
                <Button variant="ghost" size="sm" onClick={() => { setFilterDistrict(''); setFilterPanchayat(''); }}>
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Events */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading events...</div>
        ) : events.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Events Found</h3>
              <p className="text-gray-500">
                {filterDistrict ? `No events in ${filterPanchayat || filterDistrict} yet.` : 'No events have been posted yet.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const upcoming = isUpcoming(event.event_date);
              return (
                <Card key={event.id} className={`overflow-hidden transition-shadow hover:shadow-lg ${!upcoming ? 'opacity-75' : ''}`}>
                  <div className={`h-2 ${upcoming ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="capitalize text-xs">{event.category}</Badge>
                      <Badge variant={upcoming ? 'default' : 'outline'} className="text-xs">
                        {upcoming ? 'Upcoming' : 'Past'}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span>{formatDate(event.event_date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <span>{event.panchayat}, {event.district}</span>
                      </div>
                      {event.max_participants && (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-purple-600 flex-shrink-0" />
                          <span>{event.total_attendees} / {event.max_participants} spots filled</span>
                        </div>
                      )}
                    </div>
                    {upcoming && event.is_active && (
                      <Link to={`/events/${event.id}/register`}>
                        <Button className="w-full bg-green-600 hover:bg-green-700" size="sm">
                          Register Now
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
