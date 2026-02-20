import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePanchayat } from '../lib/PanchayatContext';
import { eventsAPI } from '../lib/api';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { keralaDistricts, getPanchayatsByDistrict } from '../lib/keralaData';
import {
  Calendar,
  MapPin,
  Users,
  Filter,
  Clock,
  ArrowRight,
  Sparkles,
  X,
  CalendarDays,
  UserPlus,
  Tag,
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
  contact_phone?: string;
  contact_email?: string;
}

const categoryColors: Record<string, { bg: string; text: string; icon: string }> = {
  general: { bg: 'bg-slate-100', text: 'text-slate-700', icon: '📋' },
  health: { bg: 'bg-red-50', text: 'text-red-700', icon: '🏥' },
  education: { bg: 'bg-blue-50', text: 'text-blue-700', icon: '📚' },
  agriculture: { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: '🌾' },
  sports: { bg: 'bg-orange-50', text: 'text-orange-700', icon: '⚽' },
  cultural: { bg: 'bg-purple-50', text: 'text-purple-700', icon: '🎭' },
  meeting: { bg: 'bg-gray-100', text: 'text-gray-700', icon: '🤝' },
  workshop: { bg: 'bg-amber-50', text: 'text-amber-700', icon: '🔧' },
  awareness: { bg: 'bg-cyan-50', text: 'text-cyan-700', icon: '📢' },
  other: { bg: 'bg-gray-50', text: 'text-gray-600', icon: '📌' },
};

function getTimeUntil(dateStr: string): string {
  const diff = new Date(dateStr).getTime() - Date.now();
  if (diff <= 0) return 'Started';
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (days > 30) return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? 's' : ''} away`;
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ${hours}h left`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} left`;
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${mins} min${mins > 1 ? 's' : ''} left`;
}

export default function EventsList() {
  const { selectedDistrict, selectedPanchayat, displayName } = usePanchayat();
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDistrict, setFilterDistrict] = useState(selectedDistrict || '');
  const [filterPanchayat, setFilterPanchayat] = useState(selectedPanchayat || '');
  const [filterCategory, setFilterCategory] = useState('');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const panchayatOptions = filterDistrict ? getPanchayatsByDistrict(filterDistrict) : [];

  useEffect(() => {
    fetchEvents();
  }, [filterDistrict, filterPanchayat]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = {};
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

  const isUpcoming = (dateStr: string) => new Date(dateStr) > new Date();

  const { upcomingEvents, pastEvents } = useMemo(() => {
    let filtered = events;
    if (filterCategory) {
      filtered = filtered.filter(e => e.category === filterCategory);
    }
    const upcoming = filtered.filter(e => isUpcoming(e.event_date)).sort((a, b) =>
      new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
    );
    const past = filtered.filter(e => !isUpcoming(e.event_date)).sort((a, b) =>
      new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
    );
    return { upcomingEvents: upcoming, pastEvents: past };
  }, [events, filterCategory]);

  const displayEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;
  const hasFilters = !!(filterDistrict || filterPanchayat || filterCategory);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const formatTime = (dateStr: string) =>
    new Date(dateStr).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });

  const clearFilters = () => {
    setFilterDistrict('');
    setFilterPanchayat('');
    setFilterCategory('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 text-white">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-white/15 rounded-xl">
              <CalendarDays className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Events & Programs</h1>
              <p className="text-green-100 text-sm md:text-base mt-1">
                {displayName ? `Happening in ${displayName}` : 'Browse panchayat events across Kerala'}
              </p>
            </div>
          </div>
          {/* Stats */}
          <div className="flex gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-white/15 flex items-center justify-center">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xl font-bold">{upcomingEvents.length}</div>
                <div className="text-xs text-green-200">Upcoming</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-white/15 flex items-center justify-center">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {events.reduce((s, e) => s + (e.total_attendees || 0), 0)}
                </div>
                <div className="text-xs text-green-200">Registrations</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-white/15 flex items-center justify-center">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xl font-bold">{pastEvents.length}</div>
                <div className="text-xs text-green-200">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-5">
        {/* Filters Card */}
        <Card className="shadow-lg border-0 mb-6">
          <CardContent className="p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">Filter Events</span>
              </div>
              {hasFilters && (
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 h-7 text-xs" onClick={clearFilters}>
                  <X className="h-3 w-3 mr-1" /> Clear All
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Select value={filterDistrict} onValueChange={(v) => { setFilterDistrict(v); setFilterPanchayat(''); }}>
                <SelectTrigger className="h-10">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-gray-400" />
                    <SelectValue placeholder="All Districts" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {keralaDistricts.map(d => (
                    <SelectItem key={d.name} value={d.name}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {filterDistrict && (
                <Select value={filterPanchayat} onValueChange={setFilterPanchayat}>
                  <SelectTrigger className="h-10">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-gray-400" />
                      <SelectValue placeholder="All Panchayats" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {panchayatOptions.map(p => (
                      <SelectItem key={p.name} value={p.name}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="h-10">
                  <div className="flex items-center gap-2">
                    <Tag className="h-3.5 w-3.5 text-gray-400" />
                    <SelectValue placeholder="All Categories" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categoryColors).map(([key, val]) => (
                    <SelectItem key={key} value={key}>
                      <span>{val.icon} {key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex items-center gap-0 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`relative px-5 py-3 text-sm font-semibold transition-all ${
              activeTab === 'upcoming'
                ? 'text-green-700'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Upcoming
              <span className={`ml-0.5 text-xs px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'upcoming'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-400'
              }`}>{upcomingEvents.length}</span>
            </span>
            {activeTab === 'upcoming' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`relative px-5 py-3 text-sm font-semibold transition-all ${
              activeTab === 'past'
                ? 'text-gray-700'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Past
              <span className={`ml-0.5 text-xs px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'past'
                  ? 'bg-gray-200 text-gray-700'
                  : 'bg-gray-100 text-gray-400'
              }`}>{pastEvents.length}</span>
            </span>
            {activeTab === 'past' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-500 rounded-full" />
            )}
          </button>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="h-2 bg-gray-200" />
                <CardContent className="p-5 space-y-3">
                  <div className="flex gap-2">
                    <div className="h-5 w-16 bg-gray-200 rounded-full" />
                    <div className="h-5 w-20 bg-gray-200 rounded-full" />
                  </div>
                  <div className="h-6 w-3/4 bg-gray-200 rounded" />
                  <div className="h-4 w-full bg-gray-100 rounded" />
                  <div className="space-y-2 pt-2">
                    <div className="h-4 w-2/3 bg-gray-100 rounded" />
                    <div className="h-4 w-1/2 bg-gray-100 rounded" />
                  </div>
                  <div className="h-9 w-full bg-gray-200 rounded-lg mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : displayEvents.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="text-center py-16">
              {activeTab === 'upcoming' ? (
                <>
                  <div className="mx-auto w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-4">
                    <CalendarDays className="h-10 w-10 text-green-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Upcoming Events</h3>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    {hasFilters
                      ? 'No upcoming events match your filters. Try adjusting them.'
                      : 'There are no upcoming events scheduled yet. Check back soon!'}
                  </p>
                  {hasFilters && (
                    <Button variant="outline" size="sm" className="mt-4" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <div className="mx-auto w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                    <Clock className="h-10 w-10 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Past Events</h3>
                  <p className="text-gray-500">No completed events found.</p>
                </>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 pb-10">
            {displayEvents.map((event) => {
              const upcoming = isUpcoming(event.event_date);
              const cat = categoryColors[event.category] || categoryColors.other;
              const spotsUsed = event.max_participants
                ? Math.min((event.total_attendees / event.max_participants) * 100, 100)
                : 0;
              const isFull = event.max_participants
                ? event.total_attendees >= event.max_participants
                : false;

              return (
                <Card
                  key={event.id}
                  className={`group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-md ${
                    !upcoming ? 'opacity-80' : ''
                  }`}
                >
                  {/* Top color bar */}
                  <div className={`h-1.5 ${upcoming ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gray-300'}`} />

                  <CardContent className="p-5 space-y-0">
                    {/* Category + Status badges */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cat.bg} ${cat.text}`}>
                        <span className="text-sm leading-none">{cat.icon}</span>
                        <span className="capitalize">{event.category}</span>
                      </span>
                      {upcoming ? (
                        <Badge className="bg-green-50 text-green-700 hover:bg-green-50 border border-green-200 text-[11px] font-semibold px-2.5 py-0.5">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Upcoming
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-400 border-gray-200 text-[11px] px-2.5 py-0.5">
                          Completed
                        </Badge>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-[17px] font-bold text-gray-900 mb-1 leading-snug line-clamp-2 group-hover:text-green-700 transition-colors">
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[13px] text-gray-500 mb-4 line-clamp-2 leading-relaxed">{event.description}</p>

                    {/* Event details */}
                    <div className="space-y-3 mb-4 border-t border-gray-100 pt-3">
                      {/* Date & Time */}
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                          <Calendar className="h-[18px] w-[18px] text-green-600" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-gray-800 leading-tight">{formatDate(event.event_date)}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{formatTime(event.event_date)}
                            {event.event_end_date && ` — ${formatTime(event.event_end_date)}`}
                          </div>
                        </div>
                      </div>

                      {/* Venue */}
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-[18px] w-[18px] text-orange-500" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-gray-800 leading-tight truncate">{event.venue}</div>
                          <div className="text-xs text-gray-400 mt-0.5">
                            {event.panchayat}, {event.district}
                            {event.ward && ` · ${event.ward}`}
                          </div>
                        </div>
                      </div>

                      {/* Participants */}
                      {event.max_participants ? (
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0">
                            <Users className="h-[18px] w-[18px] text-violet-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between mb-1">
                              <span className="text-sm font-semibold text-gray-800">
                                {event.total_attendees} / {event.max_participants}
                              </span>
                              <span className={`text-[11px] font-semibold ${isFull ? 'text-red-500' : 'text-gray-400'}`}>
                                {isFull ? 'Full' : `${Math.round(spotsUsed)}% filled`}
                              </span>
                            </div>
                            <Progress
                              value={spotsUsed}
                              className="h-1.5"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0">
                            <Users className="h-[18px] w-[18px] text-violet-500" />
                          </div>
                          <span className="text-sm text-gray-600">
                            {event.total_attendees} registered · Open for all
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Countdown / CTA */}
                    {upcoming && event.is_active ? (
                      <div className="space-y-2.5 border-t border-gray-100 pt-3">
                        {!isFull && (
                          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50/80 rounded-lg px-3 py-2">
                            <Clock className="h-3.5 w-3.5" />
                            {getTimeUntil(event.event_date)}
                          </div>
                        )}
                        <Link to={`/events/${event.id}/register`} className="block">
                          <Button
                            className={`w-full h-11 font-semibold text-[13px] rounded-xl transition-all ${
                              isFull
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100'
                                : 'bg-green-600 hover:bg-green-700 shadow-sm hover:shadow-md'
                            }`}
                            disabled={isFull}
                          >
                            {isFull ? (
                              <span className="flex items-center justify-center gap-2">
                                <Users className="h-4 w-4" /> Event Full
                              </span>
                            ) : (
                              <span className="flex items-center justify-center gap-2">
                                <UserPlus className="h-4 w-4" /> Register Now
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </span>
                            )}
                          </Button>
                        </Link>
                      </div>
                    ) : upcoming && !event.is_active ? (
                      <div className="border-t border-gray-100 pt-3">
                        <Button className="w-full h-11 rounded-xl bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100 text-[13px]" disabled>
                          Registration Closed
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2.5 border-t border-gray-100 mt-1">
                        <Clock className="h-3.5 w-3.5" />
                        Event ended · {event.registration_count} people registered
                      </div>
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
